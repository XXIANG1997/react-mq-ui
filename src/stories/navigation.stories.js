import React from "react";
import { storiesOf } from "@storybook/react";
import breadcrumb from "./code/breadcrumb";
import Pagination from "./code/pagination";
import dropdown from "./code/dropdown";
import Affix from "./code/affix";
import Steps from "./code/steps";

storiesOf("导航", module)
	.add("breadcrumb 面包屑", breadcrumb)
	.add("pagination 分页器", Pagination)
	.add("dropdown 下拉菜单", dropdown)
	.add("affix 固钉", Affix)
	.add("steps 步骤条", () => <Steps/>);
