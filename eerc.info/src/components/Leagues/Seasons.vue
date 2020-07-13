<template>
  <q-table title="Seasons"
    :data="seasonSettings.data"
    :columns="seasonSettings.columns"
    :pagination="seasonSettings.initialPagination"
    style="width:90%"
    class="q-px-md q-py-sm q-table--wrap" hide-pagination
    dense>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="seasonName" :props="props">{{ props.row.seasonName }}</q-td>
          <q-td key="eventCount" :props="props">{{ props.row.eventCount }}</q-td>
          <q-td key="actions" :props="props">
            <q-btn color="secondary" :icon="props.expand ? 'expand_less' : 'expand_more'" @click="props.expand = !props.expand"/>
            <!-- <q-btn color="secondary" icon="edit" @click="editItem(props.row)" no-caps/> -->
            <q-btn color="accent" icon="delete" @click="deleteItem(props.row)" no-caps class="q-ml-xs"/>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <events class="q-pl-xs" :events="props.row.events"/>
          </q-td>
        </q-tr>
      </template>
      <template v-slot:bottom>
        <div style="width: 100%" class="flex row items-center justify-end">
          <q-btn label="Add" icon-right="add" class="bg-primary" @click="showDialog = true; editing = false"/>
        </div>
        <q-dialog v-model="showDialog">
          <q-card>
            <q-card-section class="q-pb-none">
              <h6 class="q-ma-none">{{ editing ? 'Edit Item' : 'Add Item'}}</h6>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <p>This dialog will handle editing/creating a new season.</p>
              <q-input v-model="editedItem.seasonName" label="Season name" bottom-slots hint="Cannot be blank" error-message="Season Name cannot be blank" :error="addError"/>
            </q-card-section>
            <q-card-actions class="q-pt-none" align="right">
              <q-btn error="e" :label="editing ? 'Edit' : 'Add'" @click="addRow"/>
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="showDeleteDialog">
          <q-card>
            <q-card-section>
              <h6 v-if="seasonSettings.data && seasonSettings.data[deleteIndex]" class="q-ma-none">You are about to delete <b>'{{ seasonSettings.data[deleteIndex].seasonName }}'</b> which has <b>{{ seasonSettings.data[deleteIndex].eventCount || 0 }} events.</b></h6>
              <q-img src="https://media1.tenor.com/images/546784721fde6b86621a8b541e48b8c3/tenor.gif?itemid=14258954"
              style="min-width:20em;"/>
            </q-card-section>
            <q-card-actions class="q-pt-none" align="right">
              <q-btn label="Cancel" v-close-popup @click="close"/>
              <q-btn label="Confirm" v-close-popup @click="confirmDeleteItem"/>
            </q-card-actions>
          </q-card>
        </q-dialog>
      </template>
    </q-table>
</template>

<script>
import Events from 'components/Leagues/Events'
export default {
  components: {
    Events
  },
  data () {
    return {
      seasonSettings: {},
      showDialog: false,
      editedIndex: -1,
      editedItem: { seasonName: '', events: [], eventCount: 0 },
      editing: false,
      showDeleteDialog: false,
      deleteIndex: -1,
      addError: false
    }
  },
  props: {
    seasons: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    addRow () {
      if (this.editedIndex > -1) {
        Object.assign(this.seasonSettings.data[this.editedIndex], this.editedItem)
      } else {
        if (!this.editedItem.seasonName) {
          this.addError = true
          return
        }
        this.seasonSettings.data.push(this.editedItem)
      }
      this.close()
      this.addError = false
    },
    editItem (item) {
      this.editing = true
      this.editedIndex = this.seasonSettings.data.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.showDialog = true
    },
    deleteItem (item) {
      this.deleteIndex = this.seasonSettings.data.indexOf(item)
      this.showDeleteDialog = true
    },
    confirmDeleteItem () {
      this.seasonSettings.data.splice(this.deleteIndex, 1)
      this.close()
    },
    close () {
      this.showDialog = false
      this.showDeleteDialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, { key: '', value: '' })
        this.editedIndex = -1
        this.deleteIndex = -1
        this.editing = false
      }, 300)
    },
    createSeasonSettings () {
      const newSeasonSettings = {
        initialPagination: {
          rowsPerPage: 0 // infinite
        },
        columns: [
          { name: 'seasonName', required: true, label: 'Season Name', field: row => row.seasonName, align: 'left' },
          { name: 'eventCount', required: true, label: 'Events', field: row => row.eventCount, align: 'left' },
          { name: 'actions', label: 'Actions' }
        ],
        data: []
      }

      this.seasons.forEach(season => {
        newSeasonSettings.data.push({
          seasonName: season.seasonName,
          eventCount: season.events.length,
          events: season.events
        })
      })

      this.seasonSettings = newSeasonSettings
    }
  },
  mounted () {
    if (this.seasons) {
      this.createSeasonSettings()
    }
  },
  watch: {
    seasons (newVal) {
      if (newVal) {
        this.createSeasonSettings()
      }
    }
  }
}
</script>
