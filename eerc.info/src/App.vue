<template>
	<div id="app">
		<router-view />
	</div>
</template>

<style lang="less">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: var(--text);
	margin: 0;
	padding: 0;
}
body {
	--accent-dark: #12181f;
	--accent-bright: #25415d;
	--accent-bright-alt: #4b6987;
	--alert: #cc0000;
	--colour-main: #18222c;
	--background: #2c3e50;
	--text: #d1d1d1;
	--text-hover: #797979;

	margin: 0;
	padding: 0;
	background-color: var(--background);
	background: url('/img/eerc_background.png') var(--background) no-repeat fixed;
	background-position: center top;
	background-size: 150%;
}
</style>
