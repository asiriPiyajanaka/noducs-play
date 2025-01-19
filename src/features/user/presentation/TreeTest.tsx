import React from "react";
import GlobalStore from "./GlobalStore";
import { StoreProvider } from "noducs";

const TreeRoot: React.FC = () => {
  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", margin: "20px" }}>
      <StoreProvider>
        <GlobalStore />
      </StoreProvider>
    </div>
  );
};

export default TreeRoot;
