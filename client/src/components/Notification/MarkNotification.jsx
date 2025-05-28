import { useDispatch } from "react-redux";
import { fetchNotificationThunk, markNotificationThunk } from "../../stores/notification";

const markNotification = () => {
    const dispatch = useDispatch();
    const markNoti =async (notiId,id) => {
        const result  = await dispatch(markNotificationThunk({notiId}));
        if(result.payload==="Marked as read"){
             dispatch(fetchNotificationThunk({id})); 
        }    
    }
    return markNoti;
}
export default markNotification;