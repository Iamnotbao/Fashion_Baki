import { useEffect, useState } from "react";
import OrderTable from "../../components/Order/OrderTable";
import SideBarProfile from "./SideBarProfile";
import "./UserCart.css";
import { getAllOrderByUser } from "../../services/orderServices";

const UserCart = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    console.log("test get all order by user", orders);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await getAllOrderByUser();
                if (response) {
                    setOrders(response);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchOrders();
    }, [loading])
    return (
        <>
            <section className="account__profile">
                <div className="account-profile__info">
                    <div class="account-page__inner">
                        <SideBarProfile />
                        <div class="account-page__content">
                            <div class="account-page__content"><div><div class="account-page-order__heading"><h3 class="account-page-title">
                                Order History
                            </h3> <a href="/page/dich-vu-60-ngay-doi-tra" class="btn btn-custom">
                                    Chính sách đổi trả 60 ngày
                                    <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.46967 11.9697C0.176777 12.2626 0.176777 12.7374 0.46967 13.0303C0.762563 13.3232 1.23744 13.3232 1.53033 13.0303L0.46967 11.9697ZM12.75 1.5C12.75 1.08579 12.4142 0.749999 12 0.749999L5.25 0.749999C4.83579 0.749999 4.5 1.08579 4.5 1.5C4.5 1.91421 4.83579 2.25 5.25 2.25H11.25V8.25C11.25 8.66421 11.5858 9 12 9C12.4142 9 12.75 8.66421 12.75 8.25L12.75 1.5ZM1.53033 13.0303L12.5303 2.03033L11.4697 0.969669L0.46967 11.9697L1.53033 13.0303Z" fill="white"></path></svg></a></div> <div><div data-v-37be0bb0="">


                                        {orders ? (<OrderTable orders={orders} />) : (<>                                        <div data-v-37be0bb0="" class="account-page__label">
                                            Đơn hàng của bạn</div><div data-v-37be0bb0="" class="orders-body mgt--10"><div data-v-37be0bb0="" class="no-orders"><div data-v-37be0bb0="">
                                                Bạn chưa có đơn hàng nào mua tại website <a data-v-37be0bb0="" href="/Fashion_Baki/" class="tw-font-bold">Baki</a></div></div> </div></>)}
                                        <div data-v-37be0bb0="" id="loadingIndicator" class="loading-indicator"><div data-v-37be0bb0="" class="loader"></div></div></div></div></div></div>
                        </div>
                    </div>
                </div>

            </section>





        </>)
}
export default UserCart;