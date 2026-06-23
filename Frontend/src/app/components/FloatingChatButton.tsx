// ============================================================
// FloatingChatButton.tsx — زرار عائم يظهر في كل الصفحات
// ما عدا الـ Hero section في الـ Homepage
// ============================================================
import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

interface FloatingChatButtonProps {
  onPageChange: (page: string) => void;
  currentPage: string;
}

export function FloatingChatButton({ onPageChange, currentPage }: FloatingChatButtonProps) {
  const [showOnHome, setShowOnHome] = useState(false);

  // في الـ homepage يظهر بس بعد ما المستخدم يسكرول لتاني section
  useEffect(() => {
    if (currentPage !== "home") return;

    const handleScroll = () => {
      // الـ hero section = 100vh، لو سكرول أكتر من كده يظهر الزرار
      setShowOnHome(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage]);

  // مخفي في صفحة الـ chatbot نفسها
  if (currentPage === "chatbot") return null;
  // مخفي في صفحة الـ dashboard نفسها
  if (currentPage === "dashboard") return null;
  // في الـ homepage — يظهر بس بعد تاني section
  if (currentPage === "home" && !showOnHome) return null;

  return (
    <button
      onClick={() => onPageChange("chatbot")}
      className="fixed bottom-6 right-6 z-40 group flex items-center gap-2 bg-[#B01E28] hover:bg-[#8B1721] text-white rounded-full shadow-2xl shadow-[#B01E28]/40 transition-all duration-300 hover:scale-105"
      style={{ padding: "12px 20px" }}
      title="المساعد الذكي"
    >
      <Sparkles className="w-5 h-5 animate-pulse" />
      
      {/* Pulse ring */}
      <span className="absolute -top-1 -right-1 w-3 h-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5B80B] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E5B80B]"></span>
      </span>
    </button>
  );
}
