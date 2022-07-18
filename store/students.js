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
}

export const actions = {
  addStudents({ commit }, newStudents) {
    commit('addStudents', newStudents)
  },
}
