<template>
	<!-- <transition name="crossfade" mode="in-out"> -->
	<img class="lazy-image" ref="small" :src="imageSource" :class="{lowres:!ready}" :key="imageSource">
	<!-- </transition> -->
</template>

<script>
export default {
	name: 'lazy-image',
	props: {
		lowres: '',
		source: '',
	},
	data() {
		return {
			ready: false,
		}
	},
	computed: {
		imageSource() {
			if (this.ready) return this.source
			return this.lowres
		},
	},
	mounted() {
		this.$nextTick(() => {
			if (this.$refs.small.complete) this.aspectRatio()
			else this.$refs.small.addEventListener('load', this.aspectRatio)

			let mainImg = new Image()
			mainImg.src = this.source
			if (mainImg.complete) {
				this.ready = true
				// this.$refs.small.src = this.source
			} else
				mainImg.addEventListener('load', () => {
					this.ready = true
					// this.$refs.small.src = this.source
					// this.$refs.small.removeEventListener('load', this.aspectRatio)
				})
		})
	},
	methods: {
		aspectRatio() {
			let img = this.$refs.small
			let gcd = this.greatestCommonDenominator(img.naturalWidth, img.naturalHeight)
			let aspectRatio = {
				x: img.naturalWidth / gcd,
				y: img.naturalHeight / gcd,
			}
			this.$emit('aspectRatioResolved', aspectRatio)
		},
		greatestCommonDenominator(a, b) {
			if (b === 0) return a
			return this.greatestCommonDenominator(b, a % b)
		},
	},
}
</script>

<style scoped>
.crossfade-enter-active,
.crossfade-leave-active {
	position: absolute;
}
.crossfade-enter,
.crossfade-leave-to {
	opacity: 0;
}
img {
	display: block;
	object-fit: cover;
	width: 100%;
	height: 100%;
}
.lowres {
	image-rendering: pixelated;
}
</style>
