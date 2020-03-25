import React from "react";
import PropTypes from "prop-types";
import cls from "classnames";

class RadioGroup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const radioGroup = "mq-radio-group";
		const {value, name, onChange, isButton, size, disabledAll} = this.props;
		let newValue = value;
		if (!value) {
			newValue = this.props.children[0].props.value;
		}
		if (disabledAll) {
			newValue = "";
		}
		const radioGroupCls = cls(
			radioGroup,
			{
				[`${radioGroup}-button-mode`]: isButton,
				[`${radioGroup}-${size}`]: true
			}
		);
		const children = this.props.children.map((child, index) => {
			return React.cloneElement(child, {
				_selectedValue: newValue,
				_onChange: onChange,
				_name: name,
				_disabledAll: disabledAll,
				_isButton: isButton,
				key: index
			});
		});

		return <div className={radioGroupCls}>{children}</div>;
	}
}

RadioGroup.propTypes = {
	/** 选择的 value */
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.bool
	]),
	/** 区别别的 radio */
	name: PropTypes.string,
	/** value callback */
	onChange: PropTypes.func,
	/** button 模式 */
	isButton: PropTypes.bool,
	/** 禁用全部 */
	disabledAll: PropTypes.bool,
	/** size */
	size: PropTypes.oneOf(["small", "medium", "large"])
};

RadioGroup.defaultProps = {
	size: "medium",
	name: "mq-radio" + parseInt((Math.random() * 10000).toString(), 10) + 1,
	value: "",
	isButton: false,
	disabledAll: false,
	onChange: () => {
	}
};

export default RadioGroup;
