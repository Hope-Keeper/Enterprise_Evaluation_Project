import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { ChangeEvent } from "react";
interface RowRadioButtonsType {
    formLabel?: string;
    formControlLabels: string[];
    value: string;
    onChange: ((event: ChangeEvent<HTMLInputElement>, value: string) => void) | undefined;
}
export default function RowRadioButtonsGroup({
    formControlLabels,
    value,
    onChange
}: RowRadioButtonsType) {
    return (
        <FormControl>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={value}
                onChange={onChange}
                //value={value}
                // onChange={handleChange}
            >
                {formControlLabels.map((item, index) => (
                    <FormControlLabel
                        key={index}
                        value={item}
                        control={<Radio />}
                        label={
                            <Typography sx={{ fontWeight: "400", fontSize: "14px" }}>
                                {item}
                            </Typography>
                        }
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
}
