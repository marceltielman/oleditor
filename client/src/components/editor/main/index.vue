<template>
  <div class="mainegg" :class="'page-alignment-' + selectedPage.alignment">
    <stage-action :selectedElements="selectedElement" v-if="selectedElement.length === 1"></stage-action>
    <stage v-if="selectedPage" :page="selectedPage"></stage>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { _changeActivePage, _rebaseActivePage, getPageIndexById, getSelectedElIndexById } from '@/store/types'

import Stage from './Stage'
import StageAction from './StageAction'

export default {
  name: 'mainegg',
  components: { Stage, StageAction },
  created: function () {
    this.selectFallbackPage(this.selectedPage)
  },
  computed: {
    ...mapState({
      selectedPage: state => state.app.selectedPage,
      pages: state => state ? state.project.pages : [],
      selectedElement: state => state.app.selectedElements
    }),
    ...mapGetters([getPageIndexById, getSelectedElIndexById])
  },
  watch: {
    // After a redo/undo action this will apply
    selectedPage: function (val) {
      this.selectFallbackPage(val)
    }
  },
  methods: {
    selectFallbackPage (page) {
      if (!page && this.pages.length > 0) {
        this._changeActivePage(this.pages[0])
      } else {
        this._rebaseActivePage(this.getPageIndexById(page.id))
      }
    },

    ...mapMutations([_changeActivePage, _rebaseActivePage])
  }
}
</script>

<style scoped>
.mainegg {
  margin: 0 57px;
  height: 100%;
}
</style>
