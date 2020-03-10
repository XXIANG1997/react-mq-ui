import React from "react";
import { act } from "react-dom/test-utils";
import { render as eRender, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { render } from "react-dom";
import Button from "../button";

let container;

beforeEach(() => {
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	document.body.removeChild(container);
	container = null;
});

describe("<Button>", () => {

	test("<Button> have setting className", () => {
		act(() => {
			render(
				<div>
					<Button type={"default"}>default</Button>
					<Button type={"primary"}>primary</Button>
					<Button type={"info"}>info</Button>
					<Button type={"success"}>success</Button>
					<Button type={"error"}>error</Button>
					<Button type={"warning"}>warning</Button>

					<Button loading>loading</Button>
					<Button dashed>dashed</Button>
					<Button outlined>outlined</Button>
					<Button rounded>rounded</Button>
					<Button block>block</Button>

					<Button size={"small"}>small</Button>
					<Button size={"large"}>large</Button>

					<Button icon={"home"}>icon(left)</Button>
					<Button icon={"home"} iconPosition={"right"}>icon(right)</Button>
				</div>
				, container);
		});
		expect(container.getElementsByClassName("mq-button").length).toBe(15);
		expect(container.getElementsByClassName("mq-button-content").length).toBe(15);

		expect(container.getElementsByClassName("mq-button-default").length).toBe(10);
		expect(container.getElementsByClassName("mq-button-primary").length).toBe(1);
		expect(container.getElementsByClassName("mq-button-info").length).toBe(1);
		expect(container.getElementsByClassName("mq-button-success").length).toBe(1);
		expect(container.getElementsByClassName("mq-button-error").length).toBe(1);
		expect(container.getElementsByClassName("mq-button-warning").length).toBe(1);

		expect(container.getElementsByClassName("mq-button-loading").length).toBe(1);
		expect(container.getElementsByClassName("mq-button-dashed").length).toBe(1);
		expect(container.getElementsByClassName("mq-button-block").length).toBe(1);
		expect(container.getElementsByClassName("mq-button-outlined").length).toBe(1);
		expect(container.getElementsByClassName("mq-button-rounded").length).toBe(1);

		expect(container.getElementsByClassName("mq-button-small").length).toBe(1);
		expect(container.getElementsByClassName("mq-button-medium").length).toBe(13);
		expect(container.getElementsByClassName("mq-button-large").length).toBe(1);

		expect(container.getElementsByClassName("mq-icon").length).toBe(2);
		expect(container.getElementsByClassName("mq-button-icon-right").length).toBe(1);

		expect(container.querySelectorAll("use")[0].getAttribute("xlink:href")).toBe("#icon-home");
		expect(container.querySelectorAll("use")[1].getAttribute("xlink:href")).toBe("#icon-home");
	});

	test("by default Clicking the button emit callback", () => {
		const fn = jest.fn();
		act(() => {
			render(<div>
				<Button callback={fn}>loading</Button>
			</div>, container);
		});

		act(() => {
			container.getElementsByClassName("mq-button")[0].dispatchEvent(new MouseEvent("click", {bubbles: true}));
		});

		expect(fn).toHaveBeenCalledTimes(1);
	});

	test("don't emit callback when the button is loading", () => {
		const fn = jest.fn();
		act(() => {
			render(<div>
				<Button loading={true} callback={fn}>loading</Button>
			</div>, container);
		});

		act(() => {
			container.getElementsByClassName("mq-button")[0].dispatchEvent(new MouseEvent("click", {bubbles: true}));
		});

		expect(fn).toHaveBeenCalledTimes(0);
	});

	test("don't emit callback when the button is disabled", () => {
		const fn = jest.fn();
		act(() => {
			render(<div>
				<Button disabled={true} callback={fn}>disabled</Button>
			</div>, container);
		});

		act(() => {
			container.getElementsByClassName("mq-button")[0].dispatchEvent(new MouseEvent("click", {bubbles: true}));
		});

		expect(fn).toHaveBeenCalledTimes(0);
	});

});
