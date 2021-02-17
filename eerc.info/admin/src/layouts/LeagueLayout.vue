<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="text-white"
    :class="true ? 'bg-secondary' : 'bg-dark'">
      <q-toolbar>
        <q-btn icon="mdi-arrow-left" to="./" flat/>
        <q-toolbar-title>
            <div class="row no-wrap items-center" v-if="league">
                <p class="q-ma-none">{{ league.name }}</p>
                <p class="q-ma-none text-primary text-subtitle2 q-ml-sm">{{ league.id }}</p>
            </div>
            <div v-else class="row no-wrap items-center">
              <q-spinner/>
              <p class="q-my-none q-ml-md text-body1 text-primary">Loading</p>
            </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container style="padding-top:0px;">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    leagueId () {
      return this.$route.params.leagueId
    },
    league () {
      return this.$store.getters['data/league'](this.leagueId)
    }
  }
}
</script>
