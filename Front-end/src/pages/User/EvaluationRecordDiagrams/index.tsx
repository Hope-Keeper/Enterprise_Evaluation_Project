import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import CircularProgress from "@mui/material/CircularProgress";
import { DiagramType, getDiaramOfperson } from "api/Daigram";
import { AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";
import { SyntheticEvent, useEffect, useState } from "react";

import { AxiosErrorPersonalized } from "api";
import PayaAutocompleteHighlight from "components/PayaAutocompleteHighlight";
import { Option } from "types/components/autoCompleteHighlight";
import EvaluationColumnDiagram from "./ColumnChart";
import EvaluationLinearDiagram from "./LineChart";

function UserPanelDiagram() {
    const [isloading, setIsLoading] = useState<boolean>(true);
    const [diagramInformation, setDiagramInformation] = useState<DiagramType[] | null>(null);
    const [digramTypeOptions] = useState<Option[]>([
        { title: "میله ای ", id: "1" },
        { title: "خطی", id: "0" }
    ]);
    const [currentDigramTypeOption, setCurrentDiagramTypeOption] = useState<Option | null>({
        title: "خطی",
        id: "0"
    });

    useEffect(() => {
        getDiaramOfperson((isok, res) => {
            if (isok) {
                const data: DiagramType[] = (res as AxiosResponse).data;
                setDiagramInformation(data);

                setIsLoading(false);
            } else {
                const errorMessage = res as AxiosErrorPersonalized;
                enqueueSnackbar(errorMessage?.detail ?? errorMessage?.message, {
                    variant: "error"
                });
                setIsLoading(false);
            }
        });
    }, []);

    return (
        <Grid container mt={0} spacing={2}>
            <Grid item xs={12} container className="d-f-j-b-a-c" spacing={2}>
                <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
                        نمودار سوابق ارزشیابی
                    </Typography>
                </Grid>

                <Grid item xs={4}>
                    <PayaAutocompleteHighlight
                        disableClearable
                        fullWidth
                        label="نوع نمودار"
                        getOptionLabel={(option: Option): string => option.title}
                        onChange={(_e: SyntheticEvent, newValue: Option | null) => {
                            if (newValue) {
                                setCurrentDiagramTypeOption(newValue);
                            }
                        }}
                        isOptionEqualToValue={(op, value) =>
                            op.title === value.title && value.id === op.id
                        }
                        value={currentDigramTypeOption}
                        options={digramTypeOptions}
                    />
                </Grid>
            </Grid>

            {currentDigramTypeOption?.id === "0" && (
                <Grid item xs={12}>
                    {isloading ? (
                        <CircularProgress size={40} />
                    ) : diagramInformation?.length && currentDigramTypeOption?.id === "0" ? (
                        <EvaluationLinearDiagram data={diagramInformation} />
                    ) : (
                        <Typography>اطلاعات نمودار موجود نیست....</Typography>
                    )}
                </Grid>
            )}

            {currentDigramTypeOption?.id === "1" && (
                <Grid item xs={12}>
                    {isloading ? (
                        <CircularProgress size={40} />
                    ) : diagramInformation?.length && currentDigramTypeOption?.id === "1" ? (
                        <>
                            <EvaluationColumnDiagram data={diagramInformation} />
                        </>
                    ) : (
                        <Typography>اطلاعات نمودار موجود نیست....</Typography>
                    )}
                </Grid>
            )}
        </Grid>
    );
}
export default UserPanelDiagram;
