import { ApexOptions } from "apexcharts";
import { DiagramType } from "api/Daigram";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

function EvaluationLinearDiagram(props: EvaluationLinearDiagramType) {
    const { data } = props;
    const [chartData] = useState<{
        series: { name: string; data: number[] }[];
        options: ApexOptions;
    }>({
        series: [
            {
                name: "نمره ارزیابی", // Persian label for series
                data:
                    data.map((item) =>
                        item.evaluationProgramScore < 0 ? 0 : item.evaluationProgramScore
                    ) ?? []
            }
        ],
        options: {
            chart: {
                height: 350,
                type: "line",
                zoom: {
                    enabled: false
                },
                background: "transparent" // Light blue background color
            },
            stroke: {
                curve: "smooth",
                width: 3
            },
            markers: {
                size: 3,
                colors: ["#FFFFFF"], // Default marker color (white)
                strokeColors: "#FFD700", // Blue border
                strokeWidth: 2,
                hover: {
                    sizeOffset: 4 // Increases size on hover dynamically
                }
            },
            grid: {
                show: false // Disables the grid lines
            },
            xaxis: {
                categories:
                    data.map((item) => {
                        return (
                            item.evaluationProgram[0]?.evaluationProgramEndDate ??
                            "1900-01-01T12:00:00"
                        );
                    }) ?? [],
                title: {
                    text: "تاریخ ارزشیابی ",
                    offsetY: 2,
                    style: {
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "YekanBakh"
                    }
                },
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
                    offsetX: -30,
                    color: "#95BDFF80", // Blue axis line,
                    strokeWidth: 5,
                    show: true
                },
                axisTicks: {
                    show: true,
                    color: "#95BDFF80",
                    height: 5
                    // Blue tick marks
                }
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
                    offsetX: 50,
                    offsetY: -310,
                    rotate: 360,
                    style: {
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "YekanBakh"
                    }
                }
            },
            tooltip: {
                enabled: true,
                marker: {
                    fillColors: ["#FFD700"] // Marker turns gold when tooltip shows
                }
            },
            colors: ["#1E90FF"]
        }
    });

    return (
        <div>
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="line"
                height={685}
            />
        </div>
    );
}

export default EvaluationLinearDiagram;

interface EvaluationLinearDiagramType {
    data: DiagramType[];
}
