<template>
	<div>
		<header-component></header-component>
		<router-view></router-view>
		<footer-component></footer-component>
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

<style>
</style>
