import axios from "axios";
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Avatar from "../../assets/images/avatar/j97.jpg";
import SideBarProfile from './SideBarProfile';
import './UserProfile.css';


const UserProfile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [newProfile, setNewProfile] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const baseURL = "/api/users/profile";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(baseURL, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                });
                console.log("user", response.data);
                if (response.data) {
                    localStorage.removeItem("user");
                    localStorage.setItem("user", JSON.stringify(response.data));
                    setIsLoading(false)
                    setUserProfile(response.data);
                    handleClosePopup()
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [isLoading])
    const handleAvatar = async () => {
        const avatar = document.getElementById('avatarInput')
        if (avatar) {
            avatar.click();
        }
    }
    const handleFileChange = async (event) => {
        event.preventDefault();
        if (event.target && event.target.files && event.target.files.length > 0) {
            const newFile = event.target.files[0];
            const formData = new FormData();
            formData.append("file", newFile);
            try {
                const response = await axios.put("/api/users/upload", formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }, withCredentials: true
                    }
                );
                console.log(response.data);
                if (response.data) {
                    setIsLoading(true);
                    toast.success("Avatar is modified successfully!");
                }
                closeAddModal();
            } catch (error) {
                console.log(error);
            }
        }
        else {
            toast.error(" File is not choosen !!!")
        }
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProfile({ ...newProfile, [name]: value });
    };
    const handlePopup = () => {
        const enable = document.querySelector(".popup");
        enable.style.display = "block";
    }
    const handleClosePopup = () => {
        const enable = document.querySelector(".popup");
        enable.style.display = "none";
    }
    const handleUpdate = async () => {
        try {
            const response = await axios.put(baseURL, newProfile, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            console.log("user", response.data);
            if (response.data) {
                setUserProfile(response.data);
                handleClosePopup();
                toast.success("Update Profile Successfully!!!");
            }
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <>
            <section className="account__profile">
                <ToastContainer />
                <div className="account-profile__info">
                    <div class="account-page__inner">
                        <SideBarProfile />
                        <div class="account-page__content">
                            <div data-v-051f297c="" id="info-tab" class="account-info">

                                {userProfile ? (<div data-v-051f297c="">

                                    <div className="container"><div className="row">
                                        <div className="col-md-6">
                                            <h3 data-v-051f297c="" class="account-page-title">
                                                Thông tin tài khoản
                                            </h3>
                                            <div data-v-051f297c="" class="account-info__form">
                                                <div data-v-051f297c="" class="account-info__field">
                                                    <div data-v-051f297c="" class="account-info__label">
                                                        Họ và tên
                                                    </div>
                                                    <div data-v-051f297c="" class="account-info__value">
                                                        {userProfile.username}
                                                    </div>
                                                </div>
                                                <div data-v-051f297c="" class="account-info__field"><div data-v-051f297c="" class="account-info__label">
                                                    Địa chỉ
                                                </div>
                                                    <div data-v-051f297c="" class="account-info__value">
                                                        {userProfile.address}
                                                    </div>
                                                </div>
                                                <div data-v-051f297c="" class="account-info__field"><div data-v-051f297c="" class="account-info__label">
                                                    Số điện thoại
                                                </div>
                                                    <div data-v-051f297c="" class="account-info__value">
                                                        {userProfile.phone}
                                                    </div>
                                                </div>
                                                <div data-v-051f297c="" class="account-info__field"><button onClick={handlePopup} data-v-051f297c="" class="btn account-info__btn">
                                                    Cập nhật
                                                </button></div></div>
                                        </div>
                                        <div className="col-md-6 d-flex justify-content-center">
                                            <a onClick={handleAvatar}>
                                                <input
                                                    type="file"
                                                    id="avatarInput"
                                                    style={{ display: 'none' }}
                                                    onChange={handleFileChange}
                                                />
                                                <div style={{ width: "300px" }}>

                                                    {userProfile.avatar ? (
                                                        <img
                                                            style={{ maxWidth: "100%" }}
                                                            src={userProfile.avatar}
                                                            className="thumb-lg img-circle"
                                                            alt="Avatar"
                                                        />
                                                    ) : (
                                                        <img
                                                            style={{ maxWidth: "100%" }}
                                                            src={Avatar}
                                                            className="thumb-lg img-circle"
                                                            alt="Default Avatar"
                                                        />
                                                    )}
                                                </div>

                                            </a></div>
                                    </div></div>
                                    <div className="container"><div className="row"><div className="col-md-12">
                                        <h3 data-v-051f297c="" class="account-page-title">
                                            Thông tin đăng nhập
                                        </h3>
                                        <div data-v-051f297c="" class="account-info__field"><div data-v-051f297c="" class="account-info__label">
                                            Email
                                        </div>
                                            <div data-v-051f297c="" class="account-info__value">
                                                {userProfile.email}
                                            </div>
                                        </div>
                                        <div data-v-051f297c="" class="account-info__field"><div data-v-051f297c="" class="account-info__label">
                                            Mật khẩu
                                        </div> <div data-v-051f297c="" class="account-info__value">
                                                **********************
                                            </div></div></div></div></div>
                                </div>) : (<p>Loading...</p>)}
                            </div>
                        </div>
                    </div>
                </div>
                {userProfile ? (<><div class="popup">
                    <div class="backdrop"></div>
                    <div class="popup-body popup-md "><span class="close-popup tw-z-10" onClick={handleClosePopup}>✕</span> <div class="popup-wrapper"><h3 data-v-051f297c="" class="account-page-title">
                        Chỉnh sửa thông tin tài khoản
                    </h3> <div data-v-051f297c="" class="mgt--20">
                            {/* <div data-v-051f297c="" class="form-group form-group--user">
                                <label data-v-051f297c="" for="username">
                                    Họ tên của bạn
                                </label>
                                <br />
                                <input data-v-051f297c="" type="text" name="username" class="form-control has-value" onChange={handleInputChange} />
                            </div>
                            <div data-v-051f297c="" class="form-group form-group--user">
                                <label data-v-051f297c="" for="email">
                                    Email
                                </label>
                                <br />
                                <input data-v-051f297c="" type="text" name="email" class="form-control has-value" onChange={handleInputChange} />
                            </div> */}
                            <div class="form-group form-group--user">
                                <label for="address">
                                    Địa chỉ
                                </label>
                                <br />
                                <input defaultValue={userProfile.address} type="text" name="address" class="form-control has-value" onChange={handleInputChange} />
                            </div>
                            {/* <div data-v-051f297c="" class="slider-group">
                                <div data-v-051f297c="" style={{ width: "100%" }}>
                                    <div data-v-051f297c=""><div class="grid grid--three-columns"><div class="grid__column"><div class="datetime-select day"><div type="text" class="form-control">Ngày
                                        <i class="fa-solid fa-calendar-days"></i></div></div></div> <div class="grid__column"><div class="datetime-select month"><div type="text" class="form-control">
                                            Tháng
                                            <i class="fa-solid fa-calendar-days" ></i></div></div></div> <div class="grid__column"><div class="datetime-select year"><div type="text" class="form-control">Năm
                                                <i class="fa-solid fa-calendar-days"></i></div></div></div></div> </div></div></div> <div data-v-051f297c="" class="flex mgb--20 mgt--10"><label data-v-051f297c="" for="male" class="custom-radio-label"><span data-v-051f297c="" class="custom-radio"><input data-v-051f297c="" type="radio" id="male" value="male" /> <span data-v-051f297c="" class="checkmark"></span></span> <span data-v-051f297c="" class="label">
                                                    Nam
                                                </span></label> <label data-v-051f297c="" for="female" class="custom-radio-label"><span data-v-051f297c="" class="custom-radio"><input data-v-051f297c="" type="radio" id="female" value="female" /> <span data-v-051f297c="" class="checkmark"></span></span> <span data-v-051f297c="" class="label">
                                                    Nữ
                                                </span></label> <label data-v-051f297c="" for="other" class="custom-radio-label"><span data-v-051f297c="" class="custom-radio"><input data-v-051f297c="" type="radio" id="other" value="other" /> <span data-v-051f297c="" class="checkmark"></span></span> <span data-v-051f297c="" class="label">
                                                    LGBT
                                                </span></label></div> */}
                            <div class="form-group form-group--phone">
                                <label for="phone">
                                    Số điện thoại
                                </label>
                                <br />
                                <input defaultValue={userProfile.phone} type="text" name="phone" class="form-control has-value" onChange={handleInputChange} />  </div>
                            <div class="flex mgb--20 mgt--10"></div>
                            {/* <div data-v-051f297c="" class="grid mgb--20">
                                    
                                    <div data-v-051f297c="" class="grid__column three-twelfths mobile--one-whole flex align--center">
                                    Chiều cao
                                </div> 
                                
                                <div data-v-051f297c="" class="grid__column nine-twelfths mobile--one-whole"><div data-v-051f297c="" class="slider-group"><div data-v-051f297c="" class="vue-slider vue-slider-ltr" style={{ padding: "7px 0px", width: "100%", height: "4px" }}><div class="vue-slider-rail"><div class="vue-slider-dot" role="slider" aria-valuemin="140" aria-valuemax="185" aria-orientation="horizontal" tabindex="0" style={{ width: "14px", height: "14px", transform: "translate(-50%, -50%)", top: "50%", left: "0%", transition: "left 0.5s" }}><div class="vue-slider-dot-handle"></div></div></div></div> <span data-v-051f297c="">158cm</span></div></div></div>  */}
                            {/* <div data-v-051f297c="" class="grid mgb--20"><div data-v-051f297c="" class="grid__column three-twelfths mobile--one-whole flex align--center">
                                    Cân nặng
                                </div> <div data-v-051f297c="" class="grid__column nine-twelfths mobile--one-whole"><div data-v-051f297c="" class="slider-group"><div data-v-051f297c="" class="vue-slider vue-slider-ltr" style={{ padding: "7px 0px", width: "100%", height: "4px" }}><div class="vue-slider-rail"><div class="vue-slider-dot" role="slider" aria-valuemin="40" aria-valuemax="85" aria-orientation="horizontal" tabindex="0" style={{ width: "14px", height: "14px", transform: "translate(-50%, -50%)", top: "50%", left: "0%", transition: "left 0.5s" }}><div class="vue-slider-dot-handle"></div></div></div></div> <span data-v-051f297c="">60kg</span></div></div>
                                </div>  */}
                            <button class="btn account-info__btn account-info__btn--full" onClick={handleUpdate}>
                                Cập nhật tài khoản
                            </button></div></div></div></div></>) : (<p>loading</p>)}

            </section>


        </>)
}
export default UserProfile;