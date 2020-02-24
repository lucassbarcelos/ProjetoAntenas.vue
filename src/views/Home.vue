<template>
  <div class="bg ml-9 mt-3 pl-6 ">
    <v-app class="inspire">
      <v-row>
        <v-col>
          <v-row>
            <v-col cols="2">
              <v-navigation-drawer
                class="pt-10"
                width="17%"
                permanent
                color="#303032"
                absolute
                dark
                :mini-variant="barExpand"
              >
                <v-list>
                  <v-list-item class=" center">
                    <v-list-item-avatar class="center" color="#486A98" size="70px">
                      <h1 v-if="!activeUser.email">LB</h1>
                      <v-img v-if="activeUser.email" :src="require(`../images/${avatar}`)"></v-img>
                    </v-list-item-avatar>
                  </v-list-item>

                  <v-list-item link>
                    <v-list-item-content>
                      <v-list-item-title class="title">{{ activeUser.name }}</v-list-item-title>
                      <v-list-item-subtitle>{{ activeUser.email }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-list nav dense>
                  <v-list-item link>
                    <v-list-item-icon>
                      <v-icon>mdi-folder</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Meus Projetos</v-list-item-title>
                  </v-list-item>
                  <v-list-item link>
                    <v-list-item-icon>
                      <v-icon>mdi-account-multiple</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Meu Perfil</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="toggleAdd">
                    <v-list-item-icon>
                      <v-icon>add</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Adicionar Projeto</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="voltar()">
                    <v-list-item-icon>
                      <v-icon>reply</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Voltar</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="toggleExpand()">
                    <v-list-item-icon>
                      <v-icon>{{ iconExpand() }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Minimizar</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-navigation-drawer>
            </v-col>
            <v-col cols="9" class="pt-0">
              <v-card class="mx-auto" color="white">
                <v-row>
                  <v-col cols="3" class="pl-5 mt-12">
                    <v-avatar size="200" width="210" color="#486A98" class="mt-2 ml-2">
                      <img v-if="activeUser.email" :src="require(`../images/${avatar}`)" />
                      <span v-if="!activeUser.email" class="white--text headline">LB</span>
                    </v-avatar>
                    <v-divider class="mt-2"></v-divider>
                    <v-card-subtitle class="center">Painel de medalhas</v-card-subtitle>
                    <v-card-text>
                      <v-badge
                        v-for="item in user.medal"
                        :key="item.name"
                        offset-x="30"
                        offset-y="45"
                        color="none"
                        avatar
                        icon="add"
                        :label="item.name"
                      >
                        <v-avatar class="mx-1" :color="item.color" label text-color="white"
                          ><v-icon centered>emoji_events</v-icon></v-avatar
                        >
                      </v-badge>
                    </v-card-text>
                  </v-col>
                  <v-divider class="mx-4" :inset="inset" vertical></v-divider>
                  <v-col class="pt-5 mt-5">
                    <v-card-title class="left font-xxl">Meu Perfil</v-card-title>
                    <v-divider class="py-2"></v-divider>
                    <v-card-subtitle>Info</v-card-subtitle>
                    <v-row align="center" class="mx-0 px-5">
                      <v-text-field v-model="activeUser.name" label="Nome" class="mr-2"></v-text-field>
                    </v-row>
                    <v-row align="center" class="mx-0 px-5">
                      <v-text-field v-model="activeUser.email" label="Email" class="mr-2"></v-text-field>
                    </v-row>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                  <v-col>
                    <v-card-text class="font-xxl">Projetos</v-card-text>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-dialog v-model="modalNovoProjeto"> </v-dialog>
    </v-app>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { alunoService } from '../services'
// import { isNumber } from '../utils/number'

export default {
  name: 'Home',
  data() {
    return {
      login: true,
      barExpand: false,
      route: 'Aluno',
      modalNovoProjeto: false,
      projectsList: [],
      cadastro: true,
      activeUser: {
        id: {},
        email: '',
        senha: '',
        name: '',
        ativo: false
      },
      color: ['amber darken-1', 'deep-orange darken-4'],
      user: {
        name: 'Lucas Barcelos',
        email: 'lucasbarcelos58@gmail.com',
        medal: [
          {
            name: 'Vue.js',
            color: 'amber darken-1'
          },
          {
            name: 'JavaScript',
            color: 'grey lighten-1'
          },
          {
            name: 'Design',
            color: 'deep-orange darken-4'
          }
        ]
      },
      avatar: 'unnamed.jpg',
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
    User() {
      return this.usuarioLogado
    },
    ...mapGetters(['loading', 'toast', 'usuarioLogado'])
  },
  async mounted() {
    this.activeUser = this.User
    this.avatar = this.activeUser.email + '.png'
  },
  methods: {
    voltar() {
      this.$router.push('/')
    },
    iconExpand() {
      return this.barExpand ? 'keyboard_arrow_right' : 'keyboard_arrow_left'
    },
    toggleExpand() {
      this.barExpand = !this.barExpand
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
    toggleAdd() {
      this.modalNovoProjeto = !this.modalNovoProjeto
    },
    ...mapActions(['setToast', 'setLoading', 'resetLoading'])
  }
}
</script>
<style>
.bg {
  width: 100%;
  height: 100%;
  background-image: url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80);
  position: absolute;
  transform: scale(1.1);
}
</style>
