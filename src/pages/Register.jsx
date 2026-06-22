import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Modal from "../components/Modal";

const API_URL = "https://foodiehub-backend-production.up.railway.app";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState({ type: "", message: "" });
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !email || !password) {
      setModal({ type: "error", message: "Please fill in all fields." });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setModal({ type: "success", message: "Registration successful! Please login." });
      } else {
        setModal({ type: "error", message: data.message || "Registration failed." });
      }
    } catch (error) {
      console.error("Register error:", error);
      setModal({ type: "error", message: "Something went wrong. Please try again." });
    }
  };

  const handleModalClose = () => {
    if (modal.type === "success") {
      navigate("/login");
    }
    setModal({ type: "", message: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-[#2C3E50] mb-10">
          Register to your Account
        </h1>

        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-gray-200 rounded-md px-4 py-3 mb-4 outline-none"
        />

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
          className="w-full bg-gray-200 rounded-md px-4 py-3 mb-10 outline-none"
        />

        <button
          onClick={handleRegister}
          className="w-full bg-[#E67E22] text-white font-bold py-3 rounded-md hover:bg-[#d3691a] transition"
        >
          Register
        </button>

        <p className="text-center text-pink-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold">
            Sign In
          </Link>
        </p>
      </div>

      <Modal
        type={modal.type}
        message={modal.message}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default Register;