import axios, { AxiosResponse } from 'axios';
import { Customer } from '../types/Customer'

const api = axios.create({
    baseURL: process.env.PUBLIC_API
});

// const header = {
//   headers: {
//     Authorization: 'Bearer ' + localStorage.getItem('authToken'),
//   },
// }

export const useCustomer = () => ({
  insertCustomer: async (customer: Customer) => {
    
    return {
      blOk: true
    };
  },
	updateCustomer: async (data: Customer) => {
    /*const { data: response } = await api.put(`/customer/${data.id}/`, data, header)
    return response.data*/

    // const token = localStorage.getItem('authToken');
		// const response = await api.post('/customer', { token, customer });
		// return response.data;
    setTimeout(() => {
      return {
        blOk: true
      };
    }, 4000)
	}
});