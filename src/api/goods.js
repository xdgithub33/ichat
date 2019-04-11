import { axiosAjax } from './common'

export default {
  getGoodsList(params) {
    return axiosAjax('/goods/list', 'Get', {
      params: params,
    })
  },
}
