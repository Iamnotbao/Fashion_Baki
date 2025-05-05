import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './HomeBrand.css'
import Brand from '../../assets/images/brand.png'

const HomeBrand = () => {
    const [productsByBrand, setProductsByBrand] = useState({});
    const [brands, setBrands] = useState([]);
    const navigation = useNavigate();
    const baseURL = "/api/service/products/brand";
    const brandsURL = "/api/service/brands";
    const swiperRef = useRef(null);
    // const prevButtonRef = useRef(null);
    // const nextButtonRef = useRef(null);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const res = await axios.get(brandsURL);
                setBrands(res.data);
            } catch (error) {
                console.error("Error fetching brands:", error);
            }
        };
        fetchBrands();
    }, []);


    useEffect(() => {
        const fetchProductsByBrand = async () => {
            try {
                const brandProducts = {};
                for (const brand of brands) {
                    const res = await axios.get(`${baseURL}/${brand.id}`, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    brandProducts[brand.id] = res.data;
                }
                setProductsByBrand(brandProducts);
            } catch (error) {
                console.error("Error fetching products by brand:", error);
            }
        };
        if (brands.length > 0) fetchProductsByBrand();
    }, [brands]);

    const handleBuy = (productId) => {
        navigation("/Fashion_Baki/product/" + productId);
    };

    return (
        <section className="home-product">
            {/* <h1>Brand</h1> */}
            <div className="container">
                <div className="row">

                    {brands.map((brand) => (

                        <div className="col-md-12" >
                            <div className="banner_introduction" >
                                <img src={Brand} alt="banner_product" />
                            </div>
                            <div className="home-product__products" key={brand.id}>
                                <h2 className="brand-title">{brand.name}</h2>
                                {productsByBrand[brand.id]?.length > 0 ? (
                                    <Swiper
                                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                                        spaceBetween={10}
                                        slidesPerView={4}
                                        loop={true}
                                        // navigation={{
                                        //     prevEl: prevButtonRef.current,
                                        //     nextEl: nextButtonRef.current,
                                        // }}
                                        navigation
                                        pagination={{
                                            clickable: true,
                                            type: 'fraction'
                                        }}
                                        scrollbar={{ draggable: true }}
                                        onSwiper={(swiper) => {
                                            swiperRef.current = swiper;
                                            swiper.update();

                                        }}

                                        style={{ width: '100%', margin: '0 auto' }}
                                    >
                                        {productsByBrand[brand.id].map((product) => (
                                            <SwiperSlide key={product.id}>
                                                <div className="product-card" onClick={() => handleBuy(product.id)}>
                                                    <div className="product-img">
                                                        <img src={product.image} alt={product.name} />
                                                    </div>
                                                    <div className="product-content">
                                                        <p className="product-title">{product.name}</p>
                                                        <div className="product-price-tag">
                                                            <p>{product.price}$</p>
                                                            <p>{product.rating}<span><i className="fa-solid fa-star"></i></span></p>
                                                        </div>
                                                        <div>{product.status}</div>
                                                    </div>
                                                    <button className="addToCart">Add to cart</button>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                ) : (
                                    <p>Loading products for {brand.name}...</p>
                                )

                                }
                                {/* <div ref={prevButtonRef} className="swiper-button-prev"></div>
                                 <div ref={nextButtonRef} className="swiper-button-next"></div> */}
                            </div></div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default HomeBrand;
