<template>
  <q-card>
    <q-card-actions v-if="hasDeleted" class="bg-info row no-wrap justify-between">
        <q-icon name="mdi-information-outline" size="1.4rem" class="q-mr-sm"/>
        <p class="q-ma-none text-subtitle1">You have deleted {{ deletedSeasons.length }} seasons.</p>
        <q-space/>
        <q-btn label="Undo" unelevated @click="undoDeletes" :disable="publishing"/>
        <q-btn label="Delete Permanently" color="white" text-color="info" unelevated @click="publishDeletes" :loading="publishing"/>
    </q-card-actions>
    <div class="bg-primary row no-wrap justify-end">
      <q-carousel
        v-model="seasonTab"
        class="col q-ma-none text-center bg-primary rounded-top-border"
        arrows animated swipeable height="4rem"
      >
        <q-carousel-slide v-for="season in seasons" :name="season.id" :key="season.id">
          <p class="q-ma-none text-h5 text-uppercase">{{ season.id }}</p>
        </q-carousel-slide>
      </q-carousel>
      <q-btn icon="mdi-plus-box" flat @click="showAddSeasonDialog = true">
        <q-tooltip>
          <p class="q-ma-none text-center">Create a new season.</p>
        </q-tooltip>
      </q-btn>
      <q-dialog v-model="showAddSeasonDialog">
        <add-season @submit="addSeason"/>
      </q-dialog>
    </div>
    <q-tab-panels v-model="seasonTab" animated>
      <q-tab-panel v-for="season in seasons" :key="season.id" :name="season.id" class="q-pa-none">
        <season :season="season" :leagueId="leagueId" @delete="deleteSeason(season.id)"/>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import Season from 'components/Leagues/LeaguePage/Seasons/Season'
import AddSeason from './Seasons/AddSeason.vue'
export default {
  components: {
    Season,
    AddSeason
  },
  props: {
    seasons: {
      type: Array,
      default: () => []
    },
    leagueId: {
      type: String,
      default: () => ''
    }
  },
  data () {
    return {
      seasonTab: '',
      showAddSeasonDialog: false,
      publishing: false
    }
  },
  computed: {
    hasDeleted () {
      return this.deletedSeasons.length > 0
    },
    deletedSeasons () {
      return this.$store.getters[`edit_${this.leagueId}/deletedSeasons`]
    }
  },
  methods: {
    undoDeletes () {
      this.$store.commit(`edit_${this.leagueId}/undoSeasonDeletes`)
    },
    publishDeletes () {
      this.publishing = true
      this.$store.dispatch(`edit_${this.leagueId}/publishDeletedSeasons`, {
        leagueId: this.leagueId
      })
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
    deleteSeason (seasonId) {
      this.$store.commit(`edit_${this.leagueId}/deleteSeason`, seasonId)
      this.$q.notify({
        position: 'bottom',
        type: 'warning',
        message: `Season ${seasonId} deleted.`,
        timeout: 5000,
        classes: 'text-subtitle1 text-bold',
        icon: 'mdi-delete',
        actions: [
          { label: 'Undo', icon: 'mdi-undo', handler: () => this.undoSeasonDelete(seasonId) }
        ]
      })
      this.seasonTab = this.seasons[this.seasons.length - 1].id
    },
    undoSeasonDelete (seasonId) {
      this.$store.commit(`edit_${this.leagueId}/undoSeasonDelete`, seasonId)
    },
    addSeason (season) {
      this.showAddSeasonDialog = false
      this.$store.commit(`edit_${this.leagueId}/createSeason`,
        {
          newSeason: season,
          leagueId: this.leagueId
        }
      )
      this.seasonTab = this.seasons[this.seasons.length - 1].id
    }
  },
  mounted () {
    this.seasonTab = this.seasons[this.seasons.length - 1].id
  }
}
</script>

<style>

</style>
