import { createSlice } from "@reduxjs/toolkit";
import { AsideStatusTypes, ReduxLayoutStateType } from "types/layout/container";

// JUST CHAGE THESE VARIABLES - BOTTOM
const openedAsideWidth: string = "250px";
const closedAsideWidth: string = "70px";
export const openedHeaderHeight: string = "90px";
export const openedFooterHeight: string = "50px";

const asideStatus: AsideStatusTypes = localStorage.getItem("asideStatus") || "open";

const isHiddenHeader: boolean =
    localStorage.getItem("isHiddenHeader") === "true"
        ? true
        : localStorage.getItem("isHiddenHeader") === "false"
          ? false
          : false;
const isHiddenFooter: boolean =
    localStorage.getItem("isHiddenFooter") === "true"
        ? true
        : localStorage.getItem("isHiddenFooter") === "false"
          ? false
          : false;
// JUST CHAGE THESE VARIABLES - TOP

const asideWidth: string =
    asideStatus === "open" ? openedAsideWidth : asideStatus === "close" ? closedAsideWidth : "0px";
const asideHeight: string = "calc(100vh - 0px)";
const headerWidth: string = `calc(100vw - 0px - ${asideWidth})`;
const headerHeight: string = isHiddenHeader ? "0px" : openedHeaderHeight;
const footerHeight: string = isHiddenFooter ? "0px" : openedFooterHeight;
const mainSideHeight: string = `calc(100vh - 0px - ${headerHeight} - ${footerHeight})`;

const initState: ReduxLayoutStateType = {
    asideStatus,
    isHiddenHeader,
    isHiddenFooter,
    asideWidth,
    asideHeight,
    headerWidth,
    headerHeight,
    footerWidth: headerWidth,
    footerHeight,
    mainSideWidth: headerWidth,
    mainSideHeight
};

export const layout = createSlice({
    name: "layout",
    initialState: initState,
    reducers: {
        openAside: (state: ReduxLayoutStateType): void => {
            state.asideStatus = "open";

            state.asideWidth = openedAsideWidth;
            state.headerWidth = `calc(100vw - 0px - ${state.asideWidth})`;
            state.footerWidth = `calc(100vw - 0px - ${state.asideWidth})`;
            state.mainSideWidth = `calc(100vw - 0px - ${state.asideWidth})`;
        },
        closeAside: (state: ReduxLayoutStateType): void => {
            state.asideStatus = "close";

            state.asideWidth = closedAsideWidth;
            state.headerWidth = `calc(100vw - 0px - ${state.asideWidth})`;
            state.footerWidth = `calc(100vw - 0px - ${state.asideWidth})`;
            state.mainSideWidth = `calc(100vw - 0px - ${state.asideWidth})`;
        },
        minimizeAside: (state: ReduxLayoutStateType): void => {
            state.asideStatus = "minimize";

            state.asideWidth = "0px";
            state.headerWidth = "calc(100vw - 0px)";
            state.footerWidth = "calc(100vw - 0px)";
            state.mainSideWidth = "calc(100vw - 0px)";
        },
        openHeader: (state: ReduxLayoutStateType): void => {
            state.isHiddenHeader = false;

            state.headerHeight = openedHeaderHeight;
            state.mainSideHeight = `calc(100vh - 0px - ${state.headerHeight} - ${state.footerHeight})`;
        },
        closeHeader: (state: ReduxLayoutStateType): void => {
            state.isHiddenHeader = true;

            state.headerHeight = "0px";
            state.mainSideHeight = `calc(100vh - 0px - ${state.footerHeight})`;
        },
        openFooter: (state: ReduxLayoutStateType): void => {
            state.isHiddenFooter = false;

            state.footerHeight = openedFooterHeight;
            state.mainSideHeight = `calc(100vh - 0px - ${state.headerHeight} - ${state.footerHeight})`;
        },
        closeFooter: (state: ReduxLayoutStateType): void => {
            state.isHiddenFooter = true;

            state.footerHeight = "0px";
            state.mainSideHeight = `calc(100vh - 0px - ${state.headerHeight})`;
        }
    }
});

export const {
    openAside,
    closeAside,
    minimizeAside,
    openHeader,
    closeHeader,
    openFooter,
    closeFooter
} = layout.actions;
export default layout.reducer;
