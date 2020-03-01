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
			{[`${prefix}-loading`]: this.props.loading},
			{[`${prefix}-dashed`]: this.props.dashed},
			{[`${prefix}-block`]: this.props.block},
			{[`${prefix}-outlined`]: this.props.outlined},
			{[`${prefix}-rounded`]: this.props.rounded},
		);

		this.iconCls = cls(
			"mq-icon",
			{[`${prefix}-icon-right`]: this.props.iconPosition === "right"}
		);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		this.props.onClick && this.props.onClick(event);
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
	rounded: false
};

Button.propTypes = {
	type: PropTypes.oneOf(["default", "primary", "info", "success", "error", "warning"]).isRequired,
	loading: PropTypes.bool,
	disabled: PropTypes.bool,
	dashed: PropTypes.bool,
	block: PropTypes.bool,
	icon: PropTypes.string,
	iconPosition: PropTypes.oneOf(["left", "right"]),
	outlined: PropTypes.bool,
	rounded: PropTypes.bool
};

export default Button;
