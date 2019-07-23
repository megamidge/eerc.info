<template>
	<div id="basepage">
		<header-component></header-component>
		<router-view></router-view>
		<footer-component id="footerID"></footer-component>
	</div>
</template>

<script>
import HeaderComponent from '@/components/header'
import FooterComponent from '@/components/footer'
export default {
	name: 'base-page',
	components: {
		HeaderComponent,
		FooterComponent,
	},
}
</script>

<style scoped>
#basepage {
	min-height: 100vh;
	position: relative;
	display: flex;
	flex-direction: column;
}
#footerID {
	flex-grow: 1;
}
</style>
