// eslint-disable-next-line no-unused-vars
import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  authenticated: false,
  bounce: null,
  guide: false
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  authenticated: state => state.authenticated
}

export const mutations: MutationTree<RootState> = {
  CHANGE_AUTHENTICATED: (state, newVal: boolean) => (state.authenticated = newVal),
  SET_GUIDE: (state, newVal: boolean) => (state.guide = newVal),
}

export const actions: ActionTree<RootState, RootState> = {
  authenticated ({ commit }, val: boolean) {
    commit('CHANGE_AUTHENTICATED', val)
  },
}
