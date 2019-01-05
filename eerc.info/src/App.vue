<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #d1d1d1;
  margin: 0;
  padding: 0;
}
body {
  margin: 0;
  padding: 0;
  background-color: #2c3e50;
  background: url('/img/eerc_background.png') #2c3e50 no-repeat fixed;
  background-position:center top;
  background-size:150%;
}
</style>
