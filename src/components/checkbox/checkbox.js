import React from "react";
import PropTypes from "prop-types";
import cls from "classnames";

class Checkbox extends React.Component {
	constructor(props) {
		super(props);
		this.input = React.createRef();
	}

	UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
		if (nextProps.indeterminate !== this.props.indeterminate) {
			this.input.current.indeterminate = nextProps.indeterminate;
		}
	}

	componentDidMount() {
		const {indeterminate} = this.props;
		// 判断是否有 indeterminate 有则设置
		(indeterminate !== undefined) && (this.input.current.indeterminate = indeterminate);
	}

	handleChange = (e) => {
		const {disabled} = this.props;
		!disabled && this.props.onChange(e);
		this.input.current.indeterminate = this.props.indeterminate;
	};

	render() {
		const checkboxPrefix = "mq-checkbox";
		const {children, defaultChecked, disabled, size, checked, value} = this.props;
		const checkboxAttr = {
			type: "checkbox",
			ref: this.input,
			className: checkboxPrefix,
			onChange: this.handleChange,
			disabled: disabled,
		};
		const labelCls = cls(
			{
				[`${checkboxPrefix}-wrapper`]: true,
				[`${checkboxPrefix}-disabled`]: disabled,
				[`${checkboxPrefix}-${size}`]: true
			}
		);
		// 判断是否有 value
		(value !== undefined) && (checkboxAttr["value"] = value);
		// 判断是否有 checked 有则变成受控组件
		(checked !== undefined) && (checkboxAttr["checked"] = checked);
		// 只有在没有指定 checked 属性的时候，才能设置 defaultChecked（非受控）
		(checked === undefined && defaultChecked !== undefined) && (checkboxAttr["defaultChecked"] = defaultChecked);
		return <label className={labelCls}>
			<input {...checkboxAttr}/>
			<span className={`${checkboxPrefix}-checkMark`}/>
			<span className={`${checkboxPrefix}-children`}>{children}</span>
		</label>;
	}
}

Checkbox.propTypes = {
	/** 是否 checked */
	checked: PropTypes.bool,
	/** 默认 checked（非受控） */
	defaultChecked: PropTypes.bool,
	/** 不定状态 */
	indeterminate: PropTypes.bool,
	/** 变化时回调函数 */
	onChange: PropTypes.func,
	/** 禁用 */
	disabled: PropTypes.bool,
	/** 大小 */
	size: PropTypes.oneOf(["small", "medium", "large"]),
	/** checkbox value */
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	])
};

Checkbox.defaultProps = {
	disabled: false,
	size: "medium",
	onChange: () => {
	}
};

export default Checkbox;
