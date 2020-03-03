import React from "react";
import MqPagination from "../../components/pagination";

const pagination = () => (
	<div>
		<h2>basic usage</h2>
		<MqPagination/>
		<h2>support callback</h2>
		<MqPagination callback={(currentPage) => {
			console.log(currentPage);
		}} total={100}/>
		<h2>simple mode</h2>
		<MqPagination callback={(currentPage) => {
			console.log(currentPage);
		}} simple={true} total={100}/>
		<h2>size</h2>
		<MqPagination callback={(currentPage) => {
			console.log(currentPage);
		}} size={"small"} total={100}/>
		<MqPagination callback={(currentPage) => {
			console.log(currentPage);
		}} size={"medium"} total={100}/>
		<MqPagination callback={(currentPage) => {
			console.log(currentPage);
		}} size={"large"} total={100}/>
	</div>
);

export default pagination;
