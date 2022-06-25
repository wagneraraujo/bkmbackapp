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
import Calendar from 'react-calendar'
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
  CardHourScheduleBreak,
} from '../../components'

const AppHeader = () => {
  return <Header path="/" />
}

const HomeScheduling = () => {
  const colotButton = useColorModeValue('primary', 'primary')
  const [showDetails, setShowDetails] = useState(false)
  const [schedulingData, setSchedulingData] = useState(new Date())
  const textColor = useColorModeValue(
    'textColor.grayLight',
    'textColor.grayDark',
  )
  const colorGray = useColorModeValue('textColor.light', 'textColor.dark')
  const [minutes, setMinutes] = useState(30)

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
            Novo Agendamento
          </Heading>
        </Flex>

        <Box>
          <Text fontSize={'20px'} fontWeight={'700'} color={textColor}>
            {' '}
            Tipo de agendamento
          </Text>
          <Flex
            mt={'8px'}
            justifyContent={'space-between'}
            experimental_spaceX={'8px'}
          >
            <Button colorScheme="primary" size="lg" width={'full'}>
              Normal
            </Button>
            <Button colorScheme="primary" variant="outline" size="lg">
              Encaixe
            </Button>
          </Flex>
        </Box>
        <Divider
          my={'16px'}
          borderColor={useColorModeValue('#c9c9c9', '#535353')}
        />
        <Box>
          <Text fontSize={'20px'} fontWeight={'700'} color={textColor}>
            {' '}
            Escolha o dia e horário
          </Text>
        </Box>
        <Box
          mt={'16px'}
          bg={useColorModeValue('#f4f4f4', '#191919')}
          p={'6px'}
          w={'full'}
          border={useColorModeValue('1px solid #ececec', '1px solid #313131')}
        >
          <Text color={colorGray} fontWeight={'bold'} fontSize={'16px'}>
            Atenção Clientes
          </Text>
          <Text color={colorGray} fontSize={'14px'}>
            Os agendamentos devem ser realizados com pelo menos 30 minutos de
            antecedência.
          </Text>
        </Box>
        <Box>
          <Calendar onChange={setSchedulingData} value={schedulingData} />
        </Box>
        <Tabs mt={'30px'} border={'none'} variant="soft-rounded">
          <TabList justifyContent={'space-between'} experimental_spaceX={'6px'}>
            <Tab
              borderWidth={'1px'}
              rounded="md"
              color={'primary'}
              w="full"
              borderColor={'primary'}
              _selected={{
                color: 'white',
                bg: 'primary',
                rounded: 'md',
              }}
            >
              Manhã
            </Tab>
            <Tab
              borderColor={'primary'}
              w="full"
              color={'primary'}
              borderWidth={'1px'}
              rounded="md"
              _selected={{ color: 'white', bg: 'primary', rounded: 'md' }}
            >
              Tarde
            </Tab>
            <Tab
              borderWidth={'1px'}
              w="full"
              borderColor={'primary'}
              rounded="md"
              color={'primary'}
              _selected={{ color: 'white', bg: 'primary', rounded: 'md' }}
            >
              Noite
            </Tab>
          </TabList>

          <TabPanels>
            {/* Painelmanha */}
            <TabPanel p={'0'} pt={'16px'}>
              <CardHourScheduleBreak minutes={minutes} time={'08:00'} />
            </TabPanel>

            {/* Painel de tarde */}
            <TabPanel p={'0'} pt={'16px'}>
              {' '}
              <CardHourScheduleBreak minutes={minutes} time={'13:00'} />
            </TabPanel>
            {/* Painel de noite */}
            <TabPanel p={'0'} pt={'16px'}>
              <CardHourScheduleBreak minutes={minutes} time={'19:00'} />
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Button colorScheme="primary" size="lg" mt={'16px'} w={'full'}>
          Confirmar agendamento
        </Button>
      </LayoutContent>
    </Layout>
  )
}

export default HomeScheduling
