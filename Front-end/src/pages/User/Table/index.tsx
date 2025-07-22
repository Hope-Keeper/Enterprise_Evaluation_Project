import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { PrinterIcon } from "@share/icons";
import reportImage from "@share/Images/Report1.png";
import { PersonnelEvaluationProgramRecordType } from "api/Daigram";
import PayaButtonWithAddOn from "components/PayaButtonWithAddOn";
import PayaDialog from "components/PayaDialog";
import Report from "components/Report";
import Report1 from "components/Report/Report1";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { RootState } from "store/index.ts";
import { MenuItemType } from "types/components/menu";
export default function PersonEvaluationRecordTable(props: PersonEvaluationRecordTablePropsType) {
    const { rows } = props;
    const [dense] = useState(true);
    const layoutState = useSelector((state: RootState) => state.layout);
    const [isReport1Open, setIsReport1Open] = useState(false);
    const [isReport2Open, setIsReport2Open] = useState(false);

    const [serviceFileOptions] = useState<MenuItemType[]>([
        {
            title: "کارنامه  ارزشیابی",
            onClick: () => {
                setIsReport2Open(true);
            },
            id: "1"
        },
        {
            title: "کارنامه ارزشیابی ",
            onClick: () => {
                setIsReport1Open(true);
            },
            id: "2"
        }
    ]);
    const contentRef = useRef<HTMLDivElement>(null);
    const contentRef2 = useRef<HTMLDivElement>(null);
    const reactToPrintFn1 = useReactToPrint({
        contentRef,
        onAfterPrint: () => "Printed successfully"
    });
    const reactToPrintFn2 = useReactToPrint({
        contentRef: contentRef2,
        onAfterPrint: () => "Printed successfully"
    });
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
                        {rows.map((row, index) => {
                            const {
                                evaluationProgramId,
                                evaluationProgramAnnouncementDate,
                                evaluationProgramDeadline,
                                evaluationProgramStartDate,
                                evaluationProgramEndDate,
                                evaluationProgramType,
                                evaluationProgramStatus,
                                evaluationProgramScore
                            } = row;
                            if (evaluationProgramStatus === 1) {
                                return;
                            }
                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={evaluationProgramId}
                                    sx={{
                                        cursor: "pointer"
                                    }}>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                        padding="none">
                                        {index + 1}
                                    </TableCell>

                                    <TableCell align="center">
                                        {new Date(
                                            Date.parse(
                                                evaluationProgramAnnouncementDate ??
                                                    "1900-01-01T12:00:00"
                                            )
                                        ).toLocaleDateString("fa-IR")}
                                    </TableCell>
                                    <TableCell align="center">
                                        {new Date(
                                            Date.parse(
                                                evaluationProgramDeadline ?? "1900-01-01T12:00:00"
                                            )
                                        ).toLocaleDateString("fa-IR")}
                                    </TableCell>
                                    <TableCell align="center">
                                        {new Date(
                                            Date.parse(
                                                evaluationProgramStartDate ?? "1900-01-01T12:00:00"
                                            )
                                        ).toLocaleDateString("fa-IR")}
                                    </TableCell>
                                    <TableCell align="center">
                                        {new Date(
                                            Date.parse(
                                                evaluationProgramEndDate ?? "1900-01-01T12:00:00"
                                            )
                                        ).toLocaleDateString("fa-IR")}
                                    </TableCell>
                                    <TableCell align="center">
                                        {evaluationProgramType === 0 ? "مدیریتی" : "غیر مدیریتی"}
                                    </TableCell>
                                    <TableCell align="center">{evaluationProgramScore}</TableCell>
                                    <TableCell align="center">
                                        <Chip
                                            label={
                                                evaluationProgramStatus === 0 ? "پیش نویس" : "جاری"
                                            }
                                            color={
                                                evaluationProgramStatus === 0
                                                    ? "primary"
                                                    : "success"
                                            }
                                            sx={{
                                                borderRadius: "16px 16px 16px 16px",
                                                fontWeight: "bold",
                                                fontSize: "14px",
                                                alignSelf: "start"
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box
                                            className="d-f-j-c-a-c gap-8"
                                            sx={{ minWidth: 190, p: 0.5 }}>
                                            <PayaButtonWithAddOn
                                                children="صدور کارنامه"
                                                options={serviceFileOptions}
                                            />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            {/**Report 1 dialog */}
            <PayaDialog
                maxWidth="md"
                handleClose={() => {
                    setIsReport1Open(false);
                }}
                open={isReport1Open}
                title="کارنامه ارزشیابی عملکرد"
                DialogContents={
                    <div
                        dir="rtl"
                        ref={contentRef}
                        style={{
                            padding: "24px",
                            paddingTop: "150px"
                        }}>
                        <div
                            style={{
                                position: "absolute",
                                top: 60,
                                bottom: 60,
                                left: 0,
                                width: "100%",
                                backgroundImage: reportImage ? `url(${reportImage})` : "none",
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                opacity: 0.2,
                                zIndex: 0
                            }}
                        />
                        <Report1
                            evaluationProgramId={"25b54bbb-602c-4ee9-8df6-c9a112401395"}
                            personnelId={"ba250e1b-9df6-4f66-be72-2c1b5b4cc49d"}
                            evaluatedPersonnelId={"BA250E1B-9DF6-4F66-BE72-2C1B5B4CC49D"}
                        />
                    </div>
                }
                actionButtons={
                    <Button
                        size="medium"
                        variant="contained"
                        color="primary"
                        endIcon={<PrinterIcon />}
                        onClick={() => reactToPrintFn1()}>
                        چاپ
                    </Button>
                }
            />

            <PayaDialog
                maxWidth="xl"
                title="کارنامه  ارزشیابی"
                open={isReport2Open}
                handleClose={() => {
                    setIsReport2Open(false);
                }}
                DialogContents={
                    <div dir="rtl" ref={contentRef2}>
                        <div
                            style={{
                                position: "absolute",
                                top: 60,
                                bottom: 60,
                                left: 0,
                                width: "100%",

                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                opacity: 0.2,
                                zIndex: 0
                            }}
                        />
                        <Report />
                    </div>
                }
                actionButtons={
                    <Button
                        size="medium"
                        variant="contained"
                        color="primary"
                        endIcon={<PrinterIcon />}
                        onClick={() => reactToPrintFn2()}>
                        چاپ
                    </Button>
                }
            />
        </>
    );
}

const headCells: readonly HeadCell[] = [
    {
        id: "evaluationProgramId",
        numeric: false,
        disablePadding: false,
        label: "ردیف"
    },

    {
        id: "evaluationProgramAnnouncementDate",
        numeric: false,
        disablePadding: false,
        label: "تاریخ اعلام ارزشیابی",
        minWidth: "150px"
    },
    {
        id: "evaluationProgramDeadline",
        numeric: false,
        disablePadding: false,
        label: "مهلت تکمیل کاربرگ",
        minWidth: "150px"
    },
    {
        id: "evaluationProgramStartDate",
        numeric: false,
        disablePadding: false,
        label: "تاریخ شروع ارزشیابی",
        minWidth: "150px"
    },
    {
        id: "evaluationProgramEndDate",
        numeric: false,
        disablePadding: false,
        label: "تاریخ خاتمه ارزشیابی",
        minWidth: "150px"
    },

    {
        id: "evaluationProgramScore",
        numeric: false,
        disablePadding: false,
        label: "نمره ارزشیابی",
        minWidth: "150px"
    },
    {
        id: "evaluationProgramStatus",
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
                        sx={{ minWidth: minWidth }}>
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
    id: keyof PersonnelEvaluationProgramRecordType;
    label: string;
    numeric: boolean;
    minWidth?: string;
}

interface PersonEvaluationRecordTablePropsType {
    rows: PersonnelEvaluationProgramRecordType[];
}
