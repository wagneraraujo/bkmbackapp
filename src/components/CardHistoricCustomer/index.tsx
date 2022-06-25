import React from 'react'
import { Box, Flex, useColorModeValue } from '@chakra-ui/react'
import { ProductServiceTypes } from '../../types/ProductServiceTypes'

const CardHistoricCustomer = (props) => {

  const { type, datetime, description, payment, price } = props.customer

  const bgColorItem = useColorModeValue('inputColor.bgLight', 'inputColor.bgDark')
  const bgColor = useColorModeValue('#fff', 'bgBody.dark')
  const iconColor = useColorModeValue('black', 'primary')

  return (
    <Box
      as={"div"}
      width={"100%"}
      minHeight={"90px"}
      borderRadius={"10px 10px"}
      backgroundColor={bgColorItem}
      marginTop={"20px"}
      bg={bgColor}
      border={`1px solid ${useColorModeValue('#E2E8F0', '#383838')} `}  
      padding={"10px 16px"}
    >
      <Flex justifyContent={"space-between"}>
        <Box
          as={"p"}
          height={"15px"}
          fontWeight={500}
          fontSize={"14px"}
          textAlign={"left"}
          color={iconColor}
          lineHeight={"15px"}
        >
          {type === ProductServiceTypes.Produto ? "Serviço" : "Produto"}
        </Box>
        <Box
          as={"p"}
          fontWeight={600}
          fontSize={"10px"}
          textAlign={"right"}
          lineHeight={"12px"}
        >
          {datetime}
        </Box>
      </Flex>
      <Box
        as={"h2"}
        width={"100%"}
        fontWeight={600}
        fontSize={"16px"}
        lineHeight={"20px"}
        overflow={"hidden"}
        marginTop={"4px"}
      >
        {description}
      </Box>
      <Box
        as={"div"}
        marginTop={"11px"}
      >
        <Flex justifyContent={"space-between"}>
          <Box as={"div"}>
            <Box as={"p"} fontWeight={400} fontSize={"12px"} lineHeight={"14.5px"} display={"inline-block"}>Pagamento:</Box>
            <Box as={"p"} fontWeight={600} fontSize={"12px"} lineHeight={"14.5px"} display={"inline-block"} marginLeft={"4px"}>{payment}</Box>
          </Box>
          <Box as={"p"} fontWeight={400} fontSize={"20px"} lineHeight={"24px"}>
            R$ {price}
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default CardHistoricCustomer