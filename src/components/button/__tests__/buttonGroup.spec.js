import React from "react";
import ButtonGroup from "../buttonGroup";
import { act } from "react-dom/test-utils";
import TestRenderer from "react-test-renderer";
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

describe("<ButtonGroup>", () => {
	test("<ButttonGroup> have setting className", () => {
		act(() => {
			render(
				<div>
					<ButtonGroup>
						<Button>prev</Button>
						<Button>next</Button>
					</ButtonGroup>
				</div>
				, container);
		});
		expect(container.getElementsByClassName("mq-button-group").length).toBe(1);
	});

	test("have two child", () => {
		const testRender = TestRenderer.create(
			<ButtonGroup>
				<Button>prev</Button>
				<Button>next</Button>
			</ButtonGroup>
		);
		const testInstance = testRender.root;
		expect(testInstance.findAllByType(Button).length).toBe(2);
	});
});
