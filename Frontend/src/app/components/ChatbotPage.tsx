// ============================================================
// ChatbotPage.tsx — fixed layout with proper scrollbars
// ============================================================
import { useState, useEffect, useRef } from "react";
import { conversationsApi } from "@/services/api";
import { authService } from "@/services/authService";
import { ConversationStatus } from "@/types/api.types";
import type { ConversationDTO, MessageResponseDTO } from "@/types/api.types";
import { AuthModal } from "./AuthModal";

interface ChatbotPageProps {
  currentLang?: "ar" | "en";
  onPageChange?: (page: string) => void;
  user?: any;
  onLoginSuccess?: (user: any) => void;
  onRegisterSuccess?: (user: any) => void;
}

interface UIMessage {
  id: number;
  content: string;
  isUser: boolean;
  isReadyToConfirm?: boolean;
  missingFields?: string[] | null;
  detectedServiceName?: string | null;
}

const CONFIRM_WORDS = ["نعم", "yes", "أكد", "تأكيد", "موافق", "اوكي", "ok", "okay", "يلا", "تمام", "ايوه", "آه"];

function isConfirmationMessage(text: string): boolean {
  const normalized = text.trim().toLowerCase();
  return CONFIRM_WORDS.some(w => normalized === w || normalized === w + "،" || normalized === w + ".");
}

// ── Welcome message — ثابتة ومش بتتشال ──────────────────────
const WELCOME_MESSAGE: UIMessage = {
  id: 0,
  content: "أهلاً! أنا مساعدك الذكي. أخبرني بالخدمة التي تحتاجها وسأساعدك في إتمامها.",
  isUser: false,
};

