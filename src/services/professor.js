import { HTTPClient } from '../utils/request'

export default {
  getMercanteList: async (viagemNavioId, portoOrigemId, portoDestinoId, operacao) => {
    const result = await HTTPClient.get('/Mercante', {
      params: { viagemNavioId, portoOrigemId, portoDestinoId, operacao }
    })
    return result.data
  },
  cadastrar: async payload => {
    const { data } = await HTTPClient.post('/aluno-cadastro', payload)
    return data
  },
  entrar: async payload => {
    const { data } = await HTTPClient.post('/aluno', payload)
    return data
  }
}
