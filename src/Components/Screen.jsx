import React from "react";
import JSONEditor from "./JSONEditor";
import NodePlayground from "./NodePlayground";
import NodeProviderComponent from "../NodeProvider.jsx";

const Screen = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
      }}
    >
      <NodeProviderComponent>
        <JSONEditor />
        <NodePlayground />
      </NodeProviderComponent>
    </div>
  );
};

export default Screen;
