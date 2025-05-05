import axios from "axios";
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import 'swiper/css';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "./HomeProduct.css";




const HomeProduct = () => {
    const swiperRef = useRef(null);
    const [products, setProducts] = useState([]);
    const navigation = useNavigate();
    const prevButtonRef = useRef(null);
    const nextButtonRef = useRef(null);

    const baseURL = "/api/service/products";



    useEffect(() => {
        const fetchData = async () => {
            let response;
            try {
                response = await axios.get(baseURL, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
               
                setProducts(response.data);
            } catch (error) {
                console.log(error);
            }

        }
        fetchData();
    }, []);

    const handleBuy = (id) => {
        navigation("/Fashion_Baki/product/" + id);
    }
    return (
        <section className="home-product">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div class="homepage-products__tab"><div class="head-left"><a rel-script="tab-featured-products" data-value="san-pham-moi" data-href="/collection/san-pham-moi?itm_source=homepage&amp;itm_medium=homeproducts_1" class="homepage-products__tab-item active tw-flex tw-items-center tw-gap-1 !tw-font-normal">
                            Sản phẩm mới <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="tw-w-5 tw-h-5"><path d="M1.28413 5.74831C1.18557 5.67655 1.14344 5.55014 1.17923 5.43359L1.22585 5.28789C1.25994 5.17274 1.36241 5.09122 1.48227 5.08391L5.20617 4.78667L6.63395 1.35392C6.68185 1.23366 6.80205 1.15823 6.93116 1.16742H7.08268C7.2044 1.16484 7.31437 1.23972 7.35659 1.35392L8.7902 4.78667L12.5141 5.08391C12.634 5.09122 12.7364 5.17274 12.7705 5.28789L12.8171 5.43359C12.8568 5.54646 12.8219 5.67207 12.7297 5.74831L9.92077 8.16115L10.7833 11.7804C10.8117 11.8963 10.7681 12.0179 10.6725 12.0893L10.5035 12.1825C10.405 12.2492 10.2758 12.2492 10.1772 12.1825L7.00692 10.2593L3.81918 12.2C3.72059 12.2667 3.5914 12.2667 3.49282 12.2L3.36461 12.1126C3.26907 12.0412 3.22547 11.9196 3.25389 11.8037L4.09308 8.16115L1.28413 5.74831Z" fill="currentColor"></path></svg></a> <a rel-script="tab-featured-products" data-value="hang-hot-gia-xin" data-href="/collection/ban-chay-nhat?itm_source=homepage&amp;itm_medium=homeproducts_1" class="homepage-products__tab-item !tw-font-normal">
                                Bán chạy nhất
                            </a></div> <span><a href="/Fashion_Baki/product/all" class="homepage-products-more tw-font-criteria">Xem thêm</a></span></div>
                    </div>
                    <div className="col-md-12">
                        <div className="home-product__products">
                            {products.length > 0 ? (<Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                spaceBetween={10}
                                slidesPerView={4}
                                loop={true}
                                navigation={{
                                    prevEl: prevButtonRef.current,
                                    nextEl: nextButtonRef.current,
                                }}
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
                                {products && products.map((item, index) => (
                                    <SwiperSlide key={item.id} id={item.id} onClick={() => handleBuy(item.id)}>
                                        <div className="product-img">
                                            <img src={item?.image} alt={item.name} />
                                        </div>
                                        <div className='product-content'><p className='product-title'>{item.name}</p>
                                            <div className='product-price-tag'>
                                                <p>{item.price}$</p>
                                                <p>{item.rating}<span><i class="fa-solid fa-star"></i></span></p>
                                            </div>
                                            <div>{item.status}</div>
                                        </div>

                                        <button className='addToCart'>Add to cart</button>
                                    </SwiperSlide>
                                )
                                )

                                }

                            </Swiper>) : (<p>loading...</p>)}

                            <div ref={prevButtonRef} className="swiper-button-prev"></div>
                            <div ref={nextButtonRef} className="swiper-button-next"></div>
                        </div>
                    </div>
                </div>
            </div>




        </section >
    );
};

export default HomeProduct;
