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
  useBreakpointValue,
} from '@chakra-ui/react'
import { EmailIcon, LockIcon } from '@chakra-ui/icons'
import { useForm } from 'react-hook-form'
import { Layout, LayoutContent, HeaderLogin } from '../../components'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import { useAuth } from '../../hooks/useApi'
import Router from 'next/router'
import { getLogin } from '../../services/login'
import { toastMessageLogin } from '../../utils'

const Login = () => {
  const bgColor = useColorModeValue('bgBody.light', 'bgBody.dark')
  const colorPrimary = useColorModeValue('primary', 'primary')
  const fontColorGray = useColorModeValue(
    'textColor.grayLight',
    'textColor.grayDark',
  )
  const iconInput = useColorModeValue('iconInput.light', 'iconInput.dark')
  const bgColorFacebook = useColorModeValue('facebook.light', 'facebook.dark')
  const colorFacebookBorder = useColorModeValue(
    'facebookBorder.light',
    'facebookBorder.dark',
  )
  const colorGoogleBorder = useColorModeValue(
    'googleBorder.light',
    'googleBorder.dark',
  )
  const bgColorGoogle = useColorModeValue('google.light', 'google.dark')

  const iconFacebook = useColorModeValue(
    '/screenIcons/facebookDark.png',
    '/screenIcons/facebookLight.png',
  )
  const iconGoogle = useColorModeValue(
    '/screenIcons/googleDark.png',
    '/screenIcons/googleLight.png',
  )

  const isError = false

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const auth = useContext(AuthContext)
  const api = useAuth()
  const toast = useToast()
  const position = useBreakpointValue({ base: 'top-right' }) as any;

  type PropsData = {
    email: string
    password: string
  }

  async function onSubmit(data: PropsData) {

    const response = await getLogin(data)

    //console.log('response: ', response)
    const error = Boolean(response['error'])

    toast.closeAll()
    toast(toastMessageLogin(error, position))

    if(error === false) {
      Router.push('/dashboard/')
    }

    // const responseEmail = await api.validateEmail(data.email);
    // if(responseEmail.status === 200) {

    // }
    //const response = await auth.signin(data.email, data.password)

    // if (data.email && data.password) {
    //   const isLogged = await auth.signin(data.email, data.password);
    // }

    // toast.closeAll()
    // toast({
    //   position: 'bottom-right',
    //   status: ToasterType.success,
    //   title: 'Account created.',
    //   description: "We've created your account for you.",
    //   duration: 6000,
    //   isClosable: true,
    // });
  }

  return (
    <>
      <Layout>
        <HeaderLogin />

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
          <LayoutContent marginTop={'34px'}>
            <Heading fontWeight={900} fontSize={'36px'} marginBottom={'24px'}>
              <Text as={'span'} display={'block'} color={fontColorGray}>
                Acesse
              </Text>
              <Text as={'span'} display={'block'} color={'primary'}>
                sua conta
              </Text>
            </Heading>

            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={isError}>
                <InputGroup>
                  <InputRightElement mt={'14px'}>
                    <EmailIcon color={iconInput} />
                  </InputRightElement>
                  <Input
                    type="email"
                    id="email"
                    placeholder={'Email'}
                    height={'52px'}
                    {...register('email', { required: true })}
                  />
                </InputGroup>
              </FormControl>

              <FormControl isInvalid={isError}>
                <InputGroup>
                  <InputRightElement mt={'22px'}>
                    <LockIcon color={iconInput} />
                  </InputRightElement>
                  <Input
                    type="password"
                    id="password"
                    marginTop={'16px'}
                    placeholder={'Senha'}
                    height={'52px'}
                    {...register('password', { required: true })}
                  />
                </InputGroup>
              </FormControl>

              {/*<NextLink href="/password/recover" passHref>
                <Text
                  mb={3}
                  textAlign="right"
                  fontSize="18px"
                  color={colorPrimary}
                  fontWeight={600}
                  lineHeight={'22px'}
                  marginTop={'16px'}
                  marginBottom={'32px'}
                >
                  Esqueceu a senha?
                </Text>
              </NextLink>*/}

              <Button
                type="submit"
                width={'full'}
                height={'59px'}
                borderRadius={'6px'}
                bg={'primary'}
                marginTop={"30px"}
              >
                Login
              </Button>
            </form>

            <Flex
              height={'70px'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Divider borderColor={'rgba(135, 135, 135, 0.4)'} />

              <Text
                minWidth={'110px'}
                textAlign={'center'}
                fontWeight={700}
                fontSize={'14px'}
                color={'rgba(135, 135, 135, 0.4)'}
                lineHeight={'28px'}
              >
                Ou
              </Text>

              <Divider borderColor={'rgba(135, 135, 135, 0.4)'} />
            </Flex>

            <Flex
              justifyContent={'space-between'}
              alignItems={'center'}
              marginBottom={'32px'}
            >
              <Center
                width={'full'}
                backgroundColor={bgColorFacebook}
                borderColor={colorFacebookBorder}
                borderStyle={'solid'}
                borderWidth={'2px'}
                height={'48px'}
                borderRadius={'6px'}
              >
                <Image
                  src={iconFacebook}
                  alt={'Icone Facebook'}
                  width={'24px'}
                />
              </Center>

              <Box width={'20px'}></Box>

              <Center
                width={'full'}
                backgroundColor={bgColorGoogle}
                borderColor={colorGoogleBorder}
                borderStyle={'solid'}
                borderWidth={'2px'}
                height={'48px'}
                borderRadius={'6px'}
              >
                <Image src={iconGoogle} alt={'Icone Google'} width={'21px'} />
              </Center>
            </Flex>

            <NextLink href="/firstAccess/selectProfile" passHref>
              <Text
                textAlign="center"
                fontStyle={'normal'}
                fontWeight={600}
                fontSize="15.5px"
                lineHeight={'28px'}
                color={'rgba(135, 135, 135, 0.9)'}
                margin={'32px 0'}
              >
                Não possui uma conta?
                <Text
                  as={'span'}
                  color={colorPrimary}
                  fontWeight={'bold'}
                  ml="2"
                >
                  Faça seu cadastro!
                </Text>
              </Text>
            </NextLink>
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
//       hello: data,
//     },
//   }
// }

export default Login
