import Alert, { AlertProps } from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useState } from "react";

function ReihanAlert(props: ReihanAlertProps) {
    const { title, message, handleClose, ...restProps } = props;
    const [isHidden, setIsHidden] = useState<boolean>(false);

    if (isHidden) return null;
    return (
        <Alert
            onClose={() => {
                setIsHidden(true);
                handleClose?.();
            }}
            {...restProps}>
            {title && <AlertTitle>{title}</AlertTitle>}
            {message}
        </Alert>
    );
}

export default ReihanAlert;

interface ReihanAlertProps extends AlertProps {
    message: string;
    handleClose?: () => void;
}
