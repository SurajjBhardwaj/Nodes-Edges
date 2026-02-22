import { Handle, Position } from "@xyflow/react";

const DefaultNode = ({ data }) => {
  return (
    <div className="node-wrapper">
      <Handle type="target" position={Position.Top} />

      {data.label}

      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "red" }}
      />
    </div>
  );
};

export default DefaultNode;
