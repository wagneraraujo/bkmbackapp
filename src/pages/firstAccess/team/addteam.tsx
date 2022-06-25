import { useEffect, useState } from 'react'
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
  Image,
  VStack,
  FormErrorMessage,
  Flex,
  Divider,
  toast,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import Router from 'next/router'
import {
  Layout,
  LayoutContent,
  Header,
  LoadingBetweenScreen,
  SwitchCustom,
  ContentEstablishmentPhoto,
} from '../../../components'
import { generateId, setStorageArrayPush } from '../../../hooks/useLocalStorage'
import { toastMessageSave } from '../../../utils'

const imgAddFoto = '/addPhoto.png'

const AppHeader = () => {
  return <Header path="/firstAccess/team/" />
}

const Team = () => {
  
  const fontColorGray = useColorModeValue('textColor.grayLight', 'textColor.grayDark')

  const position = useBreakpointValue({ base: 'bottom-right' }) as any;

  const toast = useToast()

  const [member, setMember] = useState({
    discount_card: false,
    admin: false,
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const handleChangeSwitch = (id) => {
    setMember((state: any) => ({
      ...state,
      [id]: !member[id]
    }))
  }

  function onSubmit(values) {
    
    const id = generateId('team')

    const addMember = {
      id: id,
      ...values,
      discount_card: member['discount_card'],
      admin: member['admin'],
    }

    setStorageArrayPush(addMember, 'team')

    toast.closeAll()
    toast(toastMessageSave(false, position))
    Router.push('/firstAccess/team')
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
            Adicionar Membro
          </Heading>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <FormControl mt="5" isInvalid={errors.name}>
              <FormLabel mb={0} htmlFor="name">
                Nome
              </FormLabel>
              <Input
                type="text"
                id="name"
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
                Telefone (WhatsApp)
              </FormLabel>
              <Input
                type="text"
                id="phone"
                placeholder="xx xxxxx-xxxx"
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

            <FormControl mt="5" isInvalid={errors.birth_date}>
              <FormLabel htmlFor="birth_date">Data de Nascimento</FormLabel>
              <Input
                type="date"
                id="birth_date"
                {...register('birth_date', {
                  required: 'Campo obrigatório',
                })}
              />
              <FormErrorMessage>
                {errors.birth_date && errors.birth_date.message}
              </FormErrorMessage>
            </FormControl>

            <Divider
              my={'6px'}
              borderColor={useColorModeValue('#CBD5E0', '#4d4d4d')}
            />

            <Stack w={'100%'}>
              <ContentEstablishmentPhoto>
                <Flex
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  height={'100%'}
                  overflow={'hidden'}
                >
                  <Text
                    as={'p'}
                    display={'inline-block'}
                    fontWeight={600}
                    fontSize={'18px'}
                    lineHeight={'21px'}
                    textColor={'#969696'}
                    marginLeft={'16px'}
                  >
                    Adicionar foto
                  </Text>
                  <Image
                    display={'inline-block'}
                    src={imgAddFoto}
                    alt={'Adicionar fotos'}
                    width={'90px'}
                    borderRadius={'10px 10px'}
                    marginRight={'8px'}
                  />
                </Flex>
              </ContentEstablishmentPhoto>
            </Stack>
            <Divider
              my={'16px'}
              borderColor={useColorModeValue('#CBD5E0', '#4d4d4d')}
            />

            <SwitchCustom title={'Desconto Cartão'} id="discount_card" handleChange={handleChangeSwitch} isChecked={member['discount_card']} />

            <Divider my={'px'} borderColor={'transparent'} />
            <FormControl mt="5" isInvalid={errors.comission}>
              <FormLabel htmlFor="comission">Comissão</FormLabel>
              <Input
                type="number"
                id="comission"
                placeholder="R$"
                {...register('comission', {
                  required: 'Campo obrigatório',
                })}
              />
              <FormErrorMessage>
                {errors.comission && errors.comission.message}
              </FormErrorMessage>
            </FormControl>
            
            <Divider
              my={'16px'}
              borderColor={useColorModeValue('#CBD5E0', '#4d4d4d')}
            />
            
            <SwitchCustom title={'É Administrador?'} id="admin" handleChange={handleChangeSwitch} isChecked={member['admin']} />
            
            <Divider my={'px'} borderColor={'transparent'} />

            <Button
              type="submit"
              w={'full'}
              height={'59px'}
              marginTop={'15px'}
              isLoading={isSubmitting}
            >
              Gravar
            </Button>
          </VStack>
        </form>
      </LayoutContent>
    </Layout>
  )
}

export default Team
