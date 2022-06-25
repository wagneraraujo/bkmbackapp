import React from 'react'
import {
  Box,
  Center,
  useColorModeValue,
} from '@chakra-ui/react'

const RecordNotFoundFirstAccess = (props) => {

  const { content } = props.content

  const colorGray = useColorModeValue('textColor.light', 'textColor.dark')

  return (
    <Box
      width={'100%'}
      height={'200px'}
      margin={'40px 0px'}
      borderColor={colorGray}
      borderWidth={'0px'}
      borderStyle={'solid'}
      borderRadius={'6px 6px'}
    >
      <Center
        width={'100%'}
        height={'100%'}
        fontWeight={400}
        fontSize={'18px'}
        lineHeight={'24px'}
        textColor={colorGray}
        textAlign={"center"}
      >
        {content}
        {'Adicione novos serviços para aparecer na listagem...'}
      </Center>
    </Box>
  )
}

export default RecordNotFoundFirstAccess