<template>
  <div>
    <countdown
      v-if="!inProgress"
      :deadline="new Date(currentEvent.utcDateTime)"
      :duration="currentEvent.duration"
      :name="series.game +' - '+series.series+' - ' + currentSeason.seasonName + ' - ' + currentEvent.track"
      @elapsed="elapsed"
    ></countdown>
    <div v-else class="inprogress">
      <p
        class="title"
      >{{series.game +' - '+series.series+' - ' + currentSeason.seasonName + ' - ' + currentEvent.track}}</p>
      <p class="onnow">Event On Now!</p>
      <div class="watch">
        <p>Watch live on YouTube</p>
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
      inProgress: false
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
  methods: {
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
      }
    }
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
    }
  }
};
</script>

<style scoped>
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
