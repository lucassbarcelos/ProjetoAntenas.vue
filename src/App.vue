<template>
  <v-app :style="bcg">
    <v-card height="8%">
      <v-app-bar absolute color="#6A76AB" dark src="https://picsum.photos/1920/1080?random">
        <template v-slot:img="{ props }">
          <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"></v-img>
        </template>

        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Projeto Antenas</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="buscarProjetos()">
          <v-icon>assignment</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>
    </v-card>

    <v-dialog v-model="modalProjetos" width="900px">
      <v-card>
        <v-card-title>
          <h1 class="font-xl font-weight-regular title-primary--text">Projetos</h1>
        </v-card-title>

        <v-divider class="mb-4"></v-divider>
        <v-data-table :headers="headersCritica" :items="projectsList" class="elevation-1" pagination.sync="pagination">
        </v-data-table>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" outlined @click="toggleModalProjects">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-content class="my-6 mx-7">
      <router-view></router-view>
    </v-content>

    <s-loading v-if="loading.show" :show="loading.show" :message="loading.message" />
    <s-toast v-model="showToast" :color="toast.color" :message="toast.message" :time="toast.time" />
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { alunoService } from './services'

export default {
  name: 'App',
  data() {
    return {
      bcg: { backgroundColor: localStorage.getItem('corFundo') },
      route: 'Aluno',
      modalProjetos: false,
      projectsList: [],
      headersCritica: [
        {
          text: 'Projeto',
          value: 'titulo',
          align: 'center'
        },
        {
          text: 'Nome do Arquivo',
          value: 'descricao-breve',
          align: 'center'
        },
        {
          text: 'Tecnologias',
          value: 'descricao-tecnologias',
          align: 'center'
        },
        {
          text: 'Empresario',
          value: 'responsavel-empresario',
          align: 'center'
        }
      ]
    }
  },
  computed: {
    showToast: {
      get: function() {
        return this.toast.show
      },
      set: function(value) {
        this.setToast({ show: value, message: '', color: 'success', time: 3000 })
      }
    },
    ...mapGetters(['loading', 'toast'])
  },
  methods: {
    async buscarProjetos() {
      this.setLoading('Buscando')
      try {
        this.projectsList = await alunoService.getProjects()
      } catch (error) {
        this.setToast({
          color: 'error',
          message: error.response.data.Message
        })
      } finally {
        this.resetLoading()
        this.toggleModalProjects()
      }
    },
    toggleModalProjects() {
      this.modalProjetos = !this.modalProjetos
    },
    ...mapActions(['setToast', 'setLoading', 'resetLoading'])
  }
}
</script>

<style>
.font-xs {
  font-size: 12px !important;
}

.font-sm {
  font-size: 14px !important;
}

.font-md {
  font-size: 16px !important;
}

.font-lg {
  font-size: 18px !important;
}

.font-xl {
  font-size: 20px !important;
}

.font-xxl {
  font-size: 28px !important;
}

.font-xxxl {
  font-size: 38px !important;
}

.font-xxxl {
  font-size: 46px !important;
}

.v-btn {
  text-transform: none !important;
}

.v-tab {
  text-transform: none !important;
}

.v-stepper {
  width: 100%;
}

.step-height {
  height: 554px;
}

.btn-cadastro {
  height: 297px;
}

.btn-cadastro-excluido {
  height: 332px;
}

.center {
  display: flex;
  justify-content: center;
}

.v-form {
  width: 100%;
}
</style>
