import { Customer } from '../../types/Customer'
import { api, tempToken } from '..'

export const getLogin = async (data) => {
  return await api.post('/login', data)
    .then((response) => {
      return {
        error: false,
        message: 'Login efetuado com sucesso!',
        token: response.data.access
      }
    })
    .catch(error => {
      return {
        error: true,
        message: 'Erro ao efetuar login, tente novamente mais tarde!'
      }
    })
}