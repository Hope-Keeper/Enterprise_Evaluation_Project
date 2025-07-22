import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { EvaluationRecordsIcon } from "@share/icons";
import { AxiosErrorPersonalized } from "api";
import {
    DiagramType,
    getDiaramOfperson,
    PersonelInformationType,
    PersonnelEvaluationProgramRecordType
} from "api/Daigram";
import { AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PersonEvaluationRecordTable from "./Table";

function UserPanel() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [personnelInformation, setPersonnelInformation] = useState<
        PersonelInformationType[] | null
    >(null);
    const [personnelEvaluationProgramRecord, setPersonnelEvaluationProgramRecord] = useState<
        PersonnelEvaluationProgramRecordType[] | null
    >(null);

    useEffect(() => {
        getDiaramOfperson((isok, res) => {
            if (isok) {
                const data = (res as AxiosResponse).data;
                const diagramData: DiagramType[] = data["content"];
                const evaluationProgramInformation = diagramData.map(
                    ({ evaluationProgram }, evaluationProgramScore) => {
                        return {
                            ...evaluationProgram[0],
                            evaluationProgramScore
                        };
                    }
                );
                const personnelInformation = diagramData.map(
                    ({
                        personnelFirstName,
                        personnelLastName,
                        personnelAge,
                        personnelId,
                        evaluationProgramScore,
                        personnelServiceUnit
                    }) => ({
                        personnelFirstName,
                        personnelAge,
                        personnelLastName,
                        personnelId,
                        evaluationProgramScore,
                        personnelServiceUnit
                    })
                );
                setPersonnelEvaluationProgramRecord(evaluationProgramInformation);
                setPersonnelInformation(personnelInformation);
                setIsLoading(false);
            } else {
                const errorMessage = res as AxiosErrorPersonalized;
                enqueueSnackbar(errorMessage?.detail ?? errorMessage?.message, {
                    variant: "error"
                });
                setIsLoading(false);
            }
        });
    }, []);

    return (
        <Grid container mt={0} spacing={2}>
            <Grid item xs={12} container spacing={2} className="d-f-j-b-a-c">
                <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
                        سوابق ارزشیابی <span>{personnelInformation?.[0]?.personnelFirstName}</span>{" "}
                        <span>{personnelInformation?.[0]?.personnelLastName}</span>
                    </Typography>
                </Grid>
                <Grid item xs={4} className="d-f-j-e-a-c">
                    <Link to={"/user/user-diagram"}>
                        <Button
                            size="medium"
                            variant="contained"
                            color="primary"
                            endIcon={<EvaluationRecordsIcon />}>
                            مشاهده نمودار سوابق ارزشیابی
                        </Button>
                    </Link>
                </Grid>
            </Grid>
            {/** table */}
            <Grid item xs={12}>
                {isLoading ? (
                    <CircularProgress size={40} />
                ) : personnelEvaluationProgramRecord?.length ? (
                    <PersonEvaluationRecordTable rows={personnelEvaluationProgramRecord} />
                ) : (
                    <Typography>سوابق شغلی موجود نیست... </Typography>
                )}
            </Grid>
        </Grid>
    );
}
export default UserPanel;
