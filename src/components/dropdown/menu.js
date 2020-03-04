import React from "react";

class Menu extends React.Component {

	constructor(props) {
		super(props);
	}

	static Item(props) {
		const prefixItemCls = "mq-menu-item";
		return <li className={prefixItemCls}>
			{props.children}
		</li>;
	}

	render() {
		const prefixCls = "mq-menu";
		return <ul className={prefixCls}>
			{this.props.children}
		</ul>;
	}
}

export default Menu;
