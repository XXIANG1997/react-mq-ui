import React from "react";
import MqSteps from "../index";
import { mount } from "enzyme";

describe("<Steps/>", () => {
	let wrapper;
	afterEach(() => {
		wrapper.unmount();
	});
	test("allows us to set props", () => {
		wrapper = mount(
			<MqSteps current={1} showLoading={false} status={"error"} size={"small"}>
				<MqSteps.Item>one</MqSteps.Item>
				<MqSteps.Item>one</MqSteps.Item>
			</MqSteps>
		);
		expect(wrapper.props().current).toBe(1);
		expect(wrapper.props().showLoading).toBe(false);
		expect(wrapper.props().status).toBe("error");
		expect(wrapper.props().size).toBe("small");
		wrapper.setProps({
			current: 2,
			showLoading: true,
			status: "warning",
			size: "medium"
		});
		expect(wrapper.props().current).toBe(2);
		expect(wrapper.props().showLoading).toBe(true);
		expect(wrapper.props().status).toBe("warning");
		expect(wrapper.props().size).toBe("medium");
	});
	test("render correct icon when change current prop", () => {
		wrapper = mount(
			<MqSteps current={2}>
				<MqSteps.Item>one</MqSteps.Item>
				<MqSteps.Item>two</MqSteps.Item>
				<MqSteps.Item>three</MqSteps.Item>
			</MqSteps>
		);
		expect(wrapper.find("svg").at(0).find("use").getDOMNode().getAttribute("xlink:href")).toBe("#icon-success");
		expect(wrapper.find("svg").at(1).find("use").getDOMNode().getAttribute("xlink:href")).toBe("#icon-loading");
		expect(wrapper.find("svg").at(2).find("use").getDOMNode().getAttribute("xlink:href")).toBe("#icon-3");
		wrapper.setProps({
			showLoading: false
		});
		expect(wrapper.find("svg").at(1).find("use").getDOMNode().getAttribute("xlink:href")).toBe("#icon-success");
		wrapper.setProps({
			status: "error"
		});
		expect(wrapper.find("svg").at(1).find("use").getDOMNode().getAttribute("xlink:href")).toBe("#icon-error");
		wrapper.setProps({
			status: "warning"
		});
		expect(wrapper.find("svg").at(1).find("use").getDOMNode().getAttribute("xlink:href")).toBe("#icon-warning");
	});
});
