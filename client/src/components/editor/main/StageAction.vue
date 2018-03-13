<script>
// import { mapState, mapMutations } from 'vuex'
// import { _clearSelectedElements, _addSelectedElement } from '@/store/types'

import MrEl from '@/components/editor/common/mr-vue/MrEl'
// import StageEl from './StageEl'

export default {
  name: 'stage-action',
  props: ['elem'],
  components: { MrEl },
  render: function (createElement) {
    return createElement('h1', 'A headline')
  }
}
</script>
