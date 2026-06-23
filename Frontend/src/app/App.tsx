import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { Homepage } from "./components/Homepage";
import { ContactPage } from "./components/ContactPage";
import { CareersPage } from "./components/CareersPage";
import { UserDashboardPage } from "./components/UserDashboardPage";
import { FeaturesPage } from "./components/FeaturesPage";
import { GovernmentServicesPage } from "./components/GovernmentServicesPage";
import { LocalizedKnowledgePage } from "./components/LocalizedKnowledgePage";
import { ServiceDetailPage } from "./components/ServiceDetailPage";
import { MinistriesPage } from "./components/MinistriesPage";
import { ServicesCenterPage } from "./components/ServicesCenterPage";
import { RequestTrackingPage } from "./components/RequestTrackingPage";
import { AccountPage } from "./components/AccountPage";          // ← الجديدة
import { ProtectedRoute } from "./components/ProtectedRoute";    // ← الجديدة
import { MinistryOfInteriorPage } from "./components/MinistryOfInteriorPage";
import { MinistryOfEducationPage } from "./components/MinistryOfEducationPage";
import { MinistryOfHealthPage } from "./components/MinistryOfHealthPage";
import { TaxAuthorityPage } from "./components/TaxAuthorityPage";
import { LandRegistryAuthorityPage } from "./components/LandRegistryAuthorityPage";
import { SocialInsuranceAuthorityPage } from "./components/SocialInsuranceAuthorityPage";
import { UtilitiesAuthorityPage } from "./components/UtilitiesAuthorityPage";
import { TransportAuthorityPage } from "./components/TransportAuthorityPage";
import { JusticeMinistryPage } from "./components/JusticeMinistryPage";
import { BillPaymentsPage } from "./components/BillPaymentsPage";
import { MetroPage } from "./components/MetroPage";
import { RidesharePage } from "./components/RidesharePage";
import { TrafficPage } from "./components/TrafficPage";
import { FloatingChatbot } from "./components/FloatingChatbot";
import { ChatbotPage } from "./components/ChatbotPage";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import { FloatingChatButton } from "./components/FloatingChatButton";           // ← الجديدة
import { accountApi } from "@/services/api";                    // ← الجديدة

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [currentLang] = useState<"ar">("ar");
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    joinDate: string;
    avatar: string;
    status: string;
    nationalId: string;
    isVerified?: boolean;
    documents?: any;
    isNewUser?: boolean;
  } | null>(null);

  const [preSelectedService, setPreSelectedService] = useState<any>(null);
  const [userApplications, setUserApplications] = useState<any[]>([]);
  const [shouldOpenChatbot, setShouldOpenChatbot] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  // ── عند فتح التطبيق: لو في token محفوظ اجلب بيانات المستخدم ──
  useEffect(() => {
    if (authService.isLoggedIn()) {
      accountApi
        .getProfile()
        .then((profile) => {
          setUser({
            id: profile.id ?? "",
            name: profile.fullName ?? "",
            email: profile.email ?? "",
            phone: profile.phoneNumber ?? "",
            location: profile.address ?? "",
            joinDate: profile.createdAt ?? "",
            avatar: profile.profilePictureUrl ?? "",
            status: "active",
            nationalId: profile.nationalId ?? "",
            isVerified: true,
          });
        })
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : "";
          if (msg === "SESSION_EXPIRED" || msg.includes("401")) {
            // الـ token انتهى — اعمل logout وروّح الـ home
            authService.logout();
            setUser(null);
            setCurrentPage("home");
          }
          // أي error تاني (network, server down) — ابقى على نفس الصفحة
        });
    }
  }, []);

  const handlePageChange = (page: string, serviceData?: any) => {
    if (page.startsWith("service-")) {
      const serviceId = page.replace("service-", "");
      setSelectedServiceId(serviceId);
      setCurrentPage("service-detail");
    } else {
      setCurrentPage(page);
      setSelectedServiceId(null);
    }
    if (serviceData) {
      setPreSelectedService(serviceData);
    } else {
      setPreSelectedService(null);
    }
    window.scrollTo(0, 0);
  };

  // ── بعد نجاح الـ Login من الـ Navigation/AuthModal ──
  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    setCurrentPage("dashboard");
    toast.success("تم تسجيل الدخول بنجاح!");
  };

  // ── بعد نجاح الـ Register ──
  const handleRegisterSuccess = (userData: any) => {
    const newUser = { ...userData, isNewUser: true };
    setUser(newUser);
    setCurrentPage("dashboard");
    toast.success("تم إنشاء الحساب بنجاح!");
  };

  // ── Logout: يمسح الـ token والـ state ──
  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setCurrentPage("home");
    toast.success("تم تسجيل الخروج بنجاح!");
  };

  const handleUserUpdate = (updatedUser: any) => {
    setUser(updatedUser);
  };

  const handleAddApplication = (application: any) => {
    const newApplication = {
      ...application,
      id: `APP-${Date.now()}`,
      submissionDate: new Date().toLocaleDateString("ar-EG"),
      lastUpdate: new Date().toLocaleDateString("ar-EG"),
      progress: 10,
      status: "pending",
    };
    setUserApplications((prev) => [newApplication, ...prev]);
    toast.success(`تم تقديم طلب ${application.service} بنجاح!`);
  };

  const handleUpdateApplication = (applicationId: string, updates: any) => {
    setUserApplications((prev) =>
      prev.map((app) => (app.id === applicationId ? { ...app, ...updates } : app))
    );
  };

  const handleOpenChatbot = () => {
    setShouldOpenChatbot(true);
    setTimeout(() => setShouldOpenChatbot(false), 100);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Homepage onPageChange={handlePageChange} user={user} />;

      case "dashboard":
        return user ? (
          <UserDashboardPage
            onPageChange={handlePageChange}
            user={user}
            userApplications={userApplications}
            onUpdateApplication={handleUpdateApplication}
            onOpenChatbot={handleOpenChatbot}
          />
        ) : (
          <Homepage onPageChange={handlePageChange} user={user} />
        );

      case "contact":
        return <ContactPage currentLang={currentLang} onPageChange={handlePageChange} />;

      case "features":
        return <FeaturesPage currentLang={currentLang} onPageChange={handlePageChange} />;

      case "careers":
        return <CareersPage currentLang={currentLang} onPageChange={handlePageChange} />;

      case "government":
        return (
          <GovernmentServicesPage
            currentLang={currentLang}
            onPageChange={handlePageChange}
            initialMinistryId={preSelectedService?.ministryId}
            initialMinistryName={preSelectedService?.ministryName}
          />
        );

      case "knowledge":
        return <LocalizedKnowledgePage currentLang={currentLang} onPageChange={handlePageChange} />;

      case "ministries":
        return <MinistriesPage currentLang={currentLang} onPageChange={handlePageChange} />;

      case "services-center":
        return <ServicesCenterPage currentLang={currentLang} onPageChange={handlePageChange} />;

      case "service-detail":
        return selectedServiceId ? (
          <ServiceDetailPage
            serviceId={selectedServiceId}
            currentLang={currentLang}
            onPageChange={handlePageChange}
            onOpenChatbot={handleOpenChatbot}
          />
        ) : (
          <GovernmentServicesPage currentLang={currentLang} onPageChange={handlePageChange} />
        );

      case "ministry-interior":
        return <MinistryOfInteriorPage currentLang={currentLang} onPageChange={handlePageChange} />;

      case "ministry-education":
        return <MinistryOfEducationPage currentLang={currentLang} onPageChange={handlePageChange} />;

      case "ministry-health":
        return <MinistryOfHealthPage currentLang={currentLang} onPageChange={handlePageChange} />;

      case "tax-authority":
        return <TaxAuthorityPage currentLang={currentLang} onPageChange={handlePageChange} />;

      case "land-registry":
        return <LandRegistryAuthorityPage currentLang={currentLang} onPageChange={handlePageChange} />;

      case "social-insurance":
        return <SocialInsuranceAuthorityPage currentLang={currentLang} onPageChange={handlePageChange} />;

      case "utilities-authority":
        return <UtilitiesAuthorityPage currentLang={currentLang} onPageChange={handlePageChange} />;

      case "transport-authority":
        return <TransportAuthorityPage currentLang={currentLang} onPageChange={handlePageChange} />;

      case "justice-ministry":
        return <JusticeMinistryPage currentLang={currentLang} onPageChange={handlePageChange} />;

      case "bill-payments":
        return <BillPaymentsPage currentLang={currentLang} onPageChange={handlePageChange} />;

      case "metro":
        return <MetroPage currentLang={currentLang} onPageChange={handlePageChange} />;

      case "rideshare":
        return <RidesharePage currentLang={currentLang} onPageChange={handlePageChange} />;

      case "traffic":
        return <TrafficPage currentLang={currentLang} onPageChange={handlePageChange} />;

      // ── Account — محمي بـ ProtectedRoute ──
      case "requests":
        return (
          <ProtectedRoute redirectTo="home">
            <RequestTrackingPage onPageChange={handlePageChange} />
          </ProtectedRoute>
        );

      case "account":
        return (
          <ProtectedRoute redirectTo="home">
            <AccountPage />
          </ProtectedRoute>
        );

      case "chatbot":
        return (
          <ChatbotPage
            currentLang={currentLang}
            onPageChange={handlePageChange}
            user={user}
            onLoginSuccess={handleLoginSuccess}
            onRegisterSuccess={handleRegisterSuccess}
          />
        );

      default:
        return <Homepage onPageChange={handlePageChange} user={user} />;
    }
  };

  return (
    <div id="main-content" className="min-h-screen bg-background text-foreground rtl font-arabic" dir="rtl">
      <Navigation
        currentLang={currentLang}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        user={user}
        onLoginSuccess={handleLoginSuccess}
        onRegisterSuccess={handleRegisterSuccess}
        onLogout={handleLogout}
        isLandingPage={currentPage === "home"}
      />
      {renderPage()}
      <FloatingChatbot
        currentLang={currentLang}
        shouldOpen={shouldOpenChatbot}
        onOpenFullChat={() => setCurrentPage("chatbot")}
      />
      <Toaster />
      <FloatingChatButton onPageChange={handlePageChange} currentPage={currentPage} />
    </div>
  );
}
