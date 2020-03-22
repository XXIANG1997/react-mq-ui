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
			afterDisabled: false,
			clearIcon: false
		};
	}

	componentDidMount() {
		this.init();
	}

	init = () => {
		const {max, min} = this.props;
		const {value} = this.state;
		if (value) {
			this.showClearIcon(true);
		}
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

	UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
		const {decimal, max, min} = this.props;
		if (this.state.value !== nextProps.value) {
			this.setState({
				value: this.formatValue(nextProps.value, decimal, max, min)
			});
		}
	}

	formatValue(value, decimal, max, min) {
		let allZero = false;
		let formattedValue = this.reUnlessNum(value);
		/** 空字符直接返回 */

		if (formattedValue === "") {
			return "";
		}
		/** 检查设置的值大（小）于限定值 */

		const result = this.showWarn(formattedValue, max, min);
		if (result === max || result === min) return result;

		/** 去除多余部分 11.1111.111 => 11.1111 */

		let splitValue = formattedValue.split(".").slice(0, 2);

		if (splitValue.length === 1 && (splitValue[0] === "+" || splitValue[0] === "-")) return "";

		/** 小数点前半部分处理 */

		if (splitValue[0].substring(0, 1) === "-") {
			splitValue[0] = "-" + Number(splitValue[0].substring(1));
		} else if (splitValue[0].substring(0, 1) === "+" && splitValue[0].length === 1) {
			splitValue[0] = "0";
		} else {
			splitValue[0] = Number(splitValue[0]);
		}

		/** 小数点后半部分处理 */

		if (splitValue[1] === "" || splitValue[1] === "0") {
			splitValue = [splitValue[0]];
		}
		if (decimal && splitValue[1] && splitValue[1].length > decimal) {
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
		}

		////////////////////////////////////////////////////////////////////

		return splitValue.join(".");
	}

	showClearIcon = (bool) => {
		this.setState({
			clearIcon: bool
		});
	};

	formatChangeValue = (value, decimal, max, min, getValue) => {
		let formattedValue = this.reUnlessNum(value);

		/** 一旦有值显示 clearIcon */

		if (formattedValue) {
			this.showClearIcon(true);
		} else {
			this.showClearIcon(false);
		}

		/** 检查设置的值大（小）于限定值 */

		const result = this.showWarn(formattedValue, max, min);

		if (result === max) {
			getValue(max);
			this.setState({
				afterDisabled: true
			});
			return result;
		}

		if (result === min) {
			getValue(min);
			this.setState({
				beforeDisabled: true
			});
			return result;
		}

		/** 去除多余部分 111.111.111 => 111.111 */

		const splitValue = formattedValue.split(".").slice(0, 2);

		// ['111', ''] => '111.'

		if (splitValue[1] === "") {
			return splitValue[0] + ".";
		}

		// limit decimal

		if (decimal && splitValue[1] && splitValue[1].length > decimal) {
			splitValue[1] = splitValue[1].substring(0, decimal);
		}

		/** 触发取值回调 */

		getValue(Number(splitValue.join(".")));
		return splitValue.join(".");
	};

	onStep = (step, max, min, getValue, decimal) => {
		let formatValue = Number(this.formatValue(this.state.value, decimal, max, min));
		this.showClearIcon(true);
		if (NP.plus(formatValue, step) < min) {
			this.setState({
				beforeDisabled: true
			});
			return;
		}

		if (NP.plus(formatValue, step) > max) {
			this.setState({
				afterDisabled: true
			});
			return;
		}

		const value = NP.plus(formatValue, step);
		getValue(value);
		this.setState({
			value,
			beforeDisabled: false,
			afterDisabled: false,
		}, () => {
		});
	};

	reUnlessNum = (value) => {
		const valueToString = value.toString();
		let formattedValue;
		if (valueToString.slice(0, 1) === "+" || valueToString.slice(0, 1) === "-") {
			formattedValue = valueToString.slice(0, 1) + valueToString.replace(/[^\d|\\.]/g, "");
		} else {
			formattedValue = value.toString().replace(/[^\d|\\.]/g, "");
		}
		return formattedValue;
	};

	onChange = (e) => {
		const {decimal, max, min, getValue} = this.props;
		this.setState({
			value: this.formatChangeValue(e.target.value, decimal, max, min, getValue)
		});
	};

	onClean = () => {
		this.setState({
			value: "",
			beforeDisabled: false,
			afterDisabled: false
		});
		this.showClearIcon(false);
	};

	showWarn = (value, max, min) => {
		if (Number(value) < min) {
			console.warn(`你设置的值（${Number(value)}）小于最小可显示的值，已帮你设置为最小可显示的值（${min}）。`);
			return min;
		}

		if (Number(value) > max) {
			console.warn(`你设置的值（${Number(value)}）大于最大可设置的值，已帮你设置为最大可显示的值（${max}）。`);
			return max;
		}
	};

	render() {
		const {disabled, showStepper, size, step, max, min, getValue, placeholder, allowClear, decimal} = this.props;
		const {beforeDisabled, afterDisabled, clearIcon} = this.state;
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
				"have-stepper": showStepper,
				"have-clear-icon": allowClear
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
				        onClick={() => this.onStep(-step, max, min, getValue, decimal)}>-</button>
			}
			<div className={`${numberInput}-inner-wrapper`}>
				<input type="text" className={inputCls}
				       onChange={this.onChange}
				       value={this.state.value}
				       placeholder={placeholder}
				       disabled={disabled}
				/>
				{allowClear && clearIcon && <span className={`${numberInput}-icon-wrapper`}>
					<svg className={"mq-icon"} onClick={this.onClean} aria-hidden="true">
						<use xlinkHref={"#icon-clear"}/>
					</svg>
				</span>}
			</div>
			{
				showStepper &&
				<button className={afterBtnCls} disabled={afterDisabled || disabled}
				        onClick={() => this.onStep(+step, max, min, getValue, decimal)}>+</button>
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
	/** 清理按钮 */
	allowClear: PropTypes.bool,
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
	allowClear: false,
	decimal: 100,
	step: 1,
	showStepper: false,
	max: Infinity,
	min: -Infinity,
	size: "medium",
	getValue: () => {
	}
};

export default NumberInput;
