

import ChevronDownIcon from "@mui/icons-material/ExpandMore"
import IconButton from "@mui/material/IconButton"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import { Scrollbar } from "swiper/modules"
import { useSelector } from "react-redux"
import UpdateCart from "../../components/Cart/updateCart"
import useFetchCart from "../../components/Cart/fetchCart"
import AddToCart from "../../components/Cart/addToCart"
import Comment from "../../components/Comment/Comment"
import "swiper/css/scrollbar"
import "swiper/css"
import PopupSize from "../../components/Popup/PopupSize"
import "./ProductDetail.css"
import Description from "../../components/Description/Description"
import Recommendation from "../../components/Recommendation/Recommendation"


const ProductDetail = () => {
  const { id } = useParams()
  const base = "/api/service/products/category"
  const [count, setCount] = useState(1)
  const [sizePop, setSizePop] = useState(false)
  const swiperRef = useRef(null)
  const [products, setProducts] = useState([])
  const baseURL = "/api/service/products"
  const url = "/api/service/categories"
  const [productInfo, setProductInfo] = useState([])
  const [category, setCategory] = useState([])
  const [quantity, setQuantity] = useState({})
  const [onDesciption, setOnDescription] = useState(false)
  const [cID, setCID] = useState(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [color, setColor] = useState([])
  const [size, setSize] = useState([])
  const addToCart = AddToCart()
  const { updateCart } = UpdateCart()
  const fetchCart = useFetchCart()
  const { items } = useSelector((state) => state.cart)
  console.log("color", color)

  const handleDescription = () => {
    setOnDescription(!onDesciption)
  }

  const handleChangeColorOrSize = (value, setValue) => {
    setValue(value)
  }

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => !prev)
  }

  const handleSizePop = () => {
    setSizePop(true)
  }

  const handleClose = () => {
    setSizePop(false)
  }

  const handleAddCart = (id, count) => {
    addToCart(id, count, color, size)
  }

  useEffect(() => {
    if (loading && items && items.cartDetails && items.cartDetails.length > 0) {
      const defaultQuantity = items.cartDetails.find((item) => item.product.id === productInfo.id)
      if (defaultQuantity) {
        setQuantity(defaultQuantity)
      }
    } else {
      setLoading(true)
    }
  }, [items, loading])

  useEffect(() => {
    fetchCart()
    setLoading(true)
  }, [loading])

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(url)
        if (res.data) {
          setCategory(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetch()
  }, [])

  function handleAdd() {
    setCount((prev) => prev + 1)
  }

  function handleDecrease() {
    if (count > 1) {
      setCount((prev) => prev - 1)
    } else {
      console.log("You cannot decrease with smaller than 1 !!!")
    }
  }

  useEffect(() => {
    const fetch = async () => {
      let response
      try {
        response = await axios.get(`${base}/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        setProducts(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetch()
  }, [cID])

  useEffect(() => {
    const fetchData = async () => {
      let response
      try {
        response = await axios.get(`${baseURL}/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        if (response.data) {
          setCID(response.data.categoryId)
          setColor(response.data.colors[0])
          setSize(response.data.sizes[0])
        }
        setProductInfo(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [id])

  return (
    <section className="detail-product">
      <div className="container-sm" style={{ paddingTop: "60px"}}>
        <div className="row" style={{ display: "flex", minHeight: "100vh" }}>
          <div
            className="col-md-6 left-col"
            style={{
              position: "sticky",
              top: "70px",
              height: "calc(100vh - 70px)",
              overflowY: "auto",
              alignSelf: "flex-start",
            }}
          >
            {productInfo.length !== 0 ? (
              <div className="row">
                <div className="swiper-container" style={{ display: "flex", flexDirection: "row" }}>
                  <Swiper
                    direction="vertical"
                    slidesPerView={5}
                    spaceBetween={10}
                    freeMode={true}
                    scrollbar={{ draggable: true }}
                    loop={false}
                    style={{ height: "450px", width: "60px", margin: 0 }}
                    modules={[Scrollbar]}
                  >
                    {Array(6)
                      .fill()
                      .map((_, index) => (
                        <SwiperSlide key={index} style={{ width: "50px", cursor:"pointer" }}>
                          <div className="model">
                            <img
                              style={{ maxWidth: "100%" }}
                              src={productInfo.image || "/placeholder.svg"}
                              loading="lazy"
                              alt={`Product ${index + 1}`}
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                  <div className="">
                    <div className="model-main">
                      <img src={productInfo.image || "/placeholder.svg"} loading="lazy" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <p>no data</p>
              </div>
            )}
          </div>
          <div className="col-md-6 right-col">
            <div className="row">
              <div className="col-md-12 product_info">
                <div className="swiper-container vertical" style={{ width: "80%" }}>
                  <div className="swiper-wrapper d-flex flex-column column-gap-20">
                    <div className="swiper-slide">
                      <h1>{productInfo.name}</h1>
                    </div>
                    <div className="swiper-slide">
                      <div className="pricing-price-wrap">
                        <div className="product-compare-price">{Math.round(productInfo.price + 10, 2)}&nbsp;$</div>
                        <div className="product-price">
                          {productInfo.price}$<span className="product-discount">-10%</span>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <img
                        src="https://www.coolmate.me/images/icons/icon4.svg"
                        alt="Miễn phí vận chuyển"
                        style={{ width: "18px", height: "18px;" }}
                      />{" "}
                      <span>Freeship</span>
                    </div>
                    <div className="swiper-slide">
                      <div className="event-notification border border-primary border-3 p-3">
                        <p className="text-center">
                          Free coupon for you if you buy this shirt in 2025. All Shirt will become mighty if you wear it
                        </p>
                      </div>
                    </div>
                    <div className="swiper-slide mb-2">
                      <div className="quantity d-flex mb-4 mt-4" style={{ gap: "10px" }}>
                        <h4 style={{ fontSize: "18px" }}>Quantity</h4>
                        <div
                          className="d-flex align-items-center justify-content-around gap-10"
                          style={{
                            width: "100px",
                            borderRadius: "1.8rem",
                            border: "1px solid #000",
                            lineHeight: "23px",
                            height: "40px",
                          }}
                        >
                          <button className="quantity__action" onClick={() => handleDecrease()}>
                            -
                          </button>
                          <p>{count}</p>
                          <button className="quantity__action" onClick={() => handleAdd(productInfo)}>
                            +
                          </button>
                        </div>
                        <div className="product_detail d-flex align-items-center" style={{ marginLeft: "auto" }}>
                          <button className="product_detail_button" onClick={handleDescription}>
                            View Product Details
                          </button>
                          {
                            <Description
                              onDesciption={onDesciption}
                              handleDescription={handleDescription}
                              productInfo={productInfo}
                            />
                          }
                        </div>
                      </div>
                      <div className="describe-element ">
                        <div className="decribe-color mb-2 ">
                          <h4
                            className="mr-4 mb-2"
                            style={{ margin: 0, padding: 0, fontSize: "18px", marginRight: "10px" }}
                          >
                            Color
                          </h4>
                          <div
                            className="color d-flex align-items-center justify-content-between"
                            style={{ width: "170px" }}
                          >
                            {productInfo.colors ? (
                              productInfo.colors.map((colorPick) => (
                                <label
                                  style={{ cursor: "pointer" }}
                                  className="label"
                                  key={colorPick}
                                  onClick={() => handleChangeColorOrSize(colorPick, setColor)}
                                >
                                  <input
                                    className="pro-input desktop-input-color"
                                    type="radio"
                                    name="pa_mau"
                                    value={colorPick}
                                    checked={color == colorPick}
                                    hidden
                                  />
                                  <div
                                    className="pro-color cl-w"
                                    style={{
                                      background: colorPick,
                                      width: "51px",
                                      height: "32px",
                                      border: color == colorPick ? "1px solid black" : "1px solid transparent",
                                    }}
                                  ></div>
                                </label>
                              ))
                            ) : (
                              <p>...Loading</p>
                            )}
                          </div>
                        </div>
                        <div className="swiper-slide d-flex align-items-center justify-content-between mb-10">
                          <b style={{ cursor: "pointer" }} onClick={handleSizePop}>
                            Find your size
                          </b>
                          <b>Guide to sizes</b>
                        </div>
                        <div className="describe-size ">
                          <h4
                            className="mr-4 mb-2"
                            style={{ margin: 0, padding: 0, fontSize: "18px", marginRight: "10px" }}
                          >
                            Size
                          </h4>
                          <div
                            className="size d-flex align-items-center justify-content-between"
                            style={{ width: "120px" }}
                          >
                            {productInfo.sizes ? (
                              productInfo.sizes.map((sizePick, index) => (
                                <label
                                  style={{ cursor: "pointer" }}
                                  className="label"
                                  key={index}
                                  onClick={() => handleChangeColorOrSize(sizePick, setSize)}
                                >
                                  <input
                                    style={{ fontWeight: "700" }}
                                    className="pro-input desktop-input-color"
                                    type="radio"
                                    name={sizePick}
                                    value={sizePick}
                                    checked={size == sizePick}
                                    hidden
                                  />
                                  <div
                                    className="pro-color cl-w"
                                    style={{
                                      width: "51px",
                                      height: "32px",
                                      border: size == sizePick ? "1px solid black" : "1px solid transparent",
                                    }}
                                  >
                                    {sizePick}
                                  </div>
                                </label>
                              ))
                            ) : (
                              <p>...Loading</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slider">
                      <button onClick={() => handleAddCart(productInfo.id, count)} className="Add">
                        <span className="text">Add To Card</span>
                      </button>
                    </div>
                    <div className="product-single__policy">
                      <div className="product-policy">
                        <div className="product-policy__item">
                          <div className="product-policy__icon">
                            <img
                              src="https://www.coolmate.me/images/product-detail/return.svg"
                              alt="Đổi trả với số điện thoại"
                            />
                          </div>
                          <span className="product-policy__title">
                            Đổi trả cực dễ chỉ cần số
                            <br /> điện thoại
                          </span>
                        </div>
                        <div className="product-policy__item">
                          <div className="product-policy__icon">
                            <img
                              src="https://www.coolmate.me/images/product-detail/return-60.svg"
                              alt="Đổi hàng trong 60 ngày"
                            />
                          </div>
                          <span className="product-policy__title">60 ngày đổi trả vì bất kỳ lý do gì</span>
                        </div>
                        <div className="product-policy__item">
                          <div className="product-policy__icon">
                            <img
                              src="https://www.coolmate.me/images/product-detail/phone.svg"
                              alt="Hotline 1900.27.27.37"
                            />
                          </div>
                          <span className="product-policy__title">
                            Hotline 1900.27.27.37 hỗ
                            <br /> trợ từ 8h30 - 22h mỗi ngày
                          </span>
                        </div>
                        <div className="product-policy__item">
                          <div className="product-policy__icon">
                            <img
                              src="https://www.coolmate.me/images/product-detail/location.svg"
                              alt="Trả hàng tận nơi"
                            />
                          </div>
                          <span className="product-policy__title">
                            Đến tận nơi nhận hàng trả,
                            <br /> hoàn tiền trong 24h
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="describe mr-auto" style={{ width: "500px" }}>
                      <div className="describe-head d-flex align-items-center justify-content-between">
                        <p>Comment</p>
                        <IconButton onClick={handleToggleCollapse}>
                          <ChevronDownIcon />
                        </IconButton>
                      </div>
                    </div>
                    <div className="decribe-content">
                      <Comment isCollapsed={isCollapsed} productId={id} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {sizePop && <PopupSize handleClose={handleClose} productInfo={productInfo} />}
      <div className="recommendation">
        <Recommendation  id={productInfo.id}/>
      </div>
    </section>
  )
}
export default ProductDetail

