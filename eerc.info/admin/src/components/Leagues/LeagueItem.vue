<template>
  <div class="q-pa-sm">
        <q-card class="full-height column items-stretch">
          <q-card-section class="row no-wrap items-center">
            <q-img :src="leagueImage" :ratio="1" height="2.6rem" width="2.6rem"/>
            <div class="column justify-start items-start col q-pl-md">
                <p class="q-ma-none text-h6">{{ league.name }}</p>
                <p class="q-ma-none text-caption text-grey-4">{{ league.id }}</p>
            </div>
          </q-card-section>
          <q-card-section>
              <template v-if="seasons && seasons.length > 0">
                <p class="q-ma-none text-subtitle1">{{ seasons[seasons.length-1].id }}</p>
                <p class="q-ma-none">//Current/Upcoming event information. (I don't store dates yet lmaooo)</p>
              </template>
              <template v-else>
                  No seasons yet.
              </template>
          </q-card-section>
          <q-card-section class="row wrap justify-start">
              <div class="row no-wrap items-center q-ma-sm">
                <p class="q-ma-none text-no-wrap q-mr-md text-subtitle2">Sign Up:</p>
                <q-btn icon="mdi-content-copy" label="Copy" color="primary" @click="copy(league.signupLink)"/>
              </div>
              <div class="row no-wrap items-center q-ma-sm">
                <p class="q-ma-none text-no-wrap q-mr-md text-subtitle2">Google Drive:</p>
                <q-btn icon="mdi-content-copy" label="Copy" color="primary" @click="copy(league.signupLink)"/>
              </div>
          </q-card-section>
          <q-card-actions class="row justify-between">
            <p class="q-ma-none text-body1">{{ league.description_short }}</p>
            <q-btn color="secondary" :to="`/Leagues/${league.id}`" label="View/Edit League"/>
          </q-card-actions>
        </q-card>
      </div>
</template>

<script>
import { copyToClipboard, openURL } from 'quasar'
export default {
  data () {
    return {
      openURL: openURL,
      leagueImage: '',
      leagueWatcher: null
    }
  },
  props: {
    league: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    seasons () {
      return this.$store.getters[`${this.league.id}/seasons`]
    }
  },
  created () {
    // fetch the extra information for this league (seasons and events).
    if (!this.league) { this.leagueWatcher = this.$watch('league', this.leagueDispatch, { immediate: true }) } else this.leagueDispatch()
  },
  mounted () {
    this.imageSource()
  },
  methods: {
    copy (content) {
      copyToClipboard(content)
        .then(() => {
          this.$q.notify({ message: 'Copied to clipboard.', icon: 'mdi-content-copy', timeout: 500 })
        }).catch((error) => {
          console.log(error)
        })
    },
    imageSource () {
      this.$firebase.leagueStorageRef().child(`${this.league.id}.png`)
        .getDownloadURL()
        .then(url => {
          this.leagueImage = url
        })
        .catch(error => {
          console.error(error.message)
        })
    },
    leagueDispatch () {
      if (this.league) {
        this.$store.dispatch('data/registerLeagueModule', this.league.id).then(() => {
          // module has been resgister, get it to fetch data
          this.$store.dispatch(`${this.league.id}/fetchLeague`, { leagueId: this.league.id, sync: true })
        })
        if (this.leagueWatcher) { this.leagueWatcher() }
      }
    }
  }
}
</script>

<style>

</style>
