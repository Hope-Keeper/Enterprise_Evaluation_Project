import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import useGetFamilies from "@share/hooks/getFamilies";
import { FilePlusIcon } from "@share/icons";
import { AxiosErrorPersonalized } from "api";
import { getAllDimensions, getAllMerits } from "api/all";
import { createNewQuestionForMerit, editQuestionNameById } from "api/Questions";
import { AxiosResponse } from "axios";
import PayaAutocompleteHighlight from "components/PayaAutocompleteHighlight";
import PayaLoadingButton from "components/PayaLoadingButton";
import { Form, Formik, FormikState } from "formik";
import { enqueueSnackbar } from "notistack";
import { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent, useEffect, useState } from "react";
import { DimensionType, MeritSummeryType, QuestionSummeryType } from "types/api";
import { Option } from "types/components/autoCompleteHighlight";
import * as yup from "yup";

const validationSchema = yup.object({
    newQuestionName: yup.string().required("انتخاب این مورد الزامی است."),
    family: yup
        .object()
        .shape({
            id: yup.string().required(),
            title: yup.string().required()
        })
        .required("انتخاب این مورد الزامی است."),

    dimension: yup
        .object()
        .shape({
            id: yup.string().required(),
            title: yup.string().required()
        })
        .required("انتخاب این مورد الزامی است."),
    merit: yup
        .object()
        .shape({
            id: yup.string().required(),
            title: yup.string().required()
        })
        .required("انتخاب این مورد الزامی است.")
});

