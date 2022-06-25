import { useRadio } from '@chakra-ui/react'
import { Radio, RadioGroup, Box, useColorModeValue } from '@chakra-ui/react'

export default function RadioSelected(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box
      as="label"
      flexDir={'column'}
      justifyContent={'center'}
      alignContent={'center'}
    >
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="2px"
        borderRadius="md"
        outline={'none'}
        mr={'8px'}
        bg={useColorModeValue('white', 'gray.700')}
        w={'55px'}
        borderColor={'primary'}
        textAlign={'center'}
        wordBreak={'break-word'}
        _checked={{
          bg: 'primary',
          outline: 'none',
          color: 'white',
          fontWeight: 'bold',
          borderColor: 'primary',
        }}
        _focus={{
          boxShadow: 'none',
          outline: 'none',
        }}
        px={2}
        py={5}
        verticalAlign={'super'}
        fontSize="sm"
        color={'primary'}
        fontWeight={'600'}
        textTransform={'capitalize'}
      >
        {props.children}
      </Box>
    </Box>
  )
}
