import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { closeLogOutModal } from "store/ReduxModalsStore/LogOutModal";

function ReihanLogOutModal() {
    const dispatch = useDispatch();

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Typography>آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟</Typography>
                <Typography>تمام داده‌های ذخیره‌نشده ممکن است از بین بروند.</Typography>
            </Grid>

            <Grid item xs={12}></Grid>

            <Grid item xs={12} className="d-f-j-c-a-c gap-8">
                <Button
                    size="medium"
                    variant="outlined"
                    color="error"
                    onClick={() => {
                        dispatch(closeLogOutModal());
                    }}>
                    انصراف
                </Button>
                <Button
                    size="medium"
                    variant="contained"
                    color="error"
                    onClick={() => {}}
                    endIcon={<LogoutIcon />}>
                    خروج
                </Button>
            </Grid>
        </Grid>
    );
}

export default ReihanLogOutModal;
