import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Typography from "@mui/material/Typography";
import { CopyIcon, DeleteFileIcon } from "@share/icons";
import { AxiosErrorPersonalized } from "api";
import { editActivationOfQuestionById, getAllQuestionsOfMeritById } from "api/Questions";
import { AxiosResponse } from "axios";
import ReihanTooltip from "components/ReihanTooltip";
import { enqueueSnackbar } from "notistack";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { openCopyQuestionModal } from "store/ReduxModalsStore/CopyQuestionModal";
import { openDeleteMeritQuestionModal } from "store/ReduxModalsStore/DeleteMeritQuestionModal";
import { openDeleteMeritQuestionsModal } from "store/ReduxModalsStore/DeleteMeritQuestionsModal";
import { QuestionSummeryType } from "types/api";
import { Option } from "types/components/autoCompleteHighlight";
import QuestionsForm from "./Form";
import QuestionsTable from "./Table";
import ReihanNoData from "components/ReihanNoData";

///import { useParams } from "react-router";

function QuestionsPage() {
    const {
        state
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
    const initialValues: QuestionFormInitialValuesType = {
        family: null,
        dimension: null,
        merit: null,
        newQuestionName: ""
    };
    const [formValues, setFormValues] = useState<QuestionFormInitialValuesType>(initialValues);
    const [selectedRows, setSelectedRows] = useState<readonly string[]>([]);
    const [currentFamily, setCurrentFamily] = useState<Option | null>(null);
    const [currentDimension, setCurrentDimension] = useState<Option | null>(null);
    const [currentMerit, setCurrentMerit] = useState<Option | null>(null);
    const [editThisRow, setEditThisRow] = useState<QuestionSummeryType | null>(null);
    const [isLoadingForQuestions, setisLoadingForQuestions] = useState<boolean>(false);
    const [questions, setQuestions] = useState<QuestionSummeryType[] | null>(null);
    const [pageAllMembers, setPageAllMembers] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(0);
    const rowsPerPage: number = 10;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const initialValues: QuestionFormInitialValuesType = {
            family: null,
            dimension: null,
            merit: null,
            newQuestionName: ""
        };

        if (currentFamily || currentDimension || currentMerit) {
            if (currentFamily) {
                initialValues.family = { id: currentFamily.id, title: currentFamily.title };
            }
            if (currentFamily && currentDimension) {
                initialValues.family = { id: currentFamily.id, title: currentFamily.title };
                initialValues.dimension = {
                    id: currentDimension.id,
                    title: currentDimension.title
                };
            }
            if (currentFamily && currentDimension && currentMerit) {
                initialValues.family = { id: currentFamily.id, title: currentFamily.title };
                initialValues.dimension = {
                    id: currentDimension.id,
                    title: currentDimension.title
                };
                initialValues.merit = {
                    title: currentMerit.title,
                    id: currentMerit.id
                };
            }
            setFormValues(initialValues);
        } else {
            if (
                state &&
                state?.familyID &&
                state?.familyName &&
                state?.dimensionId &&
                state?.dimensionTitle &&
                state?.meritId &&
                state?.meritTitle
            ) {
                initialValues.family = { id: state?.familyID, title: state?.familyName };
                initialValues.dimension = { id: state?.dimensionId, title: state?.dimensionTitle };
                initialValues.merit = { id: state?.meritId, title: state?.meritTitle };
                setFormValues(initialValues);
                setCurrentFamily({
                    id: state?.familyID,
                    title: state?.familyName
                });
                setCurrentDimension({ id: state?.dimensionId, title: state?.dimensionTitle });
                setCurrentMerit({ id: state?.meritId, title: state?.meritTitle });
            } else {
                setFormValues(initialValues);
                setCurrentFamily(null);
                setCurrentDimension(null);
                setCurrentMerit(null);
            }
        }
    }, [state, currentFamily, currentDimension, currentMerit]);

    useEffect(() => {
        if (currentMerit) {
            setisLoadingForQuestions(true);
            getAllQuestionsOfMeritById(
                currentMerit.id,
                pageAllMembers,
                rowsPerPage,
                (isok, res) => {
                    if (isok) {
                        const data = (res as AxiosResponse).data;
                        setQuestions(data["content"]);
                        setPageCount(data["totalPages"]);
                        setisLoadingForQuestions(false);
                    } else {
                        const errorMessage = res as AxiosErrorPersonalized;
                        enqueueSnackbar(errorMessage?.detail ?? errorMessage?.message, {
                            variant: "error"
                        });
                        setisLoadingForQuestions(false);
                    }
                }
            );
        }
    }, [currentMerit, pageAllMembers]);

    const getPage = (
        mode: "delete" | "usual" = "usual",
        pageAllMembers1?: number,
        rowsPerPage1?: number
    ) => {
        let page = pageAllMembers;
        if (selectedRows?.length > 0) {
            if (mode === "delete" && selectedRows?.length === questions?.length && page !== 0) {
                page = page - 1;
            }
        } else {
            if (mode === "delete" && page !== 0 && 1 === questions?.length) {
                page = page - 1;
            }
        }
        if (currentMerit) {
            setisLoadingForQuestions(true);
            getAllQuestionsOfMeritById(
                currentMerit.id,
                pageAllMembers1 ?? page,
                rowsPerPage1 ?? rowsPerPage,
                (isok, res) => {
                    if (isok) {
                        const data = (res as AxiosResponse).data;
                        setQuestions(data["content"]);
                        setPageCount(data["totalPages"]);
                        setPageAllMembers(page);
                        setSelectedRows([]);
                        setisLoadingForQuestions(false);
                    } else {
                        const errorMessage = res as AxiosErrorPersonalized;
                        enqueueSnackbar(errorMessage?.detail ?? errorMessage?.message, {
                            variant: "error"
                        });
                        setisLoadingForQuestions(false);
                    }
                }
            );
        }
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPageAllMembers(newPage - 1);
        setSelectedRows([]);
    };

    const renderNewCurrentFamily = (family: Option) => {
        setCurrentFamily(family);
        setCurrentDimension(null);
        setCurrentMerit(null);
        setQuestions([]);
    };

    const renderNewCurrentDimention = (dimension: Option) => {
        setCurrentDimension(dimension);
        setCurrentMerit(null);
        setQuestions([]);
    };

    const renderNewCurrentMerit = (merit: Option) => {
        setCurrentMerit(merit);
        navigate(location, {
            state: {
                meritId: merit.id,
                meritTitle: merit.title
            }
        });
    };

    const handleEdit = (question: QuestionSummeryType) => {
        setEditThisRow(question);
    };

    const handleSetSelectedsEmpty = () => {
        setSelectedRows([]);
    };

    const handleActivityForQuestion = (
        _isLoading: boolean,
        setIsLoading: Dispatch<SetStateAction<boolean>>,
        questionId: string,
        questionIsActive: boolean
    ) => {
        setIsLoading(true);
        editActivationOfQuestionById(questionId, questionIsActive, (isok, res) => {
            if (isok) {
                // const data = (res as AxiosResponse).data;
                const oldQuestions: QuestionSummeryType[] = JSON.parse(JSON.stringify(questions));
                const newQuestions = oldQuestions.map((item) => {
                    if (item.questionId === questionId) {
                        item.questionIsActive = questionIsActive;
                        return item;
                    }
                    return item;
                });

                setQuestions(newQuestions ?? []);

                if (questionIsActive) {
                    enqueueSnackbar("سنجه  با موفقیت فعال شد", {
                        variant: "success"
                    });
                } else {
                    enqueueSnackbar("سنجه با موفقیت غیر فعال شد", {
                        variant: "success"
                    });
                }

                setIsLoading(false);
            } else {
                const errorMessage = res as AxiosErrorPersonalized;
                enqueueSnackbar(errorMessage?.detail ?? errorMessage?.message, {
                    variant: "error"
                });
                setIsLoading(false);
            }
        });
    };

    const handleDeleteQuestion = (question: QuestionSummeryType) => {
        const q: QuestionSummeryType = JSON.parse(JSON.stringify(question));
        dispatch(
            openDeleteMeritQuestionModal({
                source_Q: q,
                getPage
            })
        );
        setSelectedRows([]);
    };

    const handleCopyQuestions = (selectedIds: readonly string[]) => {
        const qs: QuestionSummeryType[] = JSON.parse(JSON.stringify(questions));
        const selectedQuestionsForCopy: QuestionSummeryType[] = [];
        //  const rows = [...selectedIds];
        selectedIds.forEach((item: string) => {
            const question = qs?.find((q) => q.questionId === item);
            if (question) selectedQuestionsForCopy.push(question);
        });
        dispatch(
            openCopyQuestionModal({
                source: {
                    family: currentFamily,
                    dimension: currentDimension,
                    merit: currentMerit,
                    questions: selectedQuestionsForCopy
                },
                setSelectedRows: handleSetSelectedsEmpty
            })
        );
    };

    const handleDeleteQuestions = (selectedIds: readonly string[]) => {
        const selectedQuestionsForDelete: QuestionSummeryType[] = [];
        const oldQuestions: QuestionSummeryType[] = JSON.parse(JSON.stringify(questions));
        selectedIds.forEach((item: string) => {
            const question = oldQuestions?.find((q) => q.questionId === item);
            if (question) {
                selectedQuestionsForDelete.push(question);
            }
        });
        dispatch(
            openDeleteMeritQuestionsModal({
                source_Qs: selectedQuestionsForDelete,
                getPage
            })
        );
    };

    return (
        <>
            <Grid container spacing={2}>
                {/**page 1------------------------------------------------------------ */}
                <Grid item container xs={12} spacing={2} mt={0} className="d-f-j-b-a-c">
                    <Grid item xs={12}>
                        <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
                            سوالات سنجه
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <QuestionsForm
                            formValues={formValues}
                            editThisRow={editThisRow}
                            setFormValues={setFormValues}
                            setEditThisRow={setEditThisRow}
                            renderNewCurrentFamily={renderNewCurrentFamily}
                            renderNewCurrentDimension={renderNewCurrentDimention}
                            renderNewCurrentMerit={renderNewCurrentMerit}
                            setQuestions={setQuestions}
                            questions={questions}
                            getPage={getPage}
                        />
                    </Grid>
                </Grid>

                {/**table */}
                <Grid item xs={12}>
                    {isLoadingForQuestions ? (
                        <CircularProgress size={40} />
                    ) : questions?.length && currentFamily && currentDimension && currentMerit ? (
                        <QuestionsTable
                            rows={questions ?? []}
                            selected={selectedRows}
                            setSelected={setSelectedRows}
                            handleEdit={handleEdit}
                            handleDelete={handleDeleteQuestion}
                            editThisRow={editThisRow}
                            handleActivity={handleActivityForQuestion}
                            handleCopy={handleCopyQuestions}
                        />
                    ) : (
                        <ReihanNoData bgImage={true} />
                    )}
                </Grid>

                <Grid item xs={12} />

                {!!selectedRows.length && !!questions?.length && (
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: "40px",
                            left: "50%",
                            transform: "translate(-50%,-50%)",
                            alignSelf: "end"
                        }}>
                        <Grid item xs={12} container className="d-f-j-b-a-c">
                            <Grid item xs={12} className="d-f-j-c-a-c  gap-8">
                                <ReihanTooltip title="کپی" placement="top">
                                    <Button
                                        size="medium"
                                        onClick={() => {
                                            handleCopyQuestions(selectedRows);
                                        }}
                                        variant="outlined"
                                        sx={{ width: "40px", height: "40px" }}>
                                        <CopyIcon sx={{ width: "20px", height: "20px" }} />
                                    </Button>
                                </ReihanTooltip>

                                <ReihanTooltip title="حذف" placement="top">
                                    <Button
                                        size="medium"
                                        onClick={() => {
                                            handleDeleteQuestions(selectedRows);
                                        }}
                                        variant="outlined"
                                        color="error"
                                        sx={{ width: "40px", height: "40px" }}>
                                        <DeleteFileIcon sx={{ width: "20px", height: "20px" }} />
                                    </Button>
                                </ReihanTooltip>
                            </Grid>
                        </Grid>
                    </Box>
                )}

                {/**pagination */}
                <Box
                    sx={{
                        position: "absolute",
                        bottom: "20px",
                        right: "14px",
                        alignSelf: "end"
                    }}>
                    {!!pageCount && !!questions?.length && (
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
                </Box>
            </Grid>
        </>
    );
}
export default QuestionsPage;

interface QuestionFormInitialValuesType {
    family: Option | null;
    dimension: Option | null;
    merit: Option | null;
    newQuestionName: string;
}
