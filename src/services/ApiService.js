import axios from "axios";

const BASE_URL = 'https://cedf.api.com';

const ApiService = {
    get: async (endpoint, token) =>{
        const response = await axios.get(`${BASE_URL}${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        return response.data;
    },

    post: async (enpoint, data, token=null) =>{
        const headers={
            'Content-Type': 'application/json',
        };
        if(token){
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await axios.post(`${BASE_URL}${enpoint}`, data, {
            headers,
            withCredentials: true,
        });

        return response.data;
    },
};

export default ApiService;