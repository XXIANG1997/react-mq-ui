import React from "react";
import MqInput from "../../components/Input";

const Input = () => {

	return <div>
		<h2>basic usage</h2>
		<MqInput placeholder={"请输入"}/>
		<MqInput placeholder={"请输入密码"} type={"password"}/>
		<MqInput placeholder={"请输入数字"} type={"number"}/>
		<MqInput placeholder={"请输入"} type={"text"} defaultValue={"默认值"}/>
		<MqInput readOnly={true} value={"只读"} type={"text"}/>
		<MqInput disabled={true} value={"禁用"} type={"text"}/>
		<h2>front/rear tag</h2>
		<MqInput addonBefore={"name:"} placeholder={"请输入名字"}/>
		<MqInput addonAfter={".com"} placeholder={"www.github"}/>
		<MqInput addonBefore={"https://"} addonAfter={".com"} placeholder={"www.github.com"}/>
		<h2>input front/rear icon</h2>
		<MqInput addonBefore={"address"} prefix={"home"}/>
		<MqInput suffix={"icon-test21"}/>
		<h2>size</h2>
		<MqInput size={"small"} value={"small"}/>
		<MqInput size={"medium"} value={"medium"}/>
		<MqInput size={"large"} value={"large"}/>
		<h2>allow clear</h2>
		<MqInput allowClear={true}/>
		<h2>password input</h2>
		<MqInput addonBefore={"Bank card password"} type={"password"} showPassword={true}/>
	</div>;
};

export default Input;

