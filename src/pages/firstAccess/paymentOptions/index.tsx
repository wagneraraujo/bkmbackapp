import React, { useState } from 'react'
import {
  Button,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import {
  Layout,
  LayoutContent,
  Header,
} from '../../../components'
import CardPaymentOption from '../../../components/CardPaymentOption'
import { getStorageFirstAccess, setStorageFirstAccess } from '../../../hooks/useLocalStorage'
import { useForm } from 'react-hook-form'
import Router from 'next/router'

const AppHeader = () => {
  return <Header path="/firstAccess/team" />
}

const PaymentOptions = () => {

  const textColor = useColorModeValue('textColor.grayLight','textColor.grayDark')
  const colorGray = useColorModeValue('textColor.light', 'textColor.dark')

  const [dataPaymenthMethod, setDataPaymenthMethod] = useState({
    cash: getStorageFirstAccess('cash', 'payment_options') || '1',
    pix: getStorageFirstAccess('pix', 'payment_options') || '',
    credit_card: getStorageFirstAccess('credit_card', 'payment_options') || '',
    debit_card: getStorageFirstAccess('debit_card', 'payment_options') || '',
  })

  const valuePaymentOption = (data) => {
    return (!data) ? 1 : 0
  }

  const handleChangeSwitch = (e) => {
    const { id } = e.target
    setDataPaymenthMethod({
      ...dataPaymenthMethod,
      [id]: valuePaymentOption(dataPaymenthMethod[id])
    })

    setStorageFirstAccess({[id]: valuePaymentOption(dataPaymenthMethod[id])}, 'payment_options')
  }

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()

  const onSubmit = () => {

    const cash = Boolean(dataPaymenthMethod['cash'])
    const pix = Boolean(dataPaymenthMethod['pix'])
    const credit_card = Boolean(dataPaymenthMethod['credit_card'])
    const debit_card = Boolean(dataPaymenthMethod['debit_card'])

    const paymentOptions = {
      cash: cash,
      pix: pix,
      credit_card: credit_card,
      debit_card: debit_card
    }

    setStorageFirstAccess(paymentOptions, 'payment_options')
    Router.push('/firstAccess/servicesScreen/')
  }

  return (
    <Layout>
      <AppHeader />
      <LayoutContent>
        <Heading
          as="h1"
          maxWidth={'289px'}
          fontWeight={'800'}
          fontSize={'28px'}
          textColor={textColor}
          textAlign={'left'}
          marginTop={'20px'}
          marginBottom={'16px'}
          lineHeight={'33px'}
        >
          Meios de pagamento
        </Heading>
        <Text
          fontWeight={400}
          fontSize={'16px'}
          lineHeight={'19px'}
          textColor={colorGray}
          marginBottom={'16px'}
        >
          Adicione os meios de pagamento que você recebe em seu estabelecimento.
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>

          <CardPaymentOption
            id={"cash"}
            paymentMethod={'Dinheiro'}
            //isChecked={dataPaymenthMethod.cash}
            isChecked={dataPaymenthMethod.cash}
            onChange={handleChangeSwitch}
          />
          <CardPaymentOption
            id={"pix"}
            paymentMethod={'Pix'}
            // isChecked={false}
            isChecked={dataPaymenthMethod.pix}
            onChange={handleChangeSwitch}
          />
          <CardPaymentOption
            id={"credit_card"}
            paymentMethod={'Cartão de Crédito'}
            // isChecked={false}
            isChecked={dataPaymenthMethod.credit_card}
            onChange={handleChangeSwitch}
          />
          <CardPaymentOption
            id={"debit_card"}
            paymentMethod={'Cartão de Débito'}
            // isChecked={false}
            isChecked={dataPaymenthMethod.debit_card}
            onChange={handleChangeSwitch}
          />

          <Stack spacing={10} pt={2}>
            <Button
              type={'submit'}
              w={'full'}
              marginTop={'75px'}
              height={'59px'}
              bottom={'30px'}
              isLoading={isSubmitting}
            >
              Próximo
            </Button>
          </Stack>

        </form>

      </LayoutContent>
    </Layout>
  )
}

export default PaymentOptions
