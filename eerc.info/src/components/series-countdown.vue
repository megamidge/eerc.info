<template>
  <div>
    <countdown
      :deadline="new Date(currentEvent.utcDateTime)"
      :duration="currentEvent.duration"
      :name="series.game +' - '+series.series+' - ' + currentSeason.seasonName + ' - ' + currentEvent.track"
      @elapsed="elapsed"
    ></countdown>
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
      currentEventIndex: 0
    };
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
      console.log(this.series.seasons[this.currentSeasonIndex].seasonName);
      return this.series.seasons[this.currentSeasonIndex];
    }
  },
  methods: {
    elapsed() {
      console.log("Elapsed", this.currentEventIndex, this.currentSeasonIndex);
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
};
</script>

<style>
</style>
