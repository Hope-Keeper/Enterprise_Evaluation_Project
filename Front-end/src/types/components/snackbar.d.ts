export interface SnackbarPropsType {
    message?: string;
    variant?: "default" | "error" | "success" | "warning" | "info" | undefined;
    autoHideDuration: number;
    verticalAnchorOrigin?: "bottom" | "top";
    horizontalAnchorOrigin?: "center" | "left" | "right";
}
