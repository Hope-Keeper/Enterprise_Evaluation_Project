import React, { ReactNode } from "react";

export interface OutlineButtonPropsType {
    label?: string;
    color?: string;
    children?: React.ReactNode;
    onClick: () => void;
}

export interface PayaButtonWithIconPropsType {
    label?: string;
    color?: string;
    variant?: "outlined" | "text" | "contained";
    children?: ReactNode;
    onClick?: () => void;
    hoverIcon: ReactNode;
    defaultIcon: ReactNode;
    iconGravity: "start" | "end";
    type?: "button" | "reset" | "submit" | undefined;
}
