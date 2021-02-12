<template>
  <q-page class="column" v-if="league">
      <q-card class="row no-wrap q-ma-md">
        <q-card-section class="q-pa-md col-3 flex flex-center">
            <q-img :src="leagueImage" :ratio="1" contain/>
        </q-card-section>
        <q-card-section class="column items-start col-9">
            <p class="q-ma-none q-mb-xs text-h6">{{ league.name }}</p>
            <p class="q-ma-none text-body2 text-weight-light">{{ league.description }}</p>
            <q-btn color="accent" label="Take part" class="full-width q-my-md" @click="openURL(league.signupLink)"/>
            <q-space/>
            <div class="row no-wrap">
                <div class="row items-center">
                <p class="q-ma-none text-subtitle1">Game:</p>
                <p class="q-ma-none q-ml-sm text-subtitle1 text-weight-light">{{ league.game }}</p>
                </div>
            </div>
        </q-card-section>
      </q-card>
  </q-page>
  <q-page v-else class="flex flex-center">
      <q-spinner size="25vw" />
  </q-page>
</template>

<script>
import { openURL } from 'quasar'
export default {
  data () {
    return {
      leagueImage: '',
      openURL: openURL
    }
  },
  created () {
    if (!this.league) this.$store.dispatch('data/getLeagues')
  },
  computed: {
    league () {
      return this.$store.getters['data/league'](this.$route.params.league)
    }
  },
  mounted () {
    if (this.league) this.imageSource()
  },
  watch: {
    league () {
      if (this.league) this.imageSource()
    }
  },
  methods: {
    imageSource () {
      this.$firebase.leagueStorageRef().child(`${this.league.id}.png`)
        .getDownloadURL()
        .then(url => {
          this.leagueImage = url
        })
        .catch(error => {
          console.error(error.message)
        })
    }
  }
}
</script>
