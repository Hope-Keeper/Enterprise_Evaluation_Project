import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import noDataImage from "@share/Images/NoData.png";

function ReihanNoData(props: ReihanNoDataPropsType) {
    const { color = "common", bgImage, text, imageWidth } = props;
    const theme = useTheme();

    const pallet = {
        primary: theme.palette.primary.main,
        secondary: theme.palette.secondary.main,
        success: theme.palette.success.main,
        info: theme.palette.info.main,
        common: theme.palette.common.white
    };

    return (
        <Box
            sx={() => ({
                backgroundColor: `${pallet[color]}11`,
                padding: "20px",
                border: `1px solid ${pallet[color]}55`,
                borderRadius: "8px",
                boxShadow: `0px 3px 7px 1px ${pallet[color]}22`
            })}>
            <Grid container spacing={2} className="d-f-j-c-a-c">
                <Grid item xs={12} className="d-f-j-c-a-c">
                    {bgImage && (
                        <img
                            src={noDataImage}
                            width={imageWidth ?? 650}
                            style={{
                                backgroundPosition: "center",
                                overflow: "hidden",
                                opacity: 0.8
                            }}
                        />
                    )}
                    <Typography fontWeight={400} fontSize="16px" textAlign={"center"}>
                        {text}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ReihanNoData;

interface ReihanNoDataPropsType {
    color?: "primary" | "secondary" | "success" | "info" | "common";
    text?: string;
    bgImage?: boolean;
    imageWidth?: number;
}
