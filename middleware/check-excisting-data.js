export default ({ store, redirect }) => {
  const students = store.getters['students/students']
  const questions = store.getters['questions/questions']
  if (students.length === 0 || questions.length === 0) {
    alert('You should set the data first!!')
    redirect('settings')
  }
}
