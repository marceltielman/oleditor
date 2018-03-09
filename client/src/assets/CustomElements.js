/*
  Basic elements (HTML5 Elements):
  - PARENT -> egglement, [containegg]
 */
const customElements = [
  // Custom Element
  {
    'name': 'div',
    'displayName': 'test el',
    'type': 'div',
    'text': 'custom kadertje',
    'egglement': true,
    'containegg': true,
    'width': 100,
    'height': 100,
    'attrs': {
      'hidden': false
    },
    'classes': {},
    'styles': {
      'overflow': 'hidden',
      'border-color': 'rgba(0, 0, 0, 0.8)',
      'border-style': 'dashed',
      'border-width': '1px',
      'background-color': 'rgba(255, 255, 255, 0.5)'
    },
    'children': []
  },
  // Custom Element No Resizable
  {
    'name': 'div',
    'displayName': 'drag noresize',
    'type': 'div',
    'text': 'kan niet resizen',
    'egglement': true,
    'containegg': true,
    'global': true,
    'width': 50,
    'height': 50,
    'attrs': {
      'hidden': false
    },
    'classes': {},
    'styles': {
      'overflow': 'hidden',
      'border-color': 'rgba(0, 0, 0, 0.8)',
      'border-style': 'dashed',
      'border-width': '1px',
      'background-color': 'rgba(255, 255, 255, 0.5)'
    },
    'children': []
  }
]

export default customElements
