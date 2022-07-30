export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  // 最初にDBにデータが有るかをチェックする
  async nuxtClientInit({ dispatch }) {
    await dispatch('students/getStudents')
    await dispatch('questions/getQuestions')
  },
}
