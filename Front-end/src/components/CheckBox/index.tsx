import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
export function BpCheckbox(props: CheckboxProps) {
    return (
        <Checkbox
            sx={{
                "&:hover": { bgcolor: "transparent" }
            }}
            disableRipple
            color="default"
            checked={!props.checked}
            indeterminateIcon={
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18">
                    <rect width="18" height="18" fill="#FFC55A" />
                    <rect x="4" y="8" width="10" height="2" fill="black" />
                </svg>
            }
            checkedIcon={
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="18"
                    viewBox="0 0 17 18"
                    fill="none">
                    <rect
                        x="0.5"
                        y="1"
                        width="16"
                        height="16"
                        rx="1.5"
                        fill="#FFC55A"
                        stroke="#FFC55A"
                    />
                    <path
                        d="M14.728 4.77201C15.0907 5.13469 15.0907 5.72369 14.728 6.08637L7.30025 13.5141C6.93756 13.8768 6.34857 13.8768 5.98588 13.5141L2.27201 9.80025C1.90933 9.43756 1.90933 8.84857 2.27201 8.48588C2.63469 8.1232 3.22369 8.1232 3.58637 8.48588L6.64451 11.5411L13.4165 4.77201C13.7792 4.40933 14.3682 4.40933 14.7309 4.77201H14.728Z"
                        fill="#0E185F"
                    />
                </svg>
            }
            icon={
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="18"
                    viewBox="0 0 17 18"
                    fill="none">
                    <rect x="0.5" y="1" width="16" height="16" rx="1.5" stroke="#0E185F" />
                </svg>
            }
            inputProps={{ "aria-label": "Checkbox demo" }}
            {...props}
        />
    );
}
