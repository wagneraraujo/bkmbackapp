import React, { useEffect, useState } from 'react'
import {
  Button,
  Box,
  Center,
  Heading,
  Text,
  useToast,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import {
  Layout,
  LayoutContent,
  Header,
  CardServices,
  RecordNotFoundFirstAccess,
} from '../../../components'
import { getStorage, getStorageArray } from '../../../hooks/useLocalStorage'
import { useForm } from 'react-hook-form'
import Router from 'next/router'
import { createFirstAccess } from '../../../services/firstAccess'
import { toastMessageDel, toastMessageSave } from '../../../utils'

const AppHeader = () => {
  return <Header path="/firstAccess/paymentOptions" />
}

const Services = () => {
  const colotButton = useColorModeValue('primary', 'primary')
  const textColor = useColorModeValue('textColor.grayLight','textColor.grayDark')
  const colorGray = useColorModeValue('textColor.light', 'textColor.dark')

  const [dataListServices, setDataListServices] = useState([])
  const [existsData, setExistsData] = useState(false)

  const toast = useToast()
  const position = useBreakpointValue({ base: 'bottom-right' }) as any;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()
  
  useEffect(() => {
    const data = getStorageArray('services')
    setDataListServices(data)
  }, [])

  useEffect(() => {
    if(!!dataListServices[0]) {
      setExistsData((Object.keys(dataListServices[0]).length > 0))
    }
  }, [dataListServices])

  const onSubmit = async (values) => {
    console.log('onSubmit: ', values)
    const storage = getStorage()
    const response = await createFirstAccess(storage)
    console.log('response: ', response)

    toast.closeAll()
    toast(toastMessageSave(response.error, position))

    if(response.error === false) {
      Router.push('/')
    }
    
    //console.log('response: ', response.code)
    //Router.push('/firstAccess/operatingSchedule/')
  }

  return (
    <Layout>
      <AppHeader />
      <LayoutContent>

        <form onSubmit={handleSubmit(onSubmit)}>
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
            Serviços
          </Heading>
          <Text
            fontWeight={400}
            fontSize={'16px'}
            lineHeight={'19px'}
            textColor={colorGray}
            marginBottom={'16px'}
          >
            Adicione os serviços que seu estabelecimento fornece para que os
            clientes possam realizar agendamento.
          </Text>

          <NextLink href="/firstAccess/servicesScreen/addService" passHref>
            <Box
              width={'100%'}
              height={'59px'}
              margin={'16px 0px'}
              borderColor={colotButton}
              borderWidth={'1px'}
              borderStyle={'solid'}
              borderRadius={'6px 6px'}
              bg={useColorModeValue('#fff', 'transparent')}
            >
              <Center
                width={'100%'}
                height={'56px'}
                fontWeight={800}
                fontSize={'18px'}
                lineHeight={'24px'}
                textColor={colotButton}
              >
                {'Adicionar Serviço'}
              </Center>
            </Box>
          </NextLink>

          {
            existsData ? 
            dataListServices.map((service: any) => (
              <CardServices
                key={service.id}
                id={service.id}
                name={service.name}
                amount={service.amount}
                time={service.time}
              />
            ))
            :
            <RecordNotFoundFirstAccess content={'Adicione novos serviços para aparecer na listagem...'} />
          }

          <Button
            type={"submit"}
            width={'full'}
            marginTop={'40px'}
            height={'59px'}
            bottom={'30px'}
          >
            {/* <NextLink href="/firstAccess/servicesScreen" passHref> */}
              Finalizar
            {/* </NextLink> */}
          </Button>
        </form>
      </LayoutContent>
    </Layout>
  )
}

export default Services