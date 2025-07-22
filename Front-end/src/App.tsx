import Card from "@mui/material/Card";
import { ThemeProvider } from "@mui/material/styles";
import ReduxModals from "@share/modules/ReduxModals";
import { getCurrentPersonnelInformation } from "api/Staff";
import { AxiosResponse } from "axios";
import { SnackbarProvider } from "notistack";
import RouteManager from "pages/routes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { CurrentUserType, setCurrentUserPersonnelInfoObject } from "store/currentUser";
import { darkTheme } from "theme/dark";
import lightTheme from "theme/light";

function App() {
    const themeType = useSelector((state: RootState) => state.theme.type);

    const dispatch = useDispatch();

    useEffect(() => {
        getCurrentPersonnelInformation((isok, res) => {
            if (isok) {
                const data = (res as AxiosResponse).data as CurrentUserType;

                dispatch(setCurrentUserPersonnelInfoObject(data));
            }
        });
    }, [dispatch]);

    return (
        <ThemeProvider theme={themeType === "dark" ? darkTheme : lightTheme}>
            <SnackbarProvider maxSnack={3}>
                <Card className="all-app-container">
                    <RouteManager />
                </Card>

                <ReduxModals />
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
