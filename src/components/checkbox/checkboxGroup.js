import React from "react";
import PropTypes from "prop-types";
import Checkbox from "./checkbox";

class CheckboxGroup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formatOptions: [],
			selectedValue: [],
			controlMode: false
		};
	}

	/**
	 *
	 * @param nextProps
	 * @param nextContext
	 * @constructor
	 */
	UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
		if (!this.isArray(nextProps.options)) return;
		let formatArray;
		/** 只针对 value 更改的情况 */
		if (nextProps.value && this.isArray(nextProps.value)) {
			formatArray = this.formatOptions(nextProps.options, nextProps.value, nextProps.disabled);
		}
		this.setState({
			formatOptions: formatArray
		});
		this.getSelectedValue(formatArray);
	}

	componentDidMount() {
		const {options, value, defaultValue, disabled} = this.props;
		let formatArray;
		if (this.isArray(value)) {
			this.setState({
				controlMode: true
			});
			formatArray = this.formatOptions(options, value, disabled);
		} else {
			formatArray = this.formatOptions(options, defaultValue, disabled);
		}
		this.setState({
			formatOptions: formatArray,
			selectedValue: this.getSelectedValue(formatArray)
		});
	}

	/**
	 *
	 * @param selectedValue（非受控状态的已选择值）
	 */
	emitCallbackAndFormatOptions = (selectedValue) => {
		const {options, disabled} = this.props;
		this.props.onChange(selectedValue);
		this.setState({
			formatOptions: this.formatOptions(options, selectedValue, disabled)
		});
	};

	/**
	 *
	 * @param array
	 * @returns {arg is any[]}
	 */
	isArray = (array) => {
		return Array.isArray(array);
	};

	/**
	 *
	 * @param e
	 */
	childChange = (e) => {
		const value = e.target.value;
		const checked = e.target.checked;
		const {selectedValue, controlMode} = this.state;
		if (controlMode) {
			/** 受状态下直接触发回调 */
			if (checked) {
				this.props.onChange(selectedValue.concat(value));
			} else {
				const temp = [].concat(selectedValue);
				temp.splice(temp.indexOf(value), 1);
				this.props.onChange(temp);
			}
		} else {
			/** 非受控状态下存储已选择项和触发回调 */
			if (checked) {
				this.setState({
					selectedValue: selectedValue.concat(value)
				}, () => {
					this.emitCallbackAndFormatOptions(this.state.selectedValue);
				});
			} else {
				selectedValue.splice(selectedValue.indexOf(value), 1);
				this.setState({
					selectedValue: selectedValue
				}, () => {
					this.emitCallbackAndFormatOptions(this.state.selectedValue);
				});
			}
		}
	};

	/**
	 *
	 * @param options
	 * @param selectedValue（ 受控状态或者非受控状态的已选择值）
	 * @param disabled
	 * @returns {[]}
	 */
	formatOptions = (options, selectedValue, disabled) => {
		const formatArray = [];
		for (let i = 0; i < options.length; i++) {
			if (typeof options[i] === "string") {
				const temp = {};
				temp.label = options[i];
				temp.value = options[i];
				temp.disabled = disabled;
				temp.onChange = this.childChange;
				temp.selected = selectedValue.includes(temp.value);
				formatArray.push(temp);
			} else if (typeof options[i] === "object") {
				if (Object.keys(options[i]).length !== 0) {
					const temp = {};
					if (!!options[i].value && !options[i].label) {
						temp.label = options[i].value;
					} else {
						temp.label = options[i].label;
					}
					temp.value = options[i].value;
					temp.onChange = this.childChange;
					options[i].disabled === undefined && (temp.disabled = disabled);
					options[i].disabled !== undefined && (temp.disabled = options[i].disabled);
					formatArray.push(temp);
					temp.selected = selectedValue.includes(temp.value);
				}
			}
		}
		return formatArray;
	};

	/**
	 *
	 * @param formatArray
	 * @returns {[]}
	 */
	getSelectedValue = (formatArray) => {
		let temp = [];
		for (let i = 0; i < formatArray.length; i++) {
			formatArray[i].selected && temp.push(formatArray[i].value);
		}
		this.setState({
			selectedValue: temp
		});
		return temp;
	};

	render() {
		const {formatOptions, controlMode} = this.state;
		const children = formatOptions.map((opt, index) => {
			const attr = {
				key: index,
				value: opt.value,
				disabled: opt.disabled,
				onChange: opt.onChange
			};
			if (controlMode) {
				attr["checked"] = opt.selected;
			} else {
				attr["defaultChecked"] = opt.selected;
			}
			return <Checkbox {...attr}>{opt.label}</Checkbox>;
		});
		const checkboxGroupClsPrefix = "mq-checkbox-group";
		return <div className={checkboxGroupClsPrefix}>
			{children}
		</div>;
	}
}

CheckboxGroup.propTypes = {
	options: PropTypes.array,
	defaultValue: PropTypes.array,
	value: PropTypes.array,
	onChange: PropTypes.func,
	disabled: PropTypes.bool,
};

CheckboxGroup.defaultProps = {
	disabled: false,
	options: [],
	onChange: () => {
	}
};

export default CheckboxGroup;
