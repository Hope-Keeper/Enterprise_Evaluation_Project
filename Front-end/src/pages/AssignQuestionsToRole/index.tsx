import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Typography from "@mui/material/Typography";
import useGetFamilies from "@share/hooks/getFamilies";
import { FlappyIcon } from "@share/icons";
import { AxiosErrorPersonalized } from "api";
import { AllOfFamilyType, getAllOfFamilyById } from "api/all";
import { assignQuestionsToRole, RoleType } from "api/Role";
import { AxiosResponse } from "axios";
import PayaAccordion from "components/PayaAccordion";
import PayaAutocompleteHighlight from "components/PayaAutocompleteHighlight";
import PayaLoadingButton from "components/PayaLoadingButton";
import { enqueueSnackbar } from "notistack";
import { SyntheticEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { RootState } from "store";
import { DimensionType } from "types/api";
import { Option } from "types/components/autoCompleteHighlight";
import FamilyViewItem from "./FamilyViewItem";
import Styles from "./styles";

function AssignQuestionToRole() {
    const {
        state
    }: {
        state: { role: RoleType };
    } = useLocation();
    const layoutState = useSelector((state: RootState) => state.layout);
    const { isLoading, families, isError } = useGetFamilies();
    const [familiesOption, setFamiliesOption] = useState<Option[]>([]);
    const [allNumbers, setAllNumbers] = useState<{ allQs: number; allMs: number; allDs: number }>({
        allQs: 0,
        allMs: 0,
        allDs: 0
    });
    const [role, setRole] = useState<RoleType | null>(null);
    const [all, setAll] = useState<AssignQuestionToRoleDocumentType | null>(null);
    const [questionIdsForAssigned, setQuestionIdsForAssigned] = useState<string>("");
    const [questionIdsForDelete, setQuestionIdsForDelete] = useState<string>("");
    const [currentFamily, setCurrentFamily] = useState<Option | null>(null);
    const [, setIsLodingForGetAllOfFamily] = useState(false);
    const [familyDimensions, setFamilyDimensions] = useState<AllOfFamilyType[]>([]);
    const [isLodingForAssinging, setIsLoadingForAssinging] = useState(false);
    const [pageAllMembers, setPageAllMembers] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(0);
    const rowsPerPage: number = 5;

    useEffect(() => {
        if (state && state?.role) {
            setRole(state?.role);
        }
    }, [state]);

    useEffect(() => {
        if (families && !isError && !isLoading) {
            const familiesOptionArray: Option[] = [];
            families.map((item) => {
                familiesOptionArray.push({
                    title: item.jobFamilyName,
                    id: item.jobFamilyId
                });
            });
            setFamiliesOption(familiesOptionArray);
        }
    }, [families, isError, isLoading]);

    useEffect(() => {
        if (currentFamily) {
            getAllOfFamilyById(currentFamily.id, pageAllMembers, rowsPerPage, (isok, res) => {
                if (isok) {
                    const data = (res as AxiosResponse).data;
                    setFamilyDimensions(data["content"]);
                    setPageCount(data["totalPages"]);
                    setIsLodingForGetAllOfFamily(false);
                } else {
                    const errorMessage = res as AxiosErrorPersonalized;
                    enqueueSnackbar(errorMessage?.detail ?? errorMessage?.message, {
                        variant: "error"
                    });
                    setIsLodingForGetAllOfFamily(false);
                }
            });
        }
    }, [currentFamily, pageAllMembers]);

    useEffect(() => {
        const newAll: AssignQuestionToRoleDocumentType = {};
        familyDimensions?.length &&
            familyDimensions?.forEach((item: DimensionType) => {
                newAll[item.dimensionId] = {
                    allDimensions: 0,
                    allMerits: 0,
                    allQuestions: 0,
                    Qs: [],
                    questionsForAssigned: [],
                    questionsForDelete: []
                };
            });
        setAll(newAll);
    }, [familyDimensions]);

    useEffect(() => {
        let allQs = 0;
        let allMs = 0;
        let allDs = 0;
        let qs: string[] = [];
        let aqs: string[] = [];
        let dqs: string[] = [];

        for (const a in all) {
            allQs += all[a].allQuestions;
            allMs += all[a].allMerits;
            allDs += all[a].allDimensions;
            qs = qs.concat(all[a].Qs);
            aqs = aqs.concat(all[a].questionsForAssigned);
            dqs = dqs.concat(all[a].questionsForDelete);
        }
        setAllNumbers({ allQs, allMs, allDs });
        setQuestionIdsForAssigned(aqs.join(","));
        setQuestionIdsForDelete(dqs.join(","));
    }, [all]);

    const handleAssignQuestionsToRole = (roleId: string) => {
        setIsLoadingForAssinging(true);
        assignQuestionsToRole(roleId, questionIdsForAssigned, questionIdsForDelete, (isok, res) => {
            if (isok) {
                //const data = (res as AxiosResponse).data;
                enqueueSnackbar("عملیات الصاق  با موفقیت انجام شد", {
                    variant: "success"
                });

                setIsLoadingForAssinging(false);
            } else {
                const errorMessage = res as AxiosErrorPersonalized;
                enqueueSnackbar(errorMessage?.detail ?? errorMessage?.message, {
                    variant: "error"
                });
                setIsLoadingForAssinging(false);
            }
        });
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPageAllMembers(newPage - 1);
    };

    return (
        <Styles>
            <Grid container spacing={2} m={0}>
                <Grid item xs={12} container className="d-f-j-s-a-c" spacing={2} mt={0}>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
                            اختصاص سوالات به نقش {role?.roleTitle} با ضریب
                            {role?.roleCoefficient}
                        </Typography>
                    </Grid>
                    <Grid item xs={10} md={5}>
                        <PayaAutocompleteHighlight
                            fullWidth
                            disableClearable
                            label="خانواده شغلی"
                            loading={isLoading}
                            getOptionLabel={(option: Option): string => option.title}
                            onChange={(_e: SyntheticEvent, newValue: Option | null) => {
                                if (newValue) {
                                    setCurrentFamily(newValue);
                                }
                            }}
                            value={currentFamily}
                            options={familiesOption}
                        />
                    </Grid>
                    <Grid item xs={12} />
                </Grid>
                {/**table */}
                <Grid item xs={12} container spacing={2}>
                    <Box
                        className="main"
                        sx={{
                            height: `calc(100vh - 380px - ${layoutState.footerHeight} - ${layoutState.headerHeight})`,
                            maxHeight: `calc(100vh - 380px - ${layoutState.footerHeight} - ${layoutState.headerHeight})`,
                            overflow: "auto",
                            width: "100%",
                            marginTop: "20px",
                            padding: "20px"
                        }}>
                        <Grid container spacing={2}>
                            {isLoading ? (
                                <CircularProgress size={40} />
                            ) : (
                                !!familyDimensions?.length &&
                                familyDimensions?.map((item: DimensionType) => {
                                    return (
                                        <Grid item xs={12} key={item.dimensionId}>
                                            <PayaAccordion
                                                sx={{
                                                    backgroundColor: item.dimensionIsActive
                                                        ? ""
                                                        : "#C5C7CD",
                                                    border: item.dimensionIsActive
                                                        ? ""
                                                        : "1px solid #C5C7CD"
                                                }}
                                                summeryContent={
                                                    <Grid
                                                        container
                                                        spacing={2}
                                                        className="d-f-j-s-a-c">
                                                        <Grid item xs={12} sm={6} md={2}>
                                                            <Typography>
                                                                {item.dimensionTitle}
                                                            </Typography>
                                                        </Grid>

                                                        <Grid item xs={12} sm={6} md={2}>
                                                            <Typography className="d-f-j-s-a-c gap-8">
                                                                شایستگی ها{" "}
                                                                <Badge
                                                                    sx={{
                                                                        width: "30px",
                                                                        height: "30px"
                                                                    }}
                                                                    badgeContent={
                                                                        <span
                                                                            style={{
                                                                                fontWeight: "600",
                                                                                fontSize: "16px"
                                                                            }}>
                                                                            {item.meritCount}
                                                                        </span>
                                                                    }
                                                                    max={100}
                                                                    color="primary"
                                                                />
                                                            </Typography>
                                                        </Grid>

                                                        <Grid item xs={12} sm={6} md={2}>
                                                            <Typography className="d-f-j-s-a-c gap-8">
                                                                سنجه ها{" "}
                                                                <Badge
                                                                    sx={{
                                                                        width: "30px",
                                                                        height: "30px"
                                                                    }}
                                                                    badgeContent={
                                                                        <span
                                                                            style={{
                                                                                fontWeight: "600",
                                                                                fontSize: "16px"
                                                                            }}>
                                                                            {item.questionCount}
                                                                        </span>
                                                                    }
                                                                    max={100}
                                                                    color="primary"
                                                                />
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                }
                                                children={
                                                    <>
                                                        <FamilyViewItem
                                                            family_DMQ={{
                                                                dimensionTitle: item.dimensionTitle,
                                                                dimensionId: item.dimensionId,
                                                                dimensionIsActive:
                                                                    item.dimensionIsActive,
                                                                meritCount: item.meritCount,
                                                                merits: item.merits
                                                            }}
                                                            allInfo={all}
                                                            setAll={setAll}
                                                        />
                                                    </>
                                                }></PayaAccordion>
                                        </Grid>
                                    );
                                })
                            )}
                        </Grid>
                    </Box>
                </Grid>

                <Grid item xs={12} className="d-f-j-c-a-c">
                    {currentFamily && (
                        <>
                            <Grid container className="d-f-j-b-a-c" spacing={2}>
                                <Grid item xs={12} sm={6} md={3} className="d-f-j-c-a-c">
                                    <Box
                                        className="d-f-j-c-a-c gap-8"
                                        sx={{
                                            width: "fit-content",
                                            padding: "7px 16px 7px 12px",
                                            border: "2px solid #95BDFF",
                                            borderRadius: "4px"
                                        }}>
                                        <Typography>مجموع تعداد بعد سوالات:</Typography>
                                        <Badge
                                            sx={{ width: "30px", height: "30px" }}
                                            badgeContent={<span>{allNumbers.allDs}</span>}
                                            max={100}
                                            color="primary"
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} className="d-f-j-c-a-c">
                                    <Box
                                        className="d-f-j-c-a-c gap-8"
                                        sx={{
                                            width: "fit-content",
                                            padding: "7px 16px 7px 12px",
                                            border: "2px solid #95BDFF",
                                            borderRadius: "4px"
                                        }}>
                                        <Typography>مجموع تعداد شایستگی سوالات:</Typography>
                                        <Badge
                                            sx={{ width: "30px", height: "30px" }}
                                            badgeContent={<span>{allNumbers.allMs}</span>}
                                            max={100}
                                            color="primary"
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3} className="d-f-j-c-a-c">
                                    <Box
                                        className="d-f-j-c-a-c gap-8"
                                        sx={{
                                            width: "fit-content",

                                            padding: "7px 16px 7px 12px",
                                            border: "2px solid #95BDFF",
                                            borderRadius: "4px"
                                        }}>
                                        <Typography>مجموع تعداد سنجه سوالات:</Typography>
                                        <Badge
                                            sx={{ width: "30px", height: "30px" }}
                                            badgeContent={<span>{allNumbers.allQs}</span>}
                                            max={100}
                                            color="primary"
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} className="d-f-j-c-a-c" mt={1}>
                                    <PayaLoadingButton
                                        size="medium"
                                        color="primary"
                                        variant="contained"
                                        loading={isLoading || isLodingForAssinging}
                                        onClick={() => {
                                            handleAssignQuestionsToRole(state.role.roleId);
                                        }}
                                        endIcon={<FlappyIcon />}
                                        loadingPosition="end">
                                        ثبت
                                    </PayaLoadingButton>
                                </Grid>
                                <Grid item xs={12} className="d-f-j-S-a-c" mt={1}>
                                    {!!pageCount && (
                                        <Pagination
                                            page={pageAllMembers + 1}
                                            className="pagination stick-bottom"
                                            renderItem={(item) => (
                                                <PaginationItem
                                                    slots={{
                                                        previous: ArrowForwardIosIcon,
                                                        next: ArrowBackIosNewIcon
                                                    }}
                                                    {...item}
                                                />
                                            )}
                                            onChange={handleChangePage}
                                            count={pageCount}
                                            dir="ltr"
                                            color="primary"
                                            shape="rounded"
                                        />
                                    )}
                                </Grid>
                            </Grid>
                        </>
                    )}
                </Grid>
            </Grid>
        </Styles>
    );
}

export default AssignQuestionToRole;

export interface AssignQuestionToRoleDocumentType {
    [x: string]: {
        allDimensions: number;
        allMerits: number;
        allQuestions: number;
        Qs: string[];
        questionsForAssigned: string[];
        questionsForDelete: string[];
    };
}
