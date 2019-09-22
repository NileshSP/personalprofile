<script>
import ListContacts from "../components/listContacts.svelte";
const preloadContacts = [
	["linkedIn", "https://www.linkedin.com/in/nileshspatel", "linkedin.com/in/nileshspatel", "web"],
	["email", "mailto:emailnileshp@gmail.com", "emailnileshp@gmail.com", "app"],
	["call/msg", "tel:+1-647-219-3220", "+1-647-219-3220", "app"],
	["github", "https://github.com/NileshSP", "github.com/NileshSP", "web"]
];

</script>
<svelte:head>
	<title>Nilesh - Contact</title>
</svelte:head>
<ListContacts listContactsDetails={preloadContacts} ></ListContacts>