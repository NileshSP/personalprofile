<script context="module">
	export function preload({ params, query }) {
      return this.fetch(`https://api.github.com/users/NileshSP/repos`, {
        method:'GET',
         headers:{
        //   'Content-Type': 'application/json',
        //   'access_token': '6fe0b217842e21060cb3ff56ed7df9c41d1198d2',
        //   'Access-Control-Allow-Origin': '*',
        //   'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept"
        //  'Cache-Control': 'stale-while-revalidate=15'
         },
        mode: 'cors'      
      })
      .then(response => response.json())
      .then(data => {
        let preloadRepositories;
        if(data !== null || undefined) {
          preloadRepositories = data.map(r => ({
            id : r.id
            , name: r.name
            , url: r.html_url
            , description: r.description
            , createdat: r.created_at
            , updatedat: r.updated_at
            , demourl:r.homepage
            , languages: r.language
          }));
          preloadRepositories = preloadRepositories.sort(function(a, b) {
              var dateA = new Date(a.createdat), dateB = new Date(b.createdat);
              return dateB - dateA;
          });
          //console.log(repositories);
        }
        return { preloadRepositories };
    })  
    .catch (error => {
      console.log(`Error is : ${error}`);      
    });
	}
</script>
<script>
  import { fade, fly } from 'svelte/transition';
  import { onMount } from "svelte";

  export let repositories = {}, preloadRepositories = {};
  let repositoryYear = null;
  let position = "", flyIn = "";
  const duration = 2000;

  onMount(() => {
    repositories = preloadRepositories;
  })

  const getReadableDate = (dateVal) => { 
    const dateValue = (new Date(dateVal));
    return `${dateValue.getDate()} ${dateValue.toLocaleString('en-us', { month: 'short' })} ${dateValue.getFullYear()}`
  }
  const getPosition = (val) => val % 2 === 0 ? "left" : "right"
  const getItemTransition = (val) => (getPosition(val) === 'left' ? { x: -100, duration: duration } : { x: 100, duration: duration })
  const showYear = (dateVal) => {
    const newYear = (new Date(dateVal)).getFullYear();
    if (repositoryYear === null) {
      repositoryYear = newYear;
      return true;
    } 
    else if (repositoryYear !== newYear) {
      repositoryYear = newYear;
      return true;
    }
    else {
      return false;
    }
  }  

</script>
<svelte:head>
	<title>Nilesh - Repositories</title>
</svelte:head>
  <h2 in:fly={{ y: -100, duration: 2000 }} out:fade>[...github repositories]</h2>
  <div class="main" out:fade>
    <div class="timeline">
      {#each repositories as { id, name, url, description, createdat, updatedat, demourl, languages } ,i}
        {#if showYear(createdat)}
          <div class="containerYear" data-content={repositoryYear} in:fly="{{ y: -300, duration: duration }}">
          </div>
        {/if}
        <div class={"container " + getPosition(i)} data-content={(new Date(createdat)).toLocaleString('en-us', { month: 'short' })}>
          <div class="content" in:fly={getItemTransition(i)}>
            <h3><a rel="noopener, preconnect" href={url} target="_blank">{name}</a></h3>
            <p>{description}</p>
            <div class="contentFooter">
              <div>
                {#if demourl !== "" } <a rel="noopener, preconnect" href={demourl} target="_blank" >demo</a>{/if}
              </div>
              <div>
                <i>initiated @ {getReadableDate(createdat)}</i>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
<style>
:root {
  --shadowValue : 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

* {
  margin:0;
  padding:0;
  bottom:10px;
  box-sizing: border-box;
  font-family: Helvetica, sans-serif;
  border:solid 0px red;
}

a {
	color: rgb(0,100,200);
  text-decoration: none;
  cursor:hand;
}

a:hover {
	text-decoration: underline;
}

a:visited {
	color: rgb(0,80,160);
}

.main {
  background-color: transparent; 
  padding-top:40px;
}

/* The actual timeline (the vertical ruler) */
.timeline {
  position: relative;
  margin: 0 auto;
}

/* The actual timeline (the vertical ruler) */
.timeline::after {
  content: '';
  position: absolute;
  width: 6px;
  background-color: white;
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -3px;
  box-shadow: var(--shadowValue);
}

.containerYear {
  padding: 60px 60px;
  position: relative;
  background-color: inherit;
  width: 50%;
  z-index: 1;
  color:black;
  background-color: transparent;
}
/* The circles on the timeline */
.containerYear::after {
  content: attr(data-content);
  position: absolute;
  width: 45px;
  height: 45px;
  right: -26px;
  background-color: white;
  border: 4px solid orange;
  top: 30px;
  border-radius: 50%;
  z-index: 1;
  display:grid;
  place-content: center;
  font-weight: bold;
  box-shadow: var(--shadowValue);
}

/* Container around content */
.container {
  padding: 3px 25px;
  position: relative;
  background-color: inherit;
  width: 50%;
  }

/* The circles on the timeline */
.container::after {
  content: attr(data-content);
  position: absolute;
  width: 25px;
  height: 25px;
  right: -17px;
  background-color: white;
  border: 4px solid steelblue;
  top: 30px;
  border-radius: 50%;
  z-index: 1;
  display:grid;
  place-content: center;
  font-weight: bold;
  font-size: 8pt;
  box-shadow: var(--shadowValue);
}

/* Place the container to the left */
.left {
  left: 0;
}

/* Place the container to the right */
.right {
  left: 50%;
}


/* Add arrows to the left container (pointing right) */
/* .left::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  right: 30px;
  border: medium solid white;
  border-width: 10px 0 10px 10px;
  border-color: transparent transparent transparent white;
} */

/* Add arrows to the right container (pointing left) */
/* .right::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  left: 30px;
  border: medium solid white;
  border-width: 10px 10px 10px 0;
  border-color: transparent white transparent transparent;
} */

/* Fix the circle for containers on the right side */
.right::after {
  left: -16px;
}

/* The actual content */
.content {
  padding: 15px 15px 15px 15px;
  background-color: white;
  position: relative;
  border-radius: 10px;
  border: solid 0px orange;
  font-family: tahoma;
  font-size: 9pt; 
  box-shadow: var(--shadowValue);
  display: grid;
  grid-gap: 15px;
}

.contentFooter {
  background-color: white;
  display:grid;
  grid-auto-flow: column;
  justify-content: space-between;  
}

.content > div > div, p, h3, a, i {
  background-color: white;
}

/* Media queries - Responsive timeline on screens less than 600px wide */
@media screen and (max-width: 600px) {

  /* Place the timelime to the left */
  .timeline::after {
    left: 25px;
  }
  
  .containerYear {
    width:52%;
  }

  /* Full-width containers */
  .container {
    width: 99%;
    padding-left: 50px;
    padding-right: 25px;
  }
  
  /* Make sure that all arrows are pointing leftwards */
  /* .container::before {
    left: 60px;
    border: medium solid white;
    border-width: 10px 10px 10px 0;
    border-color: transparent white transparent transparent;
  } */

  /* Make sure all circles are at the same spot */
  .left::after, .right::after {
    left: 9px;
  }
  
  /* Make all right containers behave like the left ones */
  .right {
    left: 0%;
  }
}
</style>