import React from 'react'
import { Box } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react'

const LayoutContent = ({
  children,
  margin = '0 auto',
  //margin = '24px auto',
  marginTop = '70px',
  padding = '0 18px 18px 18px',
  maxWidth = '414px',
  minWidth = '300px',
  // height="inherit",
  ...props
}) => {
  const bgColor = useColorModeValue('bgBody.light', 'bgBody.dark')

  return (
    <Box
      margin={margin}
      marginTop={marginTop}
      padding={padding}
      maxWidth={maxWidth}
      minWidth={minWidth}
      width={"100%"}
      // height={height}
      backgroundColor={bgColor}
      {...props}
    >
      {children}
    </Box>
  )
}

export default LayoutContent
