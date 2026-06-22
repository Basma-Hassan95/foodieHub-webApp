const Modal = ({ type, message, onClose, onConfirm }) => {
  if (!message) return null;

  const isSuccess = type === "success";
  const isConfirm = type === "confirm";

  const bgColor = isSuccess ? "#EAF3DE" : isConfirm ? "#E6F1FB" : "#FCEBEB";
  const iconColor = isSuccess ? "#3B6D11" : isConfirm ? "#185FA5" : "#A32D2D";
  const icon = isSuccess ? "✓" : isConfirm ? "?" : "✕";
  const title = isSuccess ? "Success!" : isConfirm ? "Are you sure?" : "Oops!";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "32px 28px",
          maxWidth: "360px",
          width: "90%",
          textAlign: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            backgroundColor: bgColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            fontSize: "28px",
            color: iconColor,
            fontWeight: "700",
          }}
        >
          {icon}
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "700",
            color: iconColor,
            margin: "0 0 8px",
          }}
        >
          {title}
        </h2>

        {/* Message */}
        <p
          style={{
            fontSize: "14px",
            color: "#555",
            margin: "0 0 24px",
            lineHeight: "1.6",
          }}
        >
          {message}
        </p>

        {/* Buttons */}
        {isConfirm ? (
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                backgroundColor: "#f0f0f0",
                color: "#333",
                border: "none",
                borderRadius: "10px",
                padding: "11px",
                fontSize: "14px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              style={{
                flex: 1,
                backgroundColor: "#E24B4A",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "11px",
                fontSize: "14px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={onClose}
            style={{
              backgroundColor: isSuccess ? "#7a3b8c" : "#E24B4A",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              padding: "11px 32px",
              fontSize: "14px",
              fontWeight: "700",
              cursor: "pointer",
              width: "100%",
            }}
          >
            {isSuccess ? "Great!" : "Try Again"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;