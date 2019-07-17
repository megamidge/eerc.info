<template>
	<div class="menu-icon" @click="toggle" :class="{toggled:toggled}">
		<div class="bar"></div>
		<div class="bar"></div>
		<div class="bar"></div>
	</div>
</template>

<script>
export default {
	name: 'menu-icon',
	props: {
		toggled: false,
	},
	methods: {
		toggle() {
			this.$emit('toggle', !this.toggled)
		},
	},
}
</script>

<style>
.menu-icon {
	position: relative;
	cursor: pointer;
	height: 2rem;
	width: 2rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.menu-icon .bar {
	position: absolute;
	height: 0.2rem;
	background: #d1d1d1;
	width: 100%;
	transition: all 0.2s;
}
.menu-icon .bar:nth-child(1) {
	top: 0;
}
.menu-icon .bar:nth-child(2) {
	top: 50%;
	transform: translateY(-50%);
}
.menu-icon .bar:nth-child(3) {
	bottom: 0;
}
.menu-icon.toggled .bar:nth-child(2) {
	opacity: 0;
}
.menu-icon.toggled .bar:nth-child(1) {
	top: 50%;
	transform: translateY(-50%) rotate(45deg) scaleX(1.2);
}
.menu-icon.toggled .bar:nth-child(3) {
	top: 50%;
	transform: translateY(-50%) rotate(-45deg) scaleX(1.2);
}
</style>
