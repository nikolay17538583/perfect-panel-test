import { Navigate } from "react-router-dom";
import { RouteProps } from "../types";

const PrivateRoute: React.FC<RouteProps> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("isAuthenticated");

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
