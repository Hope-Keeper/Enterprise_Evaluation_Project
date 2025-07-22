export interface DatePickerPropsType {
    onChange: (newDate: null | Date) => void;
    label: string;
    value: Date | null;
    name?: string;
    error?: boolean;
    helperText?: string;
    disabled?: boolean;
}
