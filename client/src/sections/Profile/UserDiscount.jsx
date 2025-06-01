import DiscountSection from "../../components/Discount/DisountSection";
import SideBarProfile from "./SideBarProfile";

const UserDiscount = () => {
    return (
        <section className="account__profile">
            <div className="account-profile__info">
                <div class="account-page__inner">
                    <SideBarProfile />
                    <div class="account-page__content">
                          <div class="account-page-order__heading"><h3>My Coupon</h3></div>
                        {true ? (<DiscountSection/>) : (<><div data-v-37be0bb0="" class="account-page__label">
                            Coupon</div><div data-v-37be0bb0="" class="orders-body mgt--10"><div data-v-37be0bb0="" class="no-orders"><div data-v-37be0bb0="">
                                Right now you don't have any coupon in <a data-v-37be0bb0="" href="/" class="tw-font-bold">Baki</a></div></div> </div></>)}
                        <div data-v-37be0bb0="" id="loadingIndicator" class="loading-indicator"><div data-v-37be0bb0="" class="loader"></div></div>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default UserDiscount;