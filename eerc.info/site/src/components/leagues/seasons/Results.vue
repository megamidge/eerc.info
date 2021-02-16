<template>
<q-dialog value  @before-hide="goBack">
  <q-card class="result-card" >
      <q-card-section class="bg-primary">
        <div class="row no-wrap justify-between items-center">
          <div class="row no-wrap items-center">
            <p class="q-ma-none text-h3 text-bold" style="opacity:0.6">{{ eventId }}</p>
            <q-icon name="img:/icons/flag/monaco.svg" size="2.8rem" class="q-mx-sm"/>
            <div class="column justify-end text-left">
              <p class="q-ma-none text-h6 text-uppercase ellipsis">{{event.location.region}}</p>
              <p class="q-ma-none text-subtitle1 ellipsis">{{event.location.country}}</p>
            </div>
          </div>
          <div class="row items-center">
            <q-btn v-close-popup icon="mdi-close" size="1.2rem" round flat/>
          </div>
        </div>
        </q-card-section>
        <q-card-section class="q-pa-none bg-secondary">
            <q-carousel
                v-model="resultsTab"
                arrows
                animated
                swipeable
                padding
                height="4rem"
                class="q-ma-none text-center bg-accent"
            >
                <q-carousel-slide v-for="session in sessions" :key="session.id" :name="session.id">
                    <p class="q-ma-none text-h5 text-uppercase ellipsis">{{ session.id }} - {{ session.name }}</p>
                </q-carousel-slide>
                <q-carousel-slide name="final">
                    <p class="q-ma-none text-h5 text-uppercase">Final</p>
                </q-carousel-slide>
            </q-carousel>
            <q-tab-panels
                v-model="resultsTab"
                animated
            >
                <template v-if="eventType==='rally'">
                <!-- these tables only exist for rally. -->
                    <q-tab-panel v-for="session in sessions" :key="session.id" :name="session.id" class="q-pa-none">
                        <q-table
                            :columns="tables.rallyStageTable.columns"
                            :hide-pagination="true"
                            :pagination="tables.rallyStageTable.pagination"
                            :data="results.find(r=>r.id===session.id).results"
                            square
                            :ref="`table_${session.id}`"
                            class="bg-secondary"
                            dense
                            :visible-columns="narrowWindow ? [] : tables.rallyStageTable.columns.map(c=>c.name)"
                        >
                            <template v-slot:header="props">
                                <q-tr :props="props" class="bg-accent">
                                    <q-th auto-width v-for="col in props.cols" :key="col.name" :props="props" class="text-bold text-uppercase">
                                        {{ col.label }}
                                    </q-th>
                                </q-tr>
                            </template>
                            <template v-slot:body="props">
                              <q-tr :props="props" :class="{'tinted':props.rowIndex % 2 === 0}">
                                <q-td :props="props" v-for="col in props.cols" :key="col.name" auto-width>
                                  <template v-if="col.name==='name'">
                                    <div class="row no-wrap items-center">
                                      <q-icon class="q-mr-xs" :name="`img:/icons/flag/${props.row.driver.countryCode}.svg`"/>
                                      {{ col.value }}
                                    </div>
                                  </template>
                                  <template v-else-if="col.name==='position'">
                                    {{ props.rowIndex+1 }}
                                  </template>
                                  <template v-else>
                                    {{col.value}}
                                  </template>
                                </q-td>
                              </q-tr>
                            </template>
                        </q-table>
                    </q-tab-panel>
                    <q-tab-panel name="final" class="q-pa-none">
                        <q-table
                            :columns="tables.rallyFinalTable.columns"
                            :hide-pagination="true"
                            :pagination="tables.rallyFinalTable.pagination"
                            :data="compoundResults"
                            dense
                            square
                            class="bg-secondary"
                            :visible-columns="narrowWindow ? [] : tables.rallyStageTable.columns.map(c=>c.name)"
                        >
                            <template v-slot:header="props">
                                <q-tr :props="props" class="bg-accent squared-borders">
                                    <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-bold text-uppercase">
                                        {{ col.label }}
                                    </q-th>
                                </q-tr>
                            </template>
                            <template v-slot:body="props">
                              <q-tr :props="props" :class="{'tinted':props.rowIndex % 2 === 0}">
                                <q-td :props="props" v-for="col in props.cols" :key="col.name" auto-width>
                                  <template v-if="col.name==='name'">
                                    <div class="row no-wrap items-center">
                                      <q-icon class="q-mr-xs" :name="`img:/icons/flag/${props.row.driver.countryCode}.svg`"/>
                                      {{ col.value }}
                                    </div>
                                  </template>
                                  <template v-else-if="col.name==='position'">
                                    {{ props.rowIndex+1 }}
                                  </template>
                                  <template v-else>
                                    {{col.value}}
                                  </template>
                                </q-td>
                              </q-tr>
                            </template>
                        </q-table>
                    </q-tab-panel>
                </template>
            </q-tab-panels>
            <p class="q-ma-none text-grey-5 text-center text-caption text-italic">
              EERC {{ leagueId }} {{ seasonId }} {{ event.name ? event.name : `Event ${event.id}`}} {{ resultsTab }} results.
            </p>
        </q-card-section>
    </q-card>
