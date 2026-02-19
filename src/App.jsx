import { useState, useCallback, useRef, useEffect } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  Handle,
  Position,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import "@xyflow/react/dist/style.css";
import { debounce } from "./useDebounce";

const nodeTypes = {
  default: DefaultNode,
};

const initialNodes = [
  { id: "n1", position: { x: 0, y: 0 }, data: { label: "Node 1" } },
  { id: "n2", position: { x: 0, y: 100 }, data: { label: "Node 2" } },
];

const initialEdges = [{ id: "n1-n2", source: "n1", target: "n2" }];

export default function App() {
  const [NodeConfigJson, setNodeConfigJson] = useState({
    nodes: initialNodes,
    edges: initialEdges,
  });
  const editorRef = useRef(null);
  const debouncedRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerText = JSON.stringify(
        { nodes: NodeConfigJson.nodes, edges: NodeConfigJson.edges },
        null,
        2,
      );
    }
  }, [NodeConfigJson]); // ONLY once

  const handleConfigChange = (key, value) => {
    switch (key) {
      case "nodes":
        setNodeConfigJson((prev) => ({ ...prev, nodes: value }));
        break;

      case "edges":
        setNodeConfigJson((prev) => ({ ...prev, edges: value }));
        break;
      default:
        break;
    }
  };

  const onNodesChange = useCallback(
    (changes) => {
      // setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
      // handleConfigChange("nodes", applyNodeChanges(changes, nodes)),

      return setNodeConfigJson((prev) => ({
        ...prev,
        nodes: applyNodeChanges(changes, prev.nodes),
      }));
    },

    [],
  );

  const onEdgesChange = useCallback(
    (changes) =>
      setNodeConfigJson((prev) => ({
        ...prev,
        edges: applyEdgeChanges(changes, prev.edges),
      })),
    [],
  );
  const onConnect = useCallback((params) => {
    // setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot));
    setNodeConfigJson((prev) => ({
      ...prev,
      edges: addEdge(params, prev.edges),
    }));
  }, []);

  const handleAddNode = useCallback(() => {
    const newNode = {
      id: `n${NodeConfigJson.nodes.length + 1}`,
      position: { x: Math.random() * 100, y: Math.random() * 100 },
      data: { label: `Node ${NodeConfigJson.nodes.length + 1}` },
    };
    // setNodes((nodesSnapshot) => [...nodesSnapshot, newNode]);
    setNodeConfigJson((prev) => ({
      ...prev,
      nodes: [...prev.nodes, newNode],
    }));
  }, [NodeConfigJson.nodes.length]);

  const handleJsonEdit = (text) => {
    try {
      const parsed = JSON.parse(text);
      console.log("Parsed JSON:", parsed);
      setNodeConfigJson({
        nodes: parsed.nodes ?? [],
        edges: parsed.edges ?? [],
      });
    } catch {}
  };

  if (!debouncedRef.current) {
    debouncedRef.current = debounce(handleJsonEdit, 500);
  }

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          resize: "horizontal",
          overflow: "auto",
          width: "300px",
          minWidth: "100px",
          maxWidth: "500px",
          border: "1px solid black",
          padding: "10px",
        }}
      >
        JSON Editor :
        <pre
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => {
            debouncedRef.current(e.currentTarget.innerText);
          }}
          style={{ border: "1px solid" }}
        />
      </div>
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
          <Controls />={" "}
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
          right: "200px",
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
    </div>
  );
}

function DefaultNode({ data }) {
  return (
    <div
      style={{
        padding: 10,
        border: "1px solid #333",
        borderRadius: 5,
        color: "#333",
        background: "#fff",
        minWidth: 100,
        textAlign: "center",
      }}
    >
      <Handle type="target" position={Position.Top} />

      {data.label}

      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "red" }}
      />
    </div>
  );
}
