import axios from  'axios';


const API_BASE_URL = '/api/service/orders';


export const getAllOrder =async()=>{
    const response = await axios.get(API_BASE_URL);
    return response.data;
}
 
export const chekOutOrder =async(item)=>{ 
    const response = await axios.post(`${API_BASE_URL}/checkout`,item);
    return response.data;
}
export const getOrderById =async(orderId )=>{
    
    const response = await axios.get(`${API_BASE_URL}/${orderId }`)
    return response.data;
}
export const getAllOrderByUser =async()=>{
    const response = await axios.get(`${API_BASE_URL}/user`);
    return response.data;
}





