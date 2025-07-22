import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SvgIcon from "@mui/material/SvgIcon";
import ReihanTooltip from "components/ReihanTooltip";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { RootState } from "store";
import { NestedListPropsType } from "types/components/nestedList";
import LinkItem from "../linkItem";
import Styles from "./styles";

function WithChildrenLink({ item }: { item: NestedListPropsType }) {
    const [open, setOpen] = useState<boolean>(false);
    const layoutState = useSelector((state: RootState) => state.layout);
    const { asideStatus } = layoutState;

    const location = useLocation();

    const checkIfActiveRoute = (item: NestedListPropsType): boolean => {
        if (location.pathname === item.link) {
            return true;
        }
        if (item.children) {
            return item.children.some((child) => checkIfActiveRoute(child));
        }
        return false;
    };

    useEffect(() => {
        checkIfActiveRoute(item) ? setOpen(true) : setOpen(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Styles
            layoutState={layoutState}
            withChildrenLinkItem={item}
            checkIfActiveRoute={checkIfActiveRoute}
            className="WithChildrenLink-styles">
            <List component="nav">
                <ReihanTooltip
                    placement="left"
                    title={asideStatus === "open" ? "" : item.title}
                    children={
                        <ListItemButton
                            component={item.children ? Button : RouterLink}
                            to={item.children ? "#" : item.link}
                            onClick={handleClick}
                            className="d-f-j-c-a-c WithChildren-ListItemButton">
                            <ListItemIcon className="WithChildren-ListItemIcon">
                                <SvgIcon component={item.icon} className="WithChildren-SvgIcon" />
                            </ListItemIcon>

                            {asideStatus === "open" && (
                                <Fragment>
                                    <ListItemText
                                        primary={item.title}
                                        primaryTypographyProps={{
                                            fontSize: "16px"
                                        }}
                                        className="WithChildren-ListItemText"
                                    />
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </Fragment>
                            )}
                        </ListItemButton>
                    }
                />

                {asideStatus === "open" && (
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {item.children?.map((child) => {
                                if (child.children)
                                    return <WithChildrenLink key={child.id} item={child} />;
                                return <LinkItem key={child.id} item={child} />;
                            })}
                        </List>
                    </Collapse>
                )}
            </List>
        </Styles>
    );
}

export default WithChildrenLink;
