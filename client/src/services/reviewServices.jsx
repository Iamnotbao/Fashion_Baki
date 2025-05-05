import axios from 'axios';

const baseUrl = '/community/review'; 

export const getAllReview = async () => {
    try {
        const response = await axios.get(baseUrl,{
            withCredentials: true, 
        });
        if(response.status) {
            console.log("check back data: ", response.data);
        }
        return response.data;
    } catch (error) {
        console.error("API error:", error);
    }
};

export const getReviewsByProduct = async (productId) => {
    console.log(productId);
    try {
        const response = await axios.get(`${baseUrl}/product?productId=${productId}`);
        console.log("here we go ",response.data);
        
        if(response.status) {
            console.log("check back data: ", response.data);
        }
        return response.data;
    } catch (error) {
        console.error("API error:", error);
    }
};

export const createReview = async (review) => {
    console.log(review);
    
    try {
        const response = await axios.post(baseUrl,review,{
            withCredentials: true, 
        });
        if(response.status) {
            console.log("check back data: ", response.data);
        }
        return response.data;
    } catch (error) {
        console.error("API error:", error);
    }
};