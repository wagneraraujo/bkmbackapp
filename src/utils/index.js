import { ToasterType } from '../types/ToasterType'

const formatFieldFilter = (field) => {
  return field.toLowerCase().normalize('NFD')
    .replace(/\s/g, '') // remove espaços
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
}

const toastMessageSave = (error, position) => {

  const msgError = 'Desculpe, mas algo de errado aconteceu, tente novamente mais tarde!'
  const msgSuccess = 'Registro salvo com sucesso!'

  const toast = {
    title: error ? msgError : msgSuccess,
    status: error ? ToasterType.error : ToasterType.success,
    duration: error ? 4000 : 3000,
    position: position,
  }

  return toast
}

const toastMessageDel = (error, position) => {

  const msgError = 'Desculpe, mas algo de errado aconteceu, tente novamente mais tarde!'
  const msgSuccess = 'Registro excluido com sucesso!'

  const toast = {
    title: error ? msgError : msgSuccess,
    status: error ? ToasterType.error : ToasterType.success,
    duration: error ? 4000 : 3000,
    position: position,
  }

  return toast
}

const toastMessageLogin = (error, position) => {

  const msgError = 'Algo de errado aconteceu ao efetuar o login, tente novamente mais tarde!'
  const msgSuccess = 'Login efetuado com sucesso!'

  const toast = {
    title: error ? msgError : msgSuccess,
    status: error ? ToasterType.error : ToasterType.success,
    duration: error ? 4000 : 3000,
    position: position,
  }

  return toast
}

export {
  formatFieldFilter,
  toastMessageSave,
  toastMessageDel,
  toastMessageLogin
}