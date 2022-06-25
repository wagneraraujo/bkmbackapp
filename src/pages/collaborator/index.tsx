import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  useColorModeValue,
  Divider,
  Center
} from '@chakra-ui/react'
import NextLink from 'next/link'
import {
  Header,
  Layout,
  LayoutContent,
  LoadingBetweenScreen,
  RecordNotFoundFirstAccess,
  TeamItemMember,
} from '../../../components'
import { getStorageArray } from '../../../hooks/useLocalStorage'

const AppHeader = () => {
  return <Header path="/firstAccess/scheduleBreak" stage={3} />
}

const OperatingSchedule = () => {

  const colotButton = useColorModeValue('primary', 'primary')
  const iconColor = useColorModeValue('black', 'primary')
  const textColor = useColorModeValue('textColor.grayLight','textColor.grayDark')
  const colorGray = useColorModeValue('textColor.light', 'textColor.dark')

  const [dataListTeam, setDataListListTeam] = useState([])
  const [existsData, setExistsData] = useState(false)

  useEffect(() => {
    const data = getStorageArray('team')
    setDataListListTeam(data)
  }, [])

  useEffect(() => {
    if(!!dataListTeam[0]) {
      setExistsData((Object.keys(dataListTeam[0]).length > 0))
    }
  }, [dataListTeam])

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
              Equipe
            </Heading>
          </Box>
          <Text
            fontWeight={400}
            fontSize={'16px'}
            lineHeight={'19px'}
            textColor={colorGray}
          >
            Adicione e visualize os membros da sua equipe.
          </Text>
          <Box mt="16px">
            <NextLink href="/firstAccess/team/addteam" passHref>
              <Box
                width={'100%'}
                height={'59px'}
                margin={'16px 0px'}
                borderColor={colotButton}
                borderWidth={'1px'}
                borderStyle={'solid'}
                borderRadius={'6px 6px'}
                bg={useColorModeValue('#fff', 'transparent')}
              >
                <Center
                  width={'100%'}
                  height={'56px'}
                  fontWeight={800}
                  fontSize={'18px'}
                  lineHeight={'24px'}
                  textColor={colotButton}
                >
                  {'Adicionar Membro'}
                </Center>
              </Box>
            </NextLink>
          </Box>
          
          {
          existsData ?
            dataListTeam.map((team: any) => (
              <TeamItemMember
                key={team.id}
                id={team.id}
                name={team.name}
                phone={team.phone}
                email={team.email}
              />
            ))
            :
            <RecordNotFoundFirstAccess content={'Adicione novos serviços para aparecer na listagem...'} />
          }
          <NextLink href="/firstAccess/paymentOptions/" passHref>
            <Button
              w={'full'}
              height={'59px'}
              marginTop={'15px'}
            >
              Próximo
            </Button>
          </NextLink>
        </LayoutContent>
      </Layout>
    </>
  )
}

export default OperatingSchedule
