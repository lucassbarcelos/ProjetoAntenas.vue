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
                color="blue-grey darken-3"
                absolute
                dark
                :mini-variant="barExpand"
              >
                <v-list>
                  <v-list-item class=" center">
                    <v-list-item-avatar class="center" color="red darken-1" size="70px">
                      <h1 v-if="activeUser.email">{{ avatarName }}</h1>
                      <v-img v-if="!activeUser.email" :src="require(`../images/${avatar}`)"></v-img>
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
                  <v-list-item link @click="toggleAdd">
                    <v-list-item-icon>
                      <v-icon>add</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Novo Projeto</v-list-item-title>
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
                    <v-avatar size="200" width="210" color="red darken-1" class="mt-2 ml-2">
                      <img v-if="!activeUser.email" :src="require(`../images/${avatar}`)" />
                      <span v-if="activeUser.email" class="white--text headline">{{ avatarName }}</span>
                    </v-avatar>
                    <v-divider class="mt-2"></v-divider>
                  </v-col>
                  <v-divider class="mx-4" vertical></v-divider>
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
                    <v-tabs v-model="tab" fixed-tabs class="elevation-2">
                      <v-tab>
                        Meus projetos
                      </v-tab>
                      <v-tab>
                        Projetos sem dono
                      </v-tab>
                      <v-tab-item>
                        <v-data-table
                          :headers="headersProjetos"
                          class="elevation-1"
                          :items="meusProjetos"
                          pagination.sync="pagination"
                          hide-default-footer
                          @click:row="toggleModalProjetos"
                        >
                        </v-data-table>
                      </v-tab-item>
                      <v-tab-item>
                        <v-data-table
                          :headers="headersProjetos"
                          class="elevation-1"
                          :items="projectsList"
                          pagination.sync="pagination"
                          hide-default-footer
                          @click:row="toggleModalProjetos"
                        >
                        </v-data-table>
                      </v-tab-item>
                    </v-tabs>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-dialog v-model="modalNovoProjeto" width="500px">
        <v-card>
          <v-card-title class="font-xl font-weight-regular title-primary--text">
            Adicionar novo projeto
          </v-card-title>

          <v-divider class="mb-4 "></v-divider>
          <v-form ref="formNewProject" lazy-validation>
            <v-text-field
              v-model="projeto.titulo"
              :rules="rules.titulo"
              class="mx-5"
              label="Titulo do projeto"
              outlined
            ></v-text-field>
            <v-text-field
              v-model="projeto.descricaoBreve"
              :rules="rules.descricao"
              class="mx-5"
              label="Descrição breve"
              outlined
            ></v-text-field>
            <v-text-field
              v-model="projeto.linkExterno1"
              :rules="rules.linkExterno"
              class="mx-5"
              label="Link externo"
              outlined
            ></v-text-field>
          </v-form>
          <v-card-actions>
            <v-btn color="primary" @click="adicionarNovoProjeto()">Adicionar</v-btn>
            <v-spacer></v-spacer>

            <v-btn id="btnFecharDialog" color="primary" outlined @click="toggleAdd">Fechar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="modalProjeto" width="500px">
        <v-card>
          <v-card-title>
            <h1 class="font-xl font-weight-regular title-primary--text">Atribuir projeto</h1>
          </v-card-title>

          <v-divider class="mb-4 "></v-divider>
          <v-text-field v-model="currentProject.titulo" class="mx-5" label="Titulo" readonly outlined></v-text-field>
          <v-textarea
            v-model="currentProject.descricaoBreve"
            class="mx-5"
            label="Descrição"
            readonly
            outlined
          ></v-textarea>
          <v-text-field
            v-model="currentProject.responsavelEmpresario"
            class="mx-5"
            label="Empresário"
            readonly
            outlined
          ></v-text-field>
          <v-text-field v-model="currentProject.empresa" class="mx-5" label="Empresa" readonly outlined></v-text-field>
          <v-text-field
            v-model="currentProject.linkExterno1"
            class="mx-5"
            label="Contato"
            readonly
            outlined
          ></v-text-field>
          <v-card-actions>
            <v-btn color="primary" @click="AtribuirProjeto">Atribuir a mim</v-btn>
            <v-spacer></v-spacer>

            <v-btn id="btnFecharDialog" color="primary" outlined @click="toggleModalProjetos">Fechar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { cadiService } from '../services'
