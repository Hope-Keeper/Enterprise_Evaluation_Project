// // export Mui light theme object from here
// import { createTheme, ThemeOptions } from "@mui/material/styles";

// export const lightTheme = createTheme({
//     direction: "rtl",
//     palette: {
//         mode: "light",
//         primary: {
//             main: "#FFC432"
//         },
//         secondary: {
//             main: "#B4E4FF",
//             dark: "#95BDFF"
//         },
//         background: {
//             default: "#F0F9F9",
//             paper: "#EFFBFF"
//         },
//         text: {
//             primary: "#0e185f"
//         },
//         divider: "#0E185F",
//         common: {
//             black: "#0E185F"
//         }
//     },
//     typography: {
//         allVariants: {
//             fontFamily: "YekanBakh"
//         }
//     },
//     components: {
//         MuiTextField: {
//             defaultProps: {
//                 // fullWidth: true,
//             }
//         },
//         MuiButton: {
//             styleOverrides: {
//                 outlined: {
//                     color: "#005C78"
//                 }
//             }
//         },
//         MuiTableHead: {
//             styleOverrides: {}
//         },
//         MuiTableRow: {
//             styleOverrides: {
//                 // root: {
//                 //     ":hover": { backgroundColor: "#FFC55A33 !important", transition: "0.25s" },
//                 //     backgroundColor: "#EFFBFF",
//                 //     ":checked": { backgroundColor: "black !important", transition: "0.25s" }
//                 // },
//                 selected: { backgroundColor: "#00FF00 !important" }
//             }
//         }
//     }
// } as ThemeOptions);
// export Mui light theme object from here
import { alpha, ButtonProps } from "@mui/material";
import { createTheme, PaletteOptions, Theme, ThemeOptions } from "@mui/material/styles";
const createColor = (mainColor: string) => {
    const theme = createTheme();
    return theme.palette.augmentColor({ color: { main: mainColor } });
};
const commonBlack = "#0E185F";

const baseTheme = createTheme({
    direction: "rtl",
    palette: {
        mode: "light",
        primary: {
            dark: "#F39D00",
            main: "#FFC55A"
        },
        error: { main: "#B8001F" },
        secondary: {
            light: "#EFFBFF",
            main: "#B4E4FF",
            dark: "#95BDFF"
        },
        background: {
            default: "#F0F9F9",
            paper: "#F0F9F9"
        },
        text: {
            primary: "#0e185f"
        },
        divider: "#A0DBDB",
        common: {
            black: "#0E185F",
            white: "#FBFCF8"
        },
        info: {
            main: "#4D96FF"
        },
        success: {
            dark: "#48D18C",
            light: "#E9F9F1",
            main: "#48D18C"
        },

        acceptedTagColor: createColor("#36AE7C"),
        canceledTagColor: createColor("#C5C7CD"),
        closedTagColor: createColor("#4D96FF"),
        rejectedTagColor: createColor("#B8001F"),
        underReviewTagColor: createColor("#FFD365"),

        dialogTitleBgColor: createColor("#B4E4FF")
    } as PaletteOptions,
    typography: {
        allVariants: {
            fontFamily: "YekanBakh !important",
            fontSize: "14px",
            fontWeight: "400"
        }
    }
} as ThemeOptions);

