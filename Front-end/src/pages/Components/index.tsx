import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { AccountCircleIcon, KhorsandSazIcon } from "@share/icons";
import PayaAccordion from "components/PayaAccordion";
import PayaAlert from "components/PayaAlert";
import PayaAutocompleteHighlight from "components/PayaAutocompleteHighlight";
import PayaBreadCrumbs from "components/PayaBreadCrumbs";
import PayaOnHoverChangeIconButton from "components/PayaButtonOnHoverChangeIcon";
import PayaDatePicker from "components/PayaDatePicker";
import PayaDateTimePicker from "components/PayaDateTimePicker";
import PayaDebouncedTextField from "components/PayaDebouncedTextField";
import PayaDialog from "components/PayaDialog";
import PayaEngNumberTextField from "components/PayaEngNumberTextField";
import PayaFormik from "components/PayaFormik";
import PayaInfiniteScroll from "components/PayaInfiniteScroll";
import PayaInfiniteScrollTable from "components/PayaInfiniteScrollTable";
import PayaLoadingButton from "components/PayaLoadingButton";
import PayaMultiSelectAutocompleteHighlight from "components/PayaMultiSelectAutocompleteHighlight";
import PayaPopover from "components/PayaPopover";
import PayaSnackBar from "components/PayaSnackBar";
import PayaStepper from "components/PayaStepper";
import PayaSwitchButton from "components/PayaSwitchButton";
import PayaTab from "components/PayaTab";
import PayaTable from "components/PayaTable";
import PayaTimeLine from "components/PayaTimeLine";
import PayaTimePicker from "components/PayaTimePicker";
import PayaToggleButton from "components/PayaToggleButton";
import PayaTooltip from "components/PayaTooltip";
import PayaTypography from "components/PayaTypography";
import { ChangeEvent, MouseEvent, SyntheticEvent, useState } from "react";
import { Option } from "types/components/autoCompleteHighlight";

