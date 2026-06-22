import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";

export default function FoodDetail() {
  const { state: food } = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [added, setAdded] = useState(false);

  const extras = [
    { id: "e1", label: "Extra Sauce", price: 50 },
    { id: "e2", label: "Extra Portion", price: 100 },
    { id: "e3", label: "No Onion", price: 0 },
  ];

  const toggleExtra = (extra) => {
    setSelectedExtras((prev) =>
      prev.find((e) => e.id === extra.id)
        ? prev.filter((e) => e.id !== extra.id)
        : [...prev, extra]
    );
  };

  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const totalPrice = (food.price + extrasTotal) * quantity;

  const handleAddToCart = () => {
    addToCart({ ...food, quantity, selectedExtras, totalPrice });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart({ ...food, quantity, selectedExtras, totalPrice });
    navigate("/cart");
  };

  if (!food) {
    return (
      <div style={styles.notFound}>
        <p>Food item nahi mila. Wapas jao!</p>
        <button style={styles.buyNowBtn} onClick={() => navigate("/home")}>
          Home par jao
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>
          ← Back to Menu
        </button>

        <div style={styles.card}>
          {/* Image */}
          <div style={styles.imageWrapper}>
            <img src={food.image} alt={food.name} style={styles.image} />
          </div>

          {/* Details */}
          <div style={styles.details}>
            <p style={styles.categoryLabel}>{food.category}</p>
            <h1 style={styles.foodName}>{food.name}</h1>
            <p style={styles.description}>{food.description}</p>
            <p style={styles.price}>Rs. {food.price}/=</p>

            {/* Add-ons */}
            <div style={styles.extrasSection}>
              <p style={styles.extrasTitle}>Add-ons (Optional)</p>
              {extras.map((extra) => {
                const selected = selectedExtras.find((e) => e.id === extra.id);
                return (
                  <div
                    key={extra.id}
                    style={{
                      ...styles.extraItem,
                      ...(selected ? styles.extraItemSelected : {}),
                    }}
                    onClick={() => toggleExtra(extra)}
                  >
                    <span
                      style={{
                        ...styles.extraCheck,
                        backgroundColor: selected ? "#7a3b8c" : "#e0e0e0",
                      }}
                    >
                      {selected ? "✓" : "+"}
                    </span>
                    <span style={styles.extraLabel}>{extra.label}</span>
                    {extra.price > 0 && (
                      <span style={styles.extraPrice}>+Rs. {extra.price}</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quantity */}
            <div style={styles.quantityRow}>
              <span style={styles.qtyLabel}>Quantity</span>
              <div style={styles.qtyControl}>
                <button
                  style={styles.qtyBtn}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  −
                </button>
                <span style={styles.qtyNumber}>{quantity}</span>
                <button
                  style={styles.qtyBtn}
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Total */}
            <div style={styles.totalRow}>
              <span style={styles.totalLabel}>Total</span>
              <span style={styles.totalPrice}>Rs. {totalPrice}/=</span>
            </div>

            {/* Buttons */}
            <div style={styles.btnRow}>
              <button
                style={{
                  ...styles.addCartBtn,
                  ...(added ? styles.addCartBtnAdded : {}),
                }}
                onClick={handleAddToCart}
              >
                {added ? "✓ Added to Cart!" : "Add to Cart"}
              </button>
              <button style={styles.buyNowBtn} onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "80vh",
    backgroundColor: "#f5f5f5",
    fontFamily: "'Segoe UI', sans-serif",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "24px 20px 60px",
  },
  backBtn: {
    background: "none",
    border: "none",
    color: "#7a3b8c",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    padding: "0 0 20px",
    display: "inline-block",
  },
  card: {
    display: "flex",
    gap: "40px",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
    padding: "32px",
    flexWrap: "wrap",
  },
  imageWrapper: { flex: "0 0 340px" },
  image: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    borderRadius: "12px",
  },
  details: {
    flex: 1,
    minWidth: "260px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  categoryLabel: {
    fontSize: "13px",
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    fontWeight: "600",
    margin: 0,
  },
  foodName: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1a1a1a",
    margin: 0,
  },
  description: {
    fontSize: "14px",
    color: "#555",
    lineHeight: "1.7",
    margin: 0,
  },
  price: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#7a3b8c",
    margin: 0,
  },
  extrasSection: { marginTop: "4px" },
  extrasTitle: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#444",
    margin: "0 0 8px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  extraItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "9px 12px",
    border: "1.5px solid #e0e0e0",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "6px",
    fontSize: "14px",
    color: "#333",
  },
  extraItemSelected: {
    borderColor: "#7a3b8c",
    backgroundColor: "#faf4ff",
  },
  extraCheck: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    color: "#fff",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "700",
    flexShrink: 0,
  },
  extraLabel: { flex: 1 },
  extraPrice: { color: "#7a3b8c", fontWeight: "600", fontSize: "13px" },
  quantityRow: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  qtyLabel: { fontSize: "14px", fontWeight: "600", color: "#444" },
  qtyControl: {
    display: "flex",
    alignItems: "center",
    border: "1.5px solid #e0e0e0",
    borderRadius: "8px",
    overflow: "hidden",
  },
  qtyBtn: {
    width: "36px",
    height: "36px",
    border: "none",
    backgroundColor: "#c9930a",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "700",
    cursor: "pointer",
  },
  qtyNumber: {
    width: "44px",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "700",
    color: "#1a1a1a",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#faf4ff",
    borderRadius: "10px",
    padding: "12px 16px",
  },
  totalLabel: { fontSize: "14px", color: "#555", fontWeight: "600" },
  totalPrice: { fontSize: "20px", fontWeight: "700", color: "#7a3b8c" },
  btnRow: { display: "flex", gap: "12px" },
  addCartBtn: {
    flex: 1,
    padding: "13px",
    backgroundColor: "#c9930a",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
  },
  addCartBtnAdded: {
    backgroundColor: "#4caf50",
  },
  buyNowBtn: {
    flex: 1,
    padding: "13px",
    backgroundColor: "#7a3b8c",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
  },
  notFound: {
    textAlign: "center",
    padding: "80px 20px",
    fontSize: "16px",
    color: "#555",
  },
};