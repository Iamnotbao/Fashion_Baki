import axios from "axios";
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import 'swiper/css';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import AddToCart from "../../components/Cart/addToCart";
import Sock from "../../assets/images/sock.png"
import Sizes from "../../components/Product/Size";
import BannerLock from "../../components/Banner/BannerLock";



const HomeCategory = ({ eachBanner }) => {
    const swiperRef = useRef(null);
    const [productsByCat, setProductsByCat] = useState({});
    const [category, setCategory] = useState([]);;
    const navigation = useNavigate();
    const addToCart = AddToCart();
    const [selectedProduct, setSelectedProduct] = useState({});
    console.log("auto select", selectedProduct);
    console.log(eachBanner);

    const baseURL = "/api/service/products/category";
    const url = "/api/service/categories"

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(url)
                if (res.data) {
                    setCategory(res.data);
                }
            } catch (error) {
                console.log(error);
            }

        }
        fetch();
    }, [])

    useEffect(() => {
        const fetchProductsByCat = async () => {
            try {
                const catProducts = {};
                for (const cat of category) {
                    const res = await axios.get(`${baseURL}/${cat.id}?size=8`, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    catProducts[cat.id] = res.data.content;
                }
                console.log("look", catProducts);
                setProductsByCat(catProducts);
            } catch (error) {
                console.error("Error fetching products by cat:", error);
            }
        };
        if (category.length > 0) fetchProductsByCat();
    }, [category]);

    const handleBuy = (id) => {
        navigation("/Fashion_Baki/product/" + id);
    }
    // const handleID = (id) => {
    //     setID(id);

    // }
    const handleCart = (product) => {
        const selections = selectedProduct[product.id];
        const size = selections?.size || product.sizes[0];
        const color = selections?.color || product.colors[0];
        addToCart(product.id, 1, size, color);

        setSelectedProduct((prev) => ({
            ...prev,
            [product.id]: undefined
        }));
    };
    const handleChangeSizeOrColor = (e, productId) => {
        const { name, value } = e.target;
        setSelectedProduct({
            [productId]: {
                ...(selectedProduct[productId] || {}),
                [name]: value,
            },
        });
    }

    return (
        <section className="home-product">
            {category.map((cat) => (
                <>
                    <div className="home-product__banner" key={cat.id}>
                        <BannerLock />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12" >
                                <div className="home-product__products" key={cat.id}>
                                    <div className="home-product__products-header">
                                        <div className="home-product__products-header-left">
                                            <h2 className="brand-title">{cat.name}</h2>
                                        </div>
                                        <div className="home-product__products-header-right">
                                            <a href={`/category/${cat.id}`} className="view-all">View all</a>
                                        </div>
                                    </div>
                                        {productsByCat[cat.id]?.length > 0 ? (
                                            <Swiper
                                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                                spaceBetween={10}
                                                slidesPerView={5}
                                                loop={true}
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
                                                style={{ width: '80%', margin: '0 auto', marginTop: "0" }}
                                            >
                                                {productsByCat[cat.id].map((product) => (
                                                    <SwiperSlide key={product.id}>
                                                        <div className="product-card">
                                                            <div className="product-img" onClick={() => handleBuy(product.id)}>
                                                                <img src={product.image} alt={product.name} />
                                                            </div>
                                                            <div className="product-content">
                                                                <div className="product-colors" style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
                                                                    {product.colors.map((color) => (
                                                                        <div
                                                                            key={`${product.id}-${color}`}
                                                                            className="product-color-choose"
                                                                            style={{
                                                                                width: "45px",
                                                                                height: "24px",
                                                                                borderRadius: "16px",
                                                                                border: (selectedProduct?.[product.id]?.color || product.colors[0]) === color
                                                                                    ? "1px solid #686868"
                                                                                    : "1px solid #fff",
                                                                                position: "relative"
                                                                            }}
                                                                        >
                                                                            <input
                                                                                type="radio"
                                                                                name="color"
                                                                                value={color}
                                                                                checked={selectedProduct[product.id]?.color === color}
                                                                                onChange={(e) => handleChangeSizeOrColor(e, product.id)}
                                                                                id={`${product.id}-${color}`}
                                                                                style={{
                                                                                    position: "absolute",
                                                                                    width: "100%",
                                                                                    height: "100%",
                                                                                    opacity: 0
                                                                                }}
                                                                            />
                                                                            <label
                                                                                htmlFor={`${product.id}-${color}`}
                                                                                className="product-color"
                                                                                style={{
                                                                                    cursor: "pointer",
                                                                                    backgroundColor: color,
                                                                                    width: "39px",
                                                                                    height: "17px",
                                                                                    borderRadius: "16px",
                                                                                    display: "inline-block",
                                                                                    marginBottom: 0,
                                                                                    position: "absolute",
                                                                                    top: "50%",
                                                                                    left: "50%",
                                                                                    transform: "translate(-50%, -50%)"
                                                                                }}
                                                                            >
                                                                            </label>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <p className="product-title" onClick={() => handleBuy(product.id)}>{product.name}</p>
                                                                <div className="product-price-tag">
                                                                    <p>{product.price}$</p>
                                                                    <p>{product.rating}<span><i className="fa-solid fa-star"></i></span></p>
                                                                </div>
                                                                <div>{product.status}</div>
                                                            </div>
                                                        </div>
                                                        <Sizes handleOption={handleChangeSizeOrColor} setSelectedSize={setSelectedProduct} selectedProduct={selectedProduct} product={product} />
                                                        <button className="addToCart" onClick={() => handleCart(product)}>Add to cart</button>
                                                    </SwiperSlide>
                                                ))}

                                            </Swiper>
                                        ) : (
                                            <p>Loading products for {cat.name}...</p>
                                        )

                                        }
                                    </div>
                                </div></div>
                        </div>
                    
                </>
            ))}
        </section>
    );
};

export default HomeCategory;
