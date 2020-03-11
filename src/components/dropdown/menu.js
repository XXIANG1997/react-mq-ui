import React from "react";
import propTypes from "prop-types";

function Menu(props) {
	const prefixCls = "mq-menu";
	return <ul className={prefixCls}>
		{props.children.map((child, index) => {
			return React.cloneElement(child, {_callback: props.callback, _close: props._close, key: index});
		})}
	</ul>;
}

Menu.propTypes = {
	/** callback 函数 */
	callback: propTypes.func,
	/** 关闭函数（dropdown 组件传过来的） */
	_close: propTypes.func
};

Menu.defaultProps = {
	callback: () => {
	}
};

Menu.Item = (props) => {
	const prefixItemCls = "mq-menu-item";
	return <li onClick={() => {
		props._callback(props.name);
		props._close();
	}} className={prefixItemCls}>
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
