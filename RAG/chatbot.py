"""
  1. Embedding Model  : paraphrase-multilingual-MiniLM-L12-v2  (Sentence Transformers)
  2. Vector Store     : ChromaDB
  3. LLM              : Groq  (llama-3.3-70b-versatile)
  4. Data Source      : datatry.json

CHANGES vs original:
  - chat() now accepts (message, history, session_id) instead of (message) only
  - History comes from the caller (C# sends it as JSON → api.py parses it)
  - DocumentCollector state is stored per session_id in GovernmentChatbot.sessions dict
  - Return dict now uses new field names:
      bot_response, service_name, collected_data, is_ready_to_confirm, missing_fields
  - is_ready_to_confirm = True  → all required fields collected, C# should process
  - missing_fields        → list of fields still needed from user
  - collected_data        → dict of what has been gathered so far
"""

import json
import os
import re
import sys
from groq import Groq
from rank_bm25 import BM25Okapi
from sentence_transformers import SentenceTransformer
import chromadb
from chromadb import EphemeralClient

try:
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")
except AttributeError:
    pass

# ─────────────────────────────────────────────
# 1. CONFIGURATION
# ─────────────────────────────────────────────
GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "")
GROQ_MODEL   = "llama-3.3-70b-versatile"
DATA_FILE    = "datatry.json"
CONFIDENCE_THRESHOLD = 0.53
LOW_CONF_THRESHOLD   = 0.40

# ─────────────────────────────────────────────
# 2. EMBEDDING MODEL
# ─────────────────────────────────────────────
print("Loading Embedding...")
embedding_model = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")
print("Loaded Embedding")


# ─────────────────────────────────────────────
# 3. LOAD JSON DATA
# ─────────────────────────────────────────────
def load_services(filepath: str) -> list[dict]:
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)


def encode_texts(texts: list[str]) -> list[list[float]]:
    return embedding_model.encode(
        texts,
        batch_size=64,
        show_progress_bar=False,
        normalize_embeddings=True
    ).tolist()


def build_chunks(services: list[dict]) -> list[dict]:
    chunks = []
    for service in services:
        name       = service.get("اسم الخدمة", "")
        desc       = service.get("الوصف", "")
        conditions = service.get("الشروط والأحكام", [])
        docs       = service.get("المستندات المطلوبة", [])
        similar    = service.get("الخدمات المشابهة", [])
        collection_mode = service.get("collection_mode", "collect")

        conditions_text = "\n".join(f"  {i+1}. {c}" for i, c in enumerate(conditions))
        docs_text       = "\n".join(f"  {i+1}. {d}" for i, d in enumerate(docs))
        similar_text    = " | ".join(similar) if similar else "لا يوجد"

        full_text = (
            f"اسم الخدمة: {name}\n"
            f"الوصف: {desc}\n"
            f"الشروط والأحكام:\n{conditions_text}\n"
            f"المستندات المطلوبة:\n{docs_text}\n"
            f"الخدمات المشابهة: {similar_text}"
        )
        chunks.append({
            "text": full_text.strip(),
            "service": name,
            "description": desc,
            "required_docs": docs,
            "conditions": conditions,
            "similar": similar,
            "collection_mode": collection_mode
        })
    return chunks


def tokenize_arabic(text: str) -> list[str]:
    text = re.sub(r"[\u064B-\u065F]", "", text)
    text = re.sub(r"[^\w\s]", " ", text)
    return [token for token in text.split() if len(token) > 1]


def reciprocal_rank_fusion(rankings: list[list[int]], weights: list[float] | None = None, k: int = 60) -> dict[int, float]:
    if weights is None:
        weights = [1.0] * len(rankings)

    fused: dict[int, float] = {}
    for ranked_list, weight in zip(rankings, weights):
        for rank, doc_idx in enumerate(ranked_list):
            fused[doc_idx] = fused.get(doc_idx, 0.0) + weight / (k + rank + 1)
    return fused


def lexical_overlap_score(query: str, chunk: dict) -> float:
    query_tokens = set(tokenize_arabic(query))
    if not query_tokens:
        return 0.0

    service_tokens = set(tokenize_arabic(chunk.get("service", "")))
    text_tokens = set(tokenize_arabic(chunk.get("text", "")))
    name_overlap = len(query_tokens & service_tokens) / max(len(query_tokens), 1)
    text_overlap = len(query_tokens & text_tokens) / max(len(query_tokens), 1)
    return (0.04 * name_overlap) + (0.01 * text_overlap)


