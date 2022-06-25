import React from 'react'
import { Box, Center, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'

const CardDashBoard = ({ children, href='#' }) => {

  const bgColorFrame = useColorModeValue('inputColor.bgLight', 'black.800')
  const borderColor = useColorModeValue('inputColor.borderLight','inputColor.borderDark')
  
  return (
    <NextLink href={href} passHref>
      <Center
        width={'100%'}
        height={'170px'}
        // minWidth={"177px"}
        maxWidth={"177px"}
        overflow={"hidden"}
        bg={bgColorFrame}
        border={"1px solid"}
        borderColor={borderColor}
        borderRadius={"6px 6px"}
        padding={"20px 10px"}
      >
        {children}
      </Center>
    </NextLink>
  )
}

export default CardDashBoard