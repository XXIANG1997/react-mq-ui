import React from "react";

import MqSteps from "../../components/steps";
import MqPagination from "../../components/pagination";

class Steps extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			current1: 1,
			current2: 1
		};
	}

	render() {
		return <div>
			<h2>basic usage</h2>
			<MqSteps size={"small"} showLoading={false}>
				<MqSteps.Item text={"第一步"} description={"从前明月光"}/>
				<MqSteps.Item text={"第二步"} description={"疑是地上霜"}/>
				<MqSteps.Item text={"第三步"} description={"举头望明月"}/>
				<MqSteps.Item text={"第四步"} description={"低头思故乡"}/>
			</MqSteps>
			<h2>support loading</h2>
			<MqSteps current={2} size={"small"} showLoading={true}>
				<MqSteps.Item text={"第一步"} description={"从前明月光"}/>
				<MqSteps.Item text={"第二步"} description={"疑是地上霜"}/>
				<MqSteps.Item text={"第三步"} description={"举头望明月"}/>
				<MqSteps.Item text={"第四步"} description={"低头思故乡"}/>
			</MqSteps>
			<h2>dynamic change</h2>
			<MqSteps current={this.state.current1} size={"small"} showLoading={true}>
				<MqSteps.Item text={"第一步"} description={"从前明月光"}/>
				<MqSteps.Item text={"第二步"} description={"疑是地上霜"}/>
				<MqSteps.Item text={"第三步"} description={"举头望明月"}/>
				<MqSteps.Item text={"第四步"} description={"低头思故乡"}/>
			</MqSteps>
			<MqPagination simple={true} size={"small"} callback={(a) => {
				this.setState({
					current1: a
				});
			}} total={4} defaultPageSize={1}/>
			<h2>with content</h2>
			<MqSteps current={this.state.current2} size={"small"} showLoading={true}>
				<MqSteps.Item text={"第一步"} description={"从前明月光"}>one</MqSteps.Item>
				<MqSteps.Item text={"第二步"} description={"疑是地上霜"}>two</MqSteps.Item>
				<MqSteps.Item text={"第三步"} description={"举头望明月"}>three</MqSteps.Item>
				<MqSteps.Item text={"第四步"} description={"低头思故乡"}>four</MqSteps.Item>
			</MqSteps>
			<MqPagination simple={true} size={"small"} callback={(a) => {
				this.setState({
					current2: a
				});
			}} total={4} defaultPageSize={1}/>
			<h2>size</h2>
			<MqSteps size={"small"} showLoading={false}>
				<MqSteps.Item text={"第一步"} description={"从前明月光"}/>
				<MqSteps.Item text={"第二步"} description={"疑是地上霜"}/>
				<MqSteps.Item text={"第三步"} description={"举头望明月"}/>
				<MqSteps.Item text={"第四步"} description={"低头思故乡"}/>
			</MqSteps>
			<MqSteps size={"medium"} showLoading={false}>
				<MqSteps.Item text={"第一步"} description={"从前明月光"}/>
				<MqSteps.Item text={"第二步"} description={"疑是地上霜"}/>
				<MqSteps.Item text={"第三步"} description={"举头望明月"}/>
				<MqSteps.Item text={"第四步"} description={"低头思故乡"}/>
			</MqSteps>
			<MqSteps size={"large"} showLoading={false}>
				<MqSteps.Item text={"第一步"} description={"从前明月光"}/>
				<MqSteps.Item text={"第二步"} description={"疑是地上霜"}/>
				<MqSteps.Item text={"第三步"} description={"举头望明月"}/>
				<MqSteps.Item text={"第四步"} description={"低头思故乡"}/>
			</MqSteps>
		</div>;
	}
}

export default Steps;

