import React, { useEffect, useState } from "react";
import { useUserState } from "../data/userState";

const StateChangeHighlighter: React.FC = () => {
  const { data } = useUserState();
  const [highlighted, setHighlighted] = useState(false);

  useEffect(() => {
    if (data) {
      setHighlighted(true);
      const timeout = setTimeout(() => setHighlighted(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [data]);

  if (!data) return null;

  return (
    <div
      style={{
        border: `2px solid ${highlighted ? "green" : "transparent"}`,
        transition: "border-color 0.5s",
        padding: "16px",
        borderRadius: "8px",
        marginTop: "16px",
      }}
    >
      <h3>Latest User State:</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default StateChangeHighlighter;