const lightTheme: Theme = createTheme(baseTheme, {
    components: {
        MuiTextField: {
            defaultProps: {
                fullWidth: true,
                size: "small"
            },
            styleOverrides: {
                root: {
                    "& .MuiInputBase-root": {
                        // height: "40px"
                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: commonBlack
                    }
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    "&.Mui-focused": {
                        color: commonBlack
                    }
                }
            }
        },

        // MuiOutlinedInput: {
        //     styleOverrides: {
        //         notchedOutline: {
        //             borderColor: "#0e185f80"
        //         }
        //     }
        // },

        // MuiButton: {
        //     styleOverrides: {
        //         containedPrimary: {
        //             // border: `2px solid  ${baseTheme.palette.primary.main}`,
        //             minWidth: "0px",
        //             padding: "10px",
        //             color: baseTheme.palette.common.black,
        //             fontWeight: "400",
        //             borderRadius: "8px"
        //             // borderWidth: "2px"
        //         },
        //         outlinedPrimary: {
        //             minWidth: "0px",
        //             padding: "10px",
        //             border: `2px solid  ${baseTheme.palette.primary.main}`,
        //             color: baseTheme.palette.common.black,
        //             fontWeight: "400",
        //             borderRadius: "8px",
        //             borderWidth: "2px",
        //             ":hover": {
        //                 border: `2px solid ${baseTheme.palette.primary.main}`
        //             }
        //         },
        //         outlinedError: {
        //             minWidth: "0px",
        //             padding: "10px",
        //             border: `2px solid  ${baseTheme.palette.error.main}`,
        //             borderWidth: "2px",
        //             fontWeight: "400",
        //             borderRadius: "8px",
        //             ":hover": {
        //                 border: `2px solid ${baseTheme.palette.error.main}`
        //             }
        //         },
        //         outlinedSuccess: {
        //             minWidth: "0px",
        //             padding: "10px",
        //             border: `2px solid  ${baseTheme.palette.success.main}`,
        //             borderWidth: "2px",
        //             fontWeight: "400",
        //             borderRadius: "8px",
        //             ":hover": {
        //                 border: `2px solid ${baseTheme.palette.error.main}`
        //             }
        //         },
        //         containedSecondary: {
        //             backgroundColor: baseTheme.palette.secondary.main,
        //             //border: "solid 2px rgba(255, 196, 50, 1)",
        //             // border: "1px solid  rgba(255, 196, 50, 1)",
        //             boxShadow: "0px 0px 0px",
        //             fontWeight: "400",
        //             fontSize: "16sp",
        //             ":hover": {
        //                 backgroundColor: baseTheme.palette.primary.main,
        //                 boxShadow: "0px 0px 0px",
        //                 fontWeight: "600"
        //             }
        //         },
        //         outlinedInfo: {
        //             border: "1px solid  rgba(14, 24, 95, 1)",
        //             boxShadow: "0px 0px 0px",
        //             color: "rgba(14, 24, 95, 1)",
        //             fontWeight: "400",
        //             fontSize: "16sp",
        //             borderRadius: "8px",
        //             ":hover": {
        //                 border: "solid 2px rgba(14, 24, 95, 1)",
        //                 fontWeight: "600"
        //             }
        //         }
        //     }
        // },
        MuiIconButton: {
            defaultProps: {
                // fullWidth: true,
                size: "small"
                // width: "386px"
            }
        },
        MuiButton: {
            defaultProps: {
                // fullWidth: true,
                size: "small"

                // width: "386px"
            },
            styleOverrides: {
                root: {
                    boxShadow: "none",
                    minWidth: "40px",
                    "&:hover": {
                        boxShadow: "none"
                    }
                },
                sizeMedium: {
                    height: "40px",
                    fontSize: "14px",
                    borderRadius: "4px"
                },
                sizeSmall: {
                    height: "30px",
                    fontSize: "14px",
                    borderRadius: "4px"
                },
                outlined: ({ theme, ownerState }: { theme: Theme; ownerState: ButtonProps }) => {
                    const colorKey = ownerState.color as keyof typeof theme.palette;
                    const color = colorKey && theme.palette[colorKey];

                    const borderColor =
                        color && typeof color === "object" && "main" in color
                            ? color.main
                            : theme.palette.primary.main;

                    return {
                        borderWidth: "2px",
                        borderColor: borderColor,
                        color: commonBlack,
                        "&:hover": {
                            borderWidth: "2px"
                        }
                    };
                }
            }
        },
        MuiTable: {
            styleOverrides: {
                root: {
                    "& .MuiTableCell-head": {
                        textAlign: "center",
                        // padding: "10.2px",
                        color: baseTheme.palette.common.black,
                        backgroundColor: baseTheme.palette.secondary.main
                    }
                }
            }
        },
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    borderSpacing: "0",
                    borderTop: "1px solid #0E091A",
                    borderLeft: "1px solid #0E091A",
                    borderRight: "1px solid #0E091A !important",
                    boxShadow: "0px 0px 0px",
                    borderRadius: "4px 4px 0px 0px"
                }
            }
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    backgroundColor: "#F8FDFF",
                    transition: "0.15s",
                    "&.Mui-selected": {
                        backgroundColor: "#95BDFF !important",
                        "&:hover": {
                            backgroundColor: "#95BDFF !important"
                        }
                    },
                    ":hover": { backgroundColor: "#95bdff66 !important", transition: "0.25s" }
                }
            },
            variants: [
                {
                    props: { variant: "border" },
                    style: {
                        borderRadius: "8px !important",
                        marginBottom: "4px !important",
                        border: "solid 1px " + baseTheme.palette.secondary.main + " !important",
                        backgroundColor: "#8BB6DC"
                    }
                }
            ]
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: `${baseTheme.palette.info.main} !important`
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    borderBottom: "1px solid rgba(14, 24, 95, 0.5)",
                    justifyContent: "center",
                    fontWeight: "600",
                    padding: "5.5px 16px"
                },
                body: {
                    borderBottom: "1px solid rgba(14, 24, 95, 0.5)",
                    justifyContent: "center",
                    fontWeight: "400",
                    padding: "0.5px 16px",

                    minHeight: 38
                },
                footer: {
                    borderBottom: "1px solid rgba(14, 24, 95, 0.5)",
                    justifyContent: "center"
                }
            },
            variants: [
                {
                    props: { variant: "border" },
                    style: {
                        borderTop: "solid 1px " + baseTheme.palette.secondary.main + " !important",
                        borderBottom:
                            "solid 1px " + baseTheme.palette.secondary.main + " !important"
                    }
                }
            ]
        },
        // MuiTable: {
        //     styleOverrides: {
        //         // root: {
        //         //     borderTop: "0px solid rgba(14, 24, 95, 0.5)",
        //         //     borderLeft: "1px solid rgba(14, 24, 95, 0.5)",
        //         //     boxShadow: "0px 0px 0px",
        //         //     borderRadius: "8px 8px 0px 0px"
        //         // }
        //     }
        // },
        // MuiTableContainer: {
        //     styleOverrides: {
        //         root: {
        //             // borderBottom: "1px solid rgba(14, 24, 95, 0.5)",
        //             borderRadius: "8px 8px 8px 8px"
        //         }
        //     }
        // },
        // MuiTableRow: {
        //     styleOverrides: {
        //         head: {},
        //         root: {
        //             height: 36,
        //             ":hover": { backgroundColor: "#95bdff66 !important", transition: "0.25s" },
        //             backgroundColor: "#EFFBFF",
        //             transition: "0.15s",
        //             "&.Mui-selected": {
        //                 backgroundColor: "#95BDFF !important",
        //                 "&:hover": {
        //                     backgroundColor: "#95BDFF !important"
        //                 }
        //             }
        //         }
        //     }
        // },
        // MuiTableHead: {
        //     styleOverrides: {
        //         root: {
        //             borderTop: "1px solid rgba(14, 24, 95, 0.5)",
        //             borderTopRightRadius: 8,

        //             borderTopLeftRadius: 8,

        //             backgroundColor: `${baseTheme.palette.info.main} !important`,
        //             fontWeight: "900 !important"
        //         }
        //     }
        // },
        // MuiTableCell: {
        //     styleOverrides: {
        //         head: {
        //             //borderTop: "1px solid rgba(14, 24, 95, 0.5)",
        //             borderBottom: "1px solid rgba(14, 24, 95, 0.5)",
        //             backgroundColor: "#B4E4FF",
        //             justifyContent: "center",
        //             fontWeight: "600",
        //             fontSize: "14px",
        //             textAlign: "center",
        //             lineHeight: "21.7px",
        //             color: `${baseTheme.palette.common.black} !important`
        //         },
        //         body: {
        //             borderBottom: "1px solid rgba(14, 24, 95)",
        //             padding: "0px",
        //             minHeight: "36px",
        //             justifyContent: "center",
        //             fontWeight: "400",
        //             // "&:nth-last-of-type(1)": {
        //             //     minWidth: 120
        //             // },
        //             "&:nth-last-of-type(2)": {
        //                 minWidth: 80
        //             }
        //         },
        //         footer: {
        //             borderBottom: "1px solid rgba(14, 24, 95, 0.5)",
        //             justifyContent: "center"
        //         }
        //     }
        // },
        // MuiDialog: {
        //     styleOverrides: {
        //         paper: {
        //             borderRadius: "8px",
        //             backgroundColor: baseTheme.palette.common.white
        //         }
        //     }
        // },
        // Muidialogtitle: {
        //     styleOverrides: {
        //         root: {
        //             backgroundColor: baseTheme.palette.secondary.main,
        //             border: "solid 1px #A0DBDB",
        //             padding: "0px",
        //             fontSize: "16px",
        //             fontWeight: "600",
        //             textAlign: "center"
        //         }
        //     }
        // },
        // MuiDialogContent: {
        //     styleOverrides: {
        //         root: { marginTop: "0px" }
        //     }
        // },
        MuiPaginationItem: {
            styleOverrides: {
                //root: { border: "1px solid rgba(14, 24, 95, 0.5)" },
                root: { border: "0.5px solid #9095A3" },
                ellipsis: { border: "none" }
            }
        },
        MuiSwitch: {
            styleOverrides: {
                track: {
                    backgroundColor: baseTheme.palette.primary.main,
                    "&: checked": { backgroundColor: baseTheme.palette.error.main }
                }
            }
        },
        MuiFormControlLabel: {
            styleOverrides: {
                root: { margin: "0px" }
            }
        },
        MuiBadge: {
            styleOverrides: {
                badge: {
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%,-50%)",
                    width: "34px",
                    height: "34px",

                    borderRadius: "50%"
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: { borderColor: baseTheme.palette.secondary.dark }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: { backgroundColor: "#EFFBFF" }
            }
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    border: "1px solid #B4E4FF",
                    borderRadius: "8px !important",
                    boxShadow: "none"
                }
            }
        },
        MuiAccordionDetails: {
            styleOverrides: {
                root: { padding: "16px" }
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    minWidth: "300px",
                    minHeight: "44px",
                    height: "44px",

                    borderRadius: "50px 50px 2px 2px",
                    border: "solid 2px " + alpha(baseTheme.palette.secondary.main, 0.25),
                    "&.Mui-selected": {
                        // border: "solid 2px " + baseTheme.palette.secondary.main,
                        borderBottom: "none",
                        color: baseTheme.palette.common.black
                    }
                }
            }
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    minHeight: "44px",
                    height: "44px",
                    backgroundColor: "transparent"
                },
                indicator: {
                    height: "0px",
                    backgroundColor: baseTheme.palette.secondary.main
                }
            }
        }

        // MuiSvgIcon: {
        //     styleOverrides: {
        //         root: { width: "1rem" }
        //     }
        // }
    }
});

