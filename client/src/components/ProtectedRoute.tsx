import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth(); //  hook som kollar om man har en token
  const location = useLocation();

  if (!user) {
    // Redirect till login, men spara vart de försökte gå
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};
