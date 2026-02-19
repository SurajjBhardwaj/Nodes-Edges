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
  const sourceRef = useRef("canvas");

  const handleJsonEdit = (text) => {
    try {
      const parsed = JSON.parse(text);
      sourceRef.current = "editor";

      setNodeConfigJson({
        nodes: parsed.nodes ?? [],
        edges: parsed.edges ?? [],
      });
    } catch {
      // ignore invalid JSON
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerText = JSON.stringify(NodeConfigJson, null, 2);
    }
  }, []);

  useEffect(() => {
    if (!editorRef.current) return;

    const observer = new MutationObserver(() => {
      if (sourceRef.current === "canvas") return;
      handleJsonEdit(editorRef.current.innerText);
    });

    observer.observe(editorRef.current, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (sourceRef.current !== "canvas") return;
    if (!editorRef.current) return;

    editorRef.current.innerText = JSON.stringify(NodeConfigJson, null, 2);
  }, [NodeConfigJson]);

  const onNodesChange = useCallback((changes) => {
    sourceRef.current = "canvas";
    setNodeConfigJson((prev) => ({
      ...prev,
      nodes: applyNodeChanges(changes, prev.nodes),
    }));
  }, []);

  const onEdgesChange = useCallback((changes) => {
    sourceRef.current = "canvas";
    setNodeConfigJson((prev) => ({
      ...prev,
      edges: applyEdgeChanges(changes, prev.edges),
    }));
  }, []);

  const onConnect = useCallback((params) => {
    sourceRef.current = "canvas";
    setNodeConfigJson((prev) => ({
      ...prev,
      edges: addEdge(params, prev.edges),
    }));
  }, []);

  const handleAddNode = () => {
    sourceRef.current = "canvas";
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
        <strong>JSON Editor</strong>
        <pre
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onFocus={() => (sourceRef.current = "editor")}
          style={{
            marginTop: 10,
            minHeight: "90%",
            border: "1px solid #333",
            padding: 10,
            outline: "none",
            overflow: "auto",
          }}
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
