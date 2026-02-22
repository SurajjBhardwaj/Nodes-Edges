import { createContext, useContext, useRef, useState } from "react";

const NodeContext = createContext(null);

const NodeProviderComponent = ({ children }) => {
  const sourceRef = useRef("canvas");

  const [NodeConfigJson, setNodeConfigJson] = useState({
    nodes: [],
    edges: [],
  });
  const [error, setError] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  const handleDeleteNode = (nodeId) => {
    setNodeConfigJson((prevConfig) => ({
      ...prevConfig,
      nodes: prevConfig.nodes.filter((node) => node.id !== nodeId),
      edges: prevConfig.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId,
      ),
    }));
  };

  const handleNodeSelect = (nodeId) => {
    setSelectedNode(nodeId);
  };

  const handleUpdateNodeName = (name) => {
    if (name.trim() === "") {
      setError("Node name cannot be empty.");
      return;
    }
    if (name.length > 15) {
      setError("Node name cannot exceed 15 characters.");
      return;
    }

    setError(null);
    sourceRef.current = "canvas";

    setNodeConfigJson((prevConfig) => ({
      ...prevConfig,
      nodes: prevConfig.nodes.map((node) =>
        node.id === selectedNode
          ? { ...node, data: { ...node.data, label: name } }
          : node,
      ),
    }));
  };

  const contextValues = {
    NodeConfigJson,
    setNodeConfigJson,
    handleDeleteNode,
    selectedNode,
    handleNodeSelect,
    handleUpdateNodeName,
    error,
    sourceRef,
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
