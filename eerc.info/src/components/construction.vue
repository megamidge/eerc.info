<template>
    <div class="body">
        <div class="header">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1000" height="1000" viewBox="0 0 1000 1000">
  <image x="20" y="313" width="962" height="371" xlink:href="data:img/png;base64,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"/>
</svg>

            <img id="logoMain" src="/static/assets/eerclogo_0.png"/>
            <img id="logoSub" src="/static/assets/eercf1.png"/>
            <img id="logoSub" src="/static/assets/eercwec.png"/>
            <img id="logoSub" src="/static/assets/eercfe.png"/>
            <div class="textHeader">
                <h1>UNDER CONSTRUCTION</h1>
                <p>Watch this space. You'll soon be able to get all the info you need for EERC (European Electronic Racing Championship) right here.
                    For now, you'll find some useful information and resources you can use to get involved with our amazing community.
                </p>
            </div>
            <svg id="underConstruct" xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M23 11.01L18 11c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-9c0-.55-.45-.99-1-.99zM23 20h-5v-7h5v7zM20 2H2C.89 2 0 2.89 0 4v12c0 1.1.89 2 2 2h7v2H7v2h8v-2h-2v-2h2v-2H2V4h18v5h2V4c0-1.11-.9-2-2-2zm-8.03 7L11 6l-.97 3H7l2.47 1.76-.94 2.91 2.47-1.8 2.47 1.8-.94-2.91L15 9h-3.03z"/></svg>
        </div>
        <div class="main">      
          <div class="mainLeft">
              <button @click="gotosite('https://discord.gg/m2Dfpdj')" class="externalLink"><h2>Join our Discord Server</h2><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg></button>
              
              <button @click="gotosite('https://goo.gl/forms/NcFb4z5KcKfn2lWo2')" class="externalLink"><h2>Apply to be a WEC Driver (Project Cars 2)</h2><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg></button>
              
              <button @click="gotosite('https://goo.gl/forms/myjKb4lxI3XKYZmm2')" class="externalLink"><h2>Apply to be a Formula 1 Driver (F1 2018)</h2><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg></button>
        
              <button @click="gotosite('https://goo.gl/forms/DrkrJIC2Ssjmo5bj2')" class="externalLink"><h2>Apply to be a Formula E Driver (rFactor 2)</h2><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg></button>
          
          </div>      
          <div class="mainRight">
              <!-- <countdown></countdown> -->
          </div>
        </div>
    </div>
</template>

<script>
import Countdown from "@/components/countdown.vue";
export default {
  components: {
    Countdown
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
