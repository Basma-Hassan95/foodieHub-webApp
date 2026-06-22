import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import Modal from "../components/Modal";

const API_URL = "https://foodiehub-backend-production.up.railway.app";

const Profile = () => {
  const { userId, authToken, removeToken } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ type: "", message: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
      return;
    }
    fetchProfile();
  }, [authToken]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${API_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) setUserData(data);
    } catch (error) {
      console.error("Profile fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    setModal({ type: "confirm", message: "Are you sure you want to sign out?" });
  };

  const confirmSignOut = () => {
    removeToken();
    navigate("/login");
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
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <button onClick={handleSignOut} className="text-red-500 font-semibold">
            Sign Out
          </button>
        </div>

        {userData && (
          <>
            <div className="flex flex-col items-center mb-6">
              <img
                src={
                  userData.profilePicture ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover mb-2 bg-gray-200"
              />
              <h2 className="text-lg font-bold">{userData.username}</h2>
            </div>

            <div className="bg-white rounded-xl shadow p-4 mb-4">
              <InfoRow label="Name" value={userData.username} />
              <InfoRow label="Email" value={userData.email} />
              <InfoRow label="Gender" value={userData.gender || "Not set"} />
              <InfoRow
                label="Date of Birth"
                value={
                  userData.dateOfBirth
                    ? new Date(userData.dateOfBirth).toLocaleDateString()
                    : "Not set"
                }
              />
              <InfoRow label="Address" value={userData.address || "Not set"} />
              <InfoRow label="Contact" value={userData.contactNumber || "Not set"} />
            </div>

            <Link
              to="/orders"
              className="block w-full bg-[#2C3E50] text-white font-bold py-3 rounded-md text-center mb-3"
            >
              📦 Order History
            </Link>

            <button className="w-full bg-[#E67E22] text-white font-bold py-3 rounded-md">
              Edit Profile
            </button>
          </>
        )}
      </div>

      <Modal
        type={modal.type}
        message={modal.message}
        onClose={() => setModal({ type: "", message: "" })}
        onConfirm={confirmSignOut}
      />
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
    <span className="text-gray-500 text-sm">{label}</span>
    <span className="font-medium text-sm">{value}</span>
  </div>
);

export default Profile;