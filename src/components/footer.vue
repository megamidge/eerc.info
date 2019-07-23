<template>
	<div class="footer">
		<div class="row">
			<small>European Electronic Racing Community</small>
			<button @click="gotosite('https://discord.gg/U2KrZGP')" class="externalLink">
				<h2 id="externalLinkText">Join the EERC Discord</h2>
				<img id="externalLinkIcon" src="/img/svg/discord-logo.svg" alt="[external link]" />
			</button>
			<div class="follow">
				<p>Follow us:</p>
				<a id="twitter" target="_blank" href="https://twitter.com/EERC_Official"></a>
				<a id="insta" target="_blank" href="https://www.instagram.com/eerc_official/"></a>
				<a
					id="yt"
					target="_blank"
					href="https://www.youtube.com/channel/UC4kk8xdkgP1arwEgD7G4Nlw?sub_confirmation=1"
				></a>
			</div>
		</div>
		<div class="row">
			<div class="paypal">
				<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
					<input type="hidden" name="cmd" value="_s-xclick" />
					<input type="hidden" name="hosted_button_id" value="WT96RWAPDAZ8S" />
					<input
						type="image"
						src="https://www.paypalobjects.com/en_US/GB/i/btn/btn_donateCC_LG.gif"
						border="0"
						name="submit"
						title="PayPal - The safer, easier way to pay online!"
						alt="Donate with PayPal button"
					/>
					<img alt border="0" src="https://www.paypal.com/en_GB/i/scr/pixel.gif" width="1" height="1" />
				</form>
				<small>Help fund the league by donating via PayPal</small>
				<small>Donators may be entered into exclusive prize draws and more</small>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		gotosite(site) {
			window.open(site)
		},
	},
}
</script>

<style scoped>
.footer {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding-top: 1rem;
	padding-bottom: 2rem;
	background: var(--colour-main);
	border-style: solid;
	border-width: 0.6rem 0 0 0;
	overflow: hidden;
}
.row {
	width: 100%;
	max-width: 80rem;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	margin-top: 1rem;
}
.paypal {
	display: flex;
	flex-direction: column;
}
.externalLink {
	background-color: var(--colour-main);
	padding: 10px;
	border-radius: 0.2rem;
	outline: none;
	border: none;
	color: var(--text);
	cursor: pointer;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	/* border-bottom: 0.2rem solid; */
}
.externalLink:hover {
	background-color: var(--accent-dark);
}
#externalLinkIcon {
	width: 32px;
	height: 32px;
}
.follow {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
}
.follow a {
	width: 1.4rem;
	height: 1.4rem;
	border-radius: 0.2rem;
	margin-right: 0.1rem;
}
.follow p {
	margin: 0;
}
a[href*='twitter.com/'] {
	background: var(--accent-bright) url(https://twitter.com/favicon.ico) no-repeat center;
	background-size: contain;
}

a[href*='instagram.com/'] {
	background: var(--accent-bright) url(https://instagram.com/favicon.ico) no-repeat center;
	background-size: contain;
}
a[href*='youtube.com/'] {
	background: var(--accent-bright) url(https://youtube.com/favicon.ico) no-repeat center;
	background-size: contain;
}
@media screen and (max-width: 640px) {
	.externalLink #externalLinkText {
		display: none;
	}
	.externalLink #externalLinkIcon {
		width: 64px;
		height: 64px;
	}
	.follow {
		flex-direction: column;
	}
	.follow p {
		transform: rotate(90deg) translateY(-100%) translateX(50%);
		white-space: nowrap;
	}
}
</style>
