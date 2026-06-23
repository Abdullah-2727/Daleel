"""
FastAPI endpoint that matches the C# DTOs:

  ← Receives (RagRequestDTO):
      ConversationId : int
      UserId         : str
      Message        : str
      History        : str   (JSON-encoded list of {role, content} objects)

  → Returns (RagResponseDTO):
      BotResponse        : str
      ServiceName        : str | None
      CollectedData      : dict[str, str] | None
      IsReadyToConfirm   : bool
      MissingFields      : list[str] | None

CHANGES vs original:
  - ChatRequest  → RagRequest  (new field names + History JSON string)
  - ChatResponse → RagResponse (new field names from DTO)
  - history is parsed from the JSON string and forwarded to chatbot.chat()
  - session_id is derived from ConversationId  (str(req.conversation_id))
  - process_service_request is triggered when is_ready_to_confirm == True
"""

import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from chatbot import GovernmentChatbot

app = FastAPI(title="Government Services RAG API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

chatbot = GovernmentChatbot()


# ─────────────────────────────────────────────
# REQUEST / RESPONSE MODELS  (match C# DTOs)
# ─────────────────────────────────────────────

class RagRequest(BaseModel):
    """Maps to C#  RagRequestDTO"""
    ConversationId: int
    UserId:         str
    Message:        str
    History:        str = "[]"   # JSON string: list[{role, content}]


class RagResponse(BaseModel):
    """Maps to C#  RagResponseDTO"""
    BotResponse:        str
    ServiceName:        str | None            = None
    CollectedData:      dict[str, str] | None = None
    IsReadyToConfirm:   bool                  = False
    MissingFields:      list[str] | None      = None


# ─────────────────────────────────────────────
# MAIN CHAT ENDPOINT
# ─────────────────────────────────────────────

@app.post("/chat", response_model=RagResponse)
async def chat_endpoint(req: RagRequest):
    """
    Receives RagRequestDTO, returns RagResponseDTO.

    History is a JSON string the C# client builds from the conversation
    so far. We parse it here and pass it to the chatbot.

    session_id = str(ConversationId)  — keeps DocumentCollector state
    separate per conversation.
    """

    # Parse history from JSON string sent by C#
    try:
        history: list[dict] = json.loads(req.History)
        if not isinstance(history, list):
            history = []
    except (json.JSONDecodeError, TypeError):
        history = []

    session_id = str(req.ConversationId)

    result = chatbot.chat(
        message    = req.Message,
        history    = history,
        session_id = session_id
    )

    # If all data collected → hand off to your backend logic
    if result["is_ready_to_confirm"]:
        await process_service_request(
            conversation_id = req.ConversationId,
            user_id         = req.UserId,
            service_name    = result["service_name"],
            collected_data  = result["collected_data"]
        )

    return RagResponse(
        BotResponse      = result["bot_response"],
        ServiceName      = result.get("service_name"),
        CollectedData    = result.get("collected_data"),
        IsReadyToConfirm = result["is_ready_to_confirm"],
        MissingFields    = result.get("missing_fields")
    )


# ─────────────────────────────────────────────
# BACKEND PROCESSING HOOK
# ─────────────────────────────────────────────

async def process_service_request(
    conversation_id: int,
    user_id:         str,
    service_name:    str | None,
    collected_data:  dict | None
):
    """
    Called automatically when IsReadyToConfirm == True.
    Put your real backend logic here:
      - save to database
      - call external government API
      - send confirmation email / SMS
      - etc.

    Example payload received:
    {
        "conversation_id": 42,
        "user_id": "user-abc",
        "service_name": "الاستعلام عن مخالفات رخص القيادة",
        "collected_data": {
            "نوع الترخيص": "ملاكي",
            "رقم الرخصة": "12345",
            "المحافظة": "القاهرة",
            "وحدة الترخيص": "مدينة نصر"
        }
    }
    """
    print(f"[BACKEND] ConversationId : {conversation_id}")
    print(f"[BACKEND] UserId         : {user_id}")
    print(f"[BACKEND] Service        : {service_name}")
    print(f"[BACKEND] CollectedData  : {collected_data}")
    # TODO: add your logic here


# ─────────────────────────────────────────────
# UTILITY ENDPOINTS
# ─────────────────────────────────────────────

@app.get("/services")
async def list_services():
    """List available service names"""
    return [s["اسم الخدمة"] for s in chatbot.services]


@app.get("/health")
async def health():
    return {"status": "ok"}