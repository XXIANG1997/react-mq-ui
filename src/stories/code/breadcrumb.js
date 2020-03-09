import React from "react";
import { MqBreadcrumb, MqBreadcrumbItem } from "../../components/breadcrumb";
import { HashRouter } from "react-router-dom";

const breadcrumb = () => (<div>
	<HashRouter>
		<h2>basic usage</h2>
		<MqBreadcrumb>
			<MqBreadcrumbItem to={"test"}>Documentation</MqBreadcrumbItem>
			<MqBreadcrumbItem>
				<a href="https://www.baidu.com" target={"_blank"}>Components</a>
			</MqBreadcrumbItem>
			<MqBreadcrumbItem>
				Breadcrumb
			</MqBreadcrumbItem>
		</MqBreadcrumb>
		<h2>default active</h2>
		<MqBreadcrumb>
			<MqBreadcrumbItem>Documentation</MqBreadcrumbItem>
			<MqBreadcrumbItem>Components</MqBreadcrumbItem>
			<MqBreadcrumbItem active={true}>Breadcrumb</MqBreadcrumbItem>
		</MqBreadcrumb>
		<h2>support icon</h2>
		<MqBreadcrumb>
			<MqBreadcrumbItem icon={"home"}>Home</MqBreadcrumbItem>
			<MqBreadcrumbItem icon={"tag"}>Tag</MqBreadcrumbItem>
			<MqBreadcrumbItem>Breadcrumb</MqBreadcrumbItem>
		</MqBreadcrumb>
		<h2>support separator</h2>
		<MqBreadcrumb separator={">"}>
			<MqBreadcrumbItem icon={"home"}>Home</MqBreadcrumbItem>
			<MqBreadcrumbItem icon={"tag"}>Tag</MqBreadcrumbItem>
			<MqBreadcrumbItem>Breadcrumb</MqBreadcrumbItem>
		</MqBreadcrumb>
		<h2>support router</h2>
		<MqBreadcrumb separator={">"}>
			<MqBreadcrumbItem icon={"home"} to={"/home"}>go to home</MqBreadcrumbItem>
			<MqBreadcrumbItem icon={"tag"} to={"/me"}>go to me</MqBreadcrumbItem>
			<MqBreadcrumbItem>go to breadcrumb</MqBreadcrumbItem>
		</MqBreadcrumb>
		<h2>size</h2>
		<MqBreadcrumb separator={">"} size={"small"}>
			<MqBreadcrumbItem icon={"home"} to={"/home"}>Home</MqBreadcrumbItem>
			<MqBreadcrumbItem icon={"tag"} to={"/me"}>Tag</MqBreadcrumbItem>
			<MqBreadcrumbItem>Breadcrumb</MqBreadcrumbItem>
		</MqBreadcrumb>
		<MqBreadcrumb separator={">"} size={"medium"}>
			<MqBreadcrumbItem icon={"home"} to={"/home"}>Home</MqBreadcrumbItem>
			<MqBreadcrumbItem icon={"tag"} to={"/me"}>Tag</MqBreadcrumbItem>
			<MqBreadcrumbItem>Breadcrumb</MqBreadcrumbItem>
		</MqBreadcrumb>
		<MqBreadcrumb separator={">"} size={"large"}>
			<MqBreadcrumbItem icon={"home"} to={"/home"}>Home</MqBreadcrumbItem>
			<MqBreadcrumbItem icon={"tag"} to={"/me"}>Tag</MqBreadcrumbItem>
			<MqBreadcrumbItem>Breadcrumb</MqBreadcrumbItem>
		</MqBreadcrumb>
	</HashRouter>
</div>);

export default breadcrumb;
