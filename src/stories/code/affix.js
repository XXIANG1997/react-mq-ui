import React from "react";
import MqAffix from "../../components/affix";
import { MqButton } from "../../components/button";

const Affix = () => (
	<div>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<h2>setting offset（top ）</h2>
		<MqAffix topOffset={0}>
			<MqButton>affix 固钉组件（top = 0）</MqButton>
		</MqAffix>
		<MqAffix topOffset={10}>
			<MqButton>affix 固钉组件（top = 10）</MqButton>
		</MqAffix>
		<MqAffix topOffset={20}>
			<MqButton>affix 固钉组件（top = 20）</MqButton>
		</MqAffix>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<h2>trigger callback</h2>
		<MqAffix topOffset={200} callback={(type) => console.log(type)}>
			<MqButton>在（top = 200）处触发回调</MqButton>
		</MqAffix>
		<MqAffix bottomOffset={150} callback={(type) => console.log(type)}>
			<MqButton>在（bottom = 150）处触发回调</MqButton>
		</MqAffix>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<h2>setting offset（bottom）</h2>
		<MqAffix bottomOffset={0}>
			<MqButton>affix 固钉组件（bottom = 0）</MqButton>
		</MqAffix>
		<MqAffix bottomOffset={10}>
			<MqButton>affix 固钉组件（bottom = 10）</MqButton>
		</MqAffix>
		<MqAffix bottomOffset={20}>
			<MqButton>affix 固钉组件（bottom = 20）</MqButton>
		</MqAffix>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
	</div>
);

export default Affix;
