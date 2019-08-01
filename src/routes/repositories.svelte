<script context="module">
	export function preload({ params, query }) {
      return this.fetch(`https://api.github.com/users/NileshSP/repos`, {
        method:'GET',
         headers:{
        //   'Content-Type': 'application/json',
        //   'Authorization': 'Token process.env.GITHUB_TOKEN',
        //   'Access-Control-Allow-Origin': '*',
        //   'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept"
        //  'Cache-Control': 'stale-while-revalidate=15'
            "Accept":"application/vnd.github.mercy-preview+json"
         },
        mode: 'cors'      
      })
      // return this.fetch("https://api.github.com/graphql", {
      //   method:'POST'
      //   ,'headers':{
      //       "content-type":"application/json"
      //       ,"Authorization": `bearer process.env.GITHUB_TOKEN`
      //       // ,'Access-Control-Allow-Origin': '*'
      //       // ,'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept"
      //       // ,'Cache-Control': 'stale-while-revalidate=15'
      //       //,"Accept":"application/vnd.github.mercy-preview+json"
      //   }
      //   ,'body':"{\"query\":\"query($items:Int!) {\\n  user(login:\\\"nileshsp\\\") {\\n\\t\\trepositories(first: $items) {\\n      nodes {\\n\\t\\t\\t\\tid\\n        name\\n        url\\n        description\\n        createdAt\\n        updatedAt\\n        homepageUrl \\n        languages(first:$items) {\\n          nodes {\\n            name\\n          }\\n        }\\n        repositoryTopics(first:$items) {\\n          nodes {\\n            topic {\\n              name\\n            }\\n          }\\n        } \\n      }\\n    }\\n  }\\n}\",\"variables\":{\"items\":100}}"
      //   ,'mode':"cors"
      // })
      .then(response => response.json())
      .then(data => {
        let preloadRepositories = [];
        if(data.message) {
          console.log(`github response`,data.message);
          return { preloadRepositories };
        }
        if(data !== null &&  data !== undefined) { 
          // preloadRepositories = data.data.user.repositories.nodes.map(r => ({
          //   id : r.id
          //   , name: r.name
          //   , url: r.url
          //   , description: r.description
          //   , createdat: r.createdAt
          //   , updatedat: r.updatedAt
          //   , demourl:((r.homepageUrl !== null || undefined) 
          //                 ? (r.homepageUrl.toString().trim() !== ("null" || "") ? r.homepageUrl : "")
          //                 : ""
          //             ) 
          //   , languages: r.languages.nodes.map(x => x.name)
          //   , topics: r.repositoryTopics.nodes.map(x => x.topic.name)
          // }));
          preloadRepositories = data.map(r => ({
            id : r.id
            , name: r.name
            , url: r.html_url
            , description: r.description
            , createdat: r.created_at
            , updatedat: r.updated_at
            , demourl:((r.homepage !== null || undefined) 
                          ? (r.homepage.toString().trim() !== ("null" || "") ? r.homepage : "")
                          : ""
                      ) 
            , languages: r.language
            , topics: r.topics
          }));
          preloadRepositories = preloadRepositories.sort(function(a, b) {
              var dateA = new Date(a.createdat), dateB = new Date(b.createdat);
              return dateB - dateA;
          });
          //console.log(preloadRepositories);
        }
        else {
          console.log(`Github API responded with irrelevant data : `,data)
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
      {#if repositories.length > 0}
        {#each repositories as { id, name, url, description, createdat, updatedat, demourl, languages, topics } ,i}
          {#if showYear(createdat)}
            <div class="containerYear" data-content={repositoryYear} in:fly="{{ y: -300, duration: duration }}">
            </div>
          {/if}
          <div class={"container " + getPosition(i)} data-content={(new Date(createdat)).toLocaleString('en-us', { month: 'short' })}>
            <div class="content" in:fly={getItemTransition(i)}>
              <h3><a rel="noopener, preconnect" href={url} target="_blank">{name}</a></h3>
              <p>{description}</p>
              <span class="topics">{topics.concat(languages).join(", ")}</span>
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
      {/if}
    </div>
  </div>
<style>
:root {
  --shadowValue : 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
* {
  margin:0;
  padding:0;
  box-sizing: border-box;
  font-family: Helvetica, sans-serif;
  background-color: inherit; 
}
h2 {
	padding: 5% 0 0 10%;
	background: linear-gradient(180deg, orange , red);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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
  padding:50px 0px;
  margin: 0 auto;
  max-width: 800px;
  border:solid 0px red;
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

.topics {
  font-size: 90%;
  color:brown;
}

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