import styled from "@emotion/styled";
import { WithMainContainerStylesPropsType } from "types/layout/container";

const WithMainContainerStyles = styled("span")<WithMainContainerStylesPropsType>`
    transition: 0.15s;

    .sections-container {
        display: flex;
        height: 100vh;
        min-height: 100vh;
        max-height: 100vh;
        transition: 0.15s;

        .aside-section {
            background-color: ${({ theme }) => theme.palette.secondary.main};
            width: ${({ layoutState }) => layoutState.asideWidth};
            height: ${({ layoutState }) => layoutState.asideHeight};
            transition: 0.15s;
            overflow: hidden;
            border-top-right-radius: 45px;

            .links-container {
                /* background-color: pink; */
                height: calc(100vh - 200px);
                margin-top: 40px;
                overflow-y: scroll;

                &::-webkit-scrollbar {
                    width: 0px;
                    height: 0px;
                }

                &::-webkit-scrollbar-thumb {
                    width: 0px;
                    height: 0px;
                    min-height: 40px;
                    max-height: 40px;
                }

                &:hover::-webkit-scrollbar-thumb {
                    background-color: ${({ theme }) => theme.palette.secondary.dark};
                }
            }
        }

        .header-main-footer-section {
            display: flex;
            flex-direction: column;
            transition: 0.15s;

            .header-section {
                padding-left: 12.5px;
                width: ${({ layoutState }) => `calc(${layoutState.headerWidth} - 12.5px)`};
                height: ${({ layoutState }) => layoutState.headerHeight};
                margin-top: 0;
                transition: 0.15s;
                overflow: hidden;
            }

            .main-section {
                position: relative;
                min-width: ${({ layoutState }) => `calc(${layoutState.mainSideWidth} - 25px)`};
                min-height: ${({ layoutState }) => layoutState.mainSideHeight};
                max-width: ${({ layoutState }) => `calc(${layoutState.mainSideWidth} - 25px)`};
                max-height: ${({ layoutState }) => layoutState.mainSideHeight};
                transition: 0.15s;
                flex-direction: column;
                padding: 0px 0px 0px 25px;

                .main-wrapper {
                    position: relative;
                    background-color: ${({ theme }) =>
                        theme.palette.mode === "dark"
                            ? theme.palette.common.black
                            : theme.palette.common.white};
                    min-width: ${({ layoutState }) =>
                        `calc(${layoutState.mainSideWidth} - 50px - 50px)`};
                    min-height: ${({ layoutState }) =>
                        `calc(${layoutState.mainSideHeight} - 25px - 8px)`};
                    max-width: ${({ layoutState }) =>
                        `calc(${layoutState.mainSideWidth} - 50px - 50px)`};
                    max-height: ${({ layoutState }) =>
                        `calc(${layoutState.mainSideHeight} - 25px - 8px)`};
                    overflow-y: scroll;
                    transition: 0.15s;
                    border-radius: 8px;
                    padding: 8px 25px;
                    border: 1px solid #b4e4ff;

                    &::-webkit-scrollbar {
                        width: 8px;
                        height: 8px;
                    }

                    &::-webkit-scrollbar-thumb {
                        background-color: ${({ theme }) => theme.palette.action.active};
                        width: 8px;
                        height: 8px;
                        min-height: 40px;
                        max-height: 40px;
                    }

                    &::-webkit-scrollbar-thumb:hover {
                        background-color: ${({ theme }) => theme.palette.action.disabled};
                    }
                }
            }

            .footer-section {
                background-color: ${({ theme }) => `${theme.palette.secondary.main}55`};
                // 12.5 is for action btns width 25px
                padding-left: 12.5px;
                width: ${({ layoutState }) => `calc(${layoutState.footerWidth} - 12.5px)`};
                height: ${({ layoutState }) => layoutState.footerHeight};
                transition: 0.15s;
                overflow: hidden;
            }
        }
    }
`;

export default WithMainContainerStyles;
