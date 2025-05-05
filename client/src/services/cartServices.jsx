import axios from  'axios';
import { header } from 'framer-motion/client';


const API_BASE_URL = '/api/service/carts';


export const fetchCart =async()=>{
    const response = await axios.get(API_BASE_URL);
    console.log("check response fetch cart",response);
    
    return response.data;
}
 
export const clearCart =async()=>{
    const response = await axios.delete(API_BASE_URL);
    return response.data;
}
export const addCart =async(productId,quantity,size,color)=>{
    
    const response = await axios.post(`${API_BASE_URL}/cart_detail`, { productId, quantity,size,color }, {
        headers: {
          'Content-Type': 'application/json'
        },withCredentials:true
      });
    
    return response.data;
}


export const updateCart =async(item)=>{
    try {
        const response = await axios.put(`${API_BASE_URL}/cart_detail`,item);
        return response.data;
    } catch (error) {
        console.log(error);
        
    }
  
   
}

export const removeCart =async(item)=>{
    const response = await axios.delete(`${API_BASE_URL}/cart_detail/${item.productId}`);
    console.log("check reponse remove",response);
    return response.data;
}
