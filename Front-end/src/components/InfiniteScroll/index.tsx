import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTheme } from "@mui/material";

const paginationSize = 10;

interface arrayItem {
    id: number;
    text: string;
}
const array: arrayItem[] = [
    { id: 0, text: "Reihan template" },
    { id: 1, text: "Reihan template" },
    { id: 2, text: "Reihan template" },
    { id: 3, text: "Reihan template" },
    { id: 4, text: "Reihan template" },
    { id: 5, text: "Reihan template" },
    { id: 6, text: "Reihan template" },
    { id: 7, text: "Reihan template" },
    { id: 8, text: "Reihan template" },
    { id: 9, text: "Reihan template" }
];
const array2: arrayItem[] = [
    { id: 10, text: "Reihan template" },
    { id: 11, text: "Reihan template" },
    { id: 12, text: "Reihan template" },
    { id: 13, text: "Reihan template" },
    { id: 14, text: "Reihan template" },
    { id: 15, text: "Reihan template" },
    { id: 16, text: "Reihan template" },
    { id: 17, text: "Reihan template" },
    { id: 18, text: "Reihan template" },
    { id: 19, text: "Reihan template" }
];
const array3: arrayItem[] = [
    { id: 20, text: "Reihan template" },
    { id: 21, text: "Reihan template" },
    { id: 22, text: "Reihan template" },
    { id: 23, text: "Reihan template" },
    { id: 24, text: "Reihan template" },
    { id: 25, text: "Reihan template" },
    { id: 26, text: "Reihan template" },
    { id: 27, text: "Reihan template" },
    { id: 28, text: "Reihan template" },
    { id: 29, text: "Reihan template" }
];

function ReihanInfiniteScroll() {
    const [state, setState] = useState<arrayItem[]>(array);

    const handleGetNextPage = (): void => {
        setTimeout(() => {
            setState((s) => s.concat(s.length < 20 ? array2 : array3));
        }, 1000);
    };

    const theme = useTheme();
    return (
        <InfiniteScroll
            style={{ border: `1px ${theme.palette.success.main} solid`, padding: "8px" }}
            dataLength={state.length || 0}
            next={handleGetNextPage}
            hasMore={state.length < 30}
            loader={
                <h4 style={{ textAlign: "center", marginTop: "60px" }}>
                    <CircularProgress />
                </h4>
            }
            height="calc(20vh)"
            endMessage={
                state.length > paginationSize && (
                    <div
                        style={{
                            marginTop: "32px",
                            marginBottom: "32px",
                            fontSize: "14px",
                            width: "100%",
                            fontWeight: "bolder",
                            textAlign: "center"
                        }}>
                        شما به انتهای لیست رسیده اید
                    </div>
                )
            }
            scrollThreshold="20px">
            <Grid container spacing={4}>
                {state.map(({ text, id }) => {
                    return (
                        <Grid key={id} item xs={6}>
                            <Chip
                                label={<Typography>{`${text} - ${id + 1}`}</Typography>}
                                variant="filled"
                                color="success"
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </InfiniteScroll>
    );
}

export default ReihanInfiniteScroll;
