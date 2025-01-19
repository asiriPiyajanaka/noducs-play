import React, { useEffect } from "react";
import { fetchUser, useUserState } from "../data/userState";

const UserCard: React.FC = () => {
  // 🧠 State Access Hook
  const { data, loading, error } = useUserState();
  console.log("State in UserCard:", { data, loading, error }); // Log state from hook

  // ✅ Fetch Data on Component Mount
  useEffect(() => {
    fetchUser();
  }, []);

  // ✅ Render Loading, Error, or Data States
  if (loading) return <p>Loading user data...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No user data available</p>;

  const { firstName, lastName, email, phone, image, address, role } = data;

  return (
    <div style={cardStyle}>
      <img src={image} alt="User" style={imageStyle} />
      <h2>
        {firstName} {lastName}
      </h2>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Phone:</strong> {phone}
      </p>
      <p>
        <strong>Role:</strong> {role}
      </p>
      <p>
        <strong>Address:</strong> {address.city}, {address.state}
      </p>
    </div>
  );
};

// ✅ Inline Styles for the Card
const cardStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "16px",
  maxWidth: "400px",
  margin: "20px auto",
  textAlign: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const imageStyle: React.CSSProperties = {
  borderRadius: "50%",
  width: "100px",
  height: "100px",
  objectFit: "cover",
};

export default UserCard;
