import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { enqueueSnackbar } from "notistack";
import { SnackbarPropsType } from "types/components/snackbar";

function ReihanSnackBar({
    variant,
    message,
    autoHideDuration,
    verticalAnchorOrigin = "bottom",
    horizontalAnchorOrigin = "right"
}: SnackbarPropsType) {
    return (
        <Box>
            <Button
                variant="contained"
                onClick={() =>
                    enqueueSnackbar(message, {
                        variant: variant,
                        anchorOrigin: {
                            horizontal: horizontalAnchorOrigin,
                            vertical: verticalAnchorOrigin
                        },
                        autoHideDuration: autoHideDuration
                    })
                }>
                Show snackbar
            </Button>
        </Box>
    );
}

export default ReihanSnackBar;
