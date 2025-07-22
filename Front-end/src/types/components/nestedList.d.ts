import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Key } from "react";

export interface NestedListPropsType {
    id?: Key;
    link: string;
    title: string;
    icon: OverridableComponent<SvgIconTypeMap<object, "svg">>;
    level?: number | undefined;
    children?: NestedListPropsType[];
    userHasAccess: boolean;
}
