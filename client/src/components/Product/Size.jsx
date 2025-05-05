const Sizes = ({ handleOption, selectedProduct, product }) => {
    return (
        <div className="product-sizes">
            {product.sizes.map((size, index) => (
                <div 
                    key={index} 
                    className="product-size-choose"
                    style={{
                        width: "45px", height: "24px", borderRadius: "16px",
                        position: "relative"
                    }}
                >
                    <input
                        type="radio"
                        name="size"
                        value={size}
                        checked={selectedProduct[product.id]?.size === size}
                        onChange={(e) => handleOption(e, product.id)}
                        id={`${product.id}-${size}`} 
                        style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            opacity: 0
                        }}
                    />
                    <label
                        htmlFor={`${product.id}-${size}`}
                        className="product-size"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: (selectedProduct?.[product.id]?.size || product.sizes[0]) === size
                            ? "1px solid #686868"
                            : "1px solid #fff",
                        }}
                    >
                        {size}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default Sizes;
