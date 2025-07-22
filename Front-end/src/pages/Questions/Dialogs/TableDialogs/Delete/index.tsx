import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { AxiosErrorPersonalized } from "api";
import { deleteQuestionByID } from "api/Questions";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { closeDeleteMeritQuestionModal } from "store/ReduxModalsStore/DeleteMeritQuestionModal";
import { QuestionSummeryType } from "types/api";

function DeletequestionContent(props: DeletequestionContentPropsType) {
    const { source_Q, getPage } = props;

    const dispatch = useDispatch();

    return (
        <Box>
            <Grid container mt={0} spacing={2}>
                <Grid item xs={12}>
                    <Typography>
                        آیا از پاک کردن شایستگی{" "}
                        <span style={{ color: "red", fontWeight: "bold", fontSize: "24px" }}>
                            {source_Q?.questionContent}
                        </span>{" "}
                        اطمینان دارید؟
                    </Typography>
                </Grid>
                <Grid item xs={12} container className="d-f-j-c-a-c gap-8">
                    <Button
                        onClick={() => dispatch(closeDeleteMeritQuestionModal())}
                        variant="outlined"
                        color="error">
                        خیر
                    </Button>
                    <Button
                        onClick={async () => {
                            await deleteQuestionByID(source_Q?.questionId ?? "", (isok, res) => {
                                if (isok) {
                                    //const data = (res as AxiosResponse).data;
                                    getPage("delete");
                                    enqueueSnackbar("سنجه  با موفقیت پاک شد", {
                                        variant: "success"
                                    });
                                } else {
                                    const errorMessage = res as AxiosErrorPersonalized;
                                    enqueueSnackbar(errorMessage?.detail ?? errorMessage?.message, {
                                        variant: "error"
                                    });
                                }
                            });

                            dispatch(closeDeleteMeritQuestionModal());
                        }}
                        variant="contained"
                        color="error"
                        autoFocus>
                        بله، مطمئن هستم
                    </Button>
                </Grid>{" "}
            </Grid>
        </Box>
    );
}
export default DeletequestionContent;

interface DeletequestionContentPropsType {
    source_Q: QuestionSummeryType | null;
    getPage: (mode: "delete" | "usual", pageAllMembers1?: number, rowsPerPage1?: number) => void;
}
