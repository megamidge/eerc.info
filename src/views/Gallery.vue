<template>
	<div class="main-panel">
		<h1 style="margin:0;">Gallery</h1>
		<div class="filter">
			<div class="filter-item tags">
				<input type="text" placeholder="Search tags" v-model="searchTerms" />
				<button>
					<magnify />
				</button>
			</div>
			<div class="filter-item league">
				<p>League:</p>
				<select v-model="selectedLeague">
					<option value="any" selected>Any</option>
					<option v-for="league in leagues" :value="league" :key="league">{{league}}</option>
				</select>
			</div>
			<div class="filter-item season">
				<p>Season:</p>
				<select :disabled="selectedLeague == 'any'" v-model="selectedSeason">
					<option value="any" selected>Any</option>
					<option v-for="season in seasons" :key="season" :value="season">{{season}}</option>
				</select>
			</div>
			<div class="filter-item track">
				<p>Track:</p>
				<select v-model="selectedTrack">
					<option value="any" selected>Any</option>
					<option v-for="track in tracks" :key="track" :value="track">{{track}}</option>
				</select>
			</div>
		</div>
		<div class="gallery-panel">
			<gallery-image
				v-for="(image,index) in imagesFiltered"
				:key="index"
				:image="image.image"
				:imageMeta="image"
			></gallery-image>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
import Magnify from 'vue-material-design-icons/Magnify.vue'
import GalleryImage from '@/components/gallery-image'
import { mapGetters } from 'vuex'
export default {
	name: 'Gallery',
	components: {
		GalleryImage,
		Magnify,
	},
	data() {
		return {
			selectedLeague: 'any',
			selectedSeason: 'any',
			selectedTrack: 'any',
			searchTerms: '',
		}
	},
	computed: {
		...mapGetters({ images: 'galleryImages' }),
		imagesFiltered() {
			let leagueSelected = this.selectedLeague != 'any'
			let seasonSelected = this.selectedSeason != 'any'
			let trackSelected = this.selectedTrack != 'any'
			let filtered = this.images
			if (leagueSelected) filtered = filtered.filter((i) => i.league == this.selectedLeague)
			if (seasonSelected) filtered = filtered.filter((i) => i.season == this.selectedSeason)
			if (trackSelected) filtered = filtered.filter((i) => i.track == this.selectedTrack)

			let split = this.searchTerms.match(/(?:[^\s"]+|"[^"]*")+/g) //split into strings sperated by spaces except spaces inside quotes.
			if (split != null) {
				split = split.map((s) => s.replace(/\"/g, ''))
				let arr = []
				filtered.forEach((f) => {
					if (f.tags) {
						f.tags.forEach((t) => {
							split.forEach((s) => {
								if (t.toLowerCase().includes(s.toLowerCase())) {
									if (!arr.includes(f)) arr.push(f)
								}
							})
						})
					}
				})
				return arr
				//this block of code should redone at some point as it is really shit. (but it works)
			}

			return filtered
		},
		leagues() {
			return [...new Set(this.images.map((i) => i.league))].filter((e) => e != null && e != '').sort()
		},
		seasons() {
			let s = this.images.filter((i) => i.league == this.selectedLeague)
			return [...new Set(s.map((i) => i.season))].filter((s) => s != null && s != '').sort()
		},
		tracks() {
			let leagueSelected = this.selectedLeague != 'any'
			let seasonSelected = this.selectedSeason != 'any'
			let filtered = this.images
			if (leagueSelected) filtered = filtered.filter((i) => i.league == this.selectedLeague)
			if (seasonSelected) filtered = filtered.filter((i) => i.season == this.selectedSeason)
			return [...new Set(filtered.map((i) => i.track))].filter((e) => e != null && e != '').sort()
		},
	},
	methods: {},
	watch: {
		selectedLeague() {
			this.selectedSeason = 'any'
			this.selectedTrack = 'any'
		},
		selectedSeason() {
			this.selectedTrack = 'any'
		},
	},
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
.filter {
	background: rgb(var(--colour-main));
	margin: 1rem;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	padding: 0.2rem;
}
.filter-item {
	display: flex;
	flex-direction: row;
	margin-bottom: 0.2rem;
}
.filter-item select {
	border: none;
	color: var(--text);
	background: rgb(var(--accent-dark));
	outline: none;
}
.filter-item select[disabled] {
	color: var(--text-hover);
}
.filter-item p {
	margin: 0.2rem;
	font-size: 0.8rem;
}
.filter-item.tags {
	display: grid;
	grid-template-columns: auto 2rem;
	width: 100%;
	color: var(--text);
	flex-basis: 20rem;
}
.filter-item.tags input {
	min-width: 6.4rem;
	color: var(--text);
	background: rgb(var(--colour-main));
	border: none;
	border-bottom: solid 2px rgb(var(--accent-dark));
}
.filter-item button {
	color: var(--text);
	background: rgb(var(--accent-dark));
	border: none;
}
.filter-item button:focus {
	outline: none;
}
.filter-item button:hover {
	background: var(--accent-bright);
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
