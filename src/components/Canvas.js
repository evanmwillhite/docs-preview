import React, {
  FC,
  ReactElement,
  ReactNode,
  ReactNodeArray,
  useContext,
} from "react";
import { toId, storyNameFromExport } from "@storybook/csf";
import {
  resetComponents,
  Preview as PurePreview,
  PreviewProps as PurePreviewProps,
} from "@storybook/components";
import { SourceContext } from "./SourceContainer";
import { getSourceProps } from "./Source";

const getPreviewProps = (
  { withSource, mdxSource, children, ...props },
  sourceContext
) => {
  const sourceState =
    withSource || parameters?.docs?.source?.state || SourceState.CLOSED;
  if (sourceState === SourceState.NONE) {
    return props;
  }
  if (mdxSource) {
    return {
      ...props,
      withSource: getSourceProps(
        { code: decodeURI(mdxSource) },
        docsContext,
        sourceContext
      ),
    };
  }
  const childArray = Array.isArray(children) ? children : [children];
  const stories = childArray.filter(
    (c) => c.props && (c.props.id || c.props.name)
  );
  const targetIds = stories.map(
    (s) =>
      s.props.id ||
      toId(
        mdxComponentMeta.id || mdxComponentMeta.title,
        storyNameFromExport(mdxStoryNameToKey[s.props.name])
      )
  );
  const sourceProps = getSourceProps({ ids: targetIds }, sourceContext);
  return {
    ...props, // pass through columns etc.
    withSource: sourceProps,
    isExpanded: sourceState === SourceState.OPEN,
  };
};

export const Canvas = (props) => {
  const sourceContext = useContext(SourceContext);
  const previewProps = getPreviewProps(props, sourceContext);
  const { children } = props;
  return <PurePreview {...previewProps}>{children}</PurePreview>;
};
