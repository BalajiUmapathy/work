import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://192.168.0.107:5000',  
    headers: {
        'Content-type': 'application/json',
    },
});

export default {
    fetchData() {
        return apiClient.get('/api/data');
    },
};
