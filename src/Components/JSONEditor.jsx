import { useEffect, useRef } from "react";
import { useNodeContext } from "../NodeProvider.jsx";

const JSONEditor = () => {
  const { NodeConfigJson, setNodeConfigJson } = useNodeContext();

  const editorRef = useRef(null);
  const sourceRef = useRef("canvas");

  const handleJsonEdit = (text) => {
    try {
      const parsed = JSON.parse(text);

      setNodeConfigJson({
        nodes: parsed.nodes ?? [],
        edges: parsed.edges ?? [],
      });
    } catch {
      return;
    }
  };

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

  return (
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
  );
};

export default JSONEditor;
