import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import { UserContext } from "../UserContext";

const API_URL = "https://foodiehub-backend-production.up.railway.app";

const Payment = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();

  const [cardType, setCardType] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateTokenNumber = () => Math.floor(Math.random() * 900) + 100;

  const validateInputs = () => {
    if (!cardType || !nameOnCard || !cardNumber || !expiryMonth || !expiryYear || !cvv) {
      alert("Please fill in all the payment details.");
      return false;
    }
    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
      alert("Card Number must be a valid 16-digit number.");
      return false;
    }
    if (cvv.length !== 3 || isNaN(cvv)) {
      alert("CVV must be a valid 3-digit number.");
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateInputs()) return;
    setIsLoading(true);
    const tokenNumber = generateTokenNumber();

    try {
      const paymentData = {
        userId,
        cartItems: cart.map((item) => ({
          foodName: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice,
        paymentInfo: {
          cardType,
          cardName: nameOnCard,
          cardNumber: cardNumber.slice(-4),
          expirationDate: `${expiryMonth}/${expiryYear}`,
          securityCode: cvv,
        },
        tokenNumber,
      };

      const response = await fetch(`${API_URL}/savepayment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) throw new Error("Payment failed");

      clearCart();

      navigate("/receipt", {
        state: {
          paymentDetails: {
            cartItems: cart,
            totalPrice,
            tokenNumber,
            paymentInfo: {
              cardType,
              nameOnCard,
              cardNumber: cardNumber.slice(-4),
              paymentDate: new Date().toISOString(),
            },
          },
        },
      });
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-xl font-bold text-center mb-2">
          Secure Payment Info
        </h1>
        <p className="text-center text-lg mb-6">Total Price: PKR {totalPrice}</p>

        <label className="block text-sm font-bold mb-1">Card Type</label>
        <select
          value={cardType}
          onChange={(e) => setCardType(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
        >
          <option value="">Select Card Type</option>
          <option value="Visa">Visa</option>
          <option value="MasterCard">MasterCard</option>
        </select>

        <label className="block text-sm font-bold mb-1">Name on Card</label>
        <input
          type="text"
          placeholder="Enter name on card"
          value={nameOnCard}
          onChange={(e) => setNameOnCard(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
        />

        <label className="block text-sm font-bold mb-1">Card Number</label>
        <input
          type="password"
          placeholder="Enter 16-digit card number"
          maxLength={16}
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
        />

        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-bold mb-1">Expiry Month</label>
            <input
              type="text"
              placeholder="MM"
              maxLength={2}
              value={expiryMonth}
              onChange={(e) => setExpiryMonth(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-bold mb-1">Expiry Year</label>
            <input
              type="text"
              placeholder="YYYY"
              maxLength={4}
              value={expiryYear}
              onChange={(e) => setExpiryYear(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <label className="block text-sm font-bold mb-1">CVV</label>
        <input
          type="password"
          placeholder="Enter 3-digit CVV"
          maxLength={3}
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-6"
        />

        <button
          onClick={handlePayment}
          disabled={isLoading}
          className="w-full bg-[#E67E22] text-white font-bold py-3 rounded-md"
        >
          {isLoading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default Payment;
