import axios from 'axios';

const AxiosOptions = { headers: { ApiKey: 'b7b77702-b4ec-4960-b3f7-7d40e44cf5f4' }};
const ORDERS_ENDPOINT = 'https://red-candidate-web.azurewebsites.net/api/Orders';

const handleError = error => {
    console.error('OrderService.handleError', error);
}

export const fetchOrders = async () => {
    try {
        const { data } = await axios.get(ORDERS_ENDPOINT, AxiosOptions);

        return data;
    } 
    catch (error) {
        handleError(error);

        return [];
    };   
}

export const createOrder = async orderData => {
    try {
        const response = await axios.post(ORDERS_ENDPOINT, orderData, AxiosOptions);

        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const deleteOrders = async ordersToDelete => {
    try {
        const DELETE_ENDPOINT = `${ORDERS_ENDPOINT}/Delete`;
        const response = await axios.post(DELETE_ENDPOINT, ordersToDelete, AxiosOptions);

        return response.data;
    } catch (error) {
        handleError(error);
    }
}