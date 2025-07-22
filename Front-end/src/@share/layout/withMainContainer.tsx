import ZoomInMap from "@mui/icons-material/ZoomInMap";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import { useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { ComponentType, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import {
    closeAside,
    closeFooter,
    closeHeader,
    minimizeAside,
    openAside,
    openFooter,
    openHeader
} from "store/layout";
import Aside from "./aside";
import Footer from "./footer";
import Header from "./header";
import WithMainContainerStyles from "./withMainContainerStyles";

const withMainContainer = <P extends object>(WrappedComponent: ComponentType<P>) => {
    return function Container(props: P) {
        const isDeviceWidthOverThan899px = useMediaQuery<boolean>("(min-width:900px)");
        const layoutState = useSelector((state: RootState) => state.layout);
        const dispatch = useDispatch();

        useEffect(() => {
            !isDeviceWidthOverThan899px &&
                layoutState.asideStatus === "open" &&
                dispatch(closeAside());
        }, [dispatch, isDeviceWidthOverThan899px, layoutState]);

        const maximizeMainSide = () => {
            dispatch(minimizeAside());
            dispatch(closeHeader());
            dispatch(closeFooter());
            localStorage.setItem("asideStatus", "minimize");
            localStorage.setItem("isHiddenHeader", "true");
            localStorage.setItem("isHiddenFooter", "true");
        };
        const minimizeMainSide = () => {
            isDeviceWidthOverThan899px ? dispatch(openAside()) : dispatch(closeAside());
            dispatch(openHeader());
            dispatch(openFooter());
            localStorage.setItem("asideStatus", isDeviceWidthOverThan899px ? "open" : "close");
            localStorage.setItem("isHiddenHeader", "false");
            localStorage.setItem("isHiddenFooter", "false");
        };

        return (
            <WithMainContainerStyles layoutState={layoutState}>
                <div className="sections-container">
                    <section className="aside-section d-f-j-c-a-c">
                        <Aside />
                    </section>

                    <section className="header-main-footer-section">
                        <section className="header-section d-f-j-c-a-c">
                            <Header />
                        </section>

                        <section className="main-section">
                            <IconButton
                                size="small"
                                sx={{
                                    position: "absolute",
                                    top: "18px",
                                    left: "-2px",
                                    transform: "scale(0.7)"
                                }}
                                color="success"
                                onClick={() => {
                                    layoutState.asideStatus === "minimize" &&
                                    layoutState.isHiddenHeader &&
                                    layoutState.isHiddenFooter
                                        ? minimizeMainSide()
                                        : maximizeMainSide();
                                }}>
                                {layoutState.asideStatus === "minimize" &&
                                layoutState.isHiddenHeader &&
                                layoutState.isHiddenFooter ? (
                                    <ZoomInMap fontSize="small" />
                                ) : (
                                    <ZoomOutMapIcon fontSize="small" />
                                )}
                            </IconButton>

                            <div className="main-wrapper">
                                <WrappedComponent {...props} />
                            </div>
                        </section>

                        <section className="footer-section d-f-j-c-a-c">
                            <Footer />
                        </section>
                    </section>
                </div>
            </WithMainContainerStyles>
        );
    };
};

export default withMainContainer;
