import React from "react";
import "./steps.less";
import PropTypes from "prop-types";
import cls from "classnames";

class Steps extends React.Component {
	constructor(props) {
		super(props);
	}

	checkCurrent(current) {
		if (current <= 0) {
			return 1;
		} else if (current > this.props.children.length) {
			return this.props.children.length;
		} else {
			return current;
		}
	}

	render() {
		const {children, current, showLoading, status, size} = this.props;
		const stepsClsPrefix = "mq-steps";
		const stepClsPrefix = "mq-step";
		const currentTwo = this.checkCurrent(current);

		const content = React.Children.map(children, (child, index) => {
			return React.cloneElement(child, {
				active: index === currentTwo - 1
			});
		});

		return <div className={`${stepsClsPrefix} ${stepsClsPrefix}-${size}`}>
			<ul className={`${stepsClsPrefix}-header ${stepsClsPrefix}-have-${children.length}-child`}>
				{
					React.Children.map(children, (child, index) => {
						const {text, description, icon} = child.props;
						const isDone = index < currentTwo - 1;
						const isActive = index === currentTwo - 1;
						const isWait = index > currentTwo - 1;

						let activeStatusIcon;
						if (isActive) {
							if (status) {
								activeStatusIcon = status;
							} else {
								if (showLoading) {
									activeStatusIcon = "loading";

								} else {
									activeStatusIcon = icon;
								}
							}
						}

						return <li className={cls(`${stepClsPrefix}`,
							{[`${stepClsPrefix}-done`]: isDone},
							{[`${stepClsPrefix}-active`]: isActive},
							{[`${stepClsPrefix}-wait`]: isWait},
							// 只有在 active 状态下才会有 status
							{[`${stepClsPrefix}-${status}`]: !(isDone || isWait) && !!(status)},
							// 只有在 active 状态下而且不存在 status 的时候才有 loading 状态
							{[`${stepClsPrefix}-loading`]: !status && isActive && showLoading}
						)}>
							{
								isDone && <svg className={`${stepClsPrefix}-icon mq-icon`} aria-hidden="true">
									<use xlinkHref={`#icon-${icon}`}/>
								</svg>
							}
							{
								activeStatusIcon &&
								<svg className={`${stepClsPrefix}-icon mq-icon`} aria-hidden="true">
									<use xlinkHref={`#icon-${activeStatusIcon}`}/>
								</svg>
							}
							{
								isWait && <svg className={`${stepClsPrefix}-icon mq-icon`} aria-hidden="true">
									<use xlinkHref={`#icon-${index + 1}`}/>
								</svg>
							}

							<div className={`${stepClsPrefix}-title`}>
								{text}
							</div>
							<div className={`${stepClsPrefix}-description`}>
								{description}
							</div>
							{index !== 0 && <div className={`${stepClsPrefix}-line-wrapper`}>
								<div className={`${stepClsPrefix}-line`}/>
								<div className={`${stepClsPrefix}-active-line`}/>
							</div>}
						</li>;
					})
				}
			</ul>
			<div>
				{content}
			</div>
		</div>;
	}
}

Steps.propTypes = {
	current: PropTypes.number,
	showLoading: PropTypes.bool,
	status: PropTypes.oneOf(["error", "warning", ""]),
	size: PropTypes.oneOf(["small", "medium", "large"])
};

Steps.defaultProps = {
	current: 1,
	showLoading: true,
	status: "",
	size: "medium"
};

export default Steps;
