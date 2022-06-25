import React, { useContext } from 'react'
import {
  Layout,
  LayoutContent,
} from '../components'
import {
  Button,
  Center,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import Desconected from '/public/404/Desconected.svg'
import LogoBkmApp from '/public/404/LogoBkmApp.svg'
import NextLink from 'next/link'
import { ThemeContextBkm } from "../contexts/theme";

// LogoBkmApp.svg

const Page404 = () => {

  const { themebkm } = useContext(ThemeContextBkm);

  const fontColorGray = useColorModeValue('textColor.grayLight', 'textColor.grayDark')
  const colorGray = useColorModeValue('textColor.light', 'textColor.dark')

  return (
    <Layout>
      <Desconected style={{color: themebkm['colors']['primary']}} width={"100%"}/>
      <LayoutContent>
        <Heading as='h1' textColor={fontColorGray} fontWeight={900} fontSize={"40px"} marginBottom={"15px"}>
          Ops!
        </Heading>
        <Heading color={"primary"} fontWeight={900}>
          Página
        </Heading>
        <Heading color={"primary"} fontWeight={900} marginBottom={"35px"}>
          não encontrada!
        </Heading>
        <Heading size='sm' width={"100%"} color={colorGray}>
          Lamentamos, mas a página solicitada não foi encontrada. Por favor, clique no botão abaixo para voltar ao inicio.
        </Heading>

        <NextLink href={'/'} passHref>
          <Stack spacing={10} pt={2}>
            <Button
              w={'full'}
              height={'59px'}
              mt={10}
            >
              Ir para o Início
            </Button>
          </Stack>
        </NextLink>

        <Center width={"100%"} marginTop={"60px"}>
          <LogoBkmApp style={{color: themebkm['colors']['primary']}} />
        </Center>

      </LayoutContent>
    </Layout>
  );
}

export default Page404