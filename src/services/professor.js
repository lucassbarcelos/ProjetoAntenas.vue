import { HTTPClient } from '../utils/request'

export default {
  getMercanteList: async (viagemNavioId, portoOrigemId, portoDestinoId, operacao) => {
    const result = await HTTPClient.get('/Mercante', {
      params: { viagemNavioId, portoOrigemId, portoDestinoId, operacao }
    })
    return result.data
  },
  entrar: async payload => {
    const { data } = await HTTPClient.post('/professor', payload)
    return data
  },
  gerarToken: async payload => {
    const { data } = await HTTPClient.post('/GerarToken', payload)
    return data
  },
  cadastrar: async payload => {
    const { data } = await HTTPClient.post('/ProfessorCadastro', payload)
    return data
  },
  updateProjetc: async payload => {
    const { data } = await HTTPClient.post('/pulafase', payload)
    return data
  }
}
