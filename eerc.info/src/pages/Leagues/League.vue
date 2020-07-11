<template>
  <q-page class="flex column items-center" v-if="league">
    <q-toolbar class="bg-secondary">
      <q-btn flat round dense icon="arrow_back" @click="$router.push('/leagues')"/>
      <template>
        <q-toolbar-title>
          <q-input v-model="titleInput"
            @mouseover.native="titleHover = true"
            @mouseleave.native="titleHover = false"
            @keydown.enter="submitNewTitle"
            @focus="titleEdit = true"
            @blur="titleEdit = false"
            :filled="titleEdit"
            borderless
            class="text-h6"
            :style="{width:`${titleInput.length/2+3}em`, minWidth:'6rem', maxWidth:'100%'}">
            <template v-slot:append>
              <q-icon v-if="titleHover && !titleEdit" name="edit"/>
            </template>
          </q-input>
        </q-toolbar-title>
      </template>
      <q-badge class="text-caption" color="dark">{{ league.id }}</q-badge>
    </q-toolbar>
    <h1>{{ league.id }}</h1>
    <p>{{ getLeague('DIRT') }}</p>
  </q-page>
  <q-page v-else class="flex items-center justify-center">
    <q-spinner size="10em"/>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      titleHover: false,
      titleEdit: false,
      titleInput: ''
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
      console.log('New title:', this.titleInput)
      this.titleEdit = false
    }
  },
  watch: {
    league (newVal) {
      console.log('watch', newVal)
      if (newVal) {
        console.log('this.titleInput = this.league.name')
        this.titleInput = this.league.name
      }
    }
  }
}
</script>

<style>

</style>
