import{a as t,b as n,c as a,d as s,e as i,f as e,g as l,h as o,i as c,x as r,k as f,l as u,m as h,o as m,n as d,q as v,r as p,y as g,K as C,L as D,N as b,M as y,u as k}from"./chunk.8d5a4ab1.js";import{a as $,b as w}from"./chunk.1ff4873f.js";function N(t,n,a){var s=Object.create(t);return s.name=n[a][0],s.link=n[a][1],s.display=n[a][2],s.type=n[a][3],s.i=a,s}function x(t){var n,a,s,i,e,l,o,C,D,b,y,k,$=t.name,w=t.display;return{c:function(){n=c("div"),a=r($),s=f(),i=c("div"),e=r("=>"),l=f(),o=c("div"),C=c("a"),D=r(w),k=f(),this.h()},l:function(t){n=u(t,"DIV",{},!1);var c=h(n);a=m(c,$),c.forEach(d),s=m(t,"\r\n\t\t\t\t"),i=u(t,"DIV",{style:!0},!1);var r=h(i);e=m(r,"=>"),r.forEach(d),l=m(t,"\r\n\t\t\t\t"),o=u(t,"DIV",{},!1);var f=h(o);C=u(f,"A",{rel:!0,href:!0,target:!0,class:!0},!1);var v=h(C);D=m(v,w),v.forEach(d),k=m(f,"\r\n\t\t\t\t"),f.forEach(d),this.h()},h:function(){i.style.cssText="font-family : 'Fira Code'",C.rel="noopener, preconnect",C.href=b=t.link,C.target=y="web"===t.type?"_blank":"_self",C.className="svelte-xd3s2s"},m:function(t,c){v(t,n,c),p(n,a),v(t,s,c),v(t,i,c),p(i,e),v(t,l,c),v(t,o,c),p(o,C),p(C,D),p(o,k)},p:function(t,n){t.listContactsDetails&&$!==($=n.name)&&g(a,$),t.listContactsDetails&&w!==(w=n.display)&&g(D,w),t.listContactsDetails&&b!==(b=n.link)&&(C.href=b),t.listContactsDetails&&y!==(y="web"===n.type?"_blank":"_self")&&(C.target=y)},d:function(t){t&&(d(n),d(s),d(i),d(l),d(o))}}}function E(t){for(var n,a,s,i,e,l,o,g,k,E="<a>contact me</a>",I=t.listContactsDetails,V=[],_=0;_<I.length;_+=1)V[_]=x(N(t,I,_));return{c:function(){n=c("div"),a=c("h2"),s=r(E),e=f(),l=c("div");for(var t=0;t<V.length;t+=1)V[t].c();this.h()},l:function(t){n=u(t,"DIV",{class:!0},!1);var i=h(n);a=u(i,"H2",{class:!0},!1);var o=h(a);s=m(o,E),o.forEach(d),e=m(i,"\r\n\t\t"),l=u(i,"DIV",{class:!0},!1);for(var c=h(l),r=0;r<V.length;r+=1)V[r].l(c);c.forEach(d),i.forEach(d),this.h()},h:function(){a.className="svelte-xd3s2s",l.className="contactDetails svelte-xd3s2s",n.className="mainContainer svelte-xd3s2s"},m:function(t,i){v(t,n,i),p(n,a),p(a,s),p(n,e),p(n,l);for(var o=0;o<V.length;o+=1)V[o].m(l,null);k=!0},p:function(t,n){if(t.listContactsDetails){I=n.listContactsDetails;for(var a=0;a<I.length;a+=1){var s=N(n,I,a);V[a]?V[a].p(t,s):(V[a]=x(s),V[a].c(),V[a].m(l,null))}for(;a<V.length;a+=1)V[a].d(1);V.length=I.length}},i:function(t){k||(i||C((function(){(i=D(a,$,{y:200,duration:2e3})).start()})),C((function(){g&&g.end(1),o||(o=D(n,w,{delay:500,duration:1e3})),o.start()})),k=!0)},o:function(t){o&&o.invalidate(),t&&(g=b(n,w,{})),k=!1},d:function(t){t&&d(n),y(V,t),t&&g&&g.end()}}}function I(t,n,a){var s=n.listContactsDetails,i=void 0===s?[]:s;return t.$set=function(t){"listContactsDetails"in t&&a("listContactsDetails",i=t.listContactsDetails)},{listContactsDetails:i}}var V=function(c){function r(t){var o;return n(this,r),o=a(this,s(r).call(this)),i(e(o),t,I,E,l,["listContactsDetails"]),o}return t(r,o),r}();function _(t){var n,a,s=new V({props:{listContactsDetails:t.preloadContacts}});return{c:function(){n=f(),s.$$.fragment.c(),this.h()},l:function(t){n=m(t,"\r\n"),s.$$.fragment.l(t),this.h()},h:function(){document.title="Nilesh - Contact"},m:function(t,i){v(t,n,i),k(s,t,i),a=!0},p:function(t,n){var a={};t.preloadContacts&&(a.listContactsDetails=n.preloadContacts),s.$set(a)},i:function(t){a||(s.$$.fragment.i(t),a=!0)},o:function(t){s.$$.fragment.o(t),a=!1},d:function(t){t&&d(n),s.$destroy(t)}}}function j(t){return{preloadContacts:[["linkedIn","https://www.linkedin.com/in/nileshspatel","linkedin.com/in/nileshspatel","web"],["email","mailto:emailnileshp@gmail.com","emailnileshp@gmail.com","app"],["call/msg","tel:+1-647-219-3220","+1-647-219-3220","app"],["github","https://github.com/NileshSP","github.com/NileshSP","web"]]}}var P=function(c){function r(t){var o;return n(this,r),o=a(this,s(r).call(this)),i(e(o),t,j,_,l,[]),o}return t(r,o),r}();export default P;
