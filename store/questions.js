export const state = () => ({
  questions: [],
})

export const getters = {
  questions: (state) => state.questions,
}

export const mutations = {
  getQuestions(state, questions) {
    state.questions = []
    state.questions = questions
  },
  addQuestions(state, newQuestion) {
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
    const newQuestion = {
      id: Date.now(),
      correctNumber: 5,
      point: 2,
      kanten: '知識・技能',
    }
    this.$db.collection('dbQuestions').add(newQuestion)
    commit('addQuestions', newQuestion)
  },
  async changeKanten({ commit }, payload) {
    await this.$db.collection('dbQuestions').doc({ id: payload.id }).update({
      kanten: payload.value,
    })
    commit('changeKanten', payload)
  },
  async changePoint({ commit }, payload) {
    await this.$db.collection('dbQuestions').doc({ id: payload.id }).update({
      point: payload.value,
    })
    commit('changePoint', payload)
  },
  async changeCorrectNumber({ commit }, payload) {
    await this.$db.collection('dbQuestions').doc({ id: payload.id }).update({
      correctNumber: payload.value,
    })
    commit('changeCorrectNumber', payload)
  },
  async removeQuestion({ commit }, payload) {
    await this.$db.collection('dbQuestions').doc({ id: payload }).delete()
    commit('removeQuestion', payload)
  },
  async getQuestions({ commit }) {
    const questions = await this.$db.collection('dbQuestions').get()
    commit('getQuestions', questions)
  },
}
