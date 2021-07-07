import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
  timeout: 10000
})
// 封装的post请求
export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      // instance实例继承baseURL 和timeout ,所以这里不用再写了
      // baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}
// 封装的get请求
export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }
      // instance实例继承baseURL 和timeout ,所以这里不用再写了
    //   , {
    //   baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd'

    // }
    ).then((response) => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}
