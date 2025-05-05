import axios from "axios";
const baseURL = "/api/payments/momo";

export const payOrder =async(orderId )=>{
    const response = await axios.post(`${baseURL}/${orderId}`)
    return response.data;
}

export const checkStatus = async(orderId)=>{
    const response = await axios.post(`${baseURL}/check/${orderId}`)
    return response.data;
}