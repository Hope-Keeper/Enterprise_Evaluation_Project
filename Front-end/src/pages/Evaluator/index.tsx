import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useGetActiveProgram from "@share/hooks/getActiveProgram";
import { AxiosErrorPersonalized } from "api";
import { SimpleEvaluatedType, getEvaluatedListByEvaluator } from "api/Evaluator";
import { AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";
import Program from "pages/EvaluationProgram/Program";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { Option } from "types/components/autoCompleteHighlight";
import EvaluatorTable from "./Table";
import PayaNoData from "components/PayaNoData";

function Evaluator() {
    const [evaluatorList, setEvaluatorList] = useState<SimpleEvaluatedType[] | null>(null);
    const [isLoadingForEvaluatorList, setIsLoadingForEvaluatorList] = useState<boolean>(true);
    const { isLoading, program } = useGetActiveProgram();
    const currentUser = useSelector((state: RootState) => state.currentUser.perssonaelInfo);
    const [evaluator, setEvaluator] = useState<Option | null>(null);

    useEffect(() => {
        //setEvaluator
        if (currentUser && currentUser?.userInfo) {
            setEvaluator({
                id: currentUser?.userInfo?.personnelId,
                title: `${currentUser?.userInfo?.personnelFirstName} ${currentUser?.userInfo?.personnelLastName}`
            });
        }
    }, [
        currentUser,
        currentUser?.userInfo?.personnelFirstName,
        currentUser?.userInfo?.personnelId,
        currentUser?.userInfo?.personnelLastName
    ]);

    useEffect(() => {
        if (program) {
            getEvaluatedListByEvaluator((isok, res) => {
                if (isok) {
                    const data = (res as AxiosResponse).data;
                    setEvaluatorList(data);
                    setIsLoadingForEvaluatorList(false);
                } else {
                    const errorMessage = res as AxiosErrorPersonalized;
                    enqueueSnackbar(errorMessage?.detail ?? errorMessage?.message, {
                        variant: "error"
                    });
                    setIsLoadingForEvaluatorList(false);
                }
            });
        }
    }, [program]);

    return (
        <Grid container mt={0} spacing={2}>
            <Grid item xs={12} container>
                <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
                        لیست ارزیابی شوندگان
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                {/**current program */}
                {isLoading ? (
                    <CircularProgress size={40} />
                ) : program ? (
                    <Program program={program} />
                ) : (
                    <PayaNoData color="success" text="دوره جاری وجود ندارد..." />
                )}
            </Grid>
            {/**table */}
            <Grid item xs={12}>
                {isLoadingForEvaluatorList ? (
                    <CircularProgress size={40} />
                ) : evaluator && evaluatorList?.length ? (
                    <EvaluatorTable rows={evaluatorList} />
                ) : (
                    <Typography>ارزیابی شونده ای وجود ندارد...</Typography>
                )}
            </Grid>
        </Grid>
    );
}

export default Evaluator;
// [
//     {
//         personnelId: "string",
//         personnelFirstName: "string",
//         personnelLastName: "string",
//         evaluationProgramResulStatus: 1,
//         evaluationProgramResulEvaluatedPersonnelRole: "string"
//     }
// ]
