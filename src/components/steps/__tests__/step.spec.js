import React from "react";
import { mount } from "enzyme";
import MqSteps from "../index";

describe("<MqSteps.Item/>", () => {
	let wrapper;
	afterEach(() => {

	});
	test("allows us to set props", () => {
		wrapper = mount(
			<MqSteps.Item text={"text"} description={"text demo"} icon={"success"} active={false}>one</MqSteps.Item>
		);
		expect(wrapper.props().text).toBe("text");
		expect(wrapper.props().description).toBe("text demo");
		expect(wrapper.props().icon).toBe("success");
		expect(wrapper.props().active).toBe(false);
		wrapper.setProps({
			text: "text1",
			description: "text1 demo",
			icon: "error",
			active: true
		});
		expect(wrapper.props().text).toBe("text1");
		expect(wrapper.text()).toBe("one");
		expect(wrapper.props().description).toBe("text1 demo");
		expect(wrapper.props().icon).toBe("error");
		expect(wrapper.props().active).toBe(true);
	});
});
