import React, { useEffect, useState } from 'react'
import {
  Button,
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  HStack,
  Divider,
  IconButton,
  VStack,
  InputGroup,
  InputRightElement,
  Input,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import { AiOutlineCalendar } from 'react-icons/ai'
import { CalendarIcon } from '@chakra-ui/icons'

interface CardProductProps {
  category: string
  name: string
  qtd?: number
  urlAction?: string
  client?: string
  payment?: String
  date_created?: any
}
const CardHistoryMoviment = ({
  category,
  name,
  qtd,
  client,
  payment,
  urlAction,
  date_created,
}: CardProductProps) => {
  const colotButton = useColorModeValue('primary', 'primary')
  const textColor = useColorModeValue(
    'textColor.grayLight',
    'textColor.grayDark',
  )
  const colorGray = useColorModeValue('textColor.light', 'textColor.dark')

  return (
    <>
      <Box
        w={'full'}
        my={'16px'}
        p={'16px'}
        rounded={'lg'}
        style={{
          border: '1px solid #E2E8F0',
          background: '#fff',
        }}
      >
        <Flex
          alignItems={'flex-start'}
          justifyContent={'space-between'}
          w={'full'}
        >
          <Flex w={'90%'}>
            <Box textAlign={'left'}>
              <Text fontSize="xs" color="primary" fontWeight={'500'}>
                {category}
              </Text>
              <Text fontSize="md" fontWeight={600} color={textColor}>
                {name}
              </Text>
              <Flex alignItems={'center'}>
                <Text fontSize="xs" color={textColor}>
                  Cliente:
                </Text>
                <Text fontSize="xs" fontWeight={600} color={textColor}>
                  {client}
                </Text>
              </Flex>

              <Flex alignItems={'center'}>
                <Text fontSize="xs" color={textColor}>
                  Pagamento:
                </Text>
                <Text fontSize="xs" fontWeight={600} color={textColor}>
                  {payment}
                </Text>
              </Flex>
            </Box>
          </Flex>

          <Flex justifyContent={'flex-start'}>
            <CalendarIcon color={'primary'} mr={'2px'} />
            <Text fontSize={'12px'}>{date_created}</Text>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default CardHistoryMoviment
