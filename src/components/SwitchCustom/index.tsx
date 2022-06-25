import React from 'react'

import { Box, Flex, Text, Switch, useColorModeValue } from '@chakra-ui/react'
// interface SwitchCustomProps {
//   title: string
//   id: any
//   description?: string
//   onclick: Function
// }
const SwitchCustom = ({ title, id, description='', handleChange, isChecked=false }) => {

  const bgColorCheck = useColorModeValue('inputColor.bgLight','inputColor.bgDark')
  const borderColor = useColorModeValue('inputColor.borderLight','inputColor.borderDark')

  return (
    <Box
      backgroundColor={bgColorCheck}
      width={'full'}
      minHeight={'50px'}
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
        <Box>
          <Text>{title}</Text>
          <Text fontSize={'xs'} color={'#ccc'}>
            {description}
          </Text>
        </Box>
        <Switch
          id={id}
          color={'primary'}
          onChange={() => handleChange(id)}
          isChecked={isChecked}
          // ringColor={'primary'}
          // textColor={'primary'}
          //colorScheme={'primary'}
        />
      </Flex>
    </Box>
  )
}

export default SwitchCustom