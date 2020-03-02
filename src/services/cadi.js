import { HTTPClient } from '../utils/request'

export default {
  cadastrar: async payload => {
    const { data } = await HTTPClient.post('/cadicadastro', payload)
    return data
  },
  validar: async payload => {
    const { data } = await HTTPClient.post('/is-auth', payload)
    return data
  },
  gerarToken: async payload => {
    const { data } = await HTTPClient.post('/TokenCadi', payload)
    return data
  },
  loginCadi: async payload => {
    const { data } = await HTTPClient.post('/cadi', payload)
    return data
  },
  getCadiProject: async email => {
    const { data } = await HTTPClient.get('/CadiProjetos?' + email)
    return data
  },
  getSemDono: async () => {
    const { data } = await HTTPClient.get('/semdono')
    return data
  },
  setAtribuirProjeto: async payload => {
    const { data } = await HTTPClient.post('/updateCadi', payload)
    return data
  }
}
