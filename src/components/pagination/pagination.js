import React from "react";
import "./pagination.less";
import PropTypes from "prop-types";

class Pagination extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pageItems: [],
			pageItemTotal: 0,
			currentPage: this.props.currentPage,
			showPageItemAmount: this.props.showPageItemAmount,
			simple: this.props.simple,
			edgeCase: false,
			normal: false
		};
	}

	selectItem = (currentPage) => {
		const {normal} = this.state;
		// 防止多次触发
		if (this.state.currentPage === currentPage) return;
		// 防止 item 是 separator 的情况
		if (typeof currentPage === "string") return;
		this.setState({
			currentPage: currentPage
		}, () => {
			// normal 模式
			normal && this.countItem(currentPage);
		});
		// 执行回调
		this.callback(currentPage);
	};

	prevOrNext = (n) => {
		const {normal} = this.state;
		const currentPage = this.state.currentPage + n;
		this.setState({
			currentPage
		}, () => {
			// normal 模式
			normal && this.countItem(currentPage);
		});
		// 执行回调
		this.callback(currentPage);
	};

	callback = (currentPage) => {
		this.props.callback(currentPage);
	};

	countItem = (currentPage) => {
		const {pageItemTotal} = this.state;
		const {separator} = this.props;
		const {showPageItemAmount} = this.state;
		let tempArray = [];
		// 最开始的状态
		if (currentPage <= showPageItemAmount - 2) {
			for (let i = 0; i < showPageItemAmount; i++) {
				tempArray.push(i + 1);
			}
			tempArray.splice(showPageItemAmount - 2, 2);
			tempArray = tempArray.concat([separator, pageItemTotal]);
			// 最后的状态
		} else if (currentPage >= pageItemTotal - showPageItemAmount + 3) {
			for (let i = pageItemTotal - showPageItemAmount + 3; i <= pageItemTotal; i++) {
				tempArray.push(i);
			}
			tempArray = [1, separator].concat(tempArray);
			// 中间状态
		} else {
			const midNum = showPageItemAmount - 4;
			for (let i = currentPage - Math.ceil(midNum / 2) + 1;
			     i < currentPage + Math.ceil(midNum / 2) + ((midNum % 2 === 0) ? 1 : 0);
			     i++) {
				tempArray.push(i);
			}
			tempArray = [1, separator].concat(tempArray, [separator, pageItemTotal]);
		}
		this.setState({
			pageItems: tempArray
		});
	};

	checkout = (currentPage, pageItemTotal, callback) => {
		if (currentPage >= pageItemTotal) {
			// 如果 currentPage 大于 可以显示 item 的数量就警告
			this.setState({
				currentPage: pageItemTotal
			});
			callback(pageItemTotal);
			console.warn(`当前 page（${currentPage}）已超过最大可显示页数，已经默认帮你设置为最大可显示页数`);
		} else if (currentPage <= 0) {
			// 如果 currentPage 小于 最小可显示 item 的数量就警告
			this.setState({
				currentPage: 1
			});
			callback(1);
			console.warn(`当前 page（${currentPage}）小于最小可显示页数，已经默认帮你设置为最小可显示页数`);
		} else {
			callback(currentPage);
		}
	};

	initialData = () => {
		const {total, defaultPageSize, showPageItemAmount} = this.props;
		const {currentPage} = this.state;
		// 总共可显示 item 的数量
		const pageItemTotal = Math.ceil(total / defaultPageSize);

		if (pageItemTotal <= showPageItemAmount) {
			const tempArray = [];
			for (let i = 1; i <= pageItemTotal; i++) {
				tempArray.push(i);
			}
			this.setState({
				showPageItemAmount: pageItemTotal,
				pageItemTotal,
				pageItems: tempArray,
				edgeCase: !this.props.simple
			}, () => {
				const callback = (currentPage) => {
					this.setState({
						currentPage
					});
				};
				this.checkout(currentPage, pageItemTotal, callback);
			});
		} else {
			this.setState({
				pageItemTotal,
				normal: !this.props.simple
			}, () => {
				const callback = (currentPage) => {
					this.countItem(currentPage);
				};
				this.checkout(currentPage, pageItemTotal, callback);
			});
		}
	};

	switchTypes = (stats, separator) => {
		const {normal, currentPage, pageItems, edgeCase, simple, pageItemTotal} = stats;
		const prefixCls = "mq-pagination";
		const simpleCls = "mq-pagination-simple";
		if (normal) {
			return pageItems.map((item, index) => <li
				className={`${prefixCls}-item ${currentPage === item ? `${prefixCls}-item-active` : ""} ${item === separator ? `${prefixCls}-item-separator` : ""}`}
				key={index}
				onClick={() => {
					this.selectItem(item);
				}}>
				{item}
			</li>);
		} else if (edgeCase) {
			return pageItems.map((item, index) => <li
				key={index}
				className={`${prefixCls}-item ${currentPage === item ? `${prefixCls}-item-active` : ""}`}
				onClick={() => {
					this.selectItem(item);
				}}
			>
				{item}
			</li>);
		} else if (simple) {
			return <li className={`${simpleCls}-item`}>
				<span className={`${simpleCls}-item-currentPage`}>{currentPage}</span>
				<span> / </span>
				<span>{pageItemTotal}</span>
			</li>;
		} else {
			return null;
		}
	};

	componentDidMount() {
		this.initialData();
	}

	render() {
		const {currentPage, pageItemTotal, simple} = this.state;
		const {separator} = this.props;
		const prefixCls = "mq-pagination";
		const simpleCls = "mq-pagination-simple";

		return <ul className={`${simple ? simpleCls : prefixCls} ${simple ? simpleCls : prefixCls}-${this.props.size}`}>
			<li className={`${simple ? simpleCls : prefixCls}-previous ${currentPage === 1 ? `${simple ? simpleCls : prefixCls}-previous-disabled` : ""}`}>
				<button className={currentPage === 1 ? "disabled" : ""}
				        onClick={() => this.prevOrNext(-1)}
				>
					<svg className='mq-icon' aria-hidden="true">
						<use xlinkHref={"#icon-arrow-left"}/>
					</svg>
				</button>
			</li>
			{
				this.switchTypes(this.state, separator)
			}
			<li className={`${simple ? simpleCls : prefixCls}-next ${currentPage === pageItemTotal ? `${simple ? simpleCls : prefixCls}-next-disabled` : ""}`}>
				<button className={currentPage === pageItemTotal ? "disabled" : ""}
				        onClick={() => this.prevOrNext(+1)}>
					<svg className='mq-icon' aria-hidden="true">
						<use xlinkHref={"#icon-arrow-right"}/>
					</svg>
				</button>
			</li>
		</ul>;
	}
}

Pagination.propTypes = {
	/** 数据总数 */
	total: PropTypes.number,
	/** 默认的每页条数 */
	defaultPageSize: PropTypes.number,
	/** 可显示的 item 数 */
	showPageItemAmount: PropTypes.number,
	/** 当前页数 */
	currentPage: PropTypes.number,
	/** 大小 */
	size: PropTypes.oneOf(["small", "medium", "large"]),
	/** 分隔符 */
	separator: PropTypes.string,
	/** simple 模式 */
	simple: PropTypes.bool,
	/** 回调函数 */
	callback: PropTypes.func
};

Pagination.defaultProps = {
	defaultPageSize: 10,
	showPageItemAmount: 11,
	currentPage: 1,
	size: "medium",
	separator: "...",
	simple: false,
	total: 500,
	callback: () => {
	}
};

export default Pagination;
