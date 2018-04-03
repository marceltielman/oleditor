<template>
  <dialog>
    <p class="page-dialog__title" :title="dialogTitle">{{dialogTitle}}</p>
    <div class="page-dialog__content">
      <mdc-layout-grid>
        <mdc-layout-cell span=4>
          Url
        </mdc-layout-cell>
        <mdc-layout-cell span=4>
          Titel
        </mdc-layout-cell>
        <mdc-layout-cell span=2>
          Type
        </mdc-layout-cell>
        <mdc-layout-cell span=2>
          Verwijderen
        </mdc-layout-cell>
      </mdc-layout-grid>
      <mdc-layout-grid v-for="(page, pageIndex) in projectPages" :key="page.id" >
        <mdc-layout-cell span=12 v-show="page.children.length">
          <mdc-title @click="onSelectPage(page)" class="pointer">
            <svgicon icon="system/elements/page" width="24" height="24" color="#2b6a73"></svgicon> Pagina {{ pageIndex + 1 }}
          </mdc-title>
          <mdc-layout-inner-grid  v-for="(element, elementIndex) in page.children" :key="element.id">
            <mdc-layout-cell span=4 align="middle">
              <mdc-textfield :value="element.body.link" dense label="Url" @input="updateUrl({elId: element.id, pageId: page.id, link: $event.target.value} )" />
            </mdc-layout-cell>
            <mdc-layout-cell span=4 align="middle">
              <mdc-textfield :value="element.body.title" dense label="Title" @input="updateTitle({elId: element.id, pageId: page.id, title: $event.target.value} )" />
            </mdc-layout-cell>
            <mdc-layout-cell span=2 align="bottom">
              <svgicon :icon="'system/elements/'+element.name" width="24" height="24" color="rgba(0,0,0,.87)"></svgicon>
            </mdc-layout-cell>
            <mdc-layout-cell span=2 align="bottom">
              <mdc-button class="action-btn" :disabled="isLoading" @click="deleteElementHandler(page, element.id)">
                <svgicon icon="system/actions/delete" width="24" height="24" color="#2b6a73"></svgicon>
              </mdc-button>
            </mdc-layout-cell>
          </mdc-layout-inner-grid>
        </mdc-layout-cell>
      </mdc-layout-grid>
    </div>
    <div class="page-dialog__actions">
      <mdc-button @click="_toggleLinkOverviewDialog({isOpen: false, isNew: linkOverviewDialog.isNew})">Sluiten</mdc-button>
    </div>
  </dialog>
</template>


<script>
import _ from 'lodash'
import { mapState, mapActions, mapMutations } from 'vuex'
import { updateLinkOverviewElement, removeElement, _toggleLinkOverviewDialog, _clearSelectedElements, _changeActivePage } from '@/store/types'

export default {
  name: 'link-overview-dialog',
  data: function () {
    return {
      valid: false,
      id: null,
      name: '',
      nameError: '',
      path: '',
      pathError: ''
    }
  },
  computed: {
    dialogTitle () {
      return 'Linkoverzicht'
    },

    ...mapState({
      isLoading: state => state.app.isLoading,
      activePage: state => state.app.selectedPage,
      linkOverviewDialog: state => state ? state.app.linkOverviewDialog : {isNew: true, isOpen: false},
      // projectPages: state => state ? _.orderBy(state.project.pages, 'order') : []
      projectPages: state => state ? state.project.pages : []
    })
  },
  methods: {
    onSelectPage (page) {
      if (page.id !== this.activePage.id) {
        this._clearSelectedElements()
        this._changeActivePage(page)
      }
    },
    deleteElementHandler (page, elId) {
      this.removeElement({ page: page, elId: elId })
    },
    updateUrl: _.debounce(function (payload) {
      this.updateLinkOverviewElement({data: payload, field: 'link'})
    }, 500),
    updateTitle: _.debounce(function (payload) {
      this.updateLinkOverviewElement({data: payload, field: 'title'})
    }, 500),

    ...mapActions([removeElement, updateLinkOverviewElement]),
    ...mapMutations([_toggleLinkOverviewDialog, _clearSelectedElements, _changeActivePage])
  },
  watch: {
    'linkOverviewDialog.isOpen': function (val) {
      let dialog = this.$el

      if (!val) {
        dialog.close()
      } else {
        dialog.showModal()
      }
    }
  }
}
</script>


<style scoped>
dialog {
  width: 55vw !important;
  border: none !important;
  box-shadow:
    0 9px 46px 8px rgba(0,0,0,.14),
    0 11px 15px -7px rgba(0,0,0,.12),
    0 24px 38px 3px rgba(0,0,0,.2);
}
.page-dialog__title {
  font-size: 24px;
  font-weight: 500;
  padding: 24px 24px 0;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.page-dialog__content {
  padding: 20px 24px 24px;
  color: rgba(0,0,0,.54);
}
.page-dialog__content .page-dialog__input{
  width: 100%;
}

.v-grid-item-thumb{
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 100%;
  transition: transform .5s;
}
.isBlankPage {
  border: 1px solid #eee;
}

.page-dialog__actions {
  padding: 8px 8px 8px 24px;
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
}
.sort-pages {
  display: flex;
}
.sort-pages-item {
  flex: 0 0 20%;
  max-width: 20%;
}
h3 {
  margin-bottom: 0;
}
.page-heading {

}
.pointer {
  cursor: pointer;
}
.mdc-layout-grid {
  padding-top: 0;
}
</style>
