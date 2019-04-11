import axios from 'axios'

const axiosAjax = (url, method, options) => {
  const defaultOptions = {
    method: 'Get',
    baseURl: 'http://localhost:8081/',
    timeout: 5000,
    withCredentials: false,
    headers: {
      'X-require-token': window.$cookies.get('login-token') || '',
    },
  }
  options = Object.assign(
    defaultOptions,
    {
      method: method || 'Get',
      url: url,
    },
    options || {},
  )

  return new Promise((resolve, reject) => {
    axios(options)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
export { axiosAjax }
