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
} from '@chakra-ui/react'
import { EmailIcon, LockIcon } from '@chakra-ui/icons'
import { useForm } from 'react-hook-form';

import { Layout, LayoutContent, HeaderLogin } from '../../../components'

const Login = () => {

  const bgColor = useColorModeValue('bgBody.light', 'bgBody.dark')
  const colorPrimary = useColorModeValue('orange.light', 'orange.dark')
  const fontColorGray = useColorModeValue('textColor.grayLight', 'textColor.grayDark',)
  const iconInput = useColorModeValue('iconInput.light', 'iconInput.dark')
  const bgColorFacebook = useColorModeValue('facebook.light', 'facebook.dark')
  const bgColorGoogle = useColorModeValue('google.light', 'google.dark')

  const isError = !true

  const { register, handleSubmit, formState: { errors }, } = useForm();
  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <>
      <Layout height={'100vh'}>
        
        <HeaderLogin />

        <Box
          position={'absolute'}
          top={0}
          left={0}
          marginTop={'266px'}
          width={'full'}
          height={'calc(100% - 266px)'}
          backgroundColor={bgColor}
          borderTopRadius={10}
          color={'#000'}
          minWidth={'300px'}
        >
          <LayoutContent marginTop={'34px'}>
            <Heading fontWeight={900} fontSize={'36px'}>
              <Text color={fontColorGray}>Recuperar</Text>
              <Text color={'orange.400'} mb={'48px'}>
                sua senha
              </Text>
            </Heading>

            <form onSubmit={handleSubmit(onSubmit)}>

              <FormControl isInvalid={isError}>
                <InputGroup>
                  <InputRightElement mt={"13px"}>
                    <EmailIcon color={iconInput} />
                  </InputRightElement>
                  <Input
                    type="email"
                    placeholder={"Email"}
                    height={"52px"}
                    {...register("recover", {required: true})}
                  />
                </InputGroup>
              </FormControl>

              <Button
                type="submit"
                width={"full"}
                marginTop={"32px"}
              >
                Recuperar Senha
              </Button>

            </form>

          </LayoutContent>
        </Box>
        
      </Layout>
    </>
  )
}

export default Login
