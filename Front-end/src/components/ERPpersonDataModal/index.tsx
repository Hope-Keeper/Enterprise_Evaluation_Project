import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { AxiosErrorPersonalized } from "api";
import { getPersonnelInformation, PersonnelType } from "api/Staff";
import { AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
interface ReihanERPpersonDataModalType {
    personnelId: string | null;
}

function ReihanERPpersonDataModal(props: ReihanERPpersonDataModalType) {
    const { personnelId } = props;
    const [information, setInformation] = useState<PersonnelType | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (personnelId) {
            getPersonnelInformation(personnelId, (isok, res) => {
                if (isok) {
                    const data: PersonnelType[] = (res as AxiosResponse).data;
                    const info: PersonnelType = { ...data[0] };
                    setInformation(info);
                    setIsLoading(false);
                } else {
                    const errorMessage = res as AxiosErrorPersonalized;
                    enqueueSnackbar(errorMessage?.detail ?? errorMessage?.message, {
                        variant: "error"
                    });
                    setIsLoading(false);
                }
            });
        }
    }, [personnelId]);

    return (
        <Grid container spacing={4}>
            {isLoading ? (
                <CircularProgress />
            ) : information ? (
                <>
                    <Grid item xs={12}>
                        <Box
                            sx={(theme) => ({
                                backgroundColor: `${theme.palette.secondary.main}11`,
                                padding: "20px",
                                border: `1px solid ${theme.palette.secondary.main}55`,
                                borderTop: `5px solid ${theme.palette.secondary.main}`,
                                borderRadius: "8px",
                                boxShadow: `0px 3px 7px 1px ${theme.palette.secondary.main}22`
                            })}>
                            <Grid item container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography fontWeight={600} fontSize="16px">
                                        اطلاعات شخصی
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} container spacing={2}>
                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            کد ملی:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelNationalCode}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            نام و نام خانوادگی:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {`${information?.personnelFirstName} ${information?.personnelLastName}`}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            نام پدر:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelFatherName}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            شماره شناسنامه:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelBirthCertificateNumber}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            تاریخ تولد:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelBirthDate
                                                ? new Date(
                                                      Date.parse(information?.personnelBirthDate)
                                                  ).toLocaleDateString("fa-IR")
                                                : "___"}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            محل تولد:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelBirthPlace}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            وضعیت تاهل:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelMaritalStatus}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            گروه خونی:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelBloodType}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            قد:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelHeight}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            وزن:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelWeight}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            رنگ چشم:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelEyeColor}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            مدرک تحصیلی:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelDegreeCode}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            رشته تحصیلی:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelMajor}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            درصد جانبازی:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelVeteranPercentage}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            وضعیت مسکن:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelHousingStatus}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            تعداد عائله:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelNumberOfDependents}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box
                            sx={(theme) => ({
                                backgroundColor: `${theme.palette.secondary.main}11`,
                                padding: "20px",
                                border: `1px solid ${theme.palette.secondary.main}55`,
                                borderTop: `5px solid ${theme.palette.secondary.main}`,
                                borderRadius: "8px",
                                boxShadow: `0px 3px 7px 1px ${theme.palette.secondary.main}22`
                            })}>
                            <Grid item container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography fontWeight={600} fontSize="16px">
                                        اطلاعات سازمانی
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} container spacing={2}>
                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            کد پرسنلی:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelId}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            وضعیت خدمتی:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelServiceStatus}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            گروه خدمتی:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelServiceUnit}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            قانون استخدام:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelEmploymentLaw}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            عضویت:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelMembership}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            وضعیت استخدام:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelEmploymentStatus}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            تاریخ استخدام:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelHireDate
                                                ? new Date(
                                                      Date.parse(information?.personnelHireDate)
                                                  ).toLocaleDateString("fa-IR")
                                                : "___"}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            تاریخ جذب در سازمان:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelDateOfJoiningOrganization
                                                ? new Date(
                                                      Date.parse(
                                                          information?.personnelDateOfJoiningOrganization
                                                      )
                                                  ).toLocaleDateString("fa-IR")
                                                : "___"}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            تاریخ بازنشستگی:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelRetirementDate
                                                ? new Date(
                                                      Date.parse(
                                                          information?.personnelRetirementDate
                                                      )
                                                  ).toLocaleDateString("fa-IR")
                                                : "___"}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            رتبه/درجه:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {`${information?.personnelRank} ${information?.personnelRankCode}`}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            تاریخ ترفیع:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelPromotionDate
                                                ? new Date(
                                                      Date.parse(
                                                          information?.personnelPromotionDate
                                                      )
                                                  ).toLocaleDateString("fa-IR")
                                                : "___"}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            نمره ارزشیابی:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelEvaluationScore}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            تعداد تشویق:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelEncouragementCount}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            تعداد تنبیه:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelPunishmentCount}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            گروه شغلی:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelJobFamilyName}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            جایگاه شغلی:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelJobPosition}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            تاریخ انتصاب:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelDateOfAppointment
                                                ? new Date(
                                                      Date.parse(
                                                          information?.personnelDateOfAppointment
                                                      )
                                                  ).toLocaleDateString("fa-IR")
                                                : "___"}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} lg={3} className="d-f-a-c gap-4">
                                        <Typography fontWeight={400} fontSize="14px">
                                            تاریخ ترفیع بعدی:
                                        </Typography>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {information?.personnelNextPromotionDate
                                                ? new Date(
                                                      Date.parse(
                                                          information?.personnelNextPromotionDate
                                                      )
                                                  ).toLocaleDateString("fa-IR")
                                                : "___"}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </>
            ) : (
                <Grid item xs={6}>
                    <Box
                        sx={(theme) => ({
                            backgroundColor: `${theme.palette.secondary.main}11`,
                            padding: "20px",
                            border: `1px solid ${theme.palette.secondary.main}55`,
                            borderRadius: "8px",
                            boxShadow: `0px 3px 7px 1px ${theme.palette.secondary.main}22`
                        })}>
                        <Typography>اطلاعات شخص مورد نظر یافت نشد...</Typography>
                    </Box>
                </Grid>
            )}
        </Grid>
    );
}

export default ReihanERPpersonDataModal;
