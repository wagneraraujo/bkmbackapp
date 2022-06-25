import React, { useEffect, useState } from 'react'
import {
  Button,
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  HStack,
  Divider,
  IconButton,
  VStack,
  InputGroup,
  InputRightElement,
  Input,
  Tabs,
  TabList,
  TabPanels,
  Select,
  Tab,
  TabPanel,
  theme,
  extendTheme,
  Link,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { Header, Layout, LayoutContent, SwitchCustom } from '../../components'
import { EditIcon, PlusSquareIcon } from '@chakra-ui/icons'
import { FiArchive } from 'react-icons/fi'
import { BiBookOpen } from 'react-icons/bi'
import { IoIosArrowForward } from 'react-icons/io'

import { AiOutlinePlus } from 'react-icons/ai'
import { IoMdRemove } from 'react-icons/io'
import CardHistoryMoviment from '../../components/CardHistoryMoviment'
const AppHeader = () => {
  return <Header path="/" />
}

const NewProductServices = () => {
  const [qtdProduct, setQtdProduct] = useState(5)
  const textColor = useColorModeValue(
    'textColor.grayLight',
    'textColor.grayDark',
  )

  const addQtdProduct = (e) => {
    setQtdProduct((state) => state + 1)
  }
  
  const lessQtdProduct = (e) => {
    setQtdProduct((state) => state - 1)
  }
  return (
    <>
      <Layout>
        <AppHeader />
        <LayoutContent>
          <Flex justifyContent={'space-between'} alignItems={'center'} mb={'6'}>
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
              Histórico de Movimentação
            </Heading>
          </Flex>
          <VStack mt={'40px'}>
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
                  <CardHistoryMoviment
                    category="Serviço"
                    name="Corte Cabelo Masculino"
                    client="Jose Silva"
                    payment={'Débito'}
                    date_created={'05/10/2022-14:36'}
                  />

                  <CardHistoryMoviment
                    category="Serviço"
                    name="Corte Cabelo Masculino"
                    client="Jose Silva"
                    payment={'Débito'}
                    date_created={'05/10/2022-14:36'}
                  />
                </TabPanel>
                <TabPanel>
                  <CardHistoryMoviment
                    category="Produtos"
                    name="Coca Cola 500ml"
                    client="Jose Silva"
                    payment={'Crédito'}
                    date_created={'05/10/2022-14:36'}
                  />
                </TabPanel>
                <TabPanel>
                  <CardHistoryMoviment
                    category="Serviço"
                    name="Corte Cabelo Masculino"
                    client="Jose Silva"
                    payment={'Débito'}
                    date_created={'05/10/2022-14:36'}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>

          <Box marginTop={'calc(100vh - 350px)'}></Box>
        </LayoutContent>
      </Layout>
    </>
  )
}

export default NewProductServices
