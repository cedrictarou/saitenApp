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
  changeSetNumber(state, { id, value }) {
    const target = state.questions.filter((question) => question.id === id)[0]
    target.setNumber = value
  },
  removeQuestion(state, id) {
    state.questions = state.questions.filter((question) => question.id !== id)
  },
  resetQuestions(state) {
    state.questions = []
  },
  changeOrder(state, newQuestionsArry) {
    state.questions = newQuestionsArry
  },
}

export const actions = {
  addQuestions({ commit }, newQuestion) {
    newQuestion.subtotal = newQuestion.setNumber * newQuestion.point
    this.$db.collection('dbQuestions').add(newQuestion)
    commit('addQuestions', newQuestion)
  },
  async changeKanten({ commit }, payload) {
    await this.$db.collection('dbQuestions').doc({ id: payload.id }).update({
      kanten: payload.value,
    })
    commit('changeKanten', payload)
  },
  async changePoint({ commit, getters }, payload) {
    const target = getters.questions.filter(
      (question) => question.id === payload.id
    )[0]
    const newSubtotal = Number(target.setNumber) * Number(payload.value)
    await this.$db
      .collection('dbQuestions')
      .doc({ id: payload.id })
      .update({
        point: Number(payload.value),
        subtotal: newSubtotal,
      })
    commit('changePoint', payload)
  },
  async changeCorrectNumber({ commit }, payload) {
    await this.$db
      .collection('dbQuestions')
      .doc({ id: payload.id })
      .update({
        correctNumber: Number(payload.value),
      })
    commit('changeCorrectNumber', payload)
  },
  async changeSetNumber({ commit, getters }, payload) {
    const target = getters.questions.filter(
      (question) => question.id === payload.id
    )[0]
    const newSubtotal = Number(target.point) * Number(payload.value)
    await this.$db
      .collection('dbQuestions')
      .doc({ id: payload.id })
      .update({
        setNumber: Number(payload.value),
        subtotal: newSubtotal,
      })
    commit('changeSetNumber', payload)
  },
  async removeQuestion({ commit }, payload) {
    await this.$db.collection('dbQuestions').doc({ id: payload }).delete()
    commit('removeQuestion', payload)
  },
  async getQuestions({ commit }) {
    const questions = await this.$db.collection('dbQuestions').get()
    commit('getQuestions', questions)
  },
  async resetQuestions({ commit }) {
    await this.$db.collection('dbQuestions').delete()
    commit('resetQuestions')
  },
  async changeOrder({ commit }, newQuestionsArry) {
    await this.$db.collection('dbQuestions').set([...newQuestionsArry])
    commit('changeOrder', newQuestionsArry)
  },
}
