import { Swiper, SwiperSlide } from 'swiper/react';
import Sock from "../../assets/images/Sock.png"
import Sizes from "../../components/Product/Size";
const SpecialProduct = ({product,selectedProduct,handleChangeSizeOrColor,setSelectedProduct}) => {
    return ( 
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

     );
}
 
export default SpecialProduct;