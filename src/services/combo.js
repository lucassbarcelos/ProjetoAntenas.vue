import { HTTPClient } from '../utils/request'

export default {
  getAllParticularidades: async () => {
    const result = await HTTPClient.get('/Particularidade')
    return result.data
  },
  getAllPortos: async () => {
    const { data } = await HTTPClient.get('/Porto')
    return data
  },
  getAllViagemNavio: async () => {
    const { data } = await HTTPClient.get('/ViagemNavio')
    return data
  }
}
