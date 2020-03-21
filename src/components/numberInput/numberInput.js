import React from "react";
import PropTypes from "prop-types";
import NP from "number-precision";
import cls from "classnames";

class NumberInput extends React.Component {
	constructor(props) {
		super(props);
		const {value, decimal, max, min} = props;
		this.state = {
			value: this.formatValue(value, decimal, max, min),
			beforeDisabled: false,
			afterDisabled: false
		};
	}

	componentDidMount() {
		this.init();
	}

	init = () => {
		const {max, min} = this.props;
		const {value} = this.state;
		if (value === max) {
			this.setState({
				afterDisabled: true
			});
		}
		if (value === min) {
			this.setState({
				beforeDisabled: true
			});
		}
	};

	formatValue(value, decimal, max, min) {
		let formattedValue;
		const valueToString = value.toString();
		if (valueToString.slice(0, 1) === "+" || valueToString.slice(0, 1) === "-") {
			formattedValue = valueToString.slice(0, 1) + valueToString.replace(/[^\d|\\.]/g, "");
		} else {
			formattedValue = valueToString.replace(/[^\d|\\.]/g, "");
		}
		if (formattedValue === "") {
			return "";
		}
		let splitValue = formattedValue.split(".").slice(0, 2);

		if (Number(formattedValue) < min) {
			console.warn(`你设置的值（${Number(formattedValue)}）小于最小可显示的值，已帮你设置为最小可显示的值（${min}）。`);
			return min;
		}

		if (Number(formattedValue) > max) {
			console.warn(`你设置的值（${Number(formattedValue)}）大于最大可设置的值，已帮你设置为最大可显示的值（${max}）。`);
			return max;
		}

		let allZero = false;

		// .111 => 0.111
		if (splitValue[0] === "") {
			splitValue[0] = "0";
		}

		// 0000.111 => 0.111
		// 000111.111 => 111.111
		if (splitValue[0].length > 1) {
			for (let i = 0; i < splitValue[0].length; i++) {
				if (splitValue[0][i] !== "0") {
					splitValue[0] = splitValue[0].substring(i);
					break;
				}
				if (i === splitValue[0].length - 1) {
					allZero = true;
				}
			}
		}
		if (allZero) {
			splitValue[0] = "0";
			allZero = false;
		}

		if (splitValue[1] === "" || splitValue[1] === "0") {
			splitValue = [splitValue[0]];
		}
		if (splitValue[1] && splitValue[1].length > decimal) {
			splitValue[1] = splitValue[1].substring(0, decimal);
		}
		// 0.0000 => 0.0
		if (splitValue[1]) {
			for (let i = 0; i < splitValue[1].length; i++) {
				if (splitValue[1][i] !== "0") {
					break;
				}
				if (i === splitValue[1].length - 1) {
					allZero = true;
				}
			}
		}
		if (allZero) {
			splitValue[1] = "0";
			allZero = false;
		}

		return splitValue.join(".");
	}

	formatChangeValue = (value, decimal, max, min, getValue) => {
		const valueToString = value.toString();
		let formattedValue;
		if (valueToString.slice(0, 1) === "+" || valueToString.slice(0, 1) === "-") {
			formattedValue = valueToString.slice(0, 1) + valueToString.replace(/[^\d|\\.]/g, "");
		} else {
			formattedValue = value.toString().replace(/[^\d|\\.]/g, "");
		}
		if (Number(formattedValue) < min) {
			console.warn(`你设置的值（${Number(formattedValue)}）小于最小可显示的值，已帮你设置为最小可显示的值（${min}）。`);
			this.setState({
				beforeDisabled: true
			});
			getValue(min);
			return min;
		}
		if (Number(formattedValue) > max) {
			getValue(max);
			console.warn(`你设置的值（${Number(formattedValue)}）大于最大可显示的值，已帮你设置为最大可显示的值（${max}）。`);
			this.setState({
				afterDisabled: true
			});
			return max;
		}
		const splitValue = formattedValue.split(".").slice(0, 2);
		// ['111', ''] => '111.'
		if (splitValue[1] === "") {
			return splitValue[0] + ".";
		}
		// limit decimal
		if (splitValue[1] && splitValue[1].length > decimal) {
			splitValue[1] = splitValue[1].substring(0, decimal);
		}
		getValue(Number(splitValue.join(".")));
		return splitValue.join(".");
	};

	onStep = (step, max, min, getValue) => {
		let formatValue = Number(this.formatValue(this.state.value));
		if (NP.plus(formatValue, step) < min) {
			this.setState({
				beforeDisabled: true
			});
		} else if (NP.plus(formatValue, step) > max) {
			this.setState({
				afterDisabled: true
			});
		} else {
			const value = NP.plus(formatValue, step);
			getValue(value);
			this.setState({
				value,
				beforeDisabled: false,
				afterDisabled: false
			});
		}
	};

	onChange = (e) => {
		const {decimal, max, min, getValue} = this.props;
		this.setState({
			value: this.formatChangeValue(e.target.value, decimal, max, min, getValue)
		});
	};

	render() {
		const {disabled, showStepper, size, step, max, min, getValue, placeholder} = this.props;
		const {beforeDisabled, afterDisabled} = this.state;
		const numberInput = "mq-number-input";
		const beforeBtnCls = cls(
			"before",
			{
				[`${numberInput}-stepper`]: true,
				disabled: beforeDisabled
			}
		);
		const afterBtnCls = cls(
			"after",
			{
				[`${numberInput}-stepper`]: true,
				disabled: afterDisabled
			}
		);
		const inputCls = cls(
			{
				[`${numberInput}`]: true,
				"have-stepper": showStepper
			}
		);
		const inputWrapCls = cls(
			{
				[`${numberInput}-wrapper`]: true,
				[`${numberInput}-wrapper-disabled`]: disabled,
				[`${numberInput}-${size}`]: true
			}
		);
		return <div className={inputWrapCls}>
			{
				showStepper &&
				<button className={beforeBtnCls} disabled={beforeDisabled || disabled}
				        onClick={() => this.onStep(-step, max, min, getValue)}>-</button>
			}
			<input type="text" className={inputCls}
			       onChange={this.onChange}
			       value={this.state.value}
			       placeholder={placeholder}
			       disabled={disabled}
			/>
			{
				showStepper &&
				<button className={afterBtnCls} disabled={afterDisabled || disabled}
				        onClick={() => this.onStep(+step, max, min, getValue)}>+</button>
			}
		</div>;
	}
}

NumberInput.propTypes = {
	/** input 的 value */
	value: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	]),
	/** 提示文字 */
	placeholder: PropTypes.string,
	/** 是否禁用 */
	disabled: PropTypes.bool,
	/** 限定小数位 */
	decimal: PropTypes.number,
	/** 递增（减）幅度 */
	step: PropTypes.number,
	/** 加减按钮 */
	showStepper: PropTypes.bool,
	/** 可显示最大值 */
	max: PropTypes.number,
	/** 可显示最小值 */
	min: PropTypes.number,
	/** 大小 */
	size: PropTypes.oneOf(["small", "medium", "large"]),
	/** 得到显示的值 */
	getValue: PropTypes.func
};

NumberInput.defaultProps = {
	value: "",
	placeholder: "",
	disabled: false,
	decimal: 4,
	step: 1,
	showStepper: false,
	max: Infinity,
	min: -Infinity,
	size: "medium",
	getValue: () => {
	}
};

export default NumberInput;
