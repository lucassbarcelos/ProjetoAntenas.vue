import { HTTPClient } from '../utils/request'

export default {
  getMercanteList: async (viagemNavioId, portoOrigemId, portoDestinoId, operacao) => {
    const result = await HTTPClient.get('/Mercante', {
      params: { viagemNavioId, portoOrigemId, portoDestinoId, operacao }
    })
    return result.data
  },
  validar: async payload => {
    const { data } = await HTTPClient.post('/is-auth', payload)
    return data
  },
  gerarToken: async payload => {
    const { data } = await HTTPClient.post('/Auth', payload)
    return data
  },
  entrar: async payload => {
    const { data } = await HTTPClient.post('/loginempresario', payload)
    return data
  },
  novoProjeto: async payload => {
    const { data } = await HTTPClient.post('/cadastroprojeto', payload)
    return data
  },
  getEmpresarioProject: async email => {
    const { data } = await HTTPClient.get('/buscaprojetoporempresario?' + email)
    return data
  }
}
