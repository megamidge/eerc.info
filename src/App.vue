<template>
	<div id="app">
		<router-view />
	</div>
</template>

<style>
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
	--accent-dark: 32, 34, 37;
	--accent-bright: #313131;
	--accent-bright-alt: #1e2429;
	--highlight: #d65a31;
	--alert: #cc0000;
	--colour-main: 22, 22, 26;
	--background: 114, 126, 138;
	--text: #d1d1d1;
	--text-hover: #e8e8e8;
	margin: 0;
	padding: 0;
	background-color: rgb(var(--background));
	background: linear-gradient(rgba(var(--background), 0.65), rgba(var(--background), 0.65)), url('/img/eerc_background.png') no-repeat fixed,
		rgb(var(--background));
	background-position: center top;
	background-size: 150%;
}
@font-face {
	font-family: 'Vipnagorgialla';
	src: url('/font/vipnagorgialla.ttf');
}
</style>
