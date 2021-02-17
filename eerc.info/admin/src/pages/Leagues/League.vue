<template>
  <q-page class="q-pa-md column" v-if="league">
      <q-card>
        <q-card-section class="column items-stretch">
          <q-item :class="{'column items-center text-center':$q.platform.is.mobile || $q.screen.xs}">
            <q-item-section avatar>
              <q-icon :name="`img:${leagueImage}`" size="10rem"/>
            </q-item-section>
            <q-item-label>
              <editable-text class="q-ma-none text-h5" v-model="league.name" :multiline="$q.platform.is.mobile || $q.screen.xs || $q.screen.sm"/>
              <p class="q-ma-none text-caption">{{league.id}}</p>
            </q-item-label>

          </q-item>
        </q-card-section>
        <q-card-section>
          <p class="q-ma-none text-subtitle1">Description</p>
          <editable-text class="q-mt-none" v-model="league.description" style="max-width:75vw" multiline/>
          <p class="q-ma-none text-subtitle1">Short Description</p>
          <editable-text class="q-mt-none" v-model="league.description_short"/>
          <p class="q-ma-none text-subtitle1">Game</p>
          <editable-text class="q-mt-none" v-model="league.game"/>
          <p class="q-ma-none text-subtitle1">Sign Up Link</p>
          <p class="q-mt-none ellipsis text-link" style="max-width:75vw" @click="openURL(league.signupLink)">{{ league.signupLink }}</p>
          <p class="q-ma-none text-subtitle1">Google Drive Link</p>
          <p class="q-mt-none ellipsis text-link" style="max-width:75vw" @click="openURL(league.googleDrive)">{{ league.googleDrive }}</p>
        </q-card-section>
      </q-card>
  </q-page>
  <q-page class="flex flex-center" v-else>
    <q-spinner size="50vw"/>
  </q-page>
</template>

<script>
import { openURL } from 'quasar'
import EditableText from 'src/components/EditableText.vue'
export default {
  components: { EditableText },
  data () {
    return {
      leagueImage: '',
      openURL: openURL
    }
  },
  computed: {
    leagueId () {
      return this.$route.params.leagueId
    },
    league () {
      return this.$store.getters['data/league'](this.leagueId)
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
    imageSource () {
      this.$firebase.leagueStorageRef().child(`${this.leagueId}.png`)
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
        this.$store.dispatch('data/registerLeagueModule', this.league).then(() => {
          // module has been resgister, get it to fetch data
          this.$store.dispatch(`${this.league.id}/fetchLeague`, this.league.id)
        })
      }
    }
  }
}
</script>

<style>

</style>
