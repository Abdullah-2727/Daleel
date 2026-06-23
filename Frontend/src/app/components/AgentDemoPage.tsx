import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { MessageCircle, Send, Mic, MicOff, Settings, User, Bot, Globe, Smartphone, MessageSquare } from 'lucide-react';

interface AgentDemoPageProps {
  currentLang: 'en' | 'ar';
  onPageChange: (page: string) => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  type?: 'text' | 'suggestion';
}

export function AgentDemoPage({ currentLang, onPageChange }: AgentDemoPageProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const translations = {
    en: {
      title: "Personal Assistance",
      subtitle: "Experience the power of your Egyptian AI assistant",
      chatWindow: "Chat with Masr Agent",
      settings: "Settings",
      voiceMode: "Voice Mode",
      language: "Language",
      integrations: "Integrations",
      typeMessage: "Type your message in Arabic or English...",
      send: "Send",
      suggestions: "Try asking:",
      suggestion1: "How do I renew my ID card?",
      suggestion2: "What's the weather in Cairo today?",
      suggestion3: "Find the nearest hospital",
      suggestion4: "Help me with traffic routes",
      agentTyping: "Masr Agent is typing...",
      signupCTA: "Sign up to unlock full features",
      signup: "Sign Up Now",
      welcomeMessage: "مرحباً! I'm your Egyptian AI assistant. How can I help you today? You can ask me anything in Arabic or English.",
      demoNotice: "This is a demo version. Sign up for the full experience with real-time data and personalized assistance."
    },
    ar: {
      title: "مساعد شخصي",
      subtitle: "اختبر قوة مساعدك الذكي المصري",
      chatWindow: "دردش مع مساعد مصر",
      settings: "الإعدادات",
      voiceMode: "الوضع الصوتي", 
      language: "اللغة",
      integrations: "التكاملات",
      typeMessage: "اكتب رسالتك بالعربية أو الإنجليزية...",
      send: "إرسال",
      suggestions: "جرب أن تسأل:",
      suggestion1: "إزاي أجدد البطاقة الشخصية؟",
      suggestion2: "إيه الجو في القاهرة النهاردة؟",
      suggestion3: "فين أقرب مستشفى؟",
      suggestion4: "ساعدني في طرق المرور",
      agentTyping: "مساعد مصر بيكتب...",
      signupCTA: "سجل للوصول للمميزات الكاملة",
      signup: "سجل الآن",
      welcomeMessage: "مرحباً! أنا مساعدك الذكي المصري. إزاي ممكن أساعدك النهاردة؟ ممكن تسألني أي حاجة بالعربي أو الإنجليزي.",
      demoNotice: "دي نسخة تجريبية. سجل للحصول على التجربة الكاملة مع البيانات الفورية والمساعدة الشخصية."
    }
  };

  const t = translations[currentLang];

  const predefinedResponses = {
    en: {
      "id card": "To renew your ID card online: 1) Visit the Digital Egypt portal, 2) Login with your national ID, 3) Select 'ID Card Renewal', 4) Upload required documents, 5) Pay the fee online. The new card will be delivered to your address in 7-10 days.",
      "weather": "Today in Cairo: Sunny with a high of 28°C and low of 20°C. Light winds from the north. Perfect weather for outdoor activities! 🌞",
      "hospital": "Here are the nearest hospitals to your location:\n\n🏥 Kasr Al Ainy Hospital - 2.5km\n🏥 Dar Al Fouad Hospital - 3.1km\n🏥 As-Salam Hospital - 4.2km\n\nWould you like directions to any of these?",
      "traffic": "Current traffic in Cairo:\n\n🔴 Heavy: Ring Road, Salah Salem\n🟡 Moderate: Tahrir Square, Zamalek Bridge\n🟢 Light: New Cairo, Maadi\n\nBest route to avoid traffic: Take the Corniche → 15th May Bridge → Your destination",
      "default": "I understand your question! As an Egyptian AI assistant, I can help you with government services, daily tasks, weather updates, and local information. What specific topic would you like assistance with?"
    },
    ar: {
      "بطاقة": "علشان تجدد البطاقة الشخصية أونلاين: 1) ادخل على بوابة مصر الرقمية، 2) سجل دخول بالرقم القومي، 3) اختار 'تجديد البطاقة الشخصية'، 4) ارفع المستندات المطلوبة، 5) ادفع الرسوم أونلاين. البطاقة الجديدة هتوصلك في البيت خلال 7-10 أيام.",
      "جو": "النهاردة في القاهرة: مشمس مع درجة حرارة عالية 28° ومنخفضة 20°. رياح خفيفة من الشمال. جو حلو للخروج! 🌞",
      "مستشفى": "أقرب المستشفيات ليك:\n\n🏥 مستشفى قصر العيني - 2.5 كم\n🏥 مستشفى دار الفؤاد - 3.1 كم\n🏥 مستشفى السلام - 4.2 كم\n\nعايز اتجاهات لأي منهم؟",
      "مرور": "حالة المرور في القاهرة دلوقتي:\n\n🔴 زحمة شديدة: الطريق الدائري، صلاح سالم\n🟡 زحمة متوسطة: ميدان التحرير، كوبري الزمالك\n🟢 زحمة خفيفة: القاهرة الجديدة، المعادي\n\nأحسن طريق تتجنب بيه الزحمة: خد الكورنيش ← كوبري 15 مايو ← وجهتك",
      "default": "فهمت سؤالك! كمساعد ذكي مصري، أقدر أساعدك في الخدمات الحكومية، المهام اليومية، أحوال الطقس، والمعلومات المحلية. عايز مساعدة في إيه بالتحديد؟"
    }
  };

  useEffect(() => {
    // Add welcome message when component mounts
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        text: t.welcomeMessage,
        sender: 'agent',
        timestamp: new Date()
      }]);
    }
  }, [t.welcomeMessage, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    const responses = predefinedResponses[currentLang];
    
    if (message.includes('id') || message.includes('card') || message.includes('بطاقة') || message.includes('هوية')) {
      return responses["id card"] || responses["بطاقة"];
    } else if (message.includes('weather') || message.includes('جو') || message.includes('طقس')) {
      return responses["weather"] || responses["جو"];
    } else if (message.includes('hospital') || message.includes('مستشفى') || message.includes('دكتور')) {
      return responses["hospital"] || responses["مستشفى"];
    } else if (message.includes('traffic') || message.includes('مرور') || message.includes('زحمة') || message.includes('طريق')) {
      return responses["traffic"] || responses["مرور"];
    }
    
    return responses["default"];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(inputMessage),
        sender: 'agent',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, agentResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const suggestions = [
    t.suggestion1,
    t.suggestion2,
    t.suggestion3,
    t.suggestion4
  ];

  return (
    <div className={`min-h-screen bg-gray-50 pt-20 ${currentLang === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/10 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl text-primary mb-4">
            {t.title}
          </h1>
          <p className="text-lg text-gray-600">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Demo Interface */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Chat Window */}
            <div className="lg:col-span-3">
              <Card className="h-[600px] flex flex-col border-2">
                <CardHeader>
                  <CardTitle className="flex items-center text-primary">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    {t.chatWindow}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-0">
                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender === 'user'
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <div className="flex items-start space-x-2">
                            {message.sender === 'agent' && (
                              <Bot className="h-4 w-4 mt-1 text-primary" />
                            )}
                            {message.sender === 'user' && (
                              <User className="h-4 w-4 mt-1 text-white" />
                            )}
                            <div className="flex-1">
                              <p className="whitespace-pre-line">{message.text}</p>
                              <p className={`text-xs mt-1 ${
                                message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                              }`}>
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Bot className="h-4 w-4" />
                            <span className="text-sm">{t.agentTyping}</span>
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area */}
                  <div className="border-t p-4">
                    <div className="flex space-x-2">
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder={t.typeMessage}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim()}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                        className={isVoiceEnabled ? "text-primary border-primary" : ""}
                      >
                        {isVoiceEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Settings Panel */}
            <div className="space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center text-primary">
                    <Settings className="h-5 w-5 mr-2" />
                    {t.settings}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>{t.voiceMode}</Label>
                    <Switch
                      checked={isVoiceEnabled}
                      onCheckedChange={setIsVoiceEnabled}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t.language}</Label>
                    <div className="flex space-x-2">
                      <Badge variant={currentLang === 'en' ? 'default' : 'secondary'}>
                        English
                      </Badge>
                      <Badge variant={currentLang === 'ar' ? 'default' : 'secondary'}>
                        العربية
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-primary">{t.integrations}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-primary" />
                    <span className="text-sm">Web Platform</span>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-500">Mobile App</span>
                    <Badge variant="outline">Coming Soon</Badge>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-500">WhatsApp</span>
                    <Badge variant="outline">Beta</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-primary">{t.suggestions}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full text-left h-auto p-2 justify-start text-sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary to-primary/80">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-2xl md:text-3xl mb-4">
            {t.signupCTA}
          </h2>
          <p className="text-lg mb-6 text-white/90">
            {t.demoNotice}
          </p>
          <Button 
            size="lg" 
            onClick={() => onPageChange('contact')}
            className="bg-secondary text-primary hover:bg-secondary/90"
          >
            {t.signup}
          </Button>
        </div>
      </section>
    </div>
  );
}