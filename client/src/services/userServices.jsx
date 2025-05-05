import axios from "axios";
const baseURL = "/api/users/profile";

export const fetchUser = async () => {
    try {
        const response = await axios.get(baseURL, {
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