function Components() {
    const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
    const [anchorPopover, setAnchorPopover] = useState<HTMLButtonElement | null>(null);

    const [englishNumbersInputValue, setEnglishNumbersInputValue] = useState<string>("");
    const [date, setDate] = useState<Date | null>(null);
    const [dateTime, setDateTime] = useState<Date | null>(null);
    const [time, setTime] = useState<Date | null>(null);
    const [checkedSwitch, setCheckedSwitch] = useState<boolean>(true);
    const [valueTab, setValueTab] = useState<number>(0);
    const [valueToggleButton, setVlaueToggleButton] = useState<string>();
    const [loading, setLoading] = useState(false);
    const options: Option[] = [
        { title: "رستگاری در شائوشنگ", id: "1994" },
        { title: "پدرخوانده", id: "1972" },
        { title: "پدرخوانده - قسمت دوم", id: "1974" }
    ];

    const handleClick = () => {
        const delayDebounceFn = setTimeout(() => {
            if (!loading) {
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        });
        return () => clearTimeout(delayDebounceFn);
    };

    const handleChangeToggleButton = (_event: MouseEvent<HTMLElement>, newValue: string): void => {
        setVlaueToggleButton(newValue);
    };

    const handleChangeTab = (_event: SyntheticEvent, newValue: number) => {
        setValueTab(newValue);
    };
    const handleChangeSwitch = (
        _event: ChangeEvent<HTMLInputElement>,
        newChecked: boolean
    ): void => {
        setCheckedSwitch(newChecked);
    };

    const handleChangeDateTime = (newDate: null | Date) => {
        setDateTime(newDate);
    };
    const handleChangeTime = (newTime: null | Date) => {
        setTime(newTime);
    };
    const handleClickPopover = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorPopover(event.currentTarget);
    };
    const handleClosePopover = () => {
        setAnchorPopover(null);
    };
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="body1" fontSize="18px">
                        <b>autocomplete highlighted text</b>
                    </Typography>
                    <br />
                    <PayaAutocompleteHighlight
                        loading
                        label="انتخاب کنید"
                        getOptionLabel={(option: Option): string => option.title}
                        options={options}
                    />
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="body1" fontSize="18px">
                        <b>multi select autocomplete</b>
                    </Typography>
                    <br />
                    <PayaMultiSelectAutocompleteHighlight options={options} label="انتخاب کنید" />
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>Debounced TextField</b>
                    </Typography>
                    <br />
                    <PayaDebouncedTextField label="متن مورد جستجو" />
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>English Number TextField</b>
                    </Typography>
                    <br />
                    <PayaEngNumberTextField
                        label="فقط اعداد انگلیسی"
                        inputValue={englishNumbersInputValue}
                        setInputValue={setEnglishNumbersInputValue}
                    />
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>Date picker</b>
                    </Typography>
                    <br />
                    <PayaDatePicker
                        label="تاریخ"
                        value={date}
                        onChange={(newDate: null | Date) => {
                            setDate(newDate);
                        }}
                    />
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>Time picker</b>
                    </Typography>
                    <br />
                    <PayaTimePicker label="زمان" value={time} onChange={handleChangeTime} />
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>Date Time picker</b>
                    </Typography>
                    <br />
                    <PayaDateTimePicker
                        label="تاریخ و زمان"
                        value={dateTime}
                        onChange={handleChangeDateTime}
                    />
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>Toggle Button</b>
                    </Typography>
                    <br />
                    <PayaToggleButton
                        color="primary"
                        exclusive
                        value={valueToggleButton}
                        onChange={handleChangeToggleButton}
                    />
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>Switch Button</b>
                    </Typography>
                    <br />
                    <PayaSwitchButton
                        checked={checkedSwitch}
                        onChange={handleChangeSwitch}
                        color="primary"
                    />
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>Loading Button</b>
                    </Typography>
                    <br />
                    <PayaLoadingButton variant="outlined" loading={loading} onClick={handleClick}>
                        Loading Button
                    </PayaLoadingButton>
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>Button With Icon</b>
                    </Typography>
                    <br />
                    <PayaOnHoverChangeIconButton
                        label="هاور کنید"
                        variant="contained"
                        defaultIcon={<AccountCircleIcon />}
                        hoverIcon={<KhorsandSazIcon />}
                        onMouseEnter={() => {}}
                        onMouseLeave={() => {}}
                    />
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>Tooltip</b>
                    </Typography>
                    <br />
                    <PayaTooltip
                        title="پایا"
                        placement="top"
                        children={<Button>PayaTooltip</Button>}
                    />
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>Tabs</b>
                    </Typography>
                    <br />
                    <PayaTab value={valueTab} onChange={handleChangeTab} tabs={[]} />
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>BreadCrumbs</b>
                    </Typography>
                    <br />
                    <PayaBreadCrumbs
                        links={[
                            {
                                id: 1,
                                title: "صفحه اصلی",
                                href: "/components"
                            },
                            {
                                id: 2,
                                title: "کامپوننت ها",
                                href: "/components"
                            }
                        ]}
                        current="توضیحات"
                    />
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>Typography</b>
                    </Typography>
                    <br />
                    <PayaTypography variant="h1">h1</PayaTypography>
                    <PayaTypography variant="h2">h2</PayaTypography>
                    <PayaTypography variant="h3">h3</PayaTypography>
                    <PayaTypography variant="h4">h4</PayaTypography>
                    <PayaTypography variant="h5">h5</PayaTypography>
                    <PayaTypography variant="body1">body1</PayaTypography>
                    <PayaTypography variant="body2">body2</PayaTypography>
                    <PayaTypography variant="button">button</PayaTypography>
                    <br />
                    <PayaTypography variant="caption">caption</PayaTypography>
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>Formik</b>
                    </Typography>
                    <br />
                    <PayaFormik
                        initialValues={{
                            email: "",
                            password: "",
                            name: "",
                            family: "",
                            tel: "",
                            province: null,
                            city: null
                        }}
                    />
                </Card>
            </Grid>

            <Grid item xs={12}>
                <Divider />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>dialog</b>
                    </Typography>
                    <br />
                    <Button variant="contained" onClick={() => setIsOpenDialog(true)}>
                        open dialog
                    </Button>
                    <PayaDialog
                        open={isOpenDialog}
                        handleClose={() => {
                            setIsOpenDialog(false);
                        }}
                        title="000000"
                        DialogContents={<>000</>}
                    />
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>Popover</b>
                    </Typography>
                    <br />
                    <Button
                        variant="contained"
                        onClick={handleClickPopover}
                        sx={{ borderRadius: "8px !important" }}>
                        open popover
                    </Button>
                    <PayaPopover
                        anchor={anchorPopover}
                        message="This is popover"
                        handleClose={handleClosePopover}
                    />
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>SnackBar</b>
                    </Typography>
                    <br />
                    <PayaSnackBar
                        message="این یک اسنک بار است"
                        autoHideDuration={4000}
                        variant={"error"}
                    />
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>Alert</b>
                    </Typography>
                    <br />
                    <PayaAlert
                        title="موفق"
                        severity="success"
                        message="این یک آلرت با تیتر است"
                        handleClose={() => {}}
                    />
                    <PayaAlert
                        variant="filled"
                        severity="warning"
                        message="این یک آلرت filled است"
                        handleClose={() => {}}
                    />
                    <PayaAlert severity="info" message="این یک آلرت است" handleClose={() => {}} />
                    <PayaAlert severity="error" message="این یک آلرت است" handleClose={() => {}} />
                </Card>
            </Grid>

            <Grid item xs={12}>
                <Divider />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>infinitescroll</b>
                    </Typography>
                    <PayaInfiniteScroll />
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>Accordion</b>
                    </Typography>
                    <br />
                    <PayaAccordion
                        title="مورد"
                        children={
                            <Typography variant="body2">
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                                استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
                                ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
                                کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد
                            </Typography>
                        }
                        summeryContent={undefined}
                    />
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>TimeLine</b>
                    </Typography>
                    <br />
                    <PayaTimeLine position="alternate" />
                </Card>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>Stepper</b>
                    </Typography>
                    <br />
                    <PayaStepper steps={[]} />
                </Card>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>Table</b>
                    </Typography>
                    <br />
                    <PayaTable />
                </Card>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>Infinite Scroll Table</b>
                    </Typography>
                    <br />
                    <PayaInfiniteScrollTable />
                </Card>
            </Grid>
        </Grid>
    );
}

export default Components;
