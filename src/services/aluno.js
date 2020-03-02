import { HTTPClient } from '../utils/request'

export default {
  cadastrar: async payload => {
    const { data } = await HTTPClient.post('/aluno-cadastro', payload)
    return data
  },
  entrar: async payload => {
    const { data } = await HTTPClient.post('/aluno', payload)
    return data
  },
  validar: async payload => {
    const { data } = await HTTPClient.post('/validaAluno', payload)
    return data
  },
  getProjects: async () => {
    const result = await HTTPClient.get('/projetos')
    return result.data
  },
  getAlunoProject: async email => {
    const result = await HTTPClient.get('/alunoProjeto?' + email)
    return result.data
  }
}
