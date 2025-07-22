export interface FormikTextFieldProps {
    onChange: () => void;
    handleBlur: () => void;
    label: string;
    value: Date | null;
    name?: string;
    error?: boolean;
    helperText?: string;
    disabled?: boolean;
}
