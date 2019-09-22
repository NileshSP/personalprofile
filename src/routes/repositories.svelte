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
import ListRepositories from "../components/listrepositories.svelte";
export let preloadRepositories;
</script>
<svelte:head>
	<title>Nilesh - Repositories</title>
</svelte:head>
<ListRepositories preloadRepositories={preloadRepositories} ></ListRepositories>