import React from "react";
import { MqDropdown, MqMenu } from "../../components/dropdown";
import { MqButton } from "../../components/button";

const menu = <MqMenu>
	<MqMenu.Item>Dropdown Item</MqMenu.Item>
	<MqMenu.Item>Other dropdown Item</MqMenu.Item>
	<MqMenu.Item>Active dropdown Item</MqMenu.Item>
	<MqMenu.Item>Other dropdown Item</MqMenu.Item>
</MqMenu>;

const dropdown = () => (
	<div>
		<h2>basic usage</h2>
		<MqDropdown margin={"20px"} overlay={menu}>
			<MqButton>DropDown button</MqButton>
		</MqDropdown>
		<h2>trigger type</h2>
		<MqDropdown margin={"20px"} overlay={menu}>
			<MqButton>click</MqButton>
		</MqDropdown>
		<MqDropdown overlay={menu} triggerType={"hover"}>
			<MqButton>hover</MqButton>
		</MqDropdown>
		<h2>position</h2>
		<MqDropdown position={"left"} margin={"20px"} overlay={menu} triggerType={"hover"}>
			<MqButton>left</MqButton>
		</MqDropdown>
		<MqDropdown position={"bottom"} overlay={menu} triggerType={"hover"}>
			<MqButton>bottom</MqButton>
		</MqDropdown>
		<MqDropdown position={"top"} margin={"20px"} overlay={menu} triggerType={"hover"}>
			<MqButton>top</MqButton>
		</MqDropdown>
		<MqDropdown position={"right"} overlay={menu} t triggerType={"hover"}>
			<MqButton>right</MqButton>
		</MqDropdown>
		<h2>theme</h2>
		<MqDropdown theme={"light"} position={"top"} margin={"20px"} overlay={menu} triggerType={"hover"}>
			<MqButton>light</MqButton>
		</MqDropdown>
		<MqDropdown theme={"dark"} position={"top"} overlay={menu} triggerType={"hover"}>
			<MqButton>dark</MqButton>
		</MqDropdown>
	</div>
);

export default dropdown;
