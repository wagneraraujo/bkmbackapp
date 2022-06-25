import React, { useEffect, useRef } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Stack,
  Text,
  Link,
  useColorModeValue,
  FormErrorMessage,
  VStack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import Router from 'next/router'
import {
  Header,
  Layout,
  LayoutContent,
} from '../../../components'
import { setStorageFirstAccess, getStorageFirstAccess } from '../../../hooks/useLocalStorage'

const AppHeader = () => {
  return <Header path="/firstAccess/configCompany/" stage={1} />
}

const CreateCompany = () => {

  const fontColorGray = useColorModeValue('textColor.grayLight', 'textColor.grayDark')
  const colorGray = useColorModeValue('textColor.light', 'textColor.dark')
  const colorTextLabel = useColorModeValue('textLabel.light', 'textLabel.dark')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const validePass = useRef({})

  validePass.current = watch('password', '')

  useEffect(() => {
    console.log('watch')
    watch((data) => {
      let current = {...data}
      delete current['repeatepassword']
      setStorageFirstAccess({...current})
    })
  }, [watch])

  function onSubmit() {
    Router.push('/firstAccess/dataCompany/')
  }

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
            Preencha o formulário abaixo com os dados do seu estabelecimento.
          </Text>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <FormControl marginTop={'32px'} isInvalid={errors.name}>
              <FormLabel mb={0} htmlFor="name" textColor={colorTextLabel}>
                Nome do estabelecimento
              </FormLabel>
              <Input
                type="text"
                id="name"
                defaultValue={getStorageFirstAccess('name')}
                placeholder="Nome estabelecimento"
                {...register('name', {
                  required: 'Campo obrigatório',
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt="5" isInvalid={errors.phone}>
              <FormLabel mb={0} htmlFor="phone" textColor={colorTextLabel}>
                Telefone (WhatsApp)
              </FormLabel>
              <Input
                type="tel"
                id="phone"
                defaultValue={getStorageFirstAccess('phone')}
                {...register('phone', {
                  required: 'Campo obrigatório',
                })}
              />
              <FormErrorMessage>
                {errors.phone && errors.phone.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt="5" isInvalid={errors.mail}>
              <FormLabel mb={0} htmlFor="mail" textColor={colorTextLabel}>
                E-mail
              </FormLabel>
              <Input
                type="mail"
                id="mail"
                defaultValue={getStorageFirstAccess('mail')}
                {...register('mail', {
                  required: 'Campo obrigatório',
                })}
              />
              <FormErrorMessage>
                {errors.mail && errors.mail.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt="5" isInvalid={errors.password}>
              <FormLabel mb={0} htmlFor="password" textColor={colorTextLabel}>
                Senha
              </FormLabel>
              <Input
                type="password"
                id="password"
                defaultValue={getStorageFirstAccess('password')}
                {...register('password', {
                  required: 'Campo obrigatório',
                })}
              />
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
          </VStack>

          <Stack mt="34px">
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

export default CreateCompany