<template>
  <q-card class="result-card">
      <q-card-section class="row items-start justify-between">
          <div>
            <p class="q-ma-none text-h6">Results</p>
            <p class="q-ma-none text-body-2">{{session.id}}: {{session.name}}</p>
          </div>
          <q-btn :disable="hasChanges" icon="mdi-close" v-close-popup flat round/>
      </q-card-section>
      <q-card-actions v-if="hasChanges" class="bg-info row items-center justify-between">
          <p class="q-ma-none text-subtitle2">You have unsaved changes.</p>
          <div class="row no-wrap">
            <q-btn unelevated class="q-mr-sm" label="Discard" @click="discardChanges"/>
            <q-btn unelevated color="white" text-color="info"  label="Save and Close" @click="saveChanges"/>
          </div>
      </q-card-actions>
      <q-card-section class="q-pa-xs">
          <q-table
            :columns="tables[eventType].columns"
            :pagination="tables[eventType].pagination"
            :data="editResults"
            dense
            flat
            hide-pagination
            row-key="name"
          >
            <template v-slot:header="props">
                <q-tr :props="props" class="bg-secondary">
                    <q-th auto-width v-for="col in props.cols" :key="col.name" :props="props" class="text-bold text-upeprcase">
                        {{ col.label }}
                    </q-th>
                </q-tr>
            </template>
            <template v-slot:body="props">
                <q-tr :props="props" :class="{'tinted':props.rowIndex%2===0}" :key="props.row.driver.name">
                    <q-td :props="props" v-for="col in props.cols" :key="col.name"
                        :auto-width="col.name === 'position' || col.name === 'delete'"
                        class="flash-in"
                    >
                        <template v-if="col.name==='name'">
                            <editable-driver :value="props.row.driver" @input="col.edit($event, props.row)"/>
                        </template>
                        <template v-else-if="col.name==='position'">
                            {{ props.rowIndex + 1 }}
                        </template>
                        <template v-else-if="col.name==='delete'">
                            <q-btn dense icon="mdi-delete" flat @click="deleteRow(props.row)"/>
                        </template>
                        <template v-else-if="col.name === 'time'">
                            <editable-time class="q-ma-none" :value="col.value" @input="col.edit($event,props.row)"/>
                        </template>
                        <template v-else-if="col.editable">
                            <q-input dense :value="col.value" @input="col.edit($event, props.row)"/>
                        </template>
                        <template v-else>
                            {{col.value}}
                        </template>
                    </q-td>
                </q-tr>
            </template>
            <template v-slot:bottom-row>
                <q-tr>
                    <q-td colspan="100%">
                        <div class="row items-center justify-center">
                            <q-btn label="Add Row" icon="mdi-plus-circle" @click="addRow"/>
                        </div>
                    </q-td>
                </q-tr>
            </template>
          </q-table>
      </q-card-section>
  </q-card>
</template>

