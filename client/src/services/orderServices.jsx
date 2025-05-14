import axios from  'axios';


const API_BASE_URL = import.meta.env.VITE_API_URL ;


export const getAllOrder =async()=>{
    const response = await axios.get(`${API_BASE_URL}/service/orders`,{
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json',
        },
        withCredentials: true
    });
    return response.data;
}
 
export const chekOutOrder =async(item)=>{ 
    const response = await axios.post(`${API_BASE_URL}/service/orders/checkout`,item,{
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json',
        },
        withCredentials: true
    });
    return response.data;
}
export const getOrderById =async(orderId )=>{
    
    const response = await axios.get(`${API_BASE_URL}/service/orders/${orderId }`,{
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json',
        },
        withCredentials: true
    });
    return response.data;
}
export const getAllOrderByUser =async()=>{
    const response = await axios.get(`${API_BASE_URL}/service/orders/user`,{
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json',
        },
        withCredentials: true
    });
    return response.data;
}





