<template>
  <div>
    <div class="header">
      <img src="img/eerclogo_0.png" style="height:auto;width:4rem;margin:0.5rem;">
      <!-- <nav class="menu">
        <ul>
          <li>Home</li>
          <li>Leagues/Series</li>
          <li>Gallery</li>
          <li>About</li>
        </ul>
      </nav>-->
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
}
.menu {
  display: block;
}
.menu ul {
  display: flex;
  flex-direction: row;
  list-style: none;
  padding: 0;
}
.menu li {
  margin: 0.5rem;
  float: left;
  /* position: relative; */
  width: auto;
}
.seriesDropdown {
  display: flex;
  flex-direction: row;
  background: #ffffff;
  margin: 0;
  padding: 1rem;
}
</style>
