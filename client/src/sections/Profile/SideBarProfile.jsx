import "./UserProfile.css"
import { Link } from "react-router-dom";

const SideBarProfile = () => {
    return (

        <div class="account-page__sidebar">
        <div class="account-sidebar">
            <div class="account-sidebar-items">
                <Link to="/user/info" class="account-sidebar-item active">
                    <span class="circle">
                        <img src="https://mcdn.coolmate.me/image/September2023/mceclip6_34.png" alt="Thông tin tài khoản" />
                    </span>
                    User Infomation
                    <span><i class="fa-solid fa-arrow-right"></i></span>
                </Link>
                <Link to="/user/cart" class="account-sidebar-item"><span class="circle"><img src="https://mcdn.coolmate.me/image/September2023/mceclip4_7.png" alt="Nhật ký hoạt động" /></span>
                    Order History
                    <span><i class="fa-solid fa-arrow-right"></i></span>
                </Link> <Link href="/account/coolcash-point" class="account-sidebar-item"><span class="circle"><img src="https://mcdn.coolmate.me/image/September2023/mceclip5_85.png" alt="Nhật ký hoạt động" /></span>
                    Baki Cash
                    <span><i class="fa-solid fa-arrow-right"></i></span>
                </Link> <Link href="/account/voucher-wallet" class="account-sidebar-item"><span class="circle"><img src="https://mcdn.coolmate.me/image/September2023/mceclip1_59.png" alt="Ví Voucher" /></span>
                    Voucher Wallets
                    <span><i class="fa-solid fa-arrow-right"></i></span>
                </Link> <Link href="/user/tracking-order" class="account-sidebar-item"><span class="circle"><img src="https://mcdn.coolmate.me/image/September2023/mceclip2_76.png" alt="Sổ địa chỉ" /></span>
                    Tracking Order
                    <span><i class="fa-solid fa-arrow-right"></i></span>
                </Link> <Link href="#" class="account-sidebar-item"><span class="circle"><img src="https://mcdn.coolmate.me/image/September2023/mceclip3_71.png" alt="Rating &amp; Feedback" /></span>
                    Q&A
                    <span><i class="fa-solid fa-arrow-right"></i></span>
                </Link> <Link href="/account/faq" class="account-sidebar-item"><span class="circle"><img src="https://mcdn.coolmate.me/image/September2023/mceclip5_95.png" alt="Chính sách &amp; Câu hỏi thường gặp" /></span>
                    Policy &amp;
                    <span><i class="fa-solid fa-arrow-right"></i></span>
                </Link> <Link href="#" class="account-sidebar-item"><span class="circle"><img src="https://mcdn.coolmate.me/image/September2023/mceclip4_6.png" alt="Đăng xuất" /></span>
                    Log out
                    <span><i class="fa-solid fa-arrow-right"></i></span>
                </Link></div>
            <div></div></div></div>





    )
}
export default SideBarProfile;