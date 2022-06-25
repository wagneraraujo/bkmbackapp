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
  Link,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { AiOutlinePlus, AiOutlinePlusCircle } from 'react-icons/ai'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import {
  Layout,
  LayoutContent,
  Header,
  LoadingBetweenScreen,
} from '../../components'
import { Search2Icon } from '@chakra-ui/icons'
import CardProduct from '../../components/CardProduct'
import { ProductServiceTypes } from '../../types/ProductServiceTypes'
import { formatFieldFilter } from '../../utils'
import { getProducts } from '../../services/productservices'

const AppHeader = () => {
  return <Header path="/dashboard" />
}

const ProductServicesPage = () => {

  const { data: productServiceList } = useQuery('products', getProducts, {
    enabled: true,
  })
  
  const colotButton = useColorModeValue('primary', 'primary')
  const textColor = useColorModeValue(
    'textColor.grayLight',
    'textColor.grayDark',
  )
  const colorGray = useColorModeValue('textColor.light', 'textColor.dark')

  const addPhotoDefault = '/addPhoto.png'

  // const [productServiceFilter, setProductService] = useState('')
  // const [productServiceList, setProductServiceList] = useState(productServices)

  // useEffect(() => {
  //   let newProductServiceFilter = formatFieldFilter(productServiceFilter)
  //   let filteredCustomer = productServices
  //   if (newProductServiceFilter.length) {
  //     filteredCustomer = productServices.filter((productService: any) => {
  //       let { name } = productService
  //       if (formatFieldFilter(name).includes(newProductServiceFilter)) {
  //         return productService
  //       }
  //     })
  //   }
  //   setProductServiceList(filteredCustomer)

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [productServiceFilter])

  // console.log(productServiceList)
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
            Produtos e Serviços
          </Heading>

          <NextLink href="/productServices/addProduct/" passHref>
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
        </Flex>

        <VStack>
          <Input
            type="text"
            //onChange={(e) => setProductService(e.target.value)}
            placeholder="Pesquisar produto ou serviço"
          />
        </VStack>

        <VStack mt={'40px'}>
          <Tabs w={'full'} colorScheme="primary" p={'0'}>
            <TabList>
              <Tab
                _selected={{
                  color: 'primary',
                  borderColor: 'primary',
                  borderBottom: '2px solid',
                }}
              >
                Todos
              </Tab>
              <Tab
                _selected={{
                  color: 'primary',
                  borderColor: 'primary',
                  borderBottom: '2px solid',
                }}
              >
                Produtos
              </Tab>

              <Tab
                _selected={{
                  color: 'primary',
                  borderColor: 'primary',
                  borderBottom: '2px solid',
                }}
              >
                Serviços
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel p={'0'}>
                {productServiceList?.data.map((productService) => (
                  <CardProduct
                    key={productService.id}
                    category={productService.type === 1 ? 'Produto' : 'Serviço'}
                    name={productService.description}
                    image={productService.image || addPhotoDefault}
                    urlAction={`/productServices/edit/${productService.id}`}
                    qtd={productService.stock}
                  />
                ))}
              </TabPanel>
              <TabPanel p={'0'}>
                {productServiceList?.data
                  .filter(
                    (productService) =>
                      productService.type === ProductServiceTypes.Produto,
                  )
                  .map((productService) => (
                    <CardProduct
                      key={productService.id}
                      category={
                        productService.type === 1 ? 'Produto' : 'Serviço'
                      }
                      name={productService.description}
                      image={productService.image || addPhotoDefault}
                      urlAction={`/productServices/edit/${productService.id}`}
                      qtd={productService.stock}
                    />
                  ))}
              </TabPanel>
              <TabPanel p={'0'}>
                {productServiceList?.data
                  .filter(
                    (productService) =>
                      productService.type === ProductServiceTypes.Servico,
                  )
                  .map((productService) => (
                    <CardProduct
                      key={productService.id}
                      category={
                        productService.type === 1 ? 'Produto' : 'Serviço'
                      }
                      name={productService.description}
                      image={productService.image || addPhotoDefault}
                      urlAction={`/productServices/edit/${productService.id}`}
                      qtd={productService.stock}
                    />
                  ))}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </LayoutContent>
    </Layout>
  )
}

export default ProductServicesPage
