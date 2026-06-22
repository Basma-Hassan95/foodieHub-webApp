import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const API_URL = "https://foodiehub-backend-production.up.railway.app";

const OrderHistory = () => {
  const { userId, authToken } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `${API_URL}/getOrdersByUser/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) setOrders(data.payments || []);
    } catch (error) {
      console.error("Order fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-PK", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#E67E22] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Order History</h1>

        {orders.length === 0 ? (
          <div className="text-center mt-20">
            <p className="text-lg text-gray-400 mb-4">No orders yet!</p>
            <button
              onClick={() => navigate("/home")}
              className="bg-[#E67E22] text-white font-bold px-6 py-3 rounded-md"
            >
              Start Ordering
            </button>
          </div>
        ) : (
          orders.map((order, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-4 mb-4"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-[#E67E22]">
                  🎫 Token #{order.tokenNumber || "N/A"}
                </span>
                <span className="text-xs text-gray-400">
                  {formatDate(order.createdAt)}
                </span>
              </div>

              <div className="border-t border-gray-100 my-2" />

              <p className="font-bold text-sm mb-1">Items Ordered:</p>
              {order.cartItems?.map((food, i) => (
                <div key={i} className="flex justify-between text-sm mb-1">
                  <span>• {food.foodName}</span>
                  <span>
                    x{food.quantity} — PKR {food.price}
                  </span>
                </div>
              ))}

              <div className="border-t border-gray-100 my-2" />

              <div className="flex justify-between items-center mb-2">
                <span className="font-bold">Total Paid:</span>
                <span className="font-bold text-[#E67E22] text-lg">
                  PKR {order.totalPrice}
                </span>
              </div>

              <p className="text-xs text-gray-400">
                💳 {order.paymentInfo?.cardType || "N/A"} ****{" "}
                {order.paymentInfo?.cardNumber || "N/A"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
