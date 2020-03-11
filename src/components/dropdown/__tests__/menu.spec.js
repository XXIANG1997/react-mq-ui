import React from "react";
import Menu from "../menu";
import { mount } from "enzyme";

describe("<Menu/>", () => {
	test("allows us to set props", () => {
		const fn1 = () => {
		};
		const fn2 = () => {
		};
		const wrapper1 = mount(
			<Menu _close={fn2} callback={fn1}/>
		);
		expect(wrapper1.props().callback).toBe(fn1);
		expect(wrapper1.props()._close).toBe(fn2);
		wrapper1.setProps({
			_close: fn1,
			callback: fn2
		});
		expect(wrapper1.props().callback).toBe(fn2);
		expect(wrapper1.props()._close).toBe(fn1);

		const wrapper2 = mount(
			<Menu.Item callback={fn1} _close={fn2} name={"test"}>one</Menu.Item>
		);
		expect(wrapper2.props().callback).toBe(fn1);
		expect(wrapper2.props()._close).toBe(fn2);
		expect(wrapper2.props().name).toBe("test");
		wrapper2.setProps({
			_close: fn1,
			callback: fn2,
			name: "test2"
		});
		expect(wrapper2.props().callback).toBe(fn2);
		expect(wrapper2.props()._close).toBe(fn1);
		expect(wrapper2.props().name).toBe("test2");
	});

	test("emit callback when click menu item", () => {
		const fn1 = jest.fn();
		const fn2 = jest.fn();
		const wrapper = mount(
			<Menu callback={fn1} _close={fn2}>
				<Menu.Item name={"test"}>one</Menu.Item>
			</Menu>
		);
		wrapper.find("li").simulate("click");
		expect(fn1).toBeCalledWith("test");
		expect(fn1).toBeCalledTimes(1);
		expect(fn2).toBeCalledTimes(1);
	});
});
