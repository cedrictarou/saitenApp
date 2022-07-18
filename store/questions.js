export const state = () => ({
  questions: [
    {
      id: 1,
      correctNumber: 5,
      point: 2,
      kanten: '知識・技能',
    },
  ],
})

export const getters = {
  questions: (state) => state.questions,
}

export const mutations = {
  addQuestions(state) {
    const newQuestion = {
      id: Date.now(),
      correctNumber: 5,
      point: 2,
      kanten: '知識・技能',
    }
    state.questions.push(newQuestion)
  },
  changeKanten(state, { id, value }) {
    const target = state.questions.filter((question) => question.id === id)[0]
    target.kanten = value
  },
  changePoint(state, { id, value }) {
    const target = state.questions.filter((question) => question.id === id)[0]
    target.point = value
  },
  changeCorrectNumber(state, { id, value }) {
    const target = state.questions.filter((question) => question.id === id)[0]
    target.correctNumber = value
  },
  removeQuestion(state, id) {
    state.questions = state.questions.filter((question) => question.id !== id)
  },
}

export const actions = {
  addQuestions({ commit }) {
    commit('addQuestions')
  },
  changeKanten({ commit }, payload) {
    commit('changeKanten', payload)
  },
  changePoint({ commit }, payload) {
    commit('changePoint', payload)
  },
  changeCorrectNumber({ commit }, payload) {
    commit('changeCorrectNumber', payload)
  },
  removeQuestion({ commit }, payload) {
    commit('removeQuestion', payload)
  },
}
