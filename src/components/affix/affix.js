import React from "react";
import "./affix.less";
import PropTypes from "prop-types";

class Affix extends React.Component {
	constructor(props) {
		super(props);
		this.affix = React.createRef();
		this.state = {
			execTopCallback: true,
			execBottomCallback: true,
			isTopEmit: false,
			isBottomEmit: false
		};
	}

	componentDidMount() {
		const affix = this.affix.current;
		this.props.topOffset !== -1 && (affix.style.top = this.props.topOffset + "px");
		this.props.bottomOffset !== -1 && (affix.style.bottom = this.props.bottomOffset + "px");
		this.listener = () => {
			if (this.props.topOffset >= 0) {
				if (this.affix.current.getBoundingClientRect()["top"] === this.props.topOffset) {
					if (this.state.execTopCallback) {
						this.props.callback("top");
						this.setState({
							execTopCallback: false,
							isTopEmit: true
						});
					}
				} else if (this.state.isTopEmit && this.affix.current.getBoundingClientRect()["top"] > this.props.topOffset) {
					this.setState({
						execTopCallback: true
					});
				}
			}
			if (this.props.bottomOffset >= 0) {
				if (this.affix.current.getBoundingClientRect()["bottom"] + this.props.bottomOffset === window.innerHeight) {
					if (this.state.execBottomCallback) {
						this.props.callback("bottom");
						this.setState({
							execBottomCallback: false,
							isBottomEmit: true
						});
					}
				} else if (this.state.isBottomEmit && (window.innerHeight - this.affix.current.getBoundingClientRect()["bottom"]) > this.props.topOffset) {
					this.setState({
						execBottomCallback: true
					});
				}
			}
		};
		window.addEventListener("scroll", this.listener);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.listener);
	}

	render() {
		const prefixAffix = "mq-affix";
		return <div className={`${prefixAffix}`} ref={this.affix}>
			{this.props.children}
		</div>;
	}
}

Affix.propTypes = {
	/** 顶部触发的距离 */
	topOffset: PropTypes.number,
	/** 底部触发的距离 */
	bottomOffset: PropTypes.number,
	/** 固定时回调函数（接收一个 type 参数用于说明是顶部触发还是底部触发） */
	callback: PropTypes.func
};

Affix.defaultProps = {
	topOffset: -1,
	bottomOffset: -1,
	callback: function (type) {
	}
};

export default Affix;
