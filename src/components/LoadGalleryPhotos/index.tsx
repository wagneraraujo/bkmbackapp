import React, { useContext } from 'react'
import {
  Box,
  Text,
  Button,
  Flex,
  useColorModeValue,
  Image,
} from '@chakra-ui/react'
import { LayoutContent } from '../../components'
import NextLink from 'next/link'
import { ThemeContextBkm } from "../../contexts/theme";

const LoadPhotosCompany = (props) => {
  const bgColorLoadPhoto = useColorModeValue('bgBody.light', 'bgBody.dark')
  const textColor = useColorModeValue('textColor.light', 'textColor.dark')
  const colotButton = useColorModeValue('primary', 'primary')

  const imgClose = '/close.png'

  const { themebkm } = useContext(ThemeContextBkm);

  return (
    <Flex
      width={'100%'}
      height={'100vh'}
      alignItems={'end'}
      bgGradient={[`linear(to-t, #FFFFFF, ${themebkm['colors']['primary']})`]}
    >
      <Box
        width={'inherit'}
        height={'369px'}
        backgroundColor={bgColorLoadPhoto}
        borderColor={bgColorLoadPhoto}
        borderRadius={'8px 8px 0 0'}
        borderWidth={'1px'}
        borderStyle={'solid'}
      >
        <LayoutContent marginTop={'0px'} padding={'none'}>
          <Box margin={'34px 24px'}>
            <Box as={'div'} width={'100%'} height={'40px'} textAlign={'right'}>
              <Image
                display={'inline-block'}
                src={imgClose}
                alt={'Fechar carregamento de fotos'}
                width={'16px'}
                onClick={props.handleClick}
              />
            </Box>

            <Text
              as={'h1'}
              width={'100%'}
              fontWeight={800}
              fontSize={'24px'}
              lineHeight={'29px'}
              textAlign={'center'}
              marginBottom={'48px'}
              textColor={textColor}
            >
              Carregar Fotos
            </Text>

            <Button
              //type="file"
              width={'full'}
              colorScheme={colotButton}
              marginBottom={'16px'}
            >
              <Text
                fontWeight={700}
                fontSize={'20px'}
                lineHeight={'24px'}
                textColor={'#FFFFFF'}
              >
                <NextLink href="#" passHref>
                  Galeria de fotos
                </NextLink>
              </Text>
            </Button>

            <Button
              //type="file"
              width={'full'}
              backgroundColor={bgColorLoadPhoto}
              borderColor={colotButton}
              borderWidth={'2px'}
              borderStyle={'solid'}
              borderRadius={'6px 6px'}
              onClick={props.handleClick}
            >
              <Text
                fontWeight={700}
                fontSize={'20px'}
                lineHeight={'24px'}
                textColor={'primary'}
                // textColor={"#F55D24"}
              >
                Cancelar
              </Text>
            </Button>
          </Box>
        </LayoutContent>
      </Box>
    </Flex>
  )
}

export default LoadPhotosCompany
