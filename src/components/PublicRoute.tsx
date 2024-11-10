import { Navigate } from "react-router-dom";
import { RouteProps } from "../types";

const PublicRoute: React.FC<RouteProps> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("isAuthenticated");

  return isAuthenticated ? <Navigate to="/rates" /> : <>{children}</>;
};

export default PublicRoute;
