import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { MenuItemType, MenuPropsType } from "types/components/menu";
import { ReihanMenuItemStyles } from "./style";

function ReihanMenu(props: MenuPropsType) {
    const { anchorEl, handleClose, options } = props;
    const theme = useTheme();
    const open = Boolean(anchorEl);
    const [shownOptionsCount, setShownOptionsCount] = useState<number>(0);

    useEffect(() => {
        let count = 0;
        options.forEach((op) => {
            if (!op.hidden) count = count + 1;
        });
        setShownOptionsCount(count);
    }, [options]);

    return (
        <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                "aria-labelledby": "lock-button",
                role: "listbox"
            }}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "left"
            }}>
            {options.map((option: MenuItemType, index: number) => {
                if (!option.hidden) {
                    const { onClick } = option;
                    return (
                        <Box key={index}>
                            <MenuItem
                                sx={{ minWidth: "128.5px" }}
                                onClick={() => {
                                    onClick?.();
                                    handleClose?.();
                                }}>
                                <ReihanMenuItemStyles>
                                    <Typography variant="caption">{option.title}</Typography>
                                </ReihanMenuItemStyles>
                            </MenuItem>
                            {shownOptionsCount > 1 && index != options.length - 1 ? (
                                <Divider
                                    variant="middle"
                                    color={theme.palette.secondary.main}
                                    sx={{
                                        marginTop: "0px !important",
                                        marginBottom: "0px !important"
                                    }}
                                />
                            ) : (
                                <></>
                            )}
                        </Box>
                    );
                }
            })}
        </Menu>
    );
}

export default ReihanMenu;
