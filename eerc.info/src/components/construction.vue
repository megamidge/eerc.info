<template>
  <div class="body" style="overflow:scroll;">
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
export default {
  data() {
    return {
      calendar: [
        {
          series:"CHEC",
          game:"ifactor 2018",
          seasons:[
            {
              seasonName:"test",
              events:[
                {
                  location:"null",
                  track:"null",
                  utcDateTime:"2019-01-01T18:00:00.000Z",
                  duration:525600
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
                  duration: 85 //mins
                },
                {
                  location: "USA",
                  track: "Circuit of the Americas",
                  utcDateTime: "2019-01-27T18:45:00.000Z",
                  duration: 85
                },
                {
                  location: "USA",
                  track: "Mazda Raceway Laguna Seca",
                  utcDateTime: "2019-02-19T18:45:00.000Z",
                  duration: 85
                },
                {
                  location: "Australia",
                  track: "Bathurst Mount Panorama",
                  utcDateTime: "2019-02-10T18:45:00.000Z",
                  duration: 85
                },
                {
                  location: "Dubai",
                  track: "Dubai Autodrome GP",
                  utcDateTime: "2019-02-17T18:45:00.000Z",
                  duration: 85
                },
                {
                  location: "Czech Republic",
                  track: "Brno",
                  utcDateTime: "2019-02-24T18:45:00.000Z",
                  duration: 85
                },
                {
                  location: "Germany",
                  track: "Hockeimring",
                  utcDateTime: "2019-03-03T18:45:00.000Z",
                  duration: 85
                },
                {
                  location: "Germany",
                  track: "Nürburgring  Nordschleife Combined",
                  utcDateTime: "2019-03-10T18:45:00.000Z",
                  duration: 85
                },
                {
                  location: "Belgium",
                  track: "Circuit de Spa-Francorchamps",
                  utcDateTime: "2019-03-19T18:45:00.000Z",
                  duration: 85
                },
                {
                  location: "France",
                  track: "24h Le Mans",
                  utcDateTime: "2019-03-24T18:45:00.000Z",
                  duration: 165
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
                  location: "Germany", //Location (meta data)
                  track: "German Grand Prix", //track the event is one
                  utcDateTime: "2019-01-18T19:00:00.000Z", //UTC formatted date and time
                  duration: 80 //mins
                },
                {
                  location: "Hungary", //Location (meta data)
                  track: "Hungarian Grand Prix", //track the event is one
                  utcDateTime: "2019-01-25T19:00:00.000Z", //UTC formatted date and time
                  duration: 80 //mins
                },
                {
                  location: "Belgium", //Location (meta data)
                  track: "Belgian Grand Prix", //track the event is one
                  utcDateTime: "2019-02-01T19:00:00.000Z", //UTC formatted date and time
                  duration: 80 //mins
                },
                {
                  location: "Italian", //Location (meta data)
                  track: "Italian Grand Prix", //track the event is one
                  utcDateTime: "2019-02-08T19:00:00.000Z", //UTC formatted date and time
                  duration: 80 //mins
                },
                {
                  location: "Japan", //Location (meta data)
                  track: "Japanese Grand Prix", //track the event is one
                  utcDateTime: "2019-02-15T19:00:00.000Z", //UTC formatted date and time
                  duration: 80 //mins
                },
                {
                  location: "Brazil", //Location (meta data)
                  track: "Brazilian Grand Prix", //track the event is one
                  utcDateTime: "2019-02-22T19:00:00.000Z", //UTC formatted date and time
                  duration: 80 //mins
                },
                {
                  location: "Britain", //Location (meta data)
                  track: "British Grand Prix", //track the event is one
                  utcDateTime: "2019-03-01T19:00:00.000Z", //UTC formatted date and time
                  duration: 80 //mins
                },
                {
                  location: "Spain", //Location (meta data)
                  track: "Spanish Grand Prix", //track the event is one
                  utcDateTime: "2019-03-08T19:00:00.000Z", //UTC formatted date and time
                  duration: 80 //mins
                },
                {
                  location: "Monaco", //Location (meta data)
                  track: "Monégasque Grand Prix", //track the event is one
                  utcDateTime: "2019-03-15T19:00:00.000Z", //UTC formatted date and time
                  duration: 80 //mins
                }
              ]
            }
          ]
        },
        {
          //TODO RF2 FE
          series: "FE",
          game: "RFactor2",
          seasons: [
            //Array of season
            {
              seasonName: "Season 1",
              events: [
                //Array of events in season
                {
                  location: "Germany", //Location (meta data)
                  track: "Berlin City", //track the event is one
                  utcDateTime: "2018-10-24T20:30:00.000Z", //UTC formatted date and time
                  duration: 70 //mins
                },
                {
                  location: "France", //Location (meta data)
                  track: "Paris", //track the event is one
                  utcDateTime: "2018-10-31T20:30:00.000Z", //UTC formatted date and time
                  duration: 70 //mins
                },
                {
                  location: "Morocco", //Location (meta data)
                  track: "Marrakesch", //track the event is one
                  utcDateTime: "2018-11-07T20:30:00.000Z", //UTC formatted date and time
                  duration: 70 //mins
                },
                {
                  location: "Monaco", //Location (meta data)
                  track: "Monaco", //track the event is one
                  utcDateTime: "2018-11-14T20:30:00.000Z", //UTC formatted date and time
                  duration: 70 //mins
                },
                {
                  location: "Germany", //Location (meta data)
                  track: "Norisring", //track the event is one
                  utcDateTime: "2018-11-21T20:30:00.000Z", //UTC formatted date and time
                  duration: 70 //mins
                },
                {
                  location: "Britain", //Location (meta data)
                  track: "London", //track the event is one
                  utcDateTime: "2018-11-28T20:30:00.000Z", //UTC formatted date and time
                  duration: 70 //mins
                },
                {
                  location: "Russia", //Location (meta data)
                  track: "Moscow", //track the event is one
                  utcDateTime: "2018-12-05T20:30:00.000Z", //UTC formatted date and time
                  duration: 70 //mins
                },
                {
                  location: "Germany", //Location (meta data)
                  track: "Berlin Tempelhof", //track the event is one
                  utcDateTime: "2018-12-12T20:30:00.000Z", //UTC formatted date and time
                  duration: 70 //mins
                },
                {
                  location: "Argentina", //Location (meta data)
                  track: "Buenos Aires", //track the event is one
                  utcDateTime: "2019-01-16T20:30:00.000Z", //UTC formatted date and time
                  duration: 70 //mins
                },
                {
                  location: "Mexico", //Location (meta data)
                  track: "Mexico City", //track the event is one
                  utcDateTime: "2019-01-23T20:30:00.000Z", //UTC formatted date and time
                  duration: 70 //mins
                },
                {
                  location: "USA", //Location (meta data)
                  track: "New York", //track the event is one
                  utcDateTime: "2019-01-30T20:30:00.000Z", //UTC formatted date and time
                  duration: 70 //mins
                },
                {
                  location: "China", //Location (meta data)
                  track: "Macau", //track the event is one
                  utcDateTime: "2019-02-06T20:30:00.000Z", //UTC formatted date and time
                  duration: 70 //mins
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
  align-items:center;
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
@media screen and (min-width:600px) and (max-width:700px){
  .externalLink{
    flex-direction:column;
  }
}
@media screen and (max-width:360px){
  .externalLink{
    flex-direction:column;
  }
}
.main {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
}
@media screen and (max-width:600px){
  .main{
    flex-direction:column;
  }
  .mainLeft{
    order:2;
  }
  .mainRight{
    order:1;
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
