<template>
	<div
		class="image-container"
		:class="{wide:displayType === 'wide', square:displayType==='square', tall:displayType==='tall'}"
	>
		<!-- <img v-show="!showMain" ref="image" class="lowres" :src="imageMeta.lowres">
		<img v-show="showMain" ref="mainImage" :src="`img/gallery/${image}`">-->
		<lazy-image
			:lowres="imageMeta.lowres"
			:source="`img/gallery/${image}`"
			@aspectRatioResolved="imageDisplayType"
		/>
		<div class="text">
			<h5>{{image}}</h5>
			<p>{{imageMeta.text}}</p>
		</div>
	</div>
</template>

<script>
import LazyImage from '@/components/lazy-image.vue'
export default {
	name: 'GalleryImage',
	components: {
		LazyImage,
	},
	props: {
		image: {
			type: String,
			default: '',
		},
		imageMeta: Object,
	},
	data() {
		return {
			displayType: 'default',
		}
	},
	methods: {
		imageDisplayType(ar) {
			// if (ar.x > 16 && ar.y >= 9 && ar.y < ar.x) this.displayType = 'wide'
			if (ar.y < ar.x && Math.abs(1 - ar.y / ar.x) > 0.5) this.displayType = 'wide'
			if (Math.abs(1 - ar.x / ar.y) < 0.4) this.displayType = 'tall'
			if (Math.abs(1 - ar.x / ar.y) < 0.2 && Math.abs(1 - ar.y / ar.x) < 0.2) this.displayType = 'square'
		},
	},
}
</script>

<style scoped>
.image-container {
	grid-column: auto/span 1;
	/* background: black; */
	position: relative;
	overflow: hidden;
	cursor: pointer;
}
.wide {
	grid-column: auto/span 3;
	grid-row: auto/span 2;
}
.square {
	grid-column: auto/span 2;
	grid-row: auto/span 2;
}
.tall {
	grid-row: auto/span 2;
}
.lazy-image {
	transition: all 0.4s;
	transition-delay: 0.2s;
	z-index: 1;
}
@media screen and (max-width: 460px) {
	.wide {
		grid-column: auto/span 2;
		grid-row: auto/span 1;
	}
}

.text {
	position: absolute;
	background: #000000aa;
	top: -1%;
	bottom: -1%;
	left: -1%;
	right: -1%;
	transform: rotateY(180deg);
	transition: all 0.4s;
	transition-delay: 0.2s;
	backface-visibility: hidden;
	display: block;
}
.image-container:hover .lazy-image {
	transform: rotateY(180deg);
	transition: all 0.4s;
	transition-delay: 0.4s;
}
.image-container:hover .text {
	transform: none;
	transition: all 0.4s;
	transition-delay: 0.4s;
}
</style>
