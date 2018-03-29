<template>
  <dialog>
    <p class="page-dialog__title" :title="dialogTitle">{{dialogTitle}}</p>
    <div class="page-dialog__content">
      <mdc-layout-grid>
        <mdc-layout-cell span=3>
          Url
        </mdc-layout-cell>
        <mdc-layout-cell span=3>
          Titel
        </mdc-layout-cell>
        <mdc-layout-cell span=3>
          Type
        </mdc-layout-cell>
        <mdc-layout-cell span=3>
          Verwijderen
        </mdc-layout-cell>
      </mdc-layout-grid>
      <mdc-layout-grid v-for="(page, pageIndex) in projectPages" :key="page.id" >
        <mdc-layout-cell span=12>
          Pagina {{ pageIndex + 1 }}
          <mdc-layout-inner-grid  v-for="(children, childrenIndex) in page.children" :key="children.id">
            <mdc-layout-cell span=3>
              <p>Url {{childrenIndex}}</p>
            </mdc-layout-cell>
            <mdc-layout-cell span=3>
              <p>Titel</p>
            </mdc-layout-cell>
            <mdc-layout-cell span=3>
              <p>Type</p>
            </mdc-layout-cell>
            <mdc-layout-cell span=3>
              <svgicon icon="system/actions/delete" width="24" height="24" color="#2b6a73"></svgicon>
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
// import _ from 'lodash'
import draggable from 'vuedraggable'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import { pathInUse, nameInUse, savePageAndClose, _togglePagesGridDialog, _toggleLinkOverviewDialog, _clearSelectedElements, _changeActivePage, setNewPagesOrder, reorderPages } from '@/store/types'

export default {
  name: 'link-overview-dialog',
  components: {
    draggable
  },
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
      return 'Link overzicht'
    },
    pagesList: {
      get () {
        return this.projectPages
      },
      set (value) {
        this.setNewPagesOrder(value)
      }
    },

    ...mapState({
      activePage: state => state.app.selectedPage,
      linkOverviewDialog: state => state ? state.app.linkOverviewDialog : {isNew: true, isOpen: false},
      // projectPages: state => state ? _.orderBy(state.project.pages, 'order') : []
      projectPages: state => state ? state.project.pages : []
    }),

    ...mapGetters([pathInUse, nameInUse])
  },
  methods: {
    onSelectPage (page) {
      console.log(page)
      if (page.id !== this.activePage.id) {
        this._clearSelectedElements()
        this._changeActivePage(page)
      }
    },

    ...mapActions([savePageAndClose, setNewPagesOrder]),
    ...mapMutations([_togglePagesGridDialog, _toggleLinkOverviewDialog, _clearSelectedElements, _changeActivePage, reorderPages])
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
  width: 50vw !important;
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

.v-grid-item-dragging .v-grid-item-thumb {
  /* animation-name: shake;
  animation-duration: 0.2s;
  animation-iteration-count: infinite;
  animation-direction: alternate; */
  transform: scale(1.1);
  opacity: .5;
}
@keyframes shake {
  from {
    transform: rotate(-4deg);
  },
  to {
    transform: rotate(4deg);
  }
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
</style>
