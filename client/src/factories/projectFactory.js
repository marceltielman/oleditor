import shortid from 'shortid'
import newPage from './pageFactory'

function newProject (title) {
  return {
    id: shortid.generate(),
    title: title,
    components: [],
    pages: [
      newPage('Pagina 1', '/', 'center', 1, 'Pagina', 'autoreviewpages/1.png', 'autoreviewpages/1-thumb.png'),
      newPage('Pagina 2', '/', 'left', 2, 'Pagina', 'autoreviewpages/2.png', 'autoreviewpages/2-thumb.png'),
      newPage('Pagina 3', '/', 'right', 3, 'Pagina', 'autoreviewpages/3.png', 'autoreviewpages/3-thumb.png'),
      newPage('Pagina 4', '/', 'left', 4, 'Pagina', 'autoreviewpages/4.png', 'autoreviewpages/4-thumb.png')
    ]
  }
}

export default newProject
