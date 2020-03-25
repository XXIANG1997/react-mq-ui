import React from "react";
import PropTypes from "prop-types";
import cls from "classnames";

class Radio extends React.Component {

	onChange = (e) => {
		this.props._onChange(e);
	};

	render() {
		const {children, value, disabled, _name, _selectedValue, _isButton, _disabledAll} = this.props;
		const radioPrefix = "mq-radio";
		const wrapperCls = cls(
			radioPrefix,
			{
				[`${radioPrefix}-button-mode`]: _isButton,
				[`${radioPrefix}-disabled`]: (disabled || _disabledAll)
			},
		);
		const attr = {
			onChange: this.onChange,
			type: "radio",
			name: _name,
			value,
			disabled: disabled || _disabledAll,
			checked: (value === _selectedValue && !disabled),
		};
		return <label className={wrapperCls}>
			<input  {...attr}/>
			{!_isButton &&
			<span
				className={`${radioPrefix}-checkMark ${(disabled || _disabledAll) ? `${radioPrefix}-checkMark-disabled` : ""}`}/>}
			<div className={`${radioPrefix}-children`}>{children}</div>
		</label>;
	}
}

Radio.propTypes = {
	/** value 值 */
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]).isRequired,
	/** 选择的 item（父元素传过来） */
	_selectedValue: PropTypes.string,
	/** value callback，（父元素传过来） */
	_onChange: PropTypes.func,
	/** 用于区别的 radio，（父元素传过来） */
	_name: PropTypes.string.isRequired,
	/** button 模式，（父元素传过来） */
	_isButton: PropTypes.bool,
	/** 禁用全部，（父元素传过来） */
	_disabledAll: PropTypes.bool,
	/** 禁用某项 */
	disabled: PropTypes.bool
};

Radio.defaultProps = {
	disabled: false,
	_name: "mq-radio",
	value: "",
	_isButton: false,
	_disabledAll: false,
	_onChange: () => {
	}
};

export default Radio;
