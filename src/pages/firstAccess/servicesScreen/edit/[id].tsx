import { useEffect, useState } from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  useColorModeValue,
  FormErrorMessage,
  Divider,
  useToast,
  useBreakpointValue,
  Flex,
  Text,
  Switch,
  Stack,
  NumberInput,
  NumberInputField,
  Center,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import {
  Layout,
  LayoutContent,
  Header,
} from '../../../../components'
import Router from 'next/router'
import { toastMessageDel, toastMessageSave } from '../../../../utils'
import { getStorageArray, setStorageArray, setStorageArrayByIndex } from '../../../../hooks/useLocalStorage'

const AppHeader = () => {
  return <Header path="/firstAccess/servicesScreen/" />
}

const EditService = (props) => {

  const { id } = props

  const textColor = useColorModeValue('textColor.grayLight','textColor.grayDark')
  const bgColorCheck = useColorModeValue('inputColor.bgLight','inputColor.bgDark')
  const borderColor = useColorModeValue('inputColor.borderLight','inputColor.borderDark')
  const colorTextLabel = useColorModeValue('textLabel.light', 'textLabel.dark')

  const [service, setService] = useState({})

  const toast = useToast()
  const position = useBreakpointValue({ base: 'bottom-right' }) as any;

  useEffect(() => {
    let service = getStorageArray('services')
    if(Array.isArray(service)) {
      service = service.find(service => service.id === parseInt(id))
    }

    if(!!service) {
      setService(service)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangeSwitch = (e) => {
    const { id } = e.target
    setService((state: any) => ({
      ...state,
      [id]: !service[id]
    }))
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  async function onSubmit(values: any) {

    const editService = {
      ...values,
      id: service['id'],
      type: service['type'],
      promotion: service['promotion']
    }

    setStorageArrayByIndex(editService, 'services')
    handleToast(1)
  }

  const handleDelete = (id) => {

    let listServices = getStorageArray('services') || []
    listServices = listServices.filter((service) => service.id !== parseInt(id))
    setStorageArray(listServices, 'services')
    handleToast(2)
  }

  const handleToast = (type) => {
    switch(type) {
      case 1:
        toast.closeAll()
        toast(toastMessageSave(false, position))
        break;
      case 2:
        toast.closeAll()
        toast(toastMessageDel(false, position))
        break;
    }
    Router.push('/firstAccess/servicesScreen/')
  }

  return (
    <Layout>
      <AppHeader />
      <LayoutContent>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
        >
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
            Editar Serviço
          </Heading>
          <Center
            width={"100px"}
            height={"50px"}
            border={"1px solid red"}
            onClick={() => handleDelete(id)}
          >
            Deletar
          </Center>
        </Flex>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl marginTop={'32px'} isInvalid={errors.name}>
            <FormLabel mb={0} htmlFor="name" textColor={colorTextLabel}>
              Nome do serviço
            </FormLabel>
            <Input
              type="text"
              id="name"
              defaultValue={service['name']}
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
              defaultValue={service['amount']}
              placeholder="R$"
              {...register('amount', {
                required: 'Campo obrigatório',
              })}
            />
            {/* <NumberInput
              defaultValue={service['amount']}
              min={0}
              precision={2}
              step={0.2}
              bg={useColorModeValue('inputColor.bgLight', 'gray.800')}
            >
              <NumberInputField
                id="amount"
                {...register('amount', {
                  required: 'Campo obrigatório',
                })}
              />
            </NumberInput> */}
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
              defaultValue={service['time']}
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
                  isChecked={service['promotion']}
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

export default EditService

export async function getServerSideProps(context) {

  const { query: { id } } = context

  return {
    props: {
      id: id,
    },
  }
}