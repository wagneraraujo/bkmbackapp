import React, { useContext } from 'react'

import {
  Box,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import IconTeam from '../../../public/IconTeam.svg'
import { ThemeContextBkm } from "../../contexts/theme"
import Router from 'next/router'

const TeamItemMember = ({ id, name, phone, email }) => {
  const bgColor = useColorModeValue('#fff', 'bgBody.dark')
  const textColor = useColorModeValue('textColor.grayLight', 'textColor.grayDark')
  const { themebkm } = useContext(ThemeContextBkm);

  const handleClickCustomer = (id: Number) => {
    if(id > 0) {
      Router.push(`/firstAccess/team/edit/${id}`)
    }
  }

  return (
    <Flex
      bg={bgColor}
      border={`1px solid ${useColorModeValue('#E2E8F0', '#383838')} `}
      borderRadius={'md'}
      p="20px"
      alignItems={'center'}
      my={'16px'}
      onClick={() => handleClickCustomer(id)}
    >
      <Box w={'33px'}>
        <IconTeam style={{ color: themebkm['colors']['primary'] }} />
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
        <Text>{phone}</Text>
        <Text>{email}</Text>
      </Box>
      <Box float={'right'}>
        <ChevronRightIcon />
      </Box>
    </Flex>
  )
}

export default TeamItemMember
