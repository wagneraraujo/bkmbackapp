import React from 'react';
import {
  Flex,
  useColorModeValue
} from '@chakra-ui/react';

const CardDefault = ({ children, onClick=(() => {}) }) => {

  const bgColor = useColorModeValue('#fff', 'bgBody.dark')

  return (
    // <Box
    //   w={'full'}
    //   my={'16px'}
    //   p={'16px'}
    //   rounded={'lg'}
    //   style={{
    //     border: '1px solid #E2E8F0',
    //     background: bgColor,
    //   }}
    // ></Box>
    <Flex
      bg={bgColor}
      border={`1px solid ${useColorModeValue('#E2E8F0', '#383838')} `}
      borderRadius={'md'}
      p="20px"
      alignItems={'center'}
      my={'16px'}
      onClick={onClick}
    >
      {children}
    </Flex>
  )
}

export default CardDefault;