<template>
<q-dialog value  @before-hide="goBack">
    <q-card class="result-card">
        <q-card-section class="bg-primary">
            <div class="row justify-between items-center">
                <div class="row">
                    <p class="q-ma-none text-h3 text-bold" style="opacity:0.6">{{ eventId }}</p>
                    <p class="q-ma-none q-ml-md text-h3 text-bold">Results</p>
                </div>
                <div class="row items-center">
                    <div class="column justify-end text-right">
                        <p class="q-ma-none text-h6 text-uppercase">{{event.location.region}}</p>
                        <p class="q-ma-none text-subtitle1">{{event.location.country}}</p>
                    </div>
                    <q-icon name="img:/icons/flag/monaco.svg" size="2.8rem" class="q-ml-sm"/>
            </div>
        </div>
        </q-card-section>
        <q-card-section class="q-pa-none">
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
                <q-carousel-slide name="full">
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
                            :pagination="tables.rallyStageTable.pagination"
                            :data="results.find(r=>r.id===session.id).results"
                            square
                            class="bg-secondary"
                        >
                            <template v-slot:header="props">
                                <q-tr :props="props" class="bg-accent squared-borders">
                                    <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-bold text-uppercase">
                                        {{ col.label }}
                                    </q-th>
                                </q-tr>
                            </template>
                            <template v-slot:body-cell-flag="props">
                                <q-td :props="props" auto-width :class="{'tinted':props.rowIndex % 2 === 0}">
                                    <q-icon :name="`img:/icons/flag/${props.value}.svg`"/>
                                </q-td>
                            </template>
                            <template v-slot:body-cell-position="props">
                                <q-td :props="props" auto-width :class="{'tinted':props.rowIndex % 2 === 0}">
                                    {{props.rowIndex + 1}}
                                </q-td>
                            </template>
                            <template v-slot:body-cell="props">
                                <q-td :props="props" :class="{'tinted':props.rowIndex % 2 === 0}">
                                    {{props.value}}
                                </q-td>
                            </template>
                        </q-table>
                    </q-tab-panel>
                    <q-tab-panel name="full" class="q-pa-none">
                        <q-table
                            :columns="tables.rallyFinalTable.columns"
                            :pagination="tables.rallyFinalTable.pagination"
                            :data="compoundResults"
                            square
                            class="bg-secondary"
                        >
                            <template v-slot:header="props">
                                <q-tr :props="props" class="bg-accent squared-borders">
                                    <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-bold text-uppercase">
                                        {{ col.label }}
                                    </q-th>
                                </q-tr>
                            </template>
                            <template v-slot:body-cell-flag="props">
                                <q-td :props="props" auto-width :class="{'tinted':props.rowIndex % 2 === 0}">
                                    <q-icon :name="`img:/icons/flag/${props.value}.svg`"/>
                                </q-td>
                            </template>
                            <template v-slot:body-cell-position="props">
                                <q-td :props="props" auto-width :class="{'tinted':props.rowIndex % 2 === 0}">
                                    {{props.rowIndex + 1}}
                                </q-td>
                            </template>
                            <template v-slot:body-cell="props">
                                <q-td :props="props" :class="{'tinted':props.rowIndex % 2 === 0}">
                                    {{props.value}}
                                </q-td>
                            </template>
                        </q-table>
                    </q-tab-panel>
                </template>
            </q-tab-panels>
        </q-card-section>
    </q-card>
</q-dialog>
</template>

<script>
// import { date as dateUtils } from 'quasar'
export default {
  data () {
    return {
      resultsTab: 'full',
      tables: {
        rallyFinalTable: {
          pagination: {
            sortBy: 'time',
            descending: false,
            rowsPerPage: 30
          },
          columns: [
            {
              name: 'position',
              align: 'left'
            },
            {
              name: 'flag',
              align: 'left',
              field: row => row.driver.countryCode
            },
            {
              name: 'name',
              label: 'Driver',
              field: row => row.driver.name,
              required: true,
              align: 'left'
            },
            {
              name: 'vehicle',
              label: 'Vehicle',
              field: 'vehicle',
              required: true,
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
              format: (val) => {
                var milliseconds = parseInt((val % 1000)),
                  seconds = Math.floor((val / 1000) % 60),
                  minutes = Math.floor((val / (1000 * 60)) % 60),
                  hours = Math.floor((val / (1000 * 60 * 60)) % 24)

                hours = (hours < 10) ? '0' + hours : hours
                minutes = (minutes < 10) ? '0' + minutes : minutes
                seconds = (seconds < 10) ? '0' + seconds : seconds

                return hours + ':' + minutes + ':' + seconds + '.' + milliseconds
              }
            }
          ]
        },
        rallyStageTable: {
          pagination: {
            sortBy: 'total-time',
            descending: false,
            rowsPerPage: 30
          },
          columns: [
            {
              name: 'position',
              align: 'left'
            },
            {
              name: 'flag',
              align: 'left',
              field: row => row.driver.countryCode
            },
            {
              name: 'name',
              label: 'Driver',
              field: row => row.driver.name,
              required: true,
              align: 'left'
            },
            {
              name: 'vehicle',
              label: 'Vehicle',
              field: 'vehicle',
              required: true,
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
              format: (val) => {
                var milliseconds = parseInt((val % 1000)),
                  seconds = Math.floor((val / 1000) % 60),
                  minutes = Math.floor((val / (1000 * 60)) % 60),
                  hours = Math.floor((val / (1000 * 60 * 60)) % 24)

                hours = (hours < 10) ? '0' + hours : hours
                minutes = (minutes < 10) ? '0' + minutes : minutes
                seconds = (seconds < 10) ? '0' + seconds : seconds

                return hours + ':' + minutes + ':' + seconds + '.' + milliseconds
              }
            },
            {
              name: 'total-time',
              label: 'Total Time',
              field: row => {
                var results = []
                this.results.some(res => {
                  var newRes = res.results.filter(r => r.driver.name.toLowerCase() === row.driver.name.toLowerCase())
                  results.push(...newRes)
                  if (res.id === this.resultsTab) return true
                })

                const reduced = results.reduce((total, current) => total + current.time, 0)
                return reduced
              },
              required: true,
              align: 'left',
              sortable: true,
              sort: (a, b, rowA, rowB) => rowA.time - rowB.time,
              descending: true,
              format: (val) => {
                var milliseconds = parseInt((val % 1000)),
                  seconds = Math.floor((val / 1000) % 60),
                  minutes = Math.floor((val / (1000 * 60)) % 60),
                  hours = Math.floor((val / (1000 * 60 * 60)) % 24)

                hours = (hours < 10) ? '0' + hours : hours
                minutes = (minutes < 10) ? '0' + minutes : minutes
                seconds = (seconds < 10) ? '0' + seconds : seconds

                return hours + ':' + minutes + ':' + seconds + '.' + milliseconds
              }
            }
          ]
        }
      }
    }
  },
  computed: {
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
</style>
