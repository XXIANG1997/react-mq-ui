import { storiesOf } from "@storybook/react";
import breadcrumb from "./code/breadcrumb";
import pagination from "./code/pagination";

storiesOf("导航", module).add("breadcrumb 面包屑", breadcrumb).add("pagination 分页器", pagination);