# ─────────────────────────────────────────────
# 4. VECTOR STORE  (ChromaDB)
# ─────────────────────────────────────────────
def build_vector_store(chunks: list[dict]) -> chromadb.Collection:
    client     = EphemeralClient()
    collection = client.create_collection(
        name="services",
        metadata={"hnsw:space": "cosine"}
    )

    documents, metadatas, ids, embeddings_list = [], [], [], []
    texts = [chunk["text"] for chunk in chunks]
    embeddings = encode_texts(texts)

    for i, chunk in enumerate(chunks):
        documents.append(chunk["text"])
        embeddings_list.append(embeddings[i])
        metadatas.append({
            "chunk_idx": i,
            "service_name": chunk["service"],
            "required_docs": json.dumps(chunk["required_docs"], ensure_ascii=False),
            "conditions":    json.dumps(chunk["conditions"],   ensure_ascii=False),
            "description":   chunk["description"],
            "collection_mode": chunk["collection_mode"]
        })
        ids.append(f"service_{i}")

    collection.add(
        documents=documents,
        embeddings=embeddings_list,
        metadatas=metadatas,
        ids=ids
    )

    print(f"Vector Store built with {len(chunks)} services")
    return collection


# ─────────────────────────────────────────────
# 5. RETRIEVAL
# ─────────────────────────────────────────────
def build_bm25_index(chunks: list[dict]) -> BM25Okapi:
    tokenized_corpus = [tokenize_arabic(chunk["text"]) for chunk in chunks]
    print(f"BM25 index built with {len(tokenized_corpus)} documents")
    return BM25Okapi(tokenized_corpus, k1=1.4, b=0.55)


def get_chroma_confidence(query: str, collection: chromadb.Collection) -> float:
    query_vec = encode_texts([query])[0]
    results = collection.query(
        query_embeddings=[query_vec],
        n_results=1,
        include=["distances"]
    )
    if not results["distances"] or not results["distances"][0]:
        return 0.0
    return max(0.0, min(1.0, 1.0 - float(results["distances"][0][0])))


def rewrite_query(question: str, services_list: str) -> str:
    system = """أنت مساعد لفهم أسئلة المستخدمين وربطها بالخدمات الحكومية المتاحة.
السؤال ممكن يكون بالعامية المصرية أو غير واضح. حوّله لأقرب اسم خدمة أو صياغة بحث واضحة.
اكتب الإجابة المختصرة فقط بدون شرح."""
    messages = [{
        "role": "user",
        "content": f"الخدمات المتاحة:\n{services_list}\n\nالسؤال: {question}"
    }]
    try:
        rewritten = call_groq(system, messages).strip()
        return rewritten or question
    except Exception as exc:
        print(f"Groq rewrite error: {exc}")
        return question


