import React from "react";
import { storiesOf } from "@storybook/react";
import { MqButton, MqButtonGroup } from "../components/button";

storiesOf("基础", module)
	.add("Button 按钮", () => (
		<div>
			<h2>basic usage</h2>
			<MqButton type={"default"}>default button</MqButton>
			<MqButton type={"primary"}>primary button</MqButton>
			<MqButton type={"info"}>info button</MqButton>
			<MqButton type={"success"}>success button</MqButton>
			<MqButton type={"error"}>error button</MqButton>
			<MqButton type={"warning"}>warning button</MqButton>
			<MqButton type={"default"} disabled={true}>disabled button</MqButton>
			<MqButton type={"primary"} dashed={true}>dashed button</MqButton>
			<MqButton type={"info"} outlined={true}>outlined button</MqButton>
			<MqButton type={"success"} block={true}>block button</MqButton>
			<h2>outline button</h2>
			<MqButton outlined={true} type={"default"}>default button</MqButton>
			<MqButton outlined={true} type={"primary"}>primary button</MqButton>
			<MqButton outlined={true} type={"info"}>info button</MqButton>
			<MqButton outlined={true} type={"success"}>success button</MqButton>
			<MqButton outlined={true} type={"error"}>error button</MqButton>
			<MqButton outlined={true} type={"warning"}>warning button</MqButton>
			<MqButton outlined={true} type={"info"} block={true}>block button</MqButton>
			<h2>rounded button</h2>
			<MqButton rounded={true} type={"default"}>default button</MqButton>
			<MqButton rounded={true} type={"primary"}>primary button</MqButton>
			<MqButton rounded={true} type={"info"}>info button</MqButton>
			<MqButton rounded={true} type={"success"}>success button</MqButton>
			<MqButton rounded={true} type={"error"}>error button</MqButton>
			<MqButton rounded={true} type={"warning"}>warning button</MqButton>
			<MqButton rounded={true} type={"info"} block={true}>block button</MqButton>
			<h2>disabled button</h2>
			<MqButton disabled={true} type={"default"}>default button</MqButton>
			<MqButton disabled={true} type={"primary"}>primary button</MqButton>
			<MqButton disabled={true} type={"info"}>info button</MqButton>
			<MqButton disabled={true} type={"success"}>success button</MqButton>
			<MqButton disabled={true} type={"error"}>error button</MqButton>
			<MqButton disabled={true} type={"warning"}>warning button</MqButton>
			<MqButton disabled={true} type={"info"} block={true}>block button</MqButton>
			<h2>loading button</h2>
			<MqButton loading={true} type={"default"}>default button</MqButton>
			<MqButton loading={true} type={"primary"}>primary button</MqButton>
			<MqButton loading={true} type={"info"}>info button</MqButton>
			<MqButton loading={true} type={"success"}>success button</MqButton>
			<MqButton loading={true} type={"error"}>error button</MqButton>
			<MqButton loading={true} type={"warning"}>warning button</MqButton>
			<h2>size</h2>
			<MqButton size={"small"} type={"primary"}>small button</MqButton>
			<MqButton size={"medium"} type={"success"}>medium button</MqButton>
			<MqButton size={"large"} type={"error"}>large button</MqButton>
			<h2>support icon</h2>
			<MqButton icon={"setting"} type={"primary"}>setting button</MqButton>
			<MqButton icon={"lock"} type={"success"}>lock button</MqButton>
			<MqButton icon={"copy"} type={"error"}>copy button</MqButton>
			<h2>button group</h2>
			<MqButtonGroup>
				<MqButton icon={"arrow-left"} size={"small"} type={"primary"}>prev</MqButton>
				<MqButton icon={"arrow-right"} iconPosition={"right"} size={"small"} type={"primary"}>next</MqButton>
			</MqButtonGroup>
		</div>
	));
