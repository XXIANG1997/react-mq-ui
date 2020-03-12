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
	/** step 的标题 */
	text: PropTypes.string,
	/** step 的描述 */
	description: PropTypes.string,
	/** 以完成或者 active 的 icon */
	icon: PropTypes.string,
	/** 是否 active */
	active: PropTypes.bool
};

Step.defaultProps = {
	text: "",
	description: "",
	icon: "success",
	active: false
};

export default Step;
