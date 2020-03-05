import Aluno from '../views/Aluno.vue'
import Cadi from '../views/Cadi.vue'
import Empresario from '../views/Empresario.vue'
import Professor from '../views/Professor.vue'

export default [
  {
    path: '/Aluno',
    name: 'Aluno',
    component: Aluno
  },
  {
    path: '/Cadi',
    name: 'Cadi',
    component: Cadi
  },
  {
    path: '/Empresario',
    name: 'Empresario',
    component: Empresario
  },
  {
    path: '/Professor',
    name: 'Professor',
    component: Professor
  }
]
