import { useState } from "react";
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
      navigate("/rates");
    } else {
      alert("Invalid credentials!");
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
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-ppblue"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-ppblue"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-ppblue text-white py-3 rounded focus:outline-sky-700 font-medium"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
