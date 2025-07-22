import { ReactNode, SyntheticEvent } from "react";

export interface TabPropsType {
    value: number;
    title?: string;
    variant?: "scrollable" | "standard" | "fullWidth" | undefined;
    onChange: (_event: SyntheticEvent, newValue: number) => void;
}

export interface TabType {
    label: string;
    id: number;
    panel: ReactNode;
}
