import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { AxiosErrorPersonalized } from "api";
import { editRoleById, getAllRoles, RoleType } from "api/Role";
import { AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { openDeleteRoleModal } from "store/ReduxModalsStore/DeleteRoleModal";
import AssessorRolesForm from "./EditForm";
import AssessorRolesTable from "./Table";

function AssessorRoles() {
    const [editThisRow, setEditThisRow] = useState<RoleType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [roles, setRoles] = useState<RoleType[] | null>(null);
    const initialValues: AssessorRolesFormInitialValuesType = {
        roleTitle: editThisRow?.roleTitle || "",
        roleCoefficient: editThisRow?.roleCoefficient?.toString() ?? null
    };
    const [formValues, setFormValues] = useState<AssessorRolesFormInitialValuesType>(initialValues);
    const [sumOfRolesCoefficient, setSumOfRolesCoefficient] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        const sum = roles?.reduce((p, c) => p + (c.roleIsActive ? c.roleCoefficient : 0), 0);
        if (sum !== undefined) setSumOfRolesCoefficient(sum);
    }, [roles]);

    useEffect(() => {
        getAllRoles((isok, res) => {
            if (isok) {
                const data = (res as AxiosResponse).data;
                setRoles(data);
                setIsLoading(false);
            } else {
                const errorMessage = res as AxiosErrorPersonalized;
                enqueueSnackbar(errorMessage?.detail ?? errorMessage?.message, {
                    variant: "error"
                });
                setIsLoading(false);
            }
        });
    }, []);

    const handleEdit = (role: RoleType) => {
        setEditThisRow(role);
    };

    const handleDelete = (role: RoleType) => {
        dispatch(
            openDeleteRoleModal({
                source_Role: role,
                roles,
                setRoles
            })
        );
    };

    const handleActivityForRole = (
        _isLoading: boolean,
        setIsLoading: Dispatch<SetStateAction<boolean>>,
        role: RoleType,
        roleIsActive: boolean
    ) => {
        setIsLoading(true);
        editRoleById(
            (isok, res) => {
                if (isok) {
                    //const data = (res as AxiosResponse).data;
                    const oldRoles: RoleType[] = JSON.parse(JSON.stringify(roles));
                    const newRoles = oldRoles?.map((item) => {
                        if (item.roleId === role.roleId) {
                            item.roleIsActive = roleIsActive; //data.roleIsActive
                        }
                        return item;
                    });
                    setRoles(newRoles ?? []);
                    if (roleIsActive) {
                        enqueueSnackbar("نقش  با موفقیت  فعال شد", {
                            variant: "success"
                        });
                    } else {
                        enqueueSnackbar("نقش  با موفقیت  غیرفعال شد", {
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
            },
            role.roleId,
            role.roleTitle,
            role.roleCoefficient,
            roleIsActive
        );
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} container className="d-f-j-c-a-c">
                <Grid item xs={3} className="d-f-j-s-a-s" pb={"16px"}>
                    <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
                        نقش های ارزیاب
                    </Typography>
                </Grid>
                <Grid item xs={9}>
                    <AssessorRolesForm
                        roles={roles}
                        formValues={formValues}
                        editThisRow={editThisRow}
                        setFormValues={setFormValues}
                        setRoles={setRoles}
                        setEditThisRow={setEditThisRow}
                    />
                </Grid>
            </Grid>
            {/**table */}
            <Grid item xs={12}>
                {isLoading ? (
                    <CircularProgress size={40} />
                ) : roles?.length ? (
                    <AssessorRolesTable
                        rows={roles}
                        editThisRow={editThisRow}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleActivity={handleActivityForRole}
                    />
                ) : (
                    <Typography>نقشی موجود نیست...</Typography>
                )}
            </Grid>
            <Grid item xs={12} />

            <Box
                sx={{
                    position: "absolute",
                    bottom: "20px",
                    left: "14px",

                    padding: "4px 20px",
                    border: "2px solid #95BDFF",
                    borderRadius: "4px"
                }}>
                <Grid item xs={12} className="d-f-j-c-a-c gap-8">
                    <Typography>مجموع ضریب نقش فعال:</Typography>
                    <Badge
                        sx={{ width: "30px", height: "30px" }}
                        badgeContent={<span>{sumOfRolesCoefficient}</span>}
                        max={100}
                        color={sumOfRolesCoefficient > 100 ? "error" : "primary"}></Badge>
                </Grid>
            </Box>
        </Grid>
    );
}

export default AssessorRoles;

interface AssessorRolesFormInitialValuesType {
    roleTitle: string | null;
    roleCoefficient: string | null;
}
