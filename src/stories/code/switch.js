import React, { useState } from "react";
import { MqSwitch } from "../../components";

const Switch = () => {
	const [checked, onChange] = useState(true);
	return <div>
		<h2>basic usage</h2>
		<MqSwitch/>
		<h2>default checked</h2>
		<h3>unControl mode</h3>
		<MqSwitch defaultChecked={true}/>
		<h3>control mode</h3>
		<MqSwitch checked={checked} onChange={(e) => {
			onChange(e.target.checked);
		}}/>
		<h2>description text</h2>
		<MqSwitch unCheckedChildren={"关"} checkedChildren={"开"}/>
		<h2>disabled</h2>
		<MqSwitch disabled={true} defaultChecked={true}/>
		<h2>loading</h2>
		<MqSwitch loading={true} defaultChecked={true}/>
		<h2>size</h2>
		<div style={{display: "flex", alignItems: "center"}}>
			<MqSwitch defaultChecked={true} size={"large"}/>
			<MqSwitch defaultChecked={true} size={"medium"}/>
			<MqSwitch defaultChecked={true} size={"small"}/>
		</div>
	</div>;
};

export default Switch;
