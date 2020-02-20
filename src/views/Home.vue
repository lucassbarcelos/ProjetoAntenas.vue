<template>
  <div>
    <v-row>
      <h1 class="font-xxl font-weight-medium title-primary--text">Aluno</h1>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { comboService, alunoService } from '../services'
import { isNumber } from '../utils/number'

export default {
  name: 'Home',
  data() {
    return {}
  },
  computed: {},
  async mounted() {
    try {
    } catch (error) {
    } finally {
    }
  },
  methods: {
    ...mapActions(['setToast', 'setLoading', 'resetLoading'])
  }
}
</script>
