import{c as e,d as t,b as r,u as i,m as s,g as o,e as n,s as a,k as l,h as c,i as d,j as u,n as p,C as m,D as h,a as f,t as v,E as g,F as b,G as R,p as j}from"./chunk.9938d60f.js";import{a as y,b as A}from"./chunk.8964267c.js";function D(e,t,r){const i=Object.create(e);return i.item=t[r],i}function $(e){for(var t,r=e.repositories,o=[],n=0;n<r.length;n+=1)o[n]=q(D(e,r,n));return{c(){for(var e=0;e<o.length;e+=1)o[e].c();t=i()},l(e){for(var r=0;r<o.length;r+=1)o[r].l(e);t=i()},m(e,r){for(var i=0;i<o.length;i+=1)o[i].m(e,r);s(e,t,r)},p(e,i){if(e.getPositionClass||e.repositories||e.Date||e.getReadableDate||e.showYear){r=i.repositories;for(var s=0;s<r.length;s+=1){const n=D(i,r,s);o[s]?(o[s].p(e,n),o[s].i(1)):(o[s]=q(n),o[s].c(),o[s].i(1),o[s].m(t.parentNode,t))}for(;s<o.length;s+=1)o[s].d(1);o.length=r.length}},i(e){for(var t=0;t<r.length;t+=1)o[t].i()},o:f,d(e){g(o,e),e&&u(t)}}}function w(e){var t,r,i;return{c(){t=n("div"),this.h()},l(e){t=c(e,"DIV",{class:!0,"data-content":!0},!1),d(t).forEach(u),this.h()},h(){t.className="containerYear svelte-15jh4iv",t.dataset.content=r=new e.Date(e.item.contribution.createdAt||e.item.createdat).getFullYear()},m(e,r){s(e,t,r)},p(e,i){e.repositories&&r!==(r=new i.Date(i.item.contribution.createdAt||i.item.createdat).getFullYear())&&(t.dataset.content=r)},i(e){i||m(()=>{(i=h(t,y,{y:-300,duration:k})).start()})},o:f,d(e){e&&u(t)}}}function E(e){var t,r,i,o=e.item.description;return{c(){t=n("p"),r=a("created project: "),i=a(o),this.h()},l(e){t=c(e,"P",{class:!0},!1);var s=d(t);r=l(s,"created project: "),i=l(s,o),s.forEach(u),this.h()},h(){t.className="svelte-15jh4iv"},m(e,o){s(e,t,o),p(t,r),p(t,i)},p(e,t){e.repositories&&o!==(o=t.item.description)&&v(i,o)},d(e){e&&u(t)}}}function N(e){var t,r,i,o,m,h,f,g=e.item.contribution.type,b=e.item.contribution.title;return{c(){t=n("p"),r=a("contributed with "),i=a(g),o=a(": "),m=n("a"),h=a(b),this.h()},l(e){t=c(e,"P",{class:!0},!1);var s=d(t);r=l(s,"contributed with "),i=l(s,g),o=l(s,": "),m=c(s,"A",{rel:!0,href:!0,target:!0,class:!0},!1);var n=d(m);h=l(n,b),n.forEach(u),s.forEach(u),this.h()},h(){m.rel="noopener, preconnect",m.href=f=e.item.contribution.url,m.target="_blank",m.className="svelte-15jh4iv",t.className="svelte-15jh4iv"},m(e,n){s(e,t,n),p(t,r),p(t,i),p(t,o),p(t,m),p(m,h)},p(e,t){e.repositories&&g!==(g=t.item.contribution.type)&&v(i,g),e.repositories&&b!==(b=t.item.contribution.title)&&v(h,b),e.repositories&&f!==(f=t.item.contribution.url)&&(m.href=f)},d(e){e&&u(t)}}}function C(e){var t,r,i;return{c(){t=n("a"),r=a("demo"),this.h()},l(e){t=c(e,"A",{rel:!0,href:!0,target:!0,class:!0},!1);var i=d(t);r=l(i,"demo"),i.forEach(u),this.h()},h(){t.rel="noopener, preconnect",t.href=i=e.item.demourl,t.target="_blank",t.className="svelte-15jh4iv"},m(e,i){s(e,t,i),p(t,r)},p(e,r){e.repositories&&i!==(i=r.item.demourl)&&(t.href=i)},d(e){e&&u(t)}}}function q(e){var t,r,i,g,b,R,j,A,D,$,q,I,k,x,S,T,O,P,Y,F,V,U,W,_=e.item.nameWithOwner,B=e.item.topics.concat(e.item.languages).join(", "),G=e.getReadableDate(e.item.contribution.createdAt||e.item.createdat),L=e.showYear(e.item.contribution.createdAt||e.item.createdat)&&w(e);function H(e){return e.item.contribution.type?N:E}var z=H(e),J=z(e),Z=""!==e.item.demourl&&C(e);return{c(){L&&L.c(),t=o(),r=n("div"),i=n("div"),g=n("h3"),b=n("a"),R=a(_),A=o(),J.c(),D=o(),$=n("span"),q=a(B),I=o(),k=n("div"),x=n("div"),Z&&Z.c(),S=o(),T=n("div"),O=n("i"),P=a("initiated @ "),Y=a(G),V=o(),this.h()},l(e){L&&L.l(e),t=l(e,"\n          "),r=c(e,"DIV",{class:!0,"data-content":!0},!1);var s=d(r);i=c(s,"DIV",{class:!0},!1);var o=d(i);g=c(o,"H3",{class:!0},!1);var n=d(g);b=c(n,"A",{rel:!0,href:!0,target:!0,class:!0},!1);var a=d(b);R=l(a,_),a.forEach(u),n.forEach(u),A=l(o,"\n              "),J.l(o),D=l(o,"  \n              "),$=c(o,"SPAN",{class:!0},!1);var p=d($);q=l(p,B),p.forEach(u),I=l(o,"\n              "),k=c(o,"DIV",{class:!0},!1);var m=d(k);x=c(m,"DIV",{class:!0},!1);var h=d(x);Z&&Z.l(h),h.forEach(u),S=l(m,"\n                "),T=c(m,"DIV",{class:!0},!1);var f=d(T);O=c(f,"I",{class:!0},!1);var v=d(O);P=l(v,"initiated @ "),Y=l(v,G),v.forEach(u),f.forEach(u),m.forEach(u),o.forEach(u),V=l(s,"\n          "),s.forEach(u),this.h()},h(){b.rel="noopener, preconnect",b.href=j=e.item.url,b.target="_blank",b.className="svelte-15jh4iv",g.className="svelte-15jh4iv",$.className="topics svelte-15jh4iv",x.className="svelte-15jh4iv",O.className="svelte-15jh4iv",T.className="svelte-15jh4iv",k.className="contentFooter svelte-15jh4iv",i.className="content  svelte-15jh4iv",r.className=U="container "+e.getPositionClass(e.item.index)+" svelte-15jh4iv",r.dataset.content=W=new e.Date(e.item.contribution.createdAt||e.item.createdat).toLocaleString("en-us",{month:"short"})},m(e,o){L&&L.m(e,o),s(e,t,o),s(e,r,o),p(r,i),p(i,g),p(g,b),p(b,R),p(i,A),J.m(i,null),p(i,D),p(i,$),p($,q),p(i,I),p(i,k),p(k,x),Z&&Z.m(x,null),p(k,S),p(k,T),p(T,O),p(O,P),p(O,Y),p(r,V)},p(e,s){s.showYear(s.item.contribution.createdAt||s.item.createdat)?L?(L.p(e,s),L.i(1)):((L=w(s)).c(),L.i(1),L.m(t.parentNode,t)):L&&(L.d(1),L=null),e.repositories&&_!==(_=s.item.nameWithOwner)&&v(R,_),e.repositories&&j!==(j=s.item.url)&&(b.href=j),z===(z=H(s))&&J?J.p(e,s):(J.d(1),(J=z(s))&&(J.c(),J.m(i,D))),e.repositories&&B!==(B=s.item.topics.concat(s.item.languages).join(", "))&&v(q,B),""!==s.item.demourl?Z?Z.p(e,s):((Z=C(s)).c(),Z.m(x,null)):Z&&(Z.d(1),Z=null),e.repositories&&G!==(G=s.getReadableDate(s.item.contribution.createdAt||s.item.createdat))&&v(Y,G),e.repositories&&U!==(U="container "+s.getPositionClass(s.item.index)+" svelte-15jh4iv")&&(r.className=U),e.repositories&&W!==(W=new s.Date(s.item.contribution.createdAt||s.item.createdat).toLocaleString("en-us",{month:"short"}))&&(r.dataset.content=W)},i(t){L&&L.i(),F||m(()=>{(F=h(i,y,e.getItemTransition(e.item.index))).start()})},o:f,d(e){L&&L.d(e),e&&(u(t),u(r)),J.d(),Z&&Z.d()}}}function I(e){var t,r,i,f,v,g,R,j,D,w=e.repositories.length>0&&$(e);return{c(){t=n("h2"),r=a("[...github repositories]"),v=o(),g=n("div"),R=n("div"),w&&w.c(),this.h()},l(e){t=c(e,"H2",{class:!0},!1);var i=d(t);r=l(i,"[...github repositories]"),i.forEach(u),v=l(e,"\n  "),g=c(e,"DIV",{class:!0},!1);var s=d(g);R=c(s,"DIV",{class:!0},!1);var o=d(R);w&&w.l(o),o.forEach(u),s.forEach(u),this.h()},h(){t.className="svelte-15jh4iv",R.className="timeline svelte-15jh4iv",g.className="main svelte-15jh4iv"},m(e,i){s(e,t,i),p(t,r),s(e,v,i),s(e,g,i),p(g,R),w&&w.m(R,null),D=!0},p(e,t){t.repositories.length>0?w?(w.p(e,t),w.i(1)):((w=$(t)).c(),w.i(1),w.m(R,null)):w&&(w.d(1),w=null)},i(e){D||(m(()=>{f&&f.end(1),i||(i=h(t,y,{y:-100,duration:2e3})),i.start()}),w&&w.i(),j&&j.end(1),D=!0)},o(e){i&&i.invalidate(),e&&(f=b(t,A,{})),e&&(j=b(g,A,{})),D=!1},d(e){e&&(u(t),f&&f.end(),u(v),u(g)),w&&w.d(),e&&j&&j.end()}}}const k=2e3;function x(e,t,r){let{repositories:i={},preloadRepositories:s={}}=t,o=null;R(()=>{r("repositories",i=s)});const n=e=>e%2==0?"left":"right";return e.$set=(e=>{"repositories"in e&&r("repositories",i=e.repositories),"preloadRepositories"in e&&r("preloadRepositories",s=e.preloadRepositories)}),{repositories:i,preloadRepositories:s,getReadableDate:e=>{const t=new Date(e);return`${t.getDate()} ${t.toLocaleString("en-us",{month:"short"})} ${t.getFullYear()}`},getPositionClass:n,getItemTransition:e=>"left"===n(e)?{x:-100,duration:k}:{x:100,duration:k},showYear:e=>{const t=new Date(e).getFullYear();return(null===o||o!==t)&&(r("repositoryYear",o=t),!0)},Date:Date}}class S extends e{constructor(e){super(),t(this,e,x,I,r,["repositories","preloadRepositories"])}}function T(e){var t,r,i=new S({props:{preloadRepositories:e.preloadRepositories}});return{c(){t=o(),i.$$.fragment.c(),this.h()},l(e){t=l(e,"\n"),i.$$.fragment.l(e),this.h()},h(){document.title="Nilesh - Repositories"},m(e,o){s(e,t,o),j(i,e,o),r=!0},p(e,t){var r={};e.preloadRepositories&&(r.preloadRepositories=t.preloadRepositories),i.$set(r)},i(e){r||(i.$$.fragment.i(e),r=!0)},o(e){i.$$.fragment.o(e),r=!1},d(e){e&&u(t),i.$destroy(e)}}}async function O({params:e,query:t}){const r=await this.fetch("https://gist.githubusercontent.com/NileshSP/19bbe3945375eb10d625a980f0da93a1/raw/cc1de90d2ffe796efd6168f31b99178a650d91db/tokens.json",{method:"GET",mode:"cors"}),i=await r.json();return this.fetch("https://api.github.com/graphql",{method:"POST",headers:{"content-type":"application/json",Authorization:`bearer ${i.githubAccessToken}`},body:JSON.stringify({query:"\n        query ($user: String!, $items: Int!, $fork: Boolean!, $fromdate: DateTime!) {\n          getRequestRepos: user(login: $user) {\n            repositories(first: $items, isFork: $fork) {\n              nodes {\n                ...repository       \n              }\n            }\n            contributionsCollection(from: $fromdate ) {\n              issueContributions( first: $items, orderBy: { field : OCCURRED_AT, direction: DESC}) {\n                nodes {\n                  issue {\n                    title\n                    url\n                    createdAt\n                    closed\n                    repository {\n                      ...repository\n                    }\n                  }\n                }\n              }\n              pullRequestContributions( first: $items, excludeFirst:true, orderBy: { field : OCCURRED_AT, direction: DESC}) {\n                nodes {\n                  pullRequest {\n                    title\n                    url\n                    createdAt\n                    merged\n                    repository {\n                      ...repository\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n\n        fragment repository on Repository {\n            id\n            name\n            nameWithOwner\n            url\n            description\n            createdAt\n            updatedAt\n            homepageUrl\n            languages(first: $items) {\n              nodes {\n                name\n              }\n            }\n            repositoryTopics(first: $items) {\n              nodes {\n                topic {\n                  name\n                }\n              }\n            }\n        }\n      ",variables:{user:"nileshsp",items:50,fork:!1,fromdate:"2019-01-01T00:00:00Z"}}),mode:"cors"}).then(e=>e.json()).then(e=>{let t=[];if(e.message)return console.error("github response",e.message),{preloadRepositories:t};if(null!=e){const r=(e,t)=>({contribution:e,id:t.id,name:t.name,nameWithOwner:t.nameWithOwner,url:t.url,description:t.description,createdat:t.createdAt,updatedat:t.updatedAt,demourl:null!==t.homepageUrl&&"null"!==t.homepageUrl.toString().trim()?t.homepageUrl:"",languages:t.languages.nodes.map(e=>e.name),topics:t.repositoryTopics.nodes.map(e=>e.topic.name)});t=[...t,...e.data.getRequestRepos.repositories.nodes.map(e=>r({type:null,title:null,url:null,createdAt:null,state:null},e)),...e.data.getRequestRepos.contributionsCollection.issueContributions.nodes.map(e=>r({type:"issue",title:e.issue.title,url:e.issue.url,createdAt:e.issue.createdAt,state:e.issue.closed},e.issue.repository)),...e.data.getRequestRepos.contributionsCollection.pullRequestContributions.nodes.map(e=>r({type:"pull request",title:e.pullRequest.title,url:e.pullRequest.url,createdAt:e.pullRequest.createdAt,state:e.pullRequest.merged},e.pullRequest.repository))].sort(function(e,t){const r=new Date(e.contribution.createdAt||e.createdat);return new Date(t.contribution.createdAt||t.createdat)-r}).map((e,t)=>({...e,index:t}))}else console.log("Github API responded with irrelevant data : ",e);return{preloadRepositories:t}}).catch(e=>{console.error(`Error is : ${e}`)})}function P(e,t,r){let{preloadRepositories:i}=t;return e.$set=(e=>{"preloadRepositories"in e&&r("preloadRepositories",i=e.preloadRepositories)}),{preloadRepositories:i}}export default class extends e{constructor(e){super(),t(this,e,P,T,r,["preloadRepositories"])}}export{O as preload};
//# sourceMappingURL=repositories.cee03a07.js.map
