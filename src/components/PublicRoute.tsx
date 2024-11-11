import { Navigate } from "react-router-dom";
import { RouteProps } from "../types";
import { useContext } from "react";
import AuthContext from "../contexts/authContext";

const PublicRoute: React.FC<RouteProps> = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <Navigate to="/rates" /> : <>{children}</>;
};

export default PublicRoute;
