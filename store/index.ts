// eslint-disable-next-line no-unused-vars
import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  authenticated: false,
  bounce: null,
  guide: false,
  coins: [],
  sale_price: null,
  purchase_price: null,
  status_user_id: null
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  authenticated: state => state.authenticated
}

export const mutations: MutationTree<RootState> = {
  CHANGE_AUTHENTICATED: (state, newVal: boolean) => (state.authenticated = newVal),
  SET_GUIDE: (state, newVal: boolean) => (state.guide = newVal),
  SET_COINS: (state, newVal: any) => (state.coins = newVal),
  SET_SALE: (state, newVal: any) => (state.sale_price = newVal),
  SET_PURCHASE: (state, newVal: any) => (state.purchase_price = newVal),
  SET_STATUS_USER_ID: (state, newVal: any) => (state.status_user_id = newVal)
}

export const actions: ActionTree<RootState, RootState> = {
  authenticated ({ commit }, val: boolean) {
    commit('CHANGE_AUTHENTICATED', val)
  },
}
