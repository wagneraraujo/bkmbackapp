import React from 'react'
import {
  Box,
  Flex,
  Image,
  Text,
  useColorModeValue,
  IconButton,
  VStack,
  Link,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import { CardProductServicesProps } from '../../types/CardProductServicesProps'
import CardDefault from '../CardDefault'

const CardProduct = ({
  category,
  name,
  image,
  qtd,
  urlAction,
  price,
}: CardProductServicesProps) => {
  const colorGray = useColorModeValue('#575757', 'textColor.dark')

  return (
    <CardDefault>
      <Flex
        width={'100%'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Flex width={'100%'}>
          <Image
            rounded={'full'}
            boxSize="64px"
            src={image}
            alt={name}
            mr={'4'}
            objectFit={'cover'}
            boxSizing={'content-box'}
          />

          <Box textAlign={'left'} w={'full'}>
            <Text fontSize="xs" color="primary" fontWeight={'500'}>
              {category}
            </Text>
            <Text fontSize="md" fontWeight={600} color={colorGray} w={'90%'}>
              {name}
            </Text>
            <Text color={'primary'} fontSize={'12px'}>
              {price}
            </Text>
          </Box>
        </Flex>

        <VStack width={'40px'}>
          {qtd && (
            <Box
              bg={'secondaryCustom'}
              rounded={'lg'}
              color={'#fff'}
              fontSize={'10px'}
              py={'2px'}
              paddingX={'10px'}
              fontWeight={'bold'}
              height={'19px'}
            >
              {qtd}
            </Box>
          )}

          {urlAction && (
            <NextLink passHref href={urlAction}>
              <IconButton
                variant="outline"
                colorScheme="teal"
                aria-label="ver produto"
                icon={<IoIosArrowForward />}
                size="md"
                rounded={'full'}
                h={'37px'}
                w={'37px'}
                border={'none'}
                bg={'secondaryLight'}
                background={'secondaryLight'}
              />
            </NextLink>
          )}
        </VStack>
      </Flex>
    </CardDefault>
  )
}

export default CardProduct
