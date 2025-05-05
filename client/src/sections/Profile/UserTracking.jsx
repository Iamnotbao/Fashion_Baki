import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllOrderByUser } from '../../services/orderServices';
import Tracking from '../../components/Tracking/Tracking';
import SideBarProfile from './SideBarProfile';

const UserTracking = () => {
     const [orders, setOrders] = useState([]);
     const [loading, setLoading] = useState(false);
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
        <section className="account__profile">
        <div className="account-profile__info">
            <div class="account-page__inner">
                <SideBarProfile />
                <div class="account-page__content">
                    <div class="account-page-order__heading"><h3>Order Tracking</h3></div>
                                {orders ? (<Tracking orders={orders} />) : (<><div data-v-37be0bb0="" class="account-page__label">
                                    Đơn hàng của bạn</div><div data-v-37be0bb0="" class="orders-body mgt--10"><div data-v-37be0bb0="" class="no-orders"><div data-v-37be0bb0="">
                                        Bạn chưa có đơn hàng nào mua tại website <a data-v-37be0bb0="" href="/Fashion_Baki/" class="tw-font-bold">Baki</a></div></div> </div></>)}
                                <div data-v-37be0bb0="" id="loadingIndicator" class="loading-indicator"><div data-v-37be0bb0="" class="loader"></div></div>
                </div>
            </div>
        </div>

    </section>


     );
}
 
export default UserTracking;