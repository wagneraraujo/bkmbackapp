import React, { useContext } from 'react'
import {
  Center,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import {
  Layout,
  LayoutContent,
  Header,
  CardSelectProfile,
} from '../../../components'
import Perfil from '../../../../public/screenIcons/firstAccess/perfil.svg'
import { ThemeContextBkm } from "../../../contexts/theme";

const AppHeader = () => {
  return <Header path="/" />
}

const FirstAccess = () => {

  const colorPrimary = useColorModeValue('primary', 'primary')
  const fontColorGray = useColorModeValue(
    'textColor.grayLight',
    'textColor.grayDark',
  )

  const { themebkm } = useContext(ThemeContextBkm)

  return (
    <>
      <Layout>
        <AppHeader />

        <LayoutContent>
          <Center height={'155px'}>
            <Perfil style={{color: themebkm['colors']['primary']}} />
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
              Selecione
            </Text>
            <Text
              as={'span'}
              display={'block'}
              color={colorPrimary}
              mb={'48px'}
            >
              o seu perfil
            </Text>
          </Heading>

          <CardSelectProfile
            path={'/firstAccess/configCompany'}
            title={"Sou uma Empresa"}
            description={"Ofereça os serviços do seu estabelecimento dentro do app."}
            typeProfile={1}
          />

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

          <CardSelectProfile
            path={'/firstAccess/createCustomer'}
            title={"Sou um Cliente"}
            description={"Crie uma conta e encontre os estabelecimento próximos de você para realizar agendamentos."}
            typeProfile={2}
          />

          <NextLink href="/" passHref>
            <Text
              as={'p'}
              textAlign="center"
              fontStyle={'normal'}
              fontWeight={600}
              fontSize="16px"
              lineHeight={'28px'}
              color={'rgba(135, 135, 135, 0.9)'}
              margin={'32px 0'}
            >
              Já possui conta?
              <Text as={'span'} color={colorPrimary} fontWeight={'bold'} ml="2">
                Faça seu login!
              </Text>
            </Text>
          </NextLink>
        </LayoutContent>
      </Layout>
    </>
  )
}

export default FirstAccess