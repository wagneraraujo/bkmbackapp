// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  
  const id = req.query?.id

  const data = [
    {
      id: 1,
      name: 'Johná Doe',
      phone: '+55 (47) 98765-4321',
      email: 'johndoe@email.com',
      birthday: '1990-11-28',
      avatar: 'https://imgs.search.brave.com/_hjtqf0lhZEBH8Gcy3LeiXy5K98Uyp2k4hK-_Wk-m-8/rs:fit:640:640:1/g:ce/aHR0cHM6Ly9wbmcu/cG5ndHJlZS5jb20v/cG5nLXZlY3Rvci8y/MDE5MDYyOS9vdXJs/YXJnZS9wbmd0cmVl/LWJ1c2luZXNzLXBl/b3BsZS1hdmF0YXIt/aWNvbi11c2VyLXBy/b2ZpbGUtZnJlZS12/ZWN0b3ItcG5nLWlt/YWdlXzE1Mjc2NjQu/anBn'
    },
    {
      id: 2,
      name: 'Hamiltán Doe',
      phone: '+55 (47) 98765-1234',
      email: 'hamiltondoe@email.com',
      birthday: '1985-10-02',
      avatar: 'https://imgs.search.brave.com/lyEK8T1SemPKzti-DvTOHXSzCoCPRXv-CJt0GHKSBJ8/rs:fit:512:512:1/g:ce/aHR0cHM6Ly9jZG4y/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvYXZhdGFycy05/OS82Mi9hdmF0YXIt/MzcxLTQ1NjMyMy01/MTIucG5n'
    },
    {
      id: 3,
      name: 'Fabrício Goulart',
      phone: '+55 (47) 98765-3214',
      email: 'mariodoe@email.com',
      birthday: '2001-12-10',
      avatar: 'https://imgs.search.brave.com/XAzuJSPwAqAqyIk3TT-tx5Em2G6QMaNSRSh7SfZBug8/rs:fit:439:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC4w/aW43S2ZXbEJQdXpQ/dXZFV1hnTzRRSGFI/XyZwaWQ9QXBp'
    },
  ]

  const filteredData = () => {
    if(id > 0) {
      return data.filter((customer) => customer.id === parseInt(id))
    }
    return data
  }

  setTimeout(() => {
    res.status(200).json(filteredData())
  }, 3000)
}
