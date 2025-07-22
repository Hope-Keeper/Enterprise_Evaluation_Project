import { useTheme } from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { SearchIcon } from "@share/icons";
import { SearchBarPropsType } from "types/components/searchBar";

function PayaSearchBar({ handleSearch, ...props }: SearchBarPropsType) {
    const theme = useTheme();

    return (
        <TextField
            fullWidth
            placeholder="جستجو..."
            size="small"
            InputProps={{
                startAdornment: (
                    <InputAdornment
                        position="start"
                        sx={{
                            "&::before": {
                                position: "absolute",
                                left: "44px",
                                content: "''",
                                backgroundColor: theme.palette.common.black,
                                width: "1px",
                                height: "100%"
                            }
                        }}>
                        <IconButton
                            onClick={handleSearch}
                            edge="end"
                            sx={{
                                p: "0px",
                                mx: "10px"
                            }}>
                            <SearchIcon />
                            <Divider variant="fullWidth" orientation="vertical" />
                        </IconButton>
                    </InputAdornment>
                ),
                style: {
                    backgroundColor: "#ffffff",
                    padding: "0px",
                    borderRadius: "8px"
                }
            }}
            sx={{
                ...props.sx,
                fieldset: {
                    borderColor: theme.palette.common.black,
                    borderWidth: "1px !important"
                },
                ".Mui-focused .MuiInputAdornment-root::before": {
                    backgroundColor: theme.palette.primary.main
                }
            }}
        />
    );
}

export default PayaSearchBar;
