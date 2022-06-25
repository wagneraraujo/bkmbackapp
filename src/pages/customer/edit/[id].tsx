import { useEffect, useState } from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  useColorModeValue,
  Image,
  VStack,
  FormErrorMessage,
  Divider,
  Center,
  useToast,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import {
  Layout,
  LayoutContent,
  Header,
  LoadingBetweenScreen,
} from '../../../components'
import Router from 'next/router'
import { UpdateCustomer } from '../../../services/customer'
import { toastMessageSave } from '../../../utils'

const AppHeader = () => {
  return <Header path="/customer" />
}

const EditCustomer = (props) => {

  const { customer, error } = props
  const { name, avatar, phone, email, birthday } = customer
  
  const toast = useToast()
  const iconColor = useColorModeValue('black', 'primary')
  const position = useBreakpointValue({ base: 'top-right' }) as any;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  async function onSubmit(values) {
    const data = await UpdateCustomer(values)
    const error = false
    toast.closeAll()
    toast(toastMessageSave(error, position))
  }

  useEffect(() => {
    if(error) {
      Router.push('/customer/')
    }
  }, [error])

  const RenderAllContent = () => {
    return (
      <>
        <AppHeader />

          <LayoutContent>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
              <Heading
                as="h1"
                height={"29px"}
                top={"172px"}
                left={"24px"}
                width={700}
                fontSize={"24px"}
                lineHeight={"29px"}
                color={iconColor}
              >
                {name}
              </Heading>
              <Box width={'340px'} position={"relative"} marginLeft={"29px"}>
                <Image src={avatar} width={'inherit'} borderRadius={"50% 50%"} alt={name} />
                <Box
                  width={'57px'}
                  height={'57px'}
                  backgroundColor={"#25D366"}
                  position={"absolute"}
                  borderRadius={"full"}
                  right={"0px"}
                  bottom={"-20px"}>
                  <Center height={"100%"}>
                    <Image
                      src={'/screenIcons/whatsapp.png'}
                      width={'30px'}
                      height={'30px'}
                      borderRadius={"full"}
                      alt="Image Whatsapp"
                    />
                  </Center>
                </Box>
              </Box>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack>
              <FormControl marginTop={'32px'} isInvalid={errors.name}>
                <FormLabel mb={0} htmlFor="name" /*textColor={colorTextLabel}*/>
                  Nome
                </FormLabel>
                <Input
                  type="text"
                  id="name"
                  defaultValue={name}
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
                  <FormLabel mb={0} htmlFor="phone">
                    WhatsApp ou Celular
                  </FormLabel>
                  <Input
                    type="tel"
                    id="phone"
                    defaultValue={phone}
                    {...register('phone', {
                      required: 'Campo obrigatório',
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
                    defaultValue={email}
                    placeholder="email@gmail.com"
                    {...register('email', {
                      required: 'Campo obrigatório',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                
                <FormControl mt="5" isInvalid={errors.phoneFixo}>
                  <FormLabel mb={0} htmlFor="phone">
                    Telefone Fixo
                  </FormLabel>
                  <Input
                    type="tel"
                    id="phone"
                    defaultValue={phone}
                    {...register('phoneFixo', {
                      required: 'Campo obrigatório',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.phoneFixo && errors.phoneFixo.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl mt="5" isInvalid={errors.birthday}>
                  <FormLabel htmlFor="birthday">Data de Nascimento</FormLabel>
                  <Input
                    type="date"
                    id="birthday"
                    defaultValue={birthday}
                    {...register('birthday', {
                      required: 'Campo obrigatório',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.birthday && errors.birthday.message}
                  </FormErrorMessage>
                </FormControl>

                <Divider
                  margin={'20px'}
                  borderColor={useColorModeValue('#CBD5E0', '#4d4d4d')}
                /> 
                
                <Button
                  type="submit"
                  width={'full'}
                  isLoading={isSubmitting}
                  size="lg"
                  bg="primary"
                >
                  Gravar
                </Button>
              </VStack>
            </form>
          </LayoutContent>
      </>
    )
  }

  const RenderComponent = () => {
    return (
      <Layout>
        {error ? <LoadingBetweenScreen /> : <RenderAllContent />}
      </Layout>
    )
  }

  return (
    <RenderComponent />
  )
}

export default EditCustomer

export async function getServerSideProps(context) {

  const { query: { id } } = context
  
  const response = await fetch(`http://localhost:3000/api/customer?id=${id}`)
  const data = await response.json()
  
  const findRecord = data[0]?.id > 0
  const customer = findRecord ? data[0] : []
  const error = !findRecord

  return {
    props: {
      customer: customer,
      error: error
    }, // will be passed to the page component as props
  }
}