import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, { ToggleButtonGroupProps } from "@mui/material/ToggleButtonGroup";

function ReihanToggleButton(props: ToggleButtonGroupProps) {
    return (
        <ToggleButtonGroup {...props}>
            {toggles.map(({ value, label }: ToggleType) => {
                return (
                    <ToggleButton key={value} value={value} aria-label={label}>
                        {label}
                    </ToggleButton>
                );
            })}
        </ToggleButtonGroup>
    );
}

export default ReihanToggleButton;

const toggles: ToggleType[] = [
    { label: "راست", value: "right" },
    { label: "وسط", value: "center" },
    { label: "چپ", value: "left" }
];

interface ToggleType {
    value: string;
    label: string;
}
