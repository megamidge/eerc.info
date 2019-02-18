<template>
  <div class="body" ref="body">
    <div class="stream-wrapper" v-show="streaming && streamEnabled">
      <div class="stream">
        <div class="stream-video">
          <div class="stream-video">
            <iframe
              ref="ytstream"
              width="100%"
              height="720"
              src="https://www.youtube.com/embed/live_stream?channel=UC4kk8xdkgP1arwEgD7G4Nlw"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <div class="stream-info">
          <h1 v-if="currentSeries">{{currentSeries.series}} {{currentSeries.game}}</h1>
          <p>Live now.</p>
        </div>
      </div>
      <div class="sticky" ref="sticky">
        <h2 class="scroll">Scroll
          <div
            style="border-left:1px solid #fff;
                  border-bottom:1px solid #fff; 
                  transform: rotate(-45deg);
                  width:1rem;
                  height:1rem;
                  margin-left:1rem;"
          ></div>
        </h2>
      </div>
    </div>
    <div class="main">
      <div class="mainLeft">
        <button @click="gotosite('https://goo.gl/forms/NcFb4z5KcKfn2lWo2')" class="externalLink">
          <h2>Apply to be a WEC Driver (Project Cars 2)</h2>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
            ></path>
          </svg>
        </button>
        
        <button @click="gotosite('https://goo.gl/forms/myjKb4lxI3XKYZmm2')" class="externalLink">
          <h2>Apply to be a Formula 1 Driver (F1 2018)</h2>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
            ></path>
          </svg>
        </button>
        
        <button @click="gotosite('https://goo.gl/forms/DrkrJIC2Ssjmo5bj2')" class="externalLink">
          <h2>Apply to be a Formula E Driver (rFactor 2)</h2>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
            ></path>
          </svg>
        </button>

        <div class="externalLink paypal">
          <h3>Help fund the league by donating via PayPal</h3>
          <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
            <input type="hidden" name="cmd" value="_s-xclick">
            <input type="hidden" name="hosted_button_id" value="WT96RWAPDAZ8S">
            <input
              type="image"
              src="https://www.paypalobjects.com/en_US/GB/i/btn/btn_donateCC_LG.gif"
              border="0"
              name="submit"
              title="PayPal - The safer, easier way to pay online!"
              alt="Donate with PayPal button"
            >
            <img
              alt
              border="0"
              src="https://www.paypal.com/en_GB/i/scr/pixel.gif"
              width="1"
              height="1"
            >
          </form>
        </div>
      </div>
      <div class="mainRight">
        <series-countdown
          v-for="(series,index) in calendar"
          :key="index"
          :series="series"
          @inProgress="changeInProgress($event)"
        ></series-countdown>
      </div>
    </div>
  </div>
</template>

<script>
import SeriesCountdown from "@/components/series-countdown.vue";
import Countdown from "@/components/countdown.vue";
import Ajax from "@/ajax.js";
import Header from "@/components/header.vue";
export default {
  data() {
    return {
      ytstream: null,
      calendar: [],
      streaming: false,
      inProgresses: [],
      currentSeries: null,
      streamEnabled: false
    };
  },
  components: {
    SeriesCountdown
  },
  watch: {
    ytstream() {
      this.resizeStream();
    },
    inProgresses(array) {
      if (array.some(e => e.inProgress === true)) {
        this.streaming = true;
        this.$nextTick(() => {
          this.ytstream = this.$refs["ytstream"].clientWidth;
        });
        let currentSeriesName = array.filter(e => e.inProgress === true)[0]
          .series;
        this.currentSeries = this.calendar.filter(
          ser => ser.series === currentSeriesName
        )[0];
      } else {
        this.streaming = false;
      }
    }
  },
  beforeMount() {
    Ajax.request("/data/calendar.json")
      .as("json")
      .then(response => {
        this.calendar = response.calendar;
      })
      .catch(error => {
        console.log(error);
      });
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.ytstream = this.$refs["ytstream"].clientWidth;
      });
      window.addEventListener("scroll", () => {
        //console.log(this.$refs["body"].scrollTop);
      });
      this.resizeStream();
    });
  },
  methods: {
    changeInProgress(event) {
      let series = event.series;
      let inProgress = event.inProgress;
      if (this.inProgresses.some(e => e.series === series)) {
        this.inProgresses.filter(
          e => e.series === series
        )[0].inProgress = inProgress;
      } else {
        this.inProgresses.push({ series: series, inProgress: inProgress });
      }
    },
    gotosite: site => {
      window.open(site);
    },
    resizeStream() {
      let width = this.$refs["ytstream"].clientWidth;
      let aspectX = 16;
      let aspectY = 9;

      let wx = width * aspectY;
      let height = wx / aspectX;
      this.$refs["ytstream"].height = height;
    }
  }
};
</script>

<style scoped>
.sticky {
  position: sticky;
  position: -webkit-sticky;
  bottom: 0;
}
.scroll {
  font-weight: bolder;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: #12181fef;
  margin: 0;
}
.stream-wrapper {
  width: 95%;
  margin: 1rem;
  background-color: #12181f;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-around;
}
.stream {
  width: 100%;
  background-color: #12181f;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-around;
}
.stream-video {
  flex-grow: 30;
  background-color: #000000;
  margin-right: 0.2rem;
}
.stream-info {
  flex-grow: 4;
  background-color: #18222c;
  margin-left: 0.2rem;
}
.body {
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.textHeader {
  width: 33%;
}
a {
  text-decoration: none;
  color: #ffffff;
  font-weight: bold;
}
.externalLink {
  background-color: #18222c;
  padding: 10px;
  border-radius: 0.2rem;
  margin: 1rem;
  outline: none;
  border: none;
  color: #d1d1d1;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.externalLink .paypal {
  justify-content: center;
  align-items: center;
}
.externalLink:hover {
  background-color: #12181f;
}
.externalLink svg {
  fill: #d1d1d1;
}
@media screen and (min-width: 600px) and (max-width: 700px) {
  .externalLink {
    flex-direction: column;
  }
}
@media screen and (max-width: 360px) {
  .externalLink {
    flex-direction: column;
  }
}
.main {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
}
@media screen and (max-width: 600px) {
  .main {
    flex-direction: column;
  }
  .mainLeft {
    order: 2;
  }
  .mainRight {
    order: 1;
  }
}
.mainLeft {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  /* width: 50%; */
}
.mainRight {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  /* width: 50%; */
}
</style>
