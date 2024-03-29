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
  addScoreToStudent(state, scoreInfo) {
    const target = state.students.filter((s) => s.id === scoreInfo.id)[0]
    target.chishiki = scoreInfo.chishiki
    target.shiko = scoreInfo.shiko
  },
  resetStudents(state) {
    state.students = []
  },
  addAbsence(state, payload) {
    const target = state.students.filter((s) => s.id === payload.id)[0]
    target.isAttending = payload.isAttending
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
  async resetStudents({ commit }) {
    await this.$db.collection('dbStudents').delete()
    // からのdbStudentsを作る
    await this.$db.collection('dbStudents').get()
    commit('resetStudents')
  },
  async addScoreToStudent({ commit }, scoreInfo) {
    await this.$db.collection('dbStudents').doc({ id: scoreInfo.id }).update({
      chishiki: scoreInfo.chishiki,
      shiko: scoreInfo.shiko,
    })
    commit('addScoreToStudent', scoreInfo)
  },
  async addAbsence({ commit }, payload) {
    await this.$db.collection('dbStudents').doc({ id: payload.id }).update({
      isAttending: payload.isAttending,
      chishiki: 0,
      shiko: 0,
    })
    commit('addAbsence', payload)
  },
}
