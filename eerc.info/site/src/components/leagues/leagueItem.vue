<template>
<div class="q-py-md q-px-xs-none q-px-sm-md " style="cursor:pointer;" @click="$router.push(`/Leagues/${league.id}`)">
    <q-card class="full-height bg-secondary">
        <q-card-section class="text-subtitle1 text-center ellipsis">
            {{league.name}}
        </q-card-section>
        <q-card-section class="bg-dark">
            <q-img contain :ratio="16/9" :src="leagueImage"/>
        </q-card-section>
        <q-card-section class="row no-wrap">
            <p class="q-ma-none ellipsis" style="max-width:60%">{{league.description_short}}</p>
            <q-space/>
            <p class="q-ma-none text-caption">{{league.game}}</p>
        </q-card-section>
    </q-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      leagueImage: ''
    }
  },
  props: {
    league: {
      type: Object,
      default: () => {}
    }
  },
  mounted () {
    this.imageSource()
  },
  methods: {
    imageSource () {
      this.$firebase.leagueStorageRef().child(`${this.league.id}.png`)
        .getDownloadURL()
        .then(url => {
          this.leagueImage = url
        })
        .catch(error => {
          console.error(error.message)
        })
    }
  }
}
</script>
