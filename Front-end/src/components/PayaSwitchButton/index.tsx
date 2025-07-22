import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";

const Android12Switch = styled(Switch, {
    shouldForwardProp: (prop) => prop !== "loading" // Prevents `loading` from being passed to DOM
})<PayaSwitchButtonPropsType>(({ theme, loading, checked, disabled }) => ({
    padding: 7,

    ".MuiSwitch-track": {
        opacity: `${disabled ? 0.5 : 1} !important`
    },

    "& .MuiSwitch-track": {
        borderRadius: 12,
        backgroundColor: theme.palette.action.disabled,
        opacity: "1",
        "&::before, &::after": {
            content: "''",
            position: "absolute",
            top: "50%",
            transform: "translateY(-45%)",
            width: 18,
            height: 18
        },
        "&::before": {
            backgroundImage:
                loading && checked
                    ? `url('data:image/svg+xml;utf8,<svg style="margin-top:-1px" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                          theme.palette.common.white
                      )}" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity="0.25"/><path fill="${encodeURIComponent(
                          theme.palette.common.white
                      )}" d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>')`
                    : `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                          theme.palette.common.white
                      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 10
        },
        "&::after": {
            backgroundImage:
                loading && !checked
                    ? `url('data:image/svg+xml;utf8,<svg style="margin-top:-1px" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                          theme.palette.common.white
                      )}" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity="0.25"/><path fill="${encodeURIComponent(
                          theme.palette.common.white
                      )}" d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>')`
                    : `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                          theme.palette.common.white
                      )}" d="M19,13H5V11H19V13Z" /></svg>')`,

            right: 10
        }
    },

    "& .MuiSwitch-thumb": {
        opacity: "1",
        backgroundColor: theme.palette.common.white,
        boxShadow: "none",
        width: 18,
        height: 18,
        margin: 1
    }
}));

export default function PayaSwitchButton(props: PayaSwitchButtonPropsType) {
    const { label, loading, ...restProps } = props;

    return (
        <FormControlLabel
            control={<Android12Switch disabled={loading} loading={loading} {...restProps} />}
            label={label || ""}
        />
    );
}

interface PayaSwitchButtonPropsType extends SwitchProps {
    label?: string;
    loading?: boolean;
}
