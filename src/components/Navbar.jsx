import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useCart } from "../CartContext";

const Navbar = () => {
  const { authToken } = useContext(UserContext);
  const { cart } = useCart();
  const navigate = useNavigate();

  if (!authToken) return null;

  return (
    <nav className="bg-white shadow sticky top-0 z-10">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2"
        >
          <span className="text-xl">🍴</span>
          <span className="font-bold text-lg">
            <span className="text-[#2C3E50]">Foodie</span>
            <span className="text-[#E67E22]">Hub</span>
          </span>
        </button>

        <div className="flex gap-6 text-sm font-semibold">
          <Link to="/home" className="text-gray-600 hover:text-[#E67E22]">
            Home
          </Link>
          <Link to="/cart" className="text-gray-600 hover:text-[#E67E22] relative">
            Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-[#E67E22] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
          <Link to="/profile" className="text-gray-600 hover:text-[#E67E22]">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
