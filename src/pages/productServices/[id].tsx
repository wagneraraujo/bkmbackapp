import React, { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery, QueryCache } from 'react-query'
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
  Select,
  Tab,
  TabPanel,
  theme,
  extendTheme,
  Link,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Progress,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { Header, Layout, LayoutContent, SwitchCustom } from '../../components'
import {
  ArrowUpIcon,
  DeleteIcon,
  EditIcon,
  PlusSquareIcon,
} from '@chakra-ui/icons'
import { FiArchive } from 'react-icons/fi'
import { BiBookOpen } from 'react-icons/bi'
import { IoIosArrowForward } from 'react-icons/io'

import { AiOutlinePlus } from 'react-icons/ai'
import { IoMdRemove } from 'react-icons/io'
import { ProductServiceTypes } from '../../types/ProductServiceTypes'

import {
  createProductService,
  getProductForId,
  removeProduct,
} from '../../services/productservices'
import { Controller, useForm } from 'react-hook-form'
import { Image as ImgCloud } from 'cloudinary-react'
const AppHeader = () => {
  return <Header path="/productServices" />
}

import { Router, useRouter } from 'next/router'

const NewProductServices = () => {
  const [imageSelected, setImageSelected] = useState()
  const [imgCloudfile, setimgCloudfile] = useState('/addPhoto.png')
  const [loadingImage, setLoadingImage] = useState(0)

  const [cloudid, setcloudid] = useState('')

  const toast = useToast()
  const { query, push } = useRouter()
  const id = query.id
  const [qtdProduct, setQtdProduct] = useState(5)
  const textColor = useColorModeValue(
    'textColor.grayLight',
    'textColor.grayDark',
  )
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const addQtdProduct = () => {
    setQtdProduct((state) => state + 1)
  }

  const lessQtdProduct = () => {
    setQtdProduct((state) => state - 1)
  }

  const { data: dataproduct, refetch } = useQuery(['detailproduct', id], () =>
    getProductForId(id),
  )

  return (
    <>
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
              {dataproduct?.data.description}
            </Heading>
          </Flex>
          <Box>
            <form>
              <Tabs variant="soft-rounded">
                <TabList justifyContent={'space-between'}>
                  <Tab _selected={{ color: 'white', bg: 'primary' }}>
                    <EditIcon mr={'4px'} /> Cadastro
                  </Tab>
                  <Tab
                    color={'primary'}
                    _selected={{ color: 'white', bg: 'primary' }}
                  >
                    <FiArchive style={{ marginRight: '4px' }} /> Estoque
                  </Tab>
                </TabList>
                <Divider
                  my={'16px'}
                  borderColor={useColorModeValue('#c9c9c9', '#535353')}
                />

                <TabPanels>
                  {/* Painel de add produto */}
                  <TabPanel p={'0'}>
                    <Box>
                      <FormControl isInvalid={errors.type}>
                        <FormLabel htmlFor="type">Categoria</FormLabel>
                        <Input
                          defaultValue={
                            dataproduct?.data.type === 1 ? 'Produto' : 'Serviço'
                          }
                          disabled={dataproduct ? true : false}
                          _disabled={{
                            color: '#191919',
                          }}
                        />
                        <FormErrorMessage>
                          {errors.type && 'Campo obrigatório'}
                        </FormErrorMessage>
                      </FormControl>
                    </Box>
                    <Divider
                      my={'16px'}
                      borderColor={useColorModeValue('#c9c9c9', '#535353')}
                    />
                    <Box>
                      <FormControl isInvalid={errors.description}>
                        <FormLabel htmlFor="description">Nome</FormLabel>
                        <Input
                          id="description"
                          type="text"
                          defaultValue={dataproduct?.data.description}
                          placeholder="Descrição"
                          disabled={dataproduct ? true : false}
                          _disabled={{
                            color: '#191919',
                          }}
                          {...register('description', {
                            required: 'Campo obrigatório',
                          })}
                        />
                        <FormErrorMessage>
                          {errors.description && errors.description.message}
                        </FormErrorMessage>
                      </FormControl>
                    </Box>
                    <Divider
                      my={'16px'}
                      borderColor={useColorModeValue('#c9c9c9', '#535353')}
                    />

                    <Flex justifyContent={'space-between'}>
                      <Box w={'45%'}>
                        <Box
                          borderWidth={'1px'}
                          rounded={'lg'}
                          borderColor={useColorModeValue('#c9c9c9', '#535353')}
                          alignContent={'center'}
                          fontSize={'12px'}
                          alignItems={'center'}
                          height={'155px'}
                          justifyContent={'center'}
                          backgroundImage={dataproduct?.data.image}
                          bgSize={'cover'}
                          bgRepeat={'no-repeat'}
                          mb={'8px'}
                        ></Box>
                        {loadingImage > 0 ? (
                          <Progress hasStripe value={loadingImage} />
                        ) : (
                          ''
                        )}

                        {loadingImage > 99 && (
                          <Text
                            textAlign={'center'}
                            color="green"
                            fontSize={'12px'}
                          >
                            Uploud de imagem completo
                          </Text>
                        )}
                      </Box>

                      <Box w={'45%'}>
                        <Text size={'lg'} fontWeight={500}>
                          Adicionar Foto
                        </Text>{' '}
                        <Text fontSize={'12px'} color={textColor}>
                          Adicione uma foto que represente o produto/serviço que
                          será cadastrado.
                        </Text>
                      </Box>
                    </Flex>

                    <Divider
                      my={'16px'}
                      borderColor={useColorModeValue('#c9c9c9', '#535353')}
                    />

                    <Flex
                      justifyContent={'space-between'}
                      alignItems={'center'}
                    >
                      <Box width={'48%'}>
                        <FormControl isInvalid={errors.sale_price}>
                          <FormLabel htmlFor="sale_price">
                            Preço de venda
                          </FormLabel>
                          <Input
                            id="sale_price"
                            name="sale_price"
                            type="number"
                            defaultValue={dataproduct?.data.sale_price}
                            placeholder="0.00"
                            {...register('sale_price', {
                              required: 'Campo obrigatório',
                            })}
                            disabled={dataproduct ? true : false}
                            _disabled={{
                              color: '#191919',
                            }}
                          />

                          <FormErrorMessage>
                            {errors.sale_price && 'Campo obrigatório'}
                          </FormErrorMessage>
                        </FormControl>
                      </Box>

                      <Box width={'48%'}>
                        <FormControl isInvalid={errors.cost_price}>
                          <FormLabel htmlFor="sale_price">Custo</FormLabel>
                          <InputGroup>
                            <Input
                              defaultValue={dataproduct?.data.cost_price}
                              placeholder="R$ 1,00"
                              {...register('cost_price', {
                                required: 'Campo obrigatório',
                              })}
                              disabled={dataproduct ? true : false}
                              _disabled={{
                                color: '#191919',
                              }}
                            />
                            <InputRightElement width="4.5rem">
                              <Box
                                h="1.75rem"
                                bgColor={'#27AE601A'}
                                alignItems={'center'}
                                paddingX={'10px'}
                                style={{
                                  position: 'relative',
                                  top: '8px',
                                  height: '38px',
                                  color: 'green',
                                  fontSize: '12px',
                                  left: '5px',
                                  borderTopRightRadius: '6px',
                                  borderBottomRightRadius: '6px',
                                }}
                              >
                                <Text>Lucro:</Text>
                                <Text fontWeight={600}></Text>
                              </Box>
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage>
                            {errors.cost_price && 'Campo obrigatório'}
                          </FormErrorMessage>
                        </FormControl>
                      </Box>
                    </Flex>

                    <Divider
                      my={'16px'}
                      borderColor={useColorModeValue('#c9c9c9', '#535353')}
                    />

                    <Flex
                      justifyContent={'space-between'}
                      alignItems={'center'}
                    >
                      <Box>
                        <Text textAlign={'left'} mb={'0px'}>
                          Código de barras
                        </Text>
                        <Input placeholder="0000000000" width={'100%'} />
                      </Box>

                      <Box>
                        {' '}
                        <Image
                          boxSize="38px"
                          objectFit="contain"
                          src="/barras.png"
                          alt="codigo de barras"
                          position={'relative'}
                          top={'16px'}
                        />
                      </Box>
                    </Flex>

                    <Flex justifyContent={'space-between'}>
                      <NextLink passHref href={`/productServices/edit/${id}`}>
                        <Button
                          width={'45%'}
                          marginTop={'65px'}
                          bottom={'30px'}
                          leftIcon={<EditIcon />}
                        >
                          Atualizar
                        </Button>
                      </NextLink>

                      <Button
                        width={'45'}
                        marginTop={'65px'}
                        bottom={'30px'}
                        variant={'outline'}
                        leftIcon={<DeleteIcon />}
                        //onClick={() => removeThisProduct(id)}
                      >
                        Remover
                      </Button>
                    </Flex>
                  </TabPanel>

                  <TabPanel p={'0'}>
                    <Box>
                      <Text
                        fontSize={'xs'}
                        color={textColor}
                        textAlign={'left'}
                        mb={'8px'}
                      >
                        Nome do produto/Serviço
                      </Text>
                      <Text
                        textAlign={'left'}
                        mb={'8px'}
                        fontSize={'xl'}
                        textTransform={'capitalize'}
                      >
                        Água Mineral Cristal 501ml
                      </Text>
                      <SwitchCustom
                        title={'Controlar Estoque'}
                        id="controlerstock"
                        description="Ative ao lado para gerenciar estqoeu"
                        handleChange={() => {}}
                      />
                    </Box>

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
                            Entrada
                          </Tab>
                          <Tab
                            _selected={{
                              color: 'primary',
                              borderColor: 'primary',
                              borderBottom: '2px solid',
                            }}
                          >
                            Saída
                          </Tab>

                          <Tab
                            _selected={{
                              color: 'primary',
                              borderColor: 'primary',
                              borderBottom: '2px solid',
                            }}
                          >
                            Ajuste
                          </Tab>
                        </TabList>

                        <TabPanels>
                          <TabPanel p={'0'}>
                            <VStack mt={'32px'}>
                              {qtdProduct <= 3 ? (
                                <Box color={'gray'} fontSize={'lg'}>
                                  {' '}
                                  <EditIcon mr={'4px'} /> Estoque total:
                                  {qtdProduct}
                                </Box>
                              ) : (
                                <Box color={'primary'} fontSize={'lg'}>
                                  {' '}
                                  <EditIcon mr={'4px'} /> Estoque total:
                                  {qtdProduct}
                                </Box>
                              )}
                              <Flex
                                alignItems={'center'}
                                justifyContent={'space-between'}
                              >
                                <IconButton
                                  onClick={lessQtdProduct}
                                  variant="outline"
                                  aria-label="Add"
                                  fontSize="22px"
                                  fontWeight={'bold'}
                                  icon={<IoMdRemove color="gray" />}
                                  size="md"
                                  rounded={'full'}
                                  h={'44px'}
                                  w={'44px'}
                                  border={'none'}
                                  bg={'rgba(192, 192, 192, 0.1)'}
                                  background={'rgba(192, 192, 192, 0.1)'}
                                />

                                <Box textAlign={'center'}>
                                  <Input
                                    value={qtdProduct}
                                    onChange={(e) =>
                                      setQtdProduct(parseInt(e.target.value))
                                    }
                                    w={'180px'}
                                    textAlign={'center'}
                                    h={'auto'}
                                    border={'none'}
                                    fontSize={'6xl'}
                                    color={qtdProduct <= 3 ? 'gray' : 'primary'}
                                    style={{
                                      background: 'transparent',
                                    }}
                                  />
                                </Box>

                                <IconButton
                                  onClick={addQtdProduct}
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
                                  bg={useColorModeValue('#fff', '#191919')}
                                  background={useColorModeValue(
                                    '#fff',
                                    '#191919',
                                  )}
                                />
                              </Flex>
                              <Divider
                                my={'16px'}
                                mb={'30px'}
                                borderColor={useColorModeValue(
                                  '#c9c9c9',
                                  '#535353',
                                )}
                              />

                              <Link
                                href="/productServices/historicMoviment"
                                w={'full'}
                                bg={'primary'}
                                p={'6px'}
                                paddingX={'16px'}
                                rounded={'lg'}
                                color={'#fff'}
                              >
                                <Flex
                                  justifyContent={'space-between'}
                                  alignItems={'center'}
                                >
                                  <Flex w={'50%'} alignItems={'center'}>
                                    <BiBookOpen size={'36px'} />
                                    <Text
                                      fontSize={'xs'}
                                      ml={'6px'}
                                      fontWeight={600}
                                    >
                                      Histórico de Movimentação
                                    </Text>
                                  </Flex>

                                  <IoIosArrowForward />
                                </Flex>
                              </Link>
                            </VStack>
                          </TabPanel>
                        </TabPanels>
                      </Tabs>
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </form>
          </Box>
        </LayoutContent>
      </Layout>
    </>
  )
}

export default NewProductServices
