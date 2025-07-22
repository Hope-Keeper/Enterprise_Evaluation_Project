import styled from "@emotion/styled";

const ScrollStyles = styled("span")`
    .main {
    }
    .main::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        border-radius: 999px;
    }

    .main::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.palette.action.active};
        width: 8px;
        height: 8px;
        min-height: 40px;
        max-height: 40px;
        border-radius: 999px;
    }

    .main::-webkit-scrollbar-thumb:hover {
        background-color: ${({ theme }) => theme.palette.action.disabled};
        border-radius: 999px;
    }
`;

export default ScrollStyles;
