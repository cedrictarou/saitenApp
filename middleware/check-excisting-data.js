export default ({ store, redirect }) => {
  const students = store.getters['students/students']
  const questions = store.getters['questions/questions']
  if (students.length === 0 || questions.length === 0) {
    alert('問題登録と生徒登録を行ってください。')
    redirect('settings')
  }
}
