import Localbase from 'localbase'
const db = new Localbase('db')
export default (context, inject) => {
  inject('db', db)
}
