import React from 'react'
import {
	Flex,
  Box,
  Text,
  Image,
  useColorModeValue,
} from '@chakra-ui/react'

import { ContentEstablishmentPhoto } from '../../components'

const EstablishmentPhoto = ({ title, image }) => {

	const bgColorItem = useColorModeValue('inputColor.bgLight', 'inputColor.bgDark')
	const borderColor = useColorModeValue('inputColor.borderLight', 'inputColor.borderDark')
	const textColorGray = useColorModeValue('textColor.gray', 'textColor.dark')

	return (
		<ContentEstablishmentPhoto>
  		<Flex
  			alignItems={"center"}
  			justifyContent={"space-between"}
  			height={"100%"}
  			overflow={"hidden"}
			>
  			<Text
  				as={"p"}
  				display={"inline-block"}
  				width={"100%"}
  				fontWeight={600}
  				fontSize={"18px"}
  				lineHeight={"21px"}
  				textColor={textColorGray}
  				marginLeft={"16px"}
  				maxHeight={"90px"}
  				overflow={"hidden"}
  			>
  				{title}
  			</Text>
  			<Image
  				display={"inline-block"}
          src={image}
          alt={'Fotos da fachada'}
          width={'90px'}
          borderRadius={"10px 10px"}
          marginRight={"8px"}
        />
  		</Flex>
  	</ContentEstablishmentPhoto>
	)
}

export default EstablishmentPhoto