def retrieve_service(
    query: str,
    collection: chromadb.Collection,
    chunks: list[dict],
    bm25: BM25Okapi,
    services_list: str,
    top_k: int = 3
) -> dict | None:
    q_for_search = query
    confidence = get_chroma_confidence(query, collection)
    used_rewrite = False

    if confidence < LOW_CONF_THRESHOLD:
        return None

    if confidence < CONFIDENCE_THRESHOLD:
        rewritten = rewrite_query(query, services_list)
        rewritten_confidence = get_chroma_confidence(rewritten, collection)
        print(f"Rewrite: '{rewritten}'")
        print(f"confidence {confidence:.3f} -> {rewritten_confidence:.3f}")
        if rewritten_confidence > confidence:
            q_for_search = rewritten
            confidence = rewritten_confidence
        used_rewrite = True

    query_vec = encode_texts([q_for_search])[0]
    n_results = min(len(chunks), max(top_k * 4, 10))

    results = collection.query(
        query_embeddings=[query_vec],
        n_results=n_results,
        include=["metadatas", "distances", "documents"]
    )

    if not results["metadatas"] or not results["metadatas"][0]:
        return None

    chroma_ranked = [int(meta["chunk_idx"]) for meta in results["metadatas"][0]]
    distance_by_idx = {
        int(meta["chunk_idx"]): float(distance)
        for meta, distance in zip(results["metadatas"][0], results["distances"][0])
    }

    bm25_scores = bm25.get_scores(tokenize_arabic(q_for_search))
    bm25_ranked = sorted(range(len(chunks)), key=lambda idx: bm25_scores[idx], reverse=True)

    fused_scores = reciprocal_rank_fusion(
        [chroma_ranked, bm25_ranked],
        weights=[0.75, 0.25]
    )
    max_bm25 = max(float(score) for score in bm25_scores) if len(bm25_scores) else 0.0
    final_scores = {}
    for idx, fused_score in fused_scores.items():
        bm25_norm = (float(bm25_scores[idx]) / max_bm25) if max_bm25 > 0 else 0.0
        final_scores[idx] = (
            fused_score
            + lexical_overlap_score(q_for_search, chunks[idx])
            + (0.01 * bm25_norm)
        )

    top_indices = sorted(final_scores, key=lambda idx: final_scores[idx], reverse=True)[:top_k]
    best_idx = top_indices[0]
    best_chunk = chunks[best_idx]

    retrieved = []
    for idx in top_indices:
        chunk = chunks[idx]
        distance = distance_by_idx.get(idx)
        retrieved.append({
            "service_name": chunk["service"],
            "text": chunk["text"],
            "score_hybrid": round(final_scores[idx], 6),
            "score_chroma": None if distance is None else round(1.0 - distance, 4),
            "score_bm25": round(float(bm25_scores[idx]), 4)
        })

    return {
        "service_name":  best_chunk["service"],
        "description":   best_chunk["description"],
        "required_docs": best_chunk["required_docs"],
        "conditions":    best_chunk["conditions"],
        "collection_mode": best_chunk.get("collection_mode", "collect"),
        "confidence":    confidence,
        "query":         q_for_search,
        "used_rewrite":  used_rewrite,
        "retrieved":     retrieved
    }


# ─────────────────────────────────────────────
# 6. GROQ LLM
# ─────────────────────────────────────────────
groq_client = Groq(api_key=GROQ_API_KEY)

def call_groq(system_prompt: str, messages: list[dict]) -> str:
    response = groq_client.chat.completions.create(
        model=GROQ_MODEL,
        messages=[{"role": "system", "content": system_prompt}] + messages,
        temperature=0.3,
        max_tokens=1024
    )
    return response.choices[0].message.content


# ─────────────────────────────────────────────
# 7. INTENT DETECTION
# ─────────────────────────────────────────────
def parse_json_response(raw: str) -> dict:
    raw = raw.strip()
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    return json.loads(raw.strip())


def classify_intent(user_message: str, retrieved_service: dict | None, conversation_history: list) -> dict:
    service_context = ""
    if retrieved_service:
        service_context = f"""
الخدمة المقترحة من قاعدة البيانات:
- الاسم: {retrieved_service['service_name']}
- الوصف: {retrieved_service['description']}
- المستندات المطلوبة: {retrieved_service['required_docs']}
- الشروط والأحكام: {retrieved_service['conditions']}
- درجة الثقة: {retrieved_service.get('confidence', 0):.3f}
"""

    system = """أنت مساعد ذكي لتصنيف نية المستخدم في نظام خدمات حكومية. أجب دائماً بـ JSON فقط.

JSON format:
{
  "intent": "qa" | "use_service" | "general",
  "confirmed_service": "اسم الخدمة أو null",
  "reason": "سبب مختصر"
}

- qa: المستخدم يسأل عن معلومات خدمة، مثل الشروط أو المستندات أو الوصف أو التفاصيل، ولا يطلب تنفيذ الخدمة الآن.
- use_service: المستخدم يريد بدء/تقديم/تنفيذ الخدمة أو يقول عايز أعمل/أقدم/ابدأ/استعلم فعلياً، وهنا سيتم جمع البيانات المطلوبة منه.
- general: كلام عام أو سؤال خارج الخدمات المتاحة.
- confirmed_service: اسم الخدمة المقترحة إذا كانت مناسبة، وإلا null."""

    messages = conversation_history[-6:] + [
        {"role": "user", "content": f"رسالة المستخدم: {user_message}\n{service_context}"}
    ]

    return parse_json_response(call_groq(system, messages))


