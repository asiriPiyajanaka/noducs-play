import React from "react";
import { useGlobalStore } from "noducs";

const GlobalStore: React.FC = () => {
  const globalState = useGlobalStore();
  console.log("Global Store:", globalState); // Log the global store

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", margin: "20px" }}>
      <h2>Global Store Viewer</h2>
      <pre>{JSON.stringify(globalState, null, 2)}</pre>
    </div>
  );
};

export default GlobalStore;
