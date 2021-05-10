import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
import { useParameter } from "@storybook/api";
import { PARAM_KEY } from "./constants";
import { TabContent } from "./components/TabContent";

function process(str) {
  const div = document.createElement("div");
  console.log(str);
  div.innerHTML = str.trim();
  return format(div, 0).innerHTML.trim();
}

export const Tab = ({ active, channel }) => {
  const [code, setCode] = useState("");
  // console.log(channel);
  channel.on("storybook/my-addon/add_source", (eventData) => {
    setCode(eventData);
  });

  return active ? <TabContent code={code} /> : null;
};
