<template>
	<div class="fullscreen-image" @click.self="$router.push('/Gallery')">
		<div class="wrapper" @click.self="toggleTextMobile">
			<div class="image" @click.stop="toggleTextMobile">
				<div class="controls">
					<p @click.stop="$router.push('/Gallery')">&#10006;</p>
				</div>
				<lazy-image :lowres="`${imageItem.lowres}`" :source="`${galleryPath}${$route.params.image}`"/>
			</div>
			<div class="text" :class="{hidden:!showTextMobile}">
				<div class="controls">
					<p @click.stop="$router.push('/Gallery')">&#10006;</p>
				</div>
				<h4>{{imageItem.image}}</h4>
				<p>{{imageItem.text}}</p>
			</div>
		</div>
	</div>
</template>

<script>
import LazyImage from '@/components/lazy-image'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
export default {
	components: {
		LazyImage,
	},
	data() {
		return {
			showTextMobile: true,
		}
	},
	computed: {
		...mapState(['routeQuery']),
		...mapGetters(['getImageByName', 'galleryPath']),
		imageItem() {
			return this.getImageByName(this.$route.params.image)
		},
	},
	methods: {
		toggleTextMobile() {
			console.log(this.showTextMobile)
			this.showTextMobile = !this.showTextMobile
		},
	},
}
</script>

<style scoped>
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
	background-color: #18222ccc;
	width: 95%;
	height: 95%;
	display: flex;
	flex-direction: row;
	word-wrap: break-word;
	align-items: stretch;
	justify-content: space-between;
	flex-wrap: nowrap;
}
.text {
	/* height: 100%; */
	/* width: 40%; */
	background-color: #18222c;
	padding: 0.4rem;
	box-sizing: border-box;
	justify-self: flex-end;
	min-width: 20rem;
	position: relative;
}
.image {
	width: 100%;
}
.image .controls {
	visibility: collapse;
	position: absolute;
}
.image img {
	object-fit: contain;
}
.controls {
	/* position: absolute; */
	top: 0;
	right: 0;
	height: 2rem;
	font-size: 1.6rem;
	padding: 0.2rem;
	width: 100%;
	text-align: right;
	display: flex;
	flex-direction: row-reverse;
	box-sizing: border-box;
}
.controls p {
	margin: 0;
}
.controls p:hover {
	color: #797979;
	cursor: pointer;
}
@media screen and (max-width: 660px) {
	.wrapper {
		height: 100vh;
		width: 100vh;
		flex-flow: column;
		justify-content: center;
	}
	.text {
		min-width: 0;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #18222cee;
		max-height: 100%;
		transition: all 0.4s;
	}
	.text .controls {
		visibility: collapse;
		height: 0px;
		width: 0px;
	}
	.hidden {
		transform: translateY(100%);
		opacity: 0;
		transition: all 0.4s;
	}
	.image {
		max-height: 100%;
	}
	.image .controls {
		visibility: visible;
		top: 0;
		left: 0;
		right: 0;
	}
}
</style>