export default lightTheme;
// // export Mui light theme object from here
// import { ButtonProps } from "@mui/material/Button";
// import { alpha, createTheme, PaletteOptions, Theme, ThemeOptions } from "@mui/material/styles";

// const createColor = (mainColor: string) => {
//     const theme = createTheme();
//     return theme.palette.augmentColor({ color: { main: mainColor } });
// };

// export const redColor = "#FF0000";
// const commonBlack = "#0E091A";

// const baseTheme = createTheme({
//     direction: "rtl",
//     palette: {
//         mode: "light",
//         primary: {
//             main: "#B04759",
//             dark: "#662AFF"
//         },
//         secondary: {
//             light: "rgba(160, 219, 219, 0.1)",
//             main: "#F0ECE0",
//             dark: "#8BB6DC"
//         },
//         background: {
//             default: "#FCFBF8",
//             paper: "#FCFBF8"
//         },
//         text: {
//             primary: "#0F3D3E",
//             disabled: "rgba(14, 24, 95, 0.5)"
//         },
//         divider: "#8B5DFF",
//         common: {
//             black: commonBlack,
//             white: "#FFFEFC"
//         },
//         info: {
//             main: "#A0DBDB"
//         },
//         // custom colors here (ATTENTION: for use these colors in a mui component like Button, must declare in src/types/mui-theme.d.ts file)
//         acceptedTagColor: createColor("#36AE7C"),
//         canceledTagColor: createColor("#C5C7CD"),
//         closedTagColor: createColor("#4D96FF"),
//         rejectedTagColor: createColor("#B8001F"),
//         underReviewTagColor: createColor("#FFD365"),

