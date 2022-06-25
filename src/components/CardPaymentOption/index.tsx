import React, { useContext, useEffect, useState } from 'react'
import { Box, useColorModeValue, Flex, Text, Switch } from '@chakra-ui/react'
import { ThemeContextBkm } from "../../contexts/theme";

const CardPaymentOption = ({ paymentMethod, id, isChecked, onChange }) => {
  const bgColorCheck = useColorModeValue(
    'inputColor.bgLight',
    'inputColor.bgDark',
  )

  const borderColor = useColorModeValue(
    'inputColor.borderLight',
    'inputColor.borderDark',
  )

  const textColor = useColorModeValue(
    'textColor.grayLight',
    'textColor.grayDark',
  )

  const [stateChecked, setStateChecked] = useState(!isChecked)

  useEffect(() => {
    setStateChecked((state: Boolean) => !state)
  }, [isChecked])

  const { themebkm } = useContext(ThemeContextBkm);

  return (
    <Box
      backgroundColor={bgColorCheck}
      width={'full'}
      height={'50px'}
      borderColor={borderColor}
      borderStyle={'solid'}
      borderWidth={'1px'}
      borderRadius={'10px'}
      marginTop={'16px'}
    >
      <Flex
        padding={'14px 11px'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Text
          fontWeight={600}
          fontSize={'17px'}
          lineHeight={'20px'}
          textColor={textColor}
        >
          {paymentMethod}
        </Text>
        <Switch
          id={id}
          color={'primary'}
          isChecked={stateChecked}
          onChange={onChange}
        />
      </Flex>
    </Box>
  )
}

export default CardPaymentOption
