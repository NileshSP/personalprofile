<script>
  import { fade, fly, slide } from 'svelte/transition';

	let visible = false;
	const listDetails = [
		["linkedIn", "https://www.linkedin.com/in/nileshspatel", "linkedin.com/in/nileshspatel", "web"],
		["email", "mailto:emailnileshp@gmail.com", "emailnileshp@gmail.com", "app"],
		["call/msg", "tel:+1-647-219-3220", "+1-647-219-3220", "app"],
		["github", "https://github.com/NileshSP", "github.com/NileshSP", "web"]
	]
 
	function typewriter(node, { speed = 50 }) {
		const valid = (
			node.childNodes.length === 1 &&
			node.childNodes[0].nodeType === 3
		);

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

		const text = node.textContent;
		const duration = text.length * speed;

		return {
			duration,
			tick: t => {
				const i = ~~(text.length * t);
				node.textContent = text.slice(0, i);
			}
		};
	}

</script>
<svelte:head>
	<title>Nilesh - Contact</title>
</svelte:head>
<div class="mainContainer" in:fade="{{ delay : 500, duration: 1000}}" out:fade>
	<h2 in:fly="{{ y: 200, duration: 2000 }}" >{`<a>contact me</a>`}</h2>
		<div class="contactDetails" >
			{#each listDetails as [name, link, display, type],i}
				<div>{name}</div>
				<div>=></div>
				<div>
					<a rel="noopener, preconnect" 
						href={link} 
						target={type === "web" ? "_blank" : "_self"}>
						{display}
					</a>
				</div> 
			{/each}
		</div>
</div>
<style>
.mainContainer {
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
.contactDetails {
	margin: 0 auto;
	padding:2rem;
	display:grid;
	place-items: start;
	grid-template-columns: 1fr .5fr 2fr;
	max-width:310px;
	font-size: 80%;
	animation: backgroundAnimation 2s;
}

@keyframes backgroundAnimation {
	0% { transform: scale(0) };
	50% { transform: scale(1.2) };
	100% { transform: scale(1) };
}

a {
	cursor:hand;
}

</style>
