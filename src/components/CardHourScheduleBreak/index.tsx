import React, { useEffect, useState } from 'react'
import {
  Flex,
  Center,
  useColorModeValue
} from '@chakra-ui/react'

const CardHourScheduleBreak = (props) => {

	const bgColorHour = useColorModeValue('inputColor.bgLight', 'inputColor.bgDark')
	const colorBorderHour = useColorModeValue('inputColor.borderLight', 'inputColor.borderDark')
	const horario = props.time
	const minutes = props.minutes

	const [scheduleCalculated, setCcheduleCalculated] = useState('')

	useEffect(() => {

		const currentDate = new Date(`${new Date().getFullYear()} ${horario}`)

		const calculatedMinutes = currentDate.getMinutes() + minutes
		currentDate.setMinutes(calculatedMinutes)

		const currentHours = currentDate.getHours()
		const currentMinutes = currentDate.getMinutes()

		const newHours = (currentHours < 10) ? `0${currentHours}` : currentHours
		const newMinutes = (currentMinutes < 10) ? `0${currentMinutes}` : currentMinutes

		setCcheduleCalculated(`${newHours}:${newMinutes}`)

	}, [minutes])

	return (
		<Flex
    	alignItems={"center"}
    	justifyContent={"center"}
    	marginTop={"6px"}
    	marginBottom={"16px"}
    	gap={"12px"}
  	>
    	<Center
    		width="177px"
    		height={"47px"}
    		backgroundColor={bgColorHour}
    		borderRadius={"6px 6px"}
    		borderColor={colorBorderHour}
        borderWidth={"1px"}
        borderStyle={"solid"}
        fontWeight={700}
        fontSize={"25px"}
        lineHeight={"31px"}
  		>
  			{horario}
    	</Center>

    	<Center
    		width="177px"
    		height={"47px"}
    		backgroundColor={bgColorHour}
    		borderRadius={"6px 6px"}
    		borderColor={colorBorderHour}
        borderWidth={"1px"}
        borderStyle={"solid"}
        fontWeight={700}
        fontSize={"25px"}
        lineHeight={"31px"}
  		>
  			{scheduleCalculated}
    	</Center>
    </Flex>
	)
}

export default CardHourScheduleBreak