!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).ZenfiSDK=t()}(this,(function(){"use strict";function e(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function t(t){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?e(Object(r),!0).forEach((function(e){a(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):e(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function n(e,t,n,r,o,i,a){try{var c=e[i](a),u=c.value}catch(e){return void n(e)}c.done?t(u):Promise.resolve(u).then(r,o)}function r(e){return function(){var t=this,r=arguments;return new Promise((function(o,i){var a=e.apply(t,r);function c(e){n(a,o,i,c,u,"next",e)}function u(e){n(a,o,i,c,u,"throw",e)}c(void 0)}))}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=["selector","value"],s="value",f="nativeValue",l="click",h="text";var p=function(e){var t=e.selector,n=e.value,r=c(e,u).strategy||s,o=document.querySelector(t);return o?(r===s&&(o.value=n),r===f&&function(e,t){var n=Object.getOwnPropertyDescriptor(e,"value").set,r=Object.getPrototypeOf(e),o=Object.getOwnPropertyDescriptor(r,"value").set;n&&n!==o?o.call(e,t):n.call(e,t)}(o,n),r===h&&(o.innerText=n),r===l&&o.click(),o):null},d={exports:{}};
/*!
   * JavaScript Cookie v2.2.1
   * https://github.com/js-cookie/js-cookie
   *
   * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
   * Released under the MIT license
   */
!function(e,t){var n;n=function(){function e(){for(var e=0,t={};e<arguments.length;e++){var n=arguments[e];for(var r in n)t[r]=n[r]}return t}function t(e){return e.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent)}return function n(r){function o(){}function i(t,n,i){if("undefined"!=typeof document){"number"==typeof(i=e({path:"/"},o.defaults,i)).expires&&(i.expires=new Date(1*new Date+864e5*i.expires)),i.expires=i.expires?i.expires.toUTCString():"";try{var a=JSON.stringify(n);/^[\{\[]/.test(a)&&(n=a)}catch(e){}n=r.write?r.write(n,t):encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),t=encodeURIComponent(String(t)).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[\(\)]/g,escape);var c="";for(var u in i)i[u]&&(c+="; "+u,!0!==i[u]&&(c+="="+i[u].split(";")[0]));return document.cookie=t+"="+n+c}}function a(e,n){if("undefined"!=typeof document){for(var o={},i=document.cookie?document.cookie.split("; "):[],a=0;a<i.length;a++){var c=i[a].split("="),u=c.slice(1).join("=");n||'"'!==u.charAt(0)||(u=u.slice(1,-1));try{var s=t(c[0]);if(u=(r.read||r)(u,s)||t(u),n)try{u=JSON.parse(u)}catch(e){}if(o[s]=u,e===s)break}catch(e){}}return e?o[e]:o}}return o.set=i,o.get=function(e){return a(e,!1)},o.getJSON=function(e){return a(e,!0)},o.remove=function(t,n){i(t,"",e(n,{expires:-1}))},o.defaults={},o.withConverter=n,o}((function(){}))},e.exports=n()}(d);var v=d.exports;var w={url:"https://api.zenfi.mx/products/leads/info",method:"GET"},y={url:"https://api.zenfi.mx/webhooks/leads/:partner/:type",method:"POST"},g={Accept:"application/json","Content-Type":"application/json"};function k(){return(k=r(regeneratorRuntime.mark((function e(t){var n,r,o,i,a,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=(n=w).url,o=n.method,i="".concat(r,"?token=").concat(t),e.next=4,fetch(i,{method:o,headers:g});case 4:return a=e.sent,e.next=7,a.json();case 7:if(c=e.sent,!a.ok){e.next=10;break}return e.abrupt("return",c.info||{});case 10:if(401!==a.status){e.next=12;break}throw new Error("UNAUTHORIZED");case 12:throw new Error(c.code);case 13:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var m="zfid",b="zftoken";var O=p,x=function(e){var t=e.domain,n="zenfi_id",r="zenfi_token",o=function(e){return v.get(e)},i=function(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:365;return v.set(e,n,{domain:t,expires:r,path:"/",secure:!0})};return{getId:function(){return o(n)},setId:function(e){return i(n,e)},getToken:function(){return o(r)},setToken:function(e){return i(r,e)},removeToken:function(e){return n=r,v.remove(n,{domain:t,path:"/"});var n},set:i,get:o}},P=function(e){return k.apply(this,arguments)},j=function(e){var t=e.meta,n=e.type,r=e.event,o=e.partner,i=e.zenfiId,a=y,c=a.url,u=a.method,s=c.replace(":type",n).replace(":partner",o),f={zenfiId:i,event:r,meta:t};return fetch(s,{method:u,headers:g,body:JSON.stringify(f)}).then((function(e){return e.json()}))},E=function(e){var t=new URLSearchParams(e.search);return{id:t.get(m)||null,token:t.get(b)||null}},S=function(e){var t=new URL(e),n=new URLSearchParams(t.search);return n.delete(b),t.search=n.toString(),t.toString()},I=function(e){return null==e},T=function(e){return e&&"[object Function]"==={}.toString.call(e)},D=function(){var e="locationchange",t=window.history,n=t.pushState,r=t.replaceState;window.history.pushState=function(){for(var t=arguments.length,r=new Array(t),o=0;o<t;o++)r[o]=arguments[o];var i=n.apply(window.history,r);return window.dispatchEvent(new Event(e)),i},window.history.replaceState=function(){for(var t=arguments.length,n=new Array(t),o=0;o<t;o++)n[o]=arguments[o];var i=r.apply(window.history,n);return window.dispatchEvent(new Event(e)),i},window.addEventListener("popstate",(function(){window.dispatchEvent(new Event(e))}))};return function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.partnerName,r=t.cookiesDomain,i=t.targets;o(this,e),this._id=null,this._token=null,this.leadInfo=null,this.partnerName=n,this.targets=i,this.cookies=x({domain:r}),this._handleUrlParams()}var n,a,c,u,s;return n=e,(a=[{key:"_handleUrlParams",value:function(){var e=E(location),t=e.id,n=e.token;t&&(this.id=t),n&&(this.token=n,history.replaceState(null,null,S(location.href)))}},{key:"id",get:function(){return this._id||(this._id=this.cookies.getId()),this._id},set:function(e){this._id=e||null,this.cookies.setId(this._id)}},{key:"token",get:function(){return this._token||(this._token=this.cookies.getToken()),this._token},set:function(e){this._token=e||null,this._token?this.cookies.setToken(this._token):this.cookies.removeToken()}},{key:"fetchData",value:(s=r(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.token){e.next=2;break}return e.abrupt("return",null);case 2:if(e.prev=2,this.leadInfo){e.next=7;break}return e.next=6,P(this.token);case 6:this.leadInfo=e.sent;case 7:e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),e.t0.message.includes("UNAUTHORIZED")&&(this.token=null);case 12:return e.abrupt("return",this.leadInfo);case 13:case"end":return e.stop()}}),e,this,[[2,9]])}))),function(){return s.apply(this,arguments)})},{key:"fillTargets",value:(u=r(regeneratorRuntime.mark((function e(){var n=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.fetchData();case 2:(this.targets||[]).forEach((function(e){var r=e||{},o=r.dataKey,i=r.strategy,a=r.beforeAction,c=r.afterAction,u=(n.leadInfo||{})[o];if(!I(u)){var s={value:u,selector:T(e.selector)?e.selector({dataKey:o,strategy:i,value:u}):e.selector,strategy:i};T(a)&&a(s);var f=O(s);f&&T(c)&&c(t(t({},s),{},{element:f}))}}));case 3:case"end":return e.stop()}}),e,this)}))),function(){return u.apply(this,arguments)})},{key:"trackEvent",value:function(e,t,n){if(!this.token)return null;if(!this.partnerName)throw new Error('Parameter "partnerName" is required to track events');return j({type:e,partner:this.partnerName,zenfiId:this.id,event:t,meta:n})}},{key:"trackConversion",value:function(e,t){this.trackEvent("converted",e,t)}},{key:"trackAbortion",value:function(e,t){this.trackEvent("aborted",e,t)}},{key:"trackPageView",value:function(){var e={href:window.location.href,hash:window.location.hash,search:window.location.search,protocol:window.location.protocol,hostname:window.location.hostname,pathname:window.location.pathname};this.trackConversion("PageView",e)}},{key:"initPageViewsTracking",value:function(){var e=this;this.trackPageView(),D(),window.addEventListener("locationchange",(function(){return e.trackPageView()}))}}])&&i(n.prototype,a),c&&i(n,c),e}()}));
//# sourceMappingURL=index.js.map
