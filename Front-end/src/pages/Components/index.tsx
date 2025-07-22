import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { AccountCircleIcon, KhorsandSazIcon } from "@share/icons";
import ReihanAccordion from "components/ReihanAccordion";
import ReihanAlert from "components/ReihanAlert";
import ReihanAutocompleteHighlight from "components/ReihanAutocompleteHighlight";
import ReihanBreadCrumbs from "components/ReihanBreadCrumbs";
import ReihanOnHoverChangeIconButton from "components/ReihanButtonOnHoverChangeIcon";
import ReihanDatePicker from "components/ReihanDatePicker";
import ReihanDateTimePicker from "components/ReihanDateTimePicker";
import ReihanDebouncedTextField from "components/ReihanDebouncedTextField";
import ReihanDialog from "components/ReihanDialog";
import ReihanEngNumberTextField from "components/ReihanEngNumberTextField";
import ReihanFormik from "components/ReihanFormik";
import ReihanInfiniteScroll from "components/ReihanInfiniteScroll";
import ReihanInfiniteScrollTable from "components/ReihanInfiniteScrollTable";
import ReihanLoadingButton from "components/ReihanLoadingButton";
import ReihanMultiSelectAutocompleteHighlight from "components/ReihanMultiSelectAutocompleteHighlight";
import ReihanPopover from "components/ReihanPopover";
import ReihanSnackBar from "components/ReihanSnackBar";
import ReihanStepper from "components/ReihanStepper";
import ReihanSwitchButton from "components/ReihanSwitchButton";
import ReihanTab from "components/ReihanTab";
import ReihanTable from "components/ReihanTable";
import ReihanTimeLine from "components/ReihanTimeLine";
import ReihanTimePicker from "components/ReihanTimePicker";
import ReihanToggleButton from "components/ToggleButton";
import ReihanTooltip from "components/ReihanTooltip";
import ReihanTypography from "components/ReihanTypography";
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
                    <ReihanAutocompleteHighlight
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
                    <ReihanMultiSelectAutocompleteHighlight options={options} label="انتخاب کنید" />
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>Debounced TextField</b>
                    </Typography>
                    <br />
                    <ReihanDebouncedTextField label="متن مورد جستجو" />
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>English Number TextField</b>
                    </Typography>
                    <br />
                    <ReihanEngNumberTextField
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
                    <ReihanDatePicker
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
                    <ReihanTimePicker label="زمان" value={time} onChange={handleChangeTime} />
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>Date Time picker</b>
                    </Typography>
                    <br />
                    <ReihanDateTimePicker
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
                    <ReihanToggleButton
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
                    <ReihanSwitchButton
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
                    <ReihanLoadingButton variant="outlined" loading={loading} onClick={handleClick}>
                        Loading Button
                    </ReihanLoadingButton>
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>Button With Icon</b>
                    </Typography>
                    <br />
                    <ReihanOnHoverChangeIconButton
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
                    <ReihanTooltip
                        title="پایا"
                        placement="top"
                        children={<Button>ReihanTooltip</Button>}
                    />
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>Tabs</b>
                    </Typography>
                    <br />
                    <ReihanTab value={valueTab} onChange={handleChangeTab} tabs={[]} />
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>BreadCrumbs</b>
                    </Typography>
                    <br />
                    <ReihanBreadCrumbs
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
                    <ReihanTypography variant="h1">h1</ReihanTypography>
                    <ReihanTypography variant="h2">h2</ReihanTypography>
                    <ReihanTypography variant="h3">h3</ReihanTypography>
                    <ReihanTypography variant="h4">h4</ReihanTypography>
                    <ReihanTypography variant="h5">h5</ReihanTypography>
                    <ReihanTypography variant="body1">body1</ReihanTypography>
                    <ReihanTypography variant="body2">body2</ReihanTypography>
                    <ReihanTypography variant="button">button</ReihanTypography>
                    <br />
                    <ReihanTypography variant="caption">caption</ReihanTypography>
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>Formik</b>
                    </Typography>
                    <br />
                    <ReihanFormik
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
                    <ReihanDialog
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
                    <ReihanPopover
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
                    <ReihanSnackBar
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
                    <ReihanAlert
                        title="موفق"
                        severity="success"
                        message="این یک آلرت با تیتر است"
                        handleClose={() => {}}
                    />
                    <ReihanAlert
                        variant="filled"
                        severity="warning"
                        message="این یک آلرت filled است"
                        handleClose={() => {}}
                    />
                    <ReihanAlert severity="info" message="این یک آلرت است" handleClose={() => {}} />
                    <ReihanAlert
                        severity="error"
                        message="این یک آلرت است"
                        handleClose={() => {}}
                    />
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
                    <ReihanInfiniteScroll />
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>Accordion</b>
                    </Typography>
                    <br />
                    <ReihanAccordion
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
                    <ReihanTimeLine position="alternate" />
                </Card>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>Stepper</b>
                    </Typography>
                    <br />
                    <ReihanStepper steps={[]} />
                </Card>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>Table</b>
                    </Typography>
                    <br />
                    <ReihanTable />
                </Card>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
                <Card sx={{ padding: "16px", margin: "16px" }}>
                    <Typography variant="overline" fontSize="18px">
                        <b>Infinite Scroll Table</b>
                    </Typography>
                    <br />
                    <ReihanInfiniteScrollTable />
                </Card>
            </Grid>
        </Grid>
    );
}

export default Components;
