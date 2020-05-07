(function(e){function t(t){for(var r,a,s=t[0],c=t[1],u=t[2],l=0,d=[];l<s.length;l++)a=s[l],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&d.push(i[a][0]),i[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);h&&h(t);while(d.length)d.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,a=1;a<n.length;a++){var s=n[a];0!==i[s]&&(r=!1)}r&&(o.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},a={app:0},i={app:0},o=[];function s(e){return c.p+"js/"+({about:"about"}[e]||e)+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={about:1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({about:"about"}[e]||e)+".css",i=c.p+r,o=document.getElementsByTagName("link"),s=0;s<o.length;s++){var u=o[s],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===r||l===i))return t()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){u=d[s],l=u.getAttribute("data-href");if(l===r||l===i)return t()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=t,h.onerror=function(t){var r=t&&t.target&&t.target.src||i,o=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=r,delete a[e],h.parentNode.removeChild(h),n(o)},h.href=i;var p=document.getElementsByTagName("head")[0];p.appendChild(h)})).then((function(){a[e]=0})));var r=i[e];if(0!==r)if(r)t.push(r[2]);else{var o=new Promise((function(t,n){r=i[e]=[t,n]}));t.push(r[2]=o);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=s(e);var d=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(h);var n=i[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",d.name="ChunkLoadError",d.type=r,d.request=a,n[1](d)}i[e]=void 0}};var h=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/twitch-irc-client-pwa/",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var h=l;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("v-app",[n("router-view")],1)],1)},i=[],o=(n("d81d"),n("13d5"),n("fb6a"),n("ac1f"),n("1276"),n("4c53"),{name:"app",created:function(){this.storeProfile()},methods:{storeProfile:function(){var e=this;if(this.hasValidHash){this.$userProfile.id=this.decodedIdToken.sub,this.$userProfile.picture=this.decodedIdToken.picture,this.$userProfile.displayName=this.decodedIdToken.preferred_username,this.$userProfile.pass=this.hashValues.access_token,this.$userProfile.idToken=this.decodedIdToken;var t={headers:{Authorization:"Bearer ".concat(this.$userProfile.pass)}};this.$http.get("https://api.twitch.tv/helix/users?id=".concat(this.$userProfile.id),t).then((function(t){return e.$userProfile.loginName=t.data.data[0].login}))}}},computed:{hashValues:function(){try{return document.location.hash.slice(1).split("&").map((function(e){var t={};return t[e.split("=")[0]]=e.split("=")[1],t})).reduce((function(e,t){return Object.assign(e,t,{})}))}catch(e){return null}},decodedIdToken:function(){try{return JSON.parse(this.$base64url.decode(this.hashValues.id_token.split(".")[1]))}catch(e){return null}},hasValidHash:function(){return null!==this.decodedIdToken}}}),s=o,c=(n("5c0b"),n("2877")),u=n("6544"),l=n.n(u),d=n("7496"),h=Object(c["a"])(s,a,i,!1,null,null,null),p=h.exports;l()(h,{VApp:d["a"]});var f=n("9483");Object(f["a"])("".concat("/twitch-irc-client-pwa/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var m=n("f309");r["a"].use(m["a"]);var v=new m["a"]({}),g=(n("d3b7"),n("8c4f")),b=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("AppBar"),n("v-content",[n("v-container",[n("v-row",{attrs:{dense:""}},e._l(e.streams,(function(t,r){return n("v-col",{key:r,attrs:{sm:"6",md:"4",lg:"3",xl:"2",cols:"12"}},[n("v-hover",{scopedSlots:e._u([{key:"default",fn:function(r){var a=r.hover;return[n("v-card",{staticClass:"text-left",attrs:{color:"brown lighten-5",elevation:a?24:6},on:{click:function(n){return e.joinChannel(t.user_id)}}},[n("v-img",{staticClass:"align-end text-right",attrs:{src:e.sizing(t.thumbnail_url),gradient:"to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)",height:"120"}},[n("v-chip",{staticClass:"amber--text",attrs:{color:"rgba(0,0,0,0)"}},[n("v-icon",{attrs:{color:"amber"}},[e._v("mdi-account-multiple")]),n("b",[e._v(e._s(t.viewer_count))])],1)],1),n("v-card-text",{domProps:{textContent:e._s(t.title)}}),n("v-card-title",{domProps:{textContent:e._s(t.user_name)}})],1)]}}],null,!0)})],1)})),1)],1)],1)],1)},w=[],y=(n("5319"),n("96cf"),n("1da1")),_=n("dd38"),k={name:"Home",data:function(){return{streams:[],thumb:{width:640,height:360},apiParams:{clientId:"122xg9vquuuq3zi6w610iibumg5j15"}}},components:{AppBar:_["a"]},created:function(){this.fetchStreams()},methods:{fetchStreams:function(){var e=this,t={headers:{"Client-ID":this.apiParams.clientId}};this.$http.get("https://api.twitch.tv/helix/streams",t).then((function(t){return e.streams=t.data.data}))},sizing:function(e){return e.replace("{width}","".concat(this.thumb.width)).replace("{height}","".concat(this.thumb.height))},joinChannel:function(){var e=Object(y["a"])(regeneratorRuntime.mark((function e(t){var n,r=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.isLogedIn&&(n={headers:{Authorization:"Bearer ".concat(this.$userProfile.pass)}},this.$http.get("https://api.twitch.tv/helix/users?id=".concat(t),n).then((function(e){return r.$router.push({name:"Chat",params:{channel:e.data.data[0].login}})})));case 1:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},computed:{isLogedIn:function(){return""!==this.$userProfile.id}}},C=k,P=n("b0af"),$=n("99d9"),x=n("cc20"),V=n("62ad"),j=n("a523"),O=n("a75b"),T=n("ce87"),I=n("132d"),A=n("adda"),N=n("0fd9"),S=Object(c["a"])(C,b,w,!1,null,null,null),L=S.exports;l()(S,{VCard:P["a"],VCardText:$["b"],VCardTitle:$["c"],VChip:x["a"],VCol:V["a"],VContainer:j["a"],VContent:O["a"],VHover:T["a"],VIcon:I["a"],VImg:A["a"],VRow:N["a"]}),r["a"].use(g["a"]);var H=[{path:"/",name:"Home",component:L},{path:"/chat/:channel",name:"Chat",props:!0,component:function(){return n.e("about").then(n.bind(null,"293a"))}}],E=new g["a"]({mode:"history",base:"/twitch-irc-client-pwa/",routes:H}),B=E,q=n("bc3a"),z=n.n(q),D=n("fb4d"),R=n.n(D);r["a"].prototype.$http=z.a,r["a"].prototype.$base64url=R.a,r["a"].prototype.$playSound=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=new Audio(e);n.volume=t,n.play()},r["a"].prototype.$scheme={main:"grey lighten-4",fore:"white"},r["a"].prototype.$userProfile={id:"",loginName:"justinfan12345",displayName:"Anonymous User",picture:"",pass:"",idToken:""},r["a"].config.productionTip=!1,new r["a"]({vuetify:v,router:B,render:function(e){return e(p)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var r=n("7694"),a=n.n(r);a.a},7694:function(e,t,n){},dd38:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-app-bar",{attrs:{app:"",color:e.$scheme.main}},[n("v-app-bar-nav-icon",{on:{click:function(t){e.drawer=!0}}}),n("v-toolbar-title",[e._v(e._s(e.$route.name))]),e._t("default")],2),n("v-navigation-drawer",{attrs:{fixed:"",temporary:""},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[n("v-list",{attrs:{nav:"",dense:""}},[n("v-list-item-group",[e.isLogedIn?n("v-list-item",{on:{click:e.logOut}},[n("v-list-item-icon",[n("v-avatar",{attrs:{size:"24"}},[n("img",{attrs:{src:e.$userProfile.picture,alt:e.$userProfile.displayName}})])],1),n("v-list-item-title",[e._v("Logout")])],1):n("v-list-item",{attrs:{href:e.authURL}},[n("v-list-item-icon",[n("v-icon",[e._v("mdi-account")])],1),n("v-list-item-title",[e._v("Login")])],1),n("v-list-item",{on:{click:function(t){e.drawer=!1,e.dialog=!0}}},[n("v-list-item-icon",[n("v-icon",[e._v("mdi-magnify")])],1),n("v-list-item-title",[e._v("Channel")])],1),n("v-list-item",{attrs:{disabled:e.isHome},on:{click:e.goHome}},[n("v-list-item-icon",[n("v-icon",[e._v("mdi-home")])],1),n("v-list-item-title",[e._v("Home")])],1)],1)],1)],1),n("v-dialog",{attrs:{"max-width":"500"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[n("v-card",[n("v-card-title",[e._v("Connect Channel")]),n("v-card-text",{staticClass:"text-justify"},[n("p",[e._v("Connecting to specified Twitch channel.")]),n("v-text-field",{attrs:{outlined:"",dense:"","persistent-hint":"",autofocus:"",label:"Channel",hint:"In lowercase.","append-icon":"mdi-magnify"},model:{value:e.channel,callback:function(t){e.channel=t},expression:"channel"}})],1),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"orange darken-1",text:""},on:{click:function(t){e.dialog=!1}}},[e._v(" Cancel ")]),n("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:e.joinChannel}},[e._v(" Connect ")])],1)],1)],1)],1)},a=[],i=(n("c975"),n("a15b"),n("d81d"),n("b0c0"),n("b64b"),n("d3b7"),n("25f0"),{name:"AppBar",data:function(){return{channel:"",drawer:!1,dialog:!1,authParams:{client_id:"122xg9vquuuq3zi6w610iibumg5j15",redirect_uri:"".concat(location.origin,"/twitch-irc-client-pwa/"),response_type:["token","id_token"],scope:["chat:read","chat:edit","user:read:email","openid"],claims:{id_token:{email_verified:null,picture:null,preferred_username:null}}}}},methods:{joinChannel:function(){this.$router.push({name:"Chat",params:{channel:this.channel}})},logOut:function(){this.drawer=!1,this.$userProfile.id="",this.$userProfile.loginName="justinfan12345",this.$userProfile.displayName="Anonymous User",this.$userProfile.picture="",this.$userProfile.pass="",this.$userProfile.idToken={},document.location.hash="",this.goHome()},goHome:function(){this.$router.push({name:"Home"})}},computed:{isChat:function(){return"Chat"==this.$route.name},isHome:function(){return"Home"==this.$route.name},isLogedIn:function(){return""!==this.$userProfile.id},authURL:function(){return"https://id.twitch.tv/oauth2/authorize?".concat(this.queryParams)},queryParams:function(){var e=this.authParams;function t(t){return-1!=Object.prototype.toString.call(e[t]).indexOf("Array")?t+"="+e[t].join("+"):-1!=Object.prototype.toString.call(e[t]).indexOf("Object")?t+"="+JSON.stringify(e[t]):t+"="+e[t]}return Object.keys(this.authParams).map(t).join("&")}}}),o=i,s=n("2877"),c=n("6544"),u=n.n(c),l=n("40dc"),d=n("5bc1"),h=n("8212"),p=n("8336"),f=n("b0af"),m=n("99d9"),v=n("169a"),g=n("132d"),b=n("8860"),w=n("da13"),y=n("1baa"),_=n("34c3"),k=n("5d23"),C=n("f774"),P=n("2fa4"),$=n("8654"),x=n("2a7f"),V=Object(s["a"])(o,r,a,!1,null,null,null);t["a"]=V.exports;u()(V,{VAppBar:l["a"],VAppBarNavIcon:d["a"],VAvatar:h["a"],VBtn:p["a"],VCard:f["a"],VCardActions:m["a"],VCardText:m["b"],VCardTitle:m["c"],VDialog:v["a"],VIcon:g["a"],VList:b["a"],VListItem:w["a"],VListItemGroup:y["a"],VListItemIcon:_["a"],VListItemTitle:k["a"],VNavigationDrawer:C["a"],VSpacer:P["a"],VTextField:$["a"],VToolbarTitle:x["a"]})}});