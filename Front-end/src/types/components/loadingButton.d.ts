import { ButtonOwnProps } from "@mui/material";

export interface LoadingButtonPropsType {
    label: string;
    variant?: "text" | "outlined" | "contained" | undefined;
    color?: ButtonOwnProps.color;
    fullWidth?: boolean;
    isLoading: boolean;
    type?: "button" | "submit" | "reset" | undefined;
    onClick?: () => void;
}
