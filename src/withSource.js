import addons, { makeDecorator } from "@storybook/addons";

export const withSource = makeDecorator({
  name: "withSource",
  parameterName: "source",
  skipIfNoParametersOrOptions: false,
  allowDeprecatedUsage: true,
  wrapper: (getStory, context) => {
    const channel = addons.getChannel();
    channel.emit("storybook/my-addon/add_source", getStory(context));
    return getStory(context);
  },
});
