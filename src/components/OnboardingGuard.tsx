import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthContext";

export const OnboardingGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();
  const isDiscover = new URLSearchParams(location.search).get('from') === 'discover';

  if (loading) return null;
  if (!user) return <Navigate to={`/login?redirect=/onboarding?from=discover`} replace />;
  if (profile?.username && !isDiscover) return <Navigate to="/feed" replace />;

  return <>{children}</>;
};