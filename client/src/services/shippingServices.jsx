import axios from "axios"
 const baseURL = import.meta.env.VITE_API_URL
export const createShipping= async(orderId)=>{
    try {
        const result = await axios.post(`${baseURL}/shipping/ghn/create-order/${orderId}`,{
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json',
            },
            withCredentials: true
        });
        console.log("yes",result.data);
        if(result.data){
            return result.data
        }
    } catch (error) {
        console.log(error);
        
    }
  
    
}
export const checkStatusShipping =async(orderId)=>{
    try {
        const response = await axios.get(`${baseURL}/shipping/status/${orderId}`,{
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json',
            },
            withCredentials: true
        });
     return response.status===200?response.status:"Not response!"
    } catch (error) {
        
    }
}