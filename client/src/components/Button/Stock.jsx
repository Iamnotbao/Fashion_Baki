
const Stock = ({ product, selectedProduct, handleCart, page }) => {
    console.log("page:", page);

    const isOutOfStock = (product) => {
        const selections = page === "productDetail" ? selectedProduct : selectedProduct[product.id] || {};
        const selectedSize = selections.size || product.sizes?.[0];
        const selectedColor = selections.color || product.colors?.[0];
        console.log("Stock Item:", selections);
        const stockItem = product.stocks?.find(
            (item) => item.size === selectedSize && item.color === selectedColor
        );

        return !stockItem || stockItem.quantity < 1;
    };
    return (<>
        {page === "productDetail" ? (
            isOutOfStock(product) ? (
                <button
                    className="offCart"
                    disabled
                    style={{ backgroundColor: '#ccc', cursor: 'not-allowed' }}
                    aria-disabled="true"
                >
                    Out of Stock
                </button>
            ) : (
                <button className="Add" onClick={() => handleCart(product)}>
                    Add to Cart
                </button>
            )
        ) : (
            isOutOfStock(product) ? (
                <button
                    className="outOfCart"
                    disabled
                    style={{ backgroundColor: '#ccc', cursor: 'not-allowed' }}
                    aria-disabled="true"
                >
                    Out of Stock
                </button>
            ) : (
                <button className="addToCart" onClick={() => handleCart(product)}>
                    Add to Cart
                </button>
            )
        )}
    </>
    )
};

export default Stock;