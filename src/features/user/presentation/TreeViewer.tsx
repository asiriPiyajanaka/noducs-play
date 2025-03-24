import React, { useState } from "react";

// State Interface Definitions
interface Task {
  title: string;
  status: string;
}

interface AppState {
  user: {
    name: string;
    age: number;
    city: string;
  };
  tasks: Task[];
  settings: {
    theme: string;
    notificationsEnabled: boolean;
  };
}

const initialState: AppState = {
  user: {
    name: "John Doe",
    age: 30,
    city: "New York",
  },
  tasks: [
    { title: "Buy Groceries", status: "Pending" },
    { title: "Complete Assignment", status: "In Progress" },
  ],
  settings: {
    theme: "light",
    notificationsEnabled: true,
  },
};

const TreeBoxViewer: React.FC = () => {
  const [state, setState] = useState<AppState>(initialState);
  const [highlightPath, setHighlightPath] = useState<string | null>(null);

  // Highlight a specific path temporarily
  const triggerHighlight = (path: string) => {
    setHighlightPath(path);
    setTimeout(() => setHighlightPath(null), 1000);
  };

  // Update the state at a specific path
  const updateState = (path: string, newValue: string | number | boolean) => {
    const updatedState = JSON.parse(JSON.stringify(state)) as AppState;
    const keys = path.split(".");
    let current = updatedState as Record<string, any>;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = newValue;
    setState(updatedState);
    triggerHighlight(path);
  };

  // Chain multiple updates
  const chainUpdates = () => {
    updateState("user.age", state.user.age + 1);
    setTimeout(() => updateState("tasks.0.status", "Completed"), 500);
    setTimeout(() => updateState("tasks.1.status", "Completed"), 1000);
  };

  // Render the state tree
  const renderTree = (obj: Record<string, any>, path = ""): JSX.Element => {
    return (
      <ul className="space-y-4">
        {Object.entries(obj).map(([key, value]) => {
          const currentPath = path ? `${path}.${key}` : key;
          const isHighlighted = highlightPath === currentPath;
          const isObject = typeof value === "object" && value !== null;

          return (
            <li
              key={currentPath}
              className="p-2 rounded-lg border border-gray-900"
              style={{
                backgroundColor: isHighlighted ? "lightgreen" : "black",
                transition: "background-color 0.2s ease",
              }}
            >
              <strong style={{ color: "#f4d167" }}>{key}:</strong>{" "}
              {isObject ? (
                <div className="mt-1 capitalize">
                  {renderTree(value, currentPath)}
                </div>
              ) : (
                <span className="text-white font-semibold">
                  {String(value)}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-0 md:p-6 font-sans bg-black text-white">
      <div className="flex justify-center mb-3 mt-2">
        <img
          src="https://wtemrwnjzqbbmgxpxrvf.supabase.co/storage/v1/object/public/cat_designs/public/noducs1000.png"
          alt="Noducs"
          className="w-48 h-auto"
        />
      </div>
      <h1 className="text-3xl font-bold text-center text-white">
        State Play V.0.0.1
      </h1>
      <p className="text-center text-white italic mt-2">
        React + Vite + noducs
      </p>

      <div className="mt-8 text-center">
        <h2 className="text-xl font-bold mb-4">State Update Actions</h2>
        <div className="space-y-4 space-x-4">
          <button
            onClick={() => updateState("user.age", state.user.age + 1)}
            className="px-4 py-2 bg-green-500/25 text-white rounded-lg shadow hover:bg-green-600"
          >
            Increment Age
          </button>
          <button
            onClick={() => updateState("tasks.0.status", "Completed")}
            className="px-4 py-2 bg-blue-500/25 text-white rounded-lg shadow hover:bg-blue-600"
          >
            Complete First Task
          </button>
          <button
            onClick={chainUpdates}
            className="px-4 py-2 bg-yellow-500/25 text-white rounded-lg shadow hover:bg-yellow-600"
          >
            Chain Updates
          </button>
          <button
            onClick={() => updateState("user.city", "San Francisco")}
            className="px-4 py-2 bg-purple-500/25 text-white rounded-lg shadow hover:bg-purple-600"
          >
            Move User to SF
          </button>
          <button
            onClick={() =>
              updateState(
                "settings.theme",
                state.settings.theme === "light" ? "dark" : "light"
              )
            }
            className="px-4 py-2 bg-gray-700/25 text-white rounded-lg shadow hover:bg-gray-800"
          >
            Toggle Theme
          </button>
          <button
            onClick={() =>
              updateState(
                "settings.notificationsEnabled",
                !state.settings.notificationsEnabled
              )
            }
            className="px-4 py-2 bg-red-500/25 text-white rounded-lg shadow hover:bg-red-600"
          >
            Toggle Notifications
          </button>
          <button
            onClick={() => updateState("tasks.1.status", "Pending")}
            className="px-4 py-2 bg-teal-500/25 text-white rounded-lg shadow hover:bg-teal-600"
          >
            Reset Second Task
          </button>
        </div>
      </div>
      <div className="mt-6 border border-gray-900 rounded-lg p-1">
        {renderTree(state)}
      </div>
    </div>
  );
};

export default TreeBoxViewer;
