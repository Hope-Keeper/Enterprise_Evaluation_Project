import styled from "@emotion/styled";
import { NestedListPropsType } from "types/components/nestedList";

const LinkItemStyles = styled("span")<LinkItemStylesPropsType>`
    .SvgIcon {
        background-color: ${({ theme, LinkItem }) =>
            location.pathname === LinkItem.link ? theme.palette.primary.main : "initial"};
        color: ${({ theme, LinkItem }) =>
            location.pathname === LinkItem.link
                ? theme.palette.secondary.dark
                : "initial"} !important;
        padding: 8px;
        border-radius: 8px 8px 0px 8px;

        z-index: 999;
    }

    .ListItemText {
        background-color: ${({ LinkItem, theme }) =>
            location.pathname === LinkItem.link ? theme.palette.secondary.dark : "initial"};
        border-radius: 50px 0px 0px 50px;
        padding: 19.5px 0px;
        padding-left: 18px;
        margin-left: -10px;
    }
`;

export default LinkItemStyles;

interface LinkItemStylesPropsType {
    LinkItem: NestedListPropsType;
}
