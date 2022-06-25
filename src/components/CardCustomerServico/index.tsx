import React from 'react'

import {
  Box,
  Heading,
  Text,
  Image,
  useColorModeValue,
  List,
  UnorderedList,
  ListItem,
  VStack,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import CardDefault from '../CardDefault'
import Router from 'next/router'

const CardCustomer = (props: any) => {
  const { id, name, servico, avatar, phone, email } = props

  const textColor = useColorModeValue(
    'textColor.grayLight',
    'textColor.grayDark',
  )

  const handleClickCustomer = (id: Number) => {
    Router.push(`/customer/edit/${id}`)
  }

  return (
    <CardDefault onClick={() => handleClickCustomer(id)}>
      <Box width={'73px'}>
        <Image
          src={avatar}
          width={'inherit'}
          height={'inherit'}
          borderRadius={'full'}
          alt={name}
        />
      </Box>
      <Box
        ml={'15px'}
        w={`calc(100% - 60px)`}
        color={'#878787'}
        fontSize={'14px'}
      >
        <Heading size="md" color={textColor}>
          {name}
        </Heading>
        <Box>
          <Text>{phone}</Text>
          <Text>{email}</Text>
        </Box>
        <UnorderedList>
          {servico?.map((item) => {
            return (
              <ListItem fontSize={'12px'} key={item.id}>
                {item}
              </ListItem>
            )
          })}
        </UnorderedList>
      </Box>
      <Box float={'right'}>
        <ChevronRightIcon />
      </Box>
    </CardDefault>
  )
}

export default CardCustomer
