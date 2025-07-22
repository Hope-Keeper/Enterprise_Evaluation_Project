import IconButton from "@mui/material/IconButton";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { ClearIcon } from "@mui/x-date-pickers";

function ReihanTextField(props: ReihanTextFieldPropsType) {
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

export default ReihanTextField;

type ReihanTextFieldPropsType = TextFieldProps & {
    handleClickClearButton?: () => void;
    disableClearable?: boolean;
};
