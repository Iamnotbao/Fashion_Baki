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
        return response.data ?  response.data : "";
    } catch (error) {
        console.log(error);

    }
}

