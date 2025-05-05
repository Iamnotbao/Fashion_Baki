import React from 'react';
import axios from 'axios';
const BASE_URL = "/api/service/products/category"
const SUB_URL = "/api/service/products/subcategory"
const BRAND_URL = "/api/service/products/brand"
export async function getProductBySubByPage(id, page, size) {
        try {
                const response = await axios.get(`${SUB_URL}/${id}?page=${page}&size=${size}`);
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
                const response = await axios.get(`${BASE_URL}/${id}?page=${page}&size=${size}`);
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
                const response = await axios.get(`${BRAND_URL}/${id}?page=${page}&size=${size}`);
                console.log("br",response);
                if (response.data) {
                        return response.data;
                }

        } catch (error) {
                console.error(error);
        }

}
