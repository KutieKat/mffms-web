import moment from 'moment'
import axios from 'axios'
import { ALPHABETS } from '../constants'

axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN'

export const isEmptyObj = obj => {
   for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
         return false
      }
   }
   return true
}

export const formatDateString = (dateString, timeIncluded = false) => {
   if (timeIncluded) {
      return moment(dateString).format('hh:mm, DD/MM/YYYY')
   }
   return moment(dateString).format('DD/MM/YYYY')
}

export const getValue = (value, defaultValue = '(Chưa có dữ liệu)') => {
   if (value !== '') {
      return value
   } else {
      return defaultValue
   }
}

export const excelFormat = {
   normalFont: { name: 'Times New Romans', size: 14 },
   boldFont: { name: 'Times New Romans', size: 14, bold: true },
   italicFont: { name: 'Times New Romans', size: 14, italic: true },
   border: {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
   },
   center: { vertical: 'middle', horizontal: 'center' },
   left: { vertical: 'middle', horizontal: 'left' },
   right: { vertical: 'middle', horizontal: 'right' }
}

export const isValidEmail = email => {
   let pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
   )
   return pattern.test(email)
}

export const isPhoneNumber = phone => {
   phone = phone.replace('(+84)', '0')
   phone = phone.replace('+84', '0')
   phone = phone.replace('0084', '0')
   phone = phone.replace(/ /g, '')

   if (phone !== '' && phone.match(/^\d/)) {
      return true
   }

   return false
}

// export const isAfter = (date, dateToCheck) => dateToCheck.diff(date) >= 0

export const isAfter = (date, dateToCheck) => true

export const apiGet = (url, data) => axios.get(url, { params: data })

export const apiPost = (url, data) => axios.post(url, data)

export const apiPut = (url, data) => axios.put(url, data)

export const apiDelete = url => axios.delete(url)

export const scrollTop = () => {
   window.scrollTo(0, 0)
}

export const print = () => {
   window.print()
}

export const numberWithCommas = x => {
   var parts = x.toString().split('.')
   parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
   return parts.join('.')
}

const chunkArray = (array, size) => {
   let chunked_arr = []

   for (let i = 0; i < array.length; i++) {
      const last = chunked_arr[chunked_arr.length - 1]
      if (!last || last.length === size) {
         chunked_arr.push([array[i]])
      } else {
         last.push(array[i])
      }
   }

   return chunked_arr
}

export const getColumnsOrdinates = (start, end, n, row) => {
   const startIndex = ALPHABETS.findIndex(
      letter => letter === start.toUpperCase()
   )
   const endIndex = ALPHABETS.findIndex(letter => letter === end.toUpperCase())
   const columns = ALPHABETS.slice(startIndex, endIndex + 1)
   const chunkSize = Math.ceil((endIndex - startIndex) / n)
   const chunks = chunkArray(columns, chunkSize)
   const columnsOrdinates = chunks.map(chunk => {
      const startOrdinate = `${chunk[0]}${row}`
      const endOrdinate = `${chunk[chunk.length - 1]}${row}`
      const ordinate = `${startOrdinate}:${endOrdinate}`

      return ordinate
   })

   return columnsOrdinates
}

export const deepGet = (variable, keys, defaultVal) => {
   defaultVal = defaultVal || ''
   let resultVal = defaultVal

   try {
      if (Array.isArray(keys)) {
         let tempResult = variable
         for (let i in keys) {
            tempResult = tempResult[keys[i]]
         }
         resultVal = tempResult
      } else {
         keys = keys.split('.')
         let tempResult = variable
         for (let i in keys) {
            tempResult = tempResult[keys[i]]
         }
         resultVal = tempResult
      }
   } catch (e) {
      resultVal = defaultVal
   }

   if (resultVal === undefined) {
      resultVal = defaultVal
   }

   return resultVal
}

export const hmsToSecondsOnly = str => {
   let p = str.split(':'),
      s = 0,
      m = 1

   while (p.length > 0) {
      s += m * parseInt(p.pop(), 10)
      m *= 60
   }

   return s
}
