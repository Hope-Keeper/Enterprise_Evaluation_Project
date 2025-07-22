import ReihanDialog from "components/ReihanDialog";
import ReihanLogOutModal from "components/ReihanLogOutModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { closeLogOutModal } from "store/ReduxModalsStore/LogOutModal";
import logout from "@share/Images/logout.png";
function LogOutModalDialog() {
    const LogOutDialogState = useSelector((state: RootState) => state.logOutModal);

    const { isOpen } = LogOutDialogState;

    const dispatch = useDispatch();

    if (!isOpen) return null;
    return (
        <ReihanDialog
            maxWidth="sm"
            open={isOpen}
            handleClose={() => {
                dispatch(closeLogOutModal());
            }}
            title="خروج از حساب کاربری"
            DialogContents={<ReihanLogOutModal />}
            dangerous
            imageSrc={logout}
            bgImageOpacity={0.4}
        />
    );
}

export default LogOutModalDialog;