def classify_intent_fallback(user_message: str, retrieved_service: dict | None) -> dict:
    text = user_message.strip().lower()
    qa_words = [
        "ايه", "ما هي", "ماهو", "ما هى", "ماهي", "شروط", "الشرط",
        "مستندات", "المستندات", "اوراق", "الأوراق", "الوصف", "تفاصيل",
        "اعرف", "عايز اعرف", "ازاي", "إزاي"
    ]
    use_words = [
        "عايز اقدم", "عايز أقدم", "اقدم", "أقدم", "قدملي", "ابدأ",
        "ماشي","ابدالي", "اعمل", "أعمل", "نفذ", "نفّذ", "اطلب", "طلب",
        "استعلم عن", "استعلام عن", "عايز استعلم", "عايز أستعلم"
    ]

    if retrieved_service and any(word in text for word in qa_words):
        return {
            "intent": "qa",
            "confirmed_service": retrieved_service["service_name"],
            "reason": "heuristic service question"
        }

    if retrieved_service and any(word in text for word in use_words):
        return {
            "intent": "use_service",
            "confirmed_service": retrieved_service["service_name"],
            "reason": "heuristic service request"
        }

    return {
        "intent": "general",
        "confirmed_service": None,
        "reason": "fallback general"
    }


def looks_like_service_followup(user_message: str) -> bool:
    text = user_message.strip().lower().replace("أ", "ا").replace("إ", "ا").replace("آ", "ا")
    followup_words = [
        "ابدأ", "ابدا", "تمام", "كمل", "قدملها", "قدملي", "قدم",
        "نفذ", "نفّذ", "اعمل", "عايز اقدم", "عايز استعلم",
        "عايز استفسر", "استعلم عن", "استعلام عن", "استفسر عن",
        "ابدا الخدمة", "ابدا الطلب", "ابدا التقديم"
    ]
    return any(word in text for word in followup_words)


def service_allows_collection(service: dict) -> bool:
    return service.get("collection_mode", "collect") == "collect"


# ─────────────────────────────────────────────
# 8. DOCUMENT COLLECTION STATE MACHINE
# ─────────────────────────────────────────────
class DocumentCollector:
    """
    Collects required fields from the user one by one.

    CHANGED: added missing_fields property so api.py can expose it
    in the RagResponseDTO as MissingFields.
    """

    #############################################################################################################

    def __init__(self):
        self.reset()

    def reset(self):
        self.state         = "idle"
        self.service_name  = None
        self.required_docs = []
        self.collected     = {}
        self.current_idx   = 0

    def start(self, service_name: str, required_docs: list[str]) -> str:
        real_docs = [d for d in required_docs if d.strip() != "لا يوجد"]

        self.service_name  = service_name
        self.required_docs = real_docs
        self.collected     = {}
        self.current_idx   = 0

        if not real_docs:
            self.state = "awaiting_confirmation"

            return (
                f"تم العثور على خدمة **{service_name}** ولا تتطلب مستندات.\n\n"
                "هل تريد أن أقدم لك هذه الخدمة؟ (نعم / لا)"
            )
            ########################################################################################################

        self.state = "collecting"
        first_doc  = real_docs[0]
        return f"ممتاز! لتقديم طلب **{service_name}**، سأحتاج منك بعض المعلومات.\n\n📄 أولاً، من فضلك أدخل: **{first_doc}**"

    def collect(self, user_input: str) -> tuple[str, bool]:
        if self.state != "collecting":
            return "لا توجد خدمة نشطة حالياً.", False

        current_doc = self.required_docs[self.current_idx]
        self.collected[current_doc] = user_input
        self.current_idx += 1

        if self.current_idx >= len(self.required_docs):
            self.state = "done"
            return self._build_summary(), True

        next_doc = self.required_docs[self.current_idx]
        progress = f"({self.current_idx}/{len(self.required_docs)})"
        return f"✅ تم تسجيل **{current_doc}**.\n\n📄 {progress} الآن، من فضلك أدخل: **{next_doc}**", False

    def _build_summary(self) -> str:
        lines = [f"✅ تم جمع جميع المعلومات المطلوبة لخدمة **{self.service_name}**!\n"]
        lines.append("📋 ملخص البيانات:")
        for doc, val in self.collected.items():
            lines.append(f"  • {doc}: {val}")
        lines.append("\n🔄 جارٍ إرسال طلبك للمعالجة ولمتابعه طلباتك تقدر تزور صغحه طلباتي...")
        return "\n".join(lines)

    # ── NEW: missing_fields ──────────────────────────────────────────────
    @property
    def missing_fields(self) -> list[str]:
        """Fields that have NOT been collected yet. Used for MissingFields in DTO."""
        if self.state != "collecting":
            return []
        return self.required_docs[self.current_idx:]

    @property
    def is_collecting(self) -> bool:
        return self.state == "collecting"

    @property
    def is_done(self) -> bool:
        return self.state == "done"


