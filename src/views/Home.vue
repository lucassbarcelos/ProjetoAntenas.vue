<template>
  <div class="bg">
    <v-app class="inspire">
      <span></span>
    </v-app>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import { comboService, alunoService } from '../services'
// import { isNumber } from '../utils/number'

export default {
  name: 'Home',
  data() {
    return {
      teste: false
    }
  },
  computed: {},
  async mounted() {},
  methods: {
    ...mapActions(['setToast', 'setLoading', 'resetLoading'])
  }
}
</script>
<style>
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url('https://cdn.pixabay.com/photo/2016/03/26/13/09/organic-1280537_1280.jpg') no-repeat center center;
  background-size: cover;
  background-color: red;
  transform: scale(1.1);
}

#inspire {
  background: none;
}
</style>
