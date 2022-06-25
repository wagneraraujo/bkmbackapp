import React from 'react'
import { Center, CircularProgress, useColorModeValue } from '@chakra-ui/react'
import { Layout } from '../../components'

const LoadingBetweenScreen = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.700')

  return (
    <Layout alignItems={'center'} justifyContent={'center'}>
      <Center p={6} rounded={6} background={bgColor}>
        <CircularProgress isIndeterminate color="primary" />
      </Center>
    </Layout>
  )
}

export default LoadingBetweenScreen
