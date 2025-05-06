import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL
export const GetAllRecommendation= async(id)=>{
    try {
        console.log("id: ",id);
        
        const response = await axios.get(`${BASE_URL}/recommendation/${id}`);
        console.log("recommend response for produtcs: ", response.data);
        return response.data ? response.data : null;
        
    } catch (error) {
        console.log(error);
        
    }
    
    
}