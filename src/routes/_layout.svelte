<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>
<link href="https://fonts.googleapis.com/css?family=Fira+Code&display=swap" rel="stylesheet">
<style>
	.layoutContainer {
		animation :color-change 3s linear infinite alternate both;
		width:100%;
		height:100vh;
	}
	.nav {
		animation :color-change 3s linear infinite alternate both;
		position: sticky;
		top:0;
		display: grid;
		place-items: center;
		z-index:2;
	}
	main {
		position: relative;
		background-color: inherit;
		padding: 0;
		margin: 0 auto;
		box-sizing: border-box;
		overflow: auto;
	  height: calc(100vh - 70px);
	}
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
