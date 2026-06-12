import { Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthContext";

export const OnboardingGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, profile, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (profile?.username) return <Navigate to="/feed" replace />;

  return <>{children}</>;
};