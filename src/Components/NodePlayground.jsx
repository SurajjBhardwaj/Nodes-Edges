import React from "react";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  ReactFlow,
} from "@xyflow/react";
import { useNodeContext } from "../NodeProvider.jsx";
import DefaultNode from "./DefaultNode";

const nodeTypes = {
  default: DefaultNode,
};

const NodePlayground = () => {
  const { NodeConfigJson, setNodeConfigJson } = useNodeContext();
  const onNodesChange = (changes) => {
    setNodeConfigJson((prev) => ({
      ...prev,
      nodes: applyNodeChanges(changes, prev.nodes),
    }));
  };

  const onEdgesChange = (changes) => {
    setNodeConfigJson((prev) => ({
      ...prev,
      edges: applyEdgeChanges(changes, prev.edges),
    }));
  };

  const onConnect = (params) => {
    setNodeConfigJson((prev) => ({
      ...prev,
      edges: addEdge(params, prev.edges),
    }));
  };

  const handleAddNode = () => {
    setNodeConfigJson((prev) => ({
      ...prev,
      nodes: [
        ...prev.nodes,
        {
          id: `n${prev.nodes.length + 1}`,
          position: { x: 100, y: 100 },
          data: { label: `Node ${prev.nodes.length + 1}` },
        },
      ],
    }));
  };

  return (
    <>
      <div style={{ width: "100%", height: "100%" }}>
        <ReactFlow
          nodes={NodeConfigJson.nodes}
          edges={NodeConfigJson.edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      <div
        style={{
          position: "absolute",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid blues",
          top: "20px",
          right: "10%",
          zIndex: 10,
          width: "250px",
          padding: "5px",
        }}
      >
        <button onClick={handleAddNode}>Add Node</button>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
            borderLeft: "1px solid black",
            paddingLeft: "10px",
            height: "100%",
          }}
        >
          <div
            style={{
              height: "10px",
              width: "10px",
              background: "red",
              borderRadius: "50%",
            }}
          ></div>

          <div>Start</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
            paddingLeft: "10px",
            height: "100%",
          }}
        >
          <div
            style={{
              height: "10px",
              width: "10px",
              background: "#1a192b",
              borderRadius: "50%",
            }}
          ></div>

          <div>END</div>
        </div>
      </div>
    </>
  );
};

export default NodePlayground;
