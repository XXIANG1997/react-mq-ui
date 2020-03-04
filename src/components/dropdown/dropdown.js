import React from "react";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

class Dropdown extends React.Component {
	constructor(props) {
		super(props);
		this.dropdown = React.createRef();
		this.trigger = React.createRef();
		this.menu = React.createRef();
		this.createPortalsElement();
		this.state = {
			visible: false
		};
	}

	createPortalsElement = () => {
		const node = document.getElementsByClassName("mq-portals")[0];
		if (node) {
			this.el = node;
		} else {
			this.el = document.createElement("div");
			this.el.className = "mq-portals";
			document.body.appendChild(this.el);
		}
	};

	triggerShowContent = (event) => {
		const trigger = this.trigger.current;
		const {visible} = this.state;
		if (trigger.contains(event.target)) {
			if (visible === true) {
				this.close();
			} else {
				this.show();
			}
		}
	};

	show = () => {
		this.setState({
			visible: true
		});
		setTimeout(() => {
			this.fixedPositionMenu();
			document.addEventListener("click", this.closeClick);
		}, 0);
	};

	close = () => {
		this.setState({
			visible: false
		});
		document.removeEventListener("click", this.closeClick);
	};

	fixedPositionMenu = () => {
		const menu = this.menu.current;
		this.el.appendChild(menu);
		const trigger = this.trigger.current;
		const {position} = this.props;
		const {width, height, top, left} = trigger.getBoundingClientRect();
		const {height: menuHeight, width: menuWidth} = menu.getBoundingClientRect();
		const {scrollX, scrollY} = window;
		const positions = {
			top: {
				top: top + scrollY - menuHeight - 10,
				left: left + scrollX + width / 2 - menuWidth / 2
			},
			bottom: {
				top: top + scrollY + height + 10,
				left: left + scrollX + width / 2 - menuWidth / 2
			},
			left: {
				top: top + scrollY - (menuHeight - height) / 2,
				left: left + scrollX - menuWidth - 10
			},
			right: {
				top: top + scrollY - (menuHeight - height) / 2,
				left: left + scrollX + width + 10
			}
		};
		menu.style.left = positions[`${position}`].left + "px";
		menu.style.top = positions[`${position}`].top + "px";
	};

	closeClick = (event) => {
		const menu = this.menu.current;
		menu && !menu.contains(event.target) && this.close();
	};

	componentDidMount() {
		const {triggerType} = this.props;
		const trigger = this.trigger.current;
		const menu = this.menu.current;
		const dropdown = this.dropdown.current;
		this.closeID = "";
		if (triggerType === "click") {
			this.clickID = dropdown.addEventListener("click",
				this.triggerShowContent
			);
		} else {
			this.triggerEnterID = trigger.addEventListener("mouseenter", this.show);
			this.menuEnterID = menu.addEventListener("mouseenter", () => {
				this.show();
				clearTimeout(this.closeID);
			});
			this.triggerLeaveID = trigger.addEventListener("mouseleave", () => {
				this.closeID = setTimeout(this.close, 0);
			});
			this.menuLeaveID = menu.addEventListener("mouseleave", this.close);
		}
	}

	componentWillUnmount() {
		// 清除工作
		window.clearTimeout(this.closeID);
		window.clearTimeout(this.clickID);
		window.clearTimeout(this.triggerEnterID);
		window.clearTimeout(this.triggerLeaveID);
		window.clearTimeout(this.menuEnterID);
		window.clearTimeout(this.menuLeaveID);
		document.getElementsByClassName("mq-portals")[0].remove();
	}

	render() {
		const prefixCls = "mq-dropdown";
		const menuPrefix = "mq-dropdown-menu";
		const {dropdown, menu, trigger} = this;
		const {visible} = this.state;
		const {children, overlay, position, theme, margin, size} = this.props;
		return <div className={prefixCls} style={{"margin": margin}} ref={dropdown}>
			<div className={`${prefixCls}-trigger`} ref={trigger}>
				{/*这个 span 用于解决 hover 移动到 menu 时候的 bug*/}
				<span className={`${prefixCls}-hover-${position}`}/>
				{children}
			</div>
			<div className={`${menuPrefix} ${menuPrefix}-${position} ${menuPrefix}-${theme} ${menuPrefix}-${size}`}
			     ref={menu}>
				{/*unmountOnExit 是个神奇的属性*/}
				<CSSTransition in={visible} unmountOnExit classNames={"fade"} timeout={250}>
					{overlay}
				</CSSTransition>
			</div>
		</div>;
	}
}

Dropdown.propTypes = {
	/** menu 元素 */
	overlay: PropTypes.element,
	/** 触发类型 */
	triggerType: PropTypes.oneOf(["click", "hover"]),
	/** 显示的位置 */
	position: PropTypes.oneOf(["right", "left", "top", "bottom"]),
	/** 主题 */
	theme: PropTypes.oneOf(["dark", "light"]),
	/** 大小 */
	size: PropTypes.oneOf(["small", "medium", "large"]),
	/** margin */
	margin: PropTypes.string
};

Dropdown.defaultProps = {
	triggerType: "click",
	position: "bottom",
	theme: "light",
	margin: "",
	size: "medium"
};

export default Dropdown;
