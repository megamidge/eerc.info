<template>
  <q-table title="League Settings"
    :data="leagueSettings.data"
    :columns="leagueSettings.columns"
    :pagination="leagueSettings.initialPagination"
    style="width:90%"
    class="q-px-md q-py-sm q-table--wrap" hide-pagination
    dense>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="Key" :props="props">
          {{ props.row.key }}
        </q-td>
        <q-td key="Value" :props="props">
          {{ props.row.value}}
        </q-td>
        <q-td key="Actions" :props="props" class="q-pa-none" style="width:10rem">
          <q-btn color="secondary" icon="edit" @click="editItem(props.row)" no-caps/>
          <q-btn color="accent" icon="delete" @click="deleteItem(props.row)" no-caps class="q-ml-xs"/>
        </q-td>
      </q-tr>
    </template>
    <template v-slot:bottom>
    <div style="width: 100%" class="flex row items-center justify-end">
      <q-btn label="Add" icon-right="add" class="bg-primary" @click="showDialog = true; editing = false"/>
      <q-btn label="Save" icon-right="save" class="bg-primary q-ml-sm" disabled/>

      <q-dialog v-model="showDialog">
        <q-card>
          <q-card-section class="q-pb-none">
            <h6 class="q-ma-none">{{ editing ? 'Edit Item' : 'Add Item'}}</h6>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="column">
              <q-input v-model="editedItem.key" label="Key"/>
              <q-input v-model="editedItem.value" label="Value" type="textarea"/>
            </div>
          </q-card-section>
          <q-card-actions class="q-pt-none" align="right">
            <q-btn :label="editing ? 'Edit' : 'Add'" v-close-popup @click="addRow"/>
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="showDeleteDialog">
        <q-card>
          <!-- <q-card-section class="q-pb-none">
            <h6 class="q-ma-none">Are you sure?</h6>
          </q-card-section> -->
          <q-card-section>
            <q-img src="https://media1.tenor.com/images/546784721fde6b86621a8b541e48b8c3/tenor.gif?itemid=14258954"
            style="min-width:20em;"/>
            <p class="q-ma-none">About to delete key value pair:</p>
            <h6 class="q-ma-none text-italic text-right" v-if="leagueSettings.data && leagueSettings.data[deleteIndex]">{{ leagueSettings.data[deleteIndex].key }}: {{ leagueSettings.data[deleteIndex].value }}</h6>
          </q-card-section>
          <q-card-actions class="q-pt-none" align="right">
            <q-btn label="Cancel" v-close-popup @click="close"/>
            <q-btn label="Confirm" v-close-popup @click="confirmDeleteItem"/>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    </template>
  </q-table>
</template>

<script>
export default {
  data () {
    return {
      leagueSettings: {},
      showDialog: false,
      editedIndex: -1,
      editedItem: { Key: '', value: '' },
      editing: false,
      showDeleteDialog: false,
      deleteIndex: -1
    }
  },
  props: {
    league: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    addRow () {
      if (this.editedIndex > -1) {
        Object.assign(this.leagueSettings.data[this.editedIndex], this.editedItem)
      } else {
        this.leagueSettings.data.push(this.editedItem)
      }
      this.close()
    },
    editItem (item) {
      this.editing = true
      this.editedIndex = this.leagueSettings.data.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.showDialog = true
    },
    deleteItem (item) {
      this.deleteIndex = this.leagueSettings.data.indexOf(item)
      this.showDeleteDialog = true
    },
    confirmDeleteItem () {
      this.leagueSettings.data.splice(this.deleteIndex, 1)
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
    createLeagueSettings () {
      const newLeagueSettings = {
        initialPagination: {
          rowsPerPage: 0 // infinite
        },
        columns: [
          { name: 'Key', required: true, label: 'Key', field: row => row.key, align: 'left' },
          { name: 'Value', required: true, label: 'Value', field: row => row.value, align: 'left' },
          { name: 'Actions', label: 'Actions', field: 'actions', align: 'right' }
        ],
        data: [

        ]
      }
      Object.keys(this.league).forEach(key => {
        if (!Array.isArray(this.league[key]))
          newLeagueSettings.data.push({
            key: key,
            value: this.league[key]
          })
      })
      this.leagueSettings = newLeagueSettings
    }
  },
  mounted () {
    if (this.league) {
      this.createLeagueSettings()
    }
  },
  watch: {
    league (newVal) {
      if (newVal) {
        this.createLeagueSettings()
      }
    }
  }
}
</script>
