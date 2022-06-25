//import React, { useState, useEffect } from "react";

/**
 * Retorno o indice de valores ou caso nao exista cria um object vazio
 * @param parent Identifica o indice do abject a ser retornado
 * @returns Object
 */
export const getStorage = (parent='') => {

  let storage = JSON.parse(localStorage.getItem("first_access"))

  if(!storage) {
    storage = {}

    if( parent != '' ) {
      if(['address','payment_options'].includes(parent)) {
        storage[parent] = {}
      } else {
        storage[parent] = [{}]
      }
    }

    localStorage.setItem("first_access", JSON.stringify(storage))
  }

  return storage
}

/**
 * Seta os valores no localstorage conforme o parent e data. O parent é o local onde sera inserido
 * Usado pelo object global do localstorate first_access e pelo attr address
 * @param data Object com os valores s serem setados
 * @param parent 
 */
export const setStorageFirstAccess = (data, parent='') => {
  
  if(typeof window !== "undefined") {

    let storage = getStorage(parent)
    if(parent === '') {
      let addr = {...storage}
      for(let field  in data) {
        addr[field] = data[field]
      }

      storage = {...storage, ...addr}
    } else {
      let addr = {...storage[parent]}
      for(let field  in data) {
        addr[field] = data[field]
      }

      storage = {...storage, [parent]: addr}
    }

    localStorage.setItem("first_access", JSON.stringify(storage))
  }

}

/**
 * Retorna um valor especifico do local storage
 * @param key Indice a ser retornado
 * @param parent indice o object que contem a key
 * @returns 
 */
 export const getStorageFirstAccess = (key='', parent='') => {

  let storageValue = ''

  if(typeof window !== "undefined") {

    let storage = getStorage(parent)
    if(parent === '') {
      storageValue = storage[key]
    } else {
      if(['address','payment_options'].includes(parent)) {
        if(typeof storage[parent] === 'object') {
          storageValue = storage[parent][key]
        }
      } else if(Array.isArray(storage[parent])) {
        if(typeof storage[parent] === 'object') {
          storageValue = storage[parent][0][key]
        }
      }
    }
  }

  return storageValue
}

// ================================================================================

const getArrayStorage = (parent='') => {

  let storage = JSON.parse(localStorage.getItem("first_access"))

  if(!storage) {
    storage = {}
  }

  if( parent != '' ) {
    if(['address', 'payment_options'].includes(parent)) {
    //if(parent === 'address') {
      storage[parent] = {}
    } else {
      if(!Object.keys(storage[parent] || {}).length) {
        storage[parent] = []
      }
    }
  }

  localStorage.setItem("first_access", JSON.stringify(storage))

  return storage
}

/**
 * Seta o array diretamente ao atributo
 * @param list 
 * @param parent 
 */
export const setStorageArray = (list, parent='') => {
  
  if(typeof window !== "undefined") {

    const storage = {...getArrayStorage(parent), [parent]: list}

    localStorage.setItem("first_access", JSON.stringify(storage))
  }

}

/**
 * Usado para adicionar o item na listagem, adiciona sempre no ultimo indice
 * @param list 
 * @param parent 
 */
export const setStorageArrayPush = (data, parent='') => {

  if(typeof window !== "undefined" && parent != '') {
    
    let current = getArrayStorage(parent)[parent]

    if( current.length === 0 ) {
      //if(Object.keys(current[0]).length === 0) {
      if(!!current[0] && Object.keys(current[0]).length === 0) {
        current[0] = data
      } else {
        current.push(data)
      }
    } else if(current.length > 0) {
      current.push(data)
    }

    const store = getArrayStorage()
    const addStore = {...store, [parent]: current}

    localStorage.setItem("first_access", JSON.stringify(addStore))
    //localStorage.setItem("first_access", JSON.stringify({[parent]: storage}))
  }

}

export const removeStorageFirstAccess = () => {

  if(typeof window !== "undefined") {
    localStorage.removeItem("first_access")
  }

}

/**
 * Retorna umm lista de dados de um respectivo indice
 * @param parent indice do storage a ser retornado
 * @returns Array
 */
export const getStorageArray = (parent='', idx=-1) => {

  if(typeof window !== "undefined" && parent != '') {

    const storage = {...getArrayStorage(parent)}

    if(idx >= 0) {
      return {...storage[parent][idx]}
    } else {
      return storage[parent]
    }
  }

}

/**
 * Atualiza o objeto no indice indicado
 * @param data 
 * @param parent 
 */
export const setStorageArrayByIndex = (data, parent) => {
  
  if(typeof window !== "undefined" && parent != '') {
    let storage = getArrayStorage(parent)[parent]
    const current = storage.find( curr => curr.id === data.id)
    const indexStorage = storage.findIndex( curr => curr.id === data.id)
    const newCrrent = {...current, ...data}
    if(indexStorage > -1) {
      storage[indexStorage] = newCrrent
      setStorageArray(storage, parent)
    }
  }
}

/**
 * Gera o proximo id para o indice informado. Usado para fazer novos inserts e gerar o id
 * @returns Number
 */
export const generateId = (parent: any) => {

  const storage = getStorageArray(parent)
  let id = 1
  if( storage.length === 1 ) {
    if(Object.keys(storage[0]).length > 1) {
      id = 2
    }
  } else {
    id = storage.length + 1
  }

  return id
}