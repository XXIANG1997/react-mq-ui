import React, { useState } from "react";
import MqCheckbox from "../../components/checkbox";

const Checkbox = () => {
	const [checked1, onChange1] = useState(true);
	const [checked2, onChange2] = useState(["apple", "orange"]);
	return <div>
		<h2>basic usage</h2>
		<MqCheckbox onChange={(e) => console.log(e.target.checked)}
		            defaultChecked={true}>banana(unControl)</MqCheckbox>
		<MqCheckbox checked={checked1} onChange={(e) => onChange1(e.target.checked)}>banana(control)</MqCheckbox>
		<MqCheckbox indeterminate={true}>indeterminate(only control
			style)</MqCheckbox>
		<h2>checkbox group</h2>
		<h3>unControl</h3>
		<MqCheckbox.Group options={["apple", "orange", "grape", "tomato"]} defaultValue={["apple"]}
		                  onChange={(value) => console.log(value)}/>
		<h3>control</h3>
		<MqCheckbox.Group options={["apple", "orange", "grape", "banana"]} value={checked2}
		                  onChange={(value) => onChange2(value)}/>
		<h2>size</h2>
		<MqCheckbox onChange={(e) => console.log(e.target.checked)}
		            defaultChecked={true} size={"small"}>small</MqCheckbox>
		<MqCheckbox
			onChange={(e) => console.log(e.target.checked)}
			defaultChecked={true} size={"medium"}>medium</MqCheckbox>
		<MqCheckbox
			onChange={(e) => console.log(e.target.checked)}
			defaultChecked={true} size={"large"}>large</MqCheckbox>
		<MqCheckbox.Group options={["apple", "orange", "grape", "tomato"]} size={"small"} defaultValue={["apple"]}
		                  onChange={(value) => console.log(value)}/>
		<MqCheckbox.Group options={["apple", "orange", "grape", "tomato"]} size={"medium"} defaultValue={["apple"]}
		                  onChange={(value) => console.log(value)}/>
		<MqCheckbox.Group options={["apple", "orange", "grape", "tomato"]} size={"large"} defaultValue={["apple"]}
		                  onChange={(value) => console.log(value)}/>
		<h2>disabled</h2>
		<MqCheckbox onChange={(e) => console.log(e.target.checked)} disabled={true}>disabled</MqCheckbox>
		<MqCheckbox onChange={(e) => console.log(e.target.checked)} defaultChecked={true}
		            disabled={true}>disabled</MqCheckbox>
		<MqCheckbox onChange={(e) => console.log(e.target.checked)} indeterminate={true}
		            disabled={true}>disabled</MqCheckbox>
		<h3>disabled single item</h3>
		<MqCheckbox.Group options={[{value: "apple", label: "disabled", disabled: true}, "orange", "grape", "tomato"]}
		                  size={"medium"}
		                  defaultValue={["apple"]}
		                  onChange={(value) => console.log(value)}/>
		<h3>disabled all</h3>
		<MqCheckbox.Group options={[{value: "apple", disabled: true}, "orange", "grape", "tomato"]} disabled={true}
		                  size={"medium"}
		                  defaultValue={["apple", "orange"]}
		                  onChange={(value) => console.log(value)}/>
	</div>;
};

export default Checkbox;
