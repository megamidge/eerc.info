<template>
  <div>
    <div class="header">
      <img src="img/eerclogo_0.png" style="height:auto;width:4rem;margin:0.5rem;">
      <nav class="menu">
        <ul>
          <li>Home</li>
          <li id="leagues">Leagues/Series
            <ul class="series-menu">
              <li>
                <div class="test" style="background-image: url('/img/eercwec.png');">WEC</div>
              </li>
              <li>
                <div class="test" style="background-image: url('/img/eercf1.png');">F1</div>
              </li>
              <li>
                <div class="test" style="background-image: url('/img/eercfe.png');">FE</div>
              </li>
              <li>
                <div class="test">GT</div>
              </li>
              <li>
                <div class="test">GIN</div>
              </li>
              <li>
                <div class="test">WRC</div>
              </li>
            </ul>
          </li>
          <li>Gallery</li>
          <li>About</li>
        </ul>
      </nav>
      <h4>This site is under construction.</h4>
      <h5>Check back often to see frequent changes.</h5>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
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
}
.menu {
  padding: 0;
  margin: 0;
  height: 100%;
}
.menu ul {
  display: flex;
  flex-direction: row;
  list-style: none;
  padding: 0;
  margin: 0;
}
.menu li {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  float: left;
  /* position: relative; */
  width: auto;
  height: 100%;
  padding: 3rem 0 3rem 0;
}
.series-menu {
  position: absolute;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: auto;
  top: 90%;
  left: 0;
  background: #18222c;
  border-style: solid;
  border-width: 0 0 0.6rem 0;
  visibility: collapse;
  transition: 0s visibility;
  transition-delay: 0.3s;
}
#leagues:hover .series-menu {
  visibility: visible;
  transition-delay: 0.1s;
}
.series-menu:hover {
  visibility: visible;
  transition-delay: 0.1s;
}
.series-menu li {
  padding: 0;
  margin: 0;
  flex-grow: 1;
  width: 100%;
  position: relative;
}
.series-menu li:before {
  content: "";
  display: block;
  padding-top: 100%;
}
.test {
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: solid 1px #00ff00; */
  background-size: contain;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
