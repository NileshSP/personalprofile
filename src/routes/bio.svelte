<script >
	import BioDetails from "../components/biodetails.svelte";
	const listBioDetails = [
		["codepen.io", "https://codepen.io/nileshsp/", "codepen.io/nileshsp"],
		["repl.it", "https://repl.it/@NileshPatel", "repl.it/@NileshPatel"],
		["codesandbox.io","https://codesandbox.io/u/NileshSP", "codesandbox.io/u/NileshSP"],
		["stackblitz.com","https://stackblitz.com/@NileshSP", "stackblitz.com/@NileshSP"],
		["runkit.com","https://runkit.com/nileshsp","runkit.com/nileshsp"]
	]
</script>
<svelte:head>
	<title>Nilesh - Bio</title>
</svelte:head>
<BioDetails listBioDetails={listBioDetails} ></BioDetails>