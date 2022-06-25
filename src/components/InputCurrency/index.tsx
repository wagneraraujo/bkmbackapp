import React, { useState } from 'react'
import IntlCurrencyInput from 'react-intl-currency-input'
import { chakra } from '@chakra-ui/react'

const CustomInputBrl = chakra(IntlCurrencyInput, {
  // attach style props
  baseStyle: {
    p: 1.5,
    rounded: 'sm',
    bg: 'transparent',
    border: '1px solid #e7e7e7',
    color: '#4d4d4d',
    variant: 'filled',
    borderRadius: '4px',
    width: '100%',
    _dark: {
      bg: 'transparent',
      border: '1px solid #e0e0e0',
      color: '#ccc',
      _focus: '#fff',
    },
  },
})
const currencyConfig = {
  locale: 'pt-BR',
  formats: {
    number: {
      BRL: {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
  },
}

const InputCurrency = (props) => {
  const [value, setvalue] = useState(0)
  const handleChange = (event, value, maskedValue) => {
    event.preventDefault()

    console.log(value) // value without mask (ex: 1234.56)
    console.log(maskedValue) // masked value (ex: R$1234,56)
    setvalue(value)
  }
  return (
    <CustomInputBrl
      currency="BRL"
      defaultValue={value}
      config={currencyConfig}
      {...props}
      onChange={handleChange}
    />
  )
}

export default InputCurrency
