import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { ReactNode, useState } from "react";
import Grid from "@mui/material/Grid";

interface StepperPropsType {
    steps: string[];
    bodyContent?: ReactNode;
}

function PayaStepper(props: StepperPropsType) {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [completed] = useState<boolean[]>([]);

    const { steps } = props;
    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };
    // const totalSteps = () => {
    //     return steps.length;
    // };

    // const completedSteps = () => {
    //     return Object.keys(completed).length;
    // };

    // const isLastStep = () => {
    //     return activeStep === totalSteps() - 1;
    // };

    // const allStepsCompleted = () => {
    //     return completedSteps() === totalSteps();
    // };

    // const handleNext = () => {
    //     const newActiveStep =
    //         isLastStep() && !allStepsCompleted()
    //             ? // It's the last step, but not all steps have been completed,
    //               // find the first step that has been completed
    //               steps.findIndex((_step, i) => !(i in completed))
    //             : activeStep + 1;
    //     setActiveStep(newActiveStep);
    // };

    //     const handleBack = () => {
    //         setActiveStep((prevActiveStep) => prevActiveStep - 1);
    //     };

    //    const handleComplete = () => {
    //         const newCompleted = completed;
    //         newCompleted[activeStep] = true;
    //         setCompleted(newCompleted);
    //         handleNext();
    //     };

    //     const handleReset = () => {
    //         setActiveStep(0);
    //         setCompleted([]);
    //     };

    return (
        <Box width={"100%"}>
            <Grid container spacing={2} className="d-f-j-c-a-c">
                <Grid item xs={12} md={6}>
                    <Stepper nonLinear activeStep={activeStep}>
                        {steps.map((label, index) => (
                            <Step
                                sx={{
                                    "&.MuiStepIcon-text": {
                                        content: { label }
                                    }
                                }}
                                key={label}
                                completed={completed[index]}
                                content={label}>
                                <Button
                                    variant="contained"
                                    color={activeStep !== index ? "secondary" : "primary"}
                                    onClick={handleStep(index)}>
                                    <Typography sx={{ color: "black" }}>{label}</Typography>
                                </Button>
                            </Step>
                        ))}
                    </Stepper>
                </Grid>

                <Grid item xs={12}>
                    {props.bodyContent}
                </Grid>

                {/* <Grid item xs={12}>
                    <div>
                        {allStepsCompleted() ? (
                            <>
                                <Typography sx={{ mt: 2, mb: 1 }}>مراحل به پایان رسید</Typography>
                                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                                    <Box sx={{ flex: "1 1 auto" }} />
                                    <Button onClick={handleReset}>شروع مجدد</Button>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                                    مرحله {activeStep + 1}
                                </Typography>
                                <Box
                                    className="d-f-a-c"
                                    sx={{
                                        pt: 2
                                    }}>
                                    <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}>
                                        قبلی
                                    </Button>
                                    <Box sx={{ flex: "1 1 auto" }} />
                                    <Button
                                        onClick={handleNext}
                                        sx={{ mr: 1 }}
                                        disabled={isLastStep()}>
                                        بعدی
                                    </Button>
                                    {activeStep !== steps.length &&
                                        (completed[activeStep] ? (
                                            <Typography
                                                variant="caption"
                                                sx={{ display: "inline-block" }}>
                                                مرحله {activeStep + 1} به پایان رسید
                                            </Typography>
                                        ) : (
                                            <Button onClick={handleComplete}>
                                                {completedSteps() === totalSteps() - 1
                                                    ? "پایان"
                                                    : "تایید مرحله"}
                                            </Button>
                                        ))}
                                </Box>
                            </>
                        )}
                    </div>
                </Grid> */}
            </Grid>
        </Box>
    );
}

export default PayaStepper;

//const steps = ["قدم 1", "قدم 2", "قدم 3"];
