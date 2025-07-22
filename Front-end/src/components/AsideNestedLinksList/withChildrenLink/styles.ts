import styled from "@emotion/styled";
import { NestedListPropsType } from "types/components/nestedList";
import { ReduxLayoutStateType } from "types/layout/container";

const WithChildrenLinkStyles = styled("span")<WithChildrenLinkStylesPropsType>`
    .WithChildren-ListItemButton {
        padding-left: ${({ withChildrenLinkItem }) =>
            `${withChildrenLinkItem.level ? withChildrenLinkItem.level * 2 * 8 : 0}px`};
        position: relative;

        .WithChildren-ListItemIcon {
            min-width: 32px; // Reduces the default spacing
            margin-right: 4px;

            .WithChildren-SvgIcon {
                background-color: ${(props) => {
                    const { layoutState, checkIfActiveRoute, theme, withChildrenLinkItem } = props;

                    return layoutState.asideStatus === "close" &&
                        checkIfActiveRoute(withChildrenLinkItem)
                        ? theme.palette.primary.main
                        : "initial";
                }};
                border-radius: 16px 16px 0px 16px;
                z-index: 999;
                padding: 8px;
            }
        }
    }

    .WithChildren-ListItemText {
        padding: 10px 0px;
        padding-left: 8px;
    }
`;

export default WithChildrenLinkStyles;

interface WithChildrenLinkStylesPropsType {
    layoutState: ReduxLayoutStateType;
    withChildrenLinkItem: NestedListPropsType;
    checkIfActiveRoute: (withChildrenLinkItem: NestedListPropsType) => boolean;
}
