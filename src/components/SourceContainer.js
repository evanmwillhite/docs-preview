import React, { FC, Context, createContext, useEffect, useState } from "react";
import deepEqual from "fast-deep-equal";
import { addons } from "@storybook/addons";
import { StoryId } from "@storybook/api";
import { SNIPPET_RENDERED } from "../shared";

export const SourceContext = createContext({ sources: {} });

export const SourceContainer = ({ children }) => {
  const [sources, setSources] = useState < StorySources > {};
  const channel = addons.getChannel();

  const sourcesRef = React.useRef();
  const handleSnippetRendered = (id, newItem) => {
    if (newItem !== sources[id]) {
      const newSources = { ...sourcesRef.current, [id]: newItem };
      sourcesRef.current = newSources;
    }
  };

  // Bind this early (instead of inside `useEffect`), because the `SNIPPET_RENDERED` event
  // is triggered *during* the rendering process, not after. We have to use the ref
  // to ensure we don't end up calling setState outside the effect though.
  channel.on(SNIPPET_RENDERED, handleSnippetRendered);

  useEffect(() => {
    const current = sourcesRef.current || {};
    if (!deepEqual(sources, current)) {
      setSources(current);
    }

    return () => channel.off(SNIPPET_RENDERED, handleSnippetRendered);
  });

  return (
    <SourceContext.Provider value={{ sources }}>
      {children}
    </SourceContext.Provider>
  );
};
