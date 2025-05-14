import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;

export const verifyUser = async (token) => {
    try {
        const response = await axios.get(`${baseURL}/auth/verify?token=${token}`, {
            headers: {
                "Content-Type": "application/json"
            },withCredentials: true
        });
        console.log(response.data);
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.log(error);

    }
}

export const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${baseURL}/auth/reset?email=${email}`,{
            headers: {
                "Content-Type": "application/json"
            }, withCredentials: true
        })
        return response.data;
    } catch (error) {
        console.log(error);
    }

}
export const verifyPassword = async (token) => {
    try {
        const response = await axios.post(`${baseURL}/reset/verify?token=${token}`,{
            headers: {
                "Content-Type": "application/json"
            }, withCredentials: true
        })
        if (response.data) { 
            return response.data; 
        }


    } catch (error) {
        console.log(error);
    }

}

export const resetPassword = async (email, password) => {
    try {
        const response = await axios.put(`${baseURL}/resetpass?email=${email}&password=${password}`,{
            headers: {
                "Content-Type": "application/json"
            },withCredentials: true
        })
        console.log(response);
        
        if (response.data) { 
            return response.data; 
        };
    } catch (error) {
        console.log(error);
    }

}
export const googleAuthentication= async(idToken)=>{
    try {
        const response = await axios.post(`${baseURL}/auth/google`,{},{
            headers: {
                Authorization: `Bearer ${idToken}`,
              },
        })
        if(response.status===200){
            return response.data;
        }   
    }catch(error){
        console.log(error);
        
    }
}