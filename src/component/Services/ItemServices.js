import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/item';

export const getItem = (itemId) => {
  const url = `${REST_API_BASE_URL}/${itemId}`;
  return axios.get(url);
};

export const AddItemInfo = (formData) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };

    return axios.post(REST_API_BASE_URL, formData, config);
};

export const updateItem = (itemId, formData) => {
  const config = {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  };

  const url = `${REST_API_BASE_URL}/${itemId}`;

  return axios.put(url, formData, config);
};

// export const getItem = (itemId) => axios.get (REST_API_BASE_URL + '/' + itemId);

// export const updateItem = (itemId, itemDto) => axios.put(REST_API_BASE_URL + '/' + itemId, itemDto);