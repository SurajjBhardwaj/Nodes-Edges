import React from "react";
import JSONEditor from "./JSONEditor";
import NodePlayground from "./NodePlayground";
import NodeProviderComponent from "../NodeProvider.jsx";

const Screen = () => {
  return (
    <NodeProviderComponent>
      <div className="screen-wrapper">
        <JSONEditor />
        <NodePlayground />
      </div>
    </NodeProviderComponent>
  );
};

export default Screen;
