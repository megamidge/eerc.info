<template>
	<div class="main-panel">
		<h1 style="margin:0;">Gallery</h1>
		<h4 style="margin:0;">(Prototype)</h4>
		<div class="gallery-panel">
			<gallery-image
				v-for="(image,index) in images"
				:key="index"
				:image="image.image"
				:imageMeta="image"
			></gallery-image>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
import GalleryImage from '@/components/gallery-image'
import { mapGetters } from 'vuex'
export default {
	name: 'Gallery',
	components: {
		GalleryImage,
	},
	computed: {
		...mapGetters({ images: 'galleryImages' }),
	},
	methods: {},
}
</script>

<style scoped>
.main-panel {
	display: flex;
	flex-direction: column;
	background: #18222c7f;
}
.gallery-panel {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 1rem;
	grid-auto-flow: row dense;
	grid-auto-rows: min-content;
	padding: 1rem;
}
.image-view .image-text {
	margin: 0.8rem;
	max-width: 35%;
}
@media screen and (min-width: 1200px) {
	.gallery-panel {
		grid-template-columns: repeat(5, 1fr);
	}
}
@media screen and (max-width: 800px) {
	.gallery-panel {
		grid-template-columns: repeat(3, 1fr);
	}
}
@media screen and (max-width: 460px) {
	.gallery-panel {
		grid-template-columns: repeat(2, 1fr);
	}
}
</style>
