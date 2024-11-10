import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Rates from "./pages/Rates";
import Convert from "./pages/Convert";
import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
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
  return <RouterProvider router={router} />;
}
