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
	/** 初始是否选中 */
	defaultChecked: PropTypes.bool,
	/** 指定当前是否选中（control mode） */
	checked: PropTypes.bool,
	/** 变化时回调函数 */
	onChange: PropTypes.func,
	/** 加载中 */
	loading: PropTypes.bool,
	/** 是否禁用 */
	disabled: PropTypes.bool,
	/** 选中时的内容 */
	checkedChildren: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	/** 未选中时的内容 */
	unCheckedChildren: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	/** 大小 */
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
