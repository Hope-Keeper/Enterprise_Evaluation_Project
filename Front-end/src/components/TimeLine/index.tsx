import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { TimeLinePropsType } from "types/components/timeLine";

function ReihanTimeLine(props: TimeLinePropsType) {
    const { position, color, variant } = props;

    return (
        <Timeline position={position}>
            {timeLines.map(({ id, title }: TimeLineType) => {
                return (
                    <TimelineItem key={id}>
                        <TimelineSeparator>
                            <TimelineDot color={color} variant={variant} />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>{title}</TimelineContent>
                    </TimelineItem>
                );
            })}
        </Timeline>
    );
}

export default ReihanTimeLine;

const timeLines: TimeLineType[] = [
    {
        id: 1,
        title: "eat"
    },
    {
        id: 2,
        title: "code"
    },
    {
        id: 3,
        title: "sleep"
    },
    {
        id: 4,
        title: "repeat"
    }
];

interface TimeLineType {
    id: number;
    title: string;
}
