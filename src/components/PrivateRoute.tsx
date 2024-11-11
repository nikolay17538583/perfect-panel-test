import { Navigate } from "react-router-dom";
import { RouteProps } from "../types";
import { useContext } from "react";
import AuthContext from "../contexts/authContext";

const PrivateRoute: React.FC<RouteProps> = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
