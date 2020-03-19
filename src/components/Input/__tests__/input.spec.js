import React from "react";
import Input from "../Input";
import { mount } from "enzyme";

describe("<Input/>", () => {
	const inputPrefix = ".mq-input";
	test("allow us to set props", () => {
		const fn1 = () => {
		};
		const fn2 = () => {

		};
		const wrapper = mount(<Input prefix={"home"}
		                             suffix={"icon-test21"}
		                             allowClear={true}
		                             showPassword={true}
		                             addonBefore={"test"}
		                             addonAfter={"test"}
		                             type={"password"}
		                             placeholder={"test"}
		                             disabled={true}
		                             defaultValue={"test"}
		                             readOnly={true}
		                             size={"small"}
		                             onChange={fn1}
		                             value={"test"}
		                             width={300}/>);

		expect(wrapper.props().prefix).toBe("home");
		expect(wrapper.props().suffix).toBe("icon-test21");
		expect(wrapper.props().allowClear).toBe(true);
		expect(wrapper.props().showPassword).toBe(true);
		expect(wrapper.props().addonBefore).toBe("test");
		expect(wrapper.props().addonAfter).toBe("test");
		expect(wrapper.props().type).toBe("password");
		expect(wrapper.props().placeholder).toBe("test");
		expect(wrapper.props().disabled).toBe(true);
		expect(wrapper.props().defaultValue).toBe("test");
		expect(wrapper.props().readOnly).toBe(true);
		expect(wrapper.props().size).toBe("small");
		expect(wrapper.props().onChange).toBe(fn1);
		expect(wrapper.props().value).toBe("test");
		expect(wrapper.props().width).toBe(300);
		wrapper.setProps({
			prefix: "icon-test21",
			suffix: "home",
			allowClear: false,
			showPassword: false,
			addonBefore: "test1",
			addonAfter: "test1",
			type: "email",
			placeholder: "test1",
			disabled: false,
			defaultValue: "test1",
			readOnly: false,
			size: "medium",
			onChange: fn2,
			value: "test1",
			width: 400
		});
		expect(wrapper.props().prefix).toBe("icon-test21");
		expect(wrapper.props().suffix).toBe("home");
		expect(wrapper.props().allowClear).toBe(false);
		expect(wrapper.props().showPassword).toBe(false);
		expect(wrapper.props().addonBefore).toBe("test1");
		expect(wrapper.props().addonAfter).toBe("test1");
		expect(wrapper.props().type).toBe("email");
		expect(wrapper.props().placeholder).toBe("test1");
		expect(wrapper.props().disabled).toBe(false);
		expect(wrapper.props().defaultValue).toBe("test1");
		expect(wrapper.props().readOnly).toBe(false);
		expect(wrapper.props().size).toBe("medium");
		expect(wrapper.props().onChange).toBe(fn2);
		expect(wrapper.props().value).toBe("test1");
		expect(wrapper.props().width).toBe(400);
		wrapper.unmount();
	});

	test("exactly render addon when set addonBefore or addonAfter prop", () => {
		const wrapper = mount(
			<Input addonBefore={"https://"} addonAfter={".com"}/>
		);
		expect(wrapper.find(`${inputPrefix}-addonBefore`).exists()).toBe(true);
		expect(wrapper.find(`${inputPrefix}-addonAfter`).exists()).toBe(true);
		expect(wrapper.find(`${inputPrefix}-addonBefore`).text()).toBe("https://");
		expect(wrapper.find(`${inputPrefix}-addonAfter`).text()).toBe(".com");
		wrapper.unmount();
	});

	test("exactly render input icon when set prefix and suffix prop", () => {
		const wrapper = mount(
			<Input prefix={"home"} suffix={"icon-test21"}/>
		);
		expect(wrapper.find(`${inputPrefix}-prefix`).exists()).toBe(true);
		expect(wrapper.find(`${inputPrefix}-suffix`).exists()).toBe(true);
		expect(wrapper.find(`${inputPrefix}-prefix > svg > use`).getDOMNode().getAttribute("xlink:href")).toBe("#icon-home");
		expect(wrapper.find(`${inputPrefix}-suffix > svg > use`).getDOMNode().getAttribute("xlink:href")).toBe("#icon-icon-test21");
		wrapper.unmount();
	});

	test("exactly render input clear icon when set allowClear prop", () => {
		const wrapper = mount(
			<Input allowClear={true} value={"test"}/>
		);
		expect(wrapper.find(`${inputPrefix}-suffix > svg > use`).getDOMNode().getAttribute("xlink:href")).toBe("#icon-clear");
		wrapper.unmount();
	});

	test("exactly render password input when set showPassword prop", () => {
		const wrapper = mount(
			<Input showPassword={true} type={"password"}/>
		);
		expect(wrapper.find(`${inputPrefix}-suffix > svg > use`).getDOMNode().getAttribute("xlink:href")).toBe("#icon-close-eye");
		expect(wrapper.find("input").getDOMNode().getAttribute("type")).toBe("password");
		wrapper.find(`${inputPrefix}-suffix > svg`).simulate("click");
		expect(wrapper.find(`${inputPrefix}-suffix > svg > use`).getDOMNode().getAttribute("xlink:href")).toBe("#icon-eye");
		expect(wrapper.find("input").getDOMNode().getAttribute("type")).toBe("text");
		wrapper.unmount();
	});
});
