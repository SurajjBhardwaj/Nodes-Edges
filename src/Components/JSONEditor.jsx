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
    <div className="json-editor-wrapper">
      <strong>JSON Editor</strong>
      <pre
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onFocus={() => (sourceRef.current = "editor")}
        className="json-editor"
      />
    </div>
  );
};

export default JSONEditor;
