import React from "react";
import PropTypes from "prop-types";
import cls from "classnames";

class Input extends React.Component {
	constructor(props) {
		super(props);
		const {defaultValue, value} = props;
		this.state = {
			/**
			 * defaultValue 是 number 的话，直接返回 defaultValue，否则根据 defaultValue 的 boolean 值来判断返回 defaultValue 或 value。
			 */
			value: (typeof defaultValue === "number") ? defaultValue : (defaultValue ? defaultValue : value),
			showCloseEye: true,
			passwordType: "password"
		};
	}

	/**
	 *
	 * @param event
	 */
	_onChange = (event) => {
		const value = this.props.onChange(event);
		if (value === "mq-input-onChange") {
			this.setState({
				value: event.target.value
			});
		}
	};

	clearValue = () => {
		this.setState({
			value: ""
		});
	};

	triggerPasswordIcon = () => {
		this.setState({
			showCloseEye: !this.state.showCloseEye,
			passwordType: !this.state.showCloseEye ? "password" : "text"
		});
	};

	componentWillReceiveProps(nextProps, nextContext) {
		this.setState({
			value: nextProps.value,
		});
	}

	renderAddon = (addon, location, inputPrefix) => {
		const hash = {
			before: "addonBefore",
			after: "addonAfter"
		};
		return addon && <div className={`${inputPrefix}-${hash[location]}`}>
			{addon}
		</div>;
	};

	renderIcon = (inputPrefix, prefix, suffix, showPassword, type, showCloseEye, allowClear, value) => {
		if (prefix) {
			return <span className={`${inputPrefix}-prefix`}>
					<svg className={"mq-icon"} aria-hidden="true">
						<use xlinkHref={`#icon-${prefix}`}/>
					</svg>
			</span>;
		} else {
			if (showPassword && type === "password") {
				return <span className={`${inputPrefix}-suffix`}>
					<svg onClick={this.triggerPasswordIcon} className={"mq-icon is-showPassword-icon"}
					     aria-hidden="true">
						<use xlinkHref={`#icon-${showCloseEye ? "close-eye" : "eye"}`}/>
					</svg>
			</span>;
			}

			if (allowClear) {
				return (typeof value === "number" ? true : value) &&
					<span className={`${inputPrefix}-suffix`}>
					<svg onClick={this.clearValue} className={"mq-icon is-clear-icon"}
					     aria-hidden="true">
						<use xlinkHref={"#icon-clear"}/>
					</svg>
				</span>;
			}

			if (suffix) {
				return <span className={`${inputPrefix}-suffix`}>
					<svg className={"mq-icon"} aria-hidden="true">
						<use xlinkHref={`#icon-${suffix}`}/>
					</svg>
			</span>;
			}
		}
	};

	render() {
		const inputPrefix = "mq-input";
		const {type, placeholder, disabled, readOnly, addonBefore, addonAfter, size, allowClear, prefix, suffix, showPassword, width} = this.props;
		const {value, showCloseEye, passwordType} = this.state;
		const attrs = {
			type: type === "password" ? passwordType : type,
			className: cls(inputPrefix, {
				"have-prev-brother": !!addonBefore,
				"have-next-brother": !!addonAfter,
				"have-before-icon": !!prefix,
				"have-after-icon": allowClear || !!suffix || !!(showPassword && type === "password")
			}),
			disabled,
			readOnly,
			value
		};
		// eslint-disable-next-line no-useless-escape
		type === "email" && (attrs["pattern"] = "[a-z0-9._%+-]`+@[a-z0-9.-]+\.[a-z]{2,4}$");
		placeholder && (attrs["placeholder"] = placeholder);

		return <div className={`${inputPrefix}-wrapper ${inputPrefix}-${size}`}>
			{this.renderAddon(addonBefore, "before", inputPrefix)}
			<div className={`${inputPrefix}-inner-wrapper`}>
				{this.renderIcon(inputPrefix, prefix)}
				<input onChange={this._onChange} style={{"width": width + "px"}} {...attrs} />
				{this.renderIcon(inputPrefix, undefined, suffix, showPassword, type, showCloseEye, allowClear, value)}
			</div>
			{this.renderAddon(addonAfter, "after", inputPrefix)}
		</div>;
	}
}

Input.propTypes = {
	/** input type 类型*/
	type: PropTypes.oneOf(["text", "password", "number", "email"]),
	/** input size 大小 */
	size: PropTypes.oneOf(["small", "medium", "large"]),
	/** 提示文字 */
	placeholder: PropTypes.string,
	/** 默认值 */
	defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	/** input 的 value 值 */
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	/** input 的前缀 icon */
	prefix: PropTypes.string,
	/** input 的后缀 icon */
	suffix: PropTypes.string,
	/** 是否禁用 */
	disabled: PropTypes.bool,
	/** 是否 readonly */
	readOnly: PropTypes.bool,
	/** input 前缀 */
	addonBefore: PropTypes.string,
	/** input 后缀 */
	addonAfter: PropTypes.string,
	/**  是否显示清除 */
	allowClear: PropTypes.bool,
	/** value 变化时触发的函数 */
	onChange: PropTypes.func,
	/** 是否显示 password */
	showPassword: PropTypes.bool,
	/** 设置 input 的宽度 */
	width: PropTypes.number
};

Input.defaultProps = {
	type: "text",
	placeholder: "",
	defaultValue: "",
	showPassword: false,
	suffix: "",
	prefix: "",
	value: "",
	disabled: false,
	readOnly: false,
	addonBefore: "",
	addonAfter: "",
	size: "medium",
	allowClear: false,
	onChange: () => {
		return "mq-input-onChange";
	},
	width: 250
};
export default Input;