// import { isNumber } from '../utils/number'

export default {
  name: 'Cadi',
  data() {
    return {
      login: true,
      tab: 0,
      avatarName: '',
      barExpand: false,
      route: 'Empresario',
      modalNovoProjeto: false,
      projectsList: [],
      cadastro: true,
      meusProjetos: [],
      modalProjeto: false,
      currentProject: {},
      projeto: {
        titulo: '',
        descricaoBreve: '',
        descricaoCompleta: '',
        descricaoTecnologias: '',
        linkExterno1: '',
        linkExterno2: '',
        fase: 1,
        reuniao: {
          data: '',
          horario: '',
          local: '',
          datasPossiveis: []
        },
        status: {
          negado: false,
          motivo: ''
        },
        entregas: [],
        alunos: [],
        responsavelCadi: '',
        responsavelProfessor: [],
        responsavelEmpresario: ''
      },
      rules: {
        titulo: [v => !!v || 'Titulo é obrigatório'],
        descricao: [v => !!v || 'Descrição é obrigatória'],
        linkExterno: [v => !!v || 'Link é obrigatório']
      },
      activeUser: {
        id: {},
        email: '',
        senha: '',
        name: '',
        ativo: false
      },
      color: ['amber darken-1', 'deep-orange darken-4'],
      avatar: 'unnamed.jpg',
      headersProjetos: [
        {
          text: 'Projeto',
          value: 'titulo',
          align: 'center'
        },
        {
          text: 'Descrição',
          value: 'descricaoBreve',
          align: 'center'
        },
        {
          text: 'Fase do Projeto',
          value: 'fase',
          align: 'center'
        }
      ]
    }
  },
  computed: {
    user() {
      return this.usuarioLogado
    },
    ...mapGetters(['loading', 'toast', 'usuarioLogado'])
  },
  async mounted() {
    if (!this.user.email) {
      this.voltar()
    }
    //this.buscarProjetos()
    this.activeUser = this.user
    this.montaAvatar()
    this.buscarProjetosSemDono()
    this.buscarMeusProjetos()
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
    toggleModalProjetos(value) {
      this.currentProject = value
      this.modalProjeto = !this.modalProjeto
    },
    async buscarProjetosSemDono() {
      this.setLoading('Buscando')
      try {
        this.projectsList = await cadiService.getSemDono()
      } catch (error) {
        this.setToast({
          color: 'error',
          message: error.response.data.Message
        })
      } finally {
        this.resetLoading()
      }
    },
    async buscarMeusProjetos() {
      this.setLoading('Buscando')
      try {
        this.meusProjetos = await cadiService.getCadiProject(this.activeUser.email)
      } catch (error) {
        this.setToast({
          color: 'error',
          message: error.response.data.Message
        })
      } finally {
        this.resetLoading()
      }
    },
    async AtribuirProjeto() {
      this.setLoading('Atribuindo')
      try {
        await cadiService.setAtribuirProjeto(this.currentProject)
      } catch (error) {
        this.setToast({
          color: 'error',
          message: error.response.data.Message
        })
      } finally {
        this.resetLoading()
        this.buscarProjetosSemDono()
        this.buscarMeusProjetos()
      }
    },
    toggleCadastro() {
      this.cadastro = !this.cadastro
    },
    toggleAdd() {
      this.modalNovoProjeto = !this.modalNovoProjeto
    },
    montaAvatar() {
      let teste = this.activeUser.name.split(' ')
      this.avatarName = teste[0].substring(0, 1).toUpperCase()
      if (teste.length > 0) {
        this.avatarName += teste[1].substring(0, 1).toUpperCase()
      }
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