</q-dialog>
</template>

<script>
import { extend } from 'quasar'
export default {
  meta () {
    return {
      title: `${this.leagueId} ${this.seasonId} ${this.event.name ? this.event.name : `Event ${this.eventId}`} ${this.resultsTab} Results`,
      titleTemplate: title => `${title} | EERC.INFO`
    }
  },
  data () {
    return {
      resultsTab: 'final',
      tables: {
        rallyFinalTable: {
          pagination: {
            sortBy: 'time',
            descending: false,
            rowsPerPage: 0
          },
          columns: [
            {
              name: 'position',
              label: 'Pos.',
              align: 'left',
              required: true
            },
            {
              name: 'name',
              label: 'Driver',
              field: row => row.driver.name,
              required: true,
              align: 'left',
              classes: 'ellipsis'
            },
            {
              name: 'vehicle',
              label: 'Vehicle',
              field: 'vehicle',
              required: false,
              align: 'left'
            },
            {
              name: 'time',
              label: 'Event Time',
              field: 'time',
              required: true,
              align: 'left',
              sortable: true,
              sort: (a, b, rowA, rowB) => rowA.time - rowB.time,
              descending: true,
              format: (val) => this.formatTime(val)
            },
            {
              name: 'total-time-difference',
              label: 'Diff.',
              required: true,
              align: 'left',
              field: row => {
                const resultSet = this.compoundResults
                const emptyArr = []
                const rowsCopy = extend(true, emptyArr, resultSet)
                const firstRow = rowsCopy.sort((a, b) => this.getRowTotalTime(a) - this.getRowTotalTime(b))[0]
                if (row.driver.name === firstRow.driver.name) return 'Interval'
                const time = this.formatTime(this.getRowTotalTime(row) - this.getRowTotalTime(firstRow), { stripHours: true })
                return `+ ${time}`
              }
            }
          ]
        },
        rallyStageTable: {
          pagination: {
            sortBy: 'total-time',
            descending: false,
            rowsPerPage: 0
          },
          columns: [
            {
              name: 'position',
              label: 'Pos.',
              align: 'left',
              required: true
            },
            {
              name: 'name',
              label: 'Driver',
              field: row => row.driver.name,
              required: true,
              align: 'left',
              classes: 'ellipsis'
            },
            {
              name: 'vehicle',
              label: 'Vehicle',
              field: 'vehicle',
              required: false,
              align: 'left'
            },
            {
              name: 'time',
              label: 'Stage Time',
              field: 'time',
              required: true,
              align: 'left',
              sortable: true,
              sort: (a, b, rowA, rowB) => rowA.time - rowB.time,
              descending: true,
              format: (val) => this.formatTime(val)
            },
            {
              name: 'time-difference',
              label: 'Diff.',
              align: 'left',
              required: true,
              field: row => {
                const resultSet = this.results.find(r => r.id === this.resultsTab).results
                const emptyArr = []
                const rowsCopy = extend(true, emptyArr, resultSet)
                const firstRow = rowsCopy.sort((a, b) => a.time - b.time)[0]
                if (row.driver.name === firstRow.driver.name) return 'Interval'
                const time = this.formatTime(row.time - firstRow.time, { stripHours: true })
                return `+ ${time}`
              }
            },
            {
              name: 'total-time',
              label: 'Total Time',
              field: row => this.getRowTotalTime(row),
              required: false,
              align: 'left',
              sortable: true,
              sort: (a, b, rowA, rowB) => {
                const totalTimeA = this.getRowTotalTime(rowA)
                const totalTimeB = this.getRowTotalTime(rowB)
                return totalTimeA - totalTimeB
              },
              descending: true,
              format: (val) => this.formatTime(val)
            },
            {
              name: 'total-time-difference',
              label: 'Diff.',
              required: false,
              align: 'left',
              field: row => {
                const resultSet = this.results.find(r => r.id === this.resultsTab).results
                const emptyArr = []
                const rowsCopy = extend(true, emptyArr, resultSet)
                const firstRow = rowsCopy.sort((a, b) => this.getRowTotalTime(a) - this.getRowTotalTime(b))[0]
                if (row.driver.name === firstRow.driver.name) return 'Interval'
                const time = this.formatTime(this.getRowTotalTime(row) - this.getRowTotalTime(firstRow), { stripHours: true })
                return `+ ${time}`
              }
            }
          ]
        }
      }
    }
  },
  computed: {
    narrowWindow () {
      return this.$q.platform.is.mobile || this.$q.screen.width <= 770
    },
    leagueId () {
      return this.$route.params.league
    },
    seasonId () {
      return this.$route.params.season
    },
    eventId () {
      return this.$route.params.event
    },
    event () {
      const seasonEvents = this.$store.getters[`${this.leagueId}/${this.seasonId}/seasonEvents`]
      const event = seasonEvents.find(e => e.id === this.eventId)
      return event
    },
    eventType () {
      return this.event.type
    },
    sessions () {
      return this.$store.getters[`${this.leagueId}/${this.seasonId}/${this.eventId}/sessions`]
    },
    results () {
      var results = []
      this.sessions.forEach(session => {
        const sessionResults = this.$store.getters[`${this.leagueId}/${this.seasonId}/${this.eventId}/${session.id}/results`]
        results.push({ id: session.id, results: sessionResults })
      })
      return results
    },
    compoundResults () {
      if (this.eventType === 'rally') {
        // Overall results of a rally are calculated different (adding up time across stages).
        var compoundResults = []
        this.sessions.forEach(session => {
          const sessionResults = this.$store.getters[`${this.leagueId}/${this.seasonId}/${this.eventId}/${session.id}/results`]
          sessionResults.forEach(result => {
            const existingCompound = compoundResults.find(res => res.driver && res.driver.name.toLowerCase() === result.driver.name.toLowerCase())
            if (!existingCompound) {
              compoundResults.push({ ...result })
            } else {
              if (result.time) { existingCompound.time += result.time }
            }
          })
        })
        return compoundResults
      } else {
        return 'Result calculation not supported.'
      }
    }
  },
  methods: {
    goBack () {
      this.$router.push(`/Leagues/${this.leagueId}/`)
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
    },
    getRowTotalTime (row) {
      var results = []
      this.results.some(res => {
        var newRes = res.results.filter(r => r.driver.name.toLowerCase() === row.driver.name.toLowerCase())
        results.push(...newRes)
        if (res.id === this.resultsTab) return true
      })

      const reduced = results.reduce((total, current) => total + current.time, 0)
      return reduced
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
.q-dialog__inner--minimized > div {
  max-height: calc(100vh - 48px) !important;
}
</style>
<style lang="scss">
@media screen and (max-width:770px) {
  .q-table td, .q-table th{
      padding:1px !important;
      max-width:75px;
  }
}
</style>
