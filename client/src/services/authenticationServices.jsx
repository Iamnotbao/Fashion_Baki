import axios from "axios";
const baseURL = "/api/auth"

export const verifyUser = async (token) => {
    try {
        const response = await axios.get(`${baseURL}/verify?token=${token}`, {
            headers: {
                "Content-Type": "application/json"
            }
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
        const response = await axios.post(`${baseURL}/reset?email=${email}`)
        return response.data;
    } catch (error) {
        console.log(error);
    }

}
export const verifyPassword = async (token) => {
    try {
        const response = await axios.post(`${baseURL}/reset/verify?token=${token}`)
        if (response.data) { 
            return response.data; 
        }


    } catch (error) {
        console.log(error);
    }

}

export const resetPassword = async (email, password) => {
    try {
        const response = await axios.put(`${baseURL}/resetpass?email=${email}&password=${password}`)
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
        const response = await axios.post(`${baseURL}/google`,{},{
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