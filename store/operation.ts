import { GetterTree, ActionTree, MutationTree } from 'vuex'
import axios from '~/plugins/axios'
export const state = () => ({
  data: null,
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
  getData({ commit }) {
    axios.get('/operation-create').then(({ data }) => {
      console.log('data', data)
      commit('SET_DATA', data)
    })
  },
  setData({ commit }, val) {
    commit('SET_DATA', val)
  },
  updateValue ({ commit }, obj: any) {
    commit('SET_VAL', obj)
  }
}
