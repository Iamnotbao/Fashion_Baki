import NotificationSection from "../../components/Notification/NotificationSection";
import SideBarProfile from "./SideBarProfile";

const UserNotification = () => {
    return ( <>
        <section className="account__profile">
        <div className="account-profile__info">
            <div class="account-page__inner">
                <SideBarProfile />
                <div class="account-page__content">
                        <NotificationSection/>        
                </div>
            </div>
        </div>
    </section>
    </> );
}
 
export default UserNotification;