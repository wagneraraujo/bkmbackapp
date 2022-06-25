import React, { useEffect, useState } from 'react';
import NextLink from 'next/link'
import { Image, Text, useColorMode } from '@chakra-ui/react'

const BackLink = ({ backLink = "" }) => {

  const [useBackLink, setUseBackLink] = useState(false)
  const [backThemeColor, setBackThemeColor] = useState("/back_light.png")

  const { colorMode } = useColorMode()

  useEffect(() => {
    setUseBackLink(backLink === "" ? false : true)
  }, [backLink])

  useEffect(() => {
    setBackThemeColor((colorMode === 'dark') ? "/back_light.png" : "/back_dark.png")
  }, [colorMode])

  const createBackLink = () => (
    <NextLink href={backLink} passHref>
      <Image src={backThemeColor} alt={"Icone de voltar"} width={"22px"} />
    </NextLink>
  )

  const createEmptyText = () => (
    <Text></Text>
  )

  return (
    <>
      {useBackLink ? createBackLink() : createEmptyText()}
    </>
  )
}

export default BackLink;