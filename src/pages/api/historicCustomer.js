// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/**
 1 - Serviço
 2 - Produto
 */

export default function handler(req, res) {
  setTimeout(() => {
    res.status(200).json([
      {
        id: 1,
        type: 1,
        description: 'Corte de Cabelo Masculino',
        datetime: '05/05/2022 - 11:26',
        payment: 'Dinheiro',
        price: 40
      },
      {
        id: 2,
        type: 2,
        description: 'Coca-Cola Lata',
        datetime: '05/05/2022 - 11:26',
        payment: 'Crédito',
        price: 7
      },
      {
        id: 3,
        type: 2,
        description: 'Cerveja Heineken Long Neck 330ml',
        datetime: '05/05/2022 - 11:26',
        payment: 'Dinheiro',
        price: 9
      },
      {
        id: 4,
        type: 1,
        description: 'Corte de Barba Masculino',
        datetime: '05/05/2022 - 11:26',
        payment: 'Crédito',
        price: 35
      },
    ])
  }, 300)
}
