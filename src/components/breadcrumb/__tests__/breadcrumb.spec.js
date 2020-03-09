import React from "react";
import Breadcrumb from "../breadcrumb";
import BreadcrumbItem from "../beadcrumbItem";
import { mount } from "enzyme";

describe("<BreadCrumb />", () => {

	test("allow us set props", () => {
		const wrapper = mount(
			<Breadcrumb size={"medium"} separator={"/"}>
				<BreadcrumbItem>one</BreadcrumbItem>
				<BreadcrumbItem>two</BreadcrumbItem>
				<BreadcrumbItem>three</BreadcrumbItem>
			</Breadcrumb>
		);
		expect(wrapper.props().separator).toBe("/");
		expect(wrapper.props().size).toBe("medium");
		wrapper.setProps({
			separator: ">",
			size: "small"
		});
		expect(wrapper.props().separator).toBe(">");
		expect(wrapper.props().size).toBe("small");
	});
});
