import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { alpha } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface Data {
    id: number;
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;
}

function createData(
    id: number,
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
): Data {
    return {
        id,
        name,
        calories,
        fat,
        carbs,
        protein
    };
}

const rows1 = [
    createData(1, "Cupcake", 305, 3.7, 67, 4.3),
    createData(2, "Donut", 452, 25.0, 51, 4.9),
    createData(3, "Eclair", 262, 16.0, 24, 6.0),
    createData(4, "Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData(5, "Gingerbread", 356, 16.0, 49, 3.9),
    createData(6, "Honeycomb", 408, 3.2, 87, 6.5),
    createData(7, "Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData(8, "Jelly Bean", 375, 0.0, 94, 0.0),
    createData(9, "KitKat", 518, 26.0, 65, 7.0),
    createData(10, "Lollipop", 392, 0.2, 98, 0.0)
];
const rows2 = [
    createData(11, "Cupcake", 305, 3.7, 67, 4.3),
    createData(12, "Donut", 452, 25.0, 51, 4.9),
    createData(13, "Eclair", 262, 16.0, 24, 6.0),
    createData(14, "Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData(15, "Gingerbread", 356, 16.0, 49, 3.9),
    createData(16, "Honeycomb", 408, 3.2, 87, 6.5),
    createData(17, "Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData(18, "Jelly Bean", 375, 0.0, 94, 0.0),
    createData(19, "KitKat", 518, 26.0, 65, 7.0),
    createData(20, "Lollipop", 392, 0.2, 98, 0.0)
];
const rows3 = [
    createData(21, "Cupcake", 305, 3.7, 67, 4.3),
    createData(22, "Donut", 452, 25.0, 51, 4.9),
    createData(23, "Eclair", 262, 16.0, 24, 6.0),
    createData(24, "Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData(25, "Gingerbread", 356, 16.0, 49, 3.9),
    createData(26, "Honeycomb", 408, 3.2, 87, 6.5),
    createData(27, "Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData(28, "Jelly Bean", 375, 0.0, 94, 0.0),
    createData(29, "KitKat", 518, 26.0, 65, 7.0),
    createData(30, "Lollipop", 392, 0.2, 98, 0.0)
];

type Order = "asc" | "desc";

export default function ReihanInfiniteScrollTable() {
    const [order, setOrder] = React.useState<Order>("asc");
    const [orderBy, setOrderBy] = React.useState<keyof Data>("calories");
    const [selected, setSelected] = React.useState<readonly number[]>([]);

    const handleRequestSort = (_event: React.MouseEvent<unknown>, property: keyof Data) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = state.map(({ id }) => id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (_event: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    const [state, setState] = React.useState<Data[]>(rows1);

    const handleGetNextPage = (): void => {
        setTimeout(() => {
            setState((s) => s.concat(s.length < 20 ? rows2 : rows3));
        }, 1000);
    };
    const paginationSize = 10;
    return (
        <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
                <ReihanTableToolbar numSelected={selected.length} />
                <TableContainer sx={{ minHeight: 350, overflow: "hidden", mt: 0 }}>
                    <InfiniteScroll
                        style={{
                            width: "100%",
                            minHeight: 350
                        }}
                        dataLength={state.length || 0}
                        next={handleGetNextPage}
                        hasMore={state.length < 30}
                        loader={
                            <h4 style={{ textAlign: "center", marginTop: "60px" }}>
                                <CircularProgress />
                            </h4>
                        }
                        height="calc(20vh)"
                        endMessage={
                            state.length > paginationSize && (
                                <div
                                    style={{
                                        marginTop: "32px",
                                        marginBottom: "32px",
                                        fontSize: "14px",
                                        width: "100%",
                                        fontWeight: "bolder",
                                        textAlign: "center"
                                    }}>
                                    شما به انتهای لیست رسیده اید
                                </div>
                            )
                        }
                        scrollThreshold="20px">
                        <Table
                            stickyHeader
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size="medium">
                            <ReihanTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={state.length}
                            />
                            <TableBody>
                                {state.map(({ id, name, calories, carbs, fat, protein }, index) => {
                                    const isItemSelected = isSelected(id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={id}
                                            selected={isItemSelected}
                                            sx={{ cursor: "pointer" }}>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        "aria-labelledby": labelId
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none">
                                                {name}
                                            </TableCell>
                                            <TableCell align="right">{calories}</TableCell>
                                            <TableCell align="right">{fat}</TableCell>
                                            <TableCell align="right">{carbs}</TableCell>
                                            <TableCell align="right">{protein}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </InfiniteScroll>
                </TableContainer>
            </Paper>
        </Box>
    );
}

const headCells: readonly HeadCell[] = [
    {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Dessert (100g serving)"
    },
    {
        id: "calories",
        numeric: true,
        disablePadding: false,
        label: "Calories"
    },
    {
        id: "fat",
        numeric: true,
        disablePadding: false,
        label: "Fat (g)"
    },
    {
        id: "carbs",
        numeric: true,
        disablePadding: false,
        label: "Carbs (g)"
    },
    {
        id: "protein",
        numeric: true,
        disablePadding: false,
        label: "Protein (g)"
    }
];
function ReihanTableHead(props: ReihanTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            "aria-label": "select all desserts"
                        }}
                    />
                </TableCell>
                {headCells.map(({ id, numeric, disablePadding, label }) => (
                    <TableCell
                        key={id}
                        align={numeric ? "right" : "left"}
                        padding={disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === id ? order : false}>
                        <TableSortLabel
                            active={orderBy === id}
                            direction={orderBy === id ? order : "asc"}
                            onClick={createSortHandler(id)}>
                            {label}
                            {orderBy === id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
function ReihanTableToolbar(props: ReihanTableToolbarProps) {
    const { numSelected } = props;
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
                })
            }}>
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    color="inherit"
                    variant="subtitle1"
                    component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
                    Nutrition
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

interface ReihanTableToolbarProps {
    numSelected: number;
}
interface ReihanTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}
interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}
