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

	UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
		/** 只针对 value 更改的情况 */
		if (nextProps.value && this.isArray(nextProps.value)) {
			let formatArray = this.formatOptions(nextProps.options, nextProps.value, nextProps.disabled, nextProps.size);
			this.setState({
				formatOptions: formatArray
			});
			this.getSelectedValue(formatArray);
		}
	}

	emitCallbackAndFormatOptions = (selectedValue) => {
		const {options, disabled, size} = this.props;
		this.props.onChange(selectedValue);
		this.setState({
			formatOptions: this.formatOptions(options, selectedValue, disabled, size)
		});
	};

	isArray = (array) => {
		return Array.isArray(array);
	};

	childChange = (e) => {
		const value = e.target.value;
		const checked = e.target.checked;
		const {selectedValue, controlMode} = this.state;
		if (controlMode) {
			/** 受控状态下直接触发回调 */
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

	formatOptions = (options, selectedValue, disabled, size) => {
		const formatArray = [];
		if (!this.isArray(options)) return formatArray;
		for (let i = 0; i < options.length; i++) {
			if (typeof options[i] === "string") {
				const temp = {};
				temp.value = temp.label = options[i];
				temp.size = size;
				temp.disabled = !!disabled;
				temp.onChange = this.childChange;
				this.isArray(selectedValue) ? (temp.selected = !!selectedValue.includes(temp.value)) : (temp.selected = false);
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
					temp.size = size;
					temp.onChange = this.childChange;
					options[i].disabled === undefined && (temp.disabled = !!disabled);
					options[i].disabled !== undefined && (temp.disabled = !!options[i].disabled);
					this.isArray(selectedValue) ? (temp.selected = !!selectedValue.includes(temp.value)) : (temp.selected = false);
					formatArray.push(temp);
				}
			}
		}
		return formatArray;
	};

	getSelectedValue = (formatArray) => {
		let temp = [];
		for (let i = 0; i < formatArray.length; i++) {
			formatArray[i].selected && temp.push(formatArray[i].value);
		}
		this.setState({
			selectedValue: temp
		});
	};

	componentDidMount() {
		const {options, value, defaultValue, disabled, size} = this.props;
		let formatArray;
		if (this.isArray(value) || value !== undefined) {
			this.setState({
				controlMode: true
			});
			if (this.isArray(value)) {
				formatArray = this.formatOptions(options, value, disabled, size);
			} else {
				formatArray = this.formatOptions(options, [], disabled, size);
			}
		} else {
			let val = defaultValue;
			if (!this.isArray(defaultValue)) val = [];
			formatArray = this.formatOptions(options, val, disabled, size);
		}
		this.getSelectedValue(formatArray);
		this.setState({
			formatOptions: formatArray,
		});
	}

	render() {
		const {formatOptions, controlMode} = this.state;
		const children = formatOptions.map((opt, index) => {
			const attr = {
				key: index,
				value: opt.value,
				disabled: opt.disabled,
				onChange: opt.onChange,
				size: opt.size
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
	/** 可选项 */
	options: PropTypes.array.isRequired,
	/** 默认选择项（非控状态） */
	defaultValue: PropTypes.array,
	/** 选中项（受控状态） */
	value: PropTypes.array,
	/** 变化时回调函数 */
	onChange: PropTypes.func,
	/** 整组失效 */
	disabled: PropTypes.bool,
	/** 大小 */
	size: PropTypes.oneOf(["small", "medium", "large"])
};

CheckboxGroup.defaultProps = {
	disabled: false,
	options: [],
	size: "medium",
	onChange: () => {
	}
};

export default CheckboxGroup;
