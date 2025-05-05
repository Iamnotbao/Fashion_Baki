// Product.jsx
const Product = ({ item }) => {
    return (
      <>
        <div className="product-img">
          <img src={item?.image} alt={item.name} />
        </div>
        <div className="product-content">
          <p className="product-title">{item.name}</p>
          <div className="product-price-tag">
            <p>{item.price}$</p>
            <p>
              {item.rating}
              <span>
                <i className="fa-solid fa-star"></i>
              </span>
            </p>
          </div>
          <div>{item.status}</div>
        </div>
        <button
          className="product-action"
          id={item.id}
          
        >
          Buy now
        </button>
      </>
    );
  };
  
  export default Product;