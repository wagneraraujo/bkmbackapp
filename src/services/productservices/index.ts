import { api, tempToken } from '..'

// export const getAllServicosProducts = async () => {
//   const res = await api.get(`/product`, {
//     headers: {
//       Authorization: 'Bearer ' + tempToken,
//     },
//   })
//   return res.data
// }

export const getProducts = async () => {
  return api.get('/product/', {
    headers: {
      Authorization: 'Bearer ' + tempToken,
    },
  })
}

export const createProductService = async (data) => {
  return api.post(
    '/product/',
    data,
    {
      headers: {
        Authorization: 'Bearer ' + tempToken,
      },
    },
  )
}

export const updateProductFunction = async (data) => {
  const { data: response } = await api.put(`/product/${data.id}/`, data, {
    headers: {
      Authorization: 'Bearer ' + tempToken,
    },
  })

  return response.data
}
export const getProductForId = async (id) => {
  return await api.get(`/product/${id}/`, {
    headers: {
      Authorization: 'Bearer ' + tempToken,
    },
  })
}

export const removeProduct = async (id) => {
  return await api.delete(`/product/${id}/`, {
    headers: {
      Authorization: 'Bearer ' + tempToken,
      'Content-Type': 'application/json',
    },
  })
}