//         dialogTitleBgColor: createColor("#FCFBF8")
//     } as PaletteOptions,
//     typography: {
//         allVariants: {
//             fontFamily: "YekanBakh !important"
//         }
//     }
// } as ThemeOptions);

// const lightTheme: Theme = createTheme(baseTheme, {
//     components: {
//         MuiTextField: {
//             defaultProps: {
//                 fullWidth: true,
//                 size: "small"
//             },
//             styleOverrides: {
//                 root: {
//                     "& .MuiInputBase-root": {
//                         // height: "40px"
//                     }
//                 }
//             }
//         },
//         MuiInputLabel: {
//             styleOverrides: {
//                 root: {
//                     "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                         borderColor: commonBlack
//                     }
//                 }
//             }
//         },
//         MuiOutlinedInput: {
//             styleOverrides: {
//                 notchedOutline: {
//                     borderColor: "#1D191980",
//                     borderRadius: "4px"
//                 },
//                 input: {
//                     // padding: "15px 14px"
//                 }
//             }
//         },
//         MuiSvgIcon: {
//             styleOverrides: {
//                 root: {
//                     // color: "#0F3D3E !important"
//                 }
//             }
//         },
//         MuiButton: {
//             styleOverrides: {
//                 root: {
//                     boxShadow: "none",
//                     "&:hover": {
//                         boxShadow: "none"
//                     }
//                 },
//                 sizeMedium: {
//                     height: "40px",
//                     fontSize: "14px",
//                     borderRadius: "4px"
//                 },
//                 sizeSmall: {
//                     height: "30px",
//                     fontSize: "13px",
//                     borderRadius: "4px"
//                 },
//                 outlined: ({ theme, ownerState }: { theme: Theme; ownerState: ButtonProps }) => {
//                     const colorKey = ownerState.color as keyof typeof theme.palette;
//                     const color = colorKey && theme.palette[colorKey];

