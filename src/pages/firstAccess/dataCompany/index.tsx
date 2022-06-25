import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Text,
  useColorModeValue,
  VStack,
  Stack,
  InputRightElement,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import Router from 'next/router'
import { Search2Icon } from '@chakra-ui/icons'
import {
  Header,
  Layout,
  LayoutContent,
} from '../../../components'
import { setStorageFirstAccess, getStorageFirstAccess } from '../../../hooks/useLocalStorage'
import axios from 'axios'

const AppHeader = () => {
  return <Header path="/firstAccess/createCompany/" stage={2} />
}

const DataCompany = () => {
  const iconColor = useColorModeValue('black', 'orange')
  const fontColorGray = useColorModeValue('textColor.grayLight', 'textColor.grayDark')
  const colorGray = useColorModeValue('textColor.light', 'textColor.dark')
  const iconInput = useColorModeValue('iconInput.light', 'iconInput.dark')
  const colorTextLabel = useColorModeValue('textLabel.light', 'textLabel.dark')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  function loadDataFromCep(response) {
    const address = {
      "street": response.logradouro,
      "complement": response.complemento,
      "district": response.bairro,
      "city": response.localidade
    }

    setStorageFirstAccess(address, 'address')
    setDataCompany((state) => ({
      ...state,
      ...address
    }))
  }

  const handleChangeCep = async (e: any) => {
    const cep = e.target.value
    if(cep.length < 9) {
      setStorageFirstAccess({'cep': cep}, 'address')
    }
    if(cep.length === 8) {
      await axios.get(`https://viacep.com.br/ws/${cep}/json/?callback=loadDataFromCep`)
        .then(function (response) {
          eval(response.data)
        })
        .catch(function (error) {
          // handle error
          //console.log(error);
        })
        .then(function () {
          // always executed
        });
    }
  }

  const [dataCompany, setDataCompany] = useState({
    cep: '',
    street: '',
    number: '',
    complement: '',
    district: '',
    city: '',
  })

  useEffect(() => {
    const cep = getStorageFirstAccess('cep', 'address') || ''
    const street = getStorageFirstAccess('street', 'address') || ''
    const number = getStorageFirstAccess('number', 'address') || ''
    const complement = getStorageFirstAccess('complement', 'address') || ''
    const district = getStorageFirstAccess('district', 'address') || ''
    const city = getStorageFirstAccess('city', 'address') || ''

    setDataCompany({
      cep: cep,
      street: street,
      number: number,
      complement: complement,
      district: district,
      city: city,
    })
  }, [])

  const handleChange = (event) => {
    const { id, value } = event.target
    setDataCompany((state) => ({
      ...state,
      [id]: value
    }))
    if(id === 'cep') {
      handleChangeCep(event)
    }
    setStorageFirstAccess({[id]: value}, 'address')
  }

  const onSubmit = (values) => {
    console.log('onSubmit: ', values)
    Router.push('/firstAccess/operatingSchedule/')
  }

  return (
    <Layout>
      <AppHeader />

      <LayoutContent>
        <Box color={iconColor}>
          <Heading
            as="h1"
            lineHeight={'110%'}
            textColor={fontColorGray}
            fontSize={'28px'}
            fontWeight={'black'}
            textAlign={'left'}
            marginBottom={'16px'}
            marginTop={'21px'}
          >
            Localização
          </Heading>
        </Box>

        <Text fontSize={'sm'} color={colorGray}>
          Configure seu endereço para que seus clientes possam te encontrar.
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <FormControl mt="5" isInvalid={errors.cep}>
              <InputGroup>
                <InputRightElement mt={'7px'}>
                  <Search2Icon color={iconInput} />
                </InputRightElement>
              </InputGroup>
              <Input
                type="number"
                id="cep"
                placeholder="Digite seu CEP"
                {...register('cep', {
                  required: 'Campo obrigatório',
                })}
                value={dataCompany.cep}
                onChange={handleChange}
              />
              <FormErrorMessage>
                {errors.cep && errors.cep.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt="5" isInvalid={errors.street}>
              <FormLabel mb={0} htmlFor="street" textColor={colorTextLabel}>
                Rua
              </FormLabel>
              <Input
                type="text"
                id="street"
                {...register('street', {
                  required: 'Campo obrigatório',
                })}
                value={dataCompany.street}
                onChange={handleChange}
              />
              <FormErrorMessage>
                {errors.street && errors.street.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt="5" isInvalid={errors.number}>
              <FormLabel mb={0} htmlFor="number" textColor={colorTextLabel}>
                Número
              </FormLabel>
              <Input
                type="number"
                id="number"
                {...register('number', {
                  required: 'Campo obrigatório',
                })}
                value={dataCompany.number}
                onChange={handleChange}
              />
              <FormErrorMessage>
                {errors.number && errors.number.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt="5">
              <FormLabel
                mb={0}
                htmlFor="complement"
                textColor={colorTextLabel}
              >
                Complemento
              </FormLabel>
              <Input
                type="text"
                id="complement"
                value={dataCompany.complement}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mt="5" isInvalid={errors.district}>
              <FormLabel mb={0} htmlFor="district" textColor={colorTextLabel}>
                Bairro
              </FormLabel>
              <Input
                type="text"
                id="district"
                {...register('district', {
                  required: 'Campo obrigatório',
                })}
                value={dataCompany.district}
                onChange={handleChange}
              />
              <FormErrorMessage>
                {errors.district && errors.district.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt="5" isInvalid={errors.city}>
              <FormLabel mb={0} htmlFor="city" textColor={colorTextLabel}>
                Cidade
              </FormLabel>
              <Input
                type="text"
                id="city"
                {...register('city', {
                  required: 'Campo obrigatório',
                })}
                value={dataCompany.city}
                onChange={handleChange}
              />
              <FormErrorMessage>
                {errors.city && errors.city.message}
              </FormErrorMessage>
              </FormControl>
          </VStack>

          <Stack spacing={10} pt={2}>
            <Button
              type={'submit'}
              w={'full'}
              height={'59px'}
              mt={10}
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

export default DataCompany