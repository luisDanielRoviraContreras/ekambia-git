import { GetterTree, ActionTree, MutationTree } from 'vuex'
import axios from '~/plugins/axios'

export const state = () => ({
  data: {}
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  SET_DATA (state, val: any) {
    state.data = val
  },
}

export const actions: ActionTree<RootState, RootState> = {
  getOperation ({ commit }, id) {
    if (!id) {
      return
    }
    axios.get(`/operation-show/${id}`).then(({ data }: any) => {
      commit('SET_DATA', data[0])
    })
  }
}
