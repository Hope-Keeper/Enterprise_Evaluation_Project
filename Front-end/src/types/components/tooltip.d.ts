import { TooltipProps } from "@mui/material";
import { ReactElement } from "react";

export interface TooltipPropsType {
    component: ReactElement;
    title: string;
    placement?: TooltipProps.placement;
}
