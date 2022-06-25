import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  HStack,
  useColorModeValue,
  useCheckboxGroup,
  Divider,
  Switch,
  Flex,
  Stack,
  FormErrorMessage,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import {
  Header,
  Layout,
  LayoutContent,
  CustomCheckbox,
} from '../../../components'
import { useForm } from 'react-hook-form'
import Router from 'next/router'
import { getStorageArray, setStorageArray } from '../../../hooks/useLocalStorage'

const AppHeader = () => {
  return <Header path="/firstAccess/dataCompany" stage={3} />
}

const OperatingSchedule = () => {
  const bgColor = useColorModeValue('bgBody.light', 'bgBody.dark')
  const iconColor = useColorModeValue('black', 'orange')
  const textColor = useColorModeValue('textColor.grayLight','textColor.grayDark')
  const textColorGray = useColorModeValue('textColor.gray', 'textColor.dark')
  const bgColorCheck = useColorModeValue('inputColor.bgLight','inputColor.bgDark')
  const borderColor = useColorModeValue('inputColor.borderLight','inputColor.borderDark')
  const colorGray = useColorModeValue('textColor.light', 'textColor.dark')

  const options = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
  
  const { getCheckboxProps } = useCheckboxGroup({
    onChange: () => {},
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = (values) => {

    let openingHours = []
    const isChecked = !!(options.find((value) => getCheckboxProps({ value }).isChecked === true ) || '')

    options.map((value, idx) => {
      const checkbox = getCheckboxProps({ value })

      let checked = checkbox.isChecked
      if(!isChecked && idx < 5) {
        checked = true
      } else if(!isChecked && idx > 4) {
        checked = false
      }

      const id = (idx+1)

      openingHours[idx] = {
        day: id,
        day_checked: checked,
        start: dataOpeningHours.start,
        close: dataOpeningHours.close,
        start_break: dataOpeningHours.start_break,
        stop_break: dataOpeningHours.stop_break,
        closed: Boolean(dataOpeningHours.closed),
      }
    })

    setStorageArray(openingHours, 'opening_hours')
    //Router.push('/firstAccess/photosCompany/')
    Router.push('/firstAccess/scheduleBreak/')
  }
  
  const [dataOpeningHours, setDataOpeningHours] = useState({
    start: '',
    close: '',
    start_break: '',
    stop_break: '',
    repeat_week: false,
    closed: false,
  })

  useEffect(() => {
    const start = getStorageArray('opening_hours', 0)['start'] || ''
    const close = getStorageArray('opening_hours', 0)['close'] || ''
    const start_break = getStorageArray('opening_hours', 0)['start_break'] || ''
    const stop_break = getStorageArray('opening_hours', 0)['stop_break'] || ''
    const repeat_week = getStorageArray('opening_hours', 0)['repeat_week'] || ''
    const closed = getStorageArray('opening_hours', 0)['closed'] || ''
    
    setDataOpeningHours({
      start: start,
      close: close,
      start_break: start_break,
      stop_break: stop_break,
      repeat_week: repeat_week,
      closed: closed,
    })
  }, [])

  const handleChange = (event) => {
    const { id, value } = event.target
    setDataOpeningHours((state) => ({
      ...state,
      [id]: value
    }))
  }

  const handleChangeSwitch = (e) => {
    const { id } = e.target
    setDataOpeningHours((state) => ({
      ...state,
      [id]: !dataOpeningHours[id]
    }))
  }

  return (
    <>
      <Layout>
        <AppHeader />

        <LayoutContent>
          <Box color={iconColor}>
            <Heading
              as="h1"
              lineHeight={'110%'}
              textColor={textColor}
              fontSize={'28px'}
              fontWeight={'black'}
              textAlign={'left'}
              marginBottom={'16px'}
              marginTop={'21px'}
            >
              Horários de funcionamento
            </Heading>
          </Box>
          <Text
            fontWeight={400}
            fontSize={'16px'}
            lineHeight={'19px'}
            textColor={colorGray}
          >
            Escolha os dias e horários em que seu estabelecimento estará
            funcionando.
          </Text>

          <form onSubmit={handleSubmit(onSubmit)}>

            <Box mt={5}>
              {' '}
              <Text
                fontWeight={600}
                fontSize={'18px'}
                lineHeight={'24px'}
                textColor={textColorGray}
              >
                Selecione os dias
              </Text>
              <HStack
                maxW={'90vw'}
                height={'70px'}
                marginTop={'8px'}
                paddingX={'8px'}
                scrollBehavior={'smooth'}
                overflow={'scroll'}
                backgroundColor={bgColor}
                flexWrap={'nowrap'}
                borderRadius={'3px'}
                borderColor={borderColor}
                borderWidth={'1px'}
                borderStyle={'solid'}
                whiteSpace={'nowrap'}
              >
                {options.map((value) => {
                  const checkbox = getCheckboxProps({ value })
                  return (
                    <CustomCheckbox key={value} {...checkbox}>
                      {value}
                    </CustomCheckbox>
                  )
                })}
              </HStack>
            </Box>
            <Box>
              <Text
                as={'p'}
                w={'100%'}
                fontWeight={600}
                fontSize={'18px'}
                lineHeight={'24px'}
                textColor={textColorGray}
                marginTop={'25px'}
                marginBottom={'16px'}
              >
                Defina os horários de funcionamento
              </Text>

              <HStack flexDir={'row'}>
                <Box w={'100%'}>
                  <FormControl id="start" isInvalid={errors.start}>
                    <FormLabel
                      style={{ position: 'relative', top: '8px' }}
                      color={'gray.500'}
                    >
                      Abre às
                    </FormLabel>
                    <Input
                      type="time"
                      id="start"
                      placeholder="08:00"
                      {...register('start', {
                        required: 'Campo obrigatório',
                      })}
                      value={dataOpeningHours.start}
                      onChange={handleChange}
                    />
                    <FormErrorMessage>
                      {errors.start && errors.start.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box w={'100%'}>
                  <FormControl id="close" isInvalid={errors.close}>
                    <FormLabel
                      style={{ position: 'relative', top: '8px' }}
                      color={'gray.500'}
                    >
                      Fecha às
                    </FormLabel>
                    <Input
                      type="time"
                      id="close"
                      placeholder="18:00"
                      {...register('close', {
                        required: 'Campo obrigatório',
                      })}
                      value={dataOpeningHours.close}
                      onChange={handleChange}
                    />
                    <FormErrorMessage>
                      {errors.close && errors.close.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
              </HStack>

              <Text
                as={'p'}
                w={'100%'}
                fontWeight={600}
                fontSize={'18px'}
                lineHeight={'24px'}
                textColor={textColorGray}
                marginTop={'25px'}
                marginBottom={'16px'}
              >
                Horário de Intervalo(Almoço)
              </Text>

              <HStack flexDir={'row'}>
                <Box w={'100%'}>
                  <FormControl id="start_break">
                    <FormLabel
                      style={{ position: 'relative', top: '8px' }}
                      color={'gray.500'}
                    >
                      Fecha às
                    </FormLabel>
                    <Input
                      type="time"
                      id="start_break"
                      placeholder="12:00"
                      value={dataOpeningHours.start_break}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Box>
                <Box w={'100%'}>
                  <FormControl id="stop_break">
                    <FormLabel
                      style={{ position: 'relative', top: '8px' }}
                      color={'gray.500'}
                    >
                      Voltamos às
                    </FormLabel>
                    <Input
                      type="time"
                      id="stop_break"
                      placeholder="14:00"
                      value={dataOpeningHours.stop_break}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Box>
              </HStack>

            </Box>

            <Box
              backgroundColor={bgColorCheck}
              width={'full'}
              height={'50px'}
              borderColor={borderColor}
              borderStyle={'solid'}
              borderWidth={'1px'}
              borderRadius={'10px'}
              marginTop={'16px'}
            >
              <Flex
                padding={'14px 11px'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Text>Repetir para dias da semana</Text>
                <Switch
                  id="repeat_week"
                  color={'primary'}
                  isChecked={dataOpeningHours.repeat_week}
                  onChange={handleChangeSwitch}
                />
              </Flex>
            </Box>

            <Divider
              width={'100%'}
              borderColor={'#CBD5E0'}
              borderWidth={'1px'}
              borderStyle={'solid'}
              mt="3"
              margin={'32px 0'}
            />

            <Box
              backgroundColor={bgColorCheck}
              width={'full'}
              height={'50px'}
              borderColor={borderColor}
              borderStyle={'solid'}
              borderWidth={'1px'}
              borderRadius={'10px'}
              marginTop={'16px'}
            >
              <Flex
                padding={'14px 11px'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Text
                  fontWeight={600}
                  fontSize={'17px'}
                  lineHeight={'20px'}
                  textColor={'primary'}
                >
                  Definir como fechado
                </Text>
                <Switch
                  id="closed"
                  color={'primary'}
                  isChecked={dataOpeningHours.closed}
                  onChange={handleChangeSwitch}
                />
              </Flex>
            </Box>

            <Stack spacing={10} pt={2}>
              <Button
                type={'submit'}
                w={'full'}
                height={'59px'}
                mt={10}
                isLoading={isSubmitting}
              >
                Próximo
              </Button>
            </Stack>

          </form>

        </LayoutContent>
      </Layout>
    </>
  )
}

export default OperatingSchedule
