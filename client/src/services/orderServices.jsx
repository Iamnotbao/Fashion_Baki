import axios from  'axios';


const API_BASE_URL = import.meta.env.VITE_API_URL ;


export const getAllOrder =async()=>{
    const response = await axios.get(`${API_BASE_URL}/service/orders`);
    return response.data;
}
 
export const chekOutOrder =async(item)=>{ 
    const response = await axios.post(`${API_BASE_URL}/service/orders/checkout`,item);
    return response.data;
}
export const getOrderById =async(orderId )=>{
    
    const response = await axios.get(`${API_BASE_URL}/service/orders/${orderId }`)
    return response.data;
}
export const getAllOrderByUser =async()=>{
    const response = await axios.get(`${API_BASE_URL}/service/orders/user`);
    return response.data;
}





