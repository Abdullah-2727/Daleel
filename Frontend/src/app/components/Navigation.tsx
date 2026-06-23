import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X, User, Settings, LogOut, UserCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { AuthModal } from './AuthModal';
import logoImage from '@/imports/Screenshot_2026-06-08_021823-removebg-preview.png';

interface NavigationProps {
  currentLang: 'ar';
  currentPage: string;
  onPageChange: (page: string) => void;
  user?: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  } | null;
  onLoginSuccess: (user: any) => void;
  onRegisterSuccess: (user: any) => void;
  onLogout: () => void;
  isLandingPage?: boolean;
}

export function Navigation({ currentLang, currentPage, onPageChange, user, onLoginSuccess, onRegisterSuccess, onLogout, isLandingPage = false }: NavigationProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Dynamic scroll-based header effect (Egyptian Government Style) - Only on landing page
  useEffect(() => {
    if (!isLandingPage) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 80);
    };

    // Check scroll position on mount
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLandingPage]);

  // Reset scroll detection when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const translations = {
    ar: {
      home: 'الرئيسية',
      contact: 'اتصل بنا',
      government: 'الخدمات الحكومية',
      knowledge: 'المعرفة المحلية',
      ministries: 'الوزارات',
      servicesCenter: 'مراكز الخدمات',
      home: 'الرئيسية',
      dashboard: 'لوحة التحكم',
      tryAgent: 'جرب المساعد',
      logo: 'مساعد مصر الذكي',
      login: 'تسجيل الدخول',
      profile: 'حسابي',
      settings: 'الإعدادات',
      logout: 'تسجيل الخروج',
      welcome: 'مرحباً',
      signUp: 'إنشاء حساب',
      account: 'الحساب'
    }
  };

  const t = translations[currentLang];
  const menuItems = user ? [
    { key: 'home', label: t.home },
    { key: 'ministries', label: t.ministries },
    { key: 'services-center', label: t.servicesCenter },
    { key: 'government', label: t.government },
    { key: 'knowledge', label: t.knowledge },
    { key: 'contact', label: t.contact }
  ] : [
    { key: 'home', label: t.home },
    { key: 'ministries', label: t.ministries },
    { key: 'services-center', label: t.servicesCenter },
    { key: 'government', label: t.government },
    { key: 'knowledge', label: t.knowledge },
    { key: 'contact', label: t.contact }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled
        ? 'bg-white shadow-md border-b border-[#CCD0CF]/50'
        : 'bg-transparent'
    } font-arabic`} dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div 
              className="cursor-pointer flex items-center hover:opacity-90 transition-all duration-300"
              onClick={() => onPageChange('home')}
            >
              <img 
                src={logoImage} 
                alt={t.logo}
                className="h-14 w-auto object-contain drop-shadow-sm transition-all duration-300"
              />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center gap-2 space-x-reverse">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => onPageChange(item.key)}
                  className={`px-4 py-2 rounded-md transition-all duration-300 ${
                    currentPage === item.key
                      ? 'text-white bg-[#B01E28] shadow-md'
                      : isScrolled
                        ? 'text-[#11212D] hover:text-[#B01E28] hover:bg-[#F8F9FA]'
                        : 'text-white hover:text-[#E5B80B] hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3 space-x-reverse">
            {user ? (
              <div className="flex items-center gap-3 space-x-reverse">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="relative h-10 w-10 rounded-full hover:bg-[#B01E28]/10 ring-2 ring-[#B01E28]/20 hover:ring-[#B01E28]/40 transition-all duration-200"
                    >
                      <Avatar className="h-10 w-10 ring-2 ring-[#B01E28]/30 transition-all">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-[#B01E28]/10 text-[#B01E28]">
                          {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {/* Active indicator */}
                      <div className="absolute -top-0.5 -right-0.5 h-3 w-3 bg-[#10B981] border-2 border-white rounded-full shadow-sm animate-pulse"></div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => onPageChange('dashboard')}
                      className={`${currentPage === 'dashboard' ? 'bg-primary/10 text-primary' : ''} focus:bg-primary/10 focus:text-primary`}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>{t.dashboard}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onPageChange('account')}
                      className={`${currentPage === 'account' ? 'bg-primary/10 text-primary' : ''} focus:bg-primary/10 focus:text-primary`}
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>{t.profile}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t.logout}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button 
                onClick={() => setIsAuthModalOpen(true)} 
                className={`rounded-full transition-all duration-300 ${
                  isScrolled
                    ? 'bg-[#E5B80B] hover:bg-[#C9A009] text-[#06141B] shadow-md'
                    : 'bg-white/20 backdrop-blur-sm text-white border border-white hover:bg-white hover:text-[#B01E28] shadow-lg'
                }`}
              >
                <UserCircle className="h-4 w-4 mr-2" />
                {t.account}
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`transition-all duration-300 ${
                isScrolled
                  ? 'text-[#11212D] hover:text-[#B01E28] hover:bg-[#F8F9FA]'
                  : 'text-white hover:text-[#E5B80B] hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-[#CCD0CF]/50 shadow-lg">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    onPageChange(item.key);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block px-3 py-2 rounded-md w-full text-left transition-colors ${
                    currentPage === item.key
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 border-t">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 bg-primary/5 border border-primary/20 rounded-md">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="h-8 w-8 ring-2 ring-primary/30">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="text-xs bg-primary/10 text-primary">
                              {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          {/* Active indicator for mobile */}
                          <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 bg-green-500 border border-white rounded-full shadow-sm"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium text-primary truncate">{user.name}</p>
                            <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full"></div>
                          </div>
                          <p className="text-xs text-primary/70 truncate">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={() => {
                        onPageChange('dashboard');
                        setIsMobileMenuOpen(false);
                      }}
                      variant="ghost" 
                      className={`w-full justify-start ${currentPage === 'dashboard' ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5 hover:text-primary'} transition-all duration-200`}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      {t.dashboard}
                    </Button>
                    <Button 
                      onClick={() => {
                        onPageChange('account');
                        setIsMobileMenuOpen(false);
                      }}
                      variant="ghost" 
                      className={`w-full justify-start ${currentPage === 'account' ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5 hover:text-primary'} transition-all duration-200`}
                    >
                      <User className="h-4 w-4 mr-2" />
                      {t.profile}
                    </Button>
                    <Button 
                      onClick={() => {
                        onLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      variant="outline" 
                      className="w-full justify-start"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {t.logout}
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <UserCircle className="h-4 w-4 mr-2" />
                    {t.account}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentLang={currentLang}
        onLoginSuccess={onLoginSuccess}
        onRegisterSuccess={onRegisterSuccess}
      />
    </nav>
  );
}