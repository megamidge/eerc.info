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
      <q-card v-for="league in leagues" :key="league.id">
        <q-card-section class="q-pb-xs row items-center justify-between">
          <h5 class="q-my-none q-mx-xs">{{ league.name }}</h5>
          <q-badge class="text-caption">{{ league.id }}</q-badge>
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <p>{{ league.description_short }}</p>
        </q-card-section>
        <q-card-section class="q-py-xs">
          <div>
            {{ league }}
          </div>
        </q-card-section>
        <q-card-section class="flex justify-end q-pt-xs">
          <q-btn icon="settings"/>
        </q-card-section>
      </q-card>

    </div>
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
  created () {
    this.$fb.listenLeagues(this.$store)
  }
}
</script>

<style>
.logo {
  max-width: 15rem;
}
</style>
