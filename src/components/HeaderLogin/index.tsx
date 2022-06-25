import React from 'react'
import { Image, useColorModeValue } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'

const HeaderLogin = () => {
  const bgImage = '../../../login/bg.png'
  const logoApp = '../../../logo_bkm_app.png'
  const colorPrimary = useColorModeValue('primary', 'primary')

  return (
    <Box
      position={'absolute'}
      width={'100%'}
      minWidth={'300px'}
      height={'300px'}
      top={0}
      left={0}
      backgroundImage={bgImage}
      backgroundPosition={'center'}
      backgroundRepeat={'no-repeat'}
      backgroundSize={'cover'}
    >
      <Box
        position={'absolute'}
        width={'inherit'}
        minWidth={'inherit'}
        height={'inherit'}
        backgroundColor={colorPrimary}
        opacity={0.5}
        top={0}
        left={0}
      />
      <Image
        src={logoApp}
        alt="BKM App Logo"
        position={'absolute'}
        width={'248px'}
        left={'24px'}
        top={'123px'}
      />
    </Box>
  )
}

export default HeaderLogin
