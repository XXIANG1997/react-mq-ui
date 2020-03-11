import React from "react";
import { MqDropdown, MqMenu } from "../../components/dropdown";
import { MqButton } from "../../components/button";

const menu = <MqMenu callback={(name) => {
	console.log(name);
}}>
	<MqMenu.Item name={1}>
		<a href="https://www.baidu.com" target={"_blank"}>baidu</a>
	</MqMenu.Item>
	<MqMenu.Item name={2}>Other dropdown Item</MqMenu.Item>
	<MqMenu.Item name={3}>
		<a href="https://www.taobao.com" target={"_blank"}>taobao</a>
	</MqMenu.Item>
	<MqMenu.Item name={4}>Other dropdown Item</MqMenu.Item>
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
		<h2>support callback</h2>
		<MqDropdown position={"top"} margin={"20px"} overlay={menu} triggerType={"hover"}>
			<MqButton>click Item to emit callback</MqButton>
		</MqDropdown>
		<h2>size</h2>
		<MqDropdown size={"small"} position={"top"} margin={"20px"} overlay={menu} triggerType={"hover"}>
			<MqButton size={"small"}>small</MqButton>
		</MqDropdown>
		<MqDropdown size={"medium"} position={"top"} margin={"20px"} overlay={menu} triggerType={"hover"}>
			<MqButton size={"medium"}>medium</MqButton>
		</MqDropdown>
		<MqDropdown size={"large"} position={"top"} margin={"20px"} overlay={menu} triggerType={"hover"}>
			<MqButton size={"large"}>large</MqButton>
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
