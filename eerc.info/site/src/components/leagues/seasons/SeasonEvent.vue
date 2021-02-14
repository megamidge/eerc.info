<template>
  <q-img :src="eventImage" :ratio="3/2" class="rounded-borders">
    <div class="absolute-full column no-wrap justify-between items-stretch event">
      <div class="row justify-between items-center">
        <div class="row items-center">
          <q-icon name="img:/icons/flag/monaco.svg" size="2.8rem" class="q-mr-sm"/>
          <div class="column justify-start">
            <p class="q-ma-none text-h6 text-uppercase">{{event.location.region}}</p>
            <p class="q-ma-none text-subtitle1">{{event.location.country}}</p>
          </div>
        </div>
        <p class="q-ma-none text-h3 text-bold" style="opacity:0.6">{{ event.id }}</p>
      </div>
      <q-space/>
      <div class="row no-wrap">
        <div class="column col-9 text-left" v-if="results && results.length > 0">
          <div class="row items-center no-wrap">
            <q-icon name="mdi-trophy" color="yellow-8" size="2rem"/>
            <p class="ellipsis q-ma-none q-mr-sm q-pr-xs text-h5 text-uppercase text-bold text-italic">{{results[0].driver.name}}</p>
            <q-icon :name="`img:/icons/flag/${results[0].driver.countryCode}.svg`" size="1.2rem"/>
          </div>
          <div class="row items-center no-wrap">
            <q-icon name="mdi-trophy-variant" color="blue-grey-8" size="2rem"/>
            <p class="ellipsis q-ma-none q-mr-sm q-pr-xs text-h6 text-grey-5 text-uppercase text-bold text-italic">{{results[1].driver.name}}</p>
            <q-icon :name="`img:/icons/flag/${results[1].driver.countryCode}.svg`" size="1rem"/>
          </div>
          <div class="row items-center no-wrap">
            <q-icon name="mdi-trophy-variant" color="brown-8" size="2rem"/>
            <p class="ellipsis q-ma-none q-mr-sm q-pr-xs text-grey-7 text-uppercase text-bold text-italic">{{results[2].driver.name}}</p>
            <q-icon :name="`img:/icons/flag/${results[2].driver.countryCode}.svg`" size="0.8rem"/>
          </div>
          <q-btn label="View Full Results" flat padding="sm" class="text-left text-italic text-caption self-start" :to="`/Leagues/${leagueId}/${seasonId}/${event.id}/results`"/>
            <router-view/>
        </div>
        <p class="q-ma-none col text-right text-subtitle2 text-uppercase self-end">{{sessions.length}} {{ sessionsLabel }}</p>
      </div>
    </div>
  </q-img>
</template>

<script>
export default {
  props: {
    leagueId: {
      type: String,
      default: () => ''
    },
    seasonId: {
      type: String,
      default: () => ''
    },
    event: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    sessionsLabel () {
      switch (this.event.type) {
        case 'rally': return 'Stages'
        default: return 'Sessions'
      }
    },
    sessions () {
      return this.$store.getters[`${this.leagueId}/${this.seasonId}/${this.event.id}/sessions`]
    },
    results () {
      if (this.event.type === 'rally') {
        // Overall results of a rally are calculated different (adding up time across stages).
        var compoundResults = []
        this.sessions.forEach(session => {
          const sessionResults = this.$store.getters[`${this.leagueId}/${this.seasonId}/${this.event.id}/${session.id}/results`]
          sessionResults.forEach(result => {
            const existingCompound = compoundResults.find(res => res.driver && res.driver.name.toLowerCase() === result.driver.name.toLowerCase())
            if (!existingCompound) {
              compoundResults.push({ ...result })
            } else {
              if (result.time) { existingCompound.time += result.time }
            }
          })
        })
        return compoundResults.sort((r1, r2) => r1.time - r2.time).slice(0, 3)
      } else {
        return 'Result calculation not supported.'
      }
    }
  },
  data () {
    return {
      eventImage: ''
    }
  },
  mounted () {
    this.imageSource()
  },
  methods: {
    imageSource () {
      this.$firebase.leagueStorageRef().child(`${this.event.image}`)
        .getDownloadURL()
        .then(url => {
          this.eventImage = url
        })
        .catch(error => {
          console.error(error.message)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.event {
  background: rgba(0,0,0,0.35);
}
</style>
