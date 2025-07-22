import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import { ReactNode, SyntheticEvent } from "react";

export interface AutoCompleteHighlightPropsType {
    label?: string;
    fullWidth?: boolean;
    name?: string;
    value?: Option | null | undefined;
    onChange?: (event: SyntheticEvent, newValue: Option | null) => void;
    helperText?: ReactNode;
    error?: boolean;
    sx?: SxProps<Theme> | undefined;
    options: Option[];
}

export interface MultiSelectAutoCompleteHighlightPropsType {
    label?: string;
    fullWidth?: boolean;
    name?: string;
    value?: Option[] | undefined;
    onChange?: (event: SyntheticEvent, newValues: Option[]) => void;
    helperText?: ReactNode;
    error?: boolean;
    sx?: SxProps<Theme> | undefined;
    options: Option[];
}

interface Option {
    title: string;
    id: string;
}
