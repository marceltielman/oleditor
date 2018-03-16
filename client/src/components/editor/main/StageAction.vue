<script>
// import { mapState } from 'vuex'
// import { _clearSelectedElements, _addSelectedElement } from '@/store/types'

import ActEl from '@/components/editor/common/mr-vue/ActEl'
// import StageEl from './StageEl'

export default {
  name: 'stage-action',
  props: ['selectedElements'],
  components: { ActEl },
  render: function (createElement) {
    return createElement(ActEl)
  },
  computed: {
  }
}
</script>
