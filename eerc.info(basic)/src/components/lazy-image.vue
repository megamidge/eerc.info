<template>
	<!-- <transition name="crossfade" mode="in-out"> -->
	<intersect @enter="intersected" @leave="unintersected">
		<img
			class="lazy-image"
			ref="small"
			:src="imageSource"
			:class="{lowres:!ready}"
			:key="imageSource"
		/>
	</intersect>
	<!-- </transition> -->
</template>

<script>
import Intersect from 'vue-intersect'
export default {
	name: 'lazy-image',
	components: {
		Intersect,
	},
	props: {
		lowres: '',
		source: '',
	},
	data() {
		return {
			ready: false,
			inView: false,
		}
	},
	computed: {
		imageSource() {
			if (this.source == '') return
			if (this.ready) return this.source
			return this.lowres
		},
	},
	mounted() {
		this.$nextTick(() => {
			if (this.$refs.small.complete) this.aspectRatio()
			else this.$refs.small.addEventListener('load', this.aspectRatio)
		})
	},
	methods: {
		intersected() {
			this.inView = true
			if (this.ready) return
			setInterval(() => {
				if (!this.inView) return
				let mainImg = new Image()
				mainImg.src = this.source
				if (mainImg.complete) {
					this.ready = true
				} else {
					mainImg.addEventListener('load', () => {
						this.ready = true
					})
				}
			}, 80)
		},
		unintersected() {
			this.inView = false
		},
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
