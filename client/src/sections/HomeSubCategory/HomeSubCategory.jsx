import axios from "axios";
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import 'swiper/css';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';




const HomeSubsubcategory = () => {
    const swiperRef = useRef(null);
    const [productsBySub, setProductsBySub] = useState([]);
    const [subcategory, setsubcategory] = useState([]);
    const navigation = useNavigate();
    const [id, setID] = useState(1);
    const prevButtonRef = useRef(null);
    const nextButtonRef = useRef(null)



    const baseURL = "/api/service/products/subcategory";
    const url = "/api/service/subcategories"

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(url)
                if (res.data) {
                    setsubcategory(res.data);
                }
            } catch (error) {
                console.log(error);

            }

        }
        fetch();
    }, [])

    useEffect(() => {
        const fetchProductsBySub = async () => {
            try {
                const subProducts = {};
                for (const sub of subcategory) {
                    const res = await axios.get(`${baseURL}/${sub.id}`, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    subProducts[sub.id] = res.data.content;
                }
                
                
                setProductsBySub(subProducts);
            } catch (error) {
                console.error("Error fetching products by cat:", error);
            }
        };
        if (subcategory.length > 0) fetchProductsBySub();
    }, [subcategory]);


    const handleBuy = (id) => {
        navigation("/Fashion_Baki/product/" + id);
    }
 
   
    return (
 <section className="home-product">
            <div className="container">
                <div className="row">

                    {subcategory.map((sub) => (

                        <div className="col-md-12" >
                            <div className="home-product__products" key={sub.id}>
                                <h2 className="brand-title">{sub.name}</h2>
                                {productsBySub[sub.id]?.length > 0 ? (
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
                                       
                                        style={{ width: '80%', margin: '0 auto' }}
                                    >
                                        {productsBySub[sub.id].map((product) => (
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
                                    <p>Loading products for {sub.name}...</p>
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




export default HomeSubsubcategory;
