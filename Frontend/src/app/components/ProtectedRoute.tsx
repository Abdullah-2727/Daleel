// ============================================================
// ProtectedRoute.tsx — يحمي الصفحات اللي تحتاج login
// الاستخدام في App.tsx:
//   <ProtectedRoute><AccountPage /></ProtectedRoute>
// ============================================================
import { authService } from "@/services/authService";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  if (!authService.isLoggedIn()) {
    // مش مسجل دخول — روّحه لصفحة الـ login
    window.location.href = redirectTo;
    return null;
  }

  return <>{children}</>;
}
