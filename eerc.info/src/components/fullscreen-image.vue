<template>
	<div class="fullscreen-image" @click="$router.go(-1)">
		<div class="wrapper">
			<lazy-image :lowres="'/'+$route.query.image" :source="'/'+$route.query.image"/>
		</div>
	</div>
</template>

<script>
import LazyImage from '@/components/lazy-image'
export default {
	components: {
		LazyImage,
	},
}
</script>

<style>
.fullscreen-image {
	position: fixed;
	z-index: 100;
	background: #000000aa;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	/* overflow: scroll; */
}
.wrapper {
	max-width: 50%;
	max-height: 80%;
}
</style>
