import { ColorModeScript, theme } from '@chakra-ui/react'
import { Html, Head, Main, NextScript } from 'next/document'
import { PWAHeader } from '../components/Pwa'

export default function Document() {
  return (
    <Html>
      <Head>
        <PWAHeader />
      </Head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
