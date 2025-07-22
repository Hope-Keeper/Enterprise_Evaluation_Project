import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import { ChangeEvent, ReactNode } from "react";

export interface TextFieldPropsType {
    value?: string;
    label?: string;
    autoComplete?: string;
    handleClickClearButton?: () => void;
    fullWidth?: boolean;
    name?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    helperText?: ReactNode;
    error?: boolean;
    sx?: SxProps<Theme> | undefined;
}
