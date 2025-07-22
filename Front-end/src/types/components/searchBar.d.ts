import { ChangeEvent, ReactNode } from "react";

export interface SearchBarPropsType {
    value?: string;
    label?: string;
    autoComplete?: string;
    handleSearch?: () => void;
    fullWidth?: boolean;
    name?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    helperText?: ReactNode;
    error?: boolean;
    sx?: object | undefined;
}
