import { storeManager } from "noducs";

const DirectStoreViewer: React.FC = () => {
  const globalState = storeManager.getState(); // Direct access to the global state
  console.log("Direct Global Store:", globalState);

  storeManager.getState()["user"].data = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    image: "https://via.placeholder.com/150",
    address: {
      address: "123 Main St",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "USA",
    },
    role: "Admin",
  };

  // Notify all subscribers about the update
  storeManager.updateGlobalState();

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", margin: "20px" }}>
      <h2>Direct Global Store Viewer</h2>
      <pre>{JSON.stringify(globalState, null, 2)}</pre>
    </div>
  );
};

export default DirectStoreViewer;
