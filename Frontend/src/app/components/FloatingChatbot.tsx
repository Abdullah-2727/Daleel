import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { MessageCircle, X, Sparkles } from 'lucide-react';

interface FloatingChatbotProps {
  currentLang: 'en' | 'ar';
  shouldOpen?: boolean;
  onOpenFullChat?: () => void;
}

export function FloatingChatbot({ currentLang, shouldOpen, onOpenFullChat }: FloatingChatbotProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const translations = {
    en: {
      chatbot: 'Daleel AI Assistant',
      tooltip: 'Chat with AI Assistant',
      newMessage: 'Ask me anything!'
    },
    ar: {
      chatbot: 'المساعد الذكي دليل',
      tooltip: 'محادثة مع المساعد الذكي',
      newMessage: 'اسألني عن أي شيء!'
    }
  };

  const t = translations[currentLang];

  // Auto-open full chat when shouldOpen prop is true
  useEffect(() => {
    if (shouldOpen && onOpenFullChat) {
      onOpenFullChat();
    }
  }, [shouldOpen, onOpenFullChat]);

  const handleClick = () => {
    if (onOpenFullChat) {
      onOpenFullChat();
    }
  };

  return (
    <div 
      className={`fixed bottom-4 ${currentLang === 'ar' ? 'left-4' : 'right-4'} z-40 animate-float`} 
      style={{ maxWidth: 'calc(100vw - 2rem)' }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Outer pulse ring */}
      
      
      {/* Secondary pulse ring */}
      
      
      
      
      {/* Active status indicator */}
      
    </div>
  );
}