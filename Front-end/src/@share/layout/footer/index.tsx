import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import * as JalaliMoment from "date-fns-jalali";
import { closeFooter, openFooter } from "store/layout";
import { userRolePersianConstructor } from "helper";

function Footer() {
    const layoutState = useSelector((state: RootState) => state.layout);
    const dispatch = useDispatch();
    const [dateTime, setDateTime] = useState<Date>(new Date());
    const currentUser = useSelector((state: RootState) => state.currentUser.perssonaelInfo);
    const currentUserRole = userRolePersianConstructor(currentUser?.currentRole);

    useEffect(() => {
        setInterval(() => {
            setDateTime(new Date());
        }, 1000);
    }, []);

    return (
        <div
            style={{ position: "relative", width: "100%", height: "100%" }}
            className="d-f-j-c-a-c gap-16">
            <IconButton
                color="success"
                size="small"
                onClick={() => {
                    if (layoutState.isHiddenFooter) {
                        dispatch(openFooter());
                        localStorage.setItem("isHiddenFooter", "false");
                    } else {
                        dispatch(closeFooter());
                        localStorage.setItem("isHiddenFooter", "true");
                    }
                }}
                sx={{
                    position: "fixed",
                    bottom: layoutState.footerHeight,
                    left: `calc(${layoutState.asideWidth} + 2px)`,
                    transform: "scale(0.9)",
                    width: "20px",
                    height: "20px",
                    zIndex: "999"
                }}>
                {layoutState.isHiddenFooter ? (
                    <ExpandLess fontSize="small" />
                ) : (
                    <ExpandMore fontSize="small" />
                )}
            </IconButton>

            <Typography variant="overline" fontSize="14px">
                <b>{currentUserRole} </b>
            </Typography>
            <Typography variant="overline" fontSize="18px">
                <b>{JalaliMoment.format(dateTime, "HH:mm:ss - yyyy/MM/dd")} </b>
            </Typography>
            <Typography variant="overline" fontSize="14px">
                <b>{currentUser?.username} </b>
            </Typography>
        </div>
    );
}

export default Footer;
