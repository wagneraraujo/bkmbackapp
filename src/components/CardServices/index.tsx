import React, { useContext } from 'react'
import {
  Box,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  Center,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import IconTeam from '../../../public/IconTeam.svg'
import { ThemeContextBkm } from "../../contexts/theme";
import Router from 'next/router'

const CardServices = ({ id, name, amount, time }) => {

  const bgColor = useColorModeValue('#fff', 'bgBody.dark')
  const textColor = useColorModeValue('textColor.grayLight', 'textColor.grayDark')

  const { themebkm } = useContext(ThemeContextBkm);

  const handleClickCustomer = (id: Number) => {
    if(id > 0) {
      Router.push(`/firstAccess/services/edit/${id}`)
    }
  }

  return (
    <Flex
      key={id}
      bg={bgColor}
      height={'100px'}
      border={`1px solid ${useColorModeValue('#E2E8F0', '#383838')} `}
      borderRadius={'md'}
      p="20px"
      alignItems={'center'}
      my={'16px'}
      onClick={() => handleClickCustomer(id)}
    >
      <Box w={'33px'}>
        <IconTeam style={{color: themebkm['colors']['primary']}}/>
      </Box>
      <Box
        ml={'26px'}
        w={`calc(100% - 60px)`}
        color={'#878787'}
        fontSize={'14px'}
      >
        <Heading size="md" color={textColor}>
          {name}
        </Heading>
        <Text>R$ {parseFloat(amount).toLocaleString(undefined, {minimumFractionDigits: 2})}</Text>
        <Text>Duração: {time}</Text>
      </Box>
      <Center
        width={"40px"}
        height={"inherit"}
      >
        <ChevronRightIcon />
      </Center>
    </Flex>
  )
}


export default CardServices