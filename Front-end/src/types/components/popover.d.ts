export interface PopoverPropsType {
    handleClose: () => void;
    anchor: HTMLButtonElement | null;
    message: string;
    verticalAnchorOrigin?: number | "bottom" | "center" | "top";
    horizontalAnchorOrigin?: number | "center" | "left" | "right";
}
