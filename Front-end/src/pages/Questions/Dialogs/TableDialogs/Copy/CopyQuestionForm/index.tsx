import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useGetFamilies from "@share/hooks/getFamilies";
import { CopyIcon, QuestionMarkIcon } from "@share/icons";
import { AxiosErrorPersonalized } from "api";
import { getAllDimensions, getAllMerits } from "api/all";
import { copyMeritQuestionsForOterFamily } from "api/Merits";
import { AxiosResponse } from "axios";
import ReihanAutocompleteHighlight from "components/ReihanAutocompleteHighlight";
import ReihanLoadingButton from "components/ReihanLoadingButton";
import { Form, Formik } from "formik";
import { enqueueSnackbar } from "notistack";
import { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeCopyQuestionModal } from "store/ReduxModalsStore/CopyQuestionModal";
import { DimensionType, MeritSummeryType, QuestionSummeryType } from "types/api";
import { Option } from "types/components/autoCompleteHighlight";
import * as yup from "yup";

const validationSchema = yup.object({
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

function CopyQuestionForm(props: CopyQuestionFormikPropsType) {
    const { initialValues, setSelectedRows } = props;
    const { isLoading, families, isError } = useGetFamilies();
    const [selected, setSelected] = useState<readonly string[]>([]);
    const [currentFamily, setCurrentFamily] = useState<Option | null>(initialValues.family);
    const [dimensionsOption, setDimensionsOption] = useState<Option[]>([]);
    const [Loading, setLoading] = useState<boolean>(true);
    const [Dimensions, setDimensions] = useState<DimensionType[] | null>(null);
    const [currentDimension, setCurrentDimension] = useState<Option | null>(
        initialValues.dimension
    );
    const [meritsOption, setMeritsOption] = useState<Option[]>([]);
    const [, setisLoadingForMerits] = useState<boolean>(true);
    const [merits, setMerits] = useState<MeritSummeryType[] | null>(null);
    const [isLodingForCopyQuestion, setIsLodingForCopyQuestion] = useState(false);
    const [familiesOption, setFamiliesOption] = useState<Option[]>([]);

    const dispatch = useDispatch();

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
        currentFamily &&
            getAllDimensions(currentFamily.id, (isok, res) => {
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
    }, [currentFamily]);

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
        if (currentDimension) {
            getAllMerits(currentDimension.id, (isok, res) => {
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
            });
        }
    }, [currentDimension]);

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
        const arrayOfIds: string[] = [];

        initialValues.questions &&
            initialValues.questions.forEach((element: QuestionSummeryType) => {
                arrayOfIds.push(element.questionId);
            });
        setSelected(arrayOfIds);
    }, [initialValues.questions]);

    const handleCopyQuestions = (values: InitialValuesType) => {
        if (values.merit) {
            setIsLodingForCopyQuestion(true);
            copyMeritQuestionsForOterFamily(values.merit?.id, selected.join(","), (isok, res) => {
                if (isok) {
                    //const data = (res as AxiosResponse).data;
                    setSelectedRows();
                    enqueueSnackbar("کپی  با موفقیت انجام شد", {
                        variant: "success"
                    });

                    dispatch(closeCopyQuestionModal());
                    setIsLodingForCopyQuestion(false);
                } else {
                    const errorMessage = res as AxiosErrorPersonalized;
                    enqueueSnackbar(errorMessage?.detail ?? errorMessage?.message, {
                        variant: "error"
                    });
                    setIsLodingForCopyQuestion(false);
                }
            });
        }
    };

    return (
        <Formik
            validationSchema={validationSchema}
            onSubmit={(values) => {
                handleCopyQuestions(values);
            }}
            initialValues={initialValues}>
            {({ touched, errors, values, setValues }) => {
                return (
                    <Form>
                        <Grid container>
                            <Grid item xs={12} container spacing={8}>
                                {initialValues.questions && initialValues.questions?.length > 1 ? (
                                    <Grid
                                        item
                                        container
                                        xs={12}
                                        className="d-f-j-c-a-c"
                                        spacing={5}>
                                        <Grid item xs={12} className="d-f-j-c-a-c">
                                            <QuestionMarkIcon />
                                            <Typography>
                                                {initialValues.questions.length}
                                                سنجه انتخاب شده است
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider variant="middle" />
                                        </Grid>
                                    </Grid>
                                ) : (
                                    <></>
                                )}
                                <Grid item xs={12} sm={6} md={3}>
                                    <ReihanAutocompleteHighlight
                                        loading={isLoading}
                                        loadingText="درحال بارگیری..."
                                        noOptionsText="موردی یافت نشد"
                                        fullWidth
                                        label="گروه شغلی"
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
                                                setCurrentFamily(newValue);
                                            }
                                        }}
                                        isOptionEqualToValue={(op, value) => value.id === op.id}
                                        value={values.family}
                                        helperText={touched.family && errors.family && " "}
                                        error={touched.family && Boolean(errors.family)}
                                        options={familiesOption}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <ReihanAutocompleteHighlight
                                        loading={isLoading}
                                        loadingText="درحال بارگیری..."
                                        noOptionsText="موردی یافت نشد"
                                        fullWidth
                                        label="انتخاب بعد"
                                        getOptionLabel={(option): string => {
                                            return option.title;
                                        }}
                                        onChange={(_e: SyntheticEvent, newValue: Option | null) => {
                                            if (newValue) {
                                                setValues({
                                                    ...values,
                                                    dimension: newValue
                                                });
                                                setCurrentDimension(newValue);
                                            }
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

                                <Grid item xs={12} sm={6} md={3}>
                                    <ReihanAutocompleteHighlight
                                        loading={isLoading}
                                        loadingText="درحال بارگیری..."
                                        noOptionsText="موردی یافت نشد"
                                        fullWidth
                                        label="انتخاب شایستگی"
                                        getOptionLabel={(option): string => {
                                            return option.title;
                                        }}
                                        onChange={(_e: SyntheticEvent, newValue: Option | null) => {
                                            setValues({
                                                ...values,
                                                merit: newValue
                                            });
                                        }}
                                        isOptionEqualToValue={(op, value) =>
                                            op.title === value.title && value.id === op.id
                                        }
                                        value={null}
                                        helperText={(touched.merit && errors.merit) || " "}
                                        error={touched.merit && Boolean(errors.merit)}
                                        options={meritsOption}
                                        getOptionDisabled={(option) =>
                                            option.id === initialValues.merit?.id
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <ReihanLoadingButton
                                        fullWidth
                                        disabled={
                                            !values.family ||
                                            !values.dimension ||
                                            !values.merit ||
                                            values.merit?.id === initialValues.merit?.id ||
                                            selected.length === 0
                                        }
                                        color="primary"
                                        variant="contained"
                                        loading={Loading || isLoading || isLodingForCopyQuestion}
                                        type="submit"
                                        endIcon={<CopyIcon />}>
                                        کپی برای گروه جدید
                                    </ReihanLoadingButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default CopyQuestionForm;

interface InitialValuesType {
    family: Option | null;
    dimension: Option | null;
    merit: Option | null;
    questions: QuestionSummeryType[] | null;
}

interface CopyQuestionFormikPropsType {
    initialValues: InitialValuesType;
    setSelectedRows: () => void;
}
