// mui-theme.d.ts
import "@mui/material/styles";

declare module "@mui/material/styles" {
    interface Palette {
        acceptedTagColor: Palette["primary"];
        canceledTagColor: Palette["primary"];
        closedTagColor: Palette["primary"];
        rejectedTagColor: Palette["primary"];
        underReviewTagColor: Palette["primary"];
        dialogTitleBgColor: Palette["primary"];
    }

    interface PaletteOptions {
        acceptedTagColor?: PaletteOptions["primary"];
        canceledTagColor?: PaletteOptions["primary"];
        closedTagColor?: PaletteOptions["primary"];
        rejectedTagColor?: PaletteOptions["primary"];
        underReviewTagColor?: PaletteOptions["primary"];
        dialogTitleBgColor?: PaletteOptions["primary"];
    }
}

declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {}
}
declare module "@mui/material/Chip" {
    interface ChipPropsColorOverrides {
        acceptedTagColor: true;
        canceledTagColor: true;
        closedTagColor: true;
        rejectedTagColor: true;
        underReviewTagColor: true;
    }
}
