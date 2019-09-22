<script >
	import { fade, fly } from 'svelte/transition';
	import { onMount } from "svelte";
	import { pwaDeferredPrompt } from '../stores.js'

	export let listBioDetails = []

	let deferredPrompt; 
	let componentVisible = false; 
	let btnInstallAppVisible = false;

	onMount(() => {
		if($pwaDeferredPrompt !== null) {
			deferredPrompt = $pwaDeferredPrompt;
			btnInstallAppVisible = true;
		}
		setTimeout(() => componentVisible = true, 100);
	});

	const handleInstall = (e) => {
		console.log(`app install called`)
		e.preventDefault();
		//deferredPrompt = e;
		if($pwaDeferredPrompt === null) {
			deferredPrompt = e;
			pwaDeferredPrompt.update(s => e);
		}
		else {
			deferredPrompt = $pwaDeferredPrompt;
		} 
		btnInstallAppVisible = true;
		console.log(`app install call complete`)
	}

	const installApp = (e) => {
		btnInstallAppVisible = false;
		deferredPrompt.prompt();
		deferredPrompt.userChoice
			.then((choiceResult) => {
				if (choiceResult.outcome === 'accepted') {
					btnInstallAppVisible = false;
					console.log('User accepted the A2HS prompt');
				} else {
					console.log('User dismissed the A2HS prompt');
				}
				//deferredPrompt = null;
				pwaDeferredPrompt.update(s => null);
			});
	};

</script>
<svelte:head>
	<title>Nilesh - Bio</title>
</svelte:head>
<svelte:window on:beforeinstallprompt={handleInstall} on:appinstalled={() => console.log('app is installed by now')}/>
{#if componentVisible }
<div class="mainContainer" in:fade="{{ delay : 500, duration: 2000}}" out:fade>
	<h2 in:fly="{{ x: -300, duration: 2000 }}" >{`<p>bio</p>`}</h2>
	<div class="main" >
		<div class="profilePhoto">
			<div >
				<span >constantly improvising...</span>
			</div>
		</div>
		<div class="profilePhotoCaption">Nilesh Patel</div>
		<br/>
		<div class="projects" >
			<h4>polygot developer with trial & errors available @</h4>
			<div class="projectList">
				{#each listBioDetails as [name, link, linktext],i}
					<div>{name}</div><div>-</div><div><a rel="noopener, preconnect" href={link} target="_blank">{linktext}</a></div> 
				{/each}
			</div>
		</div>
		<button id="btnInstallApp" class="installAppBanner" on:click={installApp} style={'display :' + (btnInstallAppVisible ? 'block' : 'none')} >Install app</button>
	</div>
</div>
{/if}
<style>
.mainContainer {
	height:87vh;
	color: #333;
	font-weight:500;
}
h2 {
	padding: 5% 0 0 10%;
	background: linear-gradient(180deg, orange , red);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.main {
	display:grid;
	place-items: center;
}

@keyframes initialTweak {
	50% 
	{ 	
		transform: rotateX(25deg);
		transform-origin: bottom;
 	};
}
@keyframes backgroundAnimation {
	50% { transform: scale(1.05) };
}
.profilePhoto {
	animation: backgroundAnimation 3s infinite 2s;
 	width: 50%;
	height: 50%;
	margin: 45% auto;
	perspective: 1000px;
	display:grid;
	place-items: center;
}
.profilePhoto div {
	animation: initialTweak 4s 1 5s;
	display: block;
	width: 100%;
	height: 100%;
	background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url('../favicon.png');
	background-size: cover;
	transform-style: preserve-3d;
	transition: all 0.5s;
	cursor:hand;
}

.profilePhoto:hover div {
	transform: rotateX(80deg);
	transform-origin: bottom;
}

.profilePhoto div:after {
	content: '';
	position: absolute;
	left: 0;
	bottom: -35px;
	width: 100%;
	height: 36px;
	background: inherit;
	background-size: cover;
	background-position: bottom;
	transform: rotateX(270deg);
	transform-origin: top;
}
.profilePhoto div span {
	color: white;
	position: absolute;
	top: 100%;
	left: 25%;
	width: 50%;
	font: bold 90% "Open Sans";
	text-align: center;
	transform: rotateX(-89.99deg);
	transform-origin: top;
	z-index: 1;
}
.profilePhoto div:before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border-radius: 50px;
	background: rgba(0, 0, 0, 0.5);
	box-shadow: 0 0 100px 50px rgba(0, 0, 0, 0.5);
	transition: all 0.5s;
	opacity: 0.15;
	transform: rotateX(95deg) translateZ(-80px) scale(0.75);
	transform-origin: bottom;
}

.profilePhoto:hover div:before {
	opacity: 1;
	box-shadow: 0 0 25px 25px rgba(0, 0, 0, 0.5);
	transform: rotateX(0) translateZ(-60px) scale(0.85);
}

.profilePhotoCaption {
	font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
	background: linear-gradient(120deg, white ,coral);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.projects {
	padding:1em 0em;
	text-align: center;
}
.projectList {
	margin: 0 auto;
	display:grid;
	place-items: start;
	grid-template-columns: 2fr 0.6fr 3fr;
	grid-gap: 6px;
	padding:0;
	max-width:310px;
	font-size:80%;
}
a, button {
	cursor:hand;
}
.installAppBanner {
	cursor: hand;
	border: solid 0px steelblue;
	margin:0;
	padding:5px;
	font-size: 8pt;
	background: transparent;
	border-radius: 40px;
	box-sizing: border-box;
	transition: box-shadow 1s;
	outline:none;
	z-index:1;
	position:relative;
}
.installAppBanner:hover {
	cursor: hand;
	/* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
	color:white;
}

.installAppBanner::after {
	content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
	border-radius: 40px;
  background: orange;
  z-index: -1;
  transition: transform 200ms ease-in;
	transform: scale(0);
  /* transform-origin: bottom right; */
}

.installAppBanner:hover::after {
 transform: scale(1);
  /* transform-origin: top left; */
}

@media screen and (min-width: 600px) {
	.profilePhoto {
		width: 200px;
		height: 200px;
		margin: 5% auto;
	}

	.profilePhoto div:after {
		bottom: -25px;
	}
}
</style>