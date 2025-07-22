import { TextFieldProps } from "@mui/material";
import {
    MobileTimePicker,
    MobileTimePickerProps,
    PickerValidDate,
    TimeView
} from "@mui/x-date-pickers";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalaliV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function ReihanTimePicker(props: TimePickerPropsType) {
    const { error, helperText, label, name, ...restProps } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
            <MobileTimePicker
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
                        name,
                        fullWidth: true
                    }
                }}
                {...restProps}
            />
        </LocalizationProvider>
    );
}

interface TimePickerPropsType extends MobileTimePickerProps<PickerValidDate, TimeView> {
    error?: boolean;
    helperText?: string;
    label?: TextFieldProps["label"];
    name?: TextFieldProps["name"];
}
