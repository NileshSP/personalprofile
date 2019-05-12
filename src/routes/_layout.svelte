<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
	.layoutContainer {
		animation :color-change 5s linear infinite alternate both;
		width:100%;
		height:100%;
	}

	.nav {
		animation :color-change 5s linear infinite alternate both;
		position: sticky;
		top:0;
		display: grid;
		place-items: center;
		z-index:2;
	}

	main {
		position: relative;
		max-width: 56em;
		background-color: transparent;
		padding: 1.5em;
		margin: 0 auto;
		box-sizing: border-box;
	}

	/* .color-change {
	        animation: color-change-2x 2s linear infinite alternate both;
	} */

	@keyframes color-change {
		0% {
			background: #19dcea;
		}
		100% {
			background: #74e7ce;
		}
	}

</style>
<div class="layoutContainer">
	<div class="nav">
		<Nav {segment}/>
	</div>
	<main>
		<slot></slot>
	</main>
</div>
