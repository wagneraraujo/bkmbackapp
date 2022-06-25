import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { FaBuilding } from 'react-icons/fa'
import NextLink from 'next/link'

const CardProfileCompany = ({ title, description, href }) => {
  const bgButtonColor = useColorModeValue('gray.100', 'gray.800')

  return (
    <NextLink href={href} passHref>
      <Flex
        boxShadow="lg"
        flexDirection={'row'}
        justifyContent={'space-between'}
        bg={bgButtonColor}
        rounded="2xl"
        p={'8'}
        alignItems={'center'}
        textDecoration={'none'}
      >
        <Box color={'primary'}>
          <FaBuilding size={'26'} />
        </Box>

        <Box textAlign={'left'}>
          <Text fontSize="lg" ml={'4'} fontWeight={'bold'}>
            {title}
          </Text>
          <Text fontSize="sm" ml={'4'} fontWeight={'regular'}>
            {description}
          </Text>
        </Box>
      </Flex>
    </NextLink>
  )
}

export default CardProfileCompany
