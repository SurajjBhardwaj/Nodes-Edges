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
import NodeEditorSidebar from "./NodeEditorSidebar.jsx";

const nodeTypes = {
  default: DefaultNode,
};

const NodePlayground = () => {
  const { NodeConfigJson, setNodeConfigJson, selectedNode } = useNodeContext();
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
    if (params.source === params.target) {
      alert("Cannot connect a node to itself!");
      return;
    }

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
      <div className="playground">
        <ReactFlow
          nodes={NodeConfigJson.nodes}
          edges={NodeConfigJson.edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          proOptions={{ hideAttribution: true }}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      <div className="playground-info-wrapper">
        <button onClick={handleAddNode}>Add Node</button>
        <div className="playground-info-item-container">
          <div className="playground-info-item bg-for-start"></div>

          <div>Start</div>
        </div>

        <div className="playground-info-item-container ">
          <div className="playground-info-item bg-for-end"></div>

          <div>END</div>
        </div>
      </div>

      {selectedNode && <NodeEditorSidebar id={selectedNode} />}
    </>
  );
};

export default NodePlayground;
