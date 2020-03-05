export const SET_LOADING = 'SET_LOADING'
export const SET_TOAST = 'SET_TOAST'
export const SET_USER_LOGADO = 'SET_USER_LOGADO'
export default {
  state: {
    loading: {
      show: false,
      message: ''
    },
    toast: {
      show: false,
      color: 'success',
      message: '',
      time: 3000
    },
    user: {
      id: {},
      email: '',
      senha: '',
      name: '',
      ativo: false
    }
  },
  mutations: {
    [SET_USER_LOGADO]: (state, payload) => {
      state.user = payload
    },
    [SET_LOADING]: (state, payload) => {
      state.loading = { ...payload }
    },
    [SET_TOAST]: (state, payload) => {
      state.toast = { ...state.toast, ...payload }
    }
  },
  actions: {
    setLoading({ commit }, payload) {
      commit(SET_LOADING, { show: true, message: payload })
    },
    resetLoading({ commit }) {
      commit(SET_LOADING, { show: false, message: '' })
    },
    setToast({ commit }, payload) {
      commit(SET_TOAST, { show: true, ...payload })
    },
    setUsuarioLogado({ commit }, payload) {
      commit('SET_USER_LOGADO', payload)
    }
  },
  getters: {
    loading(state) {
      return state.loading
    },
    toast(state) {
      return state.toast
    },
    usuarioLogado(state) {
      return state.user
    }
  }
}
