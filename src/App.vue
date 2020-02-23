<template>
  <div class="back ma-12 pa-12">
    <v-app id="inspire">
      <v-card v-if="cadastro && login" class="mx-auto my-12" width="450px">
        <v-card-title class="center font-xxl">Projeto Antenas</v-card-title>
        <v-divider class="py-2"></v-divider>
        <v-card-subtitle>Cadastro</v-card-subtitle>
        <v-form ref="formCadastro" lazy-validation>
          <v-row align="center" class="mx-0 px-5">
            <v-text-field v-model="usuario.name" :rules="rules.name" label="Nome" class="mr-2" outlined></v-text-field>
          </v-row>
          <v-row align="center" class="mx-0 px-5">
            <v-text-field
              v-model="usuario.email"
              :rules="rules.email"
              label="Email"
              class="mr-2"
              outlined
            ></v-text-field>
          </v-row>
          <v-row align="center" class="mx-0 px-5">
            <v-text-field
              v-if="chipvalue == '1'"
              v-model="usuario.empresa"
              label="Empresa/Cargo"
              outlined
            ></v-text-field>
          </v-row>
          <v-row align="center" class="mx-0 px-5">
            <v-text-field v-if="chipvalue == '1'" v-model="usuario.cpf" label="Cpf" outlined></v-text-field>
          </v-row>
          <v-row align="center" class="mx-0 px-5">
            <v-text-field
              v-model="usuario.senha"
              :rules="rules.name"
              type="password"
              label="Senha"
              class="mr-2"
              outlined
            ></v-text-field>
          </v-row>

          <v-card-text>
            <v-chip-group v-model="chipvalue" active-class="primary white--text" column>
              <v-chip value="1">Empresario</v-chip>

              <v-chip value="2">Cadi</v-chip>

              <v-chip value="3">Aluno</v-chip>

              <v-chip value="4">Professor</v-chip>
            </v-chip-group>
          </v-card-text>

          <v-card-actions>
            <v-btn class="mb-2" color="primary" @click="cadastrar">Cadastrar</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" outlined class="mb-2" @click="toggleCadastro">Login</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
      <v-card v-if="!cadastro && login" class="mx-auto my-12" width="450px">
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
          <v-btn class="mb-2" color="primary" @click="goHome()">Entrar</v-btn>
          <v-spacer></v-spacer>
          <v-btn class="mb-2" color="primary" outlined @click="toggleCadastro">Cadastre-se</v-btn>
        </v-card-actions>
      </v-card>
      <router-view></router-view>
      <s-loading v-if="loading.show" :show="loading.show" :message="loading.message" />
      <s-toast v-model="showToast" :color="toast.color" :message="toast.message" :time="toast.time" />
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
      login: true,
      route: 'Aluno',
      modalProjetos: false,
      projectsList: [],
      usuario: {
        name: '',
        email: '',
        senha: '',
        empresa: '',
        cpf: ''
      },
      rules: {
        name: [v => !!v || 'Nome é obrigatório'],
        email: [v => !!v || 'Email é obrigatório'],
        senha: [v => !!v || 'Senha é obrigatória']
      },
      chipvalue: '1',
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
    ViewComponent() {
      return this.routes[this.currentRoute] || 'NotFound'
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
    cadastrar() {
      if (this.$refs.formCadastro.validate()) {
        switch (this.chipvalue) {
          case '1':
            this.cadastroEmpresario()
            break
          case '2':
            this.cadastroCadi()
            break
          case '3':
            this.cadastroAluno()
            break
          case '4':
            this.cadastroProfessor()
            break
        }
      }
    },
    cadastroEmpresario() {},
    cadastroCadi() {},
    cadastroAluno() {
      alert('vai filhão')
    },
    cadastroProfessor() {},
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
