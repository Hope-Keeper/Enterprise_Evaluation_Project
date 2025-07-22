import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { AxiosErrorPersonalized } from "api";
import { getCallbackViewData } from "api/KeyClock";
import { changeRole } from "api/Role";
import { AxiosResponse } from "axios";
import ReihanAutocompleteHighlight from "components/ReihanAutocompleteHighlight";
import ReihanDialog from "components/ReihanDialog";
import { Form, Formik } from "formik";
import { enqueueSnackbar } from "notistack";
import { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { RootState } from "store";
import { CurrentUserType, setCurrentUserPersonnelInfoObject } from "store/currentUser";
import { Option } from "types/components/autoCompleteHighlight";
import * as Yup from "yup";

const validForm = Yup.object().shape({
    role: Yup.object().required()
});

export const roleOption: Option[] = [
    {
        id: "0",
        title: "کاربر"
    },
    {
        id: "2",
        title: "مدیر "
    },
    {
        id: "4",
        title: "مدیر ارزشیابی"
    },
    {
        id: "5",
        title: "ارزیاب"
    }
];
function KeycloackLoginPage() {
    const location = useLocation();
    const [isOpenRoleModal, setIsOpenRoleModal] = useState<boolean>(false);
    const [validRoleOption, setValidRoleOption] = useState<Option[]>([roleOption[0]]);
    const currentUser = useSelector((state: RootState) => state.currentUser.perssonaelInfo);
    const currentUserRoles = currentUser?.roles || [];
    const dispatch = useDispatch();
    const initialValues: { role: Option | null } = {
        role: null
    };

    const setUserRole = (role: string) => {
        changeRole(role, (isok, res) => {
            if (isok) {
                const data = (res as AxiosResponse).data as CurrentUserType;
                dispatch(setCurrentUserPersonnelInfoObject(data));
                window.location.replace("/");
                setIsOpenRoleModal(false);
            } else {
                const errorMessage = (res as AxiosErrorPersonalized).message;
                enqueueSnackbar(errorMessage, { variant: "error" });
            }
        });
    };
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token || token?.length == 0) {
            getCallbackViewData(location.search, (isok, res) => {
                if (isok) {
                    const data = (res as AxiosResponse).data;
                    if (data.access_token && data.access_token.length > 0) {
                        localStorage.setItem("token", data.access_token);
                        window.location.replace(
                            localStorage.getItem("redirectToThisPage") || location.pathname
                        );
                    } else enqueueSnackbar("خطا در دریافت توکن از کی کلاک", { variant: "error" });
                } else {
                    const errorMessage = (res as AxiosErrorPersonalized).message;
                    enqueueSnackbar(errorMessage, { variant: "error" });
                }
            });
        } else {
            const validRoles: Option[] = [];
            roleOption.forEach((r) => {
                currentUserRoles.forEach((cr) => {
                    if (r.id == cr) {
                        validRoles.push(r);
                    }
                });
            });
            if (validRoles.length > 0) setValidRoleOption(validRoles);
            setIsOpenRoleModal(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    return (
        <>
            <ReihanDialog
                keepMounted
                open={isOpenRoleModal}
                handleClose={() => {
                    setUserRole("0");
                }}
                title="انتخاب نقش"
                DialogContents={
                    <>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validForm}
                            onSubmit={(values) => {
                                values.role?.id && setUserRole(values.role?.id);
                            }}
                            enableReinitialize>
                            {(formik) => {
                                const {
                                    errors,
                                    touched,
                                    values,
                                    handleBlur,
                                    setValues,
                                    setFieldTouched
                                } = formik;

                                return (
                                    <div className="container" style={{ marginTop: "20px" }}>
                                        <Form>
                                            <Grid container spacing={2}>
                                                <Grid
                                                    item
                                                    container
                                                    spacing={2}
                                                    className="d-f-j-c-s-b">
                                                    <Grid
                                                        item
                                                        container
                                                        spacing={2}
                                                        className="d-f-j-c"
                                                        xs={12}
                                                        md={12}
                                                        lg={12}
                                                        xl={12}>
                                                        <Grid item xs={12} md={5} lg={5} xl={5}>
                                                            <ReihanAutocompleteHighlight
                                                                value={values.role}
                                                                onChange={(
                                                                    _e: SyntheticEvent,
                                                                    value: Option | null
                                                                ) => {
                                                                    setValues({
                                                                        ...values,
                                                                        role: value
                                                                    });
                                                                }}
                                                                isOptionEqualToValue={(
                                                                    option: Option,
                                                                    value: Option
                                                                ) => option?.id === value?.id}
                                                                onBlur={() => {
                                                                    setFieldTouched("role", true);
                                                                    handleBlur("role");
                                                                }}
                                                                label="نقش"
                                                                getOptionLabel={(
                                                                    option: Option
                                                                ): string => option.title}
                                                                error={
                                                                    touched.role &&
                                                                    Boolean(errors.role)
                                                                }
                                                                options={validRoleOption}
                                                            />
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={12}
                                                            lg={12}
                                                            xl={12}
                                                            className="d-f-j-c">
                                                            <Button
                                                                sx={{
                                                                    minWidth: "150px"
                                                                }}
                                                                // fullWidth
                                                                type="submit"
                                                                variant="contained"
                                                                className="singleLine">
                                                                تایید
                                                            </Button>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={12}
                                                            lg={12}
                                                            xl={12}
                                                            className="d-f-j-c">
                                                            <p>
                                                                در صورت عدم انتخاب، به صورت پیش فرض
                                                                به عنوان <b>کاربر عادی</b> وارد
                                                                برنامه می‌شوید.
                                                            </p>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Form>
                                    </div>
                                );
                            }}
                        </Formik>
                    </>
                }
                maxWidth="md"
                // height="1000px"
            />
        </>
    );
}

export default KeycloackLoginPage;
