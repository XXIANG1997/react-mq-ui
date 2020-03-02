import React from "react";
import cls from "classnames";
import PropTypes from "prop-types";

class Breadcrumb extends React.Component {
	constructor(props) {
		super(props);
		this.classNames = cls("mq-breadcrumb", {
			[`mq-breadcrumb-${this.props.size}`]: true
		});
	}

	render() {
		let childrenLength = this.props.children.length;
		return <ul className={this.classNames}>
			{
				this.props.children.map((child, index) => {
					if (index === childrenLength - 1) {
						return child;
					}
					return React.cloneElement(child, {separator: this.props.separator, key: index});
				})
			}
		</ul>;
	}
}

Breadcrumb.propTypes = {
	/** 分隔符（传给子元素） */
	separator: PropTypes.string,
	/** 大小 */
	size: PropTypes.oneOf(["small", "medium", "large"])
};

Breadcrumb.defaultProps = {
	separator: "/",
	size: "medium"
};

export default Breadcrumb;
