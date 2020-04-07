<template>
  <div class="back ma-12 pa-12">
    <v-app id="inspire">
      <v-card v-if="cadastro && login" class="mx-auto my-12" width="450px">
        <!-- <v-card-title class="center font-xxl">Projeto Antenas</v-card-title> -->
        <v-img class="center" :src="require('./images/1.png')" />

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
            <v-select
              v-if="chipvalue == '2'"
              v-model="usuario.nivel"
              :items="cargos"
              item-text="desc"
              item-value="id"
              label="Cargo"
              outlined
            ></v-select>
          </v-row>
          <v-row align="center" class="mx-0 px-5">
            <v-text-field
              v-if="chipvalue == '1'"
              v-model="usuario.cpf"
              v-mask="'###.###.###-##'"
              label="Cpf"
              outlined
            ></v-text-field>
          </v-row>
          <v-row align="center" class="mx-0 px-5">
            <v-text-field
              v-model="usuario.senha"
              :rules="rules.name"
              label="Senha"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              class="mr-2"
              outlined
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-row>

          <v-card-text>
            <v-chip-group v-model="chipvalue" :rules="rules.chips" active-class="primary white--text" column>
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
        <v-form ref="formLogin" lazy-validation>
          <!-- <v-card-title class="center font-xxl">Projeto Antenas</v-card-title> -->
          <v-img class="center" :src="require('./images/1.png')" />
          <v-divider class="py-2"></v-divider>
          <v-card-subtitle>Login</v-card-subtitle>

          <v-row align="center" class="mx-0 px-5">
            <v-text-field
              v-model="usuario.email"
              :rules="rules.email"
              label="Email"
              type="text"
              class="mr-2"
              outlined
            ></v-text-field>
          </v-row>
          <v-row align="center" class="mx-0 px-5">
            <v-select
              v-model="tipoUsuario"
              label="Tipo de Usuario"
              :items="tiposUsuario"
              item-text="tipo"
              item-value="id"
              :rules="rules.cargo"
              class="mr-2"
              outlined
            ></v-select>
          </v-row>
          <v-row align="center" class="mx-0 px-5">
            <v-text-field
              v-model="usuario.senha"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'password'"
              label="Senha"
              class="mr-2"
              :rules="rules.senha"
              outlined
              @click:append="show2 = !show2"
            ></v-text-field>
          </v-row>

          <v-card-actions>
            <v-btn class="mb-2" color="primary" @keyup.enter="entrar()" @click="entrar()">Entrar</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="mb-2" color="primary" outlined @click="toggleCadastro">Cadastre-se</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
      <router-view></router-view>
      <s-loading v-if="loading.show" :show="loading.show" :message="loading.message" />
      <s-toast v-model="showToast" :color="toast.color" :message="toast.message" :time="toast.time" />
    </v-app>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { alunoService, empresarioService, cadiService, professorService } from './services'
