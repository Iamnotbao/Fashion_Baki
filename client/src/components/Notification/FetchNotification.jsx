import { useDispatch } from "react-redux";
import { fetchNotificationThunk } from "../../stores/notification";

const fetchNotification = () => {
    const dispatch = useDispatch();
    const fetchNoti = (id) => {
        dispatch(fetchNotificationThunk({id}));
    }
    return fetchNoti;
}
export default fetchNotification;