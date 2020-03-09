import React from "react";
import BreadcrumbItem from "../beadcrumbItem";
import { mount } from "enzyme";

describe("<BreadCrumbItem />", () => {

	test("allow us set props", () => {
		const wrapper = mount(
			<BreadcrumbItem separator={">"} icon={"home"} active={true}>test</BreadcrumbItem>
		);
		expect(wrapper.props().children).toBe("test");
		expect(wrapper.props().separator).toBe(">");
		expect(wrapper.props().active).toBe(true);
		expect(wrapper.props().icon).toBe("home");
	});
});
