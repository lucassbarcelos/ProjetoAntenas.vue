<template>
  <div class="back ma-12 pa-12">
    <v-app id="inspire">
      <template>
        <v-navigation-drawer permanent expand-on-hover color="white" absolute>
          <v-list>
            <v-list-item class="mx-2">
              <v-list-item-avatar>
                <v-img :src="require(`./images/${avatar}`)"></v-img>
              </v-list-item-avatar>
            </v-list-item>

            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title class="title">{{ user.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list nav dense>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-folder</v-icon>
              </v-list-item-icon>
              <v-list-item-title @click="goHome()">Meus Projetos</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-account-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Meu Perfil</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>add</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Novo Projeto</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </template>
      <v-card v-if="cadastro" class="mx-auto my-12" width="450px">
        <v-card-title class="center font-xxl">Projeto Antenas</v-card-title>
        <v-divider class="py-2"></v-divider>
        <v-card-subtitle>Cadastro</v-card-subtitle>
        <v-row align="center" class="mx-0 px-5">
          <v-text-field label="Nome" class="mr-2" outlined></v-text-field>
        </v-row>
        <v-row align="center" class="mx-0 px-5">
          <v-text-field label="Email" class="mr-2" outlined></v-text-field>
        </v-row>
        <v-row align="center" class="mx-0 px-5">
          <v-text-field label="Empresa/Cargo" outlined></v-text-field>
        </v-row>
        <v-row align="center" class="mx-0 px-5">
          <v-text-field label="Cpf" outlined></v-text-field>
        </v-row>
        <v-row align="center" class="mx-0 px-5">
          <v-text-field label="Senha" class="mr-2" outlined></v-text-field>
        </v-row>

        <v-card-text>
          <v-chip-group active-class="primary white--text" column>
            <v-chip>Empresario</v-chip>

            <v-chip>Cadi</v-chip>

            <v-chip>Aluno</v-chip>

            <v-chip>Professor</v-chip>
          </v-chip-group>
        </v-card-text>

        <v-card-actions>
          <v-btn class="mb-2" color="primary">Cadastrar</v-btn>
          <v-spacer></v-spacer>
          <v-btn class="mb-2" @click="toggleCadastro" color="primary" outlined>Login</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-if="!cadastro" class="mx-auto my-12" width="450px">
        <v-card-title class="center font-xxl">Projeto Antenas</v-card-title>
        <v-divider class="py-2"></v-divider>
        <v-card-subtitle>Login</v-card-subtitle>

        <v-row align="center" class="mx-0 px-5">
          <v-text-field label="Email" class="mr-2" outlined></v-text-field>
        </v-row>
        <v-row align="center" class="mx-0 px-5">
          <v-text-field label="Senha" class="mr-2" outlined></v-text-field>
        </v-row>

        <v-card-actions>
          <v-btn class="mb-2" color="primary">Entrar</v-btn>
          <v-spacer></v-spacer>
          <v-btn class="mb-2" @click="toggleCadastro" color="primary" outlined>Cadastre-se</v-btn>
        </v-card-actions>
      </v-card>
      <s-loading v-if="loading.show" :show="loading.show" :message="loading.message" />
      <s-toast
        v-model="showToast"
        :color="toast.color"
        :message="toast.message"
        :time="toast.time"
      />
    </v-app>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { alunoService } from './services'
import Home from './views/Home.vue'
export default {
  name: 'App',
  data() {
    return {
      route: 'Aluno',
      modalProjetos: false,
      projectsList: [],
      cadastro: true,
      user: {
        name: 'Lucas Barcelos',
        email: 'lucasbarcelos58@gmail.com'
      },
      avatar: '2019-05-24.jpg',
      headersProjetos: [
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
    teste() {
      return 'http://localhost:8080/./images/2019-05-24.jpg'
    },
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
    goHome() {
      this.$router.push(Home)
      this.avatar = 'unnamed.jpg'
    },
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
    toggleCadastro() {
      this.cadastro = !this.cadastro
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
.back {
  background-image: url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80);
  background-size: cover;
}
#inspire {
  background: none;
}
</style>
