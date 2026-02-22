import { createContext, useContext, useState } from "react";
import { INITIAL_EDGES, INITIAL_NODES } from "./utils/constants";

const NodeContext = createContext(null);

const NodeProviderComponent = ({ children }) => {
  const [NodeConfigJson, setNodeConfigJson] = useState({
    nodes: INITIAL_NODES,
    edges: INITIAL_EDGES,
  });

  const contextValues = {
    NodeConfigJson,
    setNodeConfigJson,
  };

  return (
    <NodeContext.Provider value={contextValues}>
      {children}
    </NodeContext.Provider>
  );
};

export default NodeProviderComponent;

export const useNodeContext = () => {
  const context = useContext(NodeContext);
  if (context === null) {
    throw new Error(
      "useNodeContext must be used within a NodeProviderComponent",
    );
  }

  return context;
};
