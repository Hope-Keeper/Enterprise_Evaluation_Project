import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";

export interface MenuPropsType {
    anchorEl?: null | HTMLElement;
    children?: React.ReactNode;
    handleClose?: () => void;
    handleClick?: () => void;
    type?: "button" | "reset" | "submit" | undefined;
    fullWidth?: boolean;
    options: MenuItemType[];
}

export interface MenuItemType {
    title: string;
    icon?: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
        muiName: string;
    };
    onClick?: () => void;
    id?: string;
    hidden?: boolean;
}
