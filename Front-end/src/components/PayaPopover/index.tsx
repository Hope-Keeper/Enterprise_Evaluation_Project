import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { PopoverPropsType } from "types/components/popover";

function PayaPopover(props: PopoverPropsType) {
    const {
        anchor,
        message,
        handleClose,
        verticalAnchorOrigin = "bottom",
        horizontalAnchorOrigin = "left",
        ...restProps
    } = props;

    const open = Boolean(anchor);
    const id = open ? "simple-popover" : undefined;

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchor}
            onClose={handleClose}
            anchorOrigin={{
                vertical: verticalAnchorOrigin,
                horizontal: horizontalAnchorOrigin
            }}
            {...restProps}>
            <Typography>{message}</Typography>
        </Popover>
    );
}

export default PayaPopover;
