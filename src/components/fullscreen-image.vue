<template>
	<div class="fullscreen-image" @click.self="$router.push('/Gallery')">
		<div class="wrapper" @click.self="toggleTextMobile">
			<div class="image" @click.stop="toggleTextMobile">
				<div class="controls">
					<p @click.stop="$router.push('/Gallery')">&#10006;</p>
				</div>
				<lazy-image :lowres="`${imageItem.lowRes}`" :source="`/img/gallery/${$route.params.image}`" />
			</div>
			<div class="text" :class="{hidden:!showTextMobile}">
				<div class="controls">
					<p @click.stop="$router.push('/Gallery')">&#10006;</p>
				</div>
				<h4>{{imageItem.name}}</h4>
				<div class="meta" v-for="key in metaData" :key="key">
					<go-kart-track class="meta-item icon" v-if="key == 'track'" />
					<ticket-confirmation class="meta-item icon" v-else-if="key=='race'" />
					<calendar-text class="meta-item icon" v-else-if="key == 'season'" />
					<card-text class="meta-item icon" v-else-if="key == 'description'" />
					<code-braces class="meta-item icon" v-else-if="key == 'league'" />
					<square class="meta-item icon" v-else-if="key!='thumbnail'" />
					<p class="meta-item" v-if="key!='thumbnail'">{{imageItem[key]}}</p>
				</div>
				<div class="tags icon" v-if="tags">
					<pound-box />
					<div class="tags-div">
						<p v-for="tag in tags" :key="tag">{{tag}}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import PoundBox from 'vue-material-design-icons/PoundBox.vue'
import GoKartTrack from 'vue-material-design-icons/GoKartTrack.vue'
import TicketConfirmation from 'vue-material-design-icons/TicketConfirmation.vue'
import CalendarText from 'vue-material-design-icons/CalendarText.vue'
import CardText from 'vue-material-design-icons/CardText.vue'
import CodeBraces from 'vue-material-design-icons/CodeBraces.vue'
import Square from 'vue-material-design-icons/Square.vue'
import LazyImage from '@/components/lazy-image'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
export default {
	components: {
		LazyImage,
		PoundBox,
		GoKartTrack,
		TicketConfirmation,
		CalendarText,
		CardText,
		CodeBraces,
		Square,
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
		metaData() {
			return Object.keys(this.imageItem).filter((k) => k != 'image' && k != 'name' && k != 'lowRes' && k != 'tags')
		},
		tags() {
			return this.imageItem.tags
		},
	},
	methods: {
		toggleTextMobile() {
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
	text-align: left;
}
.text h4 {
	text-align: center;
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
.tags {
	display: grid;
	grid-template-columns: 1rem auto;
}
.tags p {
	margin: 0.1rem;
	background: var(--accent-dark);
	padding: 0.28rem;
	border-radius: 0.1rem;
	white-space: nowrap;
}
.tags-div {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
.tags .icon {
	padding: 0;
}
.meta {
	display: grid;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	grid-template-columns: 1rem auto;
}
.meta-item {
	margin: 0.1rem;
	padding: 0.2rem;
	border-radius: 0.1rem;
}
.meta .icon {
	padding: 0;
	background: none;
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
