import { useState } from "react";
import "./UserProfile.css"
import { Link } from "react-router-dom";
import Logout from "../../components/Logout/Logout";

const SideBarProfile = () => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(!open);
    };
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
                    </Link> <Link to="/account/coolcash-point" class="account-sidebar-item"><span class="circle"><img src="https://mcdn.coolmate.me/image/September2023/mceclip5_85.png" alt="Nhật ký hoạt động" /></span>
                        Baki Cash
                        <span><i class="fa-solid fa-arrow-right"></i></span>
                    </Link> <Link to="/user/discount" class="account-sidebar-item"><span class="circle"><img src="https://mcdn.coolmate.me/image/September2023/mceclip1_59.png" alt="Ví Voucher" /></span>
                        Voucher
                        <span><i class="fa-solid fa-arrow-right"></i></span>
                    </Link> <Link to="/user/tracking-order" class="account-sidebar-item"><span class="circle"><img src="https://mcdn.coolmate.me/image/September2023/mceclip2_76.png" alt="Sổ địa chỉ" /></span>
                        Tracking Order
                        <span><i class="fa-solid fa-arrow-right"></i></span>
                    </Link> <Link to="#" class="account-sidebar-item"><span class="circle"><img src="https://mcdn.coolmate.me/image/September2023/mceclip3_71.png" alt="Rating &amp; Feedback" /></span>
                        Q&A
                        <span><i class="fa-solid fa-arrow-right"></i></span>
                    </Link> <Link to="/user/notification" class="account-sidebar-item"><span class="circle"><img src="https://mcdn.coolmate.me/image/September2023/mceclip5_95.png" alt="Chính sách &amp; Câu hỏi thường gặp" /></span>
                        Notification  
                        <span><i class="fa-solid fa-arrow-right"></i></span>
                    </Link> <Link onClick={handleClickOpen} class="account-sidebar-item"><span class="circle"><img src="https://mcdn.coolmate.me/image/September2023/mceclip4_6.png" alt="Đăng xuất" /></span>
                        Log out
                        <span><i class="fa-solid fa-arrow-right"></i></span>
                    </Link></div>
                <div></div></div>
            {open && <Logout open={open} handleClickOpen={handleClickOpen} />}
        </div>





    )
}
export default SideBarProfile;