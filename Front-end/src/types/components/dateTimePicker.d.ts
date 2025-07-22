export interface DateTimePickerPropsType {
    onChange: (newDate: null | Date) => void;
    label: string;
    value?: Date | null;
    name?: string;
    error?: boolean;
    ampm?: boolean;
    helperText?: string;
    disabled?: boolean;
}
