import IconButton from "@mui/material/IconButton";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { ClearIcon } from "@mui/x-date-pickers";

function ReihanEngNumberTextField(props: ReihanEngNumberTextFieldPropsType) {
    const { inputValue, setInputValue, onChange, autoComplete = "off", ...restProps } = props;

    const ALPHA_NUMERIC_DASH_REGEX = /^[0-9]+$/;

    return (
        <TextField
            value={inputValue}
            autoComplete={autoComplete}
            InputProps={{
                style: { fontFamily: "sans-serif" },
                endAdornment: inputValue != "" && (
                    <IconButton
                        aria-label="clear"
                        onClick={() => {
                            setInputValue("");
                        }}>
                        <ClearIcon />
                    </IconButton>
                )
            }}
            onChange={(e) => {
                onChange?.(e);

                const value = e.target.value;
                if (value !== "" && !ALPHA_NUMERIC_DASH_REGEX.test(value)) return;
                else setInputValue(value);
            }}
            {...restProps}
        />
    );
}

export default ReihanEngNumberTextField;

type ReihanEngNumberTextFieldPropsType = TextFieldProps & {
    inputValue: string;
    setInputValue: (value: string) => void;
};
