<script context="module">
  export async function preload({ params, query }) {
      const getAccessToken = await this.fetch(`https://gist.githubusercontent.com/NileshSP/19bbe3945375eb10d625a980f0da93a1/raw/cc1de90d2ffe796efd6168f31b99178a650d91db/tokens.json`, {
        method:'GET',
        mode: 'cors'      
      });
      const accessToken = await getAccessToken.json(), 
      user = "nileshsp", items = 50, fork = false, fromdate = "2019-01-01T00:00:00Z",
      repoQuery = `
        query ($user: String!, $items: Int!, $fork: Boolean!, $fromdate: DateTime!) {
          getRequestRepos: user(login: $user) {
            repositories(first: $items, isFork: $fork) {
              nodes {
                ...repository       
              }
            }
            contributionsCollection(from: $fromdate ) {
              issueContributions( first: $items, orderBy: { field : OCCURRED_AT, direction: DESC}) {
                nodes {
                  issue {
                    title
                    url
                    createdAt
                    closed
                    repository {
                      ...repository
                    }
                  }
                }
              }
              pullRequestContributions( first: $items, excludeFirst:true, orderBy: { field : OCCURRED_AT, direction: DESC}) {
                nodes {
                  pullRequest {
                    title
                    url
                    createdAt
                    merged
                    repository {
                      ...repository
                    }
                  }
                }
              }
            }
          }
        }

        fragment repository on Repository {
            id
            name
            nameWithOwner
            url
            description
            createdAt
            updatedAt
            homepageUrl
            languages(first: $items) {
              nodes {
                name
              }
            }
            repositoryTopics(first: $items) {
              nodes {
                topic {
                  name
                }
              }
            }
        }
      `;
      return this.fetch("https://api.github.com/graphql", {
        method:'POST'
        ,'headers':{
            'content-type':"application/json"
            ,'Authorization': `bearer ${accessToken.githubAccessToken}`,
        }
        ,'body': JSON.stringify({
          query: repoQuery,
          variables: { user, items, fork, fromdate }
        })
        ,'mode':"cors"
      })
      .then(response => response.json())
      .then(data => {
        let preloadRepositories = [];
        if(data.message) {
          console.error(`github response`,data.message);
          return { preloadRepositories };
        }
        if(data !== null &&  data !== undefined) { 
          const listRepo = (contribution, r) => ({
            contribution
            , id: r.id
            , name: r.name
            , nameWithOwner: r.nameWithOwner
            , url: r.url
            , description: r.description 
            , createdat: r.createdAt
            , updatedat: r.updatedAt
            , demourl:((r.homepageUrl !== null || undefined) 
                          ? (r.homepageUrl.toString().trim() !== ("null" || "") ? r.homepageUrl : "")
                          : ""
                      ) 
            , languages: r.languages.nodes.map(x => x.name)
            , topics: r.repositoryTopics.nodes.map(x => x.topic.name)
          })
          
          //append repositories
          preloadRepositories = [...preloadRepositories
                                  , ...data.data.getRequestRepos.repositories.nodes
                                      .map(r => listRepo({ type:null, title: null, url: null, createdAt:null, state: null }, r))
                                  //append issues conributed to repositories
                                  , ...data.data.getRequestRepos.contributionsCollection.issueContributions.nodes
                                      .map(r => listRepo({ type: "issue", title: r.issue.title, url: r.issue.url, createdAt: r.issue.createdAt, state: r.issue.closed}, r.issue.repository))
                                  //append pull request conributed to repositories
                                  , ...data.data.getRequestRepos.contributionsCollection.pullRequestContributions.nodes
                                      .map(r => listRepo({ type: "pull request", title: r.pullRequest.title, url: r.pullRequest.url, createdAt: r.pullRequest.createdAt, state: r.pullRequest.merged }, r.pullRequest.repository))
                                ].sort(function(a, b) {
                                    const dateA = new Date(a.contribution.createdAt || a.createdat), dateB = new Date(b.contribution.createdAt || b.createdat);
                                    return dateB - dateA;
                                }).map((r,i) => { 
                                  // append index
                                  return { ...r, index:i}; 
                                });
          //console.info(preloadRepositories);
        }
        else {
          console.log(`Github API responded with irrelevant data : `,data)
        }
        return { preloadRepositories };
    })  
    .catch (error => {
      console.error(`Error is : ${error}`);      
    });
  }
</script>
<script>
	//import VirtualList from '@sveltejs/svelte-virtual-list';
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

  const getPositionClass = (val) => val % 2 === 0 ? "left" : "right"
  const getItemTransition = (val) => (getPositionClass(val) === 'left' ? { x: -100, duration: duration } : { x: 100, duration: duration })
  const showYear = (dateVal) => {
    const newYear = (new Date(dateVal)).getFullYear();
    if (repositoryYear === null || repositoryYear !== newYear) {
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
        <!-- <VirtualList height="74vh" items={repositories} let:item > -->
        {#each repositories as item}
          {#if showYear(item.contribution.createdAt || item.createdat)}
            <div class="containerYear" data-content={(new Date(item.contribution.createdAt || item.createdat)).getFullYear()} in:fly="{{ y: -300, duration: duration }}">
            </div>
          {/if}
          <div class={"container " + getPositionClass(item.index)} data-content={(new Date(item.contribution.createdAt || item.createdat)).toLocaleString('en-us', { month: 'short' })}>
            <div class={"content "} in:fly={getItemTransition(item.index)} >
              <h3><a rel="noopener, preconnect" href={item.url} target="_blank">{item.nameWithOwner}</a></h3>
              {#if item.contribution.type}
                <p>
                  contributed with {item.contribution.type}: <a rel="noopener, preconnect" href={item.contribution.url} target="_blank" >{item.contribution.title}</a>
                </p>
              {:else}
                <p>
                  created project: {item.description}
                </p>
              {/if}  
              <span class="topics">{item.topics.concat(item.languages).join(", ")}</span>
              <div class="contentFooter">
                <div>
                  {#if item.demourl !== "" } <a rel="noopener, preconnect" href={item.demourl} target="_blank" >demo</a>{/if}
                </div>
                <div>
                  <i>initiated @ {getReadableDate(item.contribution.createdAt || item.createdat)}</i>
                </div>
              </div>
            </div>
          </div>
        {/each}
        <!-- </VirtualList> -->
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
  background-color: transparent;
  display:grid;
  grid-auto-flow: column;
  justify-content: space-between;  
}

.content > div > div, p, h3, a, i {
  background-color: transparent;
  overflow: hidden;
  text-overflow: ellipsis; 
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