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
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import Router from 'next/router'
import {
  Layout,
  LayoutContent,
  Header,
  LoadingBetweenScreen,
} from '../../components'

const AppHeader = () => {
  return <Header path="/customer" />
}

const AddCustomer = (props) => {

  const { customer } = props

  const iconColor = useColorModeValue('black', 'primary')

  const colorTextLabel = useColorModeValue('textLabel.light', 'textLabel.dark')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  function onSubmit(values) {
    
  }

  return (
    <Layout>
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
            {customer.name}
          </Heading>
          <Box width={'340px'} position={"relative"} marginLeft={"29px"}>
            <Image src={customer.avatar} width={'inherit'} borderRadius={"50% 50%"} alt="Image customer" />
            <Box
              width={'57px'}
              height={'57px'}
              backgroundColor={"#25D366"}
              position={"absolute"}
              borderRadius={"50% 50%"}
              right={"0px"}
              bottom={"-20px"}>
              <Center height={"100%"}>
                <Image
                  src={'/screenIcons/whatsapp.png'}
                  width={'30px'}
                  height={'30px'}
                  borderRadius={"50% 50%"}
                  alt="Image customer"
                />
              </Center>
            </Box>
          </Box>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <FormControl marginTop={'32px'} isInvalid={errors.name}>
              <FormLabel mb={0} htmlFor="name" textColor={colorTextLabel}>
                Nome
              </FormLabel>
              <Input
                type="text"
                id="name"
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
    </Layout>
  )
}

// const ContentCustomer = ({ loadingScreen, customer }) => {
//   return <>{loadingScreen ? <LoadingBetweenScreen /> : <AppAddCustomer customer={customer}/>}</>
// }

// const AddCustomer = (props) => {
//   const [loadingScreen, setLoadingScreen] = useState(true)

//   useEffect(() => {
//     setTimeout(() => {
//       setLoadingScreen(false)
//     }, 500)
//   }, [loadingScreen])

//   return <ContentCustomer loadingScreen={loadingScreen} customer={props.customer} />
// }

export default AddCustomer

export async function getServerSideProps() {
  const response = await fetch('http://localhost:3000/api/customer')
  const data = await response.json()

  return {
    props: {
      customer: data[0],
      error: false
    }, // will be passed to the page component as props
  }
}