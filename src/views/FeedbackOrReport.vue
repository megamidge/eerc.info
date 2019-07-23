<template>
	<div class="wrapper">
		<h2>Submit feedback or report a problem</h2>
		<p class="response">{{responseData}}</p>
		<form @submit.prevent="sendForm" method="POST" class="form">
			<div class="select-type">
				<p>Select feedback type:</p>
				<select v-model="feedbackType">
					<option value="none" selected>Select One</option>
					<option value="feedback">Feedback</option>
					<option value="report">Problem Report</option>
				</select>
			</div>
			<textarea
				:disabled="feedbackType=='none'"
				rows="12"
				cols="42"
				v-model="message"
				:placeholder="placeholder"
			></textarea>
			<input type="submit" value="Submit" name="submit" class="submit" />
		</form>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	data() {
		return {
			feedbackType: 'none',
			message: '',
			responseData: '',
		}
	},
	computed: {
		placeholder() {
			if (this.feedbackType == 'feedback') return 'Tell us what you think.'
			if (this.feedbackType == 'report') return 'Describe the problem. The more detail the better, as it will make fixing it easier.'
			return 'Select a feedback type.'
		},
	},
	methods: {
		sendForm() {
			let formData = new FormData()
			formData.append('type', this.feedbackType)
			formData.append('message', this.message)
			axios
				.post('/api/feedback-or-report.php', formData)
				.then((response) => {
					console.log(response.data)
					this.responseData = response.data
				})
				.catch((error) => {
					console.log(error)
					this.responseData = error.message
				})
		},
	},
}
</script>

<style scoped>
.wrapper {
	background: var(--colour-main);
	padding: 0.4rem;
	margin: 1rem;
}
.wrapper h2 {
	margin: 0;
}
.form {
	display: flex;
	flex-direction: column;
}
.form .select-type {
	display: flex;
	flex-direction: row;
	margin: 0.4rem;
}
.form .select-type p {
	margin: 0.2rem;
}
input {
	background: var(--accent-dark);
	border: none;
	border-bottom: solid 0.1rem var(--accent-bright);
	color: var(--text);
}
.submit {
	border: solid 0.1rem var(--accent-bright);
	background-color: var(--accent-bright-alt);
	outline: none;
	cursor: pointer;
}
.submit:active {
	background-color: var(--accent-bright);
}
select {
	border: none;
	color: var(--text);
	background: var(--accent-dark);
	outline: none;
}
textarea {
	background: var(--accent-dark);
	color: var(--text);
	border: none;
	padding: 0.4rem;
	margin: 0.2rem;
}
.response {
	background: var(--accent-bright);
}
</style>
