import { ReactNode } from "react";

export interface DialogPropsType {
    open: boolean;
    handleClose: () => void;
    bodyContent?: ReactNode;
}
