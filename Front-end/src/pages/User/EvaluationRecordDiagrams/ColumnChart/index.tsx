import { DiagramType } from "api/Daigram";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const EvaluationColumnDiagram = (props: EvaluationColumnDiagramType) => {
    const { data } = props;
    const [chartData] = useState({
        series: [
            {
                data:
                    data.map((item) =>
                        item.evaluationProgramScore < 0 ? 0 : item.evaluationProgramScore
                    ) ?? []
            }
        ],
        options: {
            chart: {
                height: 400

                // events: {
                //     click: function (chart, w, e) {
                //         // Handle click events if needed
                //     }
                // }
            },
            colors: [
                "#629DFF",
                "#f8e092",
                "#1C2EB7", // Gradient end color for first bar
                "#64B5aa", // Gradient end color for second bar
                "#afd5b2", // Gradient end color for third bar
                "#e99493", // Gradient end color for fourth bar
                "#d7d5d5", // Gradient end color for fifth bar
                "#83a4c5", // Gradient end color for sixth bar
                "#efe69a", // Gradient end color for seventh bar
                "#ccb7cf" // Gradient end color for eighth bar
            ], // Colors for distributed bars
            plotOptions: {
                bar: {
                    columnWidth: "60px",
                    distributed: true, // Colors apply to individual bars
                    endingShape: "rounded" // Rounded bar ends
                }
            },
            fill: {
                type: "gradient",
                gradient: {
                    shade: "light",
                    type: "vertical", // Gradient type: vertical
                    gradientToColors: [
                        "#95BDFF",
                        "#fa9c10",
                        "#0E185F",
                        "#2f9af2",
                        "#2bb22f",
                        "#e6201d",
                        "#9E9E9E",
                        "#1E88E5",
                        "#FDD835",
                        "#AB47BC"
                    ],
                    stops: [0, 100] // Transition start and end
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false
            },
            xaxis: {
                categories:
                    data.map((item) => {
                        return (
                            item.evaluationProgram[0]?.evaluationProgramEndDate ??
                            "1900-01-01T12:00:00"
                        );
                    }) ?? [],
                tickAmount: data.map((item) => item.evaluationProgram).length + 1,
                labels: {
                    style: {
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "YekanBakh"
                    },
                    formatter: (value: string) => {
                        return new Date(Date.parse(value)).toLocaleDateString("fa-IR"); // Return an empty string for 0
                    }
                },

                axisBorder: {
                    offsetX: -70,
                    color: "#95BDFF80",
                    show: true, // Blue axis line
                    strokeWidth: 5
                },
                axisTicks: {
                    color: "#95BDFF80",
                    show: true, // Blue axis line
                    height: 5
                },
                title: {
                    text: "تاریخ ارزشیابی ",
                    offsetY: 3,
                    style: {
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "YekanBakh"
                    }
                }
            },
            grid: {
                show: false // Disables the grid lines
            },
            yaxis: {
                min: 0,
                max: 100,
                tickAmount: 5,

                labels: {
                    offsetX: -60,

                    style: {
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "YekanBakh"
                    },
                    formatter: (value: number) => {
                        return value === 0 ? "" : value.toLocaleString("fa"); // Return an empty string for 0
                    }
                },
                axisBorder: {
                    offsetX: 30,

                    color: "#95BDFF80",
                    show: true, // Blue axis line
                    width: 2
                },
                axisTicks: {
                    offsetX: -30,
                    color: "#95BDFF80",
                    show: true, // Blue axis line,

                    width: 10
                },
                title: {
                    text: "نمره ارزشیابی ",
                    offsetX: 70,
                    offsetY: -310,
                    rotate: 360,
                    style: {
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "YekanBakh"
                    }
                }
            }
        }
    });

    return (
        <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={685}
        />
    );
};

export default EvaluationColumnDiagram;

interface EvaluationColumnDiagramType {
    data: DiagramType[];
}