# ─────────────────────────────────────────────
# 9. GENERAL CHAT
# ─────────────────────────────────────────────
def clean_service_items(items: list[str]) -> list[str]:
    return [item for item in items if item and item.strip() and item.strip() != "لا يوجد"]


def format_service_items(title: str, items: list[str]) -> str:
    real_items = clean_service_items(items)
    if not real_items:
        return f"{title}: لا يوجد."
    lines = [f"{title}:"]
    lines.extend(f"- {item}" for item in real_items)
    return "\n".join(lines)


def answer_from_service(question: str, service: dict) -> str:
    service_name = service["service_name"]
    description = service.get("description", "")
    conditions = service.get("conditions", [])
    required_docs = service.get("required_docs", [])

    question_norm = question.strip().lower()
    asks_conditions = any(word in question_norm for word in ["شروط", "الشرط", "الأحكام", "احكام"])
    asks_docs = any(word in question_norm for word in ["مستندات", "المستندات", "اوراق", "الأوراق", "بيانات", "المطلوب"])
    asks_description = any(word in question_norm for word in ["وصف", "تفاصيل", "ايه هي", "ما هي", "ماهو", "ماهي"])

    if asks_conditions and not asks_docs:
        return f"شروط خدمة **{service_name}** هي:\n{format_service_items('الشروط والأحكام', conditions)}"

    if asks_docs and not asks_conditions:
        return f"المستندات أو البيانات المطلوبة لخدمة **{service_name}** هي:\n{format_service_items('المستندات المطلوبة', required_docs)}"

    if asks_conditions and asks_docs:
        return (
            f"بالنسبة لخدمة **{service_name}**:\n\n"
            f"{format_service_items('الشروط والأحكام', conditions)}\n\n"
            f"{format_service_items('المستندات المطلوبة', required_docs)}"
        )

    if asks_description:
        return (
            f"خدمة **{service_name}**:\n{description}\n\n"
            f"{format_service_items('الشروط والأحكام', conditions)}\n\n"
            f"{format_service_items('المستندات المطلوبة', required_docs)}"
        )

    system = """أنت مساعد حكومي. أجب على سؤال المستخدم من معلومات الخدمة المرسلة فقط.
ممنوع إضافة معلومات غير موجودة في بيانات الخدمة.
إذا لم تكن الإجابة موجودة في بيانات الخدمة، قل بوضوح إن المعلومة غير متاحة في بيانات الخدمة الحالية.
أجب بالعربية وباختصار.
- "ممنوع تماماً اقتراح استخدام الإنترنت أو البحث الخارجي دائما تحدث عن"من خلال موقعنا  
"""

    service_context = f"""
اسم الخدمة: {service_name}
الوصف: {description}
الشروط والأحكام: {conditions}
المستندات المطلوبة: {required_docs}
"""
    return call_groq(system, [{"role": "user", "content": f"{service_context}\n\nسؤال المستخدم: {question}"}])


