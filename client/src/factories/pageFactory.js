import shortid from 'shortid'

function newPage (name, path, alignment, height, width, cover, thumb, order, deleted) {
  return {
    id: shortid.generate(),
    name: name,
    path: path,
    alignment: alignment || 'left',
    width: width || '100%',
    height: height || '100%',
    pageCover: cover || 'testPageImg.jpg',
    pageThumb: thumb || 'testPageImg-thumb.jpg',
    order: order || 1,
    deleted: deleted || false,
    styles: {
      '--mdc-theme-primary': '#673ab7',
      '--mdc-theme-secondary': '#f44336',
      '--mdc-theme-background': '#ffffff',
      'position': 'relative',
      'margin': 'auto',
      'background-color': '#ffffff',
      'overflow': 'hidden',
      'background-size': '100%'
    },
    classes: [],
    children: []
  }
}

export default newPage
