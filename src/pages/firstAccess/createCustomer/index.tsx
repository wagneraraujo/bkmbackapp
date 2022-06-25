import { useEffect, useState, useRef } from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  VStack,
  FormErrorMessage,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import Router from 'next/router'
import {
  Header,
  Layout,
  LayoutContent,
  LoadingBetweenScreen,
} from '../../../components'

const AppHeader = () => {
  return <Header path="/firstAccess/selectProfile/" />
}

const AppSignupCard = () => {
  const [showPassword, setShowPassword] = useState(false)

  const formBackground = useColorModeValue('gray.100', 'gray.700')
  const iconColor = useColorModeValue('black', 'orange')
  const fontColorGray = useColorModeValue(
    'textColor.grayLight',
    'textColor.grayDark',
  )
  const colorGray = useColorModeValue('textColor.light', 'textColor.dark')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        //alert(JSON.stringify(values))
        Router.push('/login')
        // resolve()
      }, 3000)
    })
  }

  const validePass = useRef({})
  validePass.current = watch('password', '')

  return (
    <Layout>
      <AppHeader />

      <LayoutContent>
        <Box>
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
            Criar Conta
          </Heading>
          <Text fontSize={'sm'} color={colorGray}>
            Preencha os campos abaixo com seus dados e crie uma conta de
            cliente.
          </Text>{' '}
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <FormControl mt="5" isInvalid={errors.name}>
              <FormLabel mb={0} htmlFor="name">
                Seu Nome
              </FormLabel>
              <Input
                type="text"
                id="name"
                {...register('name', {
                  required: 'Digite seu nome',
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt="5" isInvalid={errors.phone}>
              <FormLabel mb={0} htmlFor="fone">
                Telefone
              </FormLabel>
              <Input
                type="text"
                id="fone"
                placeholder="xx xxxxx-xxxx"
                {...register('phone', {
                  required: 'Telefone é obrigatório',
                })}
              />
              <FormErrorMessage>
                {errors.phone && errors.phone.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt="5" isInvalid={errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                type="email"
                id="email"
                placeholder="email@gmail.com"
                {...register('email', {
                  required: 'Email é obrigatório',
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt="5" isInvalid={errors.password}>
              <FormLabel htmlFor="password" mb={0}>
                Senha
              </FormLabel>
              <InputGroup>
                <Input
                  type="password"
                  id="password"
                  {...register('password', {
                    required: 'Campo obrigatório',
                  })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt="5" isInvalid={errors.repeatepassword}>
              <FormLabel htmlFor="password-confirm" mb={0}>
                Confirmar Senha
              </FormLabel>
              <InputGroup>
                <Input
                  type="password"
                  id="password-confirm"
                  {...register('repeatepassword', {
                    validate: (value) =>
                      value === validePass.current || 'Senhas não são iguais',
                  })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.repeatepassword && errors.repeatepassword.message}
              </FormErrorMessage>
            </FormControl>

            <Stack margin={'34px 0px'}>
              <Text fontSize={'sm'} fontWeight={'600'} color={colorGray}>
                Ao se cadastrar na plataforma, você está de acordo com os{' '}
                <Link
                  href="#"
                  textDecorationLine={'underline'}
                  color={'primary'}
                  isExternal
                >
                  termos de uso e política de privacidade.
                </Link>
              </Text>{' '}
            </Stack>

            <Stack spacing={10} pt={2} w={'full'}>
              <Button
                type="submit"
                isLoading={isSubmitting}
                size="lg"
                bg="primary"
                w={'full'}
              >
                Cadastrar
              </Button>
            </Stack>
          </VStack>
        </form>

        <NextLink href="/" passHref>
          <Text textAlign="center" fontSize="sm" marginTop={'32px'}>
            Já tem conta?
            <Text as={'span'} color={'primary'} fontWeight={'bold'} ml="2">
              Faça Login!
            </Text>
          </Text>
        </NextLink>
      </LayoutContent>
    </Layout>
  )
}

const ContentSignupCard = ({ loadingScreen }) => {
  return <>{loadingScreen ? <LoadingBetweenScreen /> : <AppSignupCard />}</>
}

const SignupCard = () => {
  const [loadingScreen, setLoadingScreen] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoadingScreen(false)
    }, 500)
  }, [loadingScreen])

  return <ContentSignupCard loadingScreen={loadingScreen} />
}

export default SignupCard
