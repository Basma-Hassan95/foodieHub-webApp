import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";

const Cart = () => {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity, totalPrice } =
    useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-2xl mx-auto">
        {cart.length === 0 ? (
          <div className="text-center mt-20">
            <p className="text-lg text-gray-500">Your cart is empty!</p>
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow p-4 flex items-center gap-4 mb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-gray-500 mb-2">PKR {item.price}</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decrementQuantity(item._id)}
                      className="bg-[#FFC72C] text-white w-7 h-7 rounded font-bold"
                    >
                      -
                    </button>
                    <span className="font-bold">{item.quantity}</span>
                    <button
                      onClick={() => incrementQuantity(item._id)}
                      className="bg-[#FFC72C] text-white w-7 h-7 rounded font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="bg-[#E53935] text-white text-xs font-bold px-3 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="bg-white rounded-lg shadow p-4 mt-6">
              <p className="text-center font-bold text-lg mb-4">
                Total: PKR {totalPrice}
              </p>
              <button
                onClick={handleCheckout}
                className="w-full bg-[#E67E22] text-white font-bold py-3 rounded-md"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
