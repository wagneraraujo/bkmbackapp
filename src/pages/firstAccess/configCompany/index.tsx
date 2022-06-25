import React, { useContext, useEffect, useState } from 'react'
import {
  Button,
  Heading,
  Stack,
  Text,
  Box,
  Center,
  useColorModeValue,
} from '@chakra-ui/react'
import Slider, { slickNext } from 'react-slick'
import NextLink from 'next/link'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {
  Header,
  Layout,
  LayoutContent,
  LoadingBetweenScreen,
} from '../../../components'
import LogoConfigCompany from '../../../../public/screenIcons/logoConfigCompany.svg'
import { ThemeContextBkm } from "../../../contexts/theme";

const AppHeader = () => {
  return <Header path="/firstAccess/selectProfile/" />
}

const AppConfigCompany = () => {
  
  const fontColorGray = useColorModeValue(
    'textColor.grayLight',
    'textColor.grayDark',
  )
  
  const colorPrimary = useColorModeValue('primary', 'primary')
  const colorGray = useColorModeValue('textColor.light', 'textColor.dark')

  const slider = React.useRef(null)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,

    appendDots: (dots) => (
      <Stack
        direction="row"
        justifyContent={'center'}
        my={['60px', '80px']}
        spacing={2}
        position={'relative'}
      >
        {dots.map((item, i) => {
          return (
            <Box
              as="button"
              key={i}
              onClick={() => slider?.current?.slickPrev()}
              bg={item.props.className === '' ? ['primary', 'primary'] : ''}
              h={'8px'}
              rounded={'lg'}
              w={'40px'}
              borderWidth={1}
              borderColor={['primary', 'primary']}
            ></Box>
          )
        })}
      </Stack>
    ),
  }

  const { themebkm } = useContext(ThemeContextBkm)

  return (
    <>
      <Layout>
        <AppHeader />

        <LayoutContent>
          <Center height={'155px'}>
            <LogoConfigCompany style={{color: themebkm['colors']['primary']}} />
          </Center>

          <Heading
            as={'h1'}
            width={'full'}
            fontWeight={900}
            fontSize={'28px'}
            lineHeight={'34px'}
            marginTop={'50px'}
          >
            <Text as={'span'} display={'block'} color={fontColorGray}>
              Vamos configurar{' '}
            </Text>
            <Text
              as={'span'}
              display={'block'}
              color={colorPrimary}
              mb={'48px'}
            >
              seu estabelecimento
            </Text>
          </Heading>

          <Stack direction={'column'}>
            <Slider {...settings} ref={slider}>
              <Text
                color={colorGray}
                fontSize={'md'}
                fontWeight={'500'}
                lineHeight={'21px'}
                mt={'35px'}
                width={'100%'}
              >
                Antes de continuar, precisamos de algumas informações
                importantes, como horários de atendimento, serviços oferecidos,
                fotos e membros da equipe.
              </Text>

              <Text
                color={colorGray}
                fontSize={'md'}
                fontWeight={'500'}
                lineHeight={'21px'}
                mt={'35px'}
                width={'100%'}
              >
                Estas informações farão com que o perfil do seu estabelecimento
                ganhe mais visualizações e atraia mais clientes.
              </Text>
            </Slider>
          </Stack>

          <Stack spacing={10} pt={2}>
            <NextLink href="/firstAccess/createCompany/" passHref>
              <Button
                w={'full'}
                height={'59px'}
                mt={10}
              >
                Próximo
              </Button>
            </NextLink>
          </Stack>

        </LayoutContent>
      </Layout>
    </>
  )
}

const ContentConfigCompany = ({ loadingScreen }) => {
  return <>{loadingScreen ? <LoadingBetweenScreen /> : <AppConfigCompany />}</>
}

const ConfigCompany = () => {
  const [loadingScreen, setLoadingScreen] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoadingScreen(false)
    }, 500)
  }, [loadingScreen])

  return <ContentConfigCompany loadingScreen={loadingScreen} />
}

export default ConfigCompany
