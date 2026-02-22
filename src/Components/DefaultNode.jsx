import { Handle, Position } from "@xyflow/react";
import { useNodeContext } from "../NodeProvider";

const DefaultNode = ({ data, id }) => {
  const { handleDeleteNode, handleNodeSelect } = useNodeContext();
  return (
    <div className="node-wrapper">
      <Handle type="target" position={Position.Top} />

      {data.label}

      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "red" }}
      />

      <div className="node-actions">
        <button className="delete-button" onClick={() => handleDeleteNode(id)}>
          x
        </button>

        <button className="delete-button" onClick={() => handleNodeSelect(id)}>
          🖊️
        </button>
      </div>
    </div>
  );
};

export default DefaultNode;
