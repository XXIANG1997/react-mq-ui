import React from "react";
import { mount } from "enzyme";
import MqNumberInput from "../index";

describe("<NumberInput/>", () => {
	test("allow us to set props", () => {
		const fn = () => {
		};
		const fn1 = () => {

		};
		const wrapper = mount(
			<MqNumberInput max={200}
			               min={-200}
			               value={100}
			               allowClear={true}
			               decimal={6}
			               placeholder={"test"}
			               size={"small"}
			               step={10}
			               showStepper={true}
			               disabled={false}
			               getValue={fn}
			/>
		);
		expect(wrapper.props().value).toBe(100);
		expect(wrapper.props().max).toBe(200);
		expect(wrapper.props().min).toBe(-200);
		expect(wrapper.props().allowClear).toBe(true);
		expect(wrapper.props().decimal).toBe(6);
		expect(wrapper.props().placeholder).toBe("test");
		expect(wrapper.props().size).toBe("small");
		expect(wrapper.props().step).toBe(10);
		expect(wrapper.props().showStepper).toBe(true);
		expect(wrapper.props().disabled).toBe(false);
		expect(wrapper.props().getValue).toBe(fn);
		wrapper.setProps({
			max: 300,
			min: -300,
			value: 50,
			allowClear: false,
			decimal: 5,
			placeholder: "test1",
			size: "large",
			step: 20,
			showStepper: false,
			disabled: true,
			getValue: fn1
		});
		expect(wrapper.props().max).toBe(300);
		expect(wrapper.props().min).toBe(-300);
		expect(wrapper.props().value).toBe(50);
		expect(wrapper.props().allowClear).toBe(false);
		expect(wrapper.props().decimal).toBe(5);
		expect(wrapper.props().placeholder).toBe("test1");
		expect(wrapper.props().size).toBe("large");
		expect(wrapper.props().step).toBe(20);
		expect(wrapper.props().showStepper).toBe(false);
		expect(wrapper.props().disabled).toBe(true);
		expect(wrapper.props().getValue).toBe(fn1);
		wrapper.unmount();
	});

	test("exactly render stepper when set stepper prop", () => {
		const wrapper = mount(
			<MqNumberInput
				value={200}
				showStepper={true}
			/>
		);
		expect(wrapper.find("button.before").exists()).toBe(true);
		expect(wrapper.find("button.after").exists()).toBe(true);
		expect(wrapper.find("button.before").text()).toBe("-");
		expect(wrapper.find("button.after").text()).toBe("+");
		wrapper.unmount();
	});

	test("exactly render input value when set value prop", () => {
		const wrapper = mount(
			<MqNumberInput value={"-.111"} placeholder={"test"}/>
		);
		expect(wrapper.find("input").props().value).toBe("-0.111");
		wrapper.setProps({
			value: "+.111",
		});
		expect(wrapper.find("input").props().value).toBe("0.111");
		wrapper.setProps({
			value: "+00111.111"
		});
		expect(wrapper.find("input").props().value).toBe("111.111");
		wrapper.setProps({
			value: "-00111.111"
		});
		expect(wrapper.find("input").props().value).toBe("-111.111");
		wrapper.setProps({
			value: "+0000.111"
		});
		expect(wrapper.find("input").props().value).toBe("0.111");
		wrapper.setProps({
			value: "-0000.111"
		});
		expect(wrapper.find("input").props().value).toBe("-0.111");
		wrapper.unmount();
	});

	test("get correct value when click stepper", () => {
		const fn = jest.fn();
		const wrapper = mount(
			<MqNumberInput value={10} step={10} getValue={fn} showStepper={true}/>
		);
		wrapper.find("button.before").simulate("click");
		expect(fn).toBeCalledTimes(1);
		expect(fn).toBeCalledWith(0);
		wrapper.find("button.after").simulate("click");
		expect(fn).toBeCalledTimes(2);
		expect(fn).toBeCalledWith(10);
		wrapper.unmount();

	});

	test("when set value more than max(min), then max(min) is displayed", () => {
		const wrapper = mount(
			<MqNumberInput value={1000} max={200} min={-200}/>
		);
		expect(wrapper.find("input").props().value).toBe(200);
		wrapper.setProps({
			value: -1000
		});
		expect(wrapper.find("input").props().value).toBe(-200);
	});
});
