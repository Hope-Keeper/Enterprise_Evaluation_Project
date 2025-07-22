import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { AccountCircleIcon, ArrowKeyboardDownIcon, MarkEmailIcon } from "@share/icons";
import SvgIcon from "@mui/icons-material/ExpandLess";
import PayaSearchBar from "components/PayaSearchBar";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { closeHeader, openHeader } from "store/layout";

function Header() {
    const layoutState = useSelector((state: RootState) => state.layout);
    const dispatch = useDispatch();

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                justifyContent: "space-between",
                padding: "0px 40px"
            }}
            className="d-f-a-c">
            <IconButton
                color="success"
                size="small"
                onClick={() => {
                    if (layoutState.isHiddenHeader) {
                        dispatch(openHeader());
                        localStorage.setItem("isHiddenHeader", "false");
                    } else {
                        dispatch(closeHeader());
                        localStorage.setItem("isHiddenHeader", "true");
                    }
                }}
                sx={{
                    position: "fixed",
                    top: layoutState.headerHeight,
                    left: `calc(${layoutState.asideWidth} + 2px)`,
                    transform: "scale(0.9)",
                    width: "20px",
                    height: "20px",
                    zIndex: "999"
                }}>
                {layoutState.isHiddenHeader ? (
                    <ExpandMore fontSize="small" />
                ) : (
                    <ExpandLess fontSize="small" />
                )}
            </IconButton>
            <PayaSearchBar
                sx={{
                    maxWidth: "400px",
                    ":focus": {
                        borderColor: "red",
                        borderWidth: "2px",
                        borderStyle: "solid"
                    }
                }}
            />
            <Box
                className="d-f-a-c"
                sx={{
                    gap: "0px"
                }}>
                <IconButton>
                    <SvgIcon
                        component={MarkEmailIcon}
                        sx={{
                            fontSize: "32px"
                        }}
                    />
                </IconButton>

                <Divider orientation="vertical" variant="middle" flexItem />
                <IconButton>
                    <SvgIcon
                        component={AccountCircleIcon}
                        sx={{
                            fontSize: "32px"
                        }}
                    />
                </IconButton>
                <IconButton>
                    <SvgIcon
                        component={ArrowKeyboardDownIcon}
                        sx={{
                            fontSize: "20px"
                        }}
                    />
                </IconButton>
            </Box>
        </div>
    );
}

export default Header;
