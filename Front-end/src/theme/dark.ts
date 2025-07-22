// export Mui dark theme object from here
import { createTheme, ThemeOptions } from "@mui/material/styles";

export const darkTheme = createTheme({
    direction: "rtl",
    palette: {
        mode: "dark"
    },
    typography: {
        allVariants: {
            fontFamily: "YekanBakh"
        }
    },
    components: {
        MuiTextField: {
            defaultProps: {
                fullWidth: true
            }
        }
    }
} as ThemeOptions);
