import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const usernameEnv = import.meta.env.VITE_DEMO_USERNAME;
const passwordEnv = import.meta.env.VITE_DEMO_PASSWORD;

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === usernameEnv && password === passwordEnv) {
      localStorage.setItem("isAuthenticated", "true");
      toast.success("Login successful!");
      navigate("/rates");
    } else {
      toast.error("Invalid credentials!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-dvh">
      <form onSubmit={handleLogin} className="w-full md:w-96 px-6">
        <h2 className="text-2xl font-bold mb-12">Welcome back!</h2>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Login</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none"
          />
        </div>
        <div className="mb-8">
          <label className="block mb-2 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-ppblue text-white py-3 rounded outline-none focus:scale-105 transition-transform duration-200 font-semibold"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
