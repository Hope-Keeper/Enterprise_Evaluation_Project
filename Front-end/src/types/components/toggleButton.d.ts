import { MouseEvent } from "react";

export interface ToggleButtonPropsType {
    onChange?: (_event: MouseEvent<HTMLElement>, newValue: string) => void;
    color?: "standard" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
    value?: string;
    exclusive?: boolean;
}
