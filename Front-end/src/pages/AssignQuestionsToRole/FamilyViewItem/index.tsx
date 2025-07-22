import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { AxiosErrorPersonalized } from "api";
import { AllOfFamilyType } from "api/all";
import { getQuestionsOfRoleById, RoleType } from "api/Role";
import { AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { MeritType, QuestionType } from "types/api";
import { Option } from "types/components/autoCompleteHighlight";
import { AssignQuestionToRoleDocumentType } from "..";
import { BpCheckbox } from "components/CheckBox";

function FamilyViewItem(props: FamilyViewItemPropsType) {
    const { family_DMQ, setAll } = props;
    const {
        state
    }: {
        state: { role: RoleType };
    } = useLocation();
    const [rows, setRows] = useState<Option[]>([]);
    const [meritrows, setMeritRows] = useState<Option[]>([]);
    const [questionRows, setQuestionRows] = useState<Option[]>([]);
    const [selected, setSelected] = useState<string[]>([]);
    const [selectedMerits, setSelectedMerits] = useState<string[]>([]);
    const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
    const isSelected = (id: string) => selected.indexOf(id) !== -1;
    const isSelectedMerits = (id: string) => selectedMerits.indexOf(id) !== -1;
    const isSelectedQuestions = (id: string) => selectedQuestions.indexOf(id) !== -1;
    const [isDimensionSelected, setIsDimensionSelected] = useState(
        isSelected(family_DMQ.dimensionId)
    );
    const [, setIsLoadingForInitialQuestions] = useState<boolean>(true);
    const [initialQuestions, setInitialQuestions] = useState<string[]>([]); // QUESTIONS THAT USER SELECTED BEFORE
    const [assignedIds, setAssignedIds] = useState<string[]>([]);
    const [deleteIds, setDeleteIds] = useState<string[]>([]);

    useEffect(() => {
        if (state?.role) {
            getQuestionsOfRoleById(state?.role.roleId, (isok, res) => {
                if (isok) {
                    const data = (res as AxiosResponse).data;
                    setSelectedQuestions(data); //those who checked
                    setInitialQuestions(data);
                    setIsLoadingForInitialQuestions(false);
                } else {
                    const errorMessage = res as AxiosErrorPersonalized;
                    enqueueSnackbar(errorMessage?.detail ?? errorMessage?.message, {
                        variant: "error"
                    });
                    setIsLoadingForInitialQuestions(false);
                }
            });
        }
    }, [state?.role]);

    useEffect(() => {
        const newInitialSelectedQuestions: string[] = [];
        const newInitialSelectedMerit: string[] = [];
        let isDimensionSelected = false;
        family_DMQ.merits.forEach((merit: MeritType) => {
            merit.questions.forEach((question: QuestionType) => {
                if (initialQuestions.find((id) => id === question.questionId)) {
                    newInitialSelectedQuestions.push(question.questionId);
                    if (!newInitialSelectedMerit?.find((id) => id === merit.meritId)) {
                        newInitialSelectedMerit.push(merit.meritId);
                    }
                    isDimensionSelected = true;
                }
            });
        });
        setSelectedQuestions(newInitialSelectedQuestions);
        setSelectedMerits(newInitialSelectedMerit);
        setIsDimensionSelected(isDimensionSelected);
    }, [initialQuestions, family_DMQ.dimensionId, family_DMQ.merits]);

    useEffect(() => {
        const initalRows: Option[] = [];
        initalRows.push({ title: family_DMQ.dimensionTitle, id: family_DMQ.dimensionId });
        family_DMQ.merits.forEach((merit: MeritType) => {
            initalRows.push({ title: merit.meritTitle, id: merit.meritId });
            merit.questions.forEach((question: QuestionType) => {
                initalRows.push({
                    title: question.questionContent,
                    id: question.questionId
                });
            });
        });

        setRows(initalRows);
    }, [
        family_DMQ.dimensionId,
        family_DMQ.dimensionIsActive,
        family_DMQ.dimensionTitle,
        family_DMQ.merits
    ]);

    useEffect(() => {
        const initalRows: Option[] = [];
        family_DMQ.merits.forEach((merit: MeritType) => {
            initalRows.push({ title: merit.meritTitle, id: merit.meritId });
        });
        setMeritRows(initalRows);
    }, [family_DMQ.merits]);

    useEffect(() => {
        const initalRows: Option[] = [];
        family_DMQ.merits.forEach((merit: MeritType) => {
            merit.questions.forEach((question: QuestionType) => {
                initalRows.push({ title: question.questionContent, id: question.questionId });
            });
        });
        setQuestionRows(initalRows);
    }, [family_DMQ.merits]);

    //THIS FIRED WHEN USER SELECTS NEW MERIT
    useEffect(() => {
        selectedMerits.length === 0 ? setIsDimensionSelected(false) : setIsDimensionSelected(true);
        //setAllMerits((p) => selectedMerits.length + p);
        //  checkDimension();
    }, [selectedMerits]);

    //THIS FIRED WHEN USER SELECTS NEW QUESTIONS

    useEffect(() => {
        setAll((p) => {
            return {
                ...p,
                [family_DMQ.dimensionId]: {
                    allMerits: selectedMerits.length,
                    allQuestions: selectedQuestions.length,
                    allDimensions: isDimensionSelected ? 1 : 0,
                    Qs: selectedQuestions,
                    questionsForAssigned: assignedIds,
                    questionsForDelete: deleteIds
                }
            };
        });
    }, [
        assignedIds,
        deleteIds,
        isDimensionSelected,
        family_DMQ.dimensionId,
        selectedMerits,
        selectedQuestions,
        setAll
    ]);

    const handleClick = (_event: unknown, id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((row) => row.id);
            /////////////////////////////////////////new ?
            const newQuestionSelected = questionRows.map((QRow) => QRow.id);
            ///selecting all
            const newMeritsSelected = meritrows.map((MRow) => MRow.id);
            // if question does not exist in initial we put it to assingQuestion
            const newAssignedIds: string[] = [];
            questionRows.forEach((QRow) => {
                if (newAssignedIds.findIndex((item) => item === QRow.id) === -1) {
                    newAssignedIds.push(QRow.id);
                }
            });
            /////////////////////////////////////////////////////////////////////////////
            setSelected(newSelected);
            setSelectedMerits(newMeritsSelected);
            setSelectedQuestions(newQuestionSelected);
            setAssignedIds(newAssignedIds);
            setDeleteIds([]);
            setIsDimensionSelected((p) => !p);
            return;
        } else {
            setSelected([]);
            setSelectedQuestions([]);
            /////////////////////////////////////////new ?
            setAssignedIds([]);
            //if un checked questions exists on initial questions then we put it on deleteIds
            const newDeleteIds: string[] = [];
            questionRows.forEach((QRow) => {
                if (selectedQuestions.findIndex((item) => item === QRow.id) !== -1) {
                    newDeleteIds.push(QRow.id);
                }
            });
            setDeleteIds(newDeleteIds);
            /////////////////////////////////////////////////////////////////////////////
            setIsDimensionSelected((p) => !p);
            setSelectedMerits([]);
        }
    };

    const handleClickOnMerit = (
        event: ChangeEvent<HTMLInputElement>,
        id: string,
        questions: QuestionType[]
    ) => {
        const selectedMeritsIndex = selectedMerits.indexOf(id);
        let newSelectedMerits: string[] = [];

        if (selectedMeritsIndex === -1) {
            newSelectedMerits = newSelectedMerits.concat(selectedMerits, id);
        } else if (selectedMeritsIndex === 0) {
            newSelectedMerits = newSelectedMerits.concat(selectedMerits.slice(1));
        } else if (selectedMeritsIndex === selectedMerits.length - 1) {
            newSelectedMerits = newSelectedMerits.concat(selectedMerits.slice(0, -1));
        } else if (selectedMeritsIndex > 0) {
            newSelectedMerits = newSelectedMerits.concat(
                selectedMerits.slice(0, selectedMeritsIndex),
                selectedMerits.slice(selectedMeritsIndex + 1)
            );
        }
        const newIsDimensionSelected = selectedMerits.length === 0 ? false : true;
        setSelectedMerits(newSelectedMerits);
        if (event.target.checked) {
            const newAssignedIds = assignedIds;
            let newDeleteIds = deleteIds;
            const newSelected = questions.map((row) => row.questionId);
            questions.forEach(({ questionId }) => {
                newDeleteIds = newDeleteIds?.filter((item) => item !== questionId);
                if (newAssignedIds.findIndex((item) => item === questionId) === -1) {
                    newAssignedIds?.push(questionId);
                }
            });

            setIsDimensionSelected(newIsDimensionSelected);
            setSelectedQuestions((p) => [...p, ...newSelected]);
            setAssignedIds(newAssignedIds);
            setDeleteIds(newDeleteIds);
            return;
        } else {
            let newAssignedIds = assignedIds;
            const newDeleteIds = deleteIds;

            let newSelectedQuestions: string[] = selectedQuestions;
            questions.forEach((q) => {
                newSelectedQuestions = newSelectedQuestions.filter((sq) => sq !== q.questionId);

                // if doesn't exit on initials
                // remove it from assined
                newAssignedIds = newAssignedIds.filter((item) => item !== q.questionId);

                //if it was in assignedQuestions before

                newDeleteIds?.push(q.questionId);
            });

            setSelectedQuestions(newSelectedQuestions);
            setAssignedIds(newAssignedIds);
            setDeleteIds(newDeleteIds);
        }
    };

    const handleClickOnQuestion = (
        event: ChangeEvent<HTMLInputElement>,
        id: string,
        meritId: string
    ) => {
        const selectedQuestionsIndex = selectedQuestions.indexOf(id);
        let newSelectedQuestions: string[] = [];

        if (selectedQuestionsIndex === -1) {
            newSelectedQuestions = newSelectedQuestions.concat(selectedQuestions, id);
        } else if (selectedQuestionsIndex === 0) {
            newSelectedQuestions = newSelectedQuestions.concat(selectedQuestions.slice(1));
        } else if (selectedQuestionsIndex === selectedQuestions.length - 1) {
            newSelectedQuestions = newSelectedQuestions.concat(selectedQuestions.slice(0, -1));
        } else if (selectedQuestionsIndex > 0) {
            newSelectedQuestions = newSelectedQuestions.concat(
                selectedQuestions.slice(0, selectedQuestionsIndex),
                selectedQuestions.slice(selectedQuestionsIndex + 1)
            );
        }
        setSelectedQuestions(newSelectedQuestions);
        // if a question checked
        if (event.target.checked) {
            //first we remove it from deledeleted
            let newDeleteIds = deleteIds;
            const newAssignedIds = assignedIds;
            //if it was not in assignedQuestions before
            newDeleteIds = newDeleteIds?.filter((item) => item !== id);
            if (newAssignedIds.findIndex((item) => item === id) === -1) {
                newAssignedIds?.push(id);
            } //else nothing happend

            //////////////////merit logic
            //if meritId wasn t in cheched before
            if (selectedMerits.findIndex((item) => item === meritId) === -1) {
                //if dosn't exist

                setSelectedMerits((p) => [...p, meritId]);
            }
            setAssignedIds(newAssignedIds);
            setDeleteIds(newDeleteIds);

            //////////////////merit logic
        } else {
            // if a question unchecked
            //if it was not in assignedQuestions before
            let newAssignedIds = assignedIds;
            const newDeleteIds = deleteIds;

            // remove it from assined
            newAssignedIds = newAssignedIds.filter((item) => item !== id);
            if (newDeleteIds.findIndex((item) => item === id) === -1) {
                //if it was in assignedQuestions before
                newDeleteIds?.push(id);
            }

            //////////////////merit logic
            const merit = family_DMQ.merits.find((item) => item.meritId === meritId);
            let i = 0;
            const meritQuestionIds = merit?.questions.map((item) => item.questionId);
            meritQuestionIds?.forEach((questionId: string) => {
                newSelectedQuestions.forEach((sq) => {
                    if (sq === questionId) {
                        i++;
                    }
                });
            });
            if (i === 0) {
                const newSelectedMerits = selectedMerits.filter((item) => item !== meritId);

                setSelectedMerits(newSelectedMerits);
                // setAssignedIds(newAssignedIds);
                // setDeleteIds(newDeleteIds);
            } else if (i === meritQuestionIds?.length) {
                setSelectedMerits((p) => [...p, meritId]);
            }
            setAssignedIds(newAssignedIds);
            setDeleteIds(newDeleteIds);
            /////////////////////merit logic
        }
    };

    return (
        <>
            <Box>
                <Grid container className="d-f-j-c-a-s">
                    <Grid item xs={3} className="d-f-j-s-a-c">
                        <BpCheckbox
                            disabled={family_DMQ.merits.length === 0}
                            onChange={(event) => {
                                handleClick(event, family_DMQ.dimensionId);
                                handleSelectAllClick(event);
                            }}
                            color="primary"
                            checked={isDimensionSelected}
                        />
                        <Typography
                            sx={{
                                opacity: !questionRows.length ? "0.5" : "1"
                            }}>
                            {family_DMQ.dimensionTitle}
                        </Typography>
                    </Grid>

                    <Grid item xs={9} container>
                        {family_DMQ.merits.map((Mitem, index) => {
                            const isMItemSelected = isSelectedMerits(Mitem.meritId);
                            // /const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <>
                                    <Grid
                                        key={Mitem.meritId}
                                        item
                                        xs={12}
                                        container
                                        className="d-f-j-c-a-s">
                                        <Grid item xs={3} className="d-f-j-s-a-c">
                                            <BpCheckbox
                                                onChange={(event) => {
                                                    handleClickOnMerit(
                                                        event,
                                                        Mitem.meritId,
                                                        Mitem.questions
                                                    );
                                                }}
                                                color="primary"
                                                checked={isMItemSelected}
                                            />
                                            <Typography
                                                sx={{ opacity: Mitem.meritIsActive ? "1" : "0.5" }}>
                                                {index + 1}
                                                {" - "}
                                                {Mitem.meritTitle}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={9}>
                                            {Mitem.questions.map((Qitem, i) => {
                                                const isQItemSelected = isSelectedQuestions(
                                                    Qitem.questionId
                                                );
                                                //const isQuestionSelectedBefor=
                                                //const labelId = `enhanced-table-checkbox-${i}`;

                                                return (
                                                    <Grid
                                                        item
                                                        xs={10}
                                                        className="d-f-j-s-a-c"
                                                        key={Qitem.questionId}>
                                                        <BpCheckbox
                                                            onChange={(event) => {
                                                                handleClickOnQuestion(
                                                                    event,
                                                                    Qitem.questionId,
                                                                    Mitem.meritId
                                                                );
                                                            }}
                                                            color="primary"
                                                            checked={isQItemSelected}
                                                        />
                                                        <Typography
                                                            margin={1}
                                                            sx={{
                                                                opacity: Qitem.questionIsActive
                                                                    ? "1"
                                                                    : "0.5"
                                                            }}>
                                                            {i + 1}
                                                            {" - "}
                                                            {Qitem.questionContent}
                                                        </Typography>
                                                        {i !== Mitem.questions.length - 1 && (
                                                            <Divider />
                                                        )}
                                                    </Grid>
                                                );
                                            })}
                                        </Grid>
                                        {family_DMQ.meritCount - 1 !== index && (
                                            <Grid item xs={12}>
                                                <Divider />
                                            </Grid>
                                        )}
                                    </Grid>
                                </>
                            );
                        })}
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
export default FamilyViewItem;

interface FamilyViewItemPropsType {
    family_DMQ: AllOfFamilyType;
    allInfo: AssignQuestionToRoleDocumentType | null;
    setAll: Dispatch<SetStateAction<AssignQuestionToRoleDocumentType | null>>;
}
