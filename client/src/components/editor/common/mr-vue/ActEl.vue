<template>
  <div act-el="true"
    class="act-el"
  >
    <!-- IMPORTANT! KEEP SLOT AS FIRST CHILD -->
    <slot></slot>
    <!-- IMPORTANT! KEEP SLOT AS FIRST CHILD -->
    <input type="text" placeholder="link..." v-model="tmpLinkInput" @blur="inputOnBlur" />
    <input type="text" placeholder="title..." v-model="tmpTitleInput" @blur="inputOnBlur" />
    <mdc-button v-tooltip="'delete element'" class="action-btn" dense
      :disabled="isLoading" @click="deleteHandler">
      <svgicon icon="system/actions/delete" width="24" height="24" color="#2b6a73"></svgicon>
    </mdc-button>
  </div>
</template>

<script>
import '@/assets/icons/system/actions'

import { mapState, mapActions } from 'vuex'
import { actionSelectedElement, removeElement } from '@/store/types'

export default {
  name: 'act-el',
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      tmpLinkInput: ''
    }
  },
  computed: mapState({
    isLoading: state => state.app.isLoading,
    selectedElement: state => state.app.selectedElements || [],
    selectedElementLink: state => state ? state.app.selectedElements[0].body.link : '',
    selectedElementTitle: state => state ? state.app.selectedElements[0].body.title : '',
    page: state => state ? state.app.selectedPage : {}
  }),
  methods: {
    inputOnBlur () {
      if ((this.tmpLinkInput && (this.tmpLinkInput !== this.selectedElementLink)) || this.tmpTitleInput && (this.tmpTitleInput !== this.selectedElementTitle)) {
        this.selectedElement.map(el => {
          this.actionSelectedElement({elId: el.id, pageId: this.page.id, link: this.tmpLinkInput, title: this.tmpTitleInput})
        })
      } else {
        this.tmpLinkInput = this.selectedElementLink
        this.tmpTitleInput = this.selectedElementTitle
      }
    },
    deleteHandler () {
      if (this.selectedElement.length > 0) {
        this.selectedElement.map(el => this.removeElement({page: this.page, elId: el.id}))
      }
    },
    ...mapActions([actionSelectedElement, removeElement])
  },
  created: function () {
    this.tmpLinkInput = this.selectedElementLink
    this.tmpTitleInput = this.selectedElementTitle
  },
  watch: {
    'selectedElementLink': function (val) {
      this.tmpLinkInput = val
    },
    'selectedElementTitle': function (val) {
      this.tmpTitleInput = val
    }
  }
}
</script>

<style scoped>
.act-el {
    background-color: white;
    padding: 5px;
}
</style>