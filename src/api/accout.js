import { axiosAjax } from './common'

export default {
  login(data) {
    return axiosAjax('/users/login', 'Post', {
      data: data,
    })
  },
}
