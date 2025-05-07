import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;

export const payOrder =async(orderId )=>{
    const response = await axios.post(`${baseURL}/payments/momo/${orderId}`)
    return response.data;
}

export const checkStatus = async(orderId)=>{
    const response = await axios.post(`${baseURL}/payments/momo/check/${orderId}`)
    return response.data;
}