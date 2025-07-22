import Button, { ButtonProps } from "@mui/material/Button";
import { ReactNode, useState } from "react";

function PayaButtonOnHoverChangeIcon(props: PayaButtonOnHoverChangeIconPropsType) {
    const { label, defaultIcon, hoverIcon, onMouseEnter, onMouseLeave, ...restProps } = props;
    const [isHover, setHover] = useState<boolean>(false);

    return (
        <Button
            onMouseEnter={(e) => {
                setHover(true);
                onMouseEnter?.(e);
            }}
            onMouseLeave={(e) => {
                setHover(false);
                onMouseLeave?.(e);
            }}
            {...restProps}
            className="gap-4">
            {label}
            {isHover ? hoverIcon : defaultIcon}
        </Button>
    );
}

export default PayaButtonOnHoverChangeIcon;

export interface PayaButtonOnHoverChangeIconPropsType extends ButtonProps {
    label?: string;
    hoverIcon: ReactNode;
    defaultIcon: ReactNode;
}
