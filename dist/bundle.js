(()=>{var e={666:e=>{var t=function(e){"use strict";var t,n=Object.prototype,o=n.hasOwnProperty,r="function"==typeof Symbol?Symbol:{},i=r.iterator||"@@iterator",s=r.asyncIterator||"@@asyncIterator",c=r.toStringTag||"@@toStringTag";function d(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{d({},"")}catch(e){d=function(e,t,n){return e[t]=n}}function a(e,t,n,o){var r=t&&t.prototype instanceof m?t:m,i=Object.create(r.prototype),s=new _(o||[]);return i._invoke=function(e,t,n){var o=l;return function(r,i){if(o===p)throw new Error("Generator is already running");if(o===f){if("throw"===r)throw i;return M()}for(n.method=r,n.arg=i;;){var s=n.delegate;if(s){var c=L(s,n);if(c){if(c===g)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===l)throw o=f,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=p;var d=u(e,t,n);if("normal"===d.type){if(o=n.done?f:h,d.arg===g)continue;return{value:d.arg,done:n.done}}"throw"===d.type&&(o=f,n.method="throw",n.arg=d.arg)}}}(e,n,s),i}function u(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(e){return{type:"throw",arg:e}}}e.wrap=a;var l="suspendedStart",h="suspendedYield",p="executing",f="completed",g={};function m(){}function y(){}function v(){}var b={};d(b,i,(function(){return this}));var E=Object.getPrototypeOf,x=E&&E(E(C([])));x&&x!==n&&o.call(x,i)&&(b=x);var w=v.prototype=m.prototype=Object.create(b);function S(e){["next","throw","return"].forEach((function(t){d(e,t,(function(e){return this._invoke(t,e)}))}))}function k(e,t){function n(r,i,s,c){var d=u(e[r],e,i);if("throw"!==d.type){var a=d.arg,l=a.value;return l&&"object"==typeof l&&o.call(l,"__await")?t.resolve(l.__await).then((function(e){n("next",e,s,c)}),(function(e){n("throw",e,s,c)})):t.resolve(l).then((function(e){a.value=e,s(a)}),(function(e){return n("throw",e,s,c)}))}c(d.arg)}var r;this._invoke=function(e,o){function i(){return new t((function(t,r){n(e,o,t,r)}))}return r=r?r.then(i,i):i()}}function L(e,n){var o=e.iterator[n.method];if(o===t){if(n.delegate=null,"throw"===n.method){if(e.iterator.return&&(n.method="return",n.arg=t,L(e,n),"throw"===n.method))return g;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return g}var r=u(o,e.iterator,n.arg);if("throw"===r.type)return n.method="throw",n.arg=r.arg,n.delegate=null,g;var i=r.arg;return i?i.done?(n[e.resultName]=i.value,n.next=e.nextLoc,"return"!==n.method&&(n.method="next",n.arg=t),n.delegate=null,g):i:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,g)}function N(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function q(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function _(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(N,this),this.reset(!0)}function C(e){if(e){var n=e[i];if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var r=-1,s=function n(){for(;++r<e.length;)if(o.call(e,r))return n.value=e[r],n.done=!1,n;return n.value=t,n.done=!0,n};return s.next=s}}return{next:M}}function M(){return{value:t,done:!0}}return y.prototype=v,d(w,"constructor",v),d(v,"constructor",y),y.displayName=d(v,c,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===y||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,v):(e.__proto__=v,d(e,c,"GeneratorFunction")),e.prototype=Object.create(w),e},e.awrap=function(e){return{__await:e}},S(k.prototype),d(k.prototype,s,(function(){return this})),e.AsyncIterator=k,e.async=function(t,n,o,r,i){void 0===i&&(i=Promise);var s=new k(a(t,n,o,r),i);return e.isGeneratorFunction(n)?s:s.next().then((function(e){return e.done?e.value:s.next()}))},S(w),d(w,c,"Generator"),d(w,i,(function(){return this})),d(w,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=[];for(var n in e)t.push(n);return t.reverse(),function n(){for(;t.length;){var o=t.pop();if(o in e)return n.value=o,n.done=!1,n}return n.done=!0,n}},e.values=C,_.prototype={constructor:_,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(q),!e)for(var n in this)"t"===n.charAt(0)&&o.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var n=this;function r(o,r){return c.type="throw",c.arg=e,n.next=o,r&&(n.method="next",n.arg=t),!!r}for(var i=this.tryEntries.length-1;i>=0;--i){var s=this.tryEntries[i],c=s.completion;if("root"===s.tryLoc)return r("end");if(s.tryLoc<=this.prev){var d=o.call(s,"catchLoc"),a=o.call(s,"finallyLoc");if(d&&a){if(this.prev<s.catchLoc)return r(s.catchLoc,!0);if(this.prev<s.finallyLoc)return r(s.finallyLoc)}else if(d){if(this.prev<s.catchLoc)return r(s.catchLoc,!0)}else{if(!a)throw new Error("try statement without catch or finally");if(this.prev<s.finallyLoc)return r(s.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&o.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var i=r;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var s=i?i.completion:{};return s.type=e,s.arg=t,i?(this.method="next",this.next=i.finallyLoc,g):this.complete(s)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),g},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),q(n),g}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var o=n.completion;if("throw"===o.type){var r=o.arg;q(n)}return r}}throw new Error("illegal catch attempt")},delegateYield:function(e,n,o){return this.delegate={iterator:C(e),resultName:n,nextLoc:o},"next"===this.method&&(this.arg=t),g}},e}(e.exports);try{regeneratorRuntime=t}catch(e){"object"==typeof globalThis?globalThis.regeneratorRuntime=t:Function("r","regeneratorRuntime = r")(t)}}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,n),i.exports}(()=>{"use strict";const e=new class{constructor(e=""){this.content=e,this.insert_content(e),this.pop_up=document.getElementById("Modal"),this.close_icon=document.querySelector(".hide-Modal"),this.close_icon.onclick=()=>this.pop_up.style.display="none",window.onclick=e=>{e.target===this.pop_up&&(this.pop_up.style.display="none")}}insert_content(e){document.querySelector("#inserted-content").innerHTML=e}open(e=80){this.changeSize(e),this.pop_up.style.display="block"}close(){this.changeSize(80),this.close_icon.click()}changeSize(e){return e>=40&&e<=100&&(document.querySelector(".Modal-content").style.width=e+"%",!0)}};Object.freeze(e);const t=e,o=new class{constructor(){this.ctx=null,this.canvas=null,this.delete=!1,this.isDirected=!1,this.isWighted=!1,this.popupEdge=null,this.observers=[],this.MENU_STATUS=0,this.ContextMenuNode=null,this.MovingMode=!1,this.nodeSize=15,this.nodePicked=null}subscribe(e){this.observers.push(e)}unsubscribe(e){this.observers=this.observers.filter((t=>{if(t!==e)return t}))}fire(){this.observers.forEach((e=>{e(this.canvas,this.ctx,this.nodeSize)}))}};class r{constructor(e,t){this.x=e,this.y=t}deepCopy(){return new r(this.x,this.y)}}class i{constructor(e,t,n="#000"){this.start=e,this.end=t,this.color=n,this.weights=new Set}addWeight(e){return this.weights.add(e)}removeWeight(e){if(this.weights.delete(e),0===this.weights.size)return-1}equals(e){return this.start===e.start&&this.end===e.end}toString(){const e=[...this.weights].join(", ");return`from ${this.start} to  ${this.end} with weight {${e}}`}deepCopy(){const e=new i(this.start,this.end);return this.weights.forEach((t=>{t&&e.addWeight(t)})),e}}class s{constructor(e,t,n){this.position=e,this.number=t,this.color="#000",this.size=n,this.edges=new Set}addEdge(e,t=1){const n=this.getEdge(e);if(!n){const n=new i(this.number,e);return n.addWeight(t),this.edges.add(n),!0}return n.addWeight(t),!0}removeEdge(e,t){const n=this.getEdge(e);return!!n&&(t?-1===n.removeWeight(t)&&this.edges.delete(n):this.edges.delete(n),!0)}getEdge(e){let t=null;for(let n of this.edges.keys())n.end===e&&(t=n);return t}equals(e){return this.number===e.number}toString(){return this.number}deepCopy(){const e=new s(this.position.deepCopy(),this.number,this.size);return e.color=this.color,this.edges.forEach((t=>{t&&e.edges.add(t.deepCopy())})),e}}class c{constructor(){this.nodes=new Set,this.nodeCount=1,this.availableNum=[]}addNode(e,t){let n;0!==this.availableNum.length?(n=this.availableNum[0],this.availableNum.splice(0,1)):n=this.nodeCount;const r=new s(e,n,t);this.nodes.add(r),this.nodeCount++,o.fire()}getNode(e){let t=null;for(let n of this.nodes.keys())n.number===e&&(t=n);return t}removeNode(e){const t=this.getNode(e),n=t.number;for(let e of this.nodes.keys())for(let t of e.edges.keys())t.end===n&&this.removeEdge(t.start,t.end);this.availableNum.push(n),this.nodes.delete(t),this.nodeCount--,o.fire()}addEdge(e,t,n=1){const r=this.getNode(e),i=this.getNode(t);return!(!r||!i||(r.addEdge(i.number,n),o.fire(),0))}removeEdge(e,t,n){const r=this.getNode(e),i=this.getNode(t),s=r.removeEdge(i.number,n);return s&&o.fire(),s}getEdge(e,t){const n=this.getNode(e),o=this.getNode(t);return n.getEdge(o.number)}deepCopy(){let e=new c;return this.nodes.forEach((t=>{t&&e.nodes.add(t.deepCopy())})),e.nodeCount=this.nodeCount,e.availableNum=[...this.availableNum],e}}let d={nodes:[],add:function(e){1===this.nodes.length?(this.nodes.push(e),o.popupEdge=w.getEdge(this.nodes[0].number,this.nodes[1].number),o.popupEdge||(o.popupEdge=new i(this.nodes[0].number,this.nodes[1].number)),o.isWighted?(t.insert_content('\n        <div class="weight-container">\n            <span id="weight-input-text">Want to Add a weight?</span>\n            <input id="weight-input" class="" type="number" min="0" value="1">\n            <button type="submit" class="btn cancel">Confirm</button>\n        </div>\n    '),document.querySelector("#weight-input").addEventListener("keyup",(e=>{13===e.keyCode&&(E(e.target.value),e.target.value=1)})),document.querySelector(".cancel").addEventListener("click",(()=>{E(document.querySelector("#weight-input").value),document.querySelector("#weight-input").value=1})),t.open(),t.changeSize(50)):(w.addEdge(this.nodes[0].number,this.nodes[1].number),o.isDirected||w.addEdge(this.nodes[1].number,this.nodes[0].number)),this.nodes=[]):this.nodes.push(e)}};function a(e,t,n,o=null,r,i=null){const s=t.position.x,c=t.position.y;e.beginPath(),e.lineWidth=1.5,e.strokeStyle=o||"#000",e.textAlign="center",e.textBaseline="middle",e.font=`${r}px serif`,e.arc(s,c,r,0,2*Math.PI),e.fillText(n,s,c),e.stroke(),i&&(e.fillStyle="rgba(0,255,0,.2)",e.fill(),e.fillStyle="black"),e.closePath()}function u(e,t,n,o){return Math.sqrt((n-e)*(n-e)+(o-t)*(o-t))}function l(e,t){return t.getEdge(e.number)}function h(e,t,n,o,r){let i,s,c,d,a=g(n,o,f(e,t,n,o),r,1),l=g(n,o,f(e,t,n,o),r,-1);return[c,d]=u(e,t,a[0],a[1])<u(e,t,n,o)?a:l,a=g(e,t,f(e,t,n,o),r,1),l=g(e,t,f(e,t,n,o),r,-1),[i,s]=u(n,o,a[0],a[1])<u(e,t,n,o)?a:l,[i,s,c,d]}function p(e,t,n,r,i=null){e.strokeStyle=i||"#000";let s=h(t.position.x,t.position.y,n.position.x,n.position.y,r),[c,d,a,u]=s;o.isDirected&&l(t,n)?t.number>n.number?m(e,c,d,a,u,1):m(e,c,d,a,u,-1):function(e,t,n,r,i,s=null){e.strokeStyle=s||"#3f3a3a",e.beginPath(),e.lineWidth=1,e.moveTo(t,n),e.lineTo(r,i),o.isDirected&&y(e,t,n,r,i),e.stroke()}(e,c,d,a,u,i)}function f(e,t,n,o){return e===n?o-t:(o-t)/(n-e)}function g(e,t,n,o,r){let i=e+r*o/Math.sqrt(1+n*n);return[i,t+n*(i-e)]}function m(e,t,n,o,r,i){e.beginPath(),e.lineWidth=1;let s=g((t+o)/2,(n+r)/2,-1/f(t,n,o,r),u(t,n,o,r)/4,i),c=s[0],d=s[1];e.moveTo(t,n),e.quadraticCurveTo(c,d,o,r),y(e,t,n,o,r),e.stroke()}function y(e,t,n,o,r){let i=o-t,s=r-n,c=Math.atan2(s,i);e.lineTo(o-10*Math.cos(c-Math.PI/4),r-10*Math.sin(c-Math.PI/4)),e.moveTo(o,r),e.lineTo(o-10*Math.cos(c+Math.PI/4),r-10*Math.sin(c+Math.PI/4))}function v(e,t){for(let n of w.nodes.keys())if(u(e,t,n.position.x,n.position.y)<=o.nodeSize)return n;return!1}n(666);let b=function(e,t){t.clearRect(0,0,e.width,e.height),function(e){for(let t of w.nodes.keys())a(e,t,t.number,t.color,t.size)}(t),function(e){for(let t of w.nodes.keys())for(let n of t.edges)p(e,w.getNode(n.start),w.getNode(n.end),Math.min(w.getNode(n.start).size,w.getNode(n.end).size),n.color)}(t,o.nodeSize),d.nodes[0]&&a(t,d.nodes[0],"","green",d.nodes[0].size,1)};function E(e){o.popupEdge.addWeight(Number(e)),w.addEdge(o.popupEdge.start,o.popupEdge.end,Number(e)),o.isDirected||w.addEdge(o.popupEdge.end,o.popupEdge.start,Number(e)),o.popupEdge=0,t.close()}const x=document.getElementById("main_canvas");let w=new c;if(x&&x.getContext){x.width=window.innerWidth,x.height=.87*window.innerHeight;const e=x.getContext("2d");e&&(b(x,e),o.canvas=x,o.ctx=e,o.subscribe(b))}function S(e){t.insert_content('\n        <div class="edges-container"></div>\n    ');let n=document.querySelector(".edges-container");k(n,"div","div","Start Node","End Node",["header"],["header"]),k(n,"div","div",e.start,e.end,["edge-info"],["edge-info"]),k(n,"div",null,"Weights",null,["header"],null);let o=e.weights;for(let t of o)k(n,"div","button",t,"Delete Weight",["edge-info"],["edge-info","removeEdgeBtn"],e);let r=document.createElement("button");r.classList.add("confirm"),r.innerText="Close",r.addEventListener("click",(()=>{t.close()})),n.appendChild(r),t.open()}function k(e,n,r,i,s,c,d,a){let u=document.createElement("div");u.classList.add("edge");let l=document.createElement(n);for(let e of c)l.classList.add(e);if(l.innerText=i,u.appendChild(l),null!=r){let e=document.createElement(r);for(let t of d)e.classList.add(t);e.innerText=s,"button"===r&&e.addEventListener("click",(()=>{t.close(),w.removeEdge(a.start,a.end,i),o.isDirected||w.removeEdge(a.end,a.start,i)})),u.appendChild(e)}e.appendChild(u)}function L(e,t){let n=e.getBoundingClientRect(),o=t.clientX-n.left,i=t.clientY-n.top;return new r(o,i)}const N="LINE",q="CURVE",_=(e,t)=>Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2)),C=(e,t)=>{let n=w.getNode(t.start),i=w.getNode(t.end),[s,c,d,a]=h(n.position.x,n.position.y,i.position.x,i.position.y,n.size);n=new r(s,c),i=new r(d,a);const u=(e=>o.isDirected&&l(w.getNode(e.start),w.getNode(e.end))?q:N)(t);if(u===N){if(((e,t,n)=>_(e,t)+_(e,n)-_(t,n)<.1)(e,n,i))return S(t),!0}else if(u===q&&((e,t,n)=>{p(n,w.getNode(t.start),w.getNode(t.end),Math.min(w.getNode(t.start).size,w.getNode(t.end).size));const r=n.isPointInStroke(e.x,e.y);return o.fire(),r})(e,t,o.ctx))return S(t),!0;return!1};let M=document.querySelector(".addColor");function z(){o.nodePicked=!o.nodePicked,M.style.backgroundColor=o.nodePicked?"#ef2626":"#009879",o.nodePicked&&(d.nodes=[],o.fire())}M.addEventListener("click",(()=>{z()})),document.querySelector(".delete").addEventListener("click",(e=>T(e,x)));const T=(e,t)=>{t.classList.toggle("deleteCursor"),e.target.classList.toggle("clicked");const n=document.querySelector("canvas");o.delete=n.classList.contains("deleteCursor"),d.nodes=[],o.fire()};function I(e){w.removeNode(e.number),o.fire()}function P(){1!==o.MENU_STATUS?(o.MENU_STATUS=1,document.querySelector("#context-menu").classList.add("context-menu-active")):(document.querySelector("#context-menu").classList.remove("context-menu-active"),o.MENU_STATUS=0)}let W=0;function D(e,t,n,r){let i=x.width,s=o.nodeSize+15,c=n*(o.nodeSize+5)*2+15*(n-1),d=0,a=0===r[0]?u(s,c,e.position.x,e.position.y):1e7;for(let t=1;t<=W;t++)if(s+=2*o.nodeSize+15,0===r[t]){if(s>i)break;u(s,c,e.position.x,e.position.y)<a&&(a=u(s,c,e.position.x,e.position.y),d=t)}r[d]=1,s=d?o.nodeSize+15+d*(2*o.nodeSize+15):o.nodeSize+15,t.position.x=s,t.position.y=c}function j(e){let t=[],n=new Array(w.nodeCount+1);n.fill(0);let r=w.getNode(parseInt(e));t.push(r),n[parseInt(e)]=1;let i=1,s=1;for(function(e){let t=x.width,n=o.nodeSize+15,r=1;for(;r<=1e6&&(n+=2*o.nodeSize+15,!(n>t));r++);e.position.x=o.nodeSize+15+r/2*(2*o.nodeSize+15),W=r-1}(r),r.position.y=i*(o.nodeSize+5)*2;0!==t.length;){let e=new Array(W+1).fill(0);for(let o=1;o<=s;o++){let o=t.shift();for(let r of o.edges.keys())if(0===n[r.end]){n[r.end]=1;let s=w.getNode(r.end);t.push(s),D(o,s,i+1,e)}}i++,s=t.length}o.fire()}const U=document.getElementById("main_canvas");document.querySelector("#move").addEventListener("click",(()=>{P(),o.MovingMode=!0})),document.querySelector("#delete").addEventListener("click",(()=>{P(),I(o.ContextMenuNode),d.nodes=[],o.fire()})),o.canvas.addEventListener("mousemove",(e=>(e=>{o.MovingMode&&(o.ContextMenuNode.position=L(o.canvas,e),o.fire())})(e))),o.canvas.addEventListener("click",(()=>{o.MovingMode=!1})),U.addEventListener("contextmenu",(e=>((e,t)=>{t.preventDefault();const n=L(e,t),r=v(n.x,n.y);r&&(P(),(e=>{let t=e.clientX+"px",n=e.clientY+"px";const o=document.querySelector("#context-menu");o.style.left=t,o.style.top=n})(t),o.ContextMenuNode=r)})(x,e))),U.addEventListener("click",(e=>function(e,t){if(1===o.MENU_STATUS)return P();const n=L(e,t);if((e=>{for(let t of w.nodes.keys())for(let n of t.edges.keys())if(C(e,n))return!0;return!1})(n))return;const i=v(n.x,n.y);var s,c;i?o.nodePicked?(s=i,c=document.querySelector(".colorInput").value,s.color=c,o.fire(),z()):o.delete?I(i):function(e){for(let t=0;t<2;t++)if(d.nodes[t]&&e.equals(d.nodes[t]))return d.nodes=[],void o.fire();d.add(e),o.fire()}(i):o.delete||w.addNode(new r(n.x,n.y),o.nodeSize)}(x,e))),document.querySelector(".DrawAsTree").addEventListener("click",(()=>{t.insert_content('\n        <div class="root-pickup-container">\n            <span id="root-pickup-input-text">Type the root of the tree</span>\n            <input id="root-pickup-input" class="" type="number" min="1"  value="1">\n            <button type="submit" class="btn confirm">Confirm</button>\n            <span id="root-pickup-error"></span>\n\n        </div>\n    '),document.querySelector("#root-pickup-input").addEventListener("keyup",(e=>{13===e.keyCode&&(j(e.target.value),e.target.value=1,t.close())})),document.querySelector(".confirm").addEventListener("click",(()=>{let e=document.querySelector("#root-pickup-input").value;!0===function(e){let t=w.getNode(parseInt(e));return!(e>w.nodes.size||null==t)||(document.querySelector("#root-pickup-error").innerHTML="The node  you have chosen, it doesn't exist!",!1)}(e)&&(j(e),document.querySelector("#root-pickup-error").innerHTML="",document.querySelector("#root-pickup-input").value=1,t.close())})),t.open(),t.changeSize(50)}));const A=document.querySelector(".toolbox .toggle"),O=document.querySelector(".toolbox");function G(e,t){const n=document.createElement("a");n.href=t,n.download=e,n.click(),URL.revokeObjectURL(n.href)}A.onclick=()=>{A.classList.toggle("active_toolbox"),O.classList.toggle("active_toolbox"),function(){const e=document.querySelector("#sidebar-space");e.style.display="block"===e.style.display?"none":"block",document.querySelector("body").classList.toggle("sidebar-open-space")}()},A.click(),document.querySelector(".save-as-img").addEventListener("click",(function(){try{return G("Graph-image.png",o.canvas.toDataURL("image/png")),!0}catch(e){return!1}})),document.querySelector(".save-as-txt").addEventListener("click",(function(){let e=function(e){let t="",n=0,o=0;return e.nodes.forEach((e=>{o=e.number,e.edges.forEach((e=>{t+=e+"\n",n++}))})),n="Edges count: "+n+"\n","Nodes count: "+o+"\n"+n+t}(w);try{const t=new Blob([e],{type:"text/plain"});return G("Graph.txt",URL.createObjectURL(t)),!0}catch(e){return!1}})),document.querySelector(".nodeSize").addEventListener("change",(e=>{e.stopPropagation(),o.nodeSize=parseInt(document.querySelector(".nodeSize").value),document.querySelector(".nodeSizeLabel").innerHTML=o.nodeSize;for(let e of w.nodes.keys())e.size=o.nodeSize;o.fire()})),document.querySelector("#isWeighted[type=checkbox]").addEventListener("change",(()=>{o.isWighted=!o.isWighted})),document.querySelector("#edge-direction[type=checkbox]").addEventListener("change",(()=>{o.isDirected=!o.isDirected,o.fire()})),document.querySelector(".clear").addEventListener("click",(()=>{R(x)}));const R=e=>{e.width=e.offsetWidth,e.height=e.offsetHeight,w.nodes=new Set,w.nodeCount=1,w.availableNum=[],d.nodes=[]};document.querySelector("#matrix-input").addEventListener("click",(()=>{t.insert_content('\n   <div id="matrix-size">\n        <h3>Enter the Size(N) you want for your matrix</h3>\n        <input id="size" type="number" min="1" max="8" placeholder="N">\n        <button id="create-matrix" class="canvas_button" type="submit">Create Matrix</button>\n   </div>\n   <div id="matrix-table"></div>\n   <button id="draw_matrix" class="canvas_button" type="button">Draw Graph</button>\n'),document.querySelector("#draw_matrix").addEventListener("click",(()=>H())),document.querySelector("#create-matrix").addEventListener("click",$),t.open(50)}));const H=()=>{R(o.canvas);let e=100,n=100,i=0;const s=document.querySelectorAll("#matrix-table tbody tr").length;for(let t=1;t<=s;t++)i<=4?(e+=100,w.addNode(new r(e,n)),i++):(e=100,n+=100,w.addNode(new r(e,n)),i=0);const c=document.querySelectorAll("#matrix-table table tbody td input");for(const e of c){const t=Number(e.value);if(0!==t){const n=e.id.split("_"),o=n[1],r=n[2];w.addEdge(Number(o),Number(r),t)}}t.close()},$=()=>{const e=document.querySelector("#size").value;(e=>e>=1&&e<=8)(e)?(e=>{const t=document.querySelector("#matrix-table");t.innerHTML="";const n=document.createElement("table");n.setAttribute("border","1");const o=document.createElement("thead"),r=document.createElement("tr"),i=document.createElement("td");i.innerText="-",r.appendChild(i);for(let t=0;t<e;t++){const e=document.createElement("td");e.innerText=`${t+1}`,r.appendChild(e)}o.appendChild(r),n.appendChild(o);const s=document.createElement("tbody");for(let t=0;t<e;t++){const n=document.createElement("tr"),o=document.createElement("td");o.innerText=`${t+1}`,n.appendChild(o);for(let o=0;o<e;o++){const e=document.createElement("td"),r=document.createElement("input");r.type="number",r.id=`cell_${t+1}_${o+1}`,r.value="0",e.appendChild(r),n.appendChild(e)}s.appendChild(n)}n.appendChild(s),t.appendChild(n),document.querySelector("#draw_matrix").style.display="block"})(e):document.querySelector("#matrix-table").innerHTML='<h3 style="color: red">Enter a valid Size</h3>'};function B(e){document.querySelector("#textarea-errors").innerHTML=`<h3 style="color: red">${e}</h3>`}function F(e,t,n){return Number.isInteger(e)&&Number.isInteger(t)&&e<=n&&t<=n&&e>0&&t>0}document.querySelector("#textarea-input").addEventListener("click",(()=>{t.insert_content('\n<div id="textarea-content">\n        <div id="textarea-errors"></div>\n        <textarea id="graph_text" name="graph_text"\n                      placeholder="Enter the number of the nodes and edges on the first line\n[ex. N E]\nfollowed by E lines:\n    - In each line enter the starting node, ending node and optionally the weight (default value is 1)\n        [ex. 1 2 4] or [1 2] >> will have weight of 1\n"></textarea>\n\n        <button id="draw_graph_from_text" class="canvas_button" type="button">Draw Graph</button>\n</div>\n\n    '),document.querySelector("#draw_graph_from_text").addEventListener("click",(()=>{Y()})),document.querySelector("#textarea-errors").innerHTML="",t.open()}));const Y=()=>{R(o.canvas);let e=document.querySelector("#graph_text").value.split(/\n/);e=e.filter((e=>e.length>0));let[n,i]=e[0].split(" ");try{n=parseInt(n),i=parseInt(i)}catch(e){return B("Enter valid number for the nodes and edges count")}if(e.length!==i+1)return B("the number of edge defined should be equaled to the edges count ");!function(e){let t=100,n=100,o=0;for(let i=1;i<=e;i++)o<=4?(t+=100,w.addNode(new r(t,n)),o++):(t=100,n+=100,w.addNode(new r(t,n)),o=0)}(n);const s=function(e,t){for(let n=1;n<e.length;n++){if(e[n].length<2)return"each line should have at least two number separated by a space";{let[r,i,s]=e[n].split(" ");if(r=Number(r),i=Number(i),!F(r,i,t))return`Invalid Node Number on line ${n+1}`;s?(w.addEdge(r,i,Number(s)),o.isDirected||w.addEdge(i,r,Number(s))):(w.addEdge(r,i),o.isDirected||w.addEdge(i,r))}}}(e,n);if(s)return B(s);t.close()}})()})();