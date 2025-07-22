import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { QuestionMarkIcon } from "@share/icons";
import { QuestionSummeryType } from "types/api";

interface CopyquestionContentTimeLinePropsType {
    question: QuestionSummeryType | null;
}

function CopyquestionContentTimeLine(props: CopyquestionContentTimeLinePropsType) {
    const { question } = props;
    return (
        <Box>
            <Grid container className="d-f-j-c-a-c gap-32">
                <Grid item>
                    <QuestionMarkIcon />
                </Grid>

                <Grid item className="d-f-j-c-a-c">
                    <Typography>{question?.questionContent}</Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

export default CopyquestionContentTimeLine;
