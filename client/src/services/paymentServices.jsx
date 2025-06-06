import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;

export const payOrder =async(order)=>{
    const response = await axios.post(`${baseURL}/payments/momo`, order,{
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json',
        },
        withCredentials: true
    });
    return response.data;
}

export const checkStatus = async(orderId)=>{
    const response = await axios.post(`${baseURL}/payments/momo/check/${orderId}`,{
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json',
        },
        withCredentials: true
    })
    return response.data;
}