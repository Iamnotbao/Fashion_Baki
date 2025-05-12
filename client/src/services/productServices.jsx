import React from 'react';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL;

export async function getProductBySubByPage(id, page, size) {
        try {
                const response = await axios.get(`${BASE_URL}/service/products/subcategory/${id}?page=${page}&size=${size}`);
                console.log("kk",response);
                
                if (response.data) {
                        return response.data;
                }

        } catch (error) {
                console.error(error);
        }

}
export async function getProductByCatByPage(id, page, size) {
        try {
                const response = await axios.get(`${BASE_URL}/service/products/category/${id}?page=${page}&size=${size}`);
                console.log("kb",response);
                if (response.data) {
                        return response.data.content;
                }

        } catch (error) {
                console.error(error);
        }

}

export async function getProductByBrandByPage(id, page, size) {
        try {
                const response = await axios.get(`${BASE_URL}/service/products/brand/${id}?page=${page}&size=${size}`);
                console.log("br",response);
                if (response.data) {
                        return response.data;
                }

        } catch (error) {
                console.error(error);
        }

}
