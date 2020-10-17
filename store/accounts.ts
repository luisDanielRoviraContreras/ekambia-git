import { GetterTree, ActionTree, MutationTree } from 'vuex'
import axios from '~/plugins/axios'
export const state = () => ({
  accounts: null,
})

export type RootState = ReturnType<typeof state>

// export const getters: GetterTree<RootState, RootState> = {
//   authenticated: state => state.authenticated
// }

export const mutations: MutationTree<RootState> = {
  SET_ACCOUNTS (state, val: any) {
    state.accounts = val
  },
}

export const actions: ActionTree<RootState, RootState> = {
  getAccounts ({ commit }) {
    axios.get('/account').then(({ data }: any) => {
      commit('SET_ACCOUNTS', data.info.data)
    })
  }
}
