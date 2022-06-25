import React, { useEffect, useRef, useState } from 'react'

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
import {
  Header,
  Layout,
  LayoutContent,
  SwitchCustom,
} from '../../../components'
import { ArrowUpIcon, EditIcon, PlusSquareIcon } from '@chakra-ui/icons'
import { FiArchive } from 'react-icons/fi'
import { BiBookOpen } from 'react-icons/bi'
import { IoIosArrowForward } from 'react-icons/io'
import axios from 'axios'

import { AiOutlinePlus } from 'react-icons/ai'
import { IoMdRemove } from 'react-icons/io'
import { ProductServiceTypes } from '../../../types/ProductServiceTypes'
import { useMutation, useQuery } from 'react-query'
import {
  createProductService,
  getProductForId,
  updateProductFunction,
} from '../../../services/productservices'
import { Controller, useForm } from 'react-hook-form'
import { Image as ImgCloud } from 'cloudinary-react'
const AppHeader = () => {
  return <Header path="/productServices" />
}

import { useRouter } from 'next/router'

const NewProductServices = () => {
  const [imageSelected, setImageSelected] = useState(null)
  const [imgCloudfile, setimgCloudfile] = useState(null)
  const [loadingImage, setLoadingImage] = useState(0)
  const { query, push } = useRouter()
  const id = query.id
  const idProduct = query.id
  const [cloudid, setcloudid] = useState('')
  const [product, setProduct] = useState({
    description: '',
    sale_price: 0,
    cost_price: 0,
    // percentage_comission: '',
    stock: '',
    type: '',
    company: '',
    id: '',
  })
  const toast = useToast()
  const router = useRouter()
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
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      description: '',
      sale_price: 0,
      cost_price: 0,
      // percentage_comission: '',
      stock: '',
      type: '',
      company: '',
      id: '',
      image: '',
    },
  })

  const addQtdProduct = () => {
    setQtdProduct((state) => state + 1)
  }

  const lessQtdProduct = () => {
    setQtdProduct((state) => state - 1)
  }
  const { mutate: updateProduct, isLoading, isSuccess, isError } = useMutation(
    updateProductFunction,
  )

  function handleSubmitForm(data: any) {
    data.id = dataproduct.data.id

    if (!(parseInt(data.type) > 0)) {
      toast({
        title: 'Selecione uma categoria',
        duration: 2000,
        status: 'warning',
        position: 'top',
      })
      return
    }

    const formatProduct = {
      type: parseInt(data.type),
      description: data.description,
      sale_price: Number(data.sale_price),
      cost_price: Number(data.cost_price),
      percentage_commission: Number(0.0),
      stock: Number(1),
      company: Number(3),
      id: Number(data.id),
      image: imgCloudfile === null ? dataproduct.data.image : imgCloudfile,
    }
    //alert(JSON.stringify(data))

    console.log(formatProduct)

    updateProduct(formatProduct)
  }

  const { data: dataproduct, refetch } = useQuery(['detailproduct', id], () =>
    getProductForId(id),
  )

  const createProduct = (data) => {
    if (!(parseInt(data.type) > 0)) {
      toast({
        title: 'Selecione uma categoria',
        duration: 2000,
        status: 'warning',
        position: 'top',
      })
      return
    }

    const formatProduct: any = {
      type: parseInt(data.type),
      description: data.description,
      sale_price: Number(data.sale_price),
      cost_price: Number(data.cost_price),
      percentage_commission: Number(0.0),
      stock: Number(1),
      company: Number(3),
      // image: imgCloudfile ? imgCloudfile : null,
    }

    // update(formatProduct, idProduct)
    //alert()
  }

  //mensagens
  useEffect(() => {
    toast.closeAll()
    if (isSuccess) {
      toast({
        title: 'Produto atualizado com sucesso!',
        duration: 2000,
        status: 'success',
        position: 'top',
      })

      reset()
      router.push('/productServices/')
    }
    if (isLoading) {
      toast({
        title: 'Atualizando Produto...',
        duration: 2000,
        status: 'info',
        position: 'top',
      })
    }
    if (isError) {
      toast({
        title: 'Error ao atualizar produto!',
        duration: 2000,
        status: 'warning',
        position: 'top',
      })
    }
  }, [isSuccess, isLoading, isError, toast, reset, router])

  const uploudImage = (files) => {
    const formData = new FormData()
    formData.append('file', imageSelected)
    formData.append('upload_preset', 'ml_default')
    axios
      .post(
        'https://api.cloudinary.com/v1_1/bkmservices/image/upload',
        formData,
        {
          onUploadProgress: (ProgressEvent) => {
            setLoadingImage(
              Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total),
            )
          },
        },
      )
      .then((res) => {
        // console.log(res.data.secure_url)
        setimgCloudfile(res.data?.secure_url)
        setcloudid(res.data?.public_id)
      })
      .catch((err) => {
        console.log(err)
        setLoadingImage(0)
      })
  }

  useEffect(() => {
    if (dataproduct) {
      setValue('description', dataproduct.data.description)
      setValue('sale_price', dataproduct.data.sale_price)
      setValue('cost_price', dataproduct.data.cost_price)
      // setValue('percentage_comission', dataproduct.data.percentage_comission)
      setValue('stock', dataproduct.data.stock)
      setValue('type', dataproduct.data.type)
      setValue('company', '3')
      setValue('id', dataproduct.data.id)
      setValue('image', dataproduct.data.image)
    }
  }, [dataproduct, setValue])

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
              Editar Produto/Serviço
            </Heading>
          </Flex>
          <Box>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
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
                      <FormControl /*isInvalid={errors.type}*/>
                        <FormLabel htmlFor="type">Categoria</FormLabel>
                        <Select
                          id="type"
                          {...register('type')}
                          defaultValue={product.type}
                        >
                          <option value="0" defaultValue={'0'}>
                            Selecionee
                          </option>
                          <option value="1" defaultValue={'1'}>
                            Produto
                          </option>
                          <option value="2" defaultValue={'2'}>
                            Serviço
                          </option>
                        </Select>
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
                      <FormControl /*isInvalid={errors.description}*/>
                        <FormLabel htmlFor="description">Nome</FormLabel>
                        <Input
                          id="description"
                          type="text"
                          placeholder="Descrição"
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
                          backgroundImage={
                            loadingImage > 0
                              ? imgCloudfile
                              : dataproduct?.data.image
                          }
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
                        <Input
                          type="file"
                          className="custom-file-input"
                          onChange={(event) => (
                            setImageSelected(event.target.files[0])
                          )}
                        />
                        <Button
                          as="a"
                          mt="10px"
                          onClick={uploudImage}
                          leftIcon={<ArrowUpIcon />}
                          colorScheme="primary"
                          variant="solid"
                          disabled={imageSelected ? false : false}
                        >
                          Enviar imagem
                        </Button>
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
                        <FormControl /*isInvalid={errors.sale_price}*/>
                          <FormLabel htmlFor="sale_price">
                            Preço de venda
                          </FormLabel>
                          <Input
                            id="sale_price"
                            name="sale_price"
                            type="number"
                            placeholder="0.00"
                            {...register('sale_price', {
                              required: 'Campo obrigatório',
                            })}
                          />

                          <FormErrorMessage>
                            {errors.sale_price && 'Campo obrigatório'}
                          </FormErrorMessage>
                        </FormControl>
                      </Box>

                      <Box width={'48%'}>
                        <FormControl /*isInvalid={errors.cost_price}*/>
                          <FormLabel htmlFor="sale_price">Custo</FormLabel>
                          <InputGroup>
                            <Input
                              placeholder="R$ 1,00"
                              {...register('cost_price', {
                                required: 'Campo obrigatório',
                              })}
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
                                <Text fontWeight={600}>R$ 1,50</Text>
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

                    <Button
                      width={'full'}
                      isLoading={isSubmitting}
                      type="submit"
                      marginTop={'65px'}
                      bottom={'30px'}
                    >
                      Atualizar
                    </Button>
                  </TabPanel>

                  {/* Painel de estoque */}
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
