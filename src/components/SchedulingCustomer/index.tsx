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
  Switch,
  Link,
  useCheckboxGroup,
  FormControl,
  FormLabel,
  Select,
  useRadioGroup,
} from '@chakra-ui/react'
import CardCustomer from '../CardCustomer'
import CardCustomerServico from '../CardCustomerServico'

export const ItemSchedulingCustomer = ({ data }) => {
  return (
    <Flex alignItems={'start'} m="0" p="0">
      <Box w={'25%'}>
        <VStack position={'relative'} top={'10px'}>
          <Text>11:00</Text>
          <Text fontSize={'12px'} color={'gray'}>
            11:45
          </Text>
        </VStack>
      </Box>

      <Stack direction="row" h="135px">
        <Divider
          orientation="vertical"
          colorScheme={'gray'}
          color={'gray'}
          px={'2'}
        />
      </Stack>

      <Box w={'80%'}>
        <CardCustomerServico
          id="2"
          key="1s"
          name="Jose"
          avatar="/logo-bkm.png"
          servico={data}
        />
      </Box>
    </Flex>
  )
}
