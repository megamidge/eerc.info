<template>
	<!-- <div> -->
	<div class="header" ref="header">
		<img src="/img/eerclogo_0.png" style="height:auto;width:4rem;margin:0.5rem;" />
		<nav class="menu">
			<ul>
				<li @click="$router.push('/')">Home</li>
				<li id="leagues" style="position:relative;">
					Leagues
					<ul class="series-menu">
						<li v-for="(serie,index) in this.series" :key="index">
							<router-link :to="'/league/' + serie.code">
								<div class="series-logo" :style="{backgroundImage:`url(img/logos/${serie.logo})`}"></div>
								<p>{{serie.code}}</p>
							</router-link>
						</li>
					</ul>
				</li>
				<li @click="$router.push('/Gallery')">Gallery</li>
				<li @click="$router.push('/About')">About</li>
			</ul>
		</nav>
		<div>
			<h5>This site is under construction.</h5>
			<h6>Check back often to see frequent changes.</h6>
		</div>
		<nav class="mobile-menu">
			<menu-icon @toggle="showMobileMenu" :toggled="mobileMenuToggle" style="z-index:110;margin:.6rem"></menu-icon>
			<transition name="slide">
				<ul v-if="mobileMenuToggle">
					<div :style="{height:`${mobNavHeight}px`}"></div>
					<li @click="$router.push('/')">Home</li>
					<li id="leagues" style="position:relative;">
						Leagues/Series
						<ul class="series-menu">
							<li v-for="(serie,index) in this.series" :key="index">
								<router-link :to="'/league/' + serie.code">
									<div class="series-logo" :style="serie.logo"></div>
									<p>{{serie.code}}</p>
								</router-link>
							</li>
						</ul>
					</li>
					<li @click="$router.push('/Gallery')">Gallery</li>
					<li @click="$router.push('/About')">About</li>
				</ul>
			</transition>
		</nav>
	</div>
	<!-- <router-view></router-view> -->
	<!-- </div> -->
</template>

<script>
import MenuIcon from '@/components/menu-icon'
import { mapGetters } from 'vuex'
export default {
	components: {
		MenuIcon,
	},
	data() {
		return {
			mobileMenuToggle: false,
			mobNavHeight: 0,
		}
	},
	computed: {
		...mapGetters(['series']),
	},
	methods: {
		gotosite(site) {
			window.open(site)
		},
		showMobileMenu(toggle) {
			this.mobileMenuToggle = toggle
			this.mobNavHeight = this.$refs.header.clientHeight
		},
	},
	watch: {
		$route(to, from) {
			this.mobileMenuToggle = false
		},
	},
}
</script>

<style scoped>
.header {
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
	background: var(--colour-main);
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
.menu > ul {
	flex-direction: row;
}
.menu ul,
.mobile-menu ul {
	list-style: none;
	padding: 0;
	margin: 0;
	cursor: pointer;
	display: flex;
}
.menu li,
.mobile-menu li {
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
.menu li:hover,
.mobile-menu li:hover {
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
	min-width: 8rem;
	top: 100%;
	left: 0;
	right: 0;
	background: var(--colour-main);
	border-style: solid;
	border-width: 0 0 0.6rem 0;
	visibility: collapse;
	transition: visibility 0.4s;
	transition-delay: 0.3s;
	transition: 0s visibility;
	transition-delay: 0.3s;
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
	opacity: 1;
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
	content: '';
	display: block;
	padding-top: 100%;
}
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

.externalLink {
	background-color: var(--colour-main);
	padding: 10px;
	border-radius: 0.2rem;
	margin: 1rem;
	outline: none;
	border: none;
	color: var(--text);
	cursor: pointer;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	border-bottom: 0.2rem solid;
}
.externalLink:hover {
	background-color: var(--accent-dark);
}
#externalLinkIcon {
	width: 32px;
	height: 32px;
}
.mobile-menu {
	display: none;
	position: relative;
	user-select: none;
}
.mobile-menu > ul {
	position: absolute;
	right: 0;
	background: var(--colour-main);
	top: 0;
	width: 50vw;
	height: 100vh;
	position: fixed;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
}
.mobile-menu li {
	margin: 0.2rem;
	padding: 0.4rem;
	height: unset;
	font-size: 1.2rem;
}
.slide-enter,
.slide-leave-to {
	transform: translateX(100%);
}
.slide-enter-active,
.slide-leave-active {
	transition: all 0.2s;
}
@media screen and (max-width: 640px) {
	.externalLink #externalLinkText {
		display: none;
	}
	.externalLink #externalLinkIcon {
		width: 64px;
		height: 64px;
	}
	.menu ul {
		display: none;
	}
	.mobile-menu {
		display: block;
	}
}
</style>
