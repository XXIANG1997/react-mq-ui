import React from "react";
import propTypes from "prop-types";

function Menu(props) {
	const prefixCls = "mq-menu";
	return <ul className={prefixCls}>
		{props.children.map((child, index) => {
			return React.cloneElement(child, {_callback: props.callback, key: index});
		})}
	</ul>;
}

Menu.propTypes = {
	/** callback 函数 */
	callback: propTypes.func
};

Menu.defaultProps = {
	callback: () => {
	}
};

Menu.Item = (props) => {
	const prefixItemCls = "mq-menu-item";
	return <li onClick={() => props._callback(props.name)} className={prefixItemCls}>
		{props.children}
	</li>;
};

Menu.Item.propTypes = {
	/** callback 函数（父组件传过来） */
	_callback: propTypes.func,
	/** 触发回调时的 id */
	name: propTypes.oneOfType([
		propTypes.string,
		propTypes.number
	])
};

export default Menu;
