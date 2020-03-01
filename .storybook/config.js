import { configure } from "@storybook/react";
import { addDecorator } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

addDecorator(withInfo({
	header: false
}));

function loadStories() {
	require("../src/stories/basic.stories.js");
}

configure(loadStories, module);
