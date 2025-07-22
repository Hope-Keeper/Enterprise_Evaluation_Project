import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { AxiosErrorPersonalized } from "api";
import { deleteQuestions } from "api/Questions";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { closeDeleteMeritQuestionsModal } from "store/ReduxModalsStore/DeleteMeritQuestionsModal";
import { QuestionSummeryType } from "types/api";

function DeleteQuestionsContent(props: DeleteQuestionsContentPropsType) {
    const { source_Qs, getPage } = props;
    const {
        state: { meritId }
    }: {
        state: {
            familyID: string;
            familyName: string;
            dimensionId: string;
            dimensionTitle: string;
            meritId: string;
            meritTitle: string;
        };
    } = useLocation();
    const [questionsIds, setQuestionsIds] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        const arr: string[] = [];
        source_Qs?.forEach((item) => {
            arr.push(item.questionId);
        });
        setQuestionsIds(arr.join(","));
    }, [source_Qs]);

    const handleDeleteQuestions = () => {
        deleteQuestions(meritId, questionsIds, (isok, res) => {
            if (isok) {
                //const data = (res as AxiosResponse).data;
                getPage("delete");
                enqueueSnackbar("سنجه ها  با موفقیت پاک شدند", {
                    variant: "success"
                });
                dispatch(closeDeleteMeritQuestionsModal());
            } else {
                const errorMessage = res as AxiosErrorPersonalized;
                enqueueSnackbar(errorMessage?.detail ?? errorMessage?.message, {
                    variant: "error"
                });
            }
        });
    };

    return (
        <Box>
            <Grid container mt={0} spacing={2}>
                <Grid item xs={12}>
                    <Typography>
                        آیا از پاک کردن{" "}
                        <span style={{ color: "red", fontWeight: "bold", fontSize: "24px" }}>
                            {source_Qs?.length}
                        </span>{" "}
                        سنجه اطمینان دارید؟
                    </Typography>
                </Grid>
                <Grid item xs={12} container className="d-f-j-c-a-c gap-8">
                    <Button
                        onClick={() => dispatch(closeDeleteMeritQuestionsModal())}
                        variant="outlined"
                        color="error">
                        خیر
                    </Button>
                    <Button
                        onClick={() => {
                            handleDeleteQuestions();
                        }}
                        variant="contained"
                        color="error"
                        autoFocus>
                        بله، مطمئن هستم
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
export default DeleteQuestionsContent;

interface DeleteQuestionsContentPropsType {
    source_Qs: QuestionSummeryType[] | null;
    getPage: (mode: "delete" | "usual", pageAllMembers1?: number, rowsPerPage1?: number) => void;
}
