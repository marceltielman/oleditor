<template>
  <dialog>
    <p class="page-dialog__title" :title="dialogTitle">{{dialogTitle}}</p>
    <div class="page-dialog__content">
      <!-- <grid
      :draggable="true"
      :sortable="true"
      :items="projectPages"
      :height="100"
      :width="100"
      :cellWidth="120"
      :cellHeight="120"
      @click="onSelectPage"
      @sort="onPagesSort"
      @change="onPageSortChange">
        <template slot="cell" slot-scope="props">
          <div class="v-grid-item-thumb" :class=" { isBlankPage: props.item.blankPage} " :style="{'background-image': 'url(/static/p2t/' + props.item.pageThumb + ')', width: '56px', height: '100px'}">
          </div>
          <p>
            {{props.item.displayPage}} {{props.item.order}} <br />
            {{ props.item.id }}
          </p>
        </template>
      </grid> -->
      <draggable class="sort-pages" v-model="pagesList" :options="{group:'order'}" @start="drag=true" @end="drag=false">
        <div v-for="page in pagesList" :key="page.id" class="sort-pages-item" @click="onSelectPage(page)">
          {{page.name}}
          <div class="v-grid-item-thumb" :class=" { isBlankPage: page.blankPage} " :style="{'background-image': 'url(/static/p2t/' + page.pageThumb + ')', width: '56px', height: '100px'}">
          </div>
          <p>
            {{page.displayPage}} {{page.order}} <br />
            {{ page.id }}
          </p>
        </div>
      </draggable>
    </div>
    <div class="page-dialog__actions">
      <mdc-button @click="savePageAndClose({id, name, path})" :disabled="!valid">Save</mdc-button>
      <mdc-button @click="_togglePagesGridDialog({isOpen: false, isNew: pagesGridDialog.isNew})">Cancel</mdc-button>
    </div>
  </dialog>
</template>


<script>
import draggable from 'vuedraggable'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import { pathInUse, nameInUse, savePageAndClose, _togglePageDialog, _togglePagesGridDialog, _clearSelectedElements, _changeActivePage, setNewPagesOrder, reorderPages } from '@/store/types'

export default {
  name: 'pages-grid-dialog',
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
      return 'Beheer pagina\'s'
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
      pagesGridDialog: state => state ? state.app.pagesGridDialog : {isNew: true, isOpen: false},
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
    ...mapMutations([_togglePageDialog, _togglePagesGridDialog, _clearSelectedElements, _changeActivePage, reorderPages])
  },
  watch: {
    'pagesGridDialog.isOpen': function (val) {
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
