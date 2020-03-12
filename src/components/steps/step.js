import React from "react";
import "./step.less";
import PropTypes from "prop-types";

function Step(props) {
	const stepClsPrefix = "mq-step";
	const {children, active} = props;
	if (active && !!children) {
		return <div className={`${stepClsPrefix}-content`}>
			{children}
		</div>;
	} else {
		return <></>;
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
