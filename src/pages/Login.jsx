import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../UserContext";

const API_URL = "https://foodiehub-backend-production.up.railway.app";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserId, saveToken, authToken } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) navigate("/home");
  }, [authToken]);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.message === "Invalid email or password") {
        alert(data.message);
        return;
      }

      if (data.token) {
        saveToken(data.token);
        const decoded = jwtDecode(data.token);
        setUserId(decoded.userId);
        navigate("/home");
      } else {
        alert("Server response missing token.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-[#2C3E50] mb-10">
          Login to your Account
        </h1>

        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-200 rounded-md px-4 py-3 mb-4 outline-none"
        />

        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-gray-200 rounded-md px-4 py-3 mb-2 outline-none"
        />

        <div className="flex justify-between items-center mb-10 text-sm">
          <span>Keep me logged in</span>
          <span className="text-pink-600 font-medium cursor-pointer">
            Forgot Password
          </span>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-[#E67E22] text-white font-bold py-3 rounded-md hover:bg-[#d3691a] transition"
        >
          Login
        </button>

        <p className="text-center text-pink-500 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
