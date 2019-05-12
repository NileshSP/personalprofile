<script>
	export let segment;
</script>

<style>
	nav {
		border-bottom: 1px solid #d6dff1;
		padding: 0 1em;
	}

	ul {
		border:solid 0px red;
		width:100%;
		margin: 0;
		padding: 0;
		display:grid;
		grid-auto-flow: column;
		justify-items:  center;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
	}

	li {
		display: block;
		padding:0 15px 0 15px;
	}

	.selected {
		position: relative;
		display: inline-block;
	}

	.selected::after {
		position: absolute;
		content: '';
		width: calc(100% - 1.1em);
		height: 2px;
		background-color: #7aa1f5;
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
		cursor:hand;
	}
</style>

<nav>
	<ul>
		<li><a rel=prefetch class='{segment === undefined ? "selected" : ""}' href='.' ><img src="person.svg" style="width:30px; height:30px;" alt="me" ></a></li>
		<li><a rel=prefetch class='{segment === "repositories" ? "selected" : ""}' href='repositories'><img src="github.svg" style="width:30px; height:30px;" alt="repositories" ></a></li>
		<li><a rel=prefetch class='{segment === "contact" ? "selected" : ""}' href='contact'><img src="email.svg" style="width:30px; height:30px;" alt="contact" ></a></li>
		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
		<!-- <li><a rel=prefetch class='{segment === "blog" ? "selected" : ""}' href='blog'>blog</a></li> -->
	</ul>
</nav>