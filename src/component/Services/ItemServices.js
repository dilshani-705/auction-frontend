import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/item';

export const AddItemInfo = (formData) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };

    return axios.post(REST_API_BASE_URL, formData, config);
};

