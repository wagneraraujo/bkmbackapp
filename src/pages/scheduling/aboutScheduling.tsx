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
  TeamItemMember,
  CardDefault,
} from '../../components'
import { CalendarIcon, Search2Icon } from '@chakra-ui/icons'
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
import CardCustomer from '../../components/CardCustomerServico'

const AppHeader = () => {
  return <Header path="/" />
}

const AboutScheduling = () => {
  const colotButton = useColorModeValue('primary', 'primary')
  const [showDetails, setShowDetails] = useState(false)
  const [schedulingData, setSchedulingData] = useState({})
  const textColor = useColorModeValue(
    'textColor.grayLight',
    'textColor.grayDark',
  )
  const colorGray = useColorModeValue('textColor.light', 'textColor.dark')

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
            Sobre o agendamento
          </Heading>
        </Flex>

        <Box>
          <Text
            fontWeight={'600'}
            color={textColor}
            fontSize={'18px'}
            mb="0"
            position={'relative'}
            top={'10px'}
          >
            Prestador
          </Text>
          {/* <TeamItemMember name="Jose Silva" jobtitle="Barbeiro" /> */}
          <TeamItemMember id={1} name={'name'} phone={'phone'} email={'email'} />
        </Box>
        <Box>
          <Text
            fontWeight={'600'}
            color={textColor}
            fontSize={'18px'}
            mb="0"
            position={'relative'}
            top={'10px'}
          >
            Cliente
          </Text>
          <CardCustomer
            avatar="/produtos/corte.png"
            name="Jose Silva"
            phone="46464564"
            email="email@gmail.com"
          />
        </Box>
        <Box>
          <Text
            fontWeight={'600'}
            color={textColor}
            fontSize={'18px'}
            mb="0"
            position={'relative'}
            top={'10px'}
          >
            Serviços
          </Text>
          <CardProduct
            image="/produtos/corte.png"
            name="Corte de Cabelo"
            price={'R$ 30,00'}
          />
        </Box>

        <Box>
          <Text
            fontWeight={'600'}
            color={textColor}
            fontSize={'18px'}
            mb="0"
            position={'relative'}
            top={'10px'}
          >
            Data e Hora
          </Text>
          <CardDefault>
            <Box>
              <CalendarIcon color={'primary'} mr={'26px'} fontSize={'22px'} />
            </Box>
            <Box>
              <Text fontWeight={'600'} color={textColor}>
                23 de Julho de 2022
              </Text>
              <Text fontSize={'12px'} color={colorGray}>
                08:30 - 09:00
              </Text>
            </Box>
          </CardDefault>
        </Box>

        <Flex
          justifyContent={'space-between'}
          borderTop={'1px solid'}
          borderBottom={'1px solid'}
          py={'10px'}
          borderColor={useColorModeValue('#ccc', '#272727')}
        >
          <Text color={textColor}>Corte de Cabelo:</Text>
          <Text color={textColor} fontWeight={'600'}>
            R$ 30,00
          </Text>
        </Flex>
        <Flex
          justifyContent={'space-between'}
          borderTop={'1px solid'}
          borderBottom={'1px solid'}
          py={'10px'}
          borderColor={useColorModeValue('#ccc', '#272727')}
        >
          <Text color={textColor} fontSize="20px" fontWeight={'600'}>
            Total
          </Text>
          <Text color={textColor} fontWeight={'800'} fontSize="20px">
            R$ 30,00
          </Text>
        </Flex>

        <Box>
          <Button colorScheme="primary" size="lg" mt={'16px'} w={'full'}>
            Editar agendamento
          </Button>
        </Box>
        <Box>
          <Button
            colorScheme="primary"
            variant={'outline'}
            size="lg"
            mt={'16px'}
            w={'full'}
          >
            Cancelar agendamento
          </Button>
        </Box>
      </LayoutContent>
    </Layout>
  )
}

export default AboutScheduling