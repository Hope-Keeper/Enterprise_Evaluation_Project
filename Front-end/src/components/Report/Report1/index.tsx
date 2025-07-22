import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { AxiosErrorPersonalized } from "api";
import { EvaluationProgramType } from "api/EvaluationProgram";
import { getReport1, Report1Type } from "api/Report";
import { AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import Report1UI from "./UI";
interface Report1PropsType {
    evaluationProgramId: string;
    personnelId: string;
    evaluatedPersonnelId: string;
}
interface ReportDataPropsType {
    dateDate: EvaluationProgramType;
    personnelData: Report1Type;
}
function Report1(props: Report1PropsType) {
    const { evaluationProgramId, personnelId, evaluatedPersonnelId } = props;
    const [isLoadingForReport, setIsLoadingForReport] = useState(true);
    const [reportData, setReportData] = useState<ReportDataPropsType | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (evaluationProgramId && personnelId && evaluatedPersonnelId) {
            getReport1(evaluationProgramId, personnelId, evaluatedPersonnelId, (isok, res) => {
                if (isok) {
                    const data = (res as AxiosResponse).data;
                    setReportData({ dateDate: data?.[0], personnelData: data?.[1] });
                    setIsLoadingForReport(false);
                } else {
                    const errorMessage = res as AxiosErrorPersonalized;
                    enqueueSnackbar(errorMessage?.detail ?? errorMessage?.message, {
                        variant: "error"
                    });
                    setIsLoadingForReport(false);
                }
            });
        }
    }, [evaluationProgramId, personnelId, evaluatedPersonnelId]);
    if (isLoadingForReport) {
        return <CircularProgress size={40} />;
    } else {
        return (
            <>
                <Box ref={contentRef} dir="rtl">
                    {isLoadingForReport ? (
                        <CircularProgress size={40} />
                    ) : reportData ? (
                        <Report1UI
                            dateData={reportData.dateDate}
                            personnelData={reportData.personnelData}></Report1UI>
                    ) : (
                        <Typography>اطلاعات برای صدور کارنامه موجود نیست...</Typography>
                    )}
                </Box>
            </>
        );
    }
}

export default Report1;