def general_chat(user_message: str, conversation_history: list, services_summary: str, retrieved_service: dict | None = None) -> str:
    retrieved_context = ""
    if retrieved_service:
        retrieved_context = "\n\nفيما يلي أقرب الخدمات المتاحة لسؤال المستخدم:\n" + "\n\n═══════════════\n\n".join(
            f"[{i+1}] اسم الخدمة: {item['service_name']}\n"
            f"hybrid={item['score_hybrid']:.4f} | chroma={item['score_chroma']} | bm25={item['score_bm25']:.3f}\n"
            f"{item['text']}"
            for i, item in enumerate(retrieved_service.get("retrieved", []))
        )

    system = f"""أنت مساعد حكومي ذكي ومفيد. تساعد المواطنين في الاستفسار عن الخدمات الحكومية المتاحة والإجابة على أسئلتهم.

الخدمات المتاحة لديك:
{services_summary}
{retrieved_context}

قواعد:
- أجب باللغة العربية دائماً
- كن موجزاً ومفيداً
- إذا سألك المستخدم عن خدمة معينة، اشرحها له واذكر المستندات المطلوبة
- إذا أراد المستخدم تقديم طلب، أخبره بأنك ستساعده في جمع البيانات المطلوبة
- إذا أرسل المستخدم صورة أو صوتاً، وضح أنك تستطيع فهم الرسائل النصية فقط"""

    return call_groq(system, conversation_history[-10:] + [{"role": "user", "content": user_message}])


