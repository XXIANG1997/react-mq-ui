import React from "react";
import PropTypes from "prop-types";
import cls from "classnames";

class Button extends React.Component {
	constructor(props) {
		super(props);
		const prefix = "mq-button";
		this.classNames = cls(
			"mq-button",
			`${prefix}-${this.props.type}`,
			`${prefix}-${this.props.size}`,
			{[`${prefix}-loading`]: this.props.loading},
			{[`${prefix}-dashed`]: this.props.dashed},
			{[`${prefix}-block`]: this.props.block},
			{[`${prefix}-outlined`]: this.props.outlined},
			{[`${prefix}-rounded`]: this.props.rounded}
		);

		this.iconCls = cls(
			"mq-icon",
			{[`${prefix}-icon-right`]: this.props.iconPosition === "right"}
		);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		this.props.callback(event);
	}

	render() {
		const {disabled, icon} = this.props;
		return <button onClick={this.handleClick} className={this.classNames} disabled={disabled}>
			{icon && <svg className={this.iconCls} aria-hidden="true">
				<use xlinkHref={`#icon-${icon}`}/>
			</svg>}
			<span className='mq-button-content'>
				{this.props.children}
			</span>
		</button>;
	}
}

Button.defaultProps = {
	type: "default",
	loading: false,
	disabled: false,
	dashed: false,
	block: false,
	icon: "",
	iconPosition: "left",
	outlined: false,
	rounded: false,
	size: "medium",
	callback: function () {

	}
};

Button.propTypes = {
	/** 按钮类型 */
	type: PropTypes.oneOf(["default", "primary", "info", "success", "error", "warning"]),
	/** 是否 loading */
	loading: PropTypes.bool,
	/** 禁用状态 */
	disabled: PropTypes.bool,
	/** 虚线框 */
	dashed: PropTypes.bool,
	/** 是否是一个block 元素（填满一行） */
	block: PropTypes.bool,
	/** 设置 icon */
	icon: PropTypes.string,
	/** icon 的位置 */
	iconPosition: PropTypes.oneOf(["left", "right"]),
	/** 是否为 outline 状态 */
	outlined: PropTypes.bool,
	/** 圆形按钮 */
	rounded: PropTypes.bool,
	/** 按钮大小 */
	size: PropTypes.oneOf(["small", "medium", "large"]),
	/** callback 函数 */
	callback: PropTypes.func
};

export default Button;
