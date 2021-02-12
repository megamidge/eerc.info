<template>
  <div>
    <q-table title="Events"
      :data="eventSettings.data"
      :columns="eventSettings.columns"
      :visible-columns="eventSettings.visibleColumns"
      :pagination="eventSettings.initialPagination"
      class="q-table--wrap"
      dense>
      <template v-slot:bottom>
        <div style="width: 100%" class="flex row items-center justify-end">
          <q-btn label="Add" icon-right="add" class="bg-primary" @click="showDialog = true; editing = false"/>
          <q-dialog v-model="showDialog">
            <q-card>
              <q-card-section class="q-pb-none">
                <h6 class="q-ma-none">{{ editing ? 'Edit Item' : 'Add Item'}}</h6>
              </q-card-section>
              <q-card-section class="q-pt-none">
                <p>Add Event</p>
              </q-card-section>
              <q-card-actions class="q-pt-none" align="right">
                <q-btn error="e" :label="editing ? 'Edit' : 'Add'" @click="addRow"/>
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </template>
    </q-table>
    <p>{{ events }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      eventSettings: {},
      showDeleteDialog: false,
      deleteIndex: -1,
      dateFormat: {
        weekday: undefined,
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short'
      },
      showDialog: false,
      editing: false,
      addError: {
      },
      editedItem: {
        sessions: []
      }
    }
  },
  props: {
    events: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    addRow () {
      if (this.editedIndex > -1) {
        Object.assign(this.eventSettings.data[this.editedIndex], this.editedItem)
      } else {
        this.eventSettings.data.push(this.editedItem)
      }
      this.close()
      this.addError = false
    },
    close () {
      this.showDialog = false
      this.showDeleteDialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, { sessions: [] })
        this.editedIndex = -1
        this.deleteIndex = -1
        this.editing = false
      }, 300)
    },
    createEventsSettings () {
      const newEventSettings = {
        initialPagination: {
          rowsPerPage: 0 // infinite
        },
        columns: [
          { name: 'index', label: 'Index', align: 'left' },
          { name: 'name', label: 'Name', field: row => row.name, align: 'left' },
          { name: 'start', required: true, label: 'Start', field: row => row.start },
          { name: 'finish', required: true, label: 'Finish', field: row => row.finish },
          { name: 'location', label: 'Location', field: row => row.location },
          { name: 'country', label: 'Country', field: row => row.country },
          { name: 'sessionCount', label: 'Sessions', field: row => row.sessions.length }
        ],
        data: [],
        visibleColumns: ['index']
      }
      let i = 0
      this.events.forEach(event => {
        const eventObj = {
          index: i
        }
        Object.keys(event).forEach(key => {
          if (key === 'start' || key === 'finish') {
            const date = new Date(event[key].seconds * 1000).toLocaleString(undefined, this.dateFormat)
            eventObj[key] = date
          } else {
            eventObj[key] = event[key]
          }
          if (key === 'sessions') {
            const sessionCount = event[key].length
            eventObj.sessionCount = sessionCount
            newEventSettings.visibleColumns.push('sessionCount')
          }

          newEventSettings.visibleColumns.push(key)
        })

        newEventSettings.data.push(eventObj)

        i++
      })
      this.eventSettings = newEventSettings
    }
  },
  mounted () {
    if (this.events) {
      this.createEventsSettings()
    }
  },
  watch: {
    events (newVal) {
      if (newVal) {
        this.createEventsSettings()
      }
    }
  }
}
</script>
