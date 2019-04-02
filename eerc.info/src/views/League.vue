<template>
  <div class="body">
    <div class="panel seasons">
      <h1>Seasons:</h1>
      <hr>
      <div
        class="season"
        v-for="(season,index) in seasons"
        :key="index"
        style="width:100%;text-align:left;"
      >
        <h4>{{season.seasonName}}</h4>
        <div class="event" v-for="(event,index) in season.events" :key="index">
          <h5>Race {{index+1}}</h5>
          <p>{{event.location}}</p>
          <p>{{event.track}}</p>
          <p>{{event.duration}} mins</p>
          <p>{{event.utcDateTime}}</p>
        </div>
      </div>
    </div>
    <div class="panel leagueinfo">
      <h2>{{league.name}}</h2>
      <div class="logo" :style="logoStyle"></div>
      <hr>
      <h3>Information:</h3>
      <p>
        <b>Game:</b>
        {{league.game}}
      </p>
      <p>
        <b>Seasons:</b>
        {{seasons.length}}
      </p>
    </div>
  </div>
</template>

<script>
import Ajax from "@/ajax.js";
export default {
  data() {
    return {
      league: {},
      seasons: []
    };
  },
  computed: {
    logoStyle() {
      return { backgroundImage: "url('/img/logos/" + this.league.logo + "')" };
    }
  },
  beforeMount() {
    this.GetThisLeague();
  },

  watch: {
    $route(to, from) {
      this.GetThisLeague();
    }
  },
  methods: {
    GetThisLeague() {
      Ajax.request("/data/leagues.json")
        .as("json")
        .then(response => {
          let leagues = response.leagues;
          this.league = leagues.find(
            e => e.code === this.$route.params.leagueCode
          );

          this.GetThisLeagueSeasons();
        })
        .catch(error => {
          console.log(error);
        });
    },
    GetThisLeagueSeasons() {
      Ajax.request("/data/calendar.json")
        .as("json")
        .then(response => {
          let calendar = response.calendar;
          this.seasons = calendar.find(
            e => e.series === this.$route.params.leagueCode
          ).seasons;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.body {
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
}
.panel {
  background: #18222c;
  margin: 0.5rem;
  padding: 0.2rem;
  /* flex-grow: 1; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.leagueinfo {
  flex-grow: 1.5; /*space distribution*/
  position: sticky;
  position: -webkit-sticky;
  top: 0.5rem;
  flex-shrink: 0; /*has no effect????*/
  width: 15%; /*stops the shrinking*/
}
.seasons {
  flex-grow: 8; /*space distribution*/
}
a {
  color: #d1d1d1;
  text-decoration: none;
}
a:visited {
  color: unset;
}
a:hover {
  color: #797979;
}
.logo {
  height: 15rem;
  margin: 0;
  background: #25415d;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-origin: content-box;
  padding: 1rem;
  align-self: stretch;
}
p {
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
}
h3 {
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
}
hr {
  width: 90%;
}
</style>
