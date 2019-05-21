<template>
	<img class="lazy-image" ref="small" :src="lowres" :class="{lowres:!ready}">
	<!-- <img class="lazy-image" v-show="ready" ref="image" :src="source"> -->
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
	mounted() {
		this.$nextTick(() => {
			if (this.$refs.small.complete) this.aspectRatio()
			else this.$refs.small.addEventListener('load', this.aspectRatio)

			let mainImg = new Image()
			mainImg.src = this.source
			if (mainImg.complete) {
				this.ready = true
				this.$refs.small.src = this.source
			} else
				mainImg.addEventListener('load', () => {
					this.ready = true
					this.$refs.small.src = this.source
					this.$refs.small.removeEventListener('load', this.aspectRatio)
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
img {
	display: block;
	object-fit: cover;
	width: 100%;
	height: 100%;
}
.lowres {
	z-index: -2;
	image-rendering: pixelated;
}
</style>
