import Radio from "./radio";
import RadioGroup from "./radioGroup";

import "./radio.less";
import "./radioGroup.less";

const MqRadio = Radio;
const MqRadioGroup = RadioGroup;
MqRadioGroup.Item = MqRadio;

export default MqRadioGroup;
