import { GetterTree, ActionTree, MutationTree } from 'vuex'
import axios from '~/plugins/axios'

export const state = () => ({
  operations: null,
})

export type RootState = ReturnType<typeof state>

// export const getters: GetterTree<RootState, RootState> = {
//   authenticated: state => state.authenticated
// }

export const mutations: MutationTree<RootState> = {
  SET_OPERATIONS (state, val: any) {
    state.operations = val
  },
}

export const actions: ActionTree<RootState, RootState> = {
  getOperations ({ commit }) {
    axios.get('/operation').then(({data}: any) => {
      commit('SET_OPERATIONS', data.info.data)
    })
  }
}
