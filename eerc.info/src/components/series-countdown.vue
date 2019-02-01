<template>
  <div>
    <countdown
      v-if="!inProgress"
      :deadline="new Date(currentEvent.utcDateTime)"
      :duration="currentEvent.duration"
      :name="series.game +' - '+series.series+' - ' + currentSeason.seasonName + ' - ' + 'Round ' + (currentEventIndex+1) + ' - ' + currentEvent.track"
      @elapsed="elapsed"
    ></countdown>
    <div v-else-if="noevent" class="inprogress">
      <p class="title">Coming Soon</p>
      <p class="onnow">More Events</p>
      <div class="watch">
        <p>We'll announce the next season of {{series.series}} soon!</p>
      </div>
    </div>
    <div v-else class="inprogress">
      <p
        class="title"
      >{{series.game +' - '+series.series+' - ' + currentSeason.seasonName + ' - ' + currentEvent.track}}</p>
      <p class="onnow">Event On Now!</p>
      <div class="watch">
        <div
          @click="gotosite('https://gaming.youtube.com/channel/UC4kk8xdkgP1arwEgD7G4Nlw/live')"
          class="stream"
          href="https://gaming.youtube.com/channel/UC4kk8xdkgP1arwEgD7G4Nlw/live"
        >
          <div id="left">
            <svg
              id="liveicon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path
                d="M21 6h-7.59l3.29-3.29L16 2l-4 4-4-4-.71.71L10.59 6H3c-1.1 0-2 .89-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.11-.9-2-2-2zm0 14H3V8h18v12zM9 10v8l7-4z"
              ></path>
            </svg>
          </div>
          <div id="right">
            <p>Watch live on YouTube</p>
            <p class="small">(click me)</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import countdown from "@/components/countdown.vue";
export default {
  name: "series-countdown",
  components: {
    countdown
  },
  data() {
    return {
      currentSeasonIndex: 0,
      currentEventIndex: 0,
      now: Math.trunc(new Date().getTime() / 1000),
      difference: 0,
      date: null,
      dateOptions: {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZoneName: "short"
      },
      interval: null,
      inProgress: false,
      noevent: false
    };
    4;
  },
  props: {
    series: Object
  },
  computed: {
    currentEvent() {
      return this.series.seasons[this.currentSeasonIndex].events[
        this.currentEventIndex
      ];
    },
    currentSeason() {
      return this.series.seasons[this.currentSeasonIndex];
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$emit("inProgress", {
        series: this.series.series,
        inProgress: this.inProgress
      });
    });
  },
  watch: {
    now(value) {
      this.difference = this.date - this.now;
      if (this.difference <= 0) {
        clearInterval(this.interval);
        this.inProgress = false;
        this.difference = 0;

        if (
          this.currentEventIndex <
          this.series.seasons[this.currentSeasonIndex].events.length - 1
        ) {
          this.currentEventIndex++;
        } else {
          this.currentEventIndex = 0;
          this.currentSeasonIndex++;
        }
      }
    },
    inProgress(value) {
      this.$emit("inProgress", {
        series: this.series.series,
        inProgress: value
      });
    }
  },
  methods: {
    gotosite: site => {
      window.open(site);
    },
    elapsed() {
      this.waitDate = new Date(this.currentEvent.utcDateTime);
      this.waitDate.setMinutes(
        this.waitDate.getMinutes() + this.currentEvent.duration
      );
      this.date = Math.trunc(this.waitDate / 1000);
      this.now = Math.trunc(new Date().getTime() / 1000);
      let diff = this.date - this.now;
      if (diff > 0) {
        this.inProgress = true;
        this.interval = setInterval(() => {
          this.now = Math.trunc(new Date().getTime() / 1000);
        }, 1000);
      } else {
        if (
          this.currentEventIndex <
          this.series.seasons[this.currentSeasonIndex].events.length - 1
        ) {
          this.currentEventIndex++;
        } else {
          this.currentEventIndex = 0;
          this.currentSeasonIndex++;
        }
        if (this.currentSeriesIndex >= this.series.seasons.length - 1) {
          this.inProgress = false;
          this.noevent = true;
        }
      }
    }
  }
};
</script>

<style scoped>
#left {
  width: 2.8rem;
  margin: 1rem;
  padding: 0;
}
#right {
  height: 100%;
  margin: 0;
  padding: 0;
}
#liveicon {
  fill: #d1d1d1;
  height: 100%;
  width: 100%;
}
.stream {
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-decoration: none;
  color: #d1d1d1;
  font-weight: bolder;
  width: 100%;
  height: 100%;
  font-size: 1.32rem;
  cursor: pointer;
}
.stream p {
  margin-bottom: 0.2rem;
}
.stream .small {
  margin-bottom: 1rem;
  margin-top: 0.2rem;
  font-size: 0.8rem;
  font-style: italic;
}
.stream:hover {
  background-color: #0b0e13;
}
.inprogress {
  background: #18222c;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
}
.watch {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  background: #12181f;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
}
.watch h1 {
  margin: 0.8rem;
}
.title {
  margin: 0.2rem;
  padding: 0;
  font-weight: bolder;
  font-size: 1.2rem;
}
.onnow {
  margin: 0.2rem;
  padding: 0;
  font-size: 1rem;
}
</style>
