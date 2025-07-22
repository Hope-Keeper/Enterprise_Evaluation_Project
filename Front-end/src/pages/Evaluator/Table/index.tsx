import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import insecurePersonImage from "@share/Images/insecurePerson.png";
import { SimpleEvaluatedType } from "api/Evaluator";
import { NoRecognitionStaffType } from "api/Staff";
import PayaDialog from "components/PayaDialog";
import NoRecognitionModal from "pages/EvaluationQuestions/Dialog/NoRecognitionModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "store/index.ts";
import { Option } from "types/components/autoCompleteHighlight";

export default function EvaluatorTable(props: EvaluatorTablePropsType) {
    const { rows } = props;
    const [dense] = useState(true);
    const layoutState = useSelector((state: RootState) => state.layout);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [noRecognistionPerson, setNoRecognistionPerson] = useState<NoRecognitionStaffType | null>(
        null
    );

    const navigate = useNavigate();

    const hendelStatus = (status: number | string) => {
        let lable: string = "";
        let color: "default" | "primary" | "success" | "secondary" | "error" | "info" | "warning" =
            "default";

        if (status === 1 || status === "درحال ارزیابی") {
            lable = "درحال ارزیابی";
            color = "primary";
        } else if (status === 2 || status === "ارزیابی شده") {
            lable = "ارزیابی شده";
            color = "success";
        } else if (status === 3 || status === "در انتظار کمیسیون") {
            lable = "در انتظار کمیسیون";
            color = "info";
        } else if (status === 4 || status === "ارجاع به ارزیاب دیگر") {
            lable = "ارجاع به ارزیاب دیگر";
            color = "default";
        }

        return (
            <Chip
                label={lable}
                color={color}
                sx={{
                    borderRadius: "20px",
                    fontWeight: "400",
                    fontSize: "13px"
                }}
            />
        );
    };

    const handleOpenEvaluationQuestionsPage = ({
        data
    }: {
        data: { evaluatedPerson: Option; evaluatorRoleTitle: string; evaluatorRoleId: string };
    }) => {
        navigate("/evaluator-questions", { state: data });
    };

    const handleOpenNoRecognitionModal = (person: NoRecognitionStaffType) => {
        setNoRecognistionPerson(person);
        setIsOpenModal(true);
    };

    const handleCloseNoRecognitionModal = () => {
        setIsOpenModal(false);
    };

    return (
        <>
            <TableContainer
                sx={{
                    maxHeight: `calc(100vh - 200px - ${layoutState.footerHeight} - ${layoutState.headerHeight})`,
                    overflow: "auto"
                }}>
                <Table stickyHeader sx={{ minWidth: 750 }} size={dense ? "small" : "medium"}>
                    <PayaTableHead />
                    <TableBody>
                        {rows?.map((row, index) => {
                            const { personnel, role, status } = row;
                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={personnel.personnelId}>
                                    <TableCell
                                        component="th"
                                        role="radiogroup"
                                        radioGroup="s"
                                        scope="row"
                                        align="center"
                                        padding="none">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center">
                                        {personnel.personnelFirstName}
                                    </TableCell>
                                    <TableCell align="center">
                                        {personnel.personnelLastName}
                                    </TableCell>
                                    <TableCell align="center">{}</TableCell>
                                    <TableCell align="center">{hendelStatus(status)}</TableCell>
                                    <TableCell align="center">
                                        <Box
                                            className="d-f-j-c-a-c gap-8"
                                            sx={{ minWidth: 210, p: 0.5 }}>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => {
                                                    handleOpenNoRecognitionModal({
                                                        changeEvaluatorEvaluatedPersonnelId:
                                                            personnel.personnelId,
                                                        changeEvaluatorEvaluatorRoleId: role.roleId
                                                    });
                                                }}>
                                                عدم شناخت
                                            </Button>

                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() =>
                                                    handleOpenEvaluationQuestionsPage({
                                                        data: {
                                                            evaluatedPerson: {
                                                                id: personnel.personnelId,
                                                                title: `${personnel.personnelFirstName} ${personnel.personnelLastName}`
                                                            },
                                                            evaluatorRoleTitle: role.roleTitle,
                                                            evaluatorRoleId: role.roleId
                                                        }
                                                    })
                                                }>
                                                شروع ارزیابی
                                            </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <PayaDialog
                maxWidth="sm"
                handleClose={() => {
                    setIsOpenModal(false);
                }}
                DialogContents={
                    <NoRecognitionModal
                        person={noRecognistionPerson}
                        handleClose={handleCloseNoRecognitionModal}
                    />
                }
                title="ارجاع به مدیر ارزشیابی"
                open={isOpenModal}
                imageSrc={insecurePersonImage}
                height="300px"
                bgImageOpacity={0.4}
            />
        </>
    );
}

const headCells: readonly HeadCell[] = [
    {
        id: "personnel",
        numeric: false,
        disablePadding: false,
        label: "ردیف"
    },
    {
        id: "personnelFirstName",
        numeric: false,
        disablePadding: false,
        label: "نام"
    },
    {
        id: "personnelLastName",
        numeric: false,
        disablePadding: false,
        label: "نام خانوادگی",
        minWidth: "100px"
    },
    {
        id: "RoleTitle",
        numeric: false,
        disablePadding: false,
        label: "عنوان نقش ارزیاب",
        minWidth: "150px"
    },
    {
        id: "evaluationStatus",
        numeric: false,
        disablePadding: false,
        label: "وضعیت"
    }
];

function PayaTableHead() {
    return (
        <TableHead>
            <TableRow>
                {headCells.map(({ id, disablePadding, label, minWidth }) => (
                    <TableCell
                        key={id}
                        align="center"
                        padding={disablePadding ? "none" : "normal"}
                        sx={{ minWidth }}>
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
    id: string;
    label: string;
    numeric: boolean;
    minWidth?: string;
}

interface EvaluatorTablePropsType {
    rows: SimpleEvaluatedType[] | null;
}
