<template>
  <div class="body">
    <div class="panel seasons">
      <h1>Seasons:</h1>
      <hr>
      <div
        class="season"
        v-for="(season,index) in seasons"
        :key="index"
        style="margin-left:0.5rem;margin-right:0.5rem;background:#25415d;padding:0.4rem">
        <div style="display:flex;flex-direction:row;justify-content:space-between;cursor:pointer;"
          @click="seasonClick(index)">
          <h4>{{season.seasonName}}</h4>
          <p v-if="index===showingIndex">&#8593</p>
          <p v-else>&#8595</p>
        </div>
        <hr style="width:100%">
        <div v-if="index === showingIndex" style="padding:0.8rem;background:#4b6987;">
          <div class="event" v-for="(event,eventIndex) in season.events" :key="eventIndex">
            <div style="display:flex;flex-direction:row;justify-content:flex-start;">
              <div style="display:flex;flex-direction:column;">
                <h4>Race {{index+1}}</h4>
                <h3>{{event.track}}</h3>
                <h4>{{event.location}}</h4>
                <p>
                  <small>{{new Date(event.utcDateTime).toLocaleDateString(undefined,dateOptions)}}</small>
                </p>
                <p>
                  <small>{{event.duration}} mins</small>
                </p>
              </div>
              <div style="display:flex;flex-direction:column;text-align:right;margin-left: auto;">
                <h3>1. [First Place]</h3>
                <h5>2. [Second Place]</h5>
                <h6>3. [Second Place]</h6>
                <p>[X] entrants</p>
                <p>
                  <small>
                    <i>[View full classification]</i>
                  </small>
                </p>
              </div>
              <div class="trackmap" :style="{backgroundImage: `url(/img/tracks/${(event.trackImage||'placeholder.png')})`}"></div>
            </div>
            <hr style="width:100%" v-if="eventIndex!=season.events.length-1">
          </div>
        </div>
      </div>
      <div v-if="!seasons || seasons.length < 1">
        <i>No seasons yet.</i>
      </div>
    </div>
    <div class="panel leagueinfo">
      <h2 class="centertext">{{league.name}}</h2>
      <div class="logo" :style="logoStyle"></div>
      <hr>
      <button @click="gotosite(league.registration)" class="externalLink">
        <h2>Apply to drive</h2>
        <img src="/img/svg/externLink.svg" width="24" height="24" alt="[external link]">
      </button>
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
      seasons: [],
      dateOptions: {
        // weekday: "short",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        timeZoneName: "short"
      },
      showingIndex: -1
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
      this.league = {}
      this.seasons = []
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
          this.showingIndex = this.seasons.length - 1;
        })
        .catch(error => {
          console.log(error);
        });
    },
    seasonClick(index) {
      if (index != this.showingIndex) this.showingIndex = index;
      else this.showingIndex = -1;
    },
    gotosite: site => {
      window.open(site);
    },
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
  width: 15%; /*stops the shrinking*/
  height: calc(100vh - 1.5rem);
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  text-align: left;
  padding:0.4rem;
}
.centertext{
  text-align: center;
}
.seasons {
  flex-grow: 8; /*space distribution*/
  align-items: stretch;
  text-align: left;
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
h3,
h4,
h5,
h6 {
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
}
hr {
  width: 90%;
}
.trackmap {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-origin: content-box;
  padding: 1rem;
  width: 20%;
}
.externalLink {
  background-color: #25415d;
  padding: 0 0.6rem 0 0.6rem;
  border-radius: 0.2rem;
  outline: none;
  border: none;
  color: #d1d1d1;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
