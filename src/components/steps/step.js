import React from "react";
import "./step.less";
import PropTypes from "prop-types";

class Step extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const stepClsPrefix = "mq-step";
		const {children, active} = this.props;
		if (active && !!children) {
			return <div className={`${stepClsPrefix}-content`}>
				{children}
			</div>;
		} else {
			return null;
		}
	}
}

Step.propTypes = {
	text: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	icon: PropTypes.string,
	active: PropTypes.bool
};

Step.defaultProps = {
	text: "",
	description: "",
	icon: "success",
	active: false
};

export default Step;
