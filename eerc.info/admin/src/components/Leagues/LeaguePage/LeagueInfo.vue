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
              <q-img :src="leagueImage" width="10rem" :ratio="1"/>
            </q-item-section>
            <q-item-label>
              <editable-text class="q-ma-none text-h5" :value="league.name" @input="changeLeagueProperty('name', $event)" :multiline="$q.platform.is.mobile || $q.screen.xs || $q.screen.sm"/>
              <p class="q-ma-none text-caption">{{league.id}}</p>
            </q-item-label>
          </q-item>
        </q-card-section>
        <q-card-section>
          <p class="q-ma-none text-subtitle1">Description</p>
          <editable-text class="q-mt-none" :value="league.description" @input="changeLeagueProperty('description', $event)" style="max-width:75vw" type="textarea"/>
          <p class="q-ma-none text-subtitle1">Short Description</p>
          <editable-text class="q-mt-none" :value="league.description_short" @input="changeLeagueProperty('description_short',$event)"/>
          <p class="q-ma-none text-subtitle1">Game</p>
          <editable-text class="q-mt-none" :value="league.game" @input="changeLeagueProperty('game',$event)"/>
          <p class="q-ma-none text-subtitle1">Sign Up Link</p>
          <editable-link :value="league.signupLink" @input="changeLeagueProperty('signupLink',$event)" class="q-mb-md"/>
          <p class="q-ma-none text-subtitle1">Google Drive Link</p>
          <editable-link :value="league.googleDrive" @input="changeLeagueProperty('googleDrive', $event)" class="q-mb-md"/>
        </q-card-section>
      </q-card>
</template>

<script>
import { openURL, extend } from 'quasar'
import EditableText from 'src/components/EditableText.vue'
import EditableLink from 'src/components/EditableLink.vue'
import deepEqual from 'deep-equal'
export default {
  components: { EditableText, EditableLink },
  data () {
    return {
      leagueImage: '',
      openURL: openURL,
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
      default: () => ''
    }
  },
  computed: {
    hasChanges () {
      return !deepEqual(this.league, this.$store.getters[`${this.leagueId}/info`])
    }
  },
  mounted () {
    this.imageSource()
  },
  methods: {
    changeLeagueProperty (key, value) {
      this.$store.commit(`edit_${this.leagueId}/setLeagueProperty`, { key: key, value: value })
    },
    discardChanges () {
      // this.editLeague = extend(true, {}, this.league)
      this.$store.dispatch(`edit_${this.leagueId}/resetLeagueInfo`)
    },
    publishChanges () {
      // Dispatch the editLeague object as changes to publish.
      this.publishing = true
      this.$store.dispatch(`edit_${this.leagueId}/publishInfoChanges`)
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
