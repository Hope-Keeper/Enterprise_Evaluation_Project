import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "store";
import RoleTableRow from "./Row";
import { RoleType } from "api/Role";

export default function AssessorRolesTable(props: AssessorRolesTablePropsType) {
    const { rows, editThisRow, handleActivity, handleEdit, handleDelete } = props;
    const [page] = React.useState(0);
    const [dense] = React.useState(true);
    const [rowsPerPage] = React.useState(30);
    const layoutState = useSelector((state: RootState) => state.layout);
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const navigate = useNavigate();

    const OpenAssignQuestionToRole = (data: { role: RoleType }) => {
        navigate(`/assessor-rols/${data.role.roleId}/assignQuestionToRole`, {
            state: { role: data.role }
        });
    };

    return (
        <TableContainer
            sx={{
                overflow: "auto",
                maxHeight: `calc(100vh - 260px - ${layoutState.footerHeight} - ${layoutState.headerHeight})`
            }}>
            <Table stickyHeader sx={{ minWidth: 750 }} size={dense ? "small" : "medium"}>
                <ReihanTableHead />
                <TableBody>
                    {rows.map((row, index) => {
                        return (
                            <RoleTableRow
                                key={row.roleId}
                                row={row}
                                editThisRow={editThisRow}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                                handleActivity={handleActivity}
                                index={index}
                                OpenAssignQuestionToRole={OpenAssignQuestionToRole}
                            />
                        );
                    })}
                    {emptyRows > 0 && (
                        <TableRow
                            style={{
                                height: (dense ? 33 : 53) * emptyRows
                            }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const headCells: readonly HeadCell[] = [
    {
        id: "roleId",
        numeric: false,
        disablePadding: false,
        label: "ردیف"
    },
    {
        id: "roleTitle",
        numeric: false,
        disablePadding: false,
        label: "عنوان نقش"
    },
    {
        id: "roleCoefficient",
        numeric: true,
        disablePadding: false,
        label: "ضریب نقش"
    },

    {
        id: "roleIsActive",
        numeric: false,
        disablePadding: false,
        label: "فعال/غیرفعال"
    }
];

function ReihanTableHead() {
    return (
        <TableHead>
            <TableRow>
                {headCells.map(({ id, disablePadding, label }) => (
                    <TableCell key={id} align="center" padding={disablePadding ? "none" : "normal"}>
                        {label}
                    </TableCell>
                ))}
                <TableCell align="center" padding="none">
                    عملیات
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof RoleType;
    label: string;
    numeric: boolean;
}

interface AssessorRolesTablePropsType {
    rows: RoleType[];
    editThisRow: RoleType | null;
    handleActivity: (
        isLoading: boolean,
        setIsLoading: Dispatch<SetStateAction<boolean>>,
        role: RoleType,
        roleIsActive: boolean
    ) => void;
    handleEdit: (role: RoleType) => void;
    handleDelete: (role: RoleType) => void;
}
