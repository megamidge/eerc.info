<template>
  <div class="body" ref="body">
    <div class="header">
      <img id="logoMain" src="/img/eerclogo_0.png">
      <img id="logoSub" src="/img/eercf1.png">
      <img id="logoSub" src="/img/eercwec.png">
      <img id="logoSub" src="/img/eercfe.png">
      <div class="textHeader">
        <h1>UNDER CONSTRUCTION</h1>
        <p>
          Watch this space. You'll soon be able to get all the info you need for EERC (European Electronic Racing Championship) right here.
          For now, you'll find some useful information and resources you can use to get involved with our amazing community.
        </p>
      </div>
      <svg
        id="underConstruct"
        xmlns="http://www.w3.org/2000/svg"
        width="128"
        height="128"
        viewBox="0 0 24 24"
      >
        <path fill="none" d="M0 0h24v24H0V0z"></path>
        <path
          d="M23 11.01L18 11c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-9c0-.55-.45-.99-1-.99zM23 20h-5v-7h5v7zM20 2H2C.89 2 0 2.89 0 4v12c0 1.1.89 2 2 2h7v2H7v2h8v-2h-2v-2h2v-2H2V4h18v5h2V4c0-1.11-.9-2-2-2zm-8.03 7L11 6l-.97 3H7l2.47 1.76-.94 2.91 2.47-1.8 2.47 1.8-.94-2.91L15 9h-3.03z"
        ></path>
      </svg>
    </div>
    <div class="stream-wrapper">
      <div class="stream">
        <div class="stream-video">
          <!-- <img style="margin:0; width:100%;" src="img/vid_thumbnail.png"> -->
          <div class="stream-video">
            <iframe
              ref="ytstream"
              width="100%"
              height="720"
              src="https://www.youtube.com/embed/ox6w_NYRe7s"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <div class="stream-info">
          <h1>Stream info</h1>
          <p>Event info, how long left, etc etc</p>
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
        <!-- <button @click="gotosite('https://discord.gg/m2Dfpdj')" class="externalLink">
          <h2>Join our Discord Server</h2>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
            ></path>
          </svg>
        </button>-->
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
        <series-countdown v-for="(series,index) in calendar" :key="index" :series="series"></series-countdown>
        <!-- <countdown
          :deadline="new Date(Date.UTC(2019,0,18,19,0,0,0))"
          name="F1 2018 - Season 4 - German Grand Prix"
        ></countdown>
        <countdown
          :deadline="new Date(Date.UTC(2019,0,16,20,30,0,0))"
          name="RFactor2 - Season 1 - Buenos Aires"
        ></countdown>
        {{new Date(Date.UTC(2019,0,20,18,45,0,0))}}-->
      </div>
    </div>
  </div>
</template>

<script>
import SeriesCountdown from "@/components/series-countdown.vue";
import Countdown from "@/components/countdown.vue";
import Ajax from "@/ajax.js";
export default {
  data() {
    return {
      ytstream: null,
      calendar: []
    };
  },
  components: {
    SeriesCountdown
  },
  beforeMount() {
    Ajax.request("/data/calendar.json")
      .as("json")
      .then(response => {
        console.log(response);
        this.calendar = response.calendar;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
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
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.ytstream = this.$refs["ytstream"].clientWidth;
      });
      window.addEventListener("scroll", () => {
        console.log(this.$refs["body"].scrollTop);
      });
      this.resizeStream();
    });
  },
  watch: {
    ytstream() {
      this.resizeStream();
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
#logoMain {
  width: 8%;
  margin: 1%;
}
#logoSub {
  width: 8%;
  margin: 1%;
}
#underConstruct {
  fill: #d1d1d1;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background: #18222c;
  border-style: solid;
  border-width: 0 0 0.6rem 0;
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
