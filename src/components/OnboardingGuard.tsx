import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export const OnboardingGuard = ({ children }) => {
  const { user, profile } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (profile?.username) return <Navigate to="/" replace />;

  return children;
};