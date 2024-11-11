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
import MainLayout from "./components/MainLayout";
import AuthProvider from "./components/AuthProvider";

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
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="rates" replace />,
      },
      {
        path: "rates",
        element: (
          <PrivateRoute>
            <Rates />
          </PrivateRoute>
        ),
      },
      {
        path: "convert",
        element: (
          <PrivateRoute>
            <Convert />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
  );
}
