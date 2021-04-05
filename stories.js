/*! For license information please see stories.js.LICENSE.txt */
(()=>{var t={184:(t,e)=>{var r;!function(){"use strict";var i={}.hasOwnProperty;function n(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var o=typeof r;if("string"===o||"number"===o)t.push(r);else if(Array.isArray(r)&&r.length){var s=n.apply(null,r);s&&t.push(s)}else if("object"===o)for(var a in r)i.call(r,a)&&r[a]&&t.push(a)}}return t.join(" ")}t.exports?(n.default=n,t.exports=n):void 0===(r=function(){return n}.apply(e,[]))||(t.exports=r)}()}},e={};function r(i){if(e[i])return e[i].exports;var n=e[i]={exports:{}};return t[i](n,n.exports,r),n.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var i in e)r.o(e,i)&&!r.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";const t="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,e=(t,e,r=null)=>{for(;e!==r;){const r=e.nextSibling;t.removeChild(e),e=r}},i=`{{lit-${String(Math.random()).slice(2)}}}`,n=`\x3c!--${i}--\x3e`,o=new RegExp(`${i}|${n}`),s="$lit$";class a{constructor(t,e){this.parts=[],this.element=e;const r=[],n=[],a=document.createTreeWalker(e.content,133,null,!1);let c=0,p=-1,u=0;const{strings:f,values:{length:g}}=t;for(;u<g;){const t=a.nextNode();if(null!==t){if(p++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:r}=e;let i=0;for(let t=0;t<r;t++)l(e[t].name,s)&&i++;for(;i-- >0;){const e=f[u],r=h.exec(e)[2],i=r.toLowerCase()+s,n=t.getAttribute(i);t.removeAttribute(i);const a=n.split(o);this.parts.push({type:"attribute",index:p,name:r,strings:a}),u+=a.length-1}}"TEMPLATE"===t.tagName&&(n.push(t),a.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(i)>=0){const i=t.parentNode,n=e.split(o),a=n.length-1;for(let e=0;e<a;e++){let r,o=n[e];if(""===o)r=d();else{const t=h.exec(o);null!==t&&l(t[2],s)&&(o=o.slice(0,t.index)+t[1]+t[2].slice(0,-s.length)+t[3]),r=document.createTextNode(o)}i.insertBefore(r,t),this.parts.push({type:"node",index:++p})}""===n[a]?(i.insertBefore(d(),t),r.push(t)):t.data=n[a],u+=a}}else if(8===t.nodeType)if(t.data===i){const e=t.parentNode;null!==t.previousSibling&&p!==c||(p++,e.insertBefore(d(),t)),c=p,this.parts.push({type:"node",index:p}),null===t.nextSibling?t.data="":(r.push(t),p--),u++}else{let e=-1;for(;-1!==(e=t.data.indexOf(i,e+1));)this.parts.push({type:"node",index:-1}),u++}}else a.currentNode=n.pop()}for(const t of r)t.parentNode.removeChild(t)}}const l=(t,e)=>{const r=t.length-e.length;return r>=0&&t.slice(r)===e},c=t=>-1!==t.index,d=()=>document.createComment(""),h=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function p(t,e){const{element:{content:r},parts:i}=t,n=document.createTreeWalker(r,133,null,!1);let o=f(i),s=i[o],a=-1,l=0;const c=[];let d=null;for(;n.nextNode();){a++;const t=n.currentNode;for(t.previousSibling===d&&(d=null),e.has(t)&&(c.push(t),null===d&&(d=t)),null!==d&&l++;void 0!==s&&s.index===a;)s.index=null!==d?-1:s.index-l,o=f(i,o),s=i[o]}c.forEach((t=>t.parentNode.removeChild(t)))}const u=t=>{let e=11===t.nodeType?0:1;const r=document.createTreeWalker(t,133,null,!1);for(;r.nextNode();)e++;return e},f=(t,e=-1)=>{for(let r=e+1;r<t.length;r++){const e=t[r];if(c(e))return r}return-1},g=new WeakMap,v=t=>"function"==typeof t&&g.has(t),m={},y={};class b{constructor(t,e,r){this.__parts=[],this.template=t,this.processor=e,this.options=r}update(t){let e=0;for(const r of this.__parts)void 0!==r&&r.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const e=t?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),r=[],i=this.template.parts,n=document.createTreeWalker(e,133,null,!1);let o,s=0,a=0,l=n.nextNode();for(;s<i.length;)if(o=i[s],c(o)){for(;a<o.index;)a++,"TEMPLATE"===l.nodeName&&(r.push(l),n.currentNode=l.content),null===(l=n.nextNode())&&(n.currentNode=r.pop(),l=n.nextNode());if("node"===o.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,o.name,o.strings,this.options));s++}else this.__parts.push(void 0),s++;return t&&(document.adoptNode(e),customElements.upgrade(e)),e}}const x=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),w=` ${i} `;class _{constructor(t,e,r,i){this.strings=t,this.values=e,this.type=r,this.processor=i}getHTML(){const t=this.strings.length-1;let e="",r=!1;for(let o=0;o<t;o++){const t=this.strings[o],a=t.lastIndexOf("\x3c!--");r=(a>-1||r)&&-1===t.indexOf("--\x3e",a+1);const l=h.exec(t);e+=null===l?t+(r?w:n):t.substr(0,l.index)+l[1]+l[2]+s+l[3]+i}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==x&&(e=x.createHTML(e)),t.innerHTML=e,t}}const S=t=>null===t||!("object"==typeof t||"function"==typeof t),$=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class P{constructor(t,e,r){this.dirty=!0,this.element=t,this.name=e,this.strings=r,this.parts=[];for(let t=0;t<r.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new C(this)}_getValue(){const t=this.strings,e=t.length-1,r=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=r[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!$(t))return t}let i="";for(let n=0;n<e;n++){i+=t[n];const e=r[n];if(void 0!==e){const t=e.value;if(S(t)||!$(t))i+="string"==typeof t?t:String(t);else for(const e of t)i+="string"==typeof e?e:String(e)}}return i+=t[e],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class C{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===m||S(t)&&t===this.value||(this.value=t,v(t)||(this.committer.dirty=!0))}commit(){for(;v(this.value);){const t=this.value;this.value=m,t(this)}this.value!==m&&this.committer.commit()}}class O{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(d()),this.endNode=t.appendChild(d())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=d()),t.__insert(this.endNode=d())}insertAfterPart(t){t.__insert(this.startNode=d()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;v(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=m,t(this)}const t=this.__pendingValue;t!==m&&(S(t)?t!==this.value&&this.__commitText(t):t instanceof _?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):$(t)?this.__commitIterable(t):t===y?(this.value=y,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,r="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=r:this.__commitNode(document.createTextNode(r)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof b&&this.value.template===e)this.value.update(t.values);else{const r=new b(e,t.processor,this.options),i=r._clone();r.update(t.values),this.__commitNode(i),this.value=r}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let r,i=0;for(const n of t)r=e[i],void 0===r&&(r=new O(this.options),e.push(r),0===i?r.appendIntoPart(this):r.insertAfterPart(e[i-1])),r.setValue(n),r.commit(),i++;i<e.length&&(e.length=i,this.clear(r&&r.endNode))}clear(t=this.startNode){e(this.startNode.parentNode,t.nextSibling,this.endNode)}}class j{constructor(t,e,r){if(this.value=void 0,this.__pendingValue=void 0,2!==r.length||""!==r[0]||""!==r[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=r}setValue(t){this.__pendingValue=t}commit(){for(;v(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=m,t(this)}if(this.__pendingValue===m)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=m}}class R extends P{constructor(t,e,r){super(t,e,r),this.single=2===r.length&&""===r[0]&&""===r[1]}_createPart(){return new M(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class M extends C{}let k=!1;(()=>{try{const t={get capture(){return k=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class A{constructor(t,e,r){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=r,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;v(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=m,t(this)}if(this.__pendingValue===m)return;const t=this.__pendingValue,e=this.value,r=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),i=null!=t&&(null==e||r);r&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=T(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=m}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const T=t=>t&&(k?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);function z(t){let e=E.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},E.set(t.type,e));let r=e.stringsArray.get(t.strings);if(void 0!==r)return r;const n=t.strings.join(i);return r=e.keyString.get(n),void 0===r&&(r=new a(t,t.getTemplateElement()),e.keyString.set(n,r)),e.stringsArray.set(t.strings,r),r}const E=new Map,N=new WeakMap,F=new class{handleAttributeExpressions(t,e,r,i){const n=e[0];return"."===n?new R(t,e.slice(1),r).parts:"@"===n?[new A(t,e.slice(1),i.eventContext)]:"?"===n?[new j(t,e.slice(1),r)]:new P(t,e,r).parts}handleTextExpression(t){return new O(t)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const L=(t,...e)=>new _(t,e,"html",F),D=(t,e)=>`${t}--${e}`;let U=!0;void 0===window.ShadyCSS?U=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),U=!1);const I=t=>e=>{const r=D(e.type,t);let n=E.get(r);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},E.set(r,n));let o=n.stringsArray.get(e.strings);if(void 0!==o)return o;const s=e.strings.join(i);if(o=n.keyString.get(s),void 0===o){const r=e.getTemplateElement();U&&window.ShadyCSS.prepareTemplateDom(r,t),o=new a(e,r),n.keyString.set(s,o)}return n.stringsArray.set(e.strings,o),o},V=["html","svg"],B=new Set;window.JSCompiler_renameProperty=(t,e)=>t;const q={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},H=(t,e)=>e!==t&&(e==e||t==t),W={attribute:!0,type:String,converter:q,reflect:!1,hasChanged:H};class G extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach(((e,r)=>{const i=this._attributeNameForProperty(r,e);void 0!==i&&(this._attributeToPropertyMap.set(i,r),t.push(i))})),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach(((t,e)=>this._classProperties.set(e,t)))}}static createProperty(t,e=W){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const r="symbol"==typeof t?Symbol():`__${t}`,i=this.getPropertyDescriptor(t,r,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}static getPropertyDescriptor(t,e,r){return{get(){return this[e]},set(i){const n=this[t];this[e]=i,this.requestUpdateInternal(t,n,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||W}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const r of e)this.createProperty(r,t[r])}}static _attributeNameForProperty(t,e){const r=e.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,r=H){return r(t,e)}static _propertyValueFromAttribute(t,e){const r=e.type,i=e.converter||q,n="function"==typeof i?i:i.fromAttribute;return n?n(t,r):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const r=e.type,i=e.converter;return(i&&i.toAttribute||q.toAttribute)(t,r)}initialize(){this._updateState=0,this._updatePromise=new Promise((t=>this._enableUpdatingResolver=t)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((t,e)=>this[e]=t)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,r){e!==r&&this._attributeToProperty(t,r)}_propertyToAttribute(t,e,r=W){const i=this.constructor,n=i._attributeNameForProperty(t,r);if(void 0!==n){const t=i._propertyValueToAttribute(e,r);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const r=this.constructor,i=r._attributeToPropertyMap.get(t);if(void 0!==i){const t=r.getPropertyOptions(i);this._updateState=16|this._updateState,this[i]=r._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,r){let i=!0;if(void 0!==t){const n=this.constructor;r=r||n.getPropertyOptions(t),n._valueHasChanged(this[t],e,r.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==r.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,r))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((t,e)=>this._propertyToAttribute(e,this[e],t))),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}G.finalized=!0;const J=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:r,elements:i}=e;return{kind:r,elements:i,finisher(e){window.customElements.define(t,e)}}})(t,e),Z=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?Object.assign(Object.assign({},e),{finisher(r){r.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(r){r.createProperty(e.key,t)}};function Y(t){return(e,r)=>void 0!==r?((t,e,r)=>{e.constructor.createProperty(r,t)})(t,e,r):Z(t,e)}const Q=Element.prototype;Q.msMatchesSelector||Q.webkitMatchesSelector;const K=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,X=Symbol();class tt{constructor(t,e){if(e!==X)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(K?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const et=(t,...e)=>{const r=e.reduce(((e,r,i)=>e+(t=>{if(t instanceof tt)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(r)+t[i+1]),t[0]);return new tt(r,X)};(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const rt={};class it extends G{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,r)=>t.reduceRight(((t,r)=>Array.isArray(r)?e(r,t):(t.add(r),t)),r),r=e(t,new Set),i=[];r.forEach((t=>i.unshift(t))),this._styles=i}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map((t=>{if(t instanceof CSSStyleSheet&&!K){const e=Array.prototype.slice.call(t.cssRules).reduce(((t,e)=>t+e.cssText),"");return new tt(String(e),X)}return t}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?K?this.renderRoot.adoptedStyleSheets=t.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map((t=>t.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==rt&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)})))}render(){return rt}}it.finalized=!0,it.render=(t,r,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const n=i.scopeName,o=N.has(r),s=U&&11===r.nodeType&&!!r.host,a=s&&!B.has(n),l=a?document.createDocumentFragment():r;if(((t,r,i)=>{let n=N.get(r);void 0===n&&(e(r,r.firstChild),N.set(r,n=new O(Object.assign({templateFactory:z},i))),n.appendInto(r)),n.setValue(t),n.commit()})(t,l,Object.assign({templateFactory:I(n)},i)),a){const t=N.get(l);N.delete(l),((t,e,r)=>{B.add(t);const i=r?r.element:document.createElement("template"),n=e.querySelectorAll("style"),{length:o}=n;if(0===o)return void window.ShadyCSS.prepareTemplateStyles(i,t);const s=document.createElement("style");for(let t=0;t<o;t++){const e=n[t];e.parentNode.removeChild(e),s.textContent+=e.textContent}(t=>{V.forEach((e=>{const r=E.get(D(e,t));void 0!==r&&r.keyString.forEach((t=>{const{element:{content:e}}=t,r=new Set;Array.from(e.querySelectorAll("style")).forEach((t=>{r.add(t)})),p(t,r)}))}))})(t);const a=i.content;r?function(t,e,r=null){const{element:{content:i},parts:n}=t;if(null==r)return void i.appendChild(e);const o=document.createTreeWalker(i,133,null,!1);let s=f(n),a=0,l=-1;for(;o.nextNode();)for(l++,o.currentNode===r&&(a=u(e),r.parentNode.insertBefore(e,r));-1!==s&&n[s].index===l;){if(a>0){for(;-1!==s;)n[s].index+=a,s=f(n,s);return}s=f(n,s)}}(r,s,a.firstChild):a.insertBefore(s,a.firstChild),window.ShadyCSS.prepareTemplateStyles(i,t);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(r){a.insertBefore(s,a.firstChild);const t=new Set;t.add(s),p(r,t)}})(n,l,t.value instanceof b?t.value.template:void 0),e(r,r.firstChild),r.appendChild(l),N.set(r,t)}!o&&s&&window.ShadyCSS.styleElement(r.host)};const nt=new WeakMap,ot=(st=t=>e=>{const r=nt.get(e);if(void 0===t&&e instanceof C){if(void 0!==r||!nt.has(e)){const t=e.committer.name;e.committer.element.removeAttribute(t)}}else t!==r&&e.setValue(t);nt.set(e,t)},(...t)=>{const e=st(...t);return g.set(e,!0),e});var st,at=r(184),lt=r.n(at),ct=function(t,e){return(ct=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)};function dt(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}ct(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}function ht(t){var e="function"==typeof Symbol&&Symbol.iterator,r=e&&t[e],i=0;if(r)return r.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&i>=t.length&&(t=void 0),{value:t&&t[i++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function pt(t,e){var r="function"==typeof Symbol&&t[Symbol.iterator];if(!r)return t;var i,n,o=r.call(t),s=[];try{for(;(void 0===e||e-- >0)&&!(i=o.next()).done;)s.push(i.value)}catch(t){n={error:t}}finally{try{i&&!i.done&&(r=o.return)&&r.call(o)}finally{if(n)throw n.error}}return s}function ut(t,e){for(var r=0,i=e.length,n=t.length;r<i;r++,n++)t[n]=e[r];return t}function ft(t){return"function"==typeof t}function gt(t){var e=t((function(t){Error.call(t),t.stack=(new Error).stack}));return e.prototype=Object.create(Error.prototype),e.prototype.constructor=e,e}Object.create,Object.create;var vt=gt((function(t){return function(e){t(this),this.message=e?e.length+" errors occurred during unsubscription:\n"+e.map((function(t,e){return e+1+") "+t.toString()})).join("\n  "):"",this.name="UnsubscriptionError",this.errors=e}}));function mt(t,e){if(t){var r=t.indexOf(e);0<=r&&t.splice(r,1)}}var yt=function(){function t(t){this.initialTeardown=t,this.closed=!1,this._parentage=null,this._teardowns=null}var e;return t.prototype.unsubscribe=function(){var t,e,r,i,n;if(!this.closed){this.closed=!0;var o=this._parentage;if(Array.isArray(o))try{for(var s=ht(o),a=s.next();!a.done;a=s.next())a.value.remove(this)}catch(e){t={error:e}}finally{try{a&&!a.done&&(e=s.return)&&e.call(s)}finally{if(t)throw t.error}}else null==o||o.remove(this);var l=this.initialTeardown;if(ft(l))try{l()}catch(t){n=t instanceof vt?t.errors:[t]}var c=this._teardowns;if(c){this._teardowns=null;try{for(var d=ht(c),h=d.next();!h.done;h=d.next()){var p=h.value;try{wt(p)}catch(t){n=null!=n?n:[],t instanceof vt?n=ut(ut([],pt(n)),pt(t.errors)):n.push(t)}}}catch(t){r={error:t}}finally{try{h&&!h.done&&(i=d.return)&&i.call(d)}finally{if(r)throw r.error}}}if(n)throw new vt(n)}},t.prototype.add=function(e){var r;if(e&&e!==this)if(this.closed)wt(e);else{if(e instanceof t){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._teardowns=null!==(r=this._teardowns)&&void 0!==r?r:[]).push(e)}},t.prototype._hasParent=function(t){var e=this._parentage;return e===t||Array.isArray(e)&&e.includes(t)},t.prototype._addParent=function(t){var e=this._parentage;this._parentage=Array.isArray(e)?(e.push(t),e):e?[e,t]:t},t.prototype._removeParent=function(t){var e=this._parentage;e===t?this._parentage=null:Array.isArray(e)&&mt(e,t)},t.prototype.remove=function(e){var r=this._teardowns;r&&mt(r,e),e instanceof t&&e._removeParent(this)},t.EMPTY=((e=new t).closed=!0,e),t}(),bt=yt.EMPTY;function xt(t){return t instanceof yt||t&&"closed"in t&&ft(t.remove)&&ft(t.add)&&ft(t.unsubscribe)}function wt(t){ft(t)?t():t.unsubscribe()}var _t={setTimeout:function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r=_t.delegate;return((null==r?void 0:r.setTimeout)||setTimeout).apply(void 0,ut([],pt(t)))},clearTimeout:function(t){var e=_t.delegate;return((null==e?void 0:e.clearTimeout)||clearTimeout)(t)},delegate:void 0};function St(t){_t.setTimeout((function(){throw t}))}function $t(){}var Pt=Ct("C",void 0,void 0);function Ct(t,e,r){return{kind:t,value:e,error:r}}var Ot=function(t){function e(e){var r=t.call(this)||this;return r.isStopped=!1,e?(r.destination=e,xt(e)&&e.add(r)):r.destination=At,r}return dt(e,t),e.create=function(t,e,r){return new jt(t,e,r)},e.prototype.next=function(t){this.isStopped?kt(function(t){return Ct("N",t,void 0)}(t),this):this._next(t)},e.prototype.error=function(t){this.isStopped?kt(Ct("E",void 0,t),this):(this.isStopped=!0,this._error(t))},e.prototype.complete=function(){this.isStopped?kt(Pt,this):(this.isStopped=!0,this._complete())},e.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,t.prototype.unsubscribe.call(this))},e.prototype._next=function(t){this.destination.next(t)},e.prototype._error=function(t){try{this.destination.error(t)}finally{this.unsubscribe()}},e.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},e}(yt),jt=function(t){function e(e,r,i){var n,o=t.call(this)||this;if(ft(e))n=e;else if(e){var s;n=e.next,r=e.error,i=e.complete,s=e,n=null==n?void 0:n.bind(s),r=null==r?void 0:r.bind(s),i=null==i?void 0:i.bind(s)}return o.destination={next:n?Rt(n):$t,error:Rt(r||Mt),complete:i?Rt(i):$t},o}return dt(e,t),e}(Ot);function Rt(t,e){return t}function Mt(t){St(t)}function kt(t,e){}var At={closed:!0,next:$t,error:Mt,complete:$t},Tt="function"==typeof Symbol&&Symbol.observable||"@@observable";function zt(t){return t}function Et(t){return 0===t.length?zt:1===t.length?t[0]:function(e){return t.reduce((function(t,e){return e(t)}),e)}}var Nt=function(){function t(t){t&&(this._subscribe=t)}return t.prototype.lift=function(e){var r=new t;return r.source=this,r.operator=e,r},t.prototype.subscribe=function(t,e,r){var i,n=(i=t)&&i instanceof Ot||function(t){return t&&ft(t.next)&&ft(t.error)&&ft(t.complete)}(i)&&xt(i)?t:new jt(t,e,r),o=this.operator,s=this.source;return n.add(o?o.call(n,s):s?this._subscribe(n):this._trySubscribe(n)),n},t.prototype._trySubscribe=function(t){try{return this._subscribe(t)}catch(e){t.error(e)}},t.prototype.forEach=function(t,e){var r=this;return new(e=Ft(e))((function(e,i){var n;n=r.subscribe((function(e){try{t(e)}catch(t){i(t),null==n||n.unsubscribe()}}),i,e)}))},t.prototype._subscribe=function(t){var e;return null===(e=this.source)||void 0===e?void 0:e.subscribe(t)},t.prototype[Tt]=function(){return this},t.prototype.pipe=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return t.length?Et(t)(this):this},t.prototype.toPromise=function(t){var e=this;return new(t=Ft(t))((function(t,r){var i;e.subscribe((function(t){return i=t}),(function(t){return r(t)}),(function(){return t(i)}))}))},t.create=function(e){return new t(e)},t}();function Ft(t){var e;return null!==(e=null!=t?t:void 0)&&void 0!==e?e:Promise}var Lt=function(t){return t&&"number"==typeof t.length&&"function"!=typeof t};function Dt(t){return ft(null==t?void 0:t.then)}function Ut(t,e){return new Nt((function(r){var i=0;return e.schedule((function(){i===t.length?r.complete():(r.next(t[i++]),r.closed||this.schedule())}))}))}var It="function"==typeof Symbol&&Symbol.iterator?Symbol.iterator:"@@iterator";function Vt(t){return ft(t[Tt])}function Bt(t){return ft(null==t?void 0:t[It])}function qt(t){return Symbol.asyncIterator&&ft(null==t?void 0:t[Symbol.asyncIterator])}function Ht(t){return new TypeError("You provided "+(null!==t&&"object"==typeof t?"an invalid object":"'"+t+"'")+" where a stream was expected. You can provide an Observable, Promise, Array, AsyncIterable, or Iterable.")}function Wt(t,e){return e?function(t,e){if(null!=t){if(Vt(t))return function(t,e){return new Nt((function(r){var i=new yt;return i.add(e.schedule((function(){var n=t[Tt]();i.add(n.subscribe({next:function(t){i.add(e.schedule((function(){return r.next(t)})))},error:function(t){i.add(e.schedule((function(){return r.error(t)})))},complete:function(){i.add(e.schedule((function(){return r.complete()})))}}))}))),i}))}(t,e);if(Lt(t))return Ut(t,e);if(Dt(t))return function(t,e){return new Nt((function(r){return e.schedule((function(){return t.then((function(t){r.add(e.schedule((function(){r.next(t),r.add(e.schedule((function(){return r.complete()})))})))}),(function(t){r.add(e.schedule((function(){return r.error(t)})))}))}))}))}(t,e);if(qt(t))return function(t,e){if(!t)throw new Error("Iterable cannot be null");return new Nt((function(r){var i=new yt;return i.add(e.schedule((function(){var n=t[Symbol.asyncIterator]();i.add(e.schedule((function(){var t=this;n.next().then((function(e){e.done?r.complete():(r.next(e.value),t.schedule())}))})))}))),i}))}(t,e);if(Bt(t))return function(t,e){return new Nt((function(r){var i;return r.add(e.schedule((function(){i=t[It](),function(t,e,r,i){void 0===i&&(i=0);var n=e.schedule((function(){try{r.call(this)}catch(e){t.error(e)}}),i);t.add(n)}(r,e,(function(){var t=i.next(),e=t.value;t.done?r.complete():(r.next(e),this.schedule())}))}))),function(){return ft(null==i?void 0:i.return)&&i.return()}}))}(t,e)}throw Ht(t)}(t,e):Gt(t)}function Gt(t){if(t instanceof Nt)return t;if(null!=t){if(Vt(t))return n=t,new Nt((function(t){var e=n[Tt]();if(ft(e.subscribe))return e.subscribe(t);throw new TypeError("Provided object does not correctly implement Symbol.observable")}));if(Lt(t))return Jt(t);if(Dt(t))return i=t,new Nt((function(t){i.then((function(e){t.closed||(t.next(e),t.complete())}),(function(e){return t.error(e)})).then(null,St)}));if(qt(t))return r=t,new Nt((function(t){(function(t,e){var r,i,n,o,s,a,l;return s=this,l=function(){var s,a;return function(t,e){var r,i,n,o,s={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;s;)try{if(r=1,i&&(n=2&o[0]?i.return:o[0]?i.throw||((n=i.return)&&n.call(i),0):i.next)&&!(n=n.call(i,o[1])).done)return n;switch(i=0,n&&(o=[2&o[0],n.value]),o[0]){case 0:case 1:n=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,i=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!((n=(n=s.trys).length>0&&n[n.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!n||o[1]>n[0]&&o[1]<n[3])){s.label=o[1];break}if(6===o[0]&&s.label<n[1]){s.label=n[1],n=o;break}if(n&&s.label<n[2]){s.label=n[2],s.ops.push(o);break}n[2]&&s.ops.pop(),s.trys.pop();continue}o=e.call(t,s)}catch(t){o=[6,t],i=0}finally{r=n=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}}(this,(function(l){switch(l.label){case 0:l.trys.push([0,5,6,11]),r=function(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e,r=t[Symbol.asyncIterator];return r?r.call(t):(t=ht(t),e={},i("next"),i("throw"),i("return"),e[Symbol.asyncIterator]=function(){return this},e);function i(r){e[r]=t[r]&&function(e){return new Promise((function(i,n){!function(t,e,r,i){Promise.resolve(i).then((function(e){t({value:e,done:r})}),e)}(i,n,(e=t[r](e)).done,e.value)}))}}}(t),l.label=1;case 1:return[4,r.next()];case 2:if((i=l.sent()).done)return[3,4];if(s=i.value,e.next(s),e.closed)return[2];l.label=3;case 3:return[3,1];case 4:return[3,11];case 5:return a=l.sent(),n={error:a},[3,11];case 6:return l.trys.push([6,,9,10]),i&&!i.done&&(o=r.return)?[4,o.call(r)]:[3,8];case 7:l.sent(),l.label=8;case 8:return[3,10];case 9:if(n)throw n.error;return[7];case 10:return[7];case 11:return e.complete(),[2]}}))},new((a=void 0)||(a=Promise))((function(t,e){function r(t){try{n(l.next(t))}catch(t){e(t)}}function i(t){try{n(l.throw(t))}catch(t){e(t)}}function n(e){var n;e.done?t(e.value):(n=e.value,n instanceof a?n:new a((function(t){t(n)}))).then(r,i)}n((l=l.apply(s,[])).next())}))})(r,t).catch((function(e){return t.error(e)}))}));if(Bt(t))return e=t,new Nt((function(t){var r,i;try{for(var n=ht(e),o=n.next();!o.done;o=n.next()){var s=o.value;if(t.next(s),t.closed)return}}catch(t){r={error:t}}finally{try{o&&!o.done&&(i=n.return)&&i.call(n)}finally{if(r)throw r.error}}t.complete()}))}var e,r,i,n;throw Ht(t)}function Jt(t){return new Nt((function(e){for(var r=0;r<t.length&&!e.closed;r++)e.next(t[r]);e.complete()}))}function Zt(t){return function(e){if(function(t){return ft(null==t?void 0:t.lift)}(e))return e.lift((function(e){try{return t(e,this)}catch(t){this.error(t)}}));throw new TypeError("Unable to lift unknown Observable type")}}var Yt=function(t){function e(e,r,i,n,o){var s=t.call(this,e)||this;return s.onFinalize=o,s._next=r?function(t){try{r(t)}catch(t){this.destination.error(t)}}:t.prototype._next,s._error=i?function(t){try{i(t)}catch(t){this.destination.error(t)}finally{this.unsubscribe()}}:t.prototype._error,s._complete=n?function(){try{n()}catch(t){this.destination.error(t)}finally{this.unsubscribe()}}:t.prototype._complete,s}return dt(e,t),e.prototype.unsubscribe=function(){var e,r=this.closed;t.prototype.unsubscribe.call(this),!r&&(null===(e=this.onFinalize)||void 0===e||e.call(this))},e}(Ot);function Qt(t,e){return Zt((function(r,i){var n=0;r.subscribe(new Yt(i,(function(r){i.next(t.call(e,r,n++))})))}))}function Kt(t,e,r){return void 0===r&&(r=1/0),ft(e)?Kt((function(r,i){return Qt((function(t,n){return e(r,t,i,n)}))(Gt(t(r,i)))}),r):("number"==typeof e&&(r=e),Zt((function(e,i){return function(t,e,r,i,n,o,s,a){var l=[],c=0,d=0,h=!1,p=function(){!h||l.length||c||e.complete()},u=function(t){c++;var n=!1;Gt(r(t,d++)).subscribe(new Yt(e,(function(t){e.next(t)}),void 0,(function(){n=!0}),(function(){if(n)try{for(c--;l.length&&c<i;)t=l.shift(),u(t);p()}catch(t){e.error(t)}var t})))};return t.subscribe(new Yt(e,(function(t){return c<i?u(t):l.push(t)}),void 0,(function(){h=!0,p()}))),function(){}}(e,i,t,r)})))}function Xt(){return void 0===(t=1)&&(t=1/0),Kt(zt,t);var t}function te(t,e){return e?Ut(t,e):Jt(t)}function ee(t){return(r=(e=t)[e.length-1])&&ft(r.schedule)?t.pop():void 0;var e,r}function re(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return Xt()(te(t,ee(t)))}function ie(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r=ee(t);return Zt((function(e,i){(r?re(t,e,r):re(t,e)).subscribe(i)}))}var ne=gt((function(t){return function(){t(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"}})),oe=function(t){function e(){var e=t.call(this)||this;return e.observers=[],e.closed=!1,e.isStopped=!1,e.hasError=!1,e.thrownError=null,e}return dt(e,t),e.prototype.lift=function(t){var e=new se(this,this);return e.operator=t,e},e.prototype._throwIfClosed=function(){if(this.closed)throw new ne},e.prototype.next=function(t){var e,r;if(this._throwIfClosed(),!this.isStopped){var i=this.observers.slice();try{for(var n=ht(i),o=n.next();!o.done;o=n.next())o.value.next(t)}catch(t){e={error:t}}finally{try{o&&!o.done&&(r=n.return)&&r.call(n)}finally{if(e)throw e.error}}}},e.prototype.error=function(t){if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=t;for(var e=this.observers;e.length;)e.shift().error(t)}},e.prototype.complete=function(){if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;for(var t=this.observers;t.length;)t.shift().complete()}},e.prototype.unsubscribe=function(){this.isStopped=this.closed=!0,this.observers=null},e.prototype._trySubscribe=function(e){return this._throwIfClosed(),t.prototype._trySubscribe.call(this,e)},e.prototype._subscribe=function(t){return this._throwIfClosed(),this._checkFinalizedStatuses(t),this._innerSubscribe(t)},e.prototype._innerSubscribe=function(t){var e=this,r=this,i=r.hasError,n=r.isStopped,o=r.observers;return i||n?bt:(o.push(t),new yt((function(){return mt(e.observers,t)})))},e.prototype._checkFinalizedStatuses=function(t){var e=this,r=e.hasError,i=e.thrownError,n=e.isStopped;r?t.error(i):n&&t.complete()},e.prototype.asObservable=function(){var t=new Nt;return t.source=this,t},e.create=function(t,e){return new se(t,e)},e}(Nt),se=function(t){function e(e,r){var i=t.call(this)||this;return i.destination=e,i.source=r,i}return dt(e,t),e.prototype.next=function(t){var e,r;null===(r=null===(e=this.destination)||void 0===e?void 0:e.next)||void 0===r||r.call(e,t)},e.prototype.error=function(t){var e,r;null===(r=null===(e=this.destination)||void 0===e?void 0:e.error)||void 0===r||r.call(e,t)},e.prototype.complete=function(){var t,e;null===(e=null===(t=this.destination)||void 0===t?void 0:t.complete)||void 0===e||e.call(t)},e.prototype._subscribe=function(t){var e,r;return null!==(r=null===(e=this.source)||void 0===e?void 0:e.subscribe(t))&&void 0!==r?r:bt},e}(oe);function ae(t){var e=(t=t||{}).connector,r=void 0===e?function(){return new oe}:e,i=t.resetOnComplete,n=void 0===i||i,o=t.resetOnError,s=void 0===o||o,a=t.resetOnRefCountZero,l=void 0===a||a,c=null,d=null,h=0,p=!1,u=!1,f=function(){c=d=null,p=u=!1};return Zt((function(t,e){return h++,(d=null!=d?d:r()).subscribe(e),c||(c=Wt(t).subscribe({next:function(t){return d.next(t)},error:function(t){u=!0;var e=d;s&&f(),e.error(t)},complete:function(){p=!0;var t=d;n&&f(),t.complete()}})),function(){if(h--,l&&!h&&!u&&!p){var t=c;f(),null==t||t.unsubscribe()}}}))}const le=(he=document.querySelector("[class^=theme_]"),pe={attributes:!0,childList:!1,subtree:!1},new Nt((t=>{const e=new MutationObserver((e=>{t.next(e)}));return e.observe(he,pe),e.disconnect}))).pipe(Kt((t=>Wt(t.map((({target:t})=>[...t.classList.values()].find((t=>t.startsWith("theme")))?.split("_").pop()))))),(void 0===de&&(de=zt),ce=null!=ce?ce:function(t,e){return t===e},Zt((function(t,e){var r,i=!0;t.subscribe(new Yt(e,(function(t){var n=de(t);!i&&ce(r,n)||(i=!1,r=n,e.next(t))})))}))),ie((()=>{const{theme:t}=(()=>{const t=new URL(window.location.href);return{slideNumber:parseInt(t.searchParams.get("slide")??"1")-1,theme:t.searchParams.get("theme")??"dark"}})();return t})()),ae());var ce,de,he,pe,ue=Array.isArray,fe=["addListener","removeListener"],ge=["addEventListener","removeEventListener"],ve=["on","off"];function me(t,e){return function(r){return function(i){return t[r](e,i)}}}const ye=window.matchMedia("(orientation: portrait)"),be=t=>t.matches?"portrait":"landscape",xe=function t(e,r,i,n){if(ft(i)&&(n=i,i=void 0),n)return t(e,r,i).pipe((o=n,Qt((function(t){return function(t,e){return ue(e)?t.apply(void 0,ut([],pt(e))):t(e)}(o,t)}))));var o,s=pt(function(t){return ft(t.addEventListener)&&ft(t.removeEventListener)}(e)?ge.map((function(t){return function(n){return e[t](r,n,i)}})):function(t){return ft(t.addListener)&&ft(t.removeListener)}(e)?fe.map(me(e,r)):function(t){return ft(t.on)&&ft(t.off)}(e)?ve.map(me(e,r)):[],2),a=s[0],l=s[1];return!a&&Lt(e)?Kt((function(e){return t(e,r,i)}))(te(e)):new Nt((function(t){if(!a)throw new TypeError("Invalid event target");var e=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return t.next(1<e.length?e:e[0])};return a(e),function(){return l(e)}}))}(ye,"change").pipe(Qt(be),ie(be(ye)),ae());var we=function(t,e,r,i){var n,o=arguments.length,s=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(o<3?n(s):o>3?n(e,r,s):n(e,r))||s);return o>3&&s&&Object.defineProperty(e,r,s),s};class _e extends it{constructor(){super(),this.theme="dark",this.orientation="landscape",this.onThemeChange=t=>{this.theme=t},this.onOrientationChange=t=>{this.orientation=t},this.themeSubscription=le.subscribe(this.onThemeChange),this.orientationSubscription=xe.subscribe(this.onOrientationChange)}disconnectedCallback(){super.disconnectedCallback(),this.themeSubscription.unsubscribe(),this.orientationSubscription.unsubscribe()}}we([Y({type:String})],_e.prototype,"theme",void 0),we([Y({type:String})],_e.prototype,"orientation",void 0);const Se=et`
  :host,
  :host *,
  :host *::before,
  :host *::after {
    box-sizing: border-box;
  }
`;var $e=function(t,e,r,i){var n,o=arguments.length,s=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(o<3?n(s):o>3?n(e,r,s):n(e,r))||s);return o>3&&s&&Object.defineProperty(e,r,s),s};let Pe=class extends it{constructor(){super(...arguments),this.name="",this.file="",this.small=!1}static get styles(){return et`
      :host {
        display: block;
      }

      img {
        width: 100%;
        max-height: 100%;
        border-radius: 50%;
        filter: var(--avatar-photo-filter, none);
      }

      img.small {
        width: 40px;
        height: 40px;
      }
    `}render(){const t=[`./assets/images/1x/${this.file} 64w`,`./assets/images/2x/${this.file} 128w`,`./assets/images/3x/${this.file} 192w`,`./assets/images/4x/${this.file} 256w`].join(","),e=t[0];return L`
      <img class=${ot(this.small?"small":void 0)} srcset="${t}" sizes="17vmin" src="${e}" alt="${this.name}">
    `}};$e([Y({type:String})],Pe.prototype,"name",void 0),$e([Y({type:String})],Pe.prototype,"file",void 0),$e([Y({type:Boolean})],Pe.prototype,"small",void 0),Pe=$e([J("x-avatar")],Pe);var Ce=function(t,e,r,i){var n,o=arguments.length,s=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(o<3?n(s):o>3?n(e,r,s):n(e,r))||s);return o>3&&s&&Object.defineProperty(e,r,s),s};let Oe=class extends it{constructor(){super(...arguments),this.dimensions=null,this.observeSize=()=>{new ResizeObserver((t=>{for(let e of t){const{width:t,height:r}=e.contentRect;this.dimensions={width:t,height:r}}})).observe(this)}}static get styles(){return et`
      .container {
        position: relative;
      }

      .emoji {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, calc(-100% + 31%));
        z-index: 1;
        line-height: 1;
        top: 0;
      }
    `}firstUpdated(){this.observeSize()}render(){return L`
      <div class="container">
        ${this.renderEmoji()}
        <slot></slot>
      </div>
    `}renderEmoji(){if(!this.dimensions)return null;const{width:t}=this.dimensions,e=Math.floor(.5*t);return L`
      <span class="emoji" style="font-size: ${e}px">${this.emoji}</span>
    `}};Ce([Y({type:String})],Oe.prototype,"emoji",void 0),Ce([Y({type:Array})],Oe.prototype,"dimensions",void 0),Oe=Ce([J("avatar-with-emoji")],Oe);var je=function(t,e,r,i){var n,o=arguments.length,s=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(o<3?n(s):o>3?n(e,r,s):n(e,r))||s);return o>3&&s&&Object.defineProperty(e,r,s),s};let Re=class extends it{constructor(){super(...arguments),this.dimensions=null,this.observeSize=()=>{new ResizeObserver((t=>{for(let e of t){const{width:t,height:r}=e.contentRect;this.dimensions={width:t,height:r}}})).observe(this)}}static get styles(){return et`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
      }

      .container {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }

      .name {
        color: var(--body-color);
        text-align: center;
        line-height: 1.125;
        margin: 6px 0 4px;
      }

      .value {
        color: var(--body-grey-color);
        font-family: var(--font-family-thin);
      }

      x-avatar, avatar-with-emoji {
        width: 61.5%;
      }

      avatar-with-emoji x-avatar {
        width: 100%;
      }
    `}firstUpdated(){this.observeSize()}getBottomPadding(){const t=this.dimensions?.height;return Math.round(.123*t)}getNameFontSize(){return.15*this.dimensions?.width}getValueFontSize(){return.135*this.dimensions?.width}render(){if(!this.dimensions)return null;const t=L`
      <x-avatar
        name="${this.data.name}"
        file="${this.data.avatar}"
      ></x-avatar>`;return L`
      <div class="container" style="padding-bottom: ${this.getBottomPadding()}px">
        ${this.emoji?L`<avatar-with-emoji emoji="${this.emoji}">${t}</avatar-with-emoji>`:t}
        <div class="name" style="font-size: ${this.getNameFontSize()}px">${this.data.name}</div>
        <div class="value" style="font-size: ${this.getValueFontSize()}px">${this.data.valueText}</div>
      </div>
    `}};je([Y({type:String})],Re.prototype,"theme",void 0),je([Y({type:Object})],Re.prototype,"data",void 0),je([Y({type:String})],Re.prototype,"emoji",void 0),je([Y({type:Array})],Re.prototype,"dimensions",void 0),Re=je([J("person-leader")],Re);var Me=function(t,e,r,i){var n,o=arguments.length,s=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(o<3?n(s):o>3?n(e,r,s):n(e,r))||s);return o>3&&s&&Object.defineProperty(e,r,s),s};let ke=class extends it{static get styles(){return[et`
        h1 {
          font-family: var(--font-family-bold);
          font-size: 8vmin;
          line-height: 1.07;
          color: var(--slide-title-color);
          margin-bottom: 0.27em;
        }

        @media (min-aspect-ratio: 13/16) and (max-aspect-ratio: 1/1) {
          h1 {
            font-size: 6vmin;
          }
        }

        h2 {
          color: var(--slide-subheading-color);
          font-size: min(4.25vw, 4.25vh);
          margin: 0;
        }

        @media  (orientation: landscape) {
          :host {
            text-align: center;          
          }
        }
      `]}render(){return L`
      <h1>
        ${this.title}
      </h1>
      <h2>
        ${this.subtitle}
      </h2>
    `}};Me([Y({type:String})],ke.prototype,"orientation",void 0),Me([Y({type:String})],ke.prototype,"title",void 0),Me([Y({type:String})],ke.prototype,"subtitle",void 0),ke=Me([J("slide-title")],ke);var Ae=function(t,e,r,i){var n,o=arguments.length,s=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(o<3?n(s):o>3?n(e,r,s):n(e,r))||s);return o>3&&s&&Object.defineProperty(e,r,s),s};const Te=new Map([[1,1],[2,.85],[3,.69]]),ze=new Map([[1,1],[2,.81],[3,.81],[4,.63],[5,.63]]);let Ee=class extends it{constructor(){super(...arguments),this.dimensions=null,this.columnOverlapPercent=.133,this.observeSize=()=>{new ResizeObserver((t=>{for(let e of t){const{width:t,height:r}=e.contentRect;this.dimensions={width:t,height:r}}})).observe(this)},this.calculateColumnPosition=(t,e,r)=>{const i=r*this.columnOverlapPercent,n=Math.floor(e/2);let o;if(t===n)o=`calc(50% - ${Math.round(r/2)}px)`;else{const e=t-n,s=-1*e*i;o=`calc(50% + ${Math.round(e*r)}px + ${Math.round(s)}px - ${Math.round(r/2)}px)`}return o}}static get styles(){return et`
      :host {
        display: block;
        height: 100%;
        position: relative;
      }

      :host([theme="dark"]) .step {
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) -2.22%, rgba(0, 0, 0, 0.8) 100%),
          radial-gradient(149.08% 95.38% at 38.75% 71.48%, #000000 0%, #231900 0.01%, #4D4D4D 100%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.2), inset 2px 2px 16px rgba(103, 103, 103, 0.6);
      }

      :host([theme="dark"]) .step_1 {
        background: radial-gradient(91.67% 122.17% at 69.17% -11.17%, #FFA300 0%, #2D1C00 100%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.4), inset 0px 6px 15px rgba(255, 162, 0, 0.4);
      }

      :host([theme="light"]) .step {
        background: linear-gradient(180deg, rgba(244, 244, 244, 0.9) 0.82%, #E9E9E9 100%, rgba(234, 234, 234, 0) 100%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px 0px 20px rgba(207, 207, 207, 0.5);
      }

      :host([theme="light"]) .step_1 {
        background: linear-gradient(180deg, #FFF2D1 0.82%, #FFD66C 100%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px 0px 20px rgba(255, 176, 57, 0.8);
      }

      .column, .column * {
        box-sizing: border-box;
      }

      .column {
        position: absolute;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .step {
        box-sizing: border-box;
        width: 100%;
        border-radius: 6px 6px 0 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 4vmin 0;
      }

      @media (orientation: portrait) {
        .column_1 {
          z-index: 2;
        }

        .column_2, column_3 {
          z-index: 1;
        }
      }

      @media (orientation: landscape) {
        .column_1 {
          z-index: 2;
        }

        .column_2, column_3 {
          z-index: 1;
        }

        .column_4, column_5 {
          z-index: 0;
        }
      }

      .rank {
        font-size: 8vmin;
        line-height: 1;
        color: var(--body-color);
      }

    `}firstUpdated(){this.observeSize()}getColumnWidthPortrait(){const t=this.dimensions?.width,e=this.dimensions?.height;return Math.round(Math.min(t/2.734,.604*e*.355))}getColumnWidthLandscape(){const t=this.dimensions?.width,e=this.dimensions?.height;return Math.round(Math.min(t/4.468,.603*e*.741))}getColumnWidth(){return"portrait"===this.orientation?this.getColumnWidthPortrait():this.getColumnWidthLandscape()}getMaxColumnHeightPortrait(){const t=this.dimensions?.height,e=.582*t,r=t-.07*t-this.getColumnWidthLandscape()/.741;return Math.min(e,r)}getMaxColumnHeightLandscape(){const t=this.dimensions?.height;return t-.07*t-this.getColumnWidthLandscape()/.741}getMaxColumnHeight(){return"portrait"===this.orientation?this.getMaxColumnHeightPortrait():this.getMaxColumnHeightLandscape()}getTopLeader(){return this.people[0]}getLeaders(){const t="portrait"===this.orientation?3:5,e=this.people.slice(0,t),r=[];return e.forEach(((t,e)=>{const i={rank:e+1,person:t};e%2==0?r.unshift(i):r.push(i)})),r}render(){return this.dimensions?L`
      ${this.renderColumns()}
    `:null}renderColumns(){const t=this.getColumnWidth(),e=this.getMaxColumnHeight(),r=this.getLeaders();return r.map((({rank:i,person:n},o)=>{const s=lt()("column",`column_${i}`),a=lt()("step",`step_${i}`),l=this.calculateColumnPosition(o,r.length,t),c=this.getLeaderWidth(t),d=Math.round(1.56*c),h=this.getColumnHeight(e,i);return L`
          <div class="${s}" style="left: ${l}; width: ${t}px;">
            <div class="person-wrapper" style="${this.getColumnPadding(t,i)}">
              <person-leader
                .data=${n}
                theme=${this.theme}
                emoji=${ot(1===i?this.emoji:void 0)}
                style="width: ${c}px; height: ${d}px"
              ></person-leader>
            </div>
            <div class="${a}" style="height: ${h}px; ${this.getColumnPadding(t,i)}">
              <div class="rank">
                ${i}
              </div>
            </div>
          </div>
        `}))}getColumnHeight(t,e){return t*("portrait"===this.orientation?Te:ze).get(e)}getColumnPadding(t,e){const r=t*this.columnOverlapPercent;return 1===e?"":"portrait"===this.orientation&&2===e||"landscape"===this.orientation&&[2,4].includes(e)?`padding-left: ${r}px`:`padding-right: ${r}px`}getLeaderWidth(t){return Math.floor(.866*t)}};Ae([Y({type:String})],Ee.prototype,"theme",void 0),Ae([Y({type:String})],Ee.prototype,"orientation",void 0),Ae([Y({type:String})],Ee.prototype,"emoji",void 0),Ae([Y({type:Array})],Ee.prototype,"people",void 0),Ae([Y({type:Array})],Ee.prototype,"dimensions",void 0),Ee=Ae([J("leaders-podium")],Ee);var Ne=function(t,e,r,i){var n,o=arguments.length,s=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(o<3?n(s):o>3?n(e,r,s):n(e,r))||s);return o>3&&s&&Object.defineProperty(e,r,s),s};let Fe=class extends _e{constructor(){super(...arguments),this.calculateColumnPosition=(t,e)=>{const r=Math.floor(e/2);let i;if(t===r)i="calc(50% - 60px)";else{const e=t-r;i=`calc(50% + ${120*e}px + ${-1*e*16}px - 60px)`}return i}}static get styles(){return[Se,et`
        .slide {
          height: 100%;
          display: grid;
          grid-template-rows: [title] 17% [main] 1fr;
        }

        @media  (orientation: portrait) {
          .slide {
            grid-template-rows: [title] minmax(17%, auto) [main] 1fr;
          }

          .slide {
            padding: 0 6.4vw;
          }
        }

        @media  (orientation: landscape) {
          .slide {
            grid-template-rows: [title] minmax(28%, auto) [main] 1fr;
          }
        }

        .stage {
          height: 100%;
          position: relative;
        }
      `]}getTopLeaderId(){return this.data.users[0].id}renderpodium(){const t="portrait"===this.orientation?3:5,e=this.data.users.slice(0,t),r=[];e.forEach(((t,e)=>{const i={rank:e+1,person:t};e%2==0?r.unshift(i):r.push(i)}));const i=this.getTopLeaderId();return r.map((({rank:t,person:e},n)=>{const o=lt()("podium-section",`podium-section_${t}`,`podium-section_${this.orientation}`),s=lt()("podium-column",`podium-column_${t}`,`podium-column_${this.orientation}`,{"podium-column_top":e.id===i});return L`
        <div class="${o}" style="left: ${this.calculateColumnPosition(n,r.length)}">
          <person-leader
            .data=${e}
            theme=${this.theme}
            emoji=${ot(e.id===i?this.data.emoji:void 0)}
          ></person-leader>
          <div class=${s}>
            <div class="podium-column-place-number">
              ${t}
            </div>
          </div>
        </div>
      `}))}render(){return L`
      <div class="slide slide_${this.theme}">
        <slide-title
          title=${this.data.title}
          subtitle=${this.data.subtitle}
        ></slide-title>
        <div class="stage">
          <leaders-podium
            .emoji=${this.data.emoji}
            .people=${this.data.users}
            theme=${this.theme}
            orientation=${this.orientation}
          ></leaders-podium>
        </div>
      </div>
    `}};Ne([Y({type:Object})],Fe.prototype,"data",void 0),Fe=Ne([J("slide-leaders")],Fe);var Le=function(t,e,r,i){var n,o=arguments.length,s=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(o<3?n(s):o>3?n(e,r,s):n(e,r))||s);return o>3&&s&&Object.defineProperty(e,r,s),s};let De=class extends it{constructor(){super(...arguments),this.dimensions=null,this.observeSize=()=>{new ResizeObserver((t=>{for(let e of t){const{width:t,height:r}=e.contentRect;this.dimensions={width:t,height:r}}})).observe(this)}}static get styles(){return et`
      :host, :host * {
        box-sizing: border-box;
      }
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 104px;
        height: 142px;
        padding: 20px 16px;
        border-radius: 6px;
      }
      :host(:hover) {
        cursor: pointer;
      }
      :host([theme=dark]):host(:hover) {
        background: radial-gradient(85.62% 148.33% at 49.85% 100%, rgba(68, 58, 42, 0.7864) 0%, rgba(0, 0, 0, 0.8) 100%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.2), inset 2px 2px 16px rgba(255, 255, 255, 0.1);
      }


      .name {
        color: var(--body-color);
        font-size: 4.25vmin;
        text-align: center;
        line-height: 1.125;
      }
    `}firstUpdated(){this.observeSize()}render(){const t=this.dimensions?.width||this.getBoundingClientRect().width,e=Math.max(14,Math.round(.15*t));return L`
      <x-avatar
        name="${this.person.name}"
        file="${this.person.avatar}"
      ></x-avatar>
      <div class="name" style="font-size: ${e}px">
        ${this.person.name}
      </div>
    `}};Le([Y({type:Object})],De.prototype,"person",void 0),Le([Y({type:Array})],De.prototype,"dimensions",void 0),De=Le([J("person-vote")],De);var Ue=function(t,e,r,i){var n,o=arguments.length,s=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(o<3?n(s):o>3?n(e,r,s):n(e,r))||s);return o>3&&s&&Object.defineProperty(e,r,s),s};let Ie=class extends it{constructor(){super(...arguments),this.position=null}static get styles(){return et`
      :host {
        display: flex;
        height: 100%;
      }

      :host([orientation=portrait]) {
        flex-grow: 1;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }

      :host([orientation=landscape]) {
        justify-content: space-evenly;
      }

      .column_landscape {
        display: flex;
        flex-direction: column;
      }

      .column_inner {
        justify-content: space-evenly;
      }

      .column_outer {
        justify-content: center;
      }
    `}render(){return"portrait"===this.orientation?this.renderPortrait():this.renderLandscape()}renderPortrait(){return this.people[0],this.renderPeople(this.people)}renderLandscape(){const t="left"===this.position?this.people.slice(0,1):this.people.slice(0,2),e="left"===this.position?this.people.slice(1):this.people.slice(2),r=lt()("column","column_landscape",{column_outer:"left"===this.position},{column_inner:"right"===this.position}),i=lt()("column","column_landscape",{column_outer:"right"===this.position},{column_inner:"left"===this.position});return L`
      <div class=${r}>
        ${this.renderPeople(t)}
      </div>
      <div class=${i}>
        ${this.renderPeople(e)}
      </div>
    `}renderPeople(t){const{width:e,height:r}=this.personSize;return t.map((t=>L`
      <person-vote
        .person=${t}
        theme=${this.theme}
        style="width: ${e}px; height: ${r}px;"
      >
      </person-vote>
    `))}};Ue([Y({type:String})],Ie.prototype,"theme",void 0),Ue([Y({type:String})],Ie.prototype,"orientation",void 0),Ue([Y({type:Array})],Ie.prototype,"people",void 0),Ue([Y({type:Object})],Ie.prototype,"personSize",void 0),Ue([Y({type:String})],Ie.prototype,"position",void 0),Ie=Ue([J("people-vote")],Ie);var Ve=function(t,e,r,i){var n,o=arguments.length,s=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(o<3?n(s):o>3?n(e,r,s):n(e,r))||s);return o>3&&s&&Object.defineProperty(e,r,s),s};let Be=class extends it{static get styles(){return et`
      :host {
        --vertical-padding: #FCFBF7;
      }

      :host, :host * {
        box-sizing: border-box;
      }

      @media (max-aspect-ratio: 10/16) {
        .wrapper {
          padding: 6.1vh 0;
        }
      }

      .wrapper {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      :host([orientation=portrait]) .wrapper {
        justify-content: space-evenly;
      }

      :host([orientation=landscape]) .wrapper {
        justify-content: center;
      }

      :host([orientation=landscape]) .button_up {
        transform: translateY(-15%) rotate(180deg);
      }

      :host([orientation=landscape]) .button_down {
        transform: translateY(15%);
      }

      .button {
        fill: #C4C4C4;
      }

      .button_active {
        cursor: pointer;
      }

      :host([theme=dark]) .button_active {
        fill: var(--color-white);
      }

      :host([theme=light]) .button_active {
        fill: var(--color-yellow);
      }

      .button_up {
        transform: rotate(180deg);
      }

      ::slotted(people-vote) {
        height: 60%;
      }
    `}get perPage(){return"portrait"===this.orientation?8:6}onClick(t){const e=this.perPage,r="up"===t?-1:1,i=this.currentOffset+r*e,n=new CustomEvent("data-event",{detail:{alias:"vote",action:"update",params:{offset:i}},bubbles:!0,composed:!0});this.dispatchEvent(n)}render(){return L`
      <div class="wrapper">
        ${this.renderButton({direction:"up",isActive:!0,onClick:()=>this.onClick("up")})}
        ${"portrait"===this.orientation?L`
          <slot></slot>
        `:null}
        ${this.renderButton({direction:"down",isActive:!0,onClick:()=>this.onClick("down")})}
      </div>
    `}getPadding(){}renderButton(t){const e=this.buttonDiameter,r=this.isButtonActive(t),i=lt()("button",`button_${this.theme}`,`button_${t.direction}`,{button_active:r});return L`
      <svg
        class="${i}"
        @click=${ot(r?t.onClick:void 0)}
        width="${e}"
        height="${e}"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M32 62C48.5685 62 62 48.5685 62 32C62 15.4315 48.5685 2 32 2C15.4315 2 2 15.4315 2 32C2 48.5685 15.4315 62 32 62ZM32 64C49.6731 64 64 49.6731 64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64ZM59 32C59 46.9117 46.9117 59 32 59C17.0883 59 5 46.9117 5 32C5 17.0883 17.0883 5 32 5C46.9117 5 59 17.0883 59 32ZM25.0607 27.9393C24.4749 27.3536 23.5251 27.3536 22.9393 27.9393C22.3536 28.5251 22.3536 29.4749 22.9393 30.0607L30.9393 38.0607C31.5251 38.6464 32.4749 38.6464 33.0607 38.0607L41.0607 30.0607C41.6464 29.4749 41.6464 28.5251 41.0607 27.9393C40.4749 27.3536 39.5251 27.3536 38.9393 27.9393L32 34.8787L25.0607 27.9393Z"
        />
      </svg>
    `}isButtonActive(t){if("up"===t.direction)return this.currentOffset>0;{const t="portrait"===this.orientation?8:6;return this.total>this.currentOffset+t}}};Ve([Y({type:String})],Be.prototype,"theme",void 0),Ve([Y({type:String})],Be.prototype,"orientation",void 0),Ve([Y({type:Number})],Be.prototype,"currentOffset",void 0),Ve([Y({type:Number})],Be.prototype,"total",void 0),Ve([Y({type:Number})],Be.prototype,"buttonDiameter",void 0),Be=Ve([J("pager-vote")],Be);var qe=function(t,e,r,i){var n,o=arguments.length,s=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(o<3?n(s):o>3?n(e,r,s):n(e,r))||s);return o>3&&s&&Object.defineProperty(e,r,s),s};let He=class extends _e{constructor(){super(...arguments),this.offset=0,this.stageDimensions=null,this.observeSize=()=>{new ResizeObserver((t=>{for(let e of t){const{width:t,height:r}=e.contentRect;this.stageDimensions={width:t,height:r}}})).observe(this.shadowRoot?.querySelector("main"))}}static get styles(){return et`
      .slide {
        height: 100%;
        display: grid;
        grid-template-rows: [title] auto [main] 1fr;
      }

      .slide_portrait {
        padding: 0 6.4vw;
      }

      main {
        display: flex;
      }

      .slide_portrait main {
        justify-content: space-between;
      }

      .slide_landscape main {
        justify-content: space-evenly;
      }

      .slide_landscape people-vote {
        flex-grow: 1;
      }
    `}connectedCallback(){super.connectedCallback(),this.data.offset&&(this.offset=this.data.offset)}firstUpdated(){this.observeSize()}render(){const t=lt()("slide",`slide_${this.orientation}`);return L`
      <div class=${t}>
        <slide-title
          title=${this.data.title}
          subtitle=${this.data.subtitle}
          orientation="${this.orientation}"
        ></slide-title>
        <main>
          ${"portrait"===this.orientation?this.renderPortrait():this.renderLandscape()}
        </main>
      </div>
    `}renderPortrait(){if(!this.stageDimensions)return null;const t=this.data.users.slice(this.offset,this.offset+8),e=t.slice(0,3),r=t.slice(3,5),i=t.slice(5);return L`
      ${this.renderPeoplePortrait(e)}
      <pager-vote
        .buttonDiameter=${this.calculatePagerButtonDiameter()}
        .currentOffset=${this.offset}
        .total=${this.data.users.length}
        theme=${this.theme}
        orientation=${this.orientation}
      >
        ${this.renderPeoplePortrait(r)}
      </pager-vote>
      ${this.renderPeoplePortrait(i)}
    `}renderLandscape(){if(!this.stageDimensions)return null;const t=this.data.users.slice(this.offset,this.offset+6),e=[t[0],t[1],t[4]].filter(Boolean),r=[t[2],t[5],t[3]].filter(Boolean);return L`
      ${this.renderPeopleLandscape(e,"left")}
      <pager-vote
        .buttonDiameter=${this.calculatePagerButtonDiameter()}
        .currentOffset=${this.offset}
        .total=${this.data.users.length}
        theme=${this.theme}
        orientation=${this.orientation}
      >
      </pager-vote>
      ${this.renderPeopleLandscape(r,"right")}
    `}renderPeoplePortrait(t){return L`
      <people-vote
        .people=${t}
        .personSize=${this.calculatePersonSize()}
        theme=${this.theme}
        orientation=${this.orientation}
      ></people-vote>
    `}renderPeopleLandscape(t,e){return L`
      <people-vote
        .people=${t}
        .personSize=${this.calculatePersonSize()}
        theme=${this.theme}
        orientation=${this.orientation}
        position=${e}
      ></people-vote>
    `}calculatePersonSize(){const{width:t,height:e}=this.getBoundingClientRect(),r=Math.min(t,e),i=this.stageDimensions?.width,n=this.stageDimensions?.height;let o,s;if("portrait"===this.orientation){const t=Math.round(.28*r),e=n/3.2,a=Math.min(Math.round(.317*i),t),l=1.365*a;l<=e?(s=Math.round(a),o=Math.round(l)):(o=Math.round(e),s=Math.round(e/1.365)),o=Math.round(1.365*s)}else{const t=Math.round(.32*r);o=Math.min(Math.round(.4765*n),t),s=Math.round(o/1.365)}return{width:s,height:o}}calculatePagerButtonDiameter(){const{width:t}=this.calculatePersonSize();let e=.615*t;return"landscape"===this.orientation&&(e=Math.min(e,window.innerWidth-4.05*t)),Math.round(e)}};qe([Y({type:Object})],He.prototype,"data",void 0),qe([Y({type:Number})],He.prototype,"offset",void 0),qe([Y({type:Object})],He.prototype,"stageDimensions",void 0),He=qe([J("slide-vote")],He);var We=function(t,e,r,i){var n,o=arguments.length,s=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(o<3?n(s):o>3?n(e,r,s):n(e,r))||s);return o>3&&s&&Object.defineProperty(e,r,s),s};let Ge=class extends it{static get styles(){return et`
      img {
        width: 100%;
      }
    `}getImagePath(){let t;return t=this.activity?this.activity<3?"mid":this.activity<5?"max":"extra":"min",`/assets/images/${t}-${this.theme}.svg`}render(){return L`
      <img src=${this.getImagePath()} />
    `}};We([Y({type:String})],Ge.prototype,"theme",void 0),We([Y({type:Number})],Ge.prototype,"activity",void 0),Ge=We([J("activity-indicator")],Ge);var Je=function(t,e,r,i){var n,o=arguments.length,s=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(o<3?n(s):o>3?n(e,r,s):n(e,r))||s);return o>3&&s&&Object.defineProperty(e,r,s),s};let Ze=class extends it{static get styles(){return et`
      :host {
        display: flex;
        align-items: center;
      }

      .scale-wrapper {
        height: 3.2vw;
        display: flex;
        align-items: center;
      }

      .scale {
        position: relative;
        width: 13.6vmin;
        height: 1vmin;
      }

      .scale::before, .scale::after {
        width: 1vmin;
        height: 3.2vmin;
      }

      .scale::before, .scale::after {
        content: '';
        position: absolute;
        top: 0;
        border-radius: 2px;     
      }

      .scale::before {
        left: 0;
        transform: translate(-100%, -33%);
      }
      
      .scale::after {
        right: 0;
        transform: translate(100%, -33%);
      }

      .scale_dark {
        background: radial-gradient(circle at 50% 50%, #403B36 0%, #131211 100%);
        box-shadow: inset 3px 1px 16px 0px #70665E,inset 0px -1px 2px 0px #FFFFFF;
      }

      .scale_light {
        background: radial-gradient(circle at 50% 50%, #FFFFFF 0%, #FFFFFF 100%);
        box-shadow: inset 1px 1px 16px 0px #676767,inset -1px 0px 2px 0px #FFFFFF;
      }

      .scale_dark::before, .scale_dark::after {
        background: radial-gradient(circle at 50% 50%, #403B36 0%, #000000 100%);
        box-shadow: inset 3px 1px 16px 0px #70665E,inset 0px -1px 2px 0px #FFFFFF;
      }

      .label-text {
        color: var(--body-grey-color);
        margin-top: 0.5em;
      }

      .label-wrapper:not(:first-child) {
        margin-left: 2vw;
      }

      .indicator {
        border-radius: 2px;
      }

      @media (orientation: portrait) {
        .indicator {
          width: 15.7vw;
          height: 3.2vw;
        }
      }

      @media (orientation: landscape) {
        .indicator {
          width: 15.7vh;
          height: 3.2vh;
        }
      }

      .indicator-lowest_dark {
        background: radial-gradient(3906.1% 3815.36% at 89.06% 78.28%, rgba(19, 17, 16, 0.65) 0%, rgba(0, 0, 0, 0.65) 100%);
        box-shadow: inset -1px 0px 2px rgba(255, 255, 255, 0.2), inset 1px 1px 16px rgba(112, 102, 94, 0.2);
      }

      .indicator-lowest_light {
        background: radial-gradient(2408.25% 2730.55% at 89.06% 78.28%, rgba(250, 250, 250, 0.6) 0%, rgba(250, 250, 250, 0.6) 100%);
        box-shadow: inset -1px 0px 2px rgba(250, 250, 250, 0.2), inset 1px 1px 16px rgba(106, 106, 106, 0.2);
      }

      .indicator-low_dark {
        background: radial-gradient(5752.25% 5190.32% at 74.43% 60.32%, rgba(0, 0, 0, 0.9) 0%, rgba(35, 22, 0, 0.9) 0.01%, rgba(112, 92, 94, 0.9) 100%);
        box-shadow: inset -1px 0px 1px rgba(255, 255, 255, 0.2), inset 2px 2px 10px rgba(93, 116, 141, 0.6);
      }

      .indicator-low_light {
        radial-gradient(2408.25% 2730.55% at 89.06% 78.28%, rgba(250, 250, 250, 0.8) 0%, rgba(250, 250, 250, 0.8) 100%);
        box-shadow: inset -1px 0px 2px rgba(250, 250, 250, 0.2), inset 1px 1px 16px rgba(106, 106, 106, 0.3);
      }

      .indicator-mid_dark {
        background: radial-gradient(5528.36% 3005.63% at 74.43% 75.84%, rgba(0, 0, 0, 0.9) 0%, rgba(33, 22, 2, 0.9) 0.01%, rgba(172, 113, 9, 0.9) 100%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.2), inset 2px 2px 10px rgba(242, 159, 13, 0.2);
      }

      .indicator-mid_light {
        background: radial-gradient(68.1% 68.1% at 4.41% 31.9%, #FFF6DD 8.72%, #FFFEFA 100%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px 0px 20px rgba(255, 176, 57, 0.4);
      }

      .indicator-high_dark {
        background: radial-gradient(2258.03% 620.37% at 83.33% 88.95%, #201502 0%, #C7830A 100%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.2), inset 2px 2px 10px rgba(242, 159, 13, 0.9);
      }

      .indicator-high_light {
        background: radial-gradient(66.02% 86.49% at -16.18% 13.51%, rgba(255, 186, 6, 0.85) 0%, #FFF2AD 100%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px 0px 20px rgba(255, 176, 57, 0.4);
      }
    `}render(){return L`
      ${this.renderScale()}
      ${this.renderLowest()}
      ${this.renderLow()}
      ${this.renderMid()}
      ${this.renderHigh()}
    `}renderScale(){return L`
      <div class="label-wrapper">
        <div class="scale-wrapper">
          <div class="scale scale_${this.theme}"></div>
        </div>
        <div class="label-text">1 час</div>
      </div>
    `}renderLowest(){return L`
      <div class="label-wrapper">
        <div class="indicator indicator-lowest_${this.theme}"></div>
        <div class="label-text">0</div>
      </div>
    `}renderLow(){return L`
      <div class="label-wrapper">
        <div class="indicator indicator-low_${this.theme}"></div>
        <div class="label-text">1 — 2</div>
      </div>
    `}renderMid(){return L`
      <div class="label-wrapper">
        <div class="indicator indicator-mid_${this.theme}"></div>
        <div class="label-text">3 — 4</div>
      </div>
    `}renderHigh(){return L`
      <div class="label-wrapper">
        <div class="indicator indicator-high_${this.theme}"></div>
        <div class="label-text">5 — 6</div>
      </div>
    `}};Je([Y({type:String})],Ze.prototype,"theme",void 0),Je([Y({type:String})],Ze.prototype,"orientation",void 0),Ze=Je([J("activity-legend")],Ze);var Ye=function(t,e,r,i){var n,o=arguments.length,s=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(o<3?n(s):o>3?n(e,r,s):n(e,r))||s);return o>3&&s&&Object.defineProperty(e,r,s),s};const Qe=["mon","tue","wed","thu","fri","sat","sun"];let Ke=class extends _e{static get styles(){return[Se,et`
        :host {
          height: 100%;
          display: grid;
          grid-template-rows: [title] auto [main] 1fr;
          padding: 0 24px;
        }

        @media (orientation: landscape) {
          :host {
            --row-height: 9vh;
            --up-shift: -5.6vh;
          }
        }

        @media (orientation: portrait) {
          :host {
            --row-height: min(7vh, 11.4vw);
            --up-shift: max(-4.1vh, -6.6vw);
          }

          .chart-wrapper {
            margin-left: calc(-1 * var(--row-height) / 2);
          }
        }

        .title-area {
          height: 100px;
        }

        .chart-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .main {
          display: grid;
          grid-template-rows: 1fr 9vh;
          justify-items: center;
          align-items: center;
        }

        .row {
          display: flex;
          align-items: flex-end;
          height: var(--row-height);
        }

        .row + .row {
          margin-top: var(--up-shift);
        }

        .row:nth-child(even) {
          margin-left: var(--row-height);
        }

        activity-indicator {
          width: var(--row-height);
        }
      `]}render(){const t="landscape"===this.orientation?this.renderLandscape():this.renderPortrait();return L`
      <div class="title-area">
        <slide-title title=${this.data.title} subtitle=${this.data.subtitle} orientation="${this.orientation}">
        </slide-title>
      </div>
      <div class="main">
        <div class="chart-wrapper">
          ${t}
        </div>
        <activity-legend theme=${this.theme} orientation=${this.orientation}></activity-legend>
      </div>
    `}renderLandscape(){const t=Qe.map((t=>this.data.data[t])).map(Xe),e=lt()("row","row_landscape");return t.map((t=>L`
        <div class=${e}>
          ${t.map((t=>L`
              <activity-indicator theme=${this.theme} activity=${t}>
              </activity-indicator>
            `))}
        </div>
      `))}renderPortrait(){const t=tr(Qe.map((t=>this.data.data[t]))),e=lt()("row","row_portrait");return t.map((t=>L`
        <div class=${e}>
          ${t.map((t=>L`
              <activity-indicator theme=${this.theme} activity=${t}>
              </activity-indicator>
            `))}
        </div>
      `))}};Ye([Y({type:Object})],Ke.prototype,"data",void 0),Ke=Ye([J("slide-activity")],Ke);const Xe=t=>{const e=[];let r=0;for(let i=0;i<t.length;i++)i%2==0?r=t[i]:(r+=t[i],e.push(r));return e},tr=t=>t.reduce(((t,e)=>e.map(((r,i)=>[...t[i]||[],e[i]]))),[]),er=Math.PI,rr=2*er,ir=1e-6,nr=rr-ir;function or(){this._x0=this._y0=this._x1=this._y1=null,this._=""}function sr(){return new or}or.prototype=sr.prototype={constructor:or,moveTo:function(t,e){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+e)},closePath:function(){null!==this._x1&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")},lineTo:function(t,e){this._+="L"+(this._x1=+t)+","+(this._y1=+e)},quadraticCurveTo:function(t,e,r,i){this._+="Q"+ +t+","+ +e+","+(this._x1=+r)+","+(this._y1=+i)},bezierCurveTo:function(t,e,r,i,n,o){this._+="C"+ +t+","+ +e+","+ +r+","+ +i+","+(this._x1=+n)+","+(this._y1=+o)},arcTo:function(t,e,r,i,n){t=+t,e=+e,r=+r,i=+i,n=+n;var o=this._x1,s=this._y1,a=r-t,l=i-e,c=o-t,d=s-e,h=c*c+d*d;if(n<0)throw new Error("negative radius: "+n);if(null===this._x1)this._+="M"+(this._x1=t)+","+(this._y1=e);else if(h>ir)if(Math.abs(d*a-l*c)>ir&&n){var p=r-o,u=i-s,f=a*a+l*l,g=p*p+u*u,v=Math.sqrt(f),m=Math.sqrt(h),y=n*Math.tan((er-Math.acos((f+h-g)/(2*v*m)))/2),b=y/m,x=y/v;Math.abs(b-1)>ir&&(this._+="L"+(t+b*c)+","+(e+b*d)),this._+="A"+n+","+n+",0,0,"+ +(d*p>c*u)+","+(this._x1=t+x*a)+","+(this._y1=e+x*l)}else this._+="L"+(this._x1=t)+","+(this._y1=e)},arc:function(t,e,r,i,n,o){t=+t,e=+e,o=!!o;var s=(r=+r)*Math.cos(i),a=r*Math.sin(i),l=t+s,c=e+a,d=1^o,h=o?i-n:n-i;if(r<0)throw new Error("negative radius: "+r);null===this._x1?this._+="M"+l+","+c:(Math.abs(this._x1-l)>ir||Math.abs(this._y1-c)>ir)&&(this._+="L"+l+","+c),r&&(h<0&&(h=h%rr+rr),h>nr?this._+="A"+r+","+r+",0,1,"+d+","+(t-s)+","+(e-a)+"A"+r+","+r+",0,1,"+d+","+(this._x1=l)+","+(this._y1=c):h>ir&&(this._+="A"+r+","+r+",0,"+ +(h>=er)+","+d+","+(this._x1=t+r*Math.cos(n))+","+(this._y1=e+r*Math.sin(n))))},rect:function(t,e,r,i){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+e)+"h"+ +r+"v"+ +i+"h"+-r+"Z"},toString:function(){return this._}};const ar=sr;function lr(t){return function(){return t}}var cr=Math.abs,dr=Math.atan2,hr=Math.cos,pr=Math.max,ur=Math.min,fr=Math.sin,gr=Math.sqrt,vr=1e-12,mr=Math.PI,yr=mr/2,br=2*mr;function xr(t){return t>1?0:t<-1?mr:Math.acos(t)}function wr(t){return t>=1?yr:t<=-1?-yr:Math.asin(t)}function _r(t){return t.innerRadius}function Sr(t){return t.outerRadius}function $r(t){return t.startAngle}function Pr(t){return t.endAngle}function Cr(t){return t&&t.padAngle}function Or(t,e,r,i,n,o,s,a){var l=r-t,c=i-e,d=s-n,h=a-o,p=h*l-d*c;if(!(p*p<vr))return[t+(p=(d*(e-o)-h*(t-n))/p)*l,e+p*c]}function jr(t,e,r,i,n,o,s){var a=t-r,l=e-i,c=(s?o:-o)/gr(a*a+l*l),d=c*l,h=-c*a,p=t+d,u=e+h,f=r+d,g=i+h,v=(p+f)/2,m=(u+g)/2,y=f-p,b=g-u,x=y*y+b*b,w=n-o,_=p*g-f*u,S=(b<0?-1:1)*gr(pr(0,w*w*x-_*_)),$=(_*b-y*S)/x,P=(-_*y-b*S)/x,C=(_*b+y*S)/x,O=(-_*y+b*S)/x,j=$-v,R=P-m,M=C-v,k=O-m;return j*j+R*R>M*M+k*k&&($=C,P=O),{cx:$,cy:P,x01:-d,y01:-h,x11:$*(n/w-1),y11:P*(n/w-1)}}var Rr=function(t,e,r,i){var n,o=arguments.length,s=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(o<3?n(s):o>3?n(e,r,s):n(e,r))||s);return o>3&&s&&Object.defineProperty(e,r,s),s};let Mr=class extends it{constructor(){super(...arguments),this.colors={dark:{grad1:["rgba(255, 163, 0, 0.8)","rgba(91, 58, 0, 0.8)"],grad2:["rgba(99, 63, 0, 0.5)","rgba(15, 9, 0, 0.5)"],grad3:["rgba(155, 155, 155, 0.5)","rgba(56, 41, 0, 0.5)"],grad4:["rgba(77, 77, 77, 0.5)","rgba(56, 41, 0, 0.5)"]},light:{grad1:["rgba(255, 184, 0, 0.7)","rgba(255, 239, 153, 0.5)"],grad2:["rgba(255, 184, 0, 0.5)","rgba(255, 239, 153, 0.25)"],grad3:["rgba(166, 166, 166, 0.4)","rgba(203, 203, 203, 0.1)"],grad4:["rgba(191, 191, 191, 0.6)","rgba(228, 228, 228, 0.3)"]}},this.dimensions=null,this.observeSize=()=>{new ResizeObserver((t=>{for(let e of t){const{width:t}=e.contentRect,r=t;this.dimensions={width:t,height:r}}})).observe(this)}}static get styles(){return et`
      :host {
        position: relative;
      }

      .chart-text {
        position: absolute;
        z-index: 1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
      }

      .text-primary {
        line-height: 1.1;
        color: var(--body-color);
      }

      .text-secondary {
        font-size: 20px;
        line-height: 1.1;
        color: var(--body-grey-color);
        margin-top: 0.4em;
      }

      :host([orientation=portrait]) .text-primary {
        font-size: clamp(1.5rem, 8vw, 4.5vh);
      }

      :host([orientation=landscape]) .text-primary {
        font-size: clamp(1rem, 5.3vh, 5.3vh);
      }

      :host([orientation=portrait]) .text-secondary {
        font-size: clamp(0.6rem, 5.3vw, 3vh);
      }

      :host([orientation=landscape]) .text-secondary {
        font-size: clamp(0.4rem, 4.2vh, 2.4vw);
      }
    `}get outerRadius(){return this.dimensions?.width?this.dimensions?.width/2:null}get innerRadius(){return this.outerRadius?.7*this.outerRadius:null}firstUpdated(){this.observeSize()}getAngles(){const t=this.data.reduce(((t,e)=>t+e)),e=2*Math.PI;return this.data.map((r=>r/t*e)).reduce(((t,e,r)=>{const i=0===r?0-e/2:t[t.length-1].endAngle,n=i+e;return t.concat({startAngle:i,endAngle:n})}),[])}getSectors(){return this.getAngles().map((t=>this.getArc(t)))}getArc(t){if(!this.innerRadius||!this.outerRadius)return null;const{startAngle:e,endAngle:r}=t,i=function(){var t=_r,e=Sr,r=lr(0),i=null,n=$r,o=Pr,s=Cr,a=null;function l(){var l,c,d=+t.apply(this,arguments),h=+e.apply(this,arguments),p=n.apply(this,arguments)-yr,u=o.apply(this,arguments)-yr,f=cr(u-p),g=u>p;if(a||(a=l=ar()),h<d&&(c=h,h=d,d=c),h>vr)if(f>br-vr)a.moveTo(h*hr(p),h*fr(p)),a.arc(0,0,h,p,u,!g),d>vr&&(a.moveTo(d*hr(u),d*fr(u)),a.arc(0,0,d,u,p,g));else{var v,m,y=p,b=u,x=p,w=u,_=f,S=f,$=s.apply(this,arguments)/2,P=$>vr&&(i?+i.apply(this,arguments):gr(d*d+h*h)),C=ur(cr(h-d)/2,+r.apply(this,arguments)),O=C,j=C;if(P>vr){var R=wr(P/d*fr($)),M=wr(P/h*fr($));(_-=2*R)>vr?(x+=R*=g?1:-1,w-=R):(_=0,x=w=(p+u)/2),(S-=2*M)>vr?(y+=M*=g?1:-1,b-=M):(S=0,y=b=(p+u)/2)}var k=h*hr(y),A=h*fr(y),T=d*hr(w),z=d*fr(w);if(C>vr){var E,N=h*hr(b),F=h*fr(b),L=d*hr(x),D=d*fr(x);if(f<mr&&(E=Or(k,A,L,D,N,F,T,z))){var U=k-E[0],I=A-E[1],V=N-E[0],B=F-E[1],q=1/fr(xr((U*V+I*B)/(gr(U*U+I*I)*gr(V*V+B*B)))/2),H=gr(E[0]*E[0]+E[1]*E[1]);O=ur(C,(d-H)/(q-1)),j=ur(C,(h-H)/(q+1))}}S>vr?j>vr?(v=jr(L,D,k,A,h,j,g),m=jr(N,F,T,z,h,j,g),a.moveTo(v.cx+v.x01,v.cy+v.y01),j<C?a.arc(v.cx,v.cy,j,dr(v.y01,v.x01),dr(m.y01,m.x01),!g):(a.arc(v.cx,v.cy,j,dr(v.y01,v.x01),dr(v.y11,v.x11),!g),a.arc(0,0,h,dr(v.cy+v.y11,v.cx+v.x11),dr(m.cy+m.y11,m.cx+m.x11),!g),a.arc(m.cx,m.cy,j,dr(m.y11,m.x11),dr(m.y01,m.x01),!g))):(a.moveTo(k,A),a.arc(0,0,h,y,b,!g)):a.moveTo(k,A),d>vr&&_>vr?O>vr?(v=jr(T,z,N,F,d,-O,g),m=jr(k,A,L,D,d,-O,g),a.lineTo(v.cx+v.x01,v.cy+v.y01),O<C?a.arc(v.cx,v.cy,O,dr(v.y01,v.x01),dr(m.y01,m.x01),!g):(a.arc(v.cx,v.cy,O,dr(v.y01,v.x01),dr(v.y11,v.x11),!g),a.arc(0,0,d,dr(v.cy+v.y11,v.cx+v.x11),dr(m.cy+m.y11,m.cx+m.x11),g),a.arc(m.cx,m.cy,O,dr(m.y11,m.x11),dr(m.y01,m.x01),!g))):a.arc(0,0,d,w,x,g):a.lineTo(T,z)}else a.moveTo(0,0);if(a.closePath(),l)return a=null,l+""||null}return l.centroid=function(){var r=(+t.apply(this,arguments)+ +e.apply(this,arguments))/2,i=(+n.apply(this,arguments)+ +o.apply(this,arguments))/2-mr/2;return[hr(i)*r,fr(i)*r]},l.innerRadius=function(e){return arguments.length?(t="function"==typeof e?e:lr(+e),l):t},l.outerRadius=function(t){return arguments.length?(e="function"==typeof t?t:lr(+t),l):e},l.cornerRadius=function(t){return arguments.length?(r="function"==typeof t?t:lr(+t),l):r},l.padRadius=function(t){return arguments.length?(i=null==t?null:"function"==typeof t?t:lr(+t),l):i},l.startAngle=function(t){return arguments.length?(n="function"==typeof t?t:lr(+t),l):n},l.endAngle=function(t){return arguments.length?(o="function"==typeof t?t:lr(+t),l):o},l.padAngle=function(t){return arguments.length?(s="function"==typeof t?t:lr(+t),l):s},l.context=function(t){return arguments.length?(a=null==t?null:t,l):a},l}();return i.padAngle(.004*Math.PI),i.cornerRadius(5),i({innerRadius:this.innerRadius,outerRadius:this.outerRadius,startAngle:e,endAngle:r})}render(){if(!this.dimensions||!this.innerRadius||!this.outerRadius)return null;const[t,e,r,i]=this.getSectors(),n=this.colors[this.theme];return L`
      <svg width=${this.dimensions.width} height=${this.dimensions.height} viewbox="0 0 ${this.dimensions.width} ${this.dimensions.height}">
        <defs>
          <radialGradient gradientUnits="userSpaceOnUse" cx="0" cy="0" fr="33%" r="55%" id="grad1">
            <stop offset="0%" stop-color="${n.grad1[0]}"></stop>
            <stop offset="65%" stop-color="${n.grad1[1]}"></stop>
            <stop offset="70%" stop-color="${n.grad1[1]}"></stop>
            <stop offset="100%" stop-color="${n.grad1[0]}"></stop>
          </radialGradient>
          <radialGradient gradientUnits="userSpaceOnUse" cx="0" cy="0" fr="33%" r="55%" id="grad2">
            <stop offset="0%" stop-color="${n.grad2[0]}"></stop>
            <stop offset="65%" stop-color="${n.grad2[1]}"></stop>
            <stop offset="70%" stop-color="${n.grad2[1]}"></stop>
            <stop offset="100%" stop-color="${n.grad2[0]}"></stop>
          </radialGradient>
          <radialGradient gradientUnits="userSpaceOnUse" cx="0" cy="0" fr="33%" r="55%" id="grad3">
            <stop offset="0%" stop-color="${n.grad3[0]}"></stop>
            <stop offset="65%" stop-color="${n.grad3[1]}"></stop>
            <stop offset="70%" stop-color="${n.grad3[1]}"></stop>
            <stop offset="100%" stop-color="${n.grad3[0]}"></stop>
          </radialGradient>
          <radialGradient gradientUnits="userSpaceOnUse" cx="0" cy="0" fr="33%" r="55%" id="grad4">
            <stop offset="0%" stop-color="${n.grad4[0]}"></stop>
            <stop offset="65%" stop-color="${n.grad4[1]}"></stop>
            <stop offset="70%" stop-color="${n.grad4[1]}"></stop>
            <stop offset="100%" stop-color="${n.grad4[0]}"></stop>
          </radialGradient>
        </defs>
        <g transform="translate(${this.outerRadius}, ${this.outerRadius})">
          <path d=${t} fill="url(#grad1)"></path>
          <path d=${e} fill="url(#grad2)"></path>
          <path d=${r} fill="url(#grad3)"></path>
          <path d=${i} fill="url(#grad4)"></path>
        </g>
      </svg>

      <div class="chart-text" style="max-width: ${2*this.innerRadius*.8}px">
        <div class="text-primary">
          ${this.primaryText}
        </div>
        <div class="text-secondary">
          ${this.secondaryText}
        </div>
      </div>
    `}};Rr([Y({type:String})],Mr.prototype,"primaryText",void 0),Rr([Y({type:String})],Mr.prototype,"secondaryText",void 0),Rr([Y({type:String})],Mr.prototype,"theme",void 0),Rr([Y({type:Array})],Mr.prototype,"data",void 0),Rr([Y({type:Object})],Mr.prototype,"dimensions",void 0),Mr=Rr([J("donut-chart")],Mr);var kr=function(t,e,r,i){var n,o=arguments.length,s=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(o<3?n(s):o>3?n(e,r,s):n(e,r))||s);return o>3&&s&&Object.defineProperty(e,r,s),s};let Ar=class extends it{static get styles(){return et`    
      .legend-item {
        display: flex;
        align-items: center;
      }

      :host([orientation=portrait]) .legend-item {
        height: 7.5vh;
      }
      :host([orientation=landscape]) .legend-item {
        height: 13.3vh;
      }

      :host([theme=light]) .legend-item:not(:first-child) {
        border-top: 2px solid rgba(191, 191, 191, 0.3);
      }

      :host([theme=dark]) .legend-item:not(:first-child) {
        border-top: 2px solid rgba(145, 143, 138, 0.3);
      }

      .color-dot {
        width: 16px;
        height: 16px;
        background: pink;
        border-radius: 50%;
        margin-right: 0.6rem;
      }

      :host([theme=dark]) .color-dot_0 {
        background: radial-gradient(100% 100% at 50% 0%, rgba(255, 184, 0, 0.8) 0%, rgba(91, 66, 0, 0.8) 100%);
        box-shadow: 0px 0px 20px -8px rgba(247, 178, 1, 0.2), inset -1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px 0px 12px rgba(255, 184, 0, 0.9);
      }
      :host([theme=light]) .color-dot_0 {
        background: radial-gradient(49.84% 49.84% at 49.84% 50.16%, rgba(255, 184, 0, 0.56) 81.25%, rgba(255, 239, 153, 0.32) 100%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px 0px 20px rgba(255, 176, 57, 0.9);
      }
      :host([theme=dark]) .color-dot_1 {
        background: radial-gradient(49.84% 49.84% at 49.84% 50.16%, rgba(99, 63, 0, 0.5) 72.92%, rgba(15, 9, 0, 0.5) 100%);
        box-shadow: 0px 0px 20px -8px rgba(147, 93, 0, 0.2), inset -1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px 0px 20px rgba(202, 129, 0, 0.9);
      }
      :host([theme=light]) .color-dot_1 {
        background: radial-gradient(49.84% 49.84% at 49.84% 50.16%, rgba(255, 184, 0, 0.24) 81.25%, rgba(255, 239, 153, 0.12) 100%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px 0px 20px rgba(255, 176, 57, 0.4);
      }
      :host([theme=dark]) .color-dot_2 {
        background: radial-gradient(100% 100% at 50% 0%, rgba(151, 151, 151, 0.5) 0%, rgba(41, 41, 41, 0.5) 100%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.5);
      }
      :host([theme=light]) .color-dot_2 {
        background: radial-gradient(49.84% 49.84% at 49.84% 50.16%, rgba(166, 166, 166, 0.1725) 82.81%, rgba(203, 203, 203, 0.05) 92.19%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px 0px 20px rgba(105, 105, 105, 0.2);
      }
      :host([theme=dark]) .color-dot_3 {
        background: radial-gradient(100% 100% at 50% 0%, rgba(62, 62, 62, 0.5) 0%, rgba(40, 40, 40, 0.5) 100%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.5);
      }
      :host([theme=light]) .color-dot_3 {
        background: radial-gradient(49.84% 49.84% at 49.84% 50.16%, rgba(191, 191, 191, 0.345) 82.81%, rgba(228, 228, 228, 0.1) 92.19%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px 0px 20px rgba(131, 131, 131, 0.6);
      }

      .label {
        color: var(--body-color);
        flex-grow: 1;
        font-size: 4.25vh;
      }

      :host([orientation=portrait]) .label, :host([orientation=portrait]) .diff, :host([orientation=portrait]) .value {
        font-size: 2.4vh;
      }
      :host([orientation=landscape]) .label, :host([orientation=landscape]) .diff, :host([orientation=landscape]) .value {
        font-size: 4.25vh;
      }

      .diff {
        margin-right: 1rem;
      }

      .diff, .value {
        color: var(--body-grey-color);
      }
    `}render(){return this.data.map(((t,e)=>L`
      <div class="legend-item">
        <div class="color-dot color-dot_${e}"></div>
        <div class="label">${t.label}</div>
        <div class="diff">${t.diff}</div>
        <div class="value">${t.value}</div>
      </div>
    `))}};kr([Y({type:Array})],Ar.prototype,"data",void 0),Ar=kr([J("donut-chart-legend")],Ar);var Tr=function(t,e,r,i){var n,o=arguments.length,s=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(o<3?n(s):o>3?n(e,r,s):n(e,r))||s);return o>3&&s&&Object.defineProperty(e,r,s),s};let zr=class extends _e{static get styles(){return et`
      :host {
        height: 100%;
      }

      .slide {
        height: 100%;
        display: grid;
        grid-template-rows: [title] auto [main] 1fr;
        padding: 0 24px;
      }

      .main_portrait {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .main_landscape {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 6vw;
        height: 100%;
        align-items: center;
        // flex-direction: column;
        // justify-content: center;
        // align-items: center;
      }

      .slide_portrait donut-chart {
        width: calc(100vw - 2 * 24px);
        max-width: 50vh;
      }

      .slide_landscape donut-chart {
        justify-self: end;
        width: 64vh;
        max-width: 42vw;
      }

      donut-chart-legend {
        width: 100%;
      }
    `}prepareChartData(){const t=/(\d+)/;return this.data.categories.map((({valueText:e})=>{const r=t.exec(e);return parseInt(r[1],10)}))}prepareChartLegendData(){return this.data.categories.map((t=>{const e=t.valueText.split(" ").shift(),r=t.differenceText.split(" ").shift();return{label:t.title,value:e,diff:r}}))}render(){return L`
      <div class="slide slide_${this.orientation}">
        <slide-title
          title=${this.data.title}
          subtitle=${this.data.subtitle}
          orientation="${this.orientation}"
        ></slide-title>
        <main class="main_${this.orientation}">
          <donut-chart
            .primaryText=${this.data.totalText}
            .secondaryText=${this.data.differenceText}
            .data=${this.prepareChartData()}
            theme=${this.theme}
            orientation=${this.orientation}
          ></donut-chart>
          <donut-chart-legend
            .data=${this.prepareChartLegendData()}
            theme=${this.theme}
            orientation=${this.orientation}
          ></donut-chart-legend>
        </main>
      </div>
    `}};Tr([Y({type:Object})],zr.prototype,"data",void 0),zr=Tr([J("slide-diagram")],zr);var Er=function(t,e,r,i){var n,o=arguments.length,s=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(o<3?n(s):o>3?n(e,r,s):n(e,r))||s);return o>3&&s&&Object.defineProperty(e,r,s),s};let Nr=class extends it{constructor(){super(...arguments),this.plotSize=null,this.observeSize=()=>{new ResizeObserver((t=>{for(let e of t){const{width:t,height:r}=e.contentRect;this.plotSize={width:t,height:r}}})).observe(this.shadowRoot?.querySelector(".plotting-area"))}}static get styles(){return et`
      :host {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
      }

      .plotting-area {
        flex-grow: 0;
        height: calc(100% - 3rem);
        position: relative;
      }

      .bar-value {
        position: absolute;
        top: -0.5rem;
        left: 50%;
        color: var(--body-color);
        transform: translate(-50%, -100%);
      }

      .bar-label {
        position: absolute;
        bottom: -0.5rem;
        left: 50%;
        color: var(--body-grey-color);
        transform: translate(-50%, 100%);
      }
    `}firstUpdated(){this.observeSize()}render(){this.renderLandscape();const t=lt()("plotting-area",`plotting-area_${this.theme}`,`plotting-area_${this.orientation}`);return L`
      <div class=${t}>
        ${"portrait"===this.orientation?this.renderPortrait():this.renderLandscape()}
      </div>
    `}renderPortrait(){if(!this.plotSize)return null;const{width:t,height:e}=this.plotSize,r=this.data.findIndex((({active:t})=>t)),i=this.data.slice(r-3,r+3),n=Math.round(.7*e),o=Math.round(.02*e),s=t/9.6,a=.6*s,l=i.reduce(((t,{value:e})=>Math.max(t,e)),0),c=i.map((({value:t})=>{const e=t/l;return Math.round(e*(n-o))})),d=i.findIndex((t=>t.active));return c.map(((t,e)=>{const r=e===d,n=r?"radial-gradient(81.14% 100% at 50% 0%, #FFA300 0%, #2D1C00 100%)":"linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%), radial-gradient(149.08% 93.3% at 38.75% 72.1%, #000000 0%, #231900 0.01%, #4D4D4D 100%)",l=r?"inset -1px 1px 1px rgba(255, 255, 255, 0.4), inset 0px 6px 15px rgba(255, 162, 0, 0.5)":"inset -1px 1px 1px rgba(255, 255, 255, 0.2), inset 2px 2px 16px rgba(103, 103, 103, 0.6)",c=i[e];return L`
        <div style="
          position: absolute;
          left: ${e*s+e*a-Math.round(s/5)}px;
          bottom: 0;
          width: ${s}px;
          height: ${t+o}px;
          border-radius: 6px;
          background: ${n};
          box-shadow: ${l};
        ">
          ${e<=d?L`
              <div class="bar-value">
                ${c.value}
              </div>
            `:null}
          <div class="bar-label">
            ${c.title}
          </div>
        </div>
      `}))}renderLandscape(){if(!this.plotSize)return null;const t=this.getLandscapeBarsData(),{width:e,height:r}=this.plotSize,i=Math.round(.7*r),n=Math.round(.02*r),o=e/(1.6*t.length-.6),s=.6*o,a=t.reduce(((t,{value:e})=>Math.max(t,e)),0),l=t.map((({value:t})=>{const e=t/a;return Math.round(e*(i-n))})),c=t.findIndex((t=>t.active));return l.map(((e,r)=>{const i=r===c,a=i?"radial-gradient(81.14% 100% at 50% 0%, #FFA300 0%, #2D1C00 100%)":"linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%), radial-gradient(149.08% 93.3% at 38.75% 72.1%, #000000 0%, #231900 0.01%, #4D4D4D 100%)",l=i?"inset -1px 1px 1px rgba(255, 255, 255, 0.4), inset 0px 6px 15px rgba(255, 162, 0, 0.5)":"inset -1px 1px 1px rgba(255, 255, 255, 0.2), inset 2px 2px 16px rgba(103, 103, 103, 0.6)",d=t[r];return L`
        <div style="
          position: absolute;
          left: ${r*o+r*s}px;
          bottom: 0;
          width: ${o}px;
          height: ${e+n}px;
          border-radius: 6px;
          background: ${a};
          box-shadow: ${l};
        ">
          ${r<=c?L`
              <div class="bar-value">
                ${d.value}
              </div>
            `:null}
          <div class="bar-label">
            ${d.title}
          </div>
        </div>
      `}))}getLandscapeBarsNumber(){const t=this.plotSize?.width;return Math.min(Math.floor((t+24)/64),this.data.length)}getLandscapeBarsData(){const t=this.getLandscapeBarsNumber(),e=Math.floor(this.data.length/2)-Math.floor(t/2),r=e+t;return this.data.slice(e,r)}};Er([Y({type:Object})],Nr.prototype,"data",void 0),Er([Y({type:String})],Nr.prototype,"theme",void 0),Er([Y({type:String})],Nr.prototype,"orientation",void 0),Er([Y({type:Object})],Nr.prototype,"plotSize",void 0),Nr=Er([J("sprints-chart")],Nr);var Fr=function(t,e,r,i){var n,o=arguments.length,s=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(o<3?n(s):o>3?n(e,r,s):n(e,r))||s);return o>3&&s&&Object.defineProperty(e,r,s),s};let Lr=class extends it{static get styles(){return et`
      :host {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-areas:
                          "avatar name"
                          "avatar value";
        grid-column-gap: 1rem;
      }

      x-avatar {
        grid-area: avatar;
      }

      .person-name {
        grid-area: name;
        font-size: var(--font-size-medium);
        color: var(--body-color);
      }
      .person-value {
        grid-area: value;
        font-size: var(--font-size-small);
        color: var(--body-grey-color);
      }
    `}render(){return L`
      <x-avatar
        small
        name="${this.data.name}"
        file="${this.data.avatar}"
      ></x-avatar>
      <div class="person-name">
        ${this.data.name}
      </div>
      <div class="person-value">
        ${this.data.valueText}
      </div>
    `}};Fr([Y({type:String})],Lr.prototype,"theme",void 0),Fr([Y({type:Object})],Lr.prototype,"data",void 0),Lr=Fr([J("person-in-sprints-chart")],Lr);var Dr=function(t,e,r,i){var n,o=arguments.length,s=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(o<3?n(s):o>3?n(e,r,s):n(e,r))||s);return o>3&&s&&Object.defineProperty(e,r,s),s};let Ur=class extends it{constructor(){super(...arguments),this.height=null,this.observeSize=()=>{new ResizeObserver((t=>{for(let e of t){const{width:t,height:r}=e.contentRect;this.height=r}})).observe(this)}}static get styles(){return et`
      .people_portrait {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100%;
      }

      .people_landscape {
        display: flex;
      }

      .person-container_portrait {
        flex: 1 0 auto;
        display: flex;
        align-items: center;
      }

      .person-container_portrait + .person-container_portrait {
        border-top: 2px solid rgba(145, 143, 138, 0.3); // var(--body-grey-color);
      }

      .person-container_landscape {
        flex: 1 0 auto;
        display: flex;
        justify-content: center;
      }

      .person-container_landscape:first-child {
        border-right: 1px solid rgba(145, 143, 138, 0.3); // var(--body-grey-color);
      }
    `}firstUpdated(){this.observeSize()}render(){return"portrait"===this.orientation?this.renderPortrait():this.renderLandscape()}renderPortrait(){if(!this.height)return null;const t=this.getPeopleCount(),e=this.data.slice(0,t);return this.renderPeople(e,this.orientation)}renderLandscape(){const t=this.data.slice(0,2);return this.renderPeople(t,this.orientation)}renderPeople(t,e){return L`
      <div class="people people_${e}">
        ${t.map((t=>L`
            <div class="person-container_${e}">
              <person-in-sprints-chart
                class="person_${e}"
                .data=${t}
                theme=${this.theme}
              ></person-in-sprints-chart>
            </div>
          `))}
      </div>
    `}getPeopleCount(){return this.height>180?3:2}};Dr([Y({type:Array})],Ur.prototype,"data",void 0),Dr([Y({type:String})],Ur.prototype,"theme",void 0),Dr([Y({type:String})],Ur.prototype,"orientation",void 0),Dr([Y({type:Array})],Ur.prototype,"height",void 0),Ur=Dr([J("people-in-sprints-chart")],Ur);var Ir=function(t,e,r,i){var n,o=arguments.length,s=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(o<3?n(s):o>3?n(e,r,s):n(e,r))||s);return o>3&&s&&Object.defineProperty(e,r,s),s};let Vr=class extends _e{static get styles(){return et`
      .slide {
        height: 100%;
        display: grid;
        grid-template-rows: [title] auto [main] 1fr;
        grid-row-gap: 0.6rem;
      }

      .slide_landscape {
        padding: 0 8.6%;
        grid-row-gap: 0;
      }

      .title-area {
        padding: 0 24px;
      }

      .main {
        height: 100%;
      }

      .slide_landscape .main {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .main-inner-wrapper {
        display: flex;
        flex-direction: column;
        align-self: end;
      }

      .slide_portrait .main-inner-wrapper {
        height: 100%;
      }

      .slide_landscape .main-inner-wrapper {
        height: 80%;
        width: 100%;
        display: grid;
        grid-template-rows: 1fr auto;
      }

      .slide_portrait sprints-chart {
        flex: 0 0 auto;
        height: 63vh;
      }

      .slide_landscape sprints-chart {
        height: 100%;
      }

      people-in-sprints-chart {
        flex: 1 0 auto;
      }

      .slide_portrait people-in-sprints-chart {
        padding: 0 24px;
      }
    `}render(){const t=lt()("slide",`slide_${this.orientation}`);return L`
      <div class=${t}>
        <div class="title-area">
          <slide-title
            title=${this.data.title}
            subtitle=${this.data.subtitle}
            orientation="${this.orientation}"
          ></slide-title>
        </div>
        <div class="main">
          <div class="main-inner-wrapper">
            <sprints-chart
              theme=${this.theme}
              orientation=${this.orientation}
              .data=${this.data.values}
            ></sprints-chart>
            <people-in-sprints-chart
              .data=${this.data.users}
              theme=${this.theme}
              orientation=${this.orientation}
            ></people-in-sprints-chart>
          </div>
        </div>
      </div>
    `}};Ir([Y({type:Object})],Vr.prototype,"data",void 0),Vr=Ir([J("slide-chart")],Vr);const Br={leaders:"slide-leaders",vote:"slide-vote",chart:"slide-chart",diagram:"slide-diagram",activity:"slide-activity"};var qr;qr=(t,e)=>{const r=Br[t];return`<${r} data='${JSON.stringify(e)}'></${r}>`},Object.assign(window,{renderTemplate:qr})})()})();