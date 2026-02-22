import { Handle, Position } from "@xyflow/react";

const DefaultNode = ({ data }) => {
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
};

export default DefaultNode;