function QuestionsForm(props: QuestionsFormikPropsType) {
    const {
        formValues,
        questions,
        setQuestions,
        editThisRow,
        setEditThisRow,
        setFormValues,
        renderNewCurrentDimension,
        renderNewCurrentFamily,
        renderNewCurrentMerit,
        getPage
    } = props;
    const [familiesOption, setFamiliesOption] = useState<Option[]>([]);
    const { isLoading, families, isError } = useGetFamilies();
    const [isLoadingForEditingQuestion, setIsLoadingForEditingQuestion] = useState(false);
    const [isLoadingForCreatingQuestion, setIsLoadingForCreatingQuestion] = useState(false);
    const [meritsOption, setMeritsOption] = useState<Option[]>([]);
    const [, setisLoadingForMerits] = useState<boolean>(true);
    const [merits, setMerits] = useState<MeritSummeryType[] | null>(null);
    const [dimensionsOption, setDimensionsOption] = useState<Option[]>([]);
    const [Loading, setLoading] = useState<boolean>(true);
    const [Dimensions, setDimensions] = useState<DimensionType[] | null>(null);

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
        formValues.family &&
            getAllDimensions(formValues.family.id, (isok, res) => {
                if (isok) {
                    const data = (res as AxiosResponse).data;
                    setDimensions(data[0]?.dimensions);
                    setLoading(false);
                } else {
                    const errorMessage = res as AxiosErrorPersonalized;
                    enqueueSnackbar(errorMessage?.detail ?? errorMessage?.message, {
                        variant: "error"
                    });
                    setLoading(false);
                }
            });
    }, [Loading, formValues.family]);

    useEffect(() => {
        if (Dimensions) {
            const DimensionOptionArray: Option[] = [];
            Dimensions.map((item) => {
                DimensionOptionArray.push({
                    title: item.dimensionTitle,
                    id: item.dimensionId
                });
            });
            setDimensionsOption(DimensionOptionArray);
        }
    }, [Dimensions]);

    useEffect(() => {
        formValues.dimension &&
            getAllMerits(
                formValues.dimension.id,

                (isok, res) => {
                    if (isok) {
                        const data = (res as AxiosResponse).data;
                        setMerits(data);
                        setisLoadingForMerits(false);
                    } else {
                        const errorMessage = res as AxiosErrorPersonalized;
                        enqueueSnackbar(errorMessage?.detail ?? errorMessage?.message, {
                            variant: "error"
                        });
                        setisLoadingForMerits(false);
                    }
                }
            );
    }, [formValues.dimension]);

    useEffect(() => {
        if (merits) {
            const MeritsOptionArray: Option[] = [];
            merits.map((item) => {
                MeritsOptionArray.push({
                    title: item.meritTitle,
                    id: item.meritId
                });
            });
            setMeritsOption(MeritsOptionArray);
        }
    }, [merits]);

    useEffect(() => {
        editThisRow &&
            setFormValues((p) => {
                return { ...p, newQuestionName: editThisRow.questionContent };
            });
    }, [editThisRow, setFormValues]);

    const handleCreateNewQuestion = (
        values: FormType,
        resetForm: (nextState?: Partial<FormikState<FormType>> | undefined) => void
    ) => {
        values.merit &&
            createNewQuestionForMerit(
                (isok, res) => {
                    if (isok) {
                        //const data = (res as AxiosResponse).data;
                        getPage("usual");
                        enqueueSnackbar("سنجه جدید با موفقیت ساخته شد.", {
                            variant: "success"
                        });
                        setEditThisRow(null);
                        resetForm({ values: { ...values, newQuestionName: "" } });
                        setIsLoadingForCreatingQuestion(false);
                    } else {
                        const errorMessage = res as AxiosErrorPersonalized;
                        enqueueSnackbar(errorMessage?.detail ?? errorMessage?.message, {
                            variant: "error"
                        });
                        setIsLoadingForCreatingQuestion(false);
                    }
                },
                values.merit.id,
                values.newQuestionName
            );
    };

    const handleEditQuestionName = (
        values: FormType,
        resetForm: (nextState?: Partial<FormikState<FormType>> | undefined) => void
    ) => {
        if (editThisRow?.questionContent === values.newQuestionName) {
            enqueueSnackbar("سنجه  با موفقیت ویرایش شد", {
                variant: "success"
            });
            setEditThisRow(null);
            resetForm({ values: { ...values, newQuestionName: "" } });
            setIsLoadingForEditingQuestion(false);
        } else {
            editThisRow &&
                editQuestionNameById(
                    editThisRow?.questionId,
                    values.newQuestionName,
                    (isok, res) => {
                        if (isok) {
                            // const data = (res as AxiosResponse).data;
                            const oldQuestions: QuestionSummeryType[] = JSON.parse(
                                JSON.stringify(questions)
                            );
                            const newQuestion = oldQuestions.map((item) => {
                                if (item.questionId === editThisRow?.questionId) {
                                    item.questionContent = values?.newQuestionName;
                                }
                                return item;
                            });
                            setQuestions(newQuestion ?? []);
                            enqueueSnackbar("سنجه  با موفقیت ویرایش شد.", {
                                variant: "success"
                            });
                            setEditThisRow(null);
                            resetForm({ values: { ...values, newQuestionName: "" } });
                            setIsLoadingForEditingQuestion(false);
                        } else {
                            const errorMessage = res as AxiosErrorPersonalized;
                            enqueueSnackbar(errorMessage?.detail ?? errorMessage?.message, {
                                variant: "error"
                            });
                            setEditThisRow(null);
                            resetForm({ values: { ...values, newQuestionName: "" } });
                            setIsLoadingForEditingQuestion(false);
                        }
                    }
                );
        }
    };

    return (
        <Formik
            initialValues={formValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                editThisRow
                    ? handleEditQuestionName(values, resetForm)
                    : handleCreateNewQuestion(values, resetForm);
            }}
            enableReinitialize>
            {({ touched, errors, handleChange, values, setValues }) => (
                <Form>
                    <Grid container item className="d-f-j-b-a-c" spacing={1}>
                        <Grid item xs={12} sm={6} md={4}>
                            <PayaAutocompleteHighlight
                                fullWidth
                                label="خانواده شغلی"
                                disabled={!!editThisRow}
                                getOptionLabel={(option): string => {
                                    return option.title;
                                }}
                                onChange={(_e: SyntheticEvent, newValue: Option | null) => {
                                    if (newValue) {
                                        setValues({
                                            ...values,
                                            family: newValue,
                                            dimension: null,
                                            merit: null
                                        });
                                        renderNewCurrentFamily(newValue);
                                    }
                                }}
                                isOptionEqualToValue={(op, value) =>
                                    op.title === value.title && value.id === op.id
                                }
                                value={values.family}
                                helperText={(touched.family && errors.family) || " "}
                                error={touched.family && Boolean(errors.family)}
                                options={familiesOption}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <PayaAutocompleteHighlight
                                fullWidth
                                label="انتخاب بعد"
                                disabled={!!editThisRow}
                                getOptionLabel={(option): string => {
                                    return option.title;
                                }}
                                onChange={(_e: SyntheticEvent, newValue: Option | null) => {
                                    setValues({
                                        ...values,
                                        dimension: newValue,
                                        merit: null
                                    });
                                    if (newValue) renderNewCurrentDimension(newValue);
                                }}
                                isOptionEqualToValue={(op, value) =>
                                    op.title === value.title && value.id === op.id
                                }
                                value={values.dimension}
                                helperText={(touched.dimension && errors.dimension) || " "}
                                error={touched.dimension && Boolean(errors.dimension)}
                                options={dimensionsOption}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <PayaAutocompleteHighlight
                                fullWidth
                                label="انتخاب شایستگی"
                                disabled={!!editThisRow}
                                getOptionLabel={(option): string => {
                                    return option.title;
                                }}
                                onChange={(_e: SyntheticEvent, newValue: Option | null) => {
                                    setValues({
                                        ...values,
                                        merit: newValue
                                    });

                                    if (newValue) renderNewCurrentMerit(newValue);
                                }}
                                isOptionEqualToValue={(op, value) =>
                                    op.title === value.title && value.id === op.id
                                }
                                value={values.merit}
                                helperText={(touched.merit && errors.merit) || " "}
                                error={touched.merit && Boolean(errors.merit)}
                                options={meritsOption}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={9}>
                                    <TextField
                                        name="newQuestionName"
                                        fullWidth
                                        label="تعریف سنجه"
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                            event.target.value.length
                                                ? handleChange(event)
                                                : setValues({
                                                      ...values,
                                                      newQuestionName: ""
                                                  });
                                        }}
                                        helperText={
                                            (touched.newQuestionName && errors.newQuestionName) ||
                                            " "
                                        }
                                        error={
                                            touched.newQuestionName &&
                                            Boolean(errors.newQuestionName)
                                        }
                                        value={values.newQuestionName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    {editThisRow ? (
                                        <PayaLoadingButton
                                            fullWidth
                                            endIcon={<FilePlusIcon />}
                                            color="primary"
                                            variant="contained"
                                            type="submit"
                                            loading={isLoadingForEditingQuestion}
                                            sx={{ height: "40px" }}>
                                            ثبت ویرایش
                                        </PayaLoadingButton>
                                    ) : (
                                        <PayaLoadingButton
                                            fullWidth
                                            endIcon={<FilePlusIcon />}
                                            color="primary"
                                            variant="contained"
                                            type="submit"
                                            loading={isLoadingForCreatingQuestion}
                                            sx={{ height: "40px" }}>
                                            ثبت سوال سنجه
                                        </PayaLoadingButton>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

export default QuestionsForm;

interface FormType {
    family: Option | null;
    dimension: Option | null;
    merit: Option | null;
    newQuestionName: string;
}

interface QuestionsFormikPropsType {
    formValues: FormType;
    editThisRow: QuestionSummeryType | null;
    questions: QuestionSummeryType[] | null;
    setFormValues: Dispatch<SetStateAction<FormType>>;
    renderNewCurrentFamily: (family: Option) => void;
    renderNewCurrentDimension: (dimension: Option) => void;
    renderNewCurrentMerit: (merit: Option) => void;
    setEditThisRow: Dispatch<SetStateAction<QuestionSummeryType | null>>;
    setQuestions: Dispatch<SetStateAction<QuestionSummeryType[] | null>>;
    getPage: (mode: "delete" | "usual", pageAllMembers1?: number, rowsPerPage1?: number) => void;
}
