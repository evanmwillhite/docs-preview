import React from "react";
import { addons, types } from "@storybook/addons";
import { ADDON_ID, TOOL_ID, PANEL_ID } from "../constants";
import { Tool } from "../Tool";
import { Panel } from "../Panel";
import { Tab } from "../Tab";

// Register the addon
addons.register(ADDON_ID, (api) => {
  const channel = addons.getChannel();
  // Register the tool
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: "My addon",
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: Tool,
  });

  // Register the panel
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "My addon",
    match: ({ viewMode }) => viewMode === "story",
    render: Panel,
  });

  // Register the tab
  addons.add(PANEL_ID, {
    type: types.TAB,
    title: "Preview",
    route: ({ storyId }) => `/preview/${storyId}`,
    match: ({ viewMode }) => viewMode === "preview",
    render: ({ active }) => <Tab active={active} channel={channel} api={api} />,
  });
});
