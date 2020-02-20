import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    themes: {
      light: {
        primary: '#3499db',
        'title-primary': '#005799',
        'subtitle-primary': '#475257'
      }
    }
  }
})
