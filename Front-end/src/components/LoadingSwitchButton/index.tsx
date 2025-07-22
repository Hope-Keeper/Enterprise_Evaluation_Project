import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { CheckIcon } from "@share/icons";

const Android12Switch = styled(Switch, {
    shouldForwardProp: (prop) => prop !== "isLoading"
})<SwitchProps & { isLoading?: boolean }>(({ theme, isLoading }) => ({
    padding: 7,
    ".Mui-checked + .MuiSwitch-track": {
        opacity: isLoading ? 0.5 : 1
    },
    "& .MuiSwitch-track": {
        borderRadius: 12,
        backgroundColor: isLoading
            ? theme.palette.action.disabledBackground
            : theme.palette.action.disabled,
        opacity: "1"
    },
    "& .MuiSwitch-thumb": {
        width: 18,
        height: 18,
        margin: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isLoading ? "transparent" : theme.palette.common.white,
        boxShadow: "none"
    }
}));

export default function ReihanLoadingSwitchButton(props: ReihanSwitchButtonPropsType) {
    const { label, isLoading = true, ...restProps } = props;

    return (
        <FormControlLabel
            control={
                <Android12Switch
                    {...restProps}
                    isLoading={isLoading}
                    disableRipple
                    checkedIcon={
                        isLoading ? <CircularProgress size={14} color="inherit" /> : <CheckIcon />
                    }
                    icon={isLoading ? <CircularProgress size={14} color="inherit" /> : "ddd"}
                />
            }
            label={label || ""}
        />
    );
}

interface ReihanSwitchButtonPropsType extends SwitchProps {
    label?: string;
    isLoading?: boolean;
}
