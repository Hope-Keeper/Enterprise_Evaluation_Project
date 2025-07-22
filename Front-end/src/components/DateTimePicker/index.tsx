import { TextFieldProps } from "@mui/material";
import { DateTimePickerProps, MobileDateTimePicker, PickerValidDate } from "@mui/x-date-pickers";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalaliV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function ReihanDateTimePicker(props: ReihanDatePickerPropsType) {
    const { label, ampm, name, error, helperText } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
            <MobileDateTimePicker
                ampm={ampm}
                localeText={{
                    cancelButtonLabel: "لغو",
                    toolbarTitle: "انتخاب ساعت و روز",
                    okButtonLabel: "تایید",
                    nextMonth: "ماه بعد",
                    previousMonth: "ماه قبل",
                    openNextView: "انتخاب دقیقه",
                    openPreviousView: "انتخاب ساعت"
                }}
                slotProps={{
                    textField: {
                        label,
                        error,
                        helperText,
                        name
                    }
                }}
            />
        </LocalizationProvider>
    );
}

interface ReihanDatePickerPropsType extends DateTimePickerProps<PickerValidDate> {
    error?: boolean;
    helperText?: string;
    label?: TextFieldProps["label"];
    name?: TextFieldProps["name"];
}
