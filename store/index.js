export const state = () => ({})

export const getters = {}

export const mutations = {
  test() {
    console.log('test')
  },
}

export const actions = {
  // 最初にDBにデータが有るかをチェックする
  async nuxtClientInit({ dispatch }) {
    await dispatch('students/getStudents')
    await dispatch('questions/getQuestions')
  },
  test({ commit }) {
    commit('test')
  },
}
