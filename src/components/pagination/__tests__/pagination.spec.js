import React from "react";
import Pagination from "../pagination";
import { mount } from "enzyme";

describe("<Pagination>", () => {
	test("allow us to set props", () => {
		const wrapper = mount(
			<Pagination separator={"..."} size={"medium"} simple={true} currentPage={1} defaultPageSize={10}
			            showPageItemAmount={11} total={200}/>
		);
		expect(wrapper.props().separator).toBe("...");
		expect(wrapper.props().size).toBe("medium");
		expect(wrapper.props().simple).toBe(true);
		expect(wrapper.props().currentPage).toBe(1);
		expect(wrapper.props().defaultPageSize).toBe(10);
		expect(wrapper.props().showPageItemAmount).toBe(11);
		expect(wrapper.props().total).toBe(200);
		wrapper.setProps({
			separator: ">",
			size: "small",
			simple: false,
			currentPage: 2,
			defaultPageSize: 11,
			showPageItemAmount: 12,
			total: 300
		});
		expect(wrapper.props().separator).toBe(">");
		expect(wrapper.props().size).toBe("small");
		expect(wrapper.props().simple).toBe(false);
		expect(wrapper.props().currentPage).toBe(2);
		expect(wrapper.props().defaultPageSize).toBe(11);
		expect(wrapper.props().showPageItemAmount).toBe(12);
		expect(wrapper.props().total).toBe(300);
		wrapper.unmount();
	});

	test("emit callback when click", () => {
		const fn = jest.fn();

		const wrapper = mount(
			<Pagination callback={fn} total={100}/>
		);
		wrapper.find(".mq-pagination-previous > button").simulate("click");
		wrapper.find(".mq-pagination-next > button").simulate("click");
		expect(fn).toBeCalledTimes(2);
		wrapper.unmount();
	});
});
