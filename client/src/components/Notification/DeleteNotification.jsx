import { useDispatch } from "react-redux";
import { deleteNotificationThunk } from "../../stores/notification";

const deleteNotification = () => {
    const dispatch = useDispatch();
    const deleteNoti = async (notiId) => {
        console.log("deleteNoti called with id:", notiId);
        dispatch(deleteNotificationThunk({notiId}));
    }
    return deleteNoti;
}
export default deleteNotification;