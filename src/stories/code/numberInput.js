import MqNumberInput from "../../components/numberInput";
import React from "react";

const NumberInput = () => {
	return <div>
		<h2>basic usage</h2>
		<MqNumberInput placeholder={"输入数字"} value={-19} decimal={100} step={10} max={200} min={-5}/>
		<h2>auto remove Non-number</h2>
		<MqNumberInput value={"2121abc"}/>
		<MqNumberInput decimal={6}/>
		<h2>disabled</h2>
		<MqNumberInput value={100} disabled={true}/>
		<h2>setting max and min</h2>
		<MqNumberInput max={200} min={-200} value={100}/>
		<h2>setting decimal</h2>
		<MqNumberInput value={1111.555555} decimal={5}/>
		<h2>stepper</h2>
		<MqNumberInput value={20} step={10} showStepper={true} max={200} min={-200}/>
		<h2>custom step</h2>
		<MqNumberInput value={20} step={20} showStepper={true} max={200} min={-200}/>
		<MqNumberInput value={20} step={40} showStepper={true} max={200} min={-200}/>
		<h2>allowClear</h2>
		<MqNumberInput value={10} max={100} min={-100} allowClear={true}/>
		<h2>size</h2>
		<MqNumberInput value={20} step={10} size={"small"} showStepper={true} max={200} min={-200}/>
		<MqNumberInput value={20} step={10} size={"medium"} showStepper={true} max={200} min={-200}/>
		<MqNumberInput value={20} step={10} size={"large"} showStepper={true} max={200} min={-200}/>
	</div>;
};

export default NumberInput;
