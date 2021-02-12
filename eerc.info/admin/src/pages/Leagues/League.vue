<template>
  <q-layout view="hHh lpR fFf">
    <template v-if="league">
      <q-header>
        <q-toolbar class="bg-secondary">
            <q-btn flat round dense icon="arrow_back" @click="$router.push('/leagues')"/>
            <q-toolbar-title>
              <editable-text v-model="titleInput" @submit="submitNewTitle" :loading="loading" class="text-h6"/>
            </q-toolbar-title>
            <q-badge class="text-caption" color="dark">{{ league.id }}</q-badge>
          </q-toolbar>
      </q-header>
      <q-page-container>
        <q-page class="flex column items-center q-gutter-md" v-if="league">
          <h1>{{ league.id }}</h1>
          <p>{{ getLeague('DIRT') }}</p>
          <settings :league="league"/>
          <seasons :seasons="league.seasons"/>
        </q-page>
    </q-page-container>
  </template>
  <template v-else>
    <q-page-container>
      <q-page class="flex items-center justify-center">
        <q-spinner size="10em"/>
      </q-page>
    </q-page-container>
  </template>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import EditableText from 'components/EditableText'
import Settings from 'components/Leagues/Settings'
import Seasons from 'components/Leagues/Seasons'
export default {
  components: {
    EditableText,
    Settings,
    Seasons
  },
  data () {
    return {
      titleInput: '',
      loading: false
    }
  },
  computed: {
    ...mapGetters('data', [
      'getLeague'
    ]),
    league () {
      return this.getLeague(this.$route.params.leagueId)
    }
  },
  methods: {
    submitNewTitle () {
      // this.titleEdit = false
      if (this.titleInput === this.league.name)
        return
      this.loading = true
      this.$fb.firestore().collection('leagues').doc(this.league.id).update({
        name: this.titleInput
      }).then(() => this.$q.notify({ message: 'Title updated', color: 'positive' }))
        .catch(error => this.$q.notify({ message: `UwU somethings fucky wucky. ${error.message}` }))
        .then(() => {
          this.loading = false
        })
    },
    init () {
      this.titleInput = this.league.name
    }
  },
  mounted () {
    if (this.league) {
      this.init()
    }
  },
  watch: {
    league (newVal) {
      if (newVal) {
        this.init()
      }
    }
  }
}
</script>

<style>
.q-table--wrap td{
  white-space: normal !important;
}
</style>
