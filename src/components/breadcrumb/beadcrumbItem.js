import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function BreadcrumbItem(props) {

	const {icon, to, active} = props;
	const prefixCls = "mq-breadcrumb-item";
	return (<li className={prefixCls}>
		{
			to ?
				<Link to={props.to}
				      className={`${prefixCls}-link ${active ? `${prefixCls}-link-active` : ""}`}>
					{icon && <svg className='mq-icon' aria-hidden="true">
						<use xlinkHref={`#icon-${icon}`}/>
					</svg>}
					{props.children}
				</Link>
				:
				<span className={`${prefixCls}-wrapper ${active ? `${prefixCls}-wrapper-active` : ""}`}>
						{icon && <svg className='mq-icon' aria-hidden="true">
							<use xlinkHref={`#icon-${icon}`}/>
						</svg>}
					{props.children}
					</span>
		}
		<span className={`${prefixCls}-separator`}>
				{props.separator}
			</span>
	</li>);
}

BreadcrumbItem.propTypes = {
	/** 分隔符（父元素传过来） */
	separator: PropTypes.string,
	/** 设置 icon */
	icon: PropTypes.string,
	/** 设置 router  地址 */
	to: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object
	]),
	/** 默认激活状态 */
	active: PropTypes.bool
};

BreadcrumbItem.defaultPorps = {
	separator: "",
	icon: "",
	to: "",
	active: false
};

export default BreadcrumbItem;
