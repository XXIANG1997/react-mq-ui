import MqNumberInput from "../../components/numberInput";
import React from "react";

const NumberInput = () => {
	return <div>
		<MqNumberInput value={"10"} decimal={6} step={10} max={200} min={-5} showStepper={true}/>
	</div>;
};

export default NumberInput;
