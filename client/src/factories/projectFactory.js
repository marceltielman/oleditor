import shortid from 'shortid'
import newPage from './pageFactory'

function newProject (title) {
  return {
    id: shortid.generate(),
    title: title,
    components: [],
    pages: [
      newPage('Pagina 1', '/', 'center', 1),
      newPage('Pagina 2', '/', 'left', 2),
      newPage('Pagina 3', '/', 'right', 3),
      newPage('Pagina 4', '/', 'left', 4)
    ]
  }
}

export default newProject
