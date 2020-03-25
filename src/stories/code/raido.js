import React, { useState } from "react";
import MqRadioGroup from "../../components/radio";

const Radio = () => {
	const [value1, setValue1] = useState("banana");
	const [value2, setValue2] = useState("grape");
	const [value3, setValue3] = useState("grape");
	const [value4, setValue4] = useState("banana");
	const [value5, setValue5] = useState("banana");
	const [value6, setValue6] = useState("grape");
	const [value7, setValue7] = useState("apple");
	const [value8, setValue8] = useState("banana");
	const [value9, setValue9] = useState("grape");
	const [value10, setValue10] = useState("apple");
	return <div>
		<h2>basic usage</h2>
		<MqRadioGroup value={value1} onChange={(e) => setValue1(e.target.value)}>
			<MqRadioGroup.Item value={"banana"}>banana</MqRadioGroup.Item>
			<MqRadioGroup.Item value={"grape"}>grape</MqRadioGroup.Item>
			<MqRadioGroup.Item value={"apple"}>apple</MqRadioGroup.Item>
			<MqRadioGroup.Item value={"orange"}>orange</MqRadioGroup.Item>
		</MqRadioGroup>
		<h2>disabled Item</h2>
		<MqRadioGroup value={value2} onChange={(e) => setValue2(e.target.value)} name={"first2"}>
			<MqRadioGroup.Item disabled={true} value={"banana"}>banana</MqRadioGroup.Item>
			<MqRadioGroup.Item value={"grape"}>grape</MqRadioGroup.Item>
			<MqRadioGroup.Item value={"apple"}>apple</MqRadioGroup.Item>
		</MqRadioGroup>
		<h2>disabled all</h2>
		<MqRadioGroup value={value3} disabledAll={true} onChange={(e) => setValue3(e.target.value)} name={"first3"}>
			<MqRadioGroup.Item value={"banana"}>banana</MqRadioGroup.Item>
			<MqRadioGroup.Item value={"grape"}>grape</MqRadioGroup.Item>
			<MqRadioGroup.Item value={"apple"}>apple</MqRadioGroup.Item>
		</MqRadioGroup>
		<h2>button mode</h2>
		<MqRadioGroup value={value4} isButton={true} onChange={(e) => setValue4(e.target.value)}
		              name={"first4"}>
			<MqRadioGroup.Item value={"banana"}>banana</MqRadioGroup.Item>
			<MqRadioGroup.Item value={"grape"}>grape</MqRadioGroup.Item>
			<MqRadioGroup.Item value={"apple"}>apple</MqRadioGroup.Item>
			<MqRadioGroup.Item value={"orange"}>orange</MqRadioGroup.Item>
		</MqRadioGroup>
		<h2>size</h2>
		<MqRadioGroup size={"small"} value={value5} onChange={(e) => setValue5(e.target.value)}
		              name={"first5"}>
			<MqRadioGroup.Item value={"banana"}>banana</MqRadioGroup.Item>
			<MqRadioGroup.Item value={"grape"}>grape</MqRadioGroup.Item>
			<MqRadioGroup.Item value={"apple"}>apple</MqRadioGroup.Item>
			<MqRadioGroup.Item value={"orange"}>orange</MqRadioGroup.Item>
		</MqRadioGroup>
		<br/>
		<MqRadioGroup size={"medium"} value={value6} onChange={(e) => setValue6(e.target.value)}
		              name={"first6"}>
			<MqRadioGroup.Item value={"banana"}>banana</MqRadioGroup.Item>
			<MqRadioGroup.Item value={"grape"}>grape</MqRadioGroup.Item>
			<MqRadioGroup.Item value={"apple"}>apple</MqRadioGroup.Item>
			<MqRadioGroup.Item value={"orange"}>orange</MqRadioGroup.Item>
		</MqRadioGroup>
		<br/>
		<MqRadioGroup size={"large"} value={value7} onChange={(e) => setValue7(e.target.value)}
		              name={"first7"}>
			<MqRadioGroup.Item value={"banana"}>banana</MqRadioGroup.Item>
			<MqRadioGroup.Item value={"grape"}>grape</MqRadioGroup.Item>
			<MqRadioGroup.Item value={"apple"}>apple</MqRadioGroup.Item>
			<MqRadioGroup.Item value={"orange"}>orange</MqRadioGroup.Item>
		</MqRadioGroup>
		<br/>
		<MqRadioGroup size={"small"} isButton={true} value={value8} onChange={(e) => setValue8(e.target.value)}
		              name={"first8"}>
			<MqRadioGroup.Item value={"banana"}>banana</MqRadioGroup.Item>
			<MqRadioGroup.Item value={"grape"}>grape</MqRadioGroup.Item>
			<MqRadioGroup.Item value={"apple"}>apple</MqRadioGroup.Item>
			<MqRadioGroup.Item value={"orange"}>orange</MqRadioGroup.Item>
		</MqRadioGroup>
		<br/>
		<MqRadioGroup size={"medium"} isButton={true} value={value9} onChange={(e) => setValue9(e.target.value)}
		              name={"first9"}>
			<MqRadioGroup.Item value={"banana"}>banana</MqRadioGroup.Item>
			<MqRadioGroup.Item value={"grape"}>grape</MqRadioGroup.Item>
			<MqRadioGroup.Item value={"apple"}>apple</MqRadioGroup.Item>
			<MqRadioGroup.Item value={"orange"}>orange</MqRadioGroup.Item>
		</MqRadioGroup>
		<br/>
		<MqRadioGroup size={"large"} isButton={true} value={value10} onChange={(e) => setValue10(e.target.value)}
		              name={"first10"}>
			<MqRadioGroup.Item value={"banana"}>banana</MqRadioGroup.Item>
			<MqRadioGroup.Item value={"grape"}>grape</MqRadioGroup.Item>
			<MqRadioGroup.Item value={"apple"}>apple</MqRadioGroup.Item>
			<MqRadioGroup.Item value={"orange"}>orange</MqRadioGroup.Item>
		</MqRadioGroup>
	</div>;
};

export default Radio;
