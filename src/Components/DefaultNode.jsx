import { Handle, Position } from "@xyflow/react";
import { useNodeContext } from "../NodeProvider";

const DefaultNode = ({ data, id, selected }) => {
  const { handleDeleteNode } = useNodeContext();
  return (
    <div className="node-wrapper">
      <Handle type="target" position={Position.Top} />

      {data.label}

      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "red" }}
      />

      <button className="delete-button" onClick={() => handleDeleteNode(id)}>
        x
      </button>
    </div>
  );
};

export default DefaultNode;
