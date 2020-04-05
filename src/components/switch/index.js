import React from "react";
import PropTypes from "prop-types";
import cls from "classnames";
import "./index.less";

export default class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			switchInner: props.defaultChecked || props.checked
		};
	}

	onChange = (e) => {
		const {onChange, checked} = this.props;
		onChange(e);
		const {switchInner} = this.state;
		if (checked !== undefined) {
			this.switchInnerText(checked);
		} else {
			this.switchInnerText(!switchInner);
		}
	};

	switchInnerText = (bool) => {
		this.setState({
			switchInner: bool
		});
	};

	render() {
		const {defaultChecked, checked, loading, checkedChildren, unCheckedChildren, disabled, size} = this.props;
		const {switchInner} = this.state;
		const mqSwitchClsPrefix = "mq-switch";
		const inputOptions = {
			onChange: this.onChange,
			type: "checkbox",
			disabled: disabled || loading
		};
		const labelCls = cls(
			mqSwitchClsPrefix,
			{
				[`${mqSwitchClsPrefix}-disabled`]: disabled || loading,
				[`${mqSwitchClsPrefix}-${size}`]: true
			},
		);
		// 受控状态
		(checked !== undefined) && (inputOptions["checked"] = checked);
		// 非受控
		(checked === undefined) && (inputOptions["defaultChecked"] = defaultChecked);
		return <label className={labelCls}>
			<input {...inputOptions}/>
			<span className={`${mqSwitchClsPrefix}-background`}/>
			{<span className={`${mqSwitchClsPrefix}-inner`}>
				{switchInner ? checkedChildren : unCheckedChildren}
			</span>}
			<span className={`${mqSwitchClsPrefix}-slider`}>
				{loading && <span className={`${mqSwitchClsPrefix}-slider-loading-wrapper`}>
					<svg className="mq-icon" aria-hidden="true">
                        <use xlinkHref="#icon-loading"/>
					</svg>
				</span>}
			</span>
		</label>;
	}
}

Index.propTypes = {
	defaultChecked: PropTypes.bool,
	checked: PropTypes.bool,
	onChange: PropTypes.func,
	loading: PropTypes.bool,
	disabled: PropTypes.bool,
	checkedChildren: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	unCheckedChildren: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	size: PropTypes.oneOf(["small", "medium", "large"])
};

Index.defaultProps = {
	onChange: () => {
	},
	defaultChecked: false,
	loading: false,
	disabled: false,
	size: "medium"
};
