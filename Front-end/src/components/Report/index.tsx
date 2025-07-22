import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { AxiosErrorPersonalized } from "api";
import { getReport2, Report2Type } from "api/Report";
import { AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

// interface UserInfoProps {
//     name: string;
//     level: string;
//     score: number;
//     onButtonClick: () => void;
// }

interface ChartProps {
    data: { label: string; value: number; color: string }[];
    onChangeValue: (label: string, value: number) => void;
}

interface TableRowProps {
    dimension: string;
    status: string;
    color: string;
    charts: { label: string; value: number; color: string }[];
    onChangeChartValue: (label: string, value: number) => void;
}

interface TableProps {
    rows: TableRowProps[];
}

// function UserInfo({ name, level, score, onButtonClick }: UserInfoProps) {
//     return (
//         <Card sx={{ p: 2, textAlign: "center", backgroundColor: "#e0f7fa" }}>
//             <Typography variant="h6">{name}</Typography>
//             <Typography variant="subtitle1">{level}</Typography>
//             <Typography variant="h4" sx={{ mt: 2 }}>
//                 {score}
//             </Typography>
//             <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={onButtonClick}>
//                 اطلاعات بیشتر
//             </Button>
//         </Card>
//     );
// }

function EvaluationChart({ data, onChangeValue }: ChartProps) {
    return (
        <Grid container spacing={2} className="d-f-j-c-a-c" mb={5} mt={2}>
            {data.map((item, index) => (
                <Grid item key={index} className="d-f-j-s-a-c gap-16" flexDirection={"column"}>
                    <Typography variant="subtitle2" align="left">
                        {item.value}
                    </Typography>
                    <Tooltip title={`${item.value}%`} arrow>
                        <Slider
                            orientation="vertical"
                            value={item.value}
                            max={100}
                            onChange={(_e, newValue) =>
                                onChangeValue(item.label, newValue as number)
                            }
                            sx={{
                                height: 200,
                                "& .MuiSlider-thumb": {
                                    backgroundColor: item.color
                                }
                            }}
                        />
                    </Tooltip>
                    <Typography
                        variant="subtitle2"
                        sx={{ rotate: "270deg", transform: "rotate(45deg)" }}
                        align="left">
                        {item.label}
                    </Typography>
                </Grid>
            ))}
        </Grid>
    );
}

function EvaluationTableRow({
    dimension,
    status,
    color
}: {
    dimension: string;
    status: string;
    color: string;
}) {
    return (
        <Box
            sx={{
                width: "80%",
                p: 2,
                mb: 2,
                borderRadius: 1,
                backgroundColor: color,
                textAlign: "center",
                cursor: "pointer",
                background: `linear-gradient(45deg, ${color}, transparent)`
            }}>
            <Typography variant="h6">{dimension}</Typography>
            <Typography variant="subtitle1">وضعیت: {status}</Typography>
        </Box>
    );
}

function EvaluationTable({ rows }: TableProps) {
    return (
        <Grid container spacing={1} className="d-f-j-c-a-c gap-8">
            {rows.map((row, index) => (
                <Grid item key={index} flexDirection={"column"} className="d-f-j-c-a-c gap-32">
                    <EvaluationChart data={row.charts} onChangeValue={row.onChangeChartValue} />
                    <EvaluationTableRow
                        dimension={row.dimension}
                        status={row.status}
                        color={row.color}
                    />
                </Grid>
            ))}
        </Grid>
    );
}
interface SidebarProps {
    items: { name: string; value: string }[];
    onItemClick: (item: string) => void; // اکشن برای کلیک روی آیتم‌ها
}

function Sidebar({ items, onItemClick }: SidebarProps) {
    return (
        <Box
            flexDirection={"column"}
            className="d-f-j-c-a-c gap-32"
            sx={{
                p: 1,
                background: `linear-gradient(180deg, ${"#04b1eb8d"}, transparent)`,
                height: "100%",
                borderRadius: 1
            }}>
            <Box
                sx={{
                    width: "100px",
                    height: "150px",
                    backgroundColor: "ButtonFace",
                    borderRadius: "50%"
                }}></Box>

            {items.map((item, index) => (
                <Typography
                    flexDirection={"column"}
                    className="d-f-j-c-a-c"
                    key={index}
                    variant="subtitle1"
                    sx={{ mb: 1, cursor: "pointer", "&:hover": { color: "blue" } }}
                    onClick={() => onItemClick(item.name)}>
                    <span>{item.name}</span>
                    <span>{item.value}</span>
                </Typography>
            ))}
        </Box>
    );
}

// const handleSliderChange = (label: string, value: number) => {
//     (`مقدار جدید برای ${label}: ${value}`);
// };

const handleSidebarClick = (item: string) => {
    alert(`نمایش جزئیات برای ${item}`);
};

const sidebarItems = [
    { name: "سرگرد پاسدار", value: "..." },
    { name: "خانواده شغلی", value: "..." },
    { name: "جایگاه شغلی", value: "..." },

    { name: "سطح ارزشیابی", value: "..." }
];
interface ChartType {
    label: string;
    value: number;
    color: string;
}
interface TableRowType {
    dimension: string;
    status: string;
    color: string;
    charts: ChartType[];
    onChangeChartValue: (label: string, value: number) => void;
}
function Report() {
    // const userInfo = {
    //     name: "سرگرد پاسدار",
    //     level: "خوب",
    //     score: 153
    // };
    const [tableRows, setTableRows] = useState<TableRowType[] | null>(null);
    const dimensionColors = ["#6FEDD6", "#14A9FE", "#4FC896", "#FFEB3B", "#FF8623"];
    const meritColors = [
        "#81c784",
        "#64b4f6",
        "#ffb74d",
        "#4db6ac",
        "#7986cb",
        "#64b5f6",
        "#ba68c8",
        "#64b5f6",
        "#81c784"
    ];
    // const tableRows = [
    //     {
    //         dimension: "کار جهادی",
    //         status: "خوب",
    //         color: "#6FEDD6",
    //         charts: [
    //             { label: "تعهد", value: 80, color: "#81c784" },
    //             { label: "حل مسئله", value: 70, color: "#64b4f6" },
    //             { label: "حل مسئله", value: 70, color: "#64b4f6" }
    //         ],
    //         onChangeChartValue: (label: string, value: number) =>
    //             (`مقدار جدید برای ${label} در کار جهادی: ${value}`)
    //     },
    //     {
    //         dimension: "تمرکز بر مأموریت اصلی",
    //         status: "خوب",
    //         color: "#14A9FE",
    //         charts: [
    //             { label: "توجه به ارباب رجوع", value: 90, color: "#ffb74d" },
    //             { label: "آموزش", value: 75, color: "#4db6ac" },
    //             { label: "حل مسئله", value: 70, color: "#64b5f6" },
    //             { label: "حل مسئله", value: 70, color: "#64b5f6" }
    //         ],
    //         onChangeChartValue: (label: string, value: number) =>
    //             (`مقدار جدید برای ${label} در تمرکز بر مأموریت: ${value}`)
    //     },
    //     {
    //         dimension: "کار جهادی",
    //         status: "خوب",
    //         color: "#4FC896",
    //         charts: [
    //             { label: "نوآوری", value: 85, color: "#7986cb" },
    //             { label: "خلاقیت", value: 80, color: "#ba68c8" }
    //         ],
    //         onChangeChartValue: (label: string, value: number) =>
    //             (`مقدار جدید برای ${label} در پویایی علمی: ${value}`)
    //     },
    //     {
    //         dimension: "پویایی علمی",
    //         status: "خوب",
    //         color: "#FFEB3B",
    //         charts: [
    //             { label: "تعهد", value: 80, color: "#81c784" },
    //             { label: "حل مسئله", value: 70, color: "#64b5f6" }
    //         ],
    //         onChangeChartValue: (label: string, value: number) =>
    //             (`مقدار جدید برای ${label} در کار جهادی: ${value}`)
    //     },
    //     {
    //         dimension: "بهره وری",
    //         status: "خوب",
    //         color: "#FF8623",

    //         charts: [
    //             { label: "اثربخشی", value: 80, color: "#81c784" },
    //             { label: "کارایی", value: 70, color: "#64b5f6" },
    //             { label: "حل مسئله", value: 70, color: "#64b5f6" }
    //         ],
    //         onChangeChartValue: (label: string, value: number) =>
    //             (`مقدار جدید برای ${label} در کار جهادی: ${value}`)
    //     }
    // ];
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        getReport2(
            "4251ac43-d5c3-46b2-997c-b17ef49d76ea",
            "6ea1f62f-6246-4463-87a4-2f81839ed8ca",
            (isok, res) => {
                if (isok) {
                    const data: Report2Type[] = (res as AxiosResponse).data;
                    ("dimensions");
                    const tableRowsInfo: TableRowType[] = [];
                    let meritColorIndex = 0;
                    data?.forEach((elm: Report2Type, index) => {
                        tableRowsInfo.push({
                            dimension: elm.dimensionTitle,
                            charts:
                                elm?.meritDetails.map((chart) => {
                                    meritColorIndex += 1;
                                    return {
                                        label: chart.meritTitle,
                                        value: chart.score,
                                        color: meritColors[meritColorIndex % meritColors.length]
                                    };
                                }) ?? [],
                            color: dimensionColors[index % dimensionColors.length],
                            onChangeChartValue: () => {},
                            status: "خوب"
                        });
                    });
                    setTableRows(tableRowsInfo);
                    setIsLoading(false);
                } else {
                    const errorMessage = res as AxiosErrorPersonalized;
                    enqueueSnackbar(errorMessage?.detail ?? errorMessage?.message, {
                        variant: "error"
                    });
                    setIsLoading(false);
                }
            }
        );
    }, []);

    // function handleButtonClick() {
    //     alert("اطلاعات بیشتر درباره سرگرد پاسدار");
    // }

    return (
        <Box sx={{ p: 4 }} className={"content-to-print"}>
            <Grid container spacing={2}>
                {/* <Grid item xs={1}>
                    <UserInfo {...userInfo} onButtonClick={handleButtonClick} />
                </Grid> */}

                <Grid item xs={10} container>
                    <Grid item xs={12} className="d-f-j-c-a-c" flexDirection={"column"}>
                        <Typography
                            sx={{ fontSize: "20px", fontWeight: "700" }}
                            color={"#3c5957"}
                            align="center">
                            باسمه تعالی
                        </Typography>
                        <Typography
                            sx={{ fontSize: "20px", fontWeight: "600" }}
                            color={"#04c3ee"}
                            align="center">
                            معاونت سرمایه انسانی
                        </Typography>
                        <Typography
                            sx={{ fontSize: "16px", fontWeight: "500" }}
                            color={"#ee0452"}
                            align="center">
                            کارنامه ارزشیابی عملکرد کارکنان
                        </Typography>
                        <Typography sx={{ fontSize: "14px", fontWeight: "700" }} align="center">
                            برا اساس جمع بندی داده های مندرج در کاربرگ های ارزشیابی ، وضعیت جنابعالی
                            طی سال 1402 به تفکیک ابعاد و مولفه های مرتبط با خانواده مأموریتی به شرح
                            زیر اعلام میگردد.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}></Grid>
                    {isLoading ? (
                        <CircularProgress size={40} />
                    ) : tableRows ? (
                        <Grid item xs={12}>
                            <EvaluationTable rows={tableRows} />
                        </Grid>
                    ) : (
                        <Typography>اطلاعات نمودار موجود نیست</Typography>
                    )}
                </Grid>
                <Grid item xs={2}>
                    <Sidebar items={sidebarItems} onItemClick={handleSidebarClick} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Report;
