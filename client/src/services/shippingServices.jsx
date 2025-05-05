import axios from "axios"
 const baseURL = "/api/shipping"
export const createShipping= async(orderId)=>{
    try {
        const result = await axios.post(`${baseURL}/ghn/create-order/${orderId}`)
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
        const response = await axios.get(`${baseURL}/status/${orderId}`);
     return response.status===200?response.status:"Not response!"
    } catch (error) {
        
    }
}