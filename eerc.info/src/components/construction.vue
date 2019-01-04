<template>
  <div class="body">
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
        <series-countdown :series="calendar[0]"></series-countdown>
        <countdown
          :deadline="new Date(Date.UTC(2019,0,18,19,0,0,0))"
          name="F1 2018 - Season 4 - German Grand Prix"
        ></countdown>
        <countdown
          :deadline="new Date(Date.UTC(2019,0,16,20,30,0,0))"
          name="RFactor2 - Season 1 - Buenos Aires"
        ></countdown>
        {{new Date(Date.UTC(2019,0,20,18,45,0,0))}}
      </div>
    </div>
  </div>
</template>

<script>
import SeriesCountdown from "@/components/series-countdown.vue";
import Countdown from "@/components/countdown.vue";
export default {
  data() {
    return {
      calendar: [
        {
          series: "Test Series",
          game: "life",
          seasons: [
            {
              seasonName: "season 1",
              events: [
                {
                  location: "web",
                  track: "on1",
                  utcDateTime: "2019-01-04T19:55:00.000Z",
                  duration: 1
                },
                {
                  location: "web2",
                  track: "on2",
                  utcDateTime: "2019-01-04T19:57:00.000Z",
                  duration: 1
                },
                {
                  location: "web3",
                  track: "on3",
                  utcDateTime: "2019-01-04T19:59:00.000Z",
                  duration: 1
                },
                {
                  location: "web4",
                  track: "on4",
                  utcDateTime: "2019-01-04T20:02:00.000Z",
                  duration: 1
                },
                {
                  location: "web",
                  track: "on5",
                  utcDateTime: "2019-01-04T20:04:00.000Z",
                  duration: 1
                },
                {
                  location: "web",
                  track: "on6",
                  utcDateTime: "2019-01-04T20:06:00.000Z",
                  duration: 1
                },
                {
                  location: "web",
                  track: "on7",
                  utcDateTime: "2019-01-04T20:10:00.000Z",
                  duration: 1
                }
              ]
            },
            {
              seasonName: "season 2",
              events: [
                {
                  location: "web",
                  track: "on1",
                  utcDateTime: "2019-01-04T20:15:00.000Z",
                  duration: 1
                },
                {
                  location: "web2",
                  track: "on2",
                  utcDateTime: "2019-01-04T20:17:00.000Z",
                  duration: 1
                },
                {
                  location: "web3",
                  track: "on3",
                  utcDateTime: "2019-01-04T20:19:00.000Z",
                  duration: 1
                },
                {
                  location: "web4",
                  track: "on4",
                  utcDateTime: "2019-01-04T20:21:00.000Z",
                  duration: 1
                },
                {
                  location: "web",
                  track: "on5",
                  utcDateTime: "2019-01-04T20:23:00.000Z",
                  duration: 1
                },
                {
                  location: "web",
                  track: "on6",
                  utcDateTime: "2019-01-04T20:25:00.000Z",
                  duration: 1
                },
                {
                  location: "web",
                  track: "on7",
                  utcDateTime: "2019-01-04T20:27:00.000Z",
                  duration: 1
                }
              ]
            }
          ]
        },
        // Array of series' to form a calendar grouped by series, seasons and events
        {
          series: "WEC", // the name of the series
          game: "Project Cars 2", //The game the series is for
          seasons: [
            //Array of season
            {
              seasonName: "Season 4",
              events: [
                //Array of events in season
                {
                  location: "USA", //Location (meta data)
                  track: "Watkins Glen International", //track the event is one
                  utcDateTime: "2019-01-20T18:45:00.000Z", //UTC formatted date and time
                  duration: 75 //mins
                },
                {
                  location: "USA",
                  track: "Circuit of the Americas",
                  utcDateTime: "2019-01-27T18:45:00.000Z",
                  duration: 75
                },
                {
                  location: "USA",
                  track: "Mazda Raceway Laguna Seca",
                  utcDateTime: "2019-02-19T18:45:00.000Z",
                  duration: 75
                },
                {
                  location: "Australia",
                  track: "Bathurst Mount Panorama",
                  utcDateTime: "2019-02-10T18:45:00.000Z",
                  duration: 75
                },
                {
                  location: "Dubai",
                  track: "Dubai Autodrome GP",
                  utcDateTime: "2019-02-17T18:45:00.000Z",
                  duration: 75
                },
                {
                  location: "Czech Republic",
                  track: "Brno",
                  utcDateTime: "2019-02-24T18:45:00.000Z",
                  duration: 75
                },
                {
                  location: "Germany",
                  track: "Hockeimring",
                  utcDateTime: "2019-03-03T18:45:00.000Z",
                  duration: 75
                },
                {
                  location: "Germany",
                  track: "Nürburgring  Nordschleife Combined",
                  utcDateTime: "2019-03-10T18:45:00.000Z",
                  duration: 75
                },
                {
                  location: "Belgium",
                  track: "Circuit de Spa-Francorchamps",
                  utcDateTime: "2019-03-19T18:45:00.000Z",
                  duration: 75
                },
                {
                  location: "France",
                  track: "24h Le Mans",
                  utcDateTime: "2019-03-24T18:45:00.000Z",
                  duration: 150
                }
              ]
            }
          ]
        },
        {
          //TODO F1
          series: "F1",
          game: "F1 2018",
          seasons: [
            //Array of season
            {
              seasonName: "Season 4",
              events: [
                //Array of events in season
                {
                  location: "USA", //Location (meta data)
                  track: "Watkins Glen International", //track the event is one
                  utcDateTime: "2019-01-20T18:45:00.000Z", //UTC formatted date and time
                  duration: 75 //mins
                }
              ]
            }
          ]
        },
        {
          //TODO RF2 FE
          sereies: "FE",
          game: "RFactor2",
          seasons: [
            //Array of season
            {
              seasonName: "Season 1",
              events: [
                //Array of events in season
                {
                  location: "USA", //Location (meta data)
                  track: "Watkins Glen International", //track the event is one
                  utcDateTime: "2019-01-20T18:45:00.000Z", //UTC formatted date and time
                  duration: 75 //mins
                }
              ]
            }
          ]
        }
      ]
    };
  },
  components: {
    Countdown,
    SeriesCountdown
  },
  methods: {
    gotosite: site => {
      window.open(site);
    }
  }
};
</script>

<style scoped>
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
.main {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
}
.mainLeft {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 50%;
}
.mainRight {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 50%;
}
</style>
