<template>
    <div class="body">
        <div class="header">
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
            <button @click="gotosite('https://discord.gg/m2Dfpdj')" class="externalLink"><h2>Join our Discord Server</h2><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg></button>
            
            <button @click="gotosite('https://goo.gl/forms/NcFb4z5KcKfn2lWo2')" class="externalLink"><h2>Apply to be a WEC Driver (Project Cars 2)</h2><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg></button>
            
            <button @click="gotosite('https://goo.gl/forms/myjKb4lxI3XKYZmm2')" class="externalLink"><h2>Apply to be a Formula 1 Driver (F1 2018)</h2><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg></button>
        </div>
    </div>
</template>

<script>
export default {
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
  flex-direction: column;
  justify-content: space-evenly;
}
</style>
