export const state = () => ({
  students: [],
})

export const getters = {
  students: (state) => state.students,
}

export const mutations = {
  addStudents(state, newStudents) {
    state.students.push(...newStudents)
  },
  getStudents(state, students) {
    state.students = []
    state.students = students
  },
}
export const actions = {
  // 最初にDBにデータが有るかをチェックする
  async nuxtClientInit({ dispatch }) {
    await dispatch('getStudents')
  },
  async addStudents({ commit }, newStudents) {
    // 既存のデータを初期化
    await this.$db.collection('dbStudents').delete()
    // データベースへデータを追加する
    newStudents.forEach((newStudent) => {
      this.$db.collection('dbStudents').add(newStudent)
    })
    await commit('addStudents', newStudents)
  },
  async getStudents({ commit }) {
    const students = await this.$db.collection('dbStudents').get()
    commit('getStudents', students)
  },
}
