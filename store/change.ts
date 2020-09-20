import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  operation: {
    send: '100',
    receive: '200',
    typeSend: '',
    typeGet: ''
  },
})

export type RootState = ReturnType<typeof state>

// export const getters: GetterTree<RootState, RootState> = {
//   authenticated: state => state.authenticated
// }

export const mutations: MutationTree<RootState> = {
  CHANGE_SEND (state, val: any) {
    state.operation.send += val
  },
  CHANGE_RECEIVE (state, val: any) {
    state.operation.receive += val
  },
  SET_SEND (state, val: any) {
    state.operation.send = val
  },
  SET_RECEIVE (state, val: any) {
    state.operation.receive = val
  }
}

// export const actions: ActionTree<RootState, RootState> = {
//   authenticated ({ commit }, val: boolean) {
//     commit('CHANGE_AUTHENTICATED', val)
//   }
// }
