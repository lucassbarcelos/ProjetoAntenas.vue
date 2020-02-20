import { HTTPClient } from '../utils/request'

export default {
  getMercanteList: async (viagemNavioId, portoOrigemId, portoDestinoId, operacao) => {
    const result = await HTTPClient.get('/Mercante', {
      params: { viagemNavioId, portoOrigemId, portoDestinoId, operacao }
    })
    return result.data
  },
  saveTabelaTarifaOvaDesovaDepot: async payload => {
    const { data } = await HTTPClient.post('/TabelaTarifaOvaDesovaDepot', payload)
    return data
  },
  getBookingDetails: async bookingId => {
    const result = await HTTPClient.get('/Booking', { params: { bookingId } })
    return result.data
  },
  getCteDetails: async doctoTransporteId => {
    const result = await HTTPClient.get('/DoctoTransporte', { params: { doctoTransporteId } })
    return result.data
  },
  getContainarList: async doctoTransporteId => {
    const result = await HTTPClient.get('/Container', { params: { doctoTransporteId } })
    return result.data
  },
  setEdit: async (ediMercanteId, manifestoMercante, ceMercante, doctoTransporteId, operacao) => {
    const result = await HTTPClient.put('/Mercante', {
      ediMercanteId,
      manifestoMercante,
      ceMercante,
      doctoTransporteId,
      operacao
    })
    return result.data
  },
  getProjects: async () => {
    const result = await HTTPClient.get('/projetos')
    return result.data
  }
}
