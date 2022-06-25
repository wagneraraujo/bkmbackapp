import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  HStack,
  useColorModeValue,
  Stack,
  useRadioGroup,
  useCheckboxGroup,
  useRadio,
  Divider,
  Switch,
  Flex,
  VStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import {
  Header,
  Layout,
  LayoutContent,
  LoadingBetweenScreen,
  RadioSelected,
  CustomCheckbox,
  CardCustomer,
  CardHistoricCustomer,
} from '../../components'
import { ProductServiceTypes } from '../../types/ProductServiceTypes'

import { formatFieldFilter } from '../../utils'

const AppHeader = () => {
  return <Header path="/" />
}

const AppHistoricCustomer = ({ historicCustomer=[] }) => {

  const bgColor = useColorModeValue('bgBody.light', 'bgBody.dark')
  const iconColor = useColorModeValue('black', 'primary')
  const textColor = useColorModeValue(
    'textColor.grayLight',
    'textColor.grayDark',
  )
  const textColorGray = useColorModeValue('textColor.gray', 'textColor.dark')
  const bgColorCheck = useColorModeValue(
    'inputColor.bgLight',
    'inputColor.bgDark',
  )
  const borderColor = useColorModeValue(
    'inputColor.borderLight',
    'inputColor.borderDark',
  )
  const colotButton = useColorModeValue('primary', 'primary')
  const colorGray = useColorModeValue('textColor.light', 'textColor.dark')
  const colorTextLabel = useColorModeValue('textLabel.light', 'textLabel.dark')

  const [customerFilter, setCustomerFilter] = useState('')
  const [historicCustomerList, setCustomerList] = useState(historicCustomer)

  return (
    <>
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
            Histórico de Vendas
          </Heading>

          <Box
            as="h1"
            height={"29px"}
            top={"172px"}
            left={"24px"}
            fontWeight={700}
            fontSize={"24px"}
            lineHeight={"29px"}
            color={'primary'}
          >
            John Doe
          </Box>

          <Divider
            my={'16px'}
            borderColor={useColorModeValue('#CBD5E0', '#4d4d4d')}
          />

          <VStack mt={'20px'}>
            <Tabs w={'full'} colorScheme="primary" p={'0'}>
              <TabList>
                <Tab
                  _selected={{
                    color: 'primary',
                    borderColor: 'primary',
                    borderBottom: '2px solid',
                  }}
                >
                  Todos
                </Tab>
                <Tab
                  _selected={{
                    color: 'primary',
                    borderColor: 'primary',
                    borderBottom: '2px solid',
                  }}
                >
                  Produtos
                </Tab>

                <Tab
                  _selected={{
                    color: 'primary',
                    borderColor: 'primary',
                    borderBottom: '2px solid',
                  }}
                >
                  Serviços
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel p={'0'}>
                  {historicCustomerList.map(customer => (
                    <CardHistoricCustomer customer={customer} key={customer.id} />
                  ))}
                </TabPanel>
                <TabPanel p={'0'}>
                  {historicCustomerList
                    .filter(customer => customer.type === ProductServiceTypes.Servico)
                    .map(customer => (
                      <CardHistoricCustomer customer={customer} key={customer.id} />
                    ))}
                </TabPanel>
                <TabPanel p={'0'}>
                  {historicCustomerList
                    .filter(customer => customer.type === ProductServiceTypes.Produto)
                    .map(customer => (
                      <CardHistoricCustomer customer={customer} key={customer.id} />
                    ))}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>
          
        </LayoutContent>
      </Layout>
    </>
  )
}

const ContentHistoricCustomer = ({ loadingScreen, historicCustomer }) => {
  return (
    <>{loadingScreen ? <LoadingBetweenScreen /> : <AppHistoricCustomer historicCustomer={historicCustomer}/>}</>
  )
}

const HistoricCustomer = (props: any) => {

  const [loadingScreen, setLoadingScreen] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoadingScreen(false)
    }, 500)
  }, [loadingScreen])

  return <ContentHistoricCustomer loadingScreen={loadingScreen} historicCustomer={props.historicCustomer}/>
}

export default HistoricCustomer

export async function getServerSideProps() {
  const response = await fetch('http://localhost:3000/api/historicCustomer')
  const data = await response.json()

  return {
    props: {
      historicCustomer: data,
    }, // will be passed to the page component as props
  }
}