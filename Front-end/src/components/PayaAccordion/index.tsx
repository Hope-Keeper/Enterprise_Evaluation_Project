import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import Accordion, { AccordionProps } from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React, { useState } from "react";

function PayaAccordion(props: PayaAccordionProps) {
    const { expanded, children, summeryContent, ...restProps } = props;
    const [accordionExpanded, setAccordionExpanded] = useState<boolean>(expanded || false);

    const handleChage = () => {
        setAccordionExpanded((s) => !s);
    };

    return (
        <Accordion expanded={accordionExpanded} onChange={handleChage} {...restProps}>
            {accordionExpanded ? (
                <></>
            ) : (
                <>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        {summeryContent}
                    </AccordionSummary>
                </>
            )}

            <AccordionDetails>
                <Grid container className="d-f-j-c-a-s">
                    <Grid item xs={11}>
                        {children}
                    </Grid>
                    <Grid item xs={1} className="d-f-j-e-a-c">
                        {accordionExpanded && (
                            <ExpandLess
                                sx={{ cursor: "pointer" }}
                                className="d-f-j-e-a-c"
                                onClick={() => {
                                    setAccordionExpanded(false);
                                }}
                            />
                        )}
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
}

export default PayaAccordion;

interface PayaAccordionProps extends AccordionProps {
    summeryContent: React.ReactNode;
}
