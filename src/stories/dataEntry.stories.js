import { storiesOf } from "@storybook/react";
import Input from "./code/input";
import NumberInput from "./code/numberInput";
import Radio from "./code/raido";
import Checkbox from "./code/checkbox";
import Switch from "./code/switch";

storiesOf("数据录入", module)
	.add("input 输入框", Input)
	.add("numberInput 数字输入框", NumberInput)
	.add("radio 单选按钮", Radio)
	.add("checkbox 复选框", Checkbox)
	.add("switch 开关按钮", Switch);
