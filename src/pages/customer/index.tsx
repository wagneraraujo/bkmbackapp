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
  Stack,
  useRadioGroup,
  useCheckboxGroup,
  useRadio,
  Divider,
  Switch,
  Flex,
  IconButton,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import {
  Header,
  Layout,
  LayoutContent,
  LoadingBetweenScreen,
  RadioSelected,
  CustomCheckbox,
  CardCustomer,
} from '../../components'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { formatFieldFilter } from '../../utils'
import { AiOutlinePlus } from 'react-icons/ai'
import { getCustomers } from '../../services/customer'

const AppHeader = () => {
  return <Header path="/dashboard/" />
}

const Customer = (props) => {

  const { data: customerServiceList } = useQuery('customer', getCustomers, {
    enabled: true,
  })

  const iconColor = useColorModeValue('black', 'primary')
  const textColor = useColorModeValue(
    'textColor.grayLight',
    'textColor.grayDark',
  )

  useEffect(() => {
    console.log('customerServiceList: ', customerServiceList)
  }, [])

  // const [customerFilter, setCustomerFilter] = useState('')
  // const [customerList, setCustomerList] = useState(customersList)

  // useEffect(() => {
  //   let newCustomerFilter = formatFieldFilter(customerFilter)
  //   let filteredCustomer = customersList
  //   if(newCustomerFilter.length) {
  //     filteredCustomer = customersList.filter((customer: any) => {
  //       let { name } = customer
  //       if( formatFieldFilter(name).includes(newCustomerFilter) ) {
  //         return customer
  //       }
  //     })
  //   }
  //   setCustomerList(filteredCustomer)

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [customerFilter]);

  return (
    <>
      <Layout>
        <AppHeader />

        <LayoutContent>
          <Box color={iconColor} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
            <Heading
              as="h1"
              lineHeight={'34px'}
              textColor={textColor}
              fontSize={'28px'}
              fontWeight={'800'}
              textAlign={'left'}
              marginBottom={'16px'}
              marginTop={'21px'}
            >
              Todos os Clientes
            </Heading>
            <Box>
              <NextLink href="/customer/addCustomer" passHref>
                <IconButton
                  variant="outline"
                  aria-label="Add"
                  fontSize="22px"
                  fontWeight={'bold'}
                  icon={<AiOutlinePlus color="primary" />}
                  size="md"
                  rounded={'full'}
                  h={'44px'}
                  w={'44px'}
                  border={'none'}
                  bg={'secondaryLight'}
                  background={'secondaryLight'}
                />
              </NextLink>
            </Box>
          </Box>
          
          <Divider
            my={'16px'}
            borderColor={useColorModeValue('#CBD5E0', '#4d4d4d')}
          />
          <Box mt="16px">
            <Input
              type="text"
              //onChange={e => setCustomerFilter(e.target.value)}
              placeholder="Pesquisar por Cliente"
            />
          </Box>
          <Box>
            {customerServiceList?.data.map(customer => (
              <CardCustomer key={customer.id} customer={customer} />
            ))}
          </Box>
          
        </LayoutContent>
      </Layout>
    </>
  )
}

export default Customer

// export async function getServerSideProps() {
//   const response = await fetch('http://localhost:3000/api/customer')
//   const data = await response.json()

//   return {
//     props: {
//       customers: data,
//     }, // will be passed to the page component as props
//   }
// }