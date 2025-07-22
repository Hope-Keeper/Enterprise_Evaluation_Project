import { TextFieldProps } from "@mui/material";
import { CalendarIcon, DatePicker, DatePickerProps, PickerValidDate } from "@mui/x-date-pickers";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalaliV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect, useState } from "react";

export default function ReihanDatePicker(props: ReihanDatePickerPropsType) {
    const { fullWidth, size, error, helperText, label, name, borderRadius, ...restProps } = props;

    const [cleared, setCleared] = useState<boolean>(false);

    useEffect(() => {
        cleared && setCleared(false);
    }, [cleared]);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
            <DatePicker
                slots={{
                    openPickerIcon: CalendarIcon
                }}
                slotProps={{
                    textField: {
                        size,
                        label,
                        error,
                        helperText,
                        name,
                        fullWidth,
                        sx: {
                            "& fieldset": { borderRadius }
                        }
                    },
                    field: { clearable: true, onClear: () => setCleared(true) }
                }}
                {...restProps}
            />
        </LocalizationProvider>
    );
}

interface ReihanDatePickerPropsType extends DatePickerProps<PickerValidDate> {
    error?: boolean;
    helperText?: string;
    label?: TextFieldProps["label"];
    name?: TextFieldProps["name"];
    size?: TextFieldProps["size"];
    fullWidth?: TextFieldProps["fullWidth"];
    borderRadius?: string;
}
