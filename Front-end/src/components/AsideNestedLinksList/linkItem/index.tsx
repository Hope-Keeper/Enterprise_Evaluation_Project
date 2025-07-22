import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SvgIcon from "@mui/material/SvgIcon";
import ReihanTooltip from "components/ReihanTooltip";
import { useSelector } from "react-redux";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { RootState } from "store";
import { NestedListPropsType } from "types/components/nestedList";
import Styles from "./styles";

function LinkItem({ item }: { item: NestedListPropsType }) {
    const layoutState = useSelector((state: RootState) => state.layout);
    const { asideStatus } = layoutState;

    const location = useLocation();

    return (
        <Styles LinkItem={item}>
            <ReihanTooltip
                placement="left"
                title={asideStatus === "open" ? "" : item.title}
                children={
                    <ListItemButton
                        component={RouterLink}
                        to={item.link}
                        sx={
                            asideStatus === "open"
                                ? { p: 0, pl: item.level ? item.level * 2 : 0 }
                                : null
                        }
                        className="d-f-j-c-a-c ListItemButton">
                        <ListItemIcon
                            sx={{
                                minWidth: "32px" // Reduces the default spacing
                            }}>
                            <SvgIcon component={item.icon} className="SvgIcon" />
                        </ListItemIcon>

                        {asideStatus === "open" && (
                            <ListItemText
                                primary={item.title}
                                primaryTypographyProps={{
                                    fontSize: "16px",
                                    fontWeight: location.pathname === item.link ? "600" : "normal"
                                }}
                                className="ListItemText"
                            />
                        )}
                    </ListItemButton>
                }
            />
        </Styles>
    );
}

export default LinkItem;
