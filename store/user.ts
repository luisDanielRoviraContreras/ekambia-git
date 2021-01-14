import { GetterTree, ActionTree, MutationTree } from 'vuex'
import axios from '~/plugins/axios'
export const state = () => ({
  data: {},
})

export type RootState = ReturnType<typeof state>

// export const getters: GetterTree<RootState, RootState> = {
//   authenticated: state => state.authenticated
// }

export const mutations: MutationTree<any> = {
  SET_DATA (state, val: any) {
    state.data = val
  },
  SET_VAL (state, obj: any) {
    state.data[obj.prop] = obj.val
  }
}

export const actions: ActionTree<any, any> = {
  getUserData ({ commit }) {
    axios.get('/user').then(({ data }: any) => {
      commit('SET_DATA', data.info)
    })
  },
  updateValue ({ commit }, obj: any) {
    commit('SET_VAL', obj)
  }
}
