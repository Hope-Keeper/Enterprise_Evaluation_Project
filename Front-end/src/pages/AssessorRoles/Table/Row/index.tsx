import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { ClipBoardQuestionIcon, FileExcelIcon, PenIcon } from "@share/icons";
import { RoleType } from "api/Role";
import PayaSwitchButton from "components/PayaSwitchButton";
import PayaTooltip from "components/PayaTooltip";
import { Dispatch, SetStateAction, useState } from "react";

function RoleTableRow(props: RoleTableRowPropsType) {
    const {
        row,
        index,
        editThisRow,
        handleActivity,
        handleEdit,
        handleDelete,
        OpenAssignQuestionToRole
    } = props;
    const [isLoadingForActivation, setIsLoadingForActivation] = useState(false);

    return (
        <TableRow
            hover
            tabIndex={-1}
            key={row.roleId}
            sx={{
                opacity: editThisRow?.roleId !== row.roleId && !!editThisRow?.roleId ? "0.5" : "1",

                cursor:
                    editThisRow?.roleId !== row.roleId && !!editThisRow?.roleId
                        ? "default"
                        : "pointer",
                ".Mui-selected": {
                    backgroundColor: "#0000ff !important"
                }
            }}>
            <TableCell component="th" scope="row" align="center" padding="none">
                {index + 1}
            </TableCell>
            <TableCell align="center">{row.roleTitle}</TableCell>
            <TableCell align="center">{row.roleCoefficient}</TableCell>
            <TableCell align="center">
                <span
                    onClick={(e) => {
                        e.stopPropagation();
                    }}>
                    <PayaSwitchButton
                        disabled={!!editThisRow?.roleId}
                        checked={row.roleIsActive}
                        loading={isLoadingForActivation}
                        onClick={() => {
                            handleActivity(
                                isLoadingForActivation,
                                setIsLoadingForActivation,
                                row,
                                !row.roleIsActive
                            );
                        }}
                    />
                </span>
            </TableCell>
            <TableCell align="center">
                <Box className="d-f-j-c-a-c gap-16" sx={{ p: 0.5 }}>
                    {" "}
                    <PayaTooltip
                        title={
                            row.roleTitle === "ورزش و سلامت" ||
                            row.roleTitle === "تشويقات" ||
                            row.roleTitle === "کميسيون"
                                ? "امکان الصاق سوال به این نقش وجود ندارد."
                                : "الصاق"
                        }
                        placement="top">
                        <span>
                            <IconButton
                                disabled={
                                    !!editThisRow?.roleId ||
                                    row.roleTitle === "ورزش و سلامت" ||
                                    row.roleTitle === "تشويقات" ||
                                    row.roleTitle === "کميسيون"
                                }
                                onClick={(e) => {
                                    e.stopPropagation();
                                    OpenAssignQuestionToRole({
                                        role: row
                                    });
                                }}>
                                <ClipBoardQuestionIcon
                                    sx={{
                                        opacity:
                                            row.roleTitle === "ورزش و سلامت" ||
                                            row.roleTitle === "تشويقات" ||
                                            row.roleTitle === "کميسيون"
                                                ? "0.5"
                                                : "1"
                                    }}
                                />
                            </IconButton>
                        </span>
                    </PayaTooltip>
                    {row.updatePermission && (
                        <PayaTooltip title="ویرایش" placement="top">
                            <span>
                                <IconButton
                                    disabled={!!editThisRow?.roleId}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEdit(row);
                                    }}>
                                    <PenIcon />
                                </IconButton>
                            </span>
                        </PayaTooltip>
                    )}
                    {row.updatePermission && (
                        <PayaTooltip title="حذف" placement="top">
                            <span>
                                <IconButton
                                    disabled={!!editThisRow?.roleId}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(row);
                                    }}>
                                    <FileExcelIcon />
                                </IconButton>
                            </span>
                        </PayaTooltip>
                    )}
                </Box>
            </TableCell>
        </TableRow>
    );
}
export default RoleTableRow;

interface RoleTableRowPropsType {
    row: RoleType;
    index: number;
    editThisRow: RoleType | null;
    handleActivity: (
        isLoading: boolean,
        setIsLoading: Dispatch<SetStateAction<boolean>>,
        role: RoleType,
        roleIsActive: boolean
    ) => void;
    handleEdit: (role: RoleType) => void;
    handleDelete: (role: RoleType) => void;
    OpenAssignQuestionToRole: (data: { role: RoleType }) => void;
}
