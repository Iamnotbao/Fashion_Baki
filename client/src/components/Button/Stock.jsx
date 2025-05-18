
const Stock = ({ product, selectedProduct }) => {
    const isOutOfStock = (product) => {
        const selections = selectedProduct[product.id] || {};
        const selectedSize = selections.size || product.sizes?.[0];
        const selectedColor = selections.color || product.colors?.[0];

        const stockItem = product.stocks?.find(
            (item) => item.size === selectedSize && item.color === selectedColor
        );

        return !stockItem || stockItem.quantity < 1;
    };
    return (<>
        {isOutOfStock(product) ? (
            <button className="outOfCart" disabled style={{ backgroundColor: '#ccc', cursor: 'not-allowed' }}>
                Out of Stock
            </button>
        ) : (
            <button className="addToCart" onClick={() => handleCart(product)}>
                Add to Cart
            </button>
        )}</>

    );
}

export default Stock;