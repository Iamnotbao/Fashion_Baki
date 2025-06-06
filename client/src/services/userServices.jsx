import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;

export const fetchUser = async () => {
    try {
        const response = await axios.get(`${baseURL}/users/profile`, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
         localStorage.setItem("id",response.data.id ); 
        console.log("user", response.data);
        
        return response.data ?  response.data : "";
    } catch (error) {
        console.log(error);

    }
}

  export const checkSession = async () => {
    try {
        const c = await axios.get(`${base}/auth/check-session`, {
            headers: {
                "Content-Type": "application/json",
                'Accepts': 'application/json',
            },
            withCredentials: true
        });
       return c.data;
    } catch (error) {
        console.error("Check session error:", error.response ? error.response.data : error.message);
    }
};
export const fetchUserDiscount = async (id) => {
    try {
        const response = await axios.get(`${baseURL}/user-discounts/${id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        console.log("user discounts:", response.data);
        
        return response.data ?  response.data : "";
    } catch (error) {
        console.log(error);

    }
}

