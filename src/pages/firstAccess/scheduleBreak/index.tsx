import React, { useContext, useState, useEffect } from 'react'
import {
  Box,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Flex,
  Image,
  Center,
  Stack,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import {
  Header,
  Layout,
  LayoutContent,
  LoadingBetweenScreen,
  CardHourScheduleBreak,
} from '../../../components'
import Minus from '../../../../public/Minus.svg'
import Plus from '../../../../public/Plus.svg'
import { ThemeContextBkm } from "../../../contexts/theme";
import { useForm } from 'react-hook-form'
import Router from 'next/router'
import { getStorageFirstAccess, setStorageFirstAccess } from '../../../hooks/useLocalStorage'

const AppHeader = () => {
  // return <Header path="/firstAccess/photosCompany" stage={5} />
  return <Header path="/firstAccess/operatingSchedule/" stage={5} />
}

const ScheduleBreak = () => {

  const bgColor = useColorModeValue('inputColor.bgLight', 'inputColor.bgDark')
  const colorGray = useColorModeValue('textColor.light', 'textColor.dark')
  const textColor = useColorModeValue('textColor.grayLight','textColor.grayDark')
  const colotButton = useColorModeValue('primary', 'primary')

  const [minutes, setMinutes] = useState(10)

  useEffect(() => {
    const value = parseInt(getStorageFirstAccess('schedule_interval'))
    if(value > 0) {
      setMinutes(value)
    }
  }, [])

  const { themebkm } = useContext(ThemeContextBkm);

  const ButtonBreak = ({
    width,
    margin = '0',
    borderWidth = '1px',
    borderStyle = 'solid',
    borderRadius = '6px 6px',
    children,
  }) => {
    return (
      <Box
        width={width}
        maxWidth={width}
        margin={margin}
        borderColor={colotButton}
        height={'59px'}
        borderWidth={borderWidth}
        borderStyle={borderStyle}
        borderRadius={borderRadius}
      >
        {children}
      </Box>
    )
  }

  const handleClickMinus = () => {
    setMinutes((state: any) => (state > 0 ? setMinutes(state - 1) : state))
    setStorageFirstAccess({'schedule_interval': minutes-1})
  }

  const handleClickPlus = () => {
    setMinutes((state): any => setMinutes(state + 1))
    setStorageFirstAccess({'schedule_interval': minutes+1})
  }

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  async function onSubmit() {
    
    setStorageFirstAccess({'schedule_interval': minutes})
    setStorageFirstAccess({'photos': []})

    Router.push('/firstAccess/team/')
  }

  return (
    <Layout>
      <AppHeader />
      <LayoutContent>
        <Heading
          as="h1"
          maxWidth={'275px'}
          fontWeight={'800'}
          fontSize={'28px'}
          textColor={textColor}
          textAlign={'left'}
          marginTop={'20px'}
          marginBottom={'16px'}
        >
          Intervalo da agenda
        </Heading>
        <Text
          fontWeight={400}
          fontSize={'16px'}
          lineHeight={'19px'}
          textColor={colorGray}
          marginBottom={'16px'}
        >
          Defina o intervalo de tempo entre os horários disponíveis na sua
          agenda.
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex alignItems={'center'} marginTop={'16px'}>
            <ButtonBreak width="54px">
              <Center
                height={'100%'}
                bg={bgColor}
                borderRadius={"6px 6px"}
                onClick={handleClickMinus}
              >
                <Minus style={{color: themebkm['colors']['primary']}} /> 
              </Center>
            </ButtonBreak>

            <ButtonBreak margin={'0 6px'} width="calc(100% - 108px)">
              <Center
                width={'100%'}
                height={'56px'}
                fontWeight={800}
                fontSize={'18px'}
                lineHeight={'24px'}
                textColor={colotButton}
                bg={bgColor}
                borderRadius={"6px 6px"}
              >
                {minutes}
                {' minutos'}
              </Center>
            </ButtonBreak>

            <ButtonBreak width="54px">
              <Center
                height={'100%'}
                onClick={handleClickPlus}
                bg={bgColor}
                borderRadius={"6px 6px"}
              >
                <Plus style={{color: themebkm['colors']['primary']}} /> 
              </Center>
            </ButtonBreak>
          </Flex>

          <Text
            as="h1"
            maxWidth={'262px'}
            fontWeight={'700'}
            fontSize={'22px'}
            textColor={textColor}
            textAlign={'left'}
            marginTop={'33px'}
          >
            Sua agenda ficará assim
          </Text>
          <Text
            fontWeight={400}
            fontSize={'16px'}
            lineHeight={'19px'}
            textColor={colorGray}
            marginTop={'8px'}
            marginBottom={'18px'}
          >
            Altere o intervalo acima para visualizar como os horários da sua
            agenda serão afetados.
          </Text>

          <CardHourScheduleBreak minutes={minutes} time={'08:00'} />
          <CardHourScheduleBreak minutes={minutes} time={'09:15'} />
          <CardHourScheduleBreak minutes={minutes} time={'10:30'} />
          <CardHourScheduleBreak minutes={minutes} time={'10:20'} />
          <CardHourScheduleBreak minutes={minutes} time={'10:45'} />
          <CardHourScheduleBreak minutes={minutes} time={'11:15'} />

          <Button
            type="submit"
            w={'full'}
            height={'59px'}
            marginTop={'15px'}
            isLoading={isSubmitting}
          >
            Próximo
          </Button>

        </form>

      </LayoutContent>
    </Layout>
  )
}

export default ScheduleBreak
