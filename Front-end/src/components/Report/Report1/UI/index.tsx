import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { CalanderNumber, CalanderReport } from "@share/icons";
import { EvaluationProgramType } from "api/EvaluationProgram";
import { Report1Type } from "api/Report";

function Report1UI(props: Report1UIPropsType) {
    const { dateData, personnelData } = props;
    return (
        <>
            <Grid container spacing={5}>
                <Grid item xs={12} className="d-f-j-b-a-c" container>
                    <Grid item xs={4}>
                        {" "}
                        <Typography className="d-f-j-c-a-c gap-4">
                            <span className="d-f-j-c-a-c  gap-4">
                                <CalanderNumber /> شماره :
                            </span>
                            <span style={{ fontWeight: "600" }}>
                                {personnelData?.employmentLaw}
                            </span>
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography
                            mt={-8}
                            align="center"
                            sx={{ fontWeight: "600", fontSize: "18px" }}>
                            باسمه تعالی
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography className="d-f-j-c-a-c gap-4">
                            <span className="d-f-j-c-a-c  gap-4">
                                <CalanderReport /> تاریخ :
                            </span>
                            <span style={{ fontWeight: "600" }}>
                                {personnelData?.dateTime
                                    ? new Date(
                                          Date.parse(personnelData?.dateTime)
                                      ).toLocaleDateString("fa-IR")
                                    : "---"}
                            </span>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="d-f-j-b-a-c gap-16" flexDirection={"column"}>
                    <Typography sx={{ fontSize: "18px" }}>
                        معاونت سرمایه انسانی ساحفا ودجا
                    </Typography>
                    <Typography sx={{ fontSize: "16px" }}>
                        کارنامه ارزشیابی عملکرد کارکنان سال
                        <span>
                            {personnelData?.dateTime
                                ? new Date(Date.parse(personnelData?.dateTime))
                                      .toLocaleDateString("fa-IR")
                                      .split("/")[0]
                                : "---"}
                        </span>
                    </Typography>
                    <Typography sx={{ fontSize: "16px" }}>
                        گواهی می‌شود کارمند رتبه 12 پاسدار
                        <span style={{ fontSize: "16px", fontWeight: "600" }}>
                            {personnelData?.personnelFirstName}
                        </span>{" "}
                        <span style={{ fontSize: "16px", fontWeight: "600" }}>
                            {personnelData?.personnelLastName}
                        </span>{" "}
                        تابع قانون آجا با سطح شغلی :
                        <span style={{ fontSize: "16px", fontWeight: "600" }}>
                            {personnelData?.jobPosition}
                        </span>{" "}
                        به استناد بند 3 ماده 14 و ماده 24 شیوه‌نامه ارزشیابی عملکرد کارکنان ودجا،
                        کارایی و توانایی ایشان از تاریخ
                        <span style={{ fontSize: "16px", fontWeight: "600" }}>
                            {" "}
                            {dateData?.evaluationProgramEndDate
                                ? new Date(
                                      Date.parse(dateData?.evaluationProgramEndDate)
                                  ).toLocaleDateString("fa-IR")
                                : "---"}
                        </span>{" "}
                        الی
                        <span style={{ fontSize: "16px", fontWeight: "600" }}>
                            {" "}
                            {dateData?.evaluationProgramStartDate
                                ? new Date(
                                      Date.parse(dateData?.evaluationProgramStartDate)
                                  ).toLocaleDateString("fa-IR")
                                : "---"}
                        </span>{" "}
                        مورد ازرشیابی قرار گرفت و سطح خیلی خوب(بیش از حد انتظار) را کسب نموده است.
                    </Typography>
                </Grid>
                <Grid item xs={12} />
                <Grid item xs={12} />
                <Grid item xs={12} className="d-f-j-e-a-c">
                    <Typography className="d-f-j-c-a-c" flexDirection="column">
                        معاون سرمایه انسانی ساحفاودجا
                        <span>.....</span>
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
}

export default Report1UI;
interface Report1UIPropsType {
    dateData?: EvaluationProgramType;
    personnelData?: Report1Type;
}