# ─────────────────────────────────────────────
# 10. MAIN CHATBOT CLASS
# ─────────────────────────────────────────────
class GovernmentChatbot:
    """
    CHANGES vs original:
      - sessions dict: keyed by session_id (= ConversationId from C#)
        Each session holds its own DocumentCollector so multiple users
        can run simultaneously without state collision.
      - chat() now takes (message, history, session_id):
          message    → current user message
          history    → list[dict] already parsed by api.py from the JSON string
                       the C# client sends as RagRequestDTO.History
          session_id → used to look up / create the right DocumentCollector
      - Return dict keys match RagResponseDTO field names (snake_case):
          bot_response, service_name, collected_data, is_ready_to_confirm, missing_fields
    """

    def __init__(self, data_file: str = DATA_FILE):
        self.services   = load_services(data_file)
        self.chunks     = build_chunks(self.services)
        self.collection = build_vector_store(self.chunks)
        self.bm25       = build_bm25_index(self.chunks)
        # CHANGED: per-session collectors instead of a single self.collector
        self.sessions: dict[str, DocumentCollector] = {}
        self.last_services: dict[str, dict] = {}
        self.services_list = " - ".join(chunk["service"] for chunk in self.chunks)

        self.services_summary = "\n".join(
            f"- {s['اسم الخدمة']}: {s['الوصف'][:80]}..."
            for s in self.services
        )

    def _get_collector(self, session_id: str) -> DocumentCollector:
        """Return (or create) the DocumentCollector for this session."""
        if session_id not in self.sessions:
            self.sessions[session_id] = DocumentCollector()
        return self.sessions[session_id]

    # ── CHANGED signature: (message, history, session_id) ────────────────
    def chat(self, message: str, history: list[dict], session_id: str) -> dict:
        """
        Returns a dict matching RagResponseDTO:
        {
            "bot_response":        str,
            "service_name":        str | None,
            "collected_data":      dict[str, str] | None,
            "is_ready_to_confirm": bool,
            "missing_fields":      list[str] | None
        }
        """
        # Normalize history keys to lowercase for Groq compatibility
        clean_history = []
        if isinstance(history, list):
            for msg in history:
                if isinstance(msg, dict):
                    role = msg.get("role") or msg.get("Role") or "user"
                    content = msg.get("content") or msg.get("Content") or ""
                    clean_history.append({"role": str(role).lower(), "content": str(content)})

        collector = self._get_collector(session_id)


            # ─── awaiting confirmation state ───
        if collector.state == "awaiting_confirmation":
            user_msg = message.strip().lower()

            if user_msg in ["نعم", "ايوه", "اه", "yes", "y"]:
                # هنا نعتبر الخدمة مؤكدة ونبعت للـ backend

                payload = {
                    "bot_response": f"تم تأكيد طلب خدمة {collector.service_name} ولمتابعه الخدمات الخاصه بك قم بزياره صفحه طلباتي وجارٍ المعالجة. ..",
                    "service_name": collector.service_name,
                    "collected_data": None,
                    "is_ready_to_confirm": True,
                    "missing_fields": None
                }

                collector.state = "done"
                collector.reset()
                return payload

            elif user_msg in ["لا", "لأ", "no", "n"]:
                collector.reset()

                return {
                    "bot_response": "تم إلغاء الطلب بنجاح.",
                    "service_name": None,
                    "collected_data": None,
                    "is_ready_to_confirm": False,
                    "missing_fields": None
                }

            else:
                return {
                    "bot_response": "من فضلك أجب بـ (نعم) أو (لا)",
                    "service_name": collector.service_name,
                    "collected_data": None,
                    "is_ready_to_confirm": False,
                    "missing_fields": None
                }

        # ─── collecting state: gather next field ───
        if collector.is_collecting:
            response, is_done = collector.collect(message)

            if is_done:
                # All fields collected → signal C# to process
                payload = {
                    "bot_response":        response,
                    "service_name":        collector.service_name,
                    "collected_data":      dict(collector.collected),  # full copy before reset
                    "is_ready_to_confirm": True,
                    "missing_fields":      []
                }
                print(f"\n[RAG] Ready to confirm - service: {collector.service_name}")
                print(f"[RAG] CollectedData: {json.dumps(collector.collected, ensure_ascii=False, indent=2)}\n")
                collector.reset()
                return payload

            # Still collecting
            return {
                "bot_response":        response,
                "service_name":        collector.service_name,
                "collected_data":      dict(collector.collected),
                "is_ready_to_confirm": False,
                "missing_fields":      collector.missing_fields
            }

        # ─── idle state: understand intent ───
        retrieved = retrieve_service(
            message,
            self.collection,
            self.chunks,
            self.bm25,
            self.services_list
        )
        if retrieved:
            self.last_services[session_id] = retrieved
        elif looks_like_service_followup(message):
            retrieved = self.last_services.get(session_id)

        try:
            intent = classify_intent(message, retrieved, clean_history)
        except (json.JSONDecodeError, Exception) as exc:
            print(f"Intent classification fallback: {exc}")
            intent = classify_intent_fallback(message, retrieved)

        intent_name = intent.get("intent", "general")
        confirmed_service = intent.get("confirmed_service")
        if retrieved and looks_like_service_followup(message):
            intent_name = "use_service"
            confirmed_service = retrieved["service_name"]

        if intent_name == "use_service" and confirmed_service and retrieved:
            if service_allows_collection(retrieved):
                start_msg = collector.start(
                    retrieved["service_name"],
                    retrieved["required_docs"]
                )
                response = start_msg
            else:
                response = (
                    f"خدمة **{retrieved['service_name']}** متاحة للاستفسار فقط ولا تحتاج جمع بيانات من الشات.\n\n"
                    f"{answer_from_service(message, retrieved)}"
                )

        elif intent_name == "qa" and confirmed_service and retrieved:
            response = answer_from_service(message, retrieved)

        else:
            response = general_chat(message, clean_history, self.services_summary)

        return {
            "bot_response":        response,
            "service_name":        collector.service_name or (retrieved["service_name"] if intent_name in ["qa", "use_service"] and retrieved else None),
            "collected_data":      dict(collector.collected) or None,
            "is_ready_to_confirm": False,
            "missing_fields":      collector.missing_fields or None
        }


# ─────────────────────────────────────────────
# 11. DEMO / ENTRY POINT
# ─────────────────────────────────────────────
if __name__ == "__main__":
    print("=" * 60)
    print("  🤖 مساعد الخدمات الحكومية الذكي")
    print("  اكتب 'خروج' للإنهاء")
    print("=" * 60 + "\n")

    bot = GovernmentChatbot()
    history: list[dict] = []

    while True:
        user_input = input("أنت: ").strip()
        if not user_input:
            continue
        if user_input in ["خروج", "exit", "quit"]:
            print("وداعاً! 👋")
            break

        result = bot.chat(user_input, history, session_id="demo")
        print(f"\n🤖 المساعد: {result['bot_response']}\n")

        # keep local history for CLI demo
        history.append({"role": "user",      "content": user_input})
        history.append({"role": "assistant",  "content": result["bot_response"]})
        if len(history) > 20:
            history = history[-20:]

        if result.get("is_ready_to_confirm"):
            print(f"[RAG -> C#] Service: {result['service_name']}")
            print(f"[RAG -> C#] CollectedData: {result['collected_data']}\n")
