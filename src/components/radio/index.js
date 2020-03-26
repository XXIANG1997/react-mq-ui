import Radio from "./radio";
import RadioGroup from "./radioGroup";

import "./radio.less";
import "./radioGroup.less";

const MqRadioGroup = RadioGroup;
MqRadioGroup.Item = Radio;

export default MqRadioGroup;
