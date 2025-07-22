import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/index.ts";
import { QuestionSummeryType } from "types/api";
import QuestionTableRow from "./Row";
import { BpCheckbox } from "components/CheckBox";

export default function QuestionsTable(props: QuestionsTablePropsType) {
    const {
        rows,
        selected,
        setSelected,
        editThisRow,
        handleCopy,
        handleActivity,
        handleEdit,
        handleDelete
    } = props;
    const [page] = useState(0);
    const [dense] = useState(true);
    const [rowsPerPage] = useState(30);
    const layoutState = useSelector((state: RootState) => state.layout);
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map(({ questionId }) => questionId);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (_event: React.MouseEvent<unknown>, id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly string[] = [];

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

    return (
        <TableContainer
            sx={{
                maxHeight: `calc(100vh - 200px - ${layoutState.footerHeight} - ${layoutState.headerHeight})`,
                overflow: "auto"
            }}>
            <Table stickyHeader sx={{ minWidth: 750 }} size={dense ? "small" : "medium"}>
                <PayaTableHead
                    numSelected={selected.length}
                    onSelectAllClick={handleSelectAllClick}
                    rowCount={rows.length}
                />
                <TableBody>
                    {rows.map((row, index) => {
                        const { questionId } = row;
                        const isItemSelected = isSelected(questionId);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                            <QuestionTableRow
                                key={questionId}
                                row={row}
                                setSelected={setSelected}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                                editThisRow={editThisRow}
                                handleActivity={handleActivity}
                                handleCopy={handleCopy}
                                index={index}
                                isItemSelected={isItemSelected}
                                labelId={labelId}
                                handleClick={handleClick}
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
        id: "questionId",
        numeric: false,
        disablePadding: false,
        label: "ردیف"
    },
    {
        id: "questionContent",
        numeric: false,
        disablePadding: false,
        label: "سنجه"
    },
    {
        id: "questionIsActive",
        numeric: false,
        disablePadding: false,
        label: "وضعیت"
    }
];

function PayaTableHead(props: PayaTableProps) {
    const { onSelectAllClick, numSelected, rowCount } = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell align="right" padding="none" sx={{ padding: "0px !important" }}>
                    <BpCheckbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            "aria-label": "select all desserts"
                        }}
                    />
                </TableCell>
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

interface PayaTableProps {
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof QuestionSummeryType;
    label: string;
    numeric: boolean;
}

interface QuestionsTablePropsType {
    rows: QuestionSummeryType[];
    selected: readonly string[];
    setSelected: Dispatch<SetStateAction<readonly string[]>>;
    editThisRow: QuestionSummeryType | null;
    handleActivity: (
        isLoading: boolean,
        setIsLoading: Dispatch<SetStateAction<boolean>>,
        meritId: string,
        meritIsActive: boolean
    ) => void;
    handleCopy: (selectedIds: readonly string[]) => void;
    handleEdit: (question: QuestionSummeryType) => void;
    handleDelete: (question: QuestionSummeryType) => void;
}
