import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  useColorModeValue,
  Stack,
  Divider,
  Flex,
  Image,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import {
  Header,
  Layout,
  LayoutContent,
  LoadingBetweenScreen,
  RadioSelected,
  CustomCheckbox,
  EstablishmentPhoto,
  ContentEstablishmentPhoto,
  LoadGalleryPhotos,
} from '../../../components'
import { useForm } from 'react-hook-form'
import Router from 'next/router'
import { setStorageFirstAccess } from '../../../hooks/useLocalStorage'

const AppHeader = () => {
  return <Header path="/firstAccess/operatingSchedule" stage={4} />
}

const PhotosCompany = () => {
  
  const iconColor = useColorModeValue('black', 'orange')
  const textColor = useColorModeValue('textColor.grayLight','textColor.grayDark')
  const colorGray = useColorModeValue('textColor.light', 'textColor.dark')

  const imgFachada = '/fachada.png'
  const imgEspacoInterno = '/espacoInterno.png'
  const imgEquipe = '/equipe.png'
  const imgAddFoto = '/addPhoto.png'

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const [galeryPhotos, setGaleryPhotos] = useState(false)

  const loadGalleryPhotos = () => {
    setGaleryPhotos(true)
  }

  const handleClickCloseGalery = () => {
    setGaleryPhotos(false)
  }

  const AppContentPhotosCompany = () => {

    async function onSubmit() {

      setStorageFirstAccess({'photos': []})
    
      Router.push('/firstAccess/scheduleBreak/')
    }

    return (
      <>
        <AppHeader />
        <LayoutContent>
          <Box color={iconColor}>
            <Heading
              as="h1"
              maxWidth={'240px'}
              lineHeight={'110%'}
              textColor={textColor}
              fontSize={'28px'}
              fontWeight={'black'}
              textAlign={'left'}
              marginBottom={'16px'}
              marginTop={'21px'}
            >
              Fotos do estabelecimento
            </Heading>
          </Box>
          <Text
            fontWeight={400}
            fontSize={'16px'}
            lineHeight={'19px'}
            textColor={colorGray}
            marginBottom={'28px'}
          >
            Adicione pelo menos 3 fotos do seu espaço de trabalho. Isso ajudará
            a atrair mais clientes.
          </Text>

          <form onSubmit={handleSubmit(onSubmit)}>

            <EstablishmentPhoto title={'Foto da Fachada'} image={imgFachada} />
            <EstablishmentPhoto
              title={'Foto do Espaço Interno'}
              image={imgEspacoInterno}
            />
            <EstablishmentPhoto title={'Foto da Equipe'} image={imgEquipe} />

            <Divider
              borderColor={'#CBD5E0'}
              borderWidth={'1px'}
              borderStyle={'solid'}
              mt="3"
              margin={'16px 0'}
            />

            <ContentEstablishmentPhoto handleClick={loadGalleryPhotos}>
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

            <Button
              type="submit"
              w={'full'}
              height={'59px'}
              marginTop={'15px'}
              isLoading={isSubmitting}
            >
              Próximo
            </Button>

          </form>

        </LayoutContent>
      </>
    )
  }

  return (
    <Layout>
      {galeryPhotos ? (
        <LoadGalleryPhotos handleClick={handleClickCloseGalery} />
      ) : (
        <AppContentPhotosCompany />
      )}
    </Layout>
  )
}

export default PhotosCompany
