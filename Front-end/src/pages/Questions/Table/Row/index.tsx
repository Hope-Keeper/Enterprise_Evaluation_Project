import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { CopyIcon, FileExcelIcon, PenIcon } from "@share/icons";
import { BpCheckbox } from "components/CheckBox";
import PayaSwitchButton from "components/PayaSwitchButton";
import PayaTooltip from "components/PayaTooltip";
import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import { QuestionSummeryType } from "types/api";

function QuestionTableRow(props: QuestionTableRowPropsType) {
    const {
        row,
        index,
        labelId,
        isItemSelected,
        editThisRow,
        handleClick,
        handleCopy,
        handleActivity,
        handleEdit,
        handleDelete
    } = props;
    const [isLoadingForActivation, setIsLoadingForActivation] = React.useState(false);

    return (
        <TableRow
            hover
            onClick={
                editThisRow?.questionId ? () => {} : (event) => handleClick(event, row.questionId)
            }
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.questionId}
            selected={isItemSelected}
            sx={{
                opacity:
                    editThisRow?.questionId !== row.questionId && !!editThisRow?.questionId
                        ? "0.5"
                        : "1",

                cursor:
                    editThisRow?.questionId !== row.questionId && !!editThisRow?.questionId
                        ? "default"
                        : "pointer",
                ".Mui-selected": {
                    backgroundColor: "#0000ff !important"
                }
            }}>
            <TableCell padding="checkbox">
                <BpCheckbox
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{
                        "aria-labelledby": labelId
                    }}
                />
            </TableCell>
            <TableCell component="th" id={labelId} scope="row" align="center" padding="none">
                {index + 1}
            </TableCell>
            <TableCell align="center">{row.questionContent}</TableCell>
            <TableCell align="center">
                <span
                    className="d-f-j-c-a-c"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}>
                    <PayaSwitchButton
                        disabled={!!editThisRow?.questionId}
                        checked={row.questionIsActive}
                        loading={isLoadingForActivation}
                        onClick={() => {
                            handleActivity(
                                isLoadingForActivation,
                                setIsLoadingForActivation,
                                row.questionId,
                                !row.questionIsActive
                            );
                        }}
                    />
                </span>
            </TableCell>
            <TableCell align="center">
                <Box className="d-f-j-c-a-c gap-16" sx={{ p: 0.5 }}>
                    <PayaTooltip title="کپی" placement="top">
                        <span>
                            <IconButton
                                disabled={!!editThisRow?.questionId}
                                onClick={(e) => {
                                    e.stopPropagation();

                                    handleCopy([row.questionId]);
                                }}>
                                <CopyIcon />
                            </IconButton>
                        </span>
                    </PayaTooltip>
                    <PayaTooltip title="ویرایش" placement="top">
                        <span>
                            <IconButton
                                disabled={!!editThisRow?.questionId}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit(row);
                                }}>
                                <PenIcon />
                            </IconButton>
                        </span>
                    </PayaTooltip>
                    <PayaTooltip title="حذف" placement="top">
                        <span>
                            <IconButton
                                disabled={!!editThisRow?.questionId}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(row);
                                }}>
                                <FileExcelIcon />
                            </IconButton>
                        </span>
                    </PayaTooltip>
                </Box>
            </TableCell>
        </TableRow>
    );
}
export default QuestionTableRow;

interface QuestionTableRowPropsType {
    index: number;
    isItemSelected: boolean;
    labelId: string;

    row: QuestionSummeryType;
    editThisRow: QuestionSummeryType | null;
    handleClick: (_event: React.MouseEvent<HTMLTableRowElement, MouseEvent>, id: string) => void;
    setSelected: Dispatch<SetStateAction<readonly string[]>>;
    handleActivity: (
        isLoading: boolean,
        setIsLoading: Dispatch<React.SetStateAction<boolean>>,
        meritId: string,
        meritIsActive: boolean
    ) => void;
    handleCopy: (selectedIds: readonly string[]) => void;
    handleEdit: (question: QuestionSummeryType) => void;
    handleDelete: (question: QuestionSummeryType) => void;
}
