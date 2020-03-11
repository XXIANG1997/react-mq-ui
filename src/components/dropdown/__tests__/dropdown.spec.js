import React from "react";
import Dropdown from "../dropdown";
import Menu from "../menu";
import { mount } from "enzyme";

describe("<Dropdown>", () => {
	const menu = <Menu>
		<Menu.Item>one</Menu.Item>
		<Menu.Item>two</Menu.Item>
	</Menu>;
	const exampleOverlay = <Menu>
		<Menu.Item>example</Menu.Item>
		<Menu.Item>example</Menu.Item>
	</Menu>;
	test("allow us to set props", () => {
		const wrapper = mount(
			<Dropdown overlay={menu} position={"top"} size={"small"} theme={"light"} triggerType={"hover"}
			          margin={"10"}>
				<button>click me</button>
			</Dropdown>
		);
		expect(wrapper.props().overlay).toBe(menu);
		expect(wrapper.props().position).toBe("top");
		expect(wrapper.props().size).toBe("small");
		expect(wrapper.props().theme).toBe("light");
		expect(wrapper.props().triggerType).toBe("hover");
		expect(wrapper.props().margin).toBe("10");
		wrapper.setProps({
			overlay: exampleOverlay,
			position: "right",
			size: "medium",
			theme: "dark",
			triggerType: "click",
			margin: "20"
		});
		expect(wrapper.props().overlay).toBe(exampleOverlay);
		expect(wrapper.props().position).toBe("right");
		expect(wrapper.props().size).toBe("medium");
		expect(wrapper.props().theme).toBe("dark");
		expect(wrapper.props().triggerType).toBe("click");
		expect(wrapper.props().margin).toBe("20");
		wrapper.unmount();
	});

	test("show menu when click item", () => {
		const wrapper = mount(
			<Dropdown overlay={menu} position={"top"} size={"small"} theme={"light"} triggerType={"hover"}
			          margin={"10"}>
				<button>click me</button>
			</Dropdown>
		);
	});
});