//                     const borderColor =
//                         color && typeof color === "object" && "main" in color
//                             ? color.main
//                             : theme.palette.primary.main;

//                     return {
//                         borderWidth: "2px",
//                         borderColor: borderColor,
//                         color: commonBlack,
//                         "&:hover": {
//                             borderWidth: "2px"
//                         }
//                     };
//                 },
//                 outlinedPrimary: {
//                     borderColor: `${baseTheme.palette.primary.main}`,
//                     color: baseTheme.palette.primary.main,
//                     ":hover": {
//                         borderColor: `${baseTheme.palette.primary.dark}`,
//                         textShadow: "0px 0px 1px #0f3d3e7a"
//                     }
//                 },
//                 containedSecondary: {
//                     backgroundColor: baseTheme.palette.secondary.main,
//                     borderColor: "rgba(255, 196, 50, 1)",
//                     ":hover": {
//                         backgroundColor: baseTheme.palette.primary.main,
//                         textShadow: "0px 0px 1px rgba(255, 196, 50, 0.3)"
//                     }
//                 },
//                 containedPrimary: {
//                     backgroundColor: baseTheme.palette.primary.main,
//                     borderColor: "rgba(255, 196, 50, 1)",
//                     color: baseTheme.palette.common.white,
//                     ":hover": {
//                         backgroundColor: baseTheme.palette.primary.dark,
//                         textShadow: "0px 0px 1px rgba(255, 196, 50, 0.3)"
//                     }
//                 }
//             }
//         },
//         MuiChip: {
//             styleOverrides: {
//                 colorDefault: {
//                     backgroundColor: "#F1DBB2",
//                     borderRadius: "8px"
//                 }
//             }
//         },
//         MuiPaginationItem: {
//             styleOverrides: {
//                 root: {
//                     border: `0.5px solid ${baseTheme.palette.action.disabled}`
//                 },
//                 ellipsis: { border: "none" }
//             }
//         },
//         MuiTab: {
//             flexContainer: {
//                 backgroundColor: "#FCFBF8"
//             },
//             styleOverrides: {
//                 // indicator: {
//                 //     backgroundColor: "#FEFFFD !important"
//                 // },
//                 root: {
//                     "&.Mui-selected": {
//                         color: "#0E091A !important",
//                         fontWeight: "bold",
//                         backgroundColor: "#FEFFFD !important",
//                         borderBottom: "none !important"
//                     },
//                     border: "1px solid #F0ECE0 !important",
//                     borderTopLeftRadius: "50px !important",
//                     borderTopRightRadius: "50px !important",
//                     backgroundColor: "#E2E4E7 !important",
//                     minHeight: "40px",
//                     maxHeight: "40px",
//                     fontSize: "16px !important"
//                 }
//             }
//         },
//         MuiTable: {
//             styleOverrides: {
//                 root: {
//                     "& .MuiTableCell-head": {
//                         textAlign: "center",
//                         // padding: "10.2px",
//                         color: baseTheme.palette.common.black,
//                         backgroundColor: baseTheme.palette.secondary.main
//                     }
//                 }
//             }
//         },
//         MuiTableContainer: {
//             styleOverrides: {
//                 root: {
//                     borderSpacing: "0",
//                     borderTop: "1px solid #0E091A",
//                     borderLeft: "1px solid #0E091A",
//                     borderRight: "1px solid #0E091A",
//                     boxShadow: "0px 0px 0px",
//                     borderRadius: "4px 4px 0px 0px"
//                 }
//             }
//         },
//         MuiTableRow: {
//             styleOverrides: {
//                 root: {
//                     transition: "0.15s",
//                     "&.MuiTableRow-hover:hover": {
//                         backgroundColor: "#F8E4BF"
//                     },
//                     "&.Mui-selected": {
//                         backgroundColor: "#8BB6DC !important"
//                     }
//                 }
//             },
//             variants: [
//                 {
//                     props: { variant: "border" },
//                     style: {
//                         borderRadius: "8px !important",
//                         marginBottom: "4px !important",
//                         border: "solid 1px " + baseTheme.palette.secondary.main + " !important",
//                         backgroundColor: "#8BB6DC"
//                     }
//                 }
//             ]
//         },
//         MuiTableHead: {
//             styleOverrides: {
//                 root: {
//                     backgroundColor: `${baseTheme.palette.info.main} !important`
//                 }
//             }
//         },
//         MuiTableCell: {
//             styleOverrides: {
//                 head: {
//                     borderBottom: "1px solid rgba(14, 24, 95, 0.5)",
//                     justifyContent: "center",
//                     fontWeight: "600",
//                     padding: "5.5px 16px"
//                 },
//                 body: {
//                     borderBottom: "1px solid rgba(14, 24, 95, 0.5)",
//                     justifyContent: "center",
//                     fontWeight: "400",
//                     padding: "2.5px 16px"
//                 },
//                 footer: {
//                     borderBottom: "1px solid rgba(14, 24, 95, 0.5)",
//                     justifyContent: "center"
//                 }
//             },
//             variants: [
//                 {
//                     props: { variant: "border" },
//                     style: {
//                         borderTop: "solid 1px " + baseTheme.palette.secondary.main + " !important",
//                         borderBottom:
//                             "solid 1px " + baseTheme.palette.secondary.main + " !important"
//                     }
//                 }
//             ]
//         },
//         MuiTooltip: {
//             styleOverrides: {
//                 tooltip: {
//                     fontSize: "12px",
//                     fontFamily: "YekanBakh !important",
//                     backgroundColor: "#F1DBB2",
//                     color: "#0F3D3E"
//                 }
//             }
//         },
//         MuiDialog: {
//             styleOverrides: {
//                 paper: {
//                     borderRadius: "16px",
//                     backgroundColor: baseTheme.palette.common.white
//                 }
//             }
//         },
//         MuiDialogTitle: {
//             styleOverrides: {
//                 root: {
//                     boxShadow: "0 2px 4px 0 rgba(14, 24, 95, 0.25)",
//                     backgroundColor: baseTheme.palette.background.default,
//                     // border: "solid 1px #000000",
//                     padding: "0px",
//                     fontSize: "16px",
//                     fontWeight: "600"
//                 }
//             }
//         },
//         MuiTypography: {
//             styleOverrides: {
//                 h1: {
//                     fontSize: "18px",
//                     fontWeight: "600"
//                 },
//                 subtitle1: {
//                     fontSize: "16px",
//                     fontWeight: "600"
//                 },
//                 subtitle2: {
//                     fontSize: "16px",
//                     fontWeight: "400"
//                 },
//                 body1: {
//                     fontSize: "14px",
//                     fontWeight: "600"
//                 },
//                 body2: {
//                     fontSize: "14px",
//                     fontWeight: "400"
//                 },
//                 caption: {
//                     fontSize: "12px",
//                     fontWeight: "400",
//                     color: baseTheme.palette.common.black
//                 }
//             }
//         },
//         MuiMenu: {
//             styleOverrides: {
//                 root: {},
//                 paper: {
//                     borderRadius: "8px",
//                     boxShadow: "0px 2px 6px 0px rgba(33, 146, 255, 0.15)",
//                     border: "solid 1px " + baseTheme.palette.primary.main //+ baseTheme.palette.secondary.main
//                 },
//                 list: { paddingTop: "2px", paddingBottom: "2px" }
//             }
//         },
//         MuiMenuItem: {
//             styleOverrides: {
//                 root: {
//                     paddingRight: "8px",
//                     paddingLeft: "8px"
//                 }
//             }
//         },
//         MuiStepLabel: {
//             styleOverrides: {
//                 root: {
//                     "&.Mui-active": {
//                         color: baseTheme.palette.text.primary,
//                         fontSize: "14px",
//                         fontWeight: "400"
//                     },
//                     "&.Mui-disabled": {
//                         color: baseTheme.palette.text.disabled,
//                         fontSize: "14px",
//                         fontWeight: "400"
//                     },
//                     "&.Mui-completed": {
//                         color: baseTheme.palette.text.primary,
//                         fontSize: "14px",
//                         fontWeight: "400"
//                     }
//                 }
//             }
//         },
//         MuiCheckbox: {
//             styleOverrides: {
//                 root: {
//                     "& .MuiSvgIcon-root": {
//                         fill: baseTheme.palette.primary.main
//                     }
//                 }
//             }
//         },

