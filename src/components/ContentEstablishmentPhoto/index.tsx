import React from 'react'
import {
  Box,
  useColorModeValue,
} from '@chakra-ui/react'

const EstablishmentPhoto = (props) => {

	const bgColorItem = useColorModeValue('inputColor.bgLight', 'inputColor.bgDark')
	const borderColor = useColorModeValue('inputColor.borderLight', 'inputColor.borderDark')

	return (
		<Box
			width={"100%"}
			height={"106px"}
			backgroundColor={bgColorItem}
			borderRadius={"10px 10px"}
			borderColor={borderColor}
      borderWidth={"1px"}
      borderStyle={"solid"}
      margin={"8px 0"}
      onClick={props.handleClick}
  	>
  		{props.children}
  	</Box>
	)
}

export default EstablishmentPhoto