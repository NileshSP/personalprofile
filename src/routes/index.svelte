<script >
	import { fade, fly } from 'svelte/transition';
	import { onMount } from "svelte";
	import { pwaDeferredPrompt } from '../stores.js'

	const listDetails = [
		["repl.it", "https://repl.it/@NileshPatel", "repl.it/@NileshPatel"],
		["codesandbox.io","https://codesandbox.io/u/NileshSP", "codesandbox.io/u/NileshSP"],
		["stackblitz.com","https://stackblitz.com/@NileshSP", "stackblitz.com/@NileshSP"],
		["runkit.com","https://runkit.com/nileshsp","runkit.com/nileshsp"]
	]

	let deferredPrompt;

	onMount(() => {
		if($pwaDeferredPrompt !== null) {
			deferredPrompt = $pwaDeferredPrompt;
			btnInstallApp.style.display = 'block';
		}
	});

	const handleInstall = (e) => {
		e.preventDefault();
		//deferredPrompt = e;
		if($pwaDeferredPrompt === null) {
			deferredPrompt = e;
			pwaDeferredPrompt.update(s => e);
		}
		else {
			deferredPrompt = $pwaDeferredPrompt;
		} 
		btnInstallApp.style.display = 'block';
	}

	const installApp = (e) => {
		btnInstallApp.style.display = 'none';
		deferredPrompt.prompt();
		deferredPrompt.userChoice
			.then((choiceResult) => {
				if (choiceResult.outcome === 'accepted') {
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
<div class="mainContainer" on:load={handleInstall} in:fade="{{ delay : 500, duration: 1000}}" out:fade>
	<h2 in:fly="{{ x: -300, duration: 2000 }}" >{`<p>bio</p>`}</h2>
	<div class="main" in:fade >
		<div class="profilePhoto">
			<img alt='Nilesh' src='favicon.png' />
			<div class="profilePhotoCaption">Nilesh Patel</div>
			<div class="profilePhotoPara">constantly improvising...</div>
		</div>
		<br/>
		<div class="projects" >
			<h4>polygot developer with trial & errors available @</h4>
			<div class="projectList">
				{#each listDetails as item,i}
					<div>{item[0]}</div><div>-</div><div><a rel="noopener, preconnect" href={item[1]} target="_blank">{item[2]}</a></div> 
				{/each}
			</div>
		</div>
		<button id="btnInstallApp" class="installAppBanner" on:click={installApp}>Install app</button>
	</div>
</div>
<style>
.mainContainer {
	height:87vh;
	color: #333;
	font-weight:500;
}
.main {
	display:grid;
	place-items: center;
}
@keyframes backgroundAnimation {
	50% { transform: scale(1.05) };
}

@keyframes backgroundAnimationIn {
	0% { opacity:0 };
	50% { opacity:0.5 };
	100% { opacity:1 };
}

.profilePhoto {
	padding:2em 0em;
	display:grid;
	place-items: center;
	animation: backgroundAnimationIn 2s, backgroundAnimation 3s infinite 2s;
}
.profilePhoto > img {
	max-width: 50%;
	height:auto;
}
.profilePhotoCaption {
	font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.profilePhotoPara {
	text-align: center;
	font-size:80%;
	width:40%;
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
	display:none;
	cursor: hand;
	border: solid 0px orange;
	margin:0;
	padding:5px;
	font-size: 8pt;
	background: transparent;
	border-radius: 40px;
	box-sizing: border-box;
	transition: box-shadow 1s;
	outline:none;
}

.installAppBanner:hover {
	cursor: hand;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>