// CarouselProduct.jsx
import React, { useCallback } from 'react';
import { Carousel } from 'antd';
import Product from '../Product/Product';
import { useNavigate } from 'react-router-dom';

const CarouselProduct = ({ products = [] }) => {
  const navigation = useNavigate();
  
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  
  const handleBuy = useCallback((id) => {
    console.log('click', id);
    navigation('/Fashion_Baki/product/' + id);
  }, [navigation]);
  
  return (
    <div className="container">
      <Carousel
        arrows
        dots
        afterChange={onChange}
        slidesToShow={5}
        slidesToScroll={1}
      >
        {products.map((product) => (
          <div className="col-md-2" key={product.id} onClick={() => handleBuy(product.id)}>
            <Product item={product}  />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselProduct;