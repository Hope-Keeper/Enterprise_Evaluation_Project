import IconButton from "@mui/material/IconButton";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { ClearIcon } from "@mui/x-date-pickers";

function PayaTextField(props: PayaTextFieldPropsType) {
    const { value, handleClickClearButton, disableClearable, ...restProps } = props;

    return (
        <TextField
            value={value}
            InputProps={{
                endAdornment: !disableClearable && value != "" && (
                    <IconButton aria-label="clear" onClick={handleClickClearButton}>
                        <ClearIcon />
                    </IconButton>
                )
            }}
            {...restProps}
        />
    );
}

export default PayaTextField;

type PayaTextFieldPropsType = TextFieldProps & {
    handleClickClearButton?: () => void;
    disableClearable?: boolean;
};
