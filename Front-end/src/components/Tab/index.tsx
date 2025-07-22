import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs, { TabsProps } from "@mui/material/Tabs";
import { TabType } from "types/components/tab";
import { TabPanelProps } from "types/components/tabPanel";

interface TabPropsType extends TabsProps {
    tabs: TabType[];
}
function ReihanTab({ value, variant, onChange, tabs }: TabPropsType) {
    return (
        <>
            <Box>
                <Tabs
                    value={value}
                    onChange={onChange}
                    variant={variant}
                    aria-label="scrollable prevent tabs example">
                    {tabs.map(({ id, label }: TabType, index) => {
                        return (
                            <Tab
                                key={id}
                                label={
                                    <Typography
                                        style={{
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            color: id !== 1 ? "#0E185F80" : "#0E185F"
                                        }}>
                                        {label}
                                    </Typography>
                                }
                                sx={{
                                    backgroundColor: id !== 1 ? "#E2E4E7" : "#EFFBFF",
                                    border: index === 0 ? "2px solid #B4E4FF" : "2px solid #C5C7CD",
                                    borderBottom: "none"
                                }}
                            />
                        );
                    })}
                </Tabs>
            </Box>

            {tabs.map(({ id, panel }: TabType, index) => {
                return <CustomTabPanel value={value} index={index} key={id} children={panel} />;
            })}
        </>
    );
}

export default ReihanTab;

function CustomTabPanel({ children, value, index, ...other }: TabPanelProps) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{
                backgroundColor: index === 0 ? "#EFFBFF" : "#E2E4E7",
                padding: "20px",
                height: "100%",
                border: index === 0 ? "2px solid #B4E4FF" : "2px solid #C5C7CD",
                borderTop: "none",
                minHeight: "350px"
            }}
            {...other}>
            {children}
        </div>
    );
}
