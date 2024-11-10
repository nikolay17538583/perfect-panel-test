import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Rates from "./pages/Rates";
import Convert from "./pages/Convert";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/rates",
    element: (
      <PrivateRoute>
        <Rates />
      </PrivateRoute>
    ),
  },
  {
    path: "/convert",
    element: (
      <PrivateRoute>
        <Convert />
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
}
