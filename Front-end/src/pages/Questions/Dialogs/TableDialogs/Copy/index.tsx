import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { MeritSummeryType, QuestionSummeryType } from "types/api";
import { Option } from "types/components/autoCompleteHighlight";
import CopyQuestionForm from "./CopyQuestionForm";
import CopyquestionContentTimeLine from "./CopyQuestionTimeline";

function CopyquestionContent(props: CopyquestionContentPropsType) {
    const { family, dimension, merit, source_Qs, setSelectedRows } = props;

    return (
        <Grid marginRight={"0px"} spacing={4} container className="d-f-j-c-a-c">
            {source_Qs?.length === 1 && (
                <Grid item xs={12}>
                    <CopyquestionContentTimeLine question={source_Qs[0]} />
                </Grid>
            )}
            <Grid item xs={12} container className="d-f-j-c-a-c gap-32">
                {source_Qs?.length === 1 && (
                    <Grid item xs={12}>
                        <Divider variant="middle" />
                    </Grid>
                )}

                <Grid item xs={12}>
                    <CopyQuestionForm
                        initialValues={{
                            family,
                            dimension,
                            merit,
                            questions: source_Qs
                        }}
                        setSelectedRows={setSelectedRows}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default CopyquestionContent;

interface CopyquestionContentPropsType {
    CopyquestionContentTimeLineProps: MeritSummeryType | null;
    family: Option | null;
    dimension: Option | null;
    merit: Option | null;
    source_Qs: QuestionSummeryType[] | null;
    setSelectedRows: () => void;
}
