import React, { useEffect, useState } from 'react'
import { Flex, useColorModeValue } from '@chakra-ui/react'

const Layout = ({ children, alignItems = 'top', height = '100vh', justifyContent="flex-start", ...props }) => {

  const bgColor = useColorModeValue('bgBody.light', 'bgBody.dark')

  const [heightEl, setHeightEl] = useState(height)

  useEffect(() => {

    setTimeout(() => {
      //debugger
      const nextFirstHeight = document.querySelector('#__next').firstChild.firstChild['clientHeight']
      const nextLastHeight = document.querySelector('#__next').firstChild.lastChild['clientHeight']
      const htmlHeight = document.querySelector('html').clientHeight
      if((nextFirstHeight + nextLastHeight) > 0) {
        if((nextFirstHeight + nextLastHeight) > htmlHeight) {
          setHeightEl('none')
        }
      }
    }, 1000)
  }, [height])

  return (
    <Flex
      minWidth={'300px'}
      height={heightEl}
      margin={0}
      alignItems={alignItems}
      justifyContent={justifyContent}
      backgroundColor={bgColor}
      flexDirection="column"
      {...props}
    >
      {children}
    </Flex>
  )
}

export default Layout
