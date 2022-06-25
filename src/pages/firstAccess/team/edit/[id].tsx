import { useEffect, useState } from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  useColorModeValue,
  FormErrorMessage,
  Divider,
  useToast,
  useBreakpointValue,
  Flex,
  Text,
  Switch,
  Stack,
  Center,
  VStack,
  Image,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import {
  Layout,
  LayoutContent,
  Header,
  ContentEstablishmentPhoto,
  SwitchCustom,
} from '../../../../components'
import Router from 'next/router'
import { toastMessageDel, toastMessageSave } from '../../../../utils'
import { getStorageArray, setStorageArray, setStorageArrayByIndex } from '../../../../hooks/useLocalStorage'

const AppHeader = () => {
  return <Header path="/firstAccess/team/" />
}

const EditTeam = (props) => {

  const { id } = props

  const fontColorGray = useColorModeValue('textColor.grayLight', 'textColor.grayDark')

  const [team, setTeam] = useState({})
  const imgAddFoto = '/addPhoto.png'

  const handleChangeName = (e) => {
    setTeam((state) => {
      return {...state, 'name': e.target.value}
    })
  }

  const toast = useToast()
  const position = useBreakpointValue({ base: 'bottom-right' }) as any;

  useEffect(() => {
    let team = getStorageArray('team')
    if(Array.isArray(team)) {
      team = team.find(team => team.id === parseInt(id))
    }

    if(!!team) {
      setTeam(team)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangeSwitch = (id) => {
    setTeam((state: any) => ({
      ...state,
      [id]: !team[id]
    }))
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  async function onSubmit(values: any) {

    const editTeam = {
      id: team['id'],
      ...values,
      discount_card: team['discount_card'],
      admin: team['admin'],
    }

    setStorageArrayByIndex(editTeam, 'team')
    handleToast(1)
  }

  const handleDelete = (id) => {

    let listTeam = getStorageArray('team') || []
    listTeam = listTeam.filter((team) => team.id !== parseInt(id))
    setStorageArray(listTeam, 'team')
    handleToast(2)
  }

  const handleToast = (type) => {
    switch(type) {
      case 1:
        toast.closeAll()
        toast(toastMessageSave(false, position))
        break;
      case 2:
        toast.closeAll()
        toast(toastMessageDel(false, position))
        break;
    }
    Router.push('/firstAccess/team/')
  }

  return (
    <Layout>
      <AppHeader />

      <LayoutContent>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
        >
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
            Editar Membro
          </Heading>
          <Center
            width={"100px"}
            height={"50px"}
            border={"1px solid red"}
            onClick={() => handleDelete(id)}
          >
            Deletar
          </Center>
        </Flex>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <FormControl mt="5" isInvalid={errors.name}>
              <FormLabel mb={0} htmlFor="name">
                Nome
              </FormLabel>
              <Input
                type="text"
                id="name"
                // value={team['name']}
                // onChange={handleChangeName}
                defaultValue={team['name']}
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
                defaultValue={team['phone']}
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
                defaultValue={team['email']}
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
                defaultValue={team['birth_date']}
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

            <SwitchCustom title={'Desconto Cartão'} id="discount_card" handleChange={handleChangeSwitch} isChecked={team['discount_card']} />

            <Divider my={'px'} borderColor={'transparent'} />
            <FormControl mt="5" isInvalid={errors.comission}>
              <FormLabel htmlFor="comission">Comissão</FormLabel>
              <Input
                type="number"
                id="comission"
                defaultValue={team['comission']}
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
            
            <SwitchCustom title={'É Administrador?'} id="admin" handleChange={handleChangeSwitch} isChecked={team['admin']} />
            
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

export default EditTeam

export async function getServerSideProps(context) {

  const { query: { id } } = context

  return {
    props: {
      id: id,
    },
  }
}