import React, { useContext } from 'react'
import {
  Center,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  HStack,
  Box
} from '@chakra-ui/react'
import Cadeira from '../../../public/screenIcons/firstAccess/cadeira.svg'
import Calendario from '../../../public/screenIcons/firstAccess/calendario.svg'
import { ThemeContextBkm } from "../../contexts/theme";
import Router from 'next/router'
import { removeStorageFirstAccess, setStorageFirstAccess } from '../../hooks/useLocalStorage';

const CardSelectProfile = (props) => {

  const { path, title, description, typeProfile } = props

  const bgColor = useColorModeValue('inputColor.bgLight', 'black.800')
  const borderColor = useColorModeValue(
    'inputColor.borderLight',
    'inputColor.borderDark',
  )
  const fontColorGray = useColorModeValue(
    'textColor.grayLight',
    'textColor.grayDark',
  )
  const textColorGray = useColorModeValue('textColor.light', 'textColor.dark')
  const { themebkm } = useContext(ThemeContextBkm);

  const Logo = () => {
    const objIcon = {color: themebkm['colors']['primary'], marginLeft: '10px'}
    return (
      <Center w="90px" h="100%">
        {typeProfile === 1 ? <Cadeira style={objIcon}  /> : <Calendario style={objIcon} />}
      </Center>
    )
  }

  const handleClick = (typeProfile: Number) => {
    removeStorageFirstAccess()
    setStorageFirstAccess({type: typeProfile})
    Router.push(path)
  }
  
  return (
    <Box onClick={() => handleClick(typeProfile)}>
      <HStack
        bgColor={bgColor}
        height={'128px'}
        borderWidth={'1px'}
        borderStyle={'inner'}
        borderRadius={'10px 10px'}
        borderColor={borderColor}
      >
        <Logo />
        <Flex
          width={'100%'}
          height={'100%'}
          flexDirection={'column'}
          justifyContent={'center'}
        >
          <Heading
            as="h2"
            fontWeight={800}
            fontSize={'20px'}
            lineHeight={'17px'}
            color={fontColorGray}
            marginTop={'15px'}
            marginBottom={'8px'}
          >
            {title}
          </Heading>
          <Text
            fontWeight={400}
            fontSize={'14px'}
            lineHeight={'17px'}
            color={textColorGray}
            marginBottom={'20px'}
            width={'95%'}
          >
            {description}
          </Text>
        </Flex>
      </HStack>
    </Box>
  )
}

export default CardSelectProfile