import Aluno from './views/Aluno.vue'
import Empresario from './views/Empresario.vue'
import Professor from './views/Professor.vue'
import Cadi from './views/Cadi.vue'
// import Empresario from './views/Empresario.vue'
export default {
  name: 'App',
  data() {
    return {
      login: true,
      route: 'Aluno',
      show2: false,
      show1: false,
      tipoUsuario: 0,
      projectsList: [],
      usuario: {
        name: '',
        email: '',
        senha: '',
        empresa: '',
        nivel: 0,
        cpf: ''
      },
      tiposUsuario: [
        { id: 1, tipo: 'Empresario' },
        { id: 2, tipo: 'Cadi' },
        { id: 3, tipo: 'Aluno' },
        { id: 4, tipo: 'Professor' }
      ],
      cargos: [
        { id: 1, desc: 'Professor' },
        { id: 2, desc: 'Coordenador' },
        { id: 3, desc: 'Diretor' }
      ],
      rules: {
        name: [v => !!v || 'Nome é obrigatório'],
        senha: [v => !!v || 'Senha é obrigatória'],
        chips: [v => !!v || 'seleção é obrigatória'],
        cargo: [v => !!v || 'seleção é obrigatória']
      },
      chipvalue: '1',
      cadastro: true,
      user: {
        name: 'Lucas Barcelos',
        email: 'lucasbarcelos58@gmail.com'
      },
      activeUser: {
        id: {},
        email: '',
        senha: '',
        name: '',
        ativo: false
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
    cpf(value) {
      return value.mask('999.999.99-99')
    },
    ...mapGetters(['loading', 'toast'])
  },
  methods: {
    goAluno() {
      this.$router.push(Aluno)
    },
    goEmpresario() {
      this.$router.push(Empresario)
    },
    goProfessor() {
      this.$router.push(Professor)
    },
    goCadi() {
      this.$router.push(Cadi)
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
    async cadastroEmpresario() {
      this.setLoading('Gravando')
      try {
        await empresarioService.cadastrar({
          name: this.usuario.name,
          email: this.usuario.email,
          senha: this.usuario.senha,
          empreas: this.usuario.empresa,
          cpf: this.usuario.cpf,
          ativo: false
        })
        this.setToast({
          color: 'succes',
          message: 'Usuario cadastrado, verifique seu email.'
        })
      } catch (error) {
        this.setToast({
          color: 'error',
          message: error.response.data.Message
        })
      } finally {
        this.resetLoading()
        this.toggleCadastro()
      }
    },
    async cadastroCadi() {
      this.setLoading('Gravando')
      try {
        await cadiService.cadastrar({
          name: this.usuario.name,
          email: this.usuario.email,
          senha: this.usuario.senha,
          nivel: this.usuario.nivel,
          ativo: false
        })
        this.setToast({
          color: 'succes',
          message: 'Usuario cadastrado, verifique seu email.'
        })
      } catch (error) {
        this.setToast({
          color: 'error',
          message: error.response.data.Message
        })
      } finally {
        this.resetLoading()
        this.toggleCadastro()
      }
    },
    async cadastroAluno() {
      this.setLoading('Gravando')
      try {
        let data = await alunoService.cadastrar({
          name: this.usuario.name,
          email: this.usuario.email,
          senha: this.usuario.senha,
          ativo: false
        })
        this.setToast({
          color: 'succes',
          message: data.Messsage
        })
      } catch (error) {
        this.setToast({
          color: 'error',
          message: error.response.data.Message
        })
      } finally {
        this.resetLoading()
        this.toggleCadastro()
      }
    },
    async cadastroProfessor() {
      this.setLoading('Gravando')
      console.log(' entrou')
      try {
        await professorService.cadastrar({
          name: this.usuario.name,
          email: this.usuario.email,
          senha: this.usuario.senha,
          ativo: false
        })
        this.setToast({
          color: 'succes',
          message: 'Uma confirmação foi enviada para o seu email'
        })
      } catch (error) {
        this.setToast({
          color: 'error',
          message: error.response.data.Message
        })
      } finally {
        this.resetLoading()
        this.toggleCadastro()
      }
    },
    async entrar() {
      if (this.$refs.formLogin.validate()) {
        switch (this.tipoUsuario) {
          case 1:
            this.loginEmpresario()
            break
          case 2:
            this.loginCadi()
            break
          case 3:
            this.loginAluno()
            break
          case 4:
            this.loginProfessor()
            break
        }
      }
    },
    async loginAluno() {
      this.setLoading('Entrando')
      try {
        const token = await alunoService.entrar({ email: this.usuario.email, senha: this.usuario.senha })
        localStorage.setItem('token', token)
        this.activeUser = await alunoService.validar({ token: token, email: this.usuario.email })
        this.setUsuarioLogado(this.activeUser)
        this.goAluno()
      } catch (error) {
        this.setToast({
          color: 'error',
          message: error.response.data.Message
        })
      } finally {
        this.resetLoading()
      }
    },
    async loginEmpresario() {
      this.setLoading('Entrando')
      try {
        this.activeUser = await empresarioService.entrar({ email: this.usuario.email, senha: this.usuario.senha })
        const token = await empresarioService.gerarToken(this.activeUser)
        localStorage.setItem('token', token)
        this.setUsuarioLogado(this.activeUser)
        this.goEmpresario()
      } catch (error) {
        this.setToast({
          color: 'error',
          message: error.response.data.Message
        })
      } finally {
        this.resetLoading()
      }
    },
    async loginCadi() {
      this.setLoading('Entrando')
      try {
        this.activeUser = await cadiService.loginCadi({ email: this.usuario.email, senha: this.usuario.senha })
        const token = await cadiService.gerarToken(this.activeUser)
        localStorage.setItem('token', token)
        this.setUsuarioLogado(this.activeUser)
        this.goCadi()
      } catch (error) {
        this.setToast({
          color: 'error',
          message: error
        })
      } finally {
        this.resetLoading()
      }
    },
    async loginProfessor() {
      this.setLoading('Entrando')
      try {
        const token = await professorService.gerarToken({ email: this.usuario.email, senha: this.usuario.senha })
        localStorage.setItem('token', token)
        this.activeUser = await professorService.entrar({ senha: this.usuario.senha, email: this.usuario.email })
        this.setUsuarioLogado(this.activeUser)
        this.goProfessor()
      } catch (error) {
        this.setToast({
          color: 'error',
          message: error.response.data
        })
      } finally {
        this.resetLoading()
      }
    },
    toggleModalProjects() {
      this.modalProjetos = !this.modalProjetos
    },
    ...mapActions(['setToast', 'setLoading', 'resetLoading', 'setUsuarioLogado'])
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