//         MuiSlider: {
//             styleOverrides: {
//                 root: {
//                     "&.Mui-active": {
//                         boxShadow: "0px 0px 0px 14px " + baseTheme.palette.success.main
//                     }
//                 },
//                 thumb: {
//                     color: baseTheme.palette.primary.main
//                 },
//                 track: {
//                     color: baseTheme.palette.primary.main
//                 },
//                 rail: {
//                     color: alpha(baseTheme.palette.common.black, 0.25)
//                 }
//             }
//         },
//         MuiToggleButton: {
//             styleOverrides: {
//                 root: {
//                     color: baseTheme.palette.common.black,
//                     "&.Mui-selected": {
//                         backgroundColor: "#8B5DFF1A",
//                         color: "#662AFF"
//                         // textShadow: "0px 0px 1px #8b5dff"
//                     }
//                 }
//             }
//         },
//         MuiAccordion: {
//             styleOverrides: {
//                 root: {
//                     "&.Mui-disabled": {
//                         backgroundColor: baseTheme.palette.background.paper
//                         // color: baseTheme.palette.text.disabled
//                     },
//                     "&.MuiAccordion-root:before": {
//                         backgroundColor: "transparent"
//                     },
//                     boxShadow: "none",
//                     border: "1px solid #F0ECE0 !important"
//                 }
//             }
//         }
//     }
// });

// export default lightTheme;
