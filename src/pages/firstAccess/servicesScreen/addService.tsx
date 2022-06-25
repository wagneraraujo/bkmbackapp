import React, { useEffect, useState } from 'react'
import {
  Button,
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  Divider,
  Switch,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
  Input,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import {
  Layout,
  LayoutContent,
  Header,
} from '../../../components'
import { generateId, setStorageArrayPush } from '../../../hooks/useLocalStorage'
import { ProductServiceTypes } from '../../../types/ProductServiceTypes'
import { toastMessageSave } from '../../../utils'
import Router from 'next/router'

const AppHeader = () => {
  return <Header path="/firstAccess/servicesScreen/" />
}

const AddService = () => {

  const textColor = useColorModeValue(
    'textColor.grayLight',
    'textColor.grayDark',
  )
  const bgColorCheck = useColorModeValue(
    'inputColor.bgLight',
    'inputColor.bgDark',
  )
  const borderColor = useColorModeValue(
    'inputColor.borderLight',
    'inputColor.borderDark',
  )
  const colorTextLabel = useColorModeValue('textLabel.light', 'textLabel.dark')

  const toast = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const [dataAddServices, setDataAddServices] = useState({
    id: null,
    type: ProductServiceTypes.Servico,
    name: '',
    amount: '',
    time: '',
    promotion : false,
  })

  const handleChangeSwitch = (e) => {
    const { id } = e.target
    setDataAddServices((state) => ({
      ...state,
      [id]: !dataAddServices['promotion']
    }))
  }

  const position = useBreakpointValue({ base: 'bottom-right' }) as any;

  function onSubmit(values) {
    
    const id = generateId('services')
    const addService = {
      id: id,
      ...values,
      type: dataAddServices['type'],
      promotion: dataAddServices['promotion']
    }

    setStorageArrayPush(addService, 'services')

    toast.closeAll()
    toast(toastMessageSave(false, position))
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
          Adicionar Serviço
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl marginTop={'32px'} isInvalid={errors.name}>
            <FormLabel mb={0} htmlFor="name" textColor={colorTextLabel}>
              Nome do serviço
            </FormLabel>
            <Input
              type="text"
              id="name"
              placeholder="Nome"
              {...register('name', {
                required: 'Campo obrigatório',
              })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl mt="5" isInvalid={errors.amount}>
            <FormLabel htmlFor="amount">Valor</FormLabel>
            <Input
              type="number"
              id="amount"
              placeholder="R$"
              {...register('amount', {
                required: 'Campo obrigatório',
              })}
            />
            <FormErrorMessage>
              {errors.amount && errors.amount.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl mt="5" isInvalid={errors.time}>
            <FormLabel htmlFor="time">
              Tempo necessário (horas : minutos)
            </FormLabel>
            <Input
              type="time"
              id="time"
              placeholder="R$ 40,00"
              {...register('time', {
                required: 'Campo obrigatório',
              })}
            />
            <FormErrorMessage>
              {errors.time && errors.time.message}
            </FormErrorMessage>
          </FormControl>

          <Divider
            borderColor={'#CBD5E0'}
            borderWidth={'1px'}
            borderStyle={'solid'}
            margin={'16px 0'}
          />

          <Box
            backgroundColor={bgColorCheck}
            width={'full'}
            borderColor={borderColor}
            borderStyle={'solid'}
            borderWidth={'1px'}
            borderRadius={'10px'}
            marginTop={'16px'}
          >
            <Flex
              padding={'14px 11px'}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Box maxWidth={'255px'}>
                <Text
                  maxWidth={'255px'}
                  fontWeight={600}
                  fontSize={'16px'}
                  lineHeight={'21px'}
                  textColor={'#4B4B4B'}
                >
                  Esse produto tem promoção?
                </Text>
                <Text
                  maxWidth={'245px'}
                  fontWeight={400}
                  fontSize={'14px'}
                  lineHeight={'24px'}
                  textColor={'#797979'}
                >
                  Ex: Terças e Quintas o valor é menor.
                </Text>
              </Box>
              <Box maxWidth={'50px'}>
                <Switch
                  id="promotion"
                  //colorScheme={'orange'}
                  isChecked={dataAddServices['promotion']}
                  onChange={handleChangeSwitch}
                />
              </Box>
            </Flex>
          </Box>

          <Stack spacing={10} pt={2}>
            <Button
              type={'submit'}
              w={'full'}
              height={'59px'}
              mt={10}
              isLoading={isSubmitting}
            >
              Gravar
            </Button>
          </Stack>
        </form>
      </LayoutContent>
    </Layout>
  )
}

export default AddService