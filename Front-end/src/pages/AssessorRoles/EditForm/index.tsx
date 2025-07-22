import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { PersonsIcon } from "@share/icons";
import { AxiosErrorPersonalized } from "api";
import { createNewRole, editRoleById, RoleType } from "api/Role";
import { AxiosResponse } from "axios";
import PayaLoadingButton from "components/PayaLoadingButton";
import { Form, Formik, FormikState } from "formik";
import { enqueueSnackbar } from "notistack";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import * as yup from "yup";

const validationSchema = yup.object({
    roleTitle: yup.string().required("وارد کردن عنوان نقش ضروری است"),
    roleCoefficient: yup.string().required("وارد کردن ضریب نقش ضروری است")
});

function AssessorRolesForm(props: AssessorRolesFormikPropsType) {
    const { formValues, roles, setRoles, editThisRow, setEditThisRow } = props;
    const [formMyValues, setMyForm] = useState(formValues);
    const [isLoadingForCreatingRole, setIsLoadingForCreatingRole] = useState(false);
    const [isLoadingForEditingRole, setIsLoadingForEditingRole] = useState(false);

    useEffect(() => {
        if (editThisRow) {
            setMyForm({
                roleTitle: editThisRow.roleTitle,
                roleCoefficient: editThisRow.roleCoefficient.toString()
            });
        }
    }, [editThisRow, editThisRow?.roleId, formValues]);

    const handleCreateNewRole = (
        values: FormType,
        resetForm: (nextState?: Partial<FormikState<FormType>> | undefined) => void
    ) => {
        values.roleTitle &&
            values.roleCoefficient &&
            createNewRole(values.roleTitle, Number(values.roleCoefficient), true, (isok, res) => {
                if (isok) {
                    const data: RoleType = (res as AxiosResponse).data;
                    const oldRoles: RoleType[] = JSON.parse(JSON.stringify(roles));
                    const newRoles = [
                        ...oldRoles,
                        {
                            roleId: data.roleId,
                            roleTitle: data.roleTitle,
                            roleIsActive: data.roleIsActive,
                            roleCoefficient: data.roleCoefficient,
                            updatePermission: data.updatePermission
                        }
                    ];
                    setRoles(newRoles);
                    enqueueSnackbar("نقش جدید با موفقیت ساخته شد", {
                        variant: "success"
                    });
                    setEditThisRow(null);
                    resetForm({ values: { roleTitle: "", roleCoefficient: "" } });
                    setIsLoadingForCreatingRole(false);
                } else {
                    const errorMessage = res as AxiosErrorPersonalized;
                    enqueueSnackbar(errorMessage?.detail ?? errorMessage?.message, {
                        variant: "error"
                    });
                    setEditThisRow(null);
                    resetForm({ values: { roleTitle: "", roleCoefficient: "" } });
                    setIsLoadingForCreatingRole(false);
                }
            });
    };

    const handleEditRole = (
        values: FormType,
        resetForm: (nextState?: Partial<FormikState<FormType>> | undefined) => void
    ) => {
        if (editThisRow && values.roleTitle && values.roleCoefficient) {
            editRoleById(
                (isok, res) => {
                    if (isok) {
                        //const data = (res as AxiosResponse).data;
                        const oldRoles: RoleType[] = JSON.parse(JSON.stringify(roles));
                        const newRoles = oldRoles?.map((item) => {
                            if (
                                item.roleId === editThisRow?.roleId &&
                                values.roleTitle !== null &&
                                values.roleCoefficient !== null
                            ) {
                                item.roleTitle = values.roleTitle;
                                item.roleCoefficient = Number(values.roleCoefficient);
                            }
                            return item;
                        });

                        setRoles(newRoles);
                        enqueueSnackbar("نقش  با موفقیت ویرایش شد", {
                            variant: "success"
                        });
                        setEditThisRow(null);
                        resetForm({ values: { roleTitle: "", roleCoefficient: "" } });
                        setIsLoadingForEditingRole(false);
                    } else {
                        const errorMessage = res as AxiosErrorPersonalized;
                        enqueueSnackbar(errorMessage?.detail ?? errorMessage?.message, {
                            variant: "error"
                        });
                        resetForm({ values: { roleTitle: "", roleCoefficient: "" } });
                        setEditThisRow(null);
                        setIsLoadingForEditingRole(false);
                    }
                },
                editThisRow?.roleId,
                values.roleTitle,
                Number(values.roleCoefficient)
            );
        }
    };

    return (
        <Formik
            initialValues={formMyValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                editThisRow
                    ? handleEditRole(values, resetForm)
                    : handleCreateNewRole(values, resetForm);
            }}
            enableReinitialize>
            {({ touched, errors, handleChange, values, setValues }) => {
                return (
                    <Form>
                        <Grid container>
                            <Grid item container spacing={2} mt={0} className="d-f-j-e">
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        fullWidth
                                        name="roleTitle"
                                        label="عنوان نقش"
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                            event.target.value.length
                                                ? handleChange(event)
                                                : setValues({
                                                      ...values,
                                                      roleTitle: event.target.value
                                                  });
                                        }}
                                        helperText={(touched.roleTitle && errors.roleTitle) || " "}
                                        error={touched.roleTitle && Boolean(errors.roleTitle)}
                                        value={values.roleTitle}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        fullWidth
                                        name="roleCoefficient"
                                        label="ضریب نقش"
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                            event.target.value.length
                                                ? handleChange(event)
                                                : setValues({
                                                      ...values,
                                                      //new
                                                      roleCoefficient: event.target.value
                                                  });
                                        }}
                                        helperText={
                                            (touched.roleCoefficient && errors.roleCoefficient) ||
                                            " "
                                        }
                                        error={
                                            touched.roleCoefficient &&
                                            Boolean(errors.roleCoefficient)
                                        }
                                        value={values.roleCoefficient?.toString() ?? ""}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4} md={2} className="d-f-j-e-a-s">
                                    {editThisRow ? (
                                        <PayaLoadingButton
                                            size="medium"
                                            color="primary"
                                            variant="contained"
                                            type="submit"
                                            loading={isLoadingForEditingRole}>
                                            ثبت ویرایش
                                        </PayaLoadingButton>
                                    ) : (
                                        <PayaLoadingButton
                                            size="medium"
                                            endIcon={<PersonsIcon />}
                                            color="primary"
                                            variant="contained"
                                            type="submit"
                                            loading={isLoadingForCreatingRole}>
                                            ثبت نقش
                                        </PayaLoadingButton>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default AssessorRolesForm;

interface FormType {
    roleTitle: string | null;
    roleCoefficient: string | null;
}

interface AssessorRolesFormikPropsType {
    roles: RoleType[] | null;
    formValues: FormType;
    editThisRow: RoleType | null;
    setFormValues: Dispatch<SetStateAction<FormType>>;
    setRoles: Dispatch<SetStateAction<RoleType[] | null>>;
    setEditThisRow: Dispatch<SetStateAction<RoleType | null>>;
}
