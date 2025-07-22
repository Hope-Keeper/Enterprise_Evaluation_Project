import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { ExpandIcon } from "@share/icons";
import LogoImg from "assets/images/logo.png";
import ReihanAsideNestedLinksList from "components/ReihanAsideNestedLinksList";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "store";
import { closeAside, openAside } from "store/layout";
import LogoutIcon from "@mui/icons-material/Logout";
import { openLogOutModal } from "store/ReduxModalsStore/LogOutModal";
import { GetAsideLinksList } from "./asideLinksList";

function Aside() {
    const isDeviceWidthOverThan900px = useMediaQuery<boolean>("(min-width:900px)");
    const layoutState = useSelector((state: RootState) => state.layout);
    const { asideStatus } = layoutState;
    const dispatch = useDispatch();
    const asideLinksList = GetAsideLinksList();

    return (
        <div
            style={{
                position: "relative",
                flexDirection: "column",
                width: "100%",
                height: "100%"
            }}>
            <Box
                className="d-f-j-c-a-c"
                sx={{
                    mt: asideStatus !== "minimize" ? "60px" : "0px",
                    mx: asideStatus !== "minimize" ? "38px" : "0px",
                    height: "50px",
                    position: "relative"
                }}>
                {isDeviceWidthOverThan900px ? (
                    <IconButton
                        color="success"
                        sx={{
                            position: asideStatus === "minimize" ? "absolute" : "static",
                            top: "50px",
                            left: "4px"
                        }}
                        onClick={() => {
                            if (asideStatus === "minimize" || asideStatus === "close") {
                                dispatch(openAside());
                                localStorage.setItem("asideStatus", "open");
                            } else {
                                dispatch(closeAside());
                                localStorage.setItem("asideStatus", "close");
                            }
                        }}>
                        {asideStatus === "close" ? (
                            <ExpandIcon sx={{ transform: "rotate(180deg)" }} />
                        ) : asideStatus === "open" ? (
                            <ExpandIcon />
                        ) : (
                            <ExpandIcon
                                sx={{
                                    transform: "rotate(180deg)",
                                    position: "fixed",
                                    scale: "0.5",
                                    zIndex: "999"
                                }}
                            />
                        )}
                    </IconButton>
                ) : (
                    <MenuIcon />
                )}
                {asideStatus == "open" ? (
                    <Link to="/" className="d-f-j-c-a-c">
                        <img src={LogoImg} alt="Logo" height={85} />
                    </Link>
                ) : null}
            </Box>

            <div className="links-container">
                <ReihanAsideNestedLinksList links={asideLinksList} />
            </div>
            <div className="logout-btn-container d-f-j-c-a-c">
                <Button
                    color="error"
                    sx={{ fontSize: "15px" }}
                    className="d-f-j-c-a-c gap-8"
                    onClick={() => {
                        dispatch(openLogOutModal());
                    }}>
                    <LogoutIcon /> {layoutState.asideStatus === "open" && "خروج از حساب کاربری"}
                </Button>
            </div>
        </div>
    );
}

export default Aside;
