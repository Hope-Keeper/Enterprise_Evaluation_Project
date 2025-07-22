import AlertColor from "@mui/material/AlertColor";

export interface AlertPropsType {
    message: string;
    title?: string;
    severity: AlertColor;
    variant?: "standard" | "filled" | "outlined";
    handleClose: () => void;
}
