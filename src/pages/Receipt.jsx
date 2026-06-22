import { useLocation, useNavigate } from "react-router-dom";

const Receipt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentDetails = location.state?.paymentDetails;

  if (!paymentDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No payment details found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Payment Receipt
        </h1>

        <p className="mb-2">
          <strong>Token Number:</strong> {paymentDetails.tokenNumber}
        </p>
        <p className="mb-4">
          <strong>Total Price:</strong> PKR {paymentDetails.totalPrice}
        </p>

        <h2 className="font-bold text-lg mb-2">Order Details:</h2>
        {paymentDetails.cartItems?.map((item, i) => (
          <p key={i} className="mb-1">
            {item.name} - Quantity: {item.quantity}, Price: PKR {item.price}
          </p>
        ))}

        <h2 className="font-bold text-lg mt-4 mb-2">Payment Info:</h2>
        <p className="mb-1">
          <strong>Card Type:</strong> {paymentDetails.paymentInfo?.cardType}
        </p>
        <p className="mb-1">
          <strong>Name on Card:</strong>{" "}
          {paymentDetails.paymentInfo?.nameOnCard}
        </p>
        <p className="mb-1">
          <strong>Card Number:</strong> **** ****{" "}
          {paymentDetails.paymentInfo?.cardNumber}
        </p>
        <p className="mb-6">
          <strong>Payment Date:</strong>{" "}
          {new Date(paymentDetails.paymentInfo?.paymentDate).toLocaleDateString()}
        </p>

        <button
          onClick={() => navigate("/home")}
          className="w-full bg-[#2C3E50] text-white font-bold py-3 rounded-md"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Receipt;
