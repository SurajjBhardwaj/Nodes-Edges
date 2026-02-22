import { useNodeContext } from "../NodeProvider";

const NodeEditorSidebar = ({ id = null }) => {
  const { NodeConfigJson, handleUpdateNodeName, handleNodeSelect, error } =
    useNodeContext();
  const currentNode = NodeConfigJson.nodes.find((node) => node.id === id);

  return (
    <div className="node-editor-sidebar">
      <div className="node-editor-header">
        <h2>Node Editor Sidebar</h2>
        <button
          className="delete-button"
          onClick={() => handleNodeSelect(null)}
        >
          x
        </button>{" "}
      </div>

      <p>Update Data For: {id}</p>
      <input
        type="text"
        value={currentNode?.data?.label || ""}
        onChange={(e) => handleUpdateNodeName(e.target.value)}
      />
      {error && <p className="node-editor-error-message">{error}</p>}
    </div>
  );
};

export default NodeEditorSidebar;
