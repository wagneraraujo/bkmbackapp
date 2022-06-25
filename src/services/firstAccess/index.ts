import { api, tempToken } from '..'

export const createFirstAccess = async (data) => {
  console.log('service - createFirstAccess: ', data)
  return await api.post('/default_access/', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then((data) => {
    return {
      error: false,
      message: 'Registro salvo com sucesso'
    }
  })
  .catch(error => {
    return {
      error: true,
      message: 'Algo de errado aconteceu'
    }
  })
}