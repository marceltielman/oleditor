import shortid from 'shortid'
import newPage from './pageFactory'

function newProject (title) {
  return {
    id: shortid.generate(),
    title: title,
    components: [],
    pages: [
      newPage('Pagina 1', '/'),
      newPage('Pagina 2', '/', 'left'),
      newPage('Pagina 3', '/', 'right'),
      newPage('Pagina 4', '/', 'left')
    ]
  }
}

export default newProject
