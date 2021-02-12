<template>
  <q-page class="flex column items-center">
    <h1>Leagues</h1>
    <q-card class="bg-info">
      <q-card-section>
        <p>Here we will have all management of leauges</p>
        <p>This will include:</p>
        <ul>
          <li>View, Edit and Create a league</li>
          <li>Overview of all leagues</li>
          <li>Drill down into a league, to edit rules, format, calendar and participants</li>
        </ul>
        <p><b>If anything is missing, drop a suggestion</b></p>
      </q-card-section>
    </q-card>
    <div class="flex q-pa-md justify-start q-gutter-md">
      <q-card v-for="league in leagues" :key="league.id" class="bg-primary">
        <q-card-section class="q-pb-xs row items-center justify-between">
          <h5 class="q-my-none q-mx-xs">{{ league.name }}</h5>
          <q-badge class="text-caption" color="dark">{{ league.id }}</q-badge>
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <p>{{ league.description_short }}</p>
        </q-card-section>
        <q-card-section>
          <q-markup-table class="no-shadow">
            <tbody>
              <tr>
                <td>Game</td>
                <td></td>
                <td>{{ league.game }}</td>
              </tr>
              <tr v-if="league.seasons">
                <td>Seasons</td>
                <td></td>
                <td>{{ league.seasons.length }}</td>
              </tr>
              <tr>
                <td>Next Event</td>
                <td>//LOCATION//</td>
                <td>//DATE-TIME//</td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn icon="edit" @click="editLeague(league)"/>
        </q-card-actions>
      </q-card>
    </div>
    <router-view/>
  </q-page>
</template>

<script>
export default {
  name: 'Leagues',
  meta: {
    title: 'Leagues | admin.eerc.info',
    description: { name: 'description', content: 'League management page for EERC Admin portal.' },
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' }
  },
  data () {
    return {
    }
  },
  computed: {
    leagues () {
      return this.$store.state.data.leagues
    }
  },
  methods: {
    editLeague (league) {
      this.$router.push({
        name: 'league',
        params: {
          leagueId: league.id
        }
      })
    }
  },
  created () {
    // this.$fb.listenLeagues(this.$store)
  }
}
</script>

<style>
.logo {
  max-width: 15rem;
}
</style>
