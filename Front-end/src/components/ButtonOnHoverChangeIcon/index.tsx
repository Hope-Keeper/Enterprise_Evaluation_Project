import Button, { ButtonProps } from "@mui/material/Button";
import { ReactNode, useState } from "react";

function ReihanButtonOnHoverChangeIcon(props: ReihanButtonOnHoverChangeIconPropsType) {
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

export default ReihanButtonOnHoverChangeIcon;

export interface ReihanButtonOnHoverChangeIconPropsType extends ButtonProps {
    label?: string;
    hoverIcon: ReactNode;
    defaultIcon: ReactNode;
}