export function ChatbotPage({ onPageChange, onLoginSuccess, onRegisterSuccess }: ChatbotPageProps) {
  const [conversations, setConversations] = useState<ConversationDTO[]>([]);
  const [activeConvId, setActiveConvId] = useState<number | null>(null);
  const [activeConvStatus, setActiveConvStatus] = useState<ConversationStatus>(ConversationStatus.Active);
  const [messages, setMessages] = useState<UIMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isLoggedIn = authService.isLoggedIn();

  const lastBotMsg = [...messages].reverse().find(m => !m.isUser);

  useEffect(() => {
    if (!isLoggedIn) return;
    conversationsApi.getAll()
      .then(setConversations)
      .catch(() => setConversations([]));
  }, [isLoggedIn]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const openConversation = async (conv: ConversationDTO) => {
    setLoading(true);
    setError(null);
    try {
      const detail = await conversationsApi.getById(conv.id);
      setActiveConvId(detail.id);
      setActiveConvStatus(detail.status);
      let parsedMessages: UIMessage[] = [WELCOME_MESSAGE];
      try {
        const raw = JSON.parse(detail.messages ?? "[]");
        if (Array.isArray(raw) && raw.length > 0) {
          parsedMessages = [
            WELCOME_MESSAGE,
            ...raw.map((m: any, i: number) => ({
              id: i + 1,
              content: m.content ?? m.botResponse ?? m.BotResponse ?? "",
              isUser: m.role === "user" || m.isUser === true,
              detectedServiceName: m.detectedServiceName ?? null,
            })),
          ];
        }
      } catch { /* ابدأ بالـ welcome فقط */ }
      setMessages(parsedMessages);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "فشل تحميل المحادثة");
    } finally {
      setLoading(false);
    }
  };

  const startNewConversation = async () => {
    setLoading(true);
    setError(null);
    try {
      const conv = await conversationsApi.create();
      setConversations(prev => [conv, ...prev]);
      setActiveConvId(conv.id);
      setActiveConvStatus(conv.status);
      setMessages([WELCOME_MESSAGE]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "فشل إنشاء المحادثة");
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !activeConvId || sending) return;

    const sentText = input.trim();
    const userMsg: UIMessage = { id: Date.now(), content: sentText, isUser: true };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setSending(true);
    setError(null);

    try {
      // الأوتوميشن بيبدأ تلقائي لما isReadyToConfirm = true — مش محتاج تأكيد يدوي

      const response: MessageResponseDTO = await conversationsApi.sendMessage(activeConvId, { message: sentText });

      // أضف رسالة البوت دايماً
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        content: response.botResponse,
        isUser: false,
        isReadyToConfirm: response.isReadyToConfirm,
        missingFields: response.missingFields,
        detectedServiceName: response.detectedServiceName,
      }]);

      // لو جاهز للتأكيد — ابدأ الأوتوميشن فوراً بدون ما تستنى اليوزر
      if (response.isReadyToConfirm && activeConvStatus === ConversationStatus.Active) {
        setSending(false);
        // رسالة "جاري التنفيذ" تظهر فوراً
        // setMessages(prev => [...prev, {
        //   id: Date.now() + 2,
        //   content: "⏳ جاري تنفيذ الخدمة تلقائياً...",
        //   isUser: false,
        // }]);
        await autoConfirm();
        return;
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "فشل إرسال الرسالة");
      setMessages(prev => prev.filter(m => m.id !== userMsg.id));
      setInput(sentText);
    } finally {
      setSending(false);
    }
  };

  const autoConfirm = async () => {
    if (!activeConvId) return;
    setConfirming(true);
    try {
      await conversationsApi.confirm(activeConvId);
      setActiveConvStatus(ConversationStatus.Confirmed);
      setConversations(prev => prev.map(c =>
        c.id === activeConvId ? { ...c, status: ConversationStatus.Confirmed } : c
      ));
      setMessages(prev => [...prev, {
        id: Date.now() + 3,
        content: "✅ تم تنفيذ الطلب بنجاح! يمكنك متابعة حالته من صفحة طلباتي.",
        isUser: false,
      }]);
    } catch (err: unknown) {
      setMessages(prev => [...prev, {
        id: Date.now() + 3,
        content: "❌ حدث خطأ أثناء تنفيذ الطلب، حاول مرة أخرى.",
        isUser: false,
      }]);
    } finally {
      setConfirming(false);
    }
  };

  const deleteConversation = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await conversationsApi.delete(id);
      setConversations(prev => prev.filter(c => c.id !== id));
      if (activeConvId === id) {
        setActiveConvId(null);
        setMessages([WELCOME_MESSAGE]);
      }
    } catch { /* silent */ }
  };

  const isConfirmed = activeConvStatus === ConversationStatus.Confirmed;

  // ── Not logged in ─────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-background" style={{ marginTop: "64px" }}>
          <div className="text-center p-8">
            <div className="text-6xl mb-4">🤖</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">المساعد الذكي لدليل</h2>
            <p className="text-muted-foreground mb-6">سجّل دخولك أو أنشئ حساباً جديداً للبدء في تقديم طلباتك الحكومية</p>
            <button onClick={() => setAuthModalOpen(true)}
              className="px-8 py-3 rounded-xl bg-[#B01E28] text-white font-semibold hover:bg-[#8B1721] transition shadow-lg">
              تسجيل الدخول / إنشاء حساب
            </button>
          </div>
        </div>
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          currentLang="ar"
          onLoginSuccess={(userData) => { onLoginSuccess?.(userData); setAuthModalOpen(false); window.location.reload(); }}
          onRegisterSuccess={(userData) => { onRegisterSuccess?.(userData); setAuthModalOpen(false); window.location.reload(); }}
        />
      </>
    );
  }

  // ── Main Layout ───────────────────────────────────────────
  // الصفحة كلها ثابتة، بس المحتوى جوّاها هو اللي بيتسكرول
  return (
    <div
      className="flex bg-background overflow-hidden"
      style={{ height: "100vh", paddingTop: "64px" }}
    >
      {/* ════════════════════════════════════════════════════ */}
      {/* Sidebar — ثابت، المحادثات هي اللي بتتسكرول          */}
      {/* ════════════════════════════════════════════════════ */}
      <div className="w-64 border-l border-border flex flex-col bg-card shrink-0 overflow-hidden">
        {/* Header ثابت */}
        <div className="p-3 border-b border-border shrink-0">
          <button onClick={startNewConversation} disabled={loading}
            className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition disabled:opacity-60">
            + محادثة جديدة
          </button>
        </div>

        {/* قائمة المحادثات — بتتسكرول لوحدها */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {conversations.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center mt-4">لا توجد محادثات سابقة</p>
          ) : (
            conversations.map(conv => (
              <div key={conv.id} onClick={() => openConversation(conv)}
                className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition group ${activeConvId === conv.id ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{conv.detectedServiceName ?? `محادثة #${conv.id}`}</p>
                  {conv.status === ConversationStatus.Confirmed && <span className="text-xs text-green-600">✅ مؤكدة</span>}
                </div>
                <button onClick={(e) => deleteConversation(conv.id, e)}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition text-xs px-1 shrink-0">✕</button>
              </div>
            ))
          )}
        </div>

        {/* Footer ثابت */}
        <div className="p-3 border-t border-border shrink-0">
          <button onClick={() => onPageChange?.("requests")}
            className="w-full py-2 rounded-lg border border-border text-sm text-foreground hover:bg-muted transition">
            📋 طلباتي
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════ */}
      {/* Chat Area — ثابتة، الرسائل هي اللي بتتسكرول         */}
      {/* ════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {!activeConvId ? (
          /* ── No active conversation ── */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🤖</div>
              <h2 className="text-xl font-bold text-foreground mb-2">المساعد الذكي لدليل</h2>
              <p className="text-muted-foreground mb-6">ابدأ محادثة وسأساعدك في تقديم طلبك الحكومي</p>
              <button onClick={startNewConversation} disabled={loading}
                className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition disabled:opacity-60">
                {loading ? "جاري الإنشاء..." : "ابدأ محادثة جديدة"}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* ── Messages area — بتتسكرول لوحدها ── */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {loading ? (
                <div className="flex justify-center mt-8">
                  <p className="text-muted-foreground animate-pulse">جاري التحميل...</p>
                </div>
              ) : (
                messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.isUser ? "justify-start" : "justify-end"}`}>
                    <div className="max-w-[70%] space-y-2">
                      <div className={`px-4 py-2.5 rounded-2xl text-sm ${
                        msg.isUser
                          ? "bg-primary text-primary-foreground rounded-tr-sm"
                          : "bg-muted text-foreground rounded-tl-sm"
                      }`}>
                        {msg.content}
                      </div>
                      {!msg.isUser && msg.missingFields && msg.missingFields.length > 0 && (
                        <div className="px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-800">
                          <p className="font-medium mb-1">⚠️ بيانات ناقصة:</p>
                          <ul className="list-disc list-inside space-y-0.5">
                            {msg.missingFields.map((f, i) => <li key={i}>{f}</li>)}
                          </ul>
                        </div>
                      )}
                      {!msg.isUser && msg.detectedServiceName && (
                        <p className="text-xs text-primary px-1">🏛️ الخدمة: {msg.detectedServiceName}</p>
                      )}
                    </div>
                  </div>
                ))
              )}
              {sending && (
                <div className="flex justify-end">
                  <div className="bg-muted px-4 py-2.5 rounded-2xl rounded-tl-sm text-sm text-muted-foreground animate-pulse">
                    جاري الكتابة...
                  </div>
                </div>
              )}
              {confirming && (
                <div className="flex justify-end">
                  <div className="bg-blue-50 border border-blue-200 px-4 py-2.5 rounded-2xl text-sm text-blue-700 animate-pulse">
                    ⏳ جاري تنفيذ الخدمة...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* ── Input area — ثابتة في الأسفل مع shadow ── */}
            <div className="shrink-0 border-t border-border bg-card shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
              {error && (
                <div className="px-4 pt-3">
                  <div className="p-2 rounded-lg bg-destructive/10 text-destructive text-xs text-center">{error}</div>
                </div>
              )}
              {isConfirmed && (
                <div className="px-4 pt-3">
                  <div className="p-2 rounded-lg bg-green-50 border border-green-200 text-green-800 text-xs text-center">
                    ✅ تم تأكيد هذا الطلب — يمكنك متابعته من طلباتي
                  </div>
                </div>
              )}
              <form onSubmit={sendMessage} className="p-4 flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder={isConfirmed ? "تم تأكيد هذه المحادثة" : "اكتب رسالتك هنا..."}
                  disabled={sending || isConfirmed || confirming}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60 text-sm"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || sending || isConfirmed || confirming}
                  className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition disabled:opacity-60 text-sm shrink-0"
                >
                  إرسال
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
