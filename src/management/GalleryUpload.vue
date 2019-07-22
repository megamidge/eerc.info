<template>
	<div class="wrapper">
		<small>
			<i>
				Admin page only. If you're not EERC staff, kindly fuck off back
				<a href="http://eerc.info">home</a>.
			</i>
		</small>
		<h2>EERC Gallery Image Uploader</h2>
		<div v-html="responseData"></div>
		<form @submit.prevent="uploadImage" method="POST" enctype="multipart/form-data" class="form">
			<div class="image-input">
				<p>Image:</p>
				<img :src="previewImage" />
				<input type="file" name="fileToUpload" id="fileToUpload" @change="fileChange" />
			</div>
			<div class="meta-input">
				<h3>Meta data:</h3>
				<div class="items">
					<div class="item">
						<p>Description:</p>
						<textarea
							type="text"
							name="description"
							placeholder="What is going on here?"
							v-model="description"
						/>
					</div>
					<div class="item">
						<p>League:</p>
						<!-- <input type="text" name="league" placeholder="MSR/GT/F1/M1E/DIRT" v-model="league" /> -->
						<select v-model="league">
							<option value selected>None</option>
							<option v-for="league in leagues" :key="league" :value="league">{{league}}</option>
						</select>
					</div>
					<div class="item">
						<p>Season:</p>
						<!-- <input type="text" name="season" placeholder="Season 1" v-model="season" /> -->
						<select v-model="season">
							<option value selected>None</option>
							<option v-for="season in seasons" :key="season" :value="season">{{season}}</option>
						</select>
					</div>
					<!-- <div class="item">
						<p>Race:</p>
						<input type="text" name="race" placeholder="Round 1" v-model="race" />
					</div>-->
					<div class="item">
						<p>Track:</p>
						<select v-model="track" v-if="tracks.length>0">
							<option value selected>None</option>
							<option v-for="track in tracks" :key="track" :value="track">{{track}}</option>
						</select>
						<input
							v-else
							type="text"
							name="track"
							placeholder="InDiAnapOlIs MoToR SPEeDwaY"
							v-model="track"
						/>
					</div>
					<div class="item">
						<p>Extra tags (comma seperated):</p>
						<input
							type="text"
							name="tags"
							placeholder="Ooh, ee, ooh, ooh, ah, ting, tag, wallaballa, bing, bang"
							v-model="tags"
						/>
					</div>
				</div>
			</div>
			<p>Password:</p>
			<input
				type="text"
				name="password"
				id="password"
				placeholder="password"
				autocomplete="password"
				v-model="password"
			/>
			<input type="submit" value="Upload Image" name="submit" />
		</form>
	</div>
</template>

<script>
import Ajax from '@/ajax.js'
import axios from 'axios'
import { mapGetters, mapState } from 'vuex'
export default {
	data() {
		return {
			password: '',
			tags: '',
			race: '',
			track: '',
			season: '',
			league: '',
			description: '',
			image: null,
			previewImage: '',
			responseData: '',
			trackRoundPairs: [],
		}
	},
	computed: {
		...mapGetters(['series']),
		...mapState(['calendar']),
		leagues() {
			return this.series.map((s) => s.code).sort()
		},
		seasons() {
			if (this.league == null || this.league == '') return
			let series = this.calendar.find((c) => c.series == this.league)
			return series.seasons.map((s) => s.seasonName)
		},
		tracks() {
			if (this.league != null && this.league != '') {
				if (this.season != null && this.season != '') {
					//Tracks in season only)
					let season = this.calendar.find((c) => c.series == this.league).seasons.find((s) => s.seasonName == this.season)
					let trackNames = season.events.map((e) => e.track || e.location)
					this.trackRoundPairs = season.events.map((e) => {
						return { track: e.track || e.location, round: 'Round ' + (season.events.findIndex((i) => i == e) + 1) }
					})
					return [...new Set(trackNames)].sort()
				} else {
					//Any track raced in that league OR anything
					return []
				}
			} else {
				//Allow anything to be entered :shrug:
				return []
			}
		},
	},
	methods: {
		fileChange(e) {
			console.log(e)
			var files = e.target.files || e.dataTransfer.files
			console.log(files)
			if (!files.length) return
			this.image = files[0]
			this.previewImage = URL.createObjectURL(this.image)
		},
		uploadImage() {
			console.log('image', this.image)
			let formData = new FormData()
			formData.append('file', this.image)
			formData.append('password', this.password)
			formData.append('description', this.description)
			formData.append('league', this.league)
			formData.append('season', this.season)
			formData.append('race', this.race)
			formData.append('track', this.track)
			formData.append('tags', this.tags)

			axios
				.post('/api/gallery-upload-test.php', formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				})
				.then((response) => {
					console.log(response, response.data)
					this.responseData = response.data
				})
				.catch((error) => {
					console.log(error)
				})
		},
	},
	watch: {
		league() {
			this.season = ''
		},
		season() {
			this.track = ''
			this.race = ''
		},
		track() {
			if (this.track != null && this.track != '') {
				let kvP = this.trackRoundPairs.find((e) => e.track == this.track)
				if (kvP) this.race = kvP.round
				else this.race = ''
			}
		},
	},
}
</script>

<style scoped>
.wrapper {
	background-color: var(--background);
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	padding: 0.8rem;
}
a {
	text-decoration: none;
	color: var(--text);
	font-weight: bold;
	font-style: italic;
}
a:hover {
	color: var(--text-hover);
}
.form {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}
.image-input {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}
.image-input img {
	max-width: 100%;
}
.meta-input {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}
.meta-input .items {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	flex-wrap: wrap;
}
.meta-input .items .item {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	padding: 0.2rem;
}
</style>