<script>
import { extend } from 'quasar'
import deepEqual from 'deep-equal'
import EditableTime from 'components/EditableTime'
import countryCodes from 'assets/countryCodes.json'
import EditableDriver from 'src/components/EditableDriver.vue'
export default {
  components: { EditableTime, EditableDriver },
  props: {
    results: {
      type: Array,
      default: () => []
    },
    session: {
      type: Object,
      default: () => {}
    },
    eventType: {
      type: String,
      default: () => ''
    }
  },
  data () {
    return {
      countryCodes: countryCodes.codes,
      editResults: null,
      tables: {
        rally: {
          pagination: {
            sortBy: 'time',
            descending: false,
            rowsPerPage: 0
          },
          columns: [
            {
              name: 'delete',
              align: 'left',
              required: true,
              editable: false
            },
            {
              name: 'position',
              label: 'Pos.',
              align: 'left',
              required: true,
              editable: false
            },
            {
              name: 'name',
              label: 'Driver',
              field: row => row.driver.name,
              required: true,
              align: 'left',
              classes: 'ellipsis',
              editable: true,
              edit: (val, row) => {
                const rowToModify = this.editResults.findIndex(r => {
                  return deepEqual(r, row)
                })
                this.editResults[rowToModify].driver = val
              }
            },
            {
              name: 'vehicle',
              label: 'Vehicle',
              field: 'vehicle',
              required: false,
              align: 'left',
              editable: true,
              edit: (val, row) => {
                const rowToModify = this.editResults.findIndex(r => {
                  return deepEqual(r, row)
                })
                this.editResults[rowToModify].vehicle = val
              }
            },
            {
              name: 'time',
              label: 'Stage Time',
              field: 'time',
              required: true,
              align: 'left',
              sortable: true,
              sort: (a, b, rowA, rowB) => rowA.time - rowB.time,
              descnding: true,
              format: (val) => this.formatTime(val, { stripHours: true }),
              editable: true,
              edit: (val, row) => {
                // parse the input and apply it.
                const split1 = val.split('.') // seperate the millis from the others
                var millis = parseInt(split1[1].padEnd(3, '0'))
                const split2 = split1[0].split(':').reverse() // reverse so we can go in order to get each bit.
                var seconds = parseInt(split2[0])
                var minutes = parseInt(split2[1])
                var hours = parseInt(split2[2])
                var totalMillis = millis
                if (seconds && !isNaN(seconds)) totalMillis += seconds * 1000
                if (minutes && !isNaN(minutes)) totalMillis += minutes * 60000
                if (hours && !isNaN(hours)) totalMillis += hours * 3600000
                const rowToModify = this.editResults.findIndex(r => {
                  return deepEqual(r, row)
                })
                // this.editResults[rowToModify].time = totalMillis
                this.editResults[rowToModify].time = parseInt(totalMillis)
              }
            },
            {
              name: 'time-difference',
              label: 'Diff.',
              align: 'left',
              required: true,
              field: row => {
                const resultSet = this.editResults
                const emptyArr = []
                const rowsCopy = extend(true, emptyArr, resultSet)
                const firstRow = rowsCopy.sort((a, b) => a.time - b.time)[0]
                if (row.driver.name === firstRow.driver.name) return 'Interval'
                const time = this.formatTime(row.time - firstRow.time, { stripHours: true })
                return `+ ${time}`
              },
              editable: false
            }
          ]
        }
      }
    }
  },
  computed: {
    hasChanges () {
      return !deepEqual(this.results, this.editResults)
    }
  },
  methods: {
    discardChanges () {
      this.editResults = extend(true, [], this.results)
    },
    saveChanges () {
      this.$emit('input', this.editResults)
      this.$emit('close')
    },
    deleteRow (row) {
      const rowToDel = this.editResults.findIndex(r => {
        return deepEqual(r, row)
      })
      this.$delete(this.editResults, rowToDel)
    },
    addRow () {
      console.log('addRow')
      // switch based on eventType...
      switch (this.eventType) {
        case 'rally': {
          this.editResults.push({
            driver: {
              name: 'New Driver',
              countryCode: 'european-union'
            },
            vehicle: 'Vehicle',
            time: null
          })
          break
        }
        default:break
      }
    },
    // formats a millisecond timestamp as  hh:mm:ss:sss.
    // strip object allows to omit hours, minutes, seconds from return value.
    formatTime (val, strip = { stripHours: false, stripMinutes: false, stripSeconds: false }) {
      var milliseconds = ('000' + parseInt((val % 1000))).slice(-3),
        seconds = Math.floor((val / 1000) % 60),
        minutes = Math.floor((val / (1000 * 60)) % 60),
        hours = Math.floor((val / (1000 * 60 * 60)) % 24)

      hours = (hours < 10) ? '0' + hours : hours
      minutes = (minutes < 10) ? '0' + minutes : minutes
      seconds = (seconds < 10) ? '0' + seconds : seconds
      const hoursStr = strip.stripHours ? '' : `${hours}:`
      const minuteStr = strip.stripMinutes ? '' : `${minutes}:`
      const secondsStr = strip.stripSeconds ? '' : `${seconds}.`
      return hoursStr + minuteStr + secondsStr + milliseconds
    }
  },
  watch: {
    results: {
      immediate: true,
      handler () {
        this.editResults = extend(true, [], this.results)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.result-card {
    width:100vw;
    max-width:$breakpoint-lg-min;
}
.tinted {
    background:rgba(0,0,0,0.25)
}
@keyframes flash-in {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.flash-in {
    position: relative;
    &:after {
        content: '';
        position:absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: var(--q-color-secondary);
        opacity: 0;
        animation-name: flash-in;
        animation-duration: 1s;
        animation-iteration-count: 1;
    }
}
</style>
