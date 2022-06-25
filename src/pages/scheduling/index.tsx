import React, { useEffect, useState } from 'react'
import {
  Button,
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  HStack,
  Divider,
  IconButton,
  VStack,
  InputGroup,
  InputRightElement,
  Input,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Switch,
  Link,
  useCheckboxGroup,
  FormControl,
  FormLabel,
  Select,
  useRadioGroup,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { AiOutlinePlus, AiOutlinePlusCircle } from 'react-icons/ai'
import {
  Layout,
  LayoutContent,
  Header,
  LoadingBetweenScreen,
  SwitchCustom,
  CustomCheckbox,
  RadioSelected,
} from '../../components'
import { Search2Icon } from '@chakra-ui/icons'
import CardProduct from '../../components/CardProduct'
import { ProductServiceTypes } from '../../types/ProductServiceTypes'
import { formatFieldFilter } from '../../utils'
import CheckboxDays from '../../components/CheckboxDays'
import CalendarDays from '../../components/CalendarDays'
import Details from '../../components/CalendarDays/details'
import {
  addDays,
  addWeeks,
  eachDayOfInterval,
  endOfWeek,
  format,
  intlFormat,
  parseISO,
  startOfWeek,
} from 'date-fns'
import pt from 'date-fns/locale/pt-BR'
import formatWithOptions from 'date-fns/fp/formatWithOptions'
import { SearchIcon } from '@chakra-ui/icons'
import { ItemSchedulingCustomer } from '../../components/SchedulingCustomer'

const AppHeader = () => {
  return <Header path="/dashboard/" />
}

const HomeScheduling = () => {
  const colotButton = useColorModeValue('primary', 'primary')
  const [showDetails, setShowDetails] = useState(false)
  const [schedulingData, setSchedulingData] = useState({})
  const textColor = useColorModeValue('textColor.grayLight','textColor.grayDark')
  const colorGray = useColorModeValue('textColor.light', 'textColor.dark')

  const { getCheckboxProps } = useCheckboxGroup({
    onChange: () => {},
  })
  const dateToString = formatWithOptions({ locale: pt }, 'd MMM')

  //config for data
  const now = new Date()
  const dayArray = eachDayOfInterval({
    start: startOfWeek(now, { weekStartsOn: 1 }),
    end: endOfWeek(now, { weekStartsOn: 1 }),
  })
  let arrOfDays = []
  let arrNumberDays = []
  dayArray.forEach((a) =>
    arrOfDays.push(
      intlFormat(
        a,
        {
          //   weekday: 'long',
          //   year: 'numeric',
          //   month: 'short',
          day: 'numeric',
          weekday: 'short',
        },
        {
          locale: 'pt',
        },
      ),
    ),
  )

  const servico = ['corte cabelo', 'corte barba']

  const { getRootProps, getRadioProps } = useRadioGroup()
  return (
    <Layout>
      <AppHeader />
      <LayoutContent>
        <Flex justifyContent={'space-between'} alignItems={'center'} mb={'6'}>
          <Heading
            as="h1"
            maxWidth={'289px'}
            fontWeight={'800'}
            fontSize={'28px'}
            textColor={textColor}
            textAlign={'left'}
            marginTop={'20px'}
            marginBottom={'16px'}
            lineHeight={'33px'}
          >
            Agendamento
          </Heading>
        </Flex>

        <Flex
          bg={useColorModeValue('#f1f1f1', '#313131')}
          rounded={'sm'}
          p={'8px'}
          border={useColorModeValue('1px solid #ececec', '1px solid #3f3f3f')}
        >
          <FormControl w={'70%'}>
            <FormLabel htmlFor="nome" color={'#ccc'} fontSize={'14px'}>
              Nome
            </FormLabel>
            <Select
              p={'0'}
              placeholder="Selecione "
              bg={'none'}
              border={'none'}
              fontSize={'18px'}
              fontWeight={'600'}
              color={useColorModeValue('#545454', '#f8f8f8')}
            >
              <option value="option1">Morgan Barber</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </FormControl>
          <FormControl
            display="flex"
            alignItems="center"
            flexDirection={'column'}
            w={'30%'}
            alignContent={'center'}
          >
            <FormLabel color={'#ccc'} fontSize={'14px'} mb="8px">
              Ativo
            </FormLabel>
            <Switch id="email-alerts" size={'lg'} />
          </FormControl>
        </Flex>

        <Stack mt={'32px'}>
          <Text color={'#2D3748'} fontWeight={'600'}>
            Próximos horários
          </Text>

          {/* <CalendarDays /> */}

          <Flex
            maxW={'90vw'}
            height={'10 px'}
            paddingX={'6px'}
            paddingY={'10px'}
            scrollBehavior={'smooth'}
            overflow={'scroll'}
            rounded={'lg'}
            backgroundColor={useColorModeValue('#fff', '#000000')}
            flexWrap={'nowrap'}
            borderRadius={'3px'}
            borderColor={useColorModeValue('#c4c4c4', '#272727')}
            borderWidth={'1px'}
            borderStyle={'solid'}
          >
            {arrOfDays.map((value) => {
              let day = value.replace('.,', '')

              const radio = getRadioProps({ value })
              return (
                <RadioSelected key={value} {...radio}>
                  {day}
                </RadioSelected>
              )
            })}
          </Flex>

          <Box
            justifyContent={'center'}
            textAlign={'center'}
            alignContent={'center'}
          >
            {!schedulingData && (
              <Box flexDirection={'column'} w={'100%'}>
                <SearchIcon />
                <Text>Nenhum agendamento encontrado</Text>
              </Box>
            )}
          </Box>
        </Stack>

        <Stack mt="16px">
          <Flex>
            <Box w={'25%'}>
              {' '}
              <Text fontSize={'12px'} color={'#BDBDBD'} textAlign={'center'}>
                Horário
              </Text>
            </Box>
            <Box w={'70%'} textAlign={'left'}>
              <Text fontSize={'12px'} color={'#BDBDBD'} ml={'23px'}>
                Cliente/Serviço
              </Text>
            </Box>
          </Flex>
        </Stack>
        <ItemSchedulingCustomer data={servico} />
        <ItemSchedulingCustomer data={servico} />
      </LayoutContent>
    </Layout>
  )
}

export default HomeScheduling
