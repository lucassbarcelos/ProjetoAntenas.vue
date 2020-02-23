<template>
  <div class="bg ml-9 mt-5 pl-6 pt-6">
    <v-app class="inspire">
      <template>
        <v-navigation-drawer permanent expand-on-hover color="white" absolute>
          <v-list>
            <v-list-item class="mx-2">
              <v-list-item-avatar size="50px">
                <v-img :src="require(`../images/${avatar}`)"></v-img>
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
              <v-list-item-title>Adicionar Projeto</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </template>
      <v-card class="mx-auto" width="87%" height="90%" color="rgb(53, 54, 58)" dark>
        <v-card-title class="center font-xxl">
          <v-avatar size="200" width="210" class="mt-2"> <img :src="require(`../images/${avatar}`)" /> </v-avatar
        ></v-card-title>
        <v-card-title class="center font-xxl">Meu Perfil</v-card-title>
        <v-divider class="py-2"></v-divider>
        <v-card-subtitle>Info</v-card-subtitle>
        <v-row align="center" class="mx-0 px-5">
          <v-text-field v-model="user.name" label="Nome" class="mr-2" outlined></v-text-field>
        </v-row>
        <v-row align="center" class="mx-0 px-5">
          <v-text-field v-model="user.email" label="Email" class="mr-2" outlined></v-text-field>
        </v-row>
        <v-card-subtitle>Medalhas Conquistadas</v-card-subtitle>
        <v-card-text>
          <v-chip-group active-class="primary white--text" column>
            <v-chip
              v-for="item in user.medal"
              :key="item.name"
              class="ma-2"
              :color="item.color"
              label
              text-color="white"
            >
              <v-icon left>mdi-label</v-icon>
              {{ item.name }}
            </v-chip>
          </v-chip-group>
        </v-card-text>
      </v-card>
    </v-app>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { alunoService } from '../services'
// import { isNumber } from '../utils/number'

export default {
  name: 'Home',
  data() {
    return {
      login: true,
      route: 'Aluno',
      modalProjetos: false,
      projectsList: [],
      cadastro: true,
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
            color: 'amber darken-1'
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
  computed: {},
  async mounted() {},
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
    toggleCadastro() {
      this.cadastro = !this.cadastro
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
