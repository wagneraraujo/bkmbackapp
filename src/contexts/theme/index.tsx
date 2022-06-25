import React, { createContext, useState } from 'react'
import { orangeTheme, purpleTheme } from '../../styles/theme'
import { ChakraProvider } from '@chakra-ui/react'

export const ThemeContextBkm = createContext(
  {} as { themebkm: String; setthemebkm: any },
)

function ThemeProviderContext({ children }: any) {
  const [themebkm, setthemebkm] = useState(purpleTheme as any)

  return (
    <ThemeContextBkm.Provider value={{ themebkm, setthemebkm }}>
      <ChakraProvider theme={themebkm}>{children}</ChakraProvider>
    </ThemeContextBkm.Provider>
  )
}

export default ThemeProviderContext
