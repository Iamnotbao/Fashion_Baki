import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL;
export const fetchCart = async () => {
    const response = await axios.get(`${API_BASE_URL}/service/carts`,
        {
            headers: {
                'Content-Type': 'application/json'
            }, withCredentials: true
        },
        {},
    );

    return response.data;
}

export const clearCart = async () => {
    const response = await axios.delete(`${API_BASE_URL}/service/carts`, {
        headers: {
            'Content-Type': 'application/json'
        }, withCredentials: true
    });
    return response.data;
}
export const addCart = async (productId, quantity, size, color) => {

    const response = await axios.post(`${API_BASE_URL}/service/carts/cart_detail`, { productId, quantity, size, color }, {
        headers: {
            'Content-Type': 'application/json'
        }, withCredentials: true
    });

    return response.data;
}


export const updateCart = async (item) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/service/carts/cart_detail`, item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }, withCredentials: true
            },
        );
        return response.data;
    } catch (error) {
        console.log(error);

    }


}

export const removeCart = async (item) => {
    const response = await axios.delete(`${API_BASE_URL}/service/carts/cart_detail/${item.productId}`, {
        headers: {
            'Content-Type': 'application/json'
        }, withCredentials: true
    },);
    return response.data;
}
