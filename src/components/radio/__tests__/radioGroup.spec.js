import React from "react";
import MqRadioGroup from "../index";
import { mount } from "enzyme";

describe("<MqRadioGroup/>", () => {
	test("allow us to set prop", () => {
		const fn1 = () => {
		};
		const fn2 = () => {
		};
		const wrapper = mount(
			<MqRadioGroup value={"one"} name={"num"} isButton={true} size={"small"} onChange={fn1} disabledAll={false}>
				<MqRadioGroup.Item value={"one"}>one</MqRadioGroup.Item>
				<MqRadioGroup.Item value={"two"}>two</MqRadioGroup.Item>
				<MqRadioGroup.Item value={"three"}>three</MqRadioGroup.Item>
			</MqRadioGroup>
		);
		expect(wrapper.props().value).toBe("one");
		expect(wrapper.props().name).toBe("num");
		expect(wrapper.props().isButton).toBe(true);
		expect(wrapper.props().size).toBe("small");
		expect(wrapper.props().onChange).toBe(fn1);
		expect(wrapper.props().disabledAll).toBe(false);
		wrapper.setProps({
			value: "two",
			name: "num1",
			size: "medium",
			isButton: false,
			onChange: fn2,
			disabledAll: true
		});
		expect(wrapper.props().value).toBe("two");
		expect(wrapper.props().name).toBe("num1");
		expect(wrapper.props().isButton).toBe(false);
		expect(wrapper.props().size).toBe("medium");
		expect(wrapper.props().onChange).toBe(fn2);
		expect(wrapper.props().disabledAll).toBe(true);
		wrapper.unmount();
	});

	test("exactly render disabled item when set disabled prop", () => {
		const wrapper = mount(
			<MqRadioGroup value={"one"} name={"num"}>
				<MqRadioGroup.Item value={"one"} disabled={true}>one</MqRadioGroup.Item>
				<MqRadioGroup.Item value={"two"}>two</MqRadioGroup.Item>
				<MqRadioGroup.Item value={"three"}>three</MqRadioGroup.Item>
			</MqRadioGroup>
		);
		expect(wrapper.find(".mq-radio.mq-radio-disabled").exists()).toBe(true);
		expect(wrapper.find(".mq-radio.mq-radio-disabled").text()).toBe("one");
		wrapper.unmount();
	});

	test("exactly render disabled item when set disabledAll prop", () => {
		const wrapper = mount(
			<MqRadioGroup value={"one"} name={"num"} disabledAll={true}>
				<MqRadioGroup.Item value={"one"} disabled={true}>one</MqRadioGroup.Item>
				<MqRadioGroup.Item value={"two"}>two</MqRadioGroup.Item>
				<MqRadioGroup.Item value={"three"}>three</MqRadioGroup.Item>
			</MqRadioGroup>
		);
		expect(wrapper.find(".mq-radio.mq-radio-disabled").length).toBe(3);
		wrapper.unmount();
	});

	test("emit onChange when click item", () => {
		const fn = jest.fn();
		const wrapper = mount(
			<MqRadioGroup value={"one"} onChange={fn} name={"num"}>
				<MqRadioGroup.Item value={"one"} disabled={true}>one</MqRadioGroup.Item>
				<MqRadioGroup.Item value={"two"}>two</MqRadioGroup.Item>
				<MqRadioGroup.Item value={"three"}>three</MqRadioGroup.Item>
			</MqRadioGroup>
		);
		wrapper.find("input").at(1).simulate("change");
		expect(fn).toBeCalledTimes(1);
		wrapper.find("input").at(2).simulate("change");
		expect(fn).toBeCalledTimes(2);
		wrapper.unmount();
	});
});
