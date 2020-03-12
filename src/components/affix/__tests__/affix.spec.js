import React from "react";
import Affix from "../affix";
import { mount } from "enzyme";

describe("<Affix/>", () => {
	test("allow us to set props", () => {
		const fn1 = () => {
		};
		const fn2 = () => {
		};
		const wrapper = mount(
			<Affix bottomOffset={10} topOffset={10} callback={fn1}>
				<button>affix 组件</button>
			</Affix>
		);
		expect(wrapper.props().bottomOffset).toBe(10);
		expect(wrapper.props().topOffset).toBe(10);
		expect(wrapper.props().callback).toBe(fn1);
		wrapper.setProps({
			bottomOffset: 20,
			topOffset: 20,
			callback: fn2
		});
		expect(wrapper.props().bottomOffset).toBe(20);
		expect(wrapper.props().topOffset).toBe(20);
		expect(wrapper.props().callback).toBe(fn2);
	});
	test("emit callback", () => {
		// 很难测，以后再测
	});
});
