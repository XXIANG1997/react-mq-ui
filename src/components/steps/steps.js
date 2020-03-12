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

		const content = children.map((child, index) => {
			return React.cloneElement(child, {
				active: index === currentTwo - 1,
				key: index
			});
		});

		return <div className={`${stepsClsPrefix} ${stepsClsPrefix}-${size}`}>
			<ul className={`${stepsClsPrefix}-header ${stepsClsPrefix}-have-${children.length}-child`}>
				{
					React.Children.map(children, (child, index) => {
						const {text, description, icon} = child.props;
						/** 三种状态 */
						const isDone = index < currentTwo - 1;
						const isActive = index === currentTwo - 1;
						const isWait = index > currentTwo - 1;

						let activeStatusIcon;
						if (isActive) {
							/** 如果有 status activeIcon 就是 status 的 Icon  */
							if (status) {
								activeStatusIcon = status;
							} else {
								/** 如果是 showLoading 状态 activeIcon 就是 loading 否则就是用户自定义的 Icon */
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
							{
								/** 每个 step 之间的连接线 */
								index !== 0 && <div className={`${stepClsPrefix}-line-wrapper`}>
									<div className={`${stepClsPrefix}-line`}/>
									<div className={`${stepClsPrefix}-active-line`}/>
								</div>
							}
						</li>;
					})
				}
			</ul>
			<div className={`have-${children.length}-child`}>
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
