<template>
  <q-card>
        <q-card-actions v-if="hasChanges" class="bg-info row no-wrap justify-between">
          <q-icon name="mdi-information-outline" size="1.4rem" class="q-mr-sm"/>
          <p class="q-ma-none text-subtitle1">You have unsaved changes.</p>
          <q-space/>
          <q-btn label="Discard" unelevated @click="discardChanges" :disable="publishing"/>
          <q-btn label="Publish" color="white" text-color="info" unelevated @click="publishChanges" :loading="publishing"/>
        </q-card-actions>
        <q-card-section class="column items-stretch">
          <q-item :class="{'column items-center text-center':$q.platform.is.mobile || $q.screen.xs}">
            <q-item-section avatar>
              <q-icon :name="`img:${leagueImage}`" size="10rem"/>
            </q-item-section>
            <q-item-label>
              <editable-text class="q-ma-none text-h5" v-model="editLeague.name" :multiline="$q.platform.is.mobile || $q.screen.xs || $q.screen.sm"/>
              <p class="q-ma-none text-caption">{{league.id}}</p>
            </q-item-label>
          </q-item>
        </q-card-section>
        <q-card-section>
          <p class="q-ma-none text-subtitle1">Description</p>
          <editable-text class="q-mt-none" v-model="editLeague.description" style="max-width:75vw" type="textarea"/>
          <p class="q-ma-none text-subtitle1">Short Description</p>
          <editable-text class="q-mt-none" v-model="editLeague.description_short"/>
          <p class="q-ma-none text-subtitle1">Game</p>
          <editable-text class="q-mt-none" v-model="editLeague.game"/>
          <p class="q-ma-none text-subtitle1">Sign Up Link</p>
          <p class="q-mt-none ellipsis text-link" style="max-width:75vw" @click="openURL(league.signupLink)">{{ league.signupLink }}</p>
          <p class="q-ma-none text-subtitle1">Google Drive Link</p>
          <p class="q-mt-none ellipsis text-link" style="max-width:75vw" @click="openURL(league.googleDrive)">{{ league.googleDrive }}</p>
        </q-card-section>
      </q-card>
</template>

<script>
import deepEqual from 'deep-equal'
import { openURL, extend } from 'quasar'
import EditableText from 'src/components/EditableText.vue'
export default {
  components: { EditableText },
  data () {
    return {
      leagueImage: '',
      openURL: openURL,
      editLeague: null,
      publishing: false
    }
  },
  props: {
    league: {
      type: Object,
      default: () => {}
    },
    leagueId: {
      type: String,
      default: () => null
    }
  },
  computed: {
    hasChanges () {
      return !deepEqual(this.editLeague, this.league)
    }
  },
  mounted () {
    this.imageSource()
  },
  methods: {
    discardChanges () {
      this.editLeague = extend(true, {}, this.league)
    },
    publishChanges () {
      // Dispatch the editLeague object as changes to publish.
      this.publishing = true
      this.$store.dispatch(`${this.leagueId}/publishChanges`, { leagueId: this.leagueId, changes: this.editLeague })
        .then(() => {
          this.$q.notify({
            position: 'top',
            type: 'positive',
            message: 'Your changes have been published.'
          })
        }).catch(error => {
          console.error(error)
          this.$q.notify({
            position: 'top',
            type: 'negative',
            message: 'Oops. Something went wrong.'
          })
        }).finally(() => {
          this.publishing = false
        })
    },
    imageSource () {
      this.$firebase.leagueStorageRef().child(`${this.leagueId}.png`)
        .getDownloadURL()
        .then(url => {
          this.leagueImage = url
        })
        .catch(error => {
          console.error(error.message)
        })
    }
  },
  watch: {
    league: {
      immediate: true,
      handler () {
        this.editLeague = extend(true, {}, this.league)
      }
    }
  }

}
</script>

<style>

</style>
