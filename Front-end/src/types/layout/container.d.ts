import React from "react";

export type AsideStatusTypes = "open" | "close" | "minimize" | string;

export interface ReduxLayoutStateType {
    asideStatus: AsideStatusTypes;
    isHiddenHeader: boolean;
    isHiddenFooter: boolean;
    asideWidth: string;
    asideHeight: string;
    headerWidth: string;
    headerHeight: string;
    footerWidth: string;
    footerHeight: string;
    mainSideWidth: string;
    mainSideHeight: string;
}

export interface WithMainContainerStylesPropsType {
    layoutState: ReduxLayoutStateType;
}

export interface RouteCreatorPropsType {
    userHasAccess: boolean;
    path: string;
    component: React.ReactElement;
}
