import React from "react";
import BreadcrumbItem from "../beadcrumbItem";
import { mount } from "enzyme";

describe("<BreadCrumbItem />", () => {

	test("allow us set props", () => {
		const wrapper = mount(
			<BreadcrumbItem separator={"/"} icon={"home"} active={true}>one</BreadcrumbItem>
		);
		expect(wrapper.props().children).toBe("one");
		expect(wrapper.props().separator).toBe("/");
		expect(wrapper.props().active).toBe(true);
		expect(wrapper.props().icon).toBe("home");
		wrapper.setProps({
			separator: ">",
			icon: "tag",
			active: false,
			children: "two"
		});
		expect(wrapper.props().children).toBe("two");
		expect(wrapper.props().separator).toBe(">");
		expect(wrapper.props().active).toBe(false);
		expect(wrapper.props().icon).toBe("tag");
	});
});
