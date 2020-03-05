import { storiesOf } from "@storybook/react";
import breadcrumb from "./code/breadcrumb";
import pagination from "./code/pagination";
import dropdown from "./code/dropdown";
import Affix from "./code/affix";

storiesOf("导航", module)
	.add("breadcrumb 面包屑", breadcrumb)
	.add("pagination 分页器", pagination)
	.add("dropdown 下拉菜单", dropdown)
	.add("affix 固钉", Affix);
