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
        category: 'Serviço',
        name: 'Corte de Cabelo Masculino',
        image: '/produtos/corte.png',
      },
      {
        id: 2,
        type: 2,
        category: 'Produto',
        name: 'Coca-Cola Lata',
        image: '/produtos/coca.png',
        stock: 7
      },
      {
        id: 3,
        type: 2,
        category: 'Produto',
        name: 'Cerveja Heineken Long Neck 330ml',
        image: '/produtos/cerveja.png',
        stock: 9
      },
      {
        id: 4,
        type: 1,
        category: 'Serviço',
        name: 'Corte de Barba Masculino',
        image: '/produtos/corte.png',
      },
    ])
  }, 300)
}
