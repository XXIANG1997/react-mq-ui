import { storiesOf } from "@storybook/react";
import Input from "./code/input";
import NumberInput from "./code/numberInput";
import Radio from "./code/raido";

storiesOf("数据录入", module)
	.add("input 输入框", Input)
	.add("numberInput 数字输入框", NumberInput)
	.add("radio 单选按钮", Radio);
