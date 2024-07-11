import axios from 'axios';

const api = axios.create({
    baseURL: 'http://<YOUR_BACKEND_URL>/api/v1',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
