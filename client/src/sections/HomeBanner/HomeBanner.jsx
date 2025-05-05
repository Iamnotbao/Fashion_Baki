import { useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./HomeBanner.css";
import banner1 from "../../assets/images/banner_1.jpg"
import banner2 from "../../assets/images/banner_2.jpg"
import banner3 from "../../assets/images/banner_3.jpg"
import banner4 from "../../assets/images/banner_4.jpg"

const HomeBanner = () => {
    const bannerRef = useRef(null);
    const listBanner = [
        {
            title: "Outlet Sale Up to 60%",
            description: "Bring Your Soul Back To The Life!!!",
            image_url: banner1,
        },
        {
            title: "Summer Collection",
            description: "Comfortable is essential things!!!",
            image_url: banner2,
        },
        {
            title: "Winter Collection",
            description: "Unique appearance makes every things become possible!!!",
            image_url: banner3,
        },
        {
            title: "Winter Collection",
            description: "Unique appearance makes every things become possible!!!",
            image_url: banner4,
        },
    ];

    const onSlideChange = (swiper) => {
        if (bannerRef.current) {
            const currentBanner = listBanner[swiper.realIndex];
            bannerRef.current.style.backgroundImage = `url(${currentBanner.image_url})`;
        }
    };

    return (
        <section
            ref={bannerRef}
            className="home-banner"
            style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                transition: "background-image 0.5s ease-in-out",
            }}
        >
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}

                modules={[Autoplay, Pagination, Navigation]}
                onSlideChange={onSlideChange}
                className="mySwiper"
            >
                {listBanner.map((banner, index) => (
                    <SwiperSlide key={index}>
                        <div className="home-banner__slider">
                            {/* <Link to={"/Fashion_Baki/product/all"} className="buyAction">
                                Shop Now
                                <span>
                                    <i className="fa-solid fa-arrow-right"></i>
                                </span>
                            </Link> */}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default HomeBanner;
