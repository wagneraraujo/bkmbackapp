import React from 'react'
import { Box, useCheckbox, useColorModeValue } from '@chakra-ui/react'

function CustomCheckbox(props: any) {
  const { getInputProps, getCheckboxProps } = useCheckbox(props as any)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        _checked={{
          bg: 'primary',
          color: 'white',
          borderColor: 'primary',
        }}
        _focus={{
          boxShadow: 'outline primary',
        }}
        borderColor={'primary'}
        px={2}
        py={3}
        color={'primary'}
        fontWeight={'bold'}
        backgroundColor={useColorModeValue('#F7F6F9', '#191919')}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export default CustomCheckbox
