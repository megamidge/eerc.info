<template>
  <div>
    <div class="header" ref="header">
      <img src="/img/eerclogo_0.png" style="height:auto;width:4rem;margin:0.5rem;">
      <nav class="menu">
        <ul>
          <li @click="$router.push('/')">Home</li>
          <li id="leagues" style="position:relative;">
            Leagues/Series
            <ul class="series-menu">
              <li v-for="(serie,index) in this.series" :key="index">
                <router-link :to="'/league/' + serie.name">
                  <div class="series-logo" :style="serie.logo"></div>
                  <p>{{serie.name}}</p>
                </router-link>
              </li>
            </ul>
          </li>
          <li>Gallery</li>
          <li>
            <router-link :to="'/about'">About</router-link>
          </li>
        </ul>
      </nav>
      <h4>This site is under construction.</h4>
      <h5>Check back often to see frequent changes.</h5>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      series: [
        {
          name: "WEC",
          logo: { backgroundImage: "url('/img/logos/eercwec.png')" }
        },
        {
          name: "F1",
          logo: {
            backgroundImage: "url('/img/logos/eercf1.png')"
          }
        },
        {
          name: "FE",
          logo: { backgroundImage: "url('/img/logos/eercfe.png')" }
        },
        {
          name: "GT",
          logo: { backgroundImage: "url('/img/logos/GTseries.png')" }
        },
        {
          name: "GIN",
          logo: { backgroundImage: "url('/img/logos/ginetta.png')" }
        },
        {
          name: "DIRT",
          logo: { backgroundImage: "url('/img/logos/DirtRoundel.png')" }
        }
      ]
    };
  }
};
</script>

<style>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background: #18222c;
  border-style: solid;
  border-width: 0 0 0.6rem 0;
  width: 100%;
  position: relative;
  z-index: 100;
}
.menu {
  padding: 0;
  margin: 0;
  height: 100%;
}
.menu ul {
  display: flex;
  /* flex-direction: row; */
  list-style: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
}
.menu li {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  float: left;
  /* position: relative; */
  width: auto;
  height: 100%;
  padding: 3rem 0 3rem 0;
  transition: background 0.2s;
}
.menu li:hover {
  background: #1c2e3f;
  transition: background 0.2s;
}
.series-menu {
  position: absolute;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  /* justify-content: space-between; */
  /* align-items: center; */
  top: 100%;
  left: 0;
  background: #18222c;
  border-style: solid;
  border-width: 0 0 0.6rem 0;
  visibility: collapse;
  /* transition: 0s visibility; */
  transition: visibility 0.4s;
  transition-delay: 0.3s;
  transition: 0s visibility;
  transition-delay: 0.3s;
  /* transition: 0s visibility; */
  z-index: 100;
  transform: scaleY(0);
  transform-origin: top;
  opacity: 0;
  transition: 0.2s all;
  transition-delay: 0.4s;
}
#leagues:hover .series-menu {
  visibility: visible;
  transform: scaleY(1);
  transform-origin: top;
  opacity: 100;
  transition: 0.2s all;
  transition-delay: 0.2s;
}
.series-menu:hover {
  visibility: visible;
  transition-delay: 0.1s;
}
.series-menu:hover {
  transition: visibility 0.4s;
}
.series-menu li a {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.series-menu li {
  padding: 0 0.2rem 0 0.2rem;
  margin: 0.2rem;
}
.series-menu li:hover .series-logo {
  transform: scale(1.2);
  transition: all 0.2s;
}
.series-logo {
  width: 2.8rem;
  position: relative;
  padding: 0;
  margin: 0;
  background-position: center;
  background-size: contain;
  margin-right: 0.4rem;
  transition: all 0.2s;
}
.series-logo:before {
  content: "";
  display: block;
  padding-top: 100%;
}
/* .series-menu li {
  padding: 0;
  margin: 1rem;
  flex-grow: 1;
  width: 100%;
  position: relative;
}
.series-menu.series-logo {
  display: flex;
  flex-direction: row;
  border-radius: 25%;
  background: #131e29;
}
.series-menu.series-logo {
  background: unset;
}
.series-menu.series-logo {
  content: "";
  display: block;
  padding-top: 100%;
  transition: all 0.4s;
  border-radius: 50%;
}
.series-menu.series-logo {
  background: #1c2e3f;
  border-radius: 25%;
  transition: all 0.2s;
}
.series-logo {
  display: flex;
  justify-content: center;
  align-items: center;
   border: solid 1px #00ff00; 
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
   position: absolute; 
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0.8rem;
} */
a {
  color: unset;
  text-decoration: none;
}
a:visited {
  color: unset;
}
a:hover {
  color: unset;
}
</style>
