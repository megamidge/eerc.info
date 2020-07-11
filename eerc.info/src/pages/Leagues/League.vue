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
            :style="{width:`${titleInput.length/2+3}em`, minWidth:'6rem', maxWidth:'100%'}"
            :loading="loading"
            :readonly="loading"
            borderless
            class="text-h6">
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
      this.titleEdit = false
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
    }
  },
  mounted () {
    if (this.league)
      this.titleInput = this.league.name
  },
  watch: {
    league (newVal) {
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
