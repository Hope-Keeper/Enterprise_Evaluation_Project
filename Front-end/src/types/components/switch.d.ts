import { ChangeEvent } from "react";

export interface SwitchPropsType {
    checked?: boolean;
    size?: "small" | "medium";
    color?: "primary" | "secondary" | "error" | "info" | "success" | "warning" | "default";
    onChange?: (_event: ChangeEvent<HTMLInputElement>, newChecked: boolean) => void;
}
