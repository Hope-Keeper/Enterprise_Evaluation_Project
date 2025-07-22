import Tooltip, { TooltipProps } from "@mui/material/Tooltip";

function PayaTooltip(props: TooltipProps) {
    const { children, title, ...restProps } = props;

    return (
        <Tooltip title={title && <span>{title}</span>} {...restProps}>
            {children}
        </Tooltip>
    );
}

export default PayaTooltip;
