import styled from "@emotion/styled";
import Box from "@mui/material/Box";
export const ReihanMenuStyles = styled(Box)<ReihanOutlineIconButtonStylesPropsType>`
    padding: 0px;
    min-width: 0px;
    width: 45px;
    height: 45px;
`;
export const ReihanMenuItemStyles = styled(Box)<ReihanOutlineIconButtonStylesPropsType>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    width: 100%;

    .svg-container {
        width: 24px;
        height: 24px;
        border-radius: 12px;
        border: ${({ theme }) => "solid 1px " + theme.palette.primary.main};
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

interface ReihanOutlineIconButtonStylesPropsType {
    textcolor?: string;
}
