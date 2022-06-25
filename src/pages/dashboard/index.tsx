import React, { useEffect, useContext } from 'react'
import NextLink from 'next/link'
import {
  Text,
  Button,
  Flex,
  Heading,
  Input,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  Box,
  Divider,
  Image,
  Center,
  FormControl,
  useToast,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { EmailIcon, LockIcon } from '@chakra-ui/icons'
import { useForm } from 'react-hook-form'
import { Layout, LayoutContent, HeaderLogin, CardDashBoard } from '../../components'
import { ThemeContextBkm } from "../../contexts/theme";
import { AuthContext } from '../../contexts/Auth/AuthContext'
import { useAuth } from '../../hooks/useApi'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Calendar from '../../../public/dashboard/Calendar.svg'
import ProductService from '../../../public/dashboard/ProductService.svg'
import Customer from '../../../public/dashboard/Customer.svg'
import Collaborator from '../../../public/dashboard/Collaborator.svg'
import Report from '../../../public/dashboard/Report.svg'

const DashBoard = (props) => {
  const bgColor = useColorModeValue('bgBody.light', 'bgBody.dark')
  const bgColorFrame = useColorModeValue('inputColor.bgLight', 'black.800')
  const colorPrimary = useColorModeValue('primary', 'primary')
  const fontColorGray = useColorModeValue('textColor.grayLight', 'textColor.grayDark')
  const borderColor = useColorModeValue('inputColor.borderLight','inputColor.borderDark')

  const { themebkm } = useContext(ThemeContextBkm)

  const img = 'https://imgs.search.brave.com/_hjtqf0lhZEBH8Gcy3LeiXy5K98Uyp2k4hK-_Wk-m-8/rs:fit:640:640:1/g:ce/aHR0cHM6Ly9wbmcu/cG5ndHJlZS5jb20v/cG5nLXZlY3Rvci8y/MDE5MDYyOS9vdXJs/YXJnZS9wbmd0cmVl/LWJ1c2luZXNzLXBl/b3BsZS1hdmF0YXIt/aWNvbi11c2VyLXBy/b2ZpbGUtZnJlZS12/ZWN0b3ItcG5nLWlt/YWdlXzE1Mjc2NjQu/anBn'

  const Header = () => {
    
    return (
      <Box
        width={"100%"}
        minHeight={"300px"}
        backgroundColor={"primary"}
      >
        <Flex marginTop={"70px"} marginX={"40px"} color={"#FFF"}>
          <Box width={"100%"}>
            <Heading minWidth={"210px"}>Olá, John Doe</Heading>
            <Heading as='h2' size='sm'>
              Bem-vindo de volta!
            </Heading>
          </Box>
          <Center width={"80px"}>
            <Image
              src={img}
              width={'inherit'}
              borderRadius={"50% 50%"}
              alt="Image customer"
              border={"3px solid #FFF"}
            />
          </Center>
        </Flex>
      </Box>
    )
  }

  const minWidthScreen = "340px"

  return (
    
    <>
      <Layout minWidth={minWidthScreen}>
        <Header />

        <Center width={"100%"} >
          <Box
            width={"90%"}
            minHeight={"120px"}
            minWidth={"120px"}
            backgroundColor={bgColorFrame}
            zIndex={999}
            // left={"26px"}
            top={"197px"}
            position={"absolute"}
            borderWidth={'1px'}
            borderStyle={'inner'}
            borderRadius={'16px 16px'}
            borderColor={borderColor}
            paddingY={"15px"}
            paddingX={"20px"}
            overflow={"hidden"}
          >
            <Text color={"primary"} fontWeight={700} marginBottom={"10px"}>
              Próximo agendamento
            </Text>
            <NextLink href="/scheduling/" passHref>
              <Flex height={"50px"} >
                <Center width={"70px"}>
                  <Calendar style={{color: themebkm['colors']['primary']}} />
                </Center>
                <Box width={"100%"} paddingLeft={"15px"}>
                  <Heading as='h2' size='sm' textColor={fontColorGray} minWidth={"156px"}>
                    23 de Maio de 2022
                  </Heading>
                  <Text color={useColorModeValue('#545454', '#f8f8f8')}>
                    08:00 - 09:00
                  </Text>
                </Box>
                <Center width={"80px"} height={"100%"}>
                  <ChevronRightIcon w={7} h={7} />
                </Center>
              </Flex>
            </NextLink>
          </Box>
        </Center>

        <Box
          position={'absolute'}
          top={0}
          left={0}
          marginTop={'266px'}
          width={'full'}
          // height={'calc(100% - 266px)'}
          backgroundColor={bgColor}
          borderTopRadius={10}
          color={'#000'}
          minWidth={'300px'}
        >
          <LayoutContent marginTop={'70px'} minWidth={minWidthScreen}>

            <Divider
              width={'100%'}
              borderColor={'#CBD5E0'}
              borderWidth={'1px'}
              borderStyle={'solid'}
              mt="3"
              margin={'32px 0'}
            />

            <Grid templateColumns='repeat(2, 1fr)' gap={6}>
              <CardDashBoard href={'/productServices/'}>
                <Center width={"70px"}>
                  <ProductService style={{color: themebkm['colors']['primary']}} />
                </Center>
                <Heading as='h3' size='sm' textColor={fontColorGray}>
                  Produtos e Serviços
                </Heading>
              </CardDashBoard>

              <CardDashBoard href={'/scheduling/'}>
                <Center width={"70px"}>
                  <Report style={{color: themebkm['colors']['primary']}} />
                </Center>
                <Heading as='h3' size='sm'textColor={fontColorGray}>
                  Agendamentos
                </Heading>
              </CardDashBoard>

              <CardDashBoard href={'#'}>
                <Center width={"70px"}>
                  <Collaborator style={{color: themebkm['colors']['primary']}} />
                </Center>
                <Heading as='h3' size='sm'textColor={fontColorGray}>
                  Colaboradores
                </Heading>
              </CardDashBoard>

              <CardDashBoard href={'#'}>
                <Center width={"70px"}>
                  <Customer style={{color: themebkm['colors']['primary']}} />
                </Center>
                <Heading as='h3' size='sm'textColor={fontColorGray}>
                  Clientes
                </Heading>
              </CardDashBoard>
              
              <CardDashBoard href={'#'}>
                <Center width={"70px"}>
                  <Collaborator style={{color: themebkm['colors']['primary']}} />
                </Center>
                <Heading as='h3' size='sm'textColor={fontColorGray}>
                  Comandas
                </Heading>
              </CardDashBoard>

              {/* <CardDashBoard href={'/special_commision/'}> */}
              <CardDashBoard href={'#'}>
                <Center width={"70px"}>
                  <Report style={{color: themebkm['colors']['primary']}} />
                </Center>
                <Heading as='h3' size='sm'textColor={fontColorGray}>
                  Comissões
                </Heading>
              </CardDashBoard>

              <CardDashBoard href={'#'}>
                <Center width={"70px"}>
                  <Report style={{color: themebkm['colors']['primary']}} />
                </Center>
                <Heading as='h3' size='sm'textColor={fontColorGray}>
                  Empresas
                </Heading>
              </CardDashBoard>
            </Grid>

            
          </LayoutContent>
        </Box>
      </Layout>
    </>
  )
}

// export async function getServerSideProps(context) {
//   const response = await fetch('http://localhost:3000/api/hello')
//   const data = await response.json()

//   return {
//     props: {
//       //test: 'getServerSideProps funcionou',
//       hello: data,
//     }, // will be passed to the page component as props
//   }
// }

export default DashBoard