import { Customer } from '../../types/Customer'
import { api, tempToken } from '..'
//import { toastMessage } from '../../utils';

// const header = {
//   headers: {
//     Authorization: 'Bearer ' + localStorage.getItem('authToken'),
//   },
// }

export const getCustomers = async () => {
  return api.get('/customer/', {
    headers: {
      Authorization: 'Bearer ' + tempToken,
    },
  })
}

export const UpdateCustomer = async (data: Customer /*, toast: any*/) => {
  const response = await fetch(`http://localhost:3000/api/customer`)
  const retorno = await response.json()

  return retorno.data

  // const error = false
  // toast.closeAll()
  // toast(toastMessage(error))
}
