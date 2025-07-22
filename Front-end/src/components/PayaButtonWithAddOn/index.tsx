import SvgIcon from "@mui/material/SvgIcon";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";
import React, { AriaRole, ReactNode, useState } from "react";

import { DownIcon } from "@share/icons/DownIcon";
import PayaMenu from "components/PayaMenu";
import { MenuItemType } from "types/components/menu";

export interface PayaButtonWithAddOnPropsType {
    label?: string;
    color?: string;
    children?: ReactNode;
    onClick?: () => void;
    fullWidth?: boolean;
    defaultIcon?: ReactNode;
    iconGravity?: "start" | "end";
    type?: "button" | "reset" | "submit" | undefined;
    role?: AriaRole | undefined;
    component?: React.ElementType;
    options: MenuItemType[];
}

function PayaButtonWithAddOn(props: PayaButtonWithAddOnPropsType) {
    const { label, type, fullWidth, role, children, component, options } = props;

    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    let componentProps = {};

    if (typeof component != "undefined") {
        componentProps = {
            component: component
        };
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                fullWidth={fullWidth}
                role={role}
                variant="outlined"
                type={type}
                sx={{
                    border: "solid 2px #C5C7CD",
                    boxShadow: "0px 0px 0px",
                    color: theme.palette.common.black,
                    fontWeight: "400",
                    borderRadius: "4px",
                    paddingRight: "0px",
                    paddingLeft: "14px",
                    height: "40px",
                    justifyContent: "space-between",
                    ":hover": {
                        border: "solid 2px #C5C7CD",
                        fontWeight: "600"
                    }
                }}
                onClick={(e) => {
                    setAnchorEl(e.currentTarget);
                }}
                endIcon={
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#C5C7CD",
                            boxShadow: "0px 0px 0px",
                            fontWeight: "400",
                            borderRadius: "4px",
                            padding: "0px",
                            minWidth: "40px",
                            height: "40px",
                            ":hover": {
                                backgroundColor: "rgba(255, 211, 101, 0.85)",
                                boxShadow: "0px 0px 0px",
                                fontWeight: "600"
                            }
                        }}
                        onClick={(e) => {
                            setAnchorEl(e.currentTarget);
                        }}>
                        <SvgIcon
                            component={DownIcon}
                            style={{
                                fontSize: "16px"
                            }}
                        />
                    </Button>
                }
                {...componentProps}>
                {label}
                {children}
            </Button>
            <PayaMenu handleClose={handleClose} anchorEl={anchorEl} options={options} />
        </>
    );
}

export default PayaButtonWithAddOn;
