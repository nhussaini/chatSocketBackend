(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (__dirname){(function (){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.readConfig=void 0;const fs=require("fs"),path=require("path");function readConfig(){try{const e=fs.readFileSync(path.join(__dirname,"config.json"),{encoding:"utf-8"});if(!e)throw new Error("Config is missing!");const r=JSON.parse(e);if(!r.skrAccessKey||!r.username)throw new Error("Config is missing required properties");return r}catch(e){if(e instanceof Error&&e.message.includes("ENOENT"))throw new Error("\nIt looks like your workspace is missing necessary files. Please contact support.\n");throw e}}exports.readConfig=readConfig;

}).call(this)}).call(this,require("path").join(__dirname,"."))
},{"fs":undefined,"path":undefined}],2:[function(require,module,exports){
"use strict";module.exports={parallel:require("./parallel.js"),serial:require("./serial.js"),serialOrdered:require("./serialOrdered.js")};

},{"./parallel.js":9,"./serial.js":10,"./serialOrdered.js":11}],3:[function(require,module,exports){
"use strict";function abort(o){Object.keys(o.jobs).forEach(clean.bind(o)),o.jobs={}}function clean(o){"function"==typeof this.jobs[o]&&this.jobs[o]()}module.exports=abort;

},{}],4:[function(require,module,exports){
"use strict";var defer=require("./defer.js");function async(e){var r=!1;return defer(function(){r=!0}),function(n,f){r?e(n,f):defer(function(){e(n,f)})}}module.exports=async;

},{"./defer.js":5}],5:[function(require,module,exports){
"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function defer(e){var t="function"==typeof setImmediate?setImmediate:"object"==("undefined"==typeof process?"undefined":_typeof(process))&&"function"==typeof process.nextTick?process.nextTick:null;t?t(e):setTimeout(e,0)}module.exports=defer;

},{}],6:[function(require,module,exports){
"use strict";var async=require("./async.js"),abort=require("./abort.js");function iterate(e,t,r,s){var n=r.keyedList?r.keyedList[r.index]:r.index;r.jobs[n]=runJob(t,n,e[n],function(e,t){n in r.jobs&&(delete r.jobs[n],e?abort(r):r.results[n]=t,s(e,r.results))})}function runJob(e,t,r,s){return 2==e.length?e(r,async(s)):e(r,t,async(s))}module.exports=iterate;

},{"./abort.js":3,"./async.js":4}],7:[function(require,module,exports){
"use strict";function state(e,t){var s=!Array.isArray(e),r={index:0,keyedList:s||t?Object.keys(e):null,jobs:{},results:s?{}:[],size:s?Object.keys(e).length:e.length};return t&&r.keyedList.sort(s?t:function(s,r){return t(e[s],e[r])}),r}module.exports=state;

},{}],8:[function(require,module,exports){
"use strict";var abort=require("./abort.js"),async=require("./async.js");function terminator(t){Object.keys(this.jobs).length&&(this.index=this.size,abort(this),async(t)(null,this.results))}module.exports=terminator;

},{"./abort.js":3,"./async.js":4}],9:[function(require,module,exports){
"use strict";var iterate=require("./lib/iterate.js"),initState=require("./lib/state.js"),terminator=require("./lib/terminator.js");function parallel(e,t,r){for(var i=initState(e);i.index<(i.keyedList||e).length;)iterate(e,t,i,function(e,t){e?r(e,t):0!==Object.keys(i.jobs).length||r(null,i.results)}),i.index++;return terminator.bind(i,r)}module.exports=parallel;

},{"./lib/iterate.js":6,"./lib/state.js":7,"./lib/terminator.js":8}],10:[function(require,module,exports){
"use strict";var serialOrdered=require("./serialOrdered.js");function serial(r,e,s){return serialOrdered(r,e,null,s)}module.exports=serial;

},{"./serialOrdered.js":11}],11:[function(require,module,exports){
"use strict";var iterate=require("./lib/iterate.js"),initState=require("./lib/state.js"),terminator=require("./lib/terminator.js");function serialOrdered(e,t,i,n){var r=initState(e,i);return iterate(e,t,r,function i(d,s){d?n(d,s):(r.index++,r.index<(r.keyedList||e).length?iterate(e,t,r,i):n(null,r.results))}),terminator.bind(r,n)}function ascending(e,t){return e<t?-1:e>t?1:0}function descending(e,t){return-1*ascending(e,t)}module.exports=serialOrdered,module.exports.ascending=ascending,module.exports.descending=descending;

},{"./lib/iterate.js":6,"./lib/state.js":7,"./lib/terminator.js":8}],12:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.all=exports.VERSION=exports.HttpStatusCode=exports.CanceledError=exports.CancelToken=exports.Cancel=exports.AxiosHeaders=exports.AxiosError=exports.Axios=void 0,Object.defineProperty(exports,"default",{enumerable:!0,get:function(){return _axios.default}}),exports.toFormData=exports.spread=exports.mergeConfig=exports.isCancel=exports.isAxiosError=exports.getAdapter=exports.formToJSON=void 0;var _axios=_interopRequireDefault(require("./lib/axios.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var Axios=exports.Axios=_axios.default.Axios,AxiosError=exports.AxiosError=_axios.default.AxiosError,CanceledError=exports.CanceledError=_axios.default.CanceledError,isCancel=exports.isCancel=_axios.default.isCancel,CancelToken=exports.CancelToken=_axios.default.CancelToken,VERSION=exports.VERSION=_axios.default.VERSION,all=exports.all=_axios.default.all,Cancel=exports.Cancel=_axios.default.Cancel,isAxiosError=exports.isAxiosError=_axios.default.isAxiosError,spread=exports.spread=_axios.default.spread,toFormData=exports.toFormData=_axios.default.toFormData,AxiosHeaders=exports.AxiosHeaders=_axios.default.AxiosHeaders,HttpStatusCode=exports.HttpStatusCode=_axios.default.HttpStatusCode,formToJSON=exports.formToJSON=_axios.default.formToJSON,getAdapter=exports.getAdapter=_axios.default.getAdapter,mergeConfig=exports.mergeConfig=_axios.default.mergeConfig;

},{"./lib/axios.js":16}],13:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _utils=_interopRequireDefault(require("../utils.js")),_http=_interopRequireDefault(require("./http.js")),_xhr=_interopRequireDefault(require("./xhr.js")),_AxiosError=_interopRequireDefault(require("../core/AxiosError.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _slicedToArray(e,r){return _arrayWithHoles(e)||_iterableToArrayLimit(e,r)||_unsupportedIterableToArray(e,r)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,r){if(e){if("string"==typeof e)return _arrayLikeToArray(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?_arrayLikeToArray(e,r):void 0}}function _arrayLikeToArray(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function _iterableToArrayLimit(e,r){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,a,o,i,u=[],l=!0,s=!1;try{if(o=(t=t.call(e)).next,0===r){if(Object(t)!==t)return;l=!1}else for(;!(l=(n=o.call(t)).done)&&(u.push(n.value),u.length!==r);l=!0);}catch(e){s=!0,a=e}finally{try{if(!l&&null!=t.return&&(i=t.return(),Object(i)!==i))return}finally{if(s)throw a}}return u}}function _arrayWithHoles(e){if(Array.isArray(e))return e}var knownAdapters={http:_http.default,xhr:_xhr.default};_utils.default.forEach(knownAdapters,function(e,r){if(e){try{Object.defineProperty(e,"name",{value:r})}catch(e){}Object.defineProperty(e,"adapterName",{value:r})}});var renderReason=function(e){return"- ".concat(e)},isResolvedHandle=function(e){return _utils.default.isFunction(e)||null===e||!1===e},_default=exports.default={getAdapter:function(e){for(var r,t,n=(e=_utils.default.isArray(e)?e:[e]).length,a={},o=0;o<n;o++){var i=void 0;if(t=r=e[o],!isResolvedHandle(r)&&void 0===(t=knownAdapters[(i=String(r)).toLowerCase()]))throw new _AxiosError.default("Unknown adapter '".concat(i,"'"));if(t)break;a[i||"#"+o]=t}if(!t){var u=Object.entries(a).map(function(e){var r=_slicedToArray(e,2),t=r[0],n=r[1];return"adapter ".concat(t," ")+(!1===n?"is not supported by the environment":"is not available in the build")}),l=n?u.length>1?"since :\n"+u.map(renderReason).join("\n"):" "+renderReason(u[0]):"as no adapter specified";throw new _AxiosError.default("There is no suitable adapter to dispatch the request "+l,"ERR_NOT_SUPPORT")}return t},adapters:knownAdapters};

},{"../core/AxiosError.js":21,"../utils.js":61,"./http.js":14,"./xhr.js":15}],14:[function(require,module,exports){
"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.__setProxy=void 0;var _utils=_interopRequireDefault(require("./../utils.js")),_settle=_interopRequireDefault(require("./../core/settle.js")),_buildFullPath=_interopRequireDefault(require("../core/buildFullPath.js")),_buildURL=_interopRequireDefault(require("./../helpers/buildURL.js")),_proxyFromEnv=require("proxy-from-env"),_http=_interopRequireDefault(require("http")),_https=_interopRequireDefault(require("https")),_util=_interopRequireDefault(require("util")),_followRedirects=_interopRequireDefault(require("follow-redirects")),_zlib=_interopRequireDefault(require("zlib")),_data=require("../env/data.js"),_transitional=_interopRequireDefault(require("../defaults/transitional.js")),_AxiosError=_interopRequireDefault(require("../core/AxiosError.js")),_CanceledError=_interopRequireDefault(require("../cancel/CanceledError.js")),_index=_interopRequireDefault(require("../platform/index.js")),_fromDataURI=_interopRequireDefault(require("../helpers/fromDataURI.js")),_stream=_interopRequireDefault(require("stream")),_AxiosHeaders=_interopRequireDefault(require("../core/AxiosHeaders.js")),_AxiosTransformStream=_interopRequireDefault(require("../helpers/AxiosTransformStream.js")),_events=_interopRequireDefault(require("events")),_formDataToStream=_interopRequireDefault(require("../helpers/formDataToStream.js")),_readBlob=_interopRequireDefault(require("../helpers/readBlob.js")),_ZlibHeaderTransformStream=_interopRequireDefault(require("../helpers/ZlibHeaderTransformStream.js")),_callbackify=_interopRequireDefault(require("../helpers/callbackify.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _regeneratorRuntime(){_regeneratorRuntime=function(){return t};var e,t={},r=Object.prototype,o=r.hasOwnProperty,n=Object.defineProperty||function(e,t,r){e[t]=r.value},a="function"==typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",s=a.asyncIterator||"@@asyncIterator",u=a.toStringTag||"@@toStringTag";function l(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{l({},"")}catch(e){l=function(e,t,r){return e[t]=r}}function f(e,t,r,o){var a=t&&t.prototype instanceof y?t:y,i=Object.create(a.prototype),s=new k(o||[]);return n(i,"_invoke",{value:L(e,r,s)}),i}function c(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}t.wrap=f;var d="suspendedStart",p="suspendedYield",h="executing",m="completed",_={};function y(){}function b(){}function g(){}var x={};l(x,i,function(){return this});var v=Object.getPrototypeOf,E=v&&v(v(O([])));E&&E!==r&&o.call(E,i)&&(x=E);var w=g.prototype=y.prototype=Object.create(x);function R(e){["next","throw","return"].forEach(function(t){l(e,t,function(e){return this._invoke(t,e)})})}function A(e,t){function r(n,a,i,s){var u=c(e[n],e,a);if("throw"!==u.type){var l=u.arg,f=l.value;return f&&"object"==_typeof(f)&&o.call(f,"__await")?t.resolve(f.__await).then(function(e){r("next",e,i,s)},function(e){r("throw",e,i,s)}):t.resolve(f).then(function(e){l.value=e,i(l)},function(e){return r("throw",e,i,s)})}s(u.arg)}var a;n(this,"_invoke",{value:function(e,o){function n(){return new t(function(t,n){r(e,o,t,n)})}return a=a?a.then(n,n):n()}})}function L(t,r,o){var n=d;return function(a,i){if(n===h)throw new Error("Generator is already running");if(n===m){if("throw"===a)throw i;return{value:e,done:!0}}for(o.method=a,o.arg=i;;){var s=o.delegate;if(s){var u=S(s,o);if(u){if(u===_)continue;return u}}if("next"===o.method)o.sent=o._sent=o.arg;else if("throw"===o.method){if(n===d)throw n=m,o.arg;o.dispatchException(o.arg)}else"return"===o.method&&o.abrupt("return",o.arg);n=h;var l=c(t,r,o);if("normal"===l.type){if(n=o.done?m:p,l.arg===_)continue;return{value:l.arg,done:o.done}}"throw"===l.type&&(n=m,o.method="throw",o.arg=l.arg)}}}function S(t,r){var o=r.method,n=t.iterator[o];if(n===e)return r.delegate=null,"throw"===o&&t.iterator.return&&(r.method="return",r.arg=e,S(t,r),"throw"===r.method)||"return"!==o&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+o+"' method")),_;var a=c(n,t.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,_;var i=a.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,_):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,_)}function q(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function T(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function k(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(q,this),this.reset(!0)}function O(t){if(t||""===t){var r=t[i];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,a=function r(){for(;++n<t.length;)if(o.call(t,n))return r.value=t[n],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}throw new TypeError(_typeof(t)+" is not iterable")}return b.prototype=g,n(w,"constructor",{value:g,configurable:!0}),n(g,"constructor",{value:b,configurable:!0}),b.displayName=l(g,u,"GeneratorFunction"),t.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===b||"GeneratorFunction"===(t.displayName||t.name))},t.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,g):(e.__proto__=g,l(e,u,"GeneratorFunction")),e.prototype=Object.create(w),e},t.awrap=function(e){return{__await:e}},R(A.prototype),l(A.prototype,s,function(){return this}),t.AsyncIterator=A,t.async=function(e,r,o,n,a){void 0===a&&(a=Promise);var i=new A(f(e,r,o,n),a);return t.isGeneratorFunction(r)?i:i.next().then(function(e){return e.done?e.value:i.next()})},R(w),l(w,u,"Generator"),l(w,i,function(){return this}),l(w,"toString",function(){return"[object Generator]"}),t.keys=function(e){var t=Object(e),r=[];for(var o in t)r.push(o);return r.reverse(),function e(){for(;r.length;){var o=r.pop();if(o in t)return e.value=o,e.done=!1,e}return e.done=!0,e}},t.values=O,k.prototype={constructor:k,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(T),!t)for(var r in this)"t"===r.charAt(0)&&o.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function n(o,n){return s.type="throw",s.arg=t,r.next=o,n&&(r.method="next",r.arg=e),!!n}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],s=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var u=o.call(i,"catchLoc"),l=o.call(i,"finallyLoc");if(u&&l){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var a=n;break}}a&&("break"===e||"continue"===e)&&a.tryLoc<=t&&t<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=e,i.arg=t,a?(this.method="next",this.next=a.finallyLoc,_):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),_},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),T(r),_}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var o=r.completion;if("throw"===o.type){var n=o.arg;T(r)}return n}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,o){return this.delegate={iterator:O(t),resultName:r,nextLoc:o},"next"===this.method&&(this.arg=e),_}},t}function asyncGeneratorStep(e,t,r,o,n,a,i){try{var s=e[a](i),u=s.value}catch(e){return void r(e)}s.done?t(u):Promise.resolve(u).then(o,n)}function _asyncToGenerator(e){return function(){var t=this,r=arguments;return new Promise(function(o,n){var a=e.apply(t,r);function i(e){asyncGeneratorStep(a,o,n,i,s,"next",e)}function s(e){asyncGeneratorStep(a,o,n,i,s,"throw",e)}i(void 0)})}}var zlibOptions={flush:_zlib.default.constants.Z_SYNC_FLUSH,finishFlush:_zlib.default.constants.Z_SYNC_FLUSH},brotliOptions={flush:_zlib.default.constants.BROTLI_OPERATION_FLUSH,finishFlush:_zlib.default.constants.BROTLI_OPERATION_FLUSH},isBrotliSupported=_utils.default.isFunction(_zlib.default.createBrotliDecompress),httpFollow=_followRedirects.default.http,httpsFollow=_followRedirects.default.https,isHttps=/https:?/,supportedProtocols=_index.default.protocols.map(function(e){return e+":"});function dispatchBeforeRedirect(e){e.beforeRedirects.proxy&&e.beforeRedirects.proxy(e),e.beforeRedirects.config&&e.beforeRedirects.config(e)}function setProxy(e,t,r){var o=t;if(!o&&!1!==o){var n=(0,_proxyFromEnv.getProxyForUrl)(r);n&&(o=new URL(n))}if(o){if(o.username&&(o.auth=(o.username||"")+":"+(o.password||"")),o.auth){(o.auth.username||o.auth.password)&&(o.auth=(o.auth.username||"")+":"+(o.auth.password||""));var a=Buffer.from(o.auth,"utf8").toString("base64");e.headers["Proxy-Authorization"]="Basic "+a}e.headers.host=e.hostname+(e.port?":"+e.port:"");var i=o.hostname||o.host;e.hostname=i,e.host=i,e.port=o.port,e.path=r,o.protocol&&(e.protocol=o.protocol.includes(":")?o.protocol:"".concat(o.protocol,":"))}e.beforeRedirects.proxy=function(e){setProxy(e,t,e.href)}}var isHttpAdapterSupported="undefined"!=typeof process&&"process"===_utils.default.kindOf(process),wrapAsync=function(e){return new Promise(function(t,r){var o,n,a=function(e,t){n||(n=!0,o&&o(e,t))},i=function(e){a(e,!0),r(e)};e(function(e){a(e),t(e)},i,function(e){return o=e}).catch(i)})},resolveFamily=function(e){var t=e.address,r=e.family;if(!_utils.default.isString(t))throw TypeError("address must be a string");return{address:t,family:r||(t.indexOf(".")<0?6:4)}},buildAddressEntry=function(e,t){return resolveFamily(_utils.default.isObject(e)?e:{address:e,family:t})},_default=exports.default=isHttpAdapterSupported&&function(e){return wrapAsync(function(){var t=_asyncToGenerator(_regeneratorRuntime().mark(function t(r,o,n){var a,i,s,u,l,f,c,d,p,h,m,_,y,b,g,x,v,E,w,R,A,L,S,q,T,k,O,D,B,P,j,F,N,U,z,C,H,I,G;return _regeneratorRuntime().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(y=function(t){m.emit("abort",!t||t.type?new _CanceledError.default(null,e,p):t)},a=e.data,i=e.lookup,s=e.family,u=e.responseType,l=e.responseEncoding,f=e.method.toUpperCase(),d=!1,i&&(h=(0,_callbackify.default)(i,function(e){return _utils.default.isArray(e)?e:[e]}),i=function(e,t,r){h(e,t,function(e,o,n){var a=_utils.default.isArray(o)?o.map(function(e){return buildAddressEntry(e)}):[buildAddressEntry(o,n)];t.all?r(e,a):r(e,a[0].address,a[0].family)})}),m=new _events.default,_=function(){e.cancelToken&&e.cancelToken.unsubscribe(y),e.signal&&e.signal.removeEventListener("abort",y),m.removeAllListeners()},n(function(e,t){c=!0,t&&(d=!0,_())}),m.once("abort",o),(e.cancelToken||e.signal)&&(e.cancelToken&&e.cancelToken.subscribe(y),e.signal&&(e.signal.aborted?y():e.signal.addEventListener("abort",y))),b=(0,_buildFullPath.default)(e.baseURL,e.url),g=new URL(b,"http://localhost"),"data:"!==(x=g.protocol||supportedProtocols[0])){t.next=26;break}if("GET"===f){t.next=17;break}return t.abrupt("return",(0,_settle.default)(r,o,{status:405,statusText:"method not allowed",headers:{},config:e}));case 17:t.prev=17,v=(0,_fromDataURI.default)(e.url,"blob"===u,{Blob:e.env&&e.env.Blob}),t.next=24;break;case 21:throw t.prev=21,t.t0=t.catch(17),_AxiosError.default.from(t.t0,_AxiosError.default.ERR_BAD_REQUEST,e);case 24:return"text"===u?(v=v.toString(l),l&&"utf8"!==l||(v=_utils.default.stripBOM(v))):"stream"===u&&(v=_stream.default.Readable.from(v)),t.abrupt("return",(0,_settle.default)(r,o,{data:v,status:200,statusText:"OK",headers:new _AxiosHeaders.default,config:e}));case 26:if(-1!==supportedProtocols.indexOf(x)){t.next=28;break}return t.abrupt("return",o(new _AxiosError.default("Unsupported protocol "+x,_AxiosError.default.ERR_BAD_REQUEST,e)));case 28:if((E=_AxiosHeaders.default.from(e.headers).normalize()).set("User-Agent","axios/"+_data.VERSION,!1),w=e.onDownloadProgress,R=e.onUploadProgress,A=e.maxRate,L=void 0,S=void 0,!_utils.default.isSpecCompliantForm(a)){t.next=40;break}q=E.getContentType(/boundary=([-_\w\d]{10,70})/i),a=(0,_formDataToStream.default)(a,function(e){E.set(e)},{tag:"axios-".concat(_data.VERSION,"-boundary"),boundary:q&&q[1]||void 0}),t.next=76;break;case 40:if(!_utils.default.isFormData(a)||!_utils.default.isFunction(a.getHeaders)){t.next=54;break}if(E.set(a.getHeaders()),E.hasContentLength()){t.next=52;break}return t.prev=43,t.next=46,_util.default.promisify(a.getLength).call(a);case 46:T=t.sent,Number.isFinite(T)&&T>=0&&E.setContentLength(T),t.next=52;break;case 50:t.prev=50,t.t1=t.catch(43);case 52:t.next=76;break;case 54:if(!_utils.default.isBlob(a)){t.next=60;break}a.size&&E.setContentType(a.type||"application/octet-stream"),E.setContentLength(a.size||0),a=_stream.default.Readable.from((0,_readBlob.default)(a)),t.next=76;break;case 60:if(!a||_utils.default.isStream(a)){t.next=76;break}if(!Buffer.isBuffer(a)){t.next=64;break}t.next=73;break;case 64:if(!_utils.default.isArrayBuffer(a)){t.next=68;break}a=Buffer.from(new Uint8Array(a)),t.next=73;break;case 68:if(!_utils.default.isString(a)){t.next=72;break}a=Buffer.from(a,"utf-8"),t.next=73;break;case 72:return t.abrupt("return",o(new _AxiosError.default("Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream",_AxiosError.default.ERR_BAD_REQUEST,e)));case 73:if(E.setContentLength(a.length,!1),!(e.maxBodyLength>-1&&a.length>e.maxBodyLength)){t.next=76;break}return t.abrupt("return",o(new _AxiosError.default("Request body larger than maxBodyLength limit",_AxiosError.default.ERR_BAD_REQUEST,e)));case 76:k=_utils.default.toFiniteNumber(E.getContentLength()),_utils.default.isArray(A)?(L=A[0],S=A[1]):L=S=A,a&&(R||L)&&(_utils.default.isStream(a)||(a=_stream.default.Readable.from(a,{objectMode:!1})),a=_stream.default.pipeline([a,new _AxiosTransformStream.default({length:k,maxRate:_utils.default.toFiniteNumber(L)})],_utils.default.noop),R&&a.on("progress",function(e){R(Object.assign(e,{upload:!0}))})),O=void 0,e.auth&&(D=e.auth.username||"",B=e.auth.password||"",O=D+":"+B),!O&&g.username&&(P=g.username,j=g.password,O=P+":"+j),O&&E.delete("authorization"),t.prev=83,F=(0,_buildURL.default)(g.pathname+g.search,e.params,e.paramsSerializer).replace(/^\?/,""),t.next=94;break;case 87:return t.prev=87,t.t2=t.catch(83),(N=new Error(t.t2.message)).config=e,N.url=e.url,N.exists=!0,t.abrupt("return",o(N));case 94:if(E.set("Accept-Encoding","gzip, compress, deflate"+(isBrotliSupported?", br":""),!1),U={path:F,method:f,headers:E.toJSON(),agents:{http:e.httpAgent,https:e.httpsAgent},auth:O,protocol:x,family:s,beforeRedirect:dispatchBeforeRedirect,beforeRedirects:{}},!_utils.default.isUndefined(i)&&(U.lookup=i),e.socketPath?U.socketPath=e.socketPath:(U.hostname=g.hostname,U.port=g.port,setProxy(U,e.proxy,x+"//"+g.hostname+(g.port?":"+g.port:"")+U.path)),C=isHttps.test(U.protocol),U.agent=C?e.httpsAgent:e.httpAgent,e.transport?z=e.transport:0===e.maxRedirects?z=C?_https.default:_http.default:(e.maxRedirects&&(U.maxRedirects=e.maxRedirects),e.beforeRedirect&&(U.beforeRedirects.config=e.beforeRedirect),z=C?httpsFollow:httpFollow),e.maxBodyLength>-1?U.maxBodyLength=e.maxBodyLength:U.maxBodyLength=1/0,e.insecureHTTPParser&&(U.insecureHTTPParser=e.insecureHTTPParser),p=z.request(U,function(t){if(!p.destroyed){var n=[t],a=+t.headers["content-length"];if(w){var i=new _AxiosTransformStream.default({length:_utils.default.toFiniteNumber(a),maxRate:_utils.default.toFiniteNumber(S)});w&&i.on("progress",function(e){w(Object.assign(e,{download:!0}))}),n.push(i)}var s=t,c=t.req||p;if(!1!==e.decompress&&t.headers["content-encoding"])switch("HEAD"!==f&&204!==t.statusCode||delete t.headers["content-encoding"],(t.headers["content-encoding"]||"").toLowerCase()){case"gzip":case"x-gzip":case"compress":case"x-compress":n.push(_zlib.default.createUnzip(zlibOptions)),delete t.headers["content-encoding"];break;case"deflate":n.push(new _ZlibHeaderTransformStream.default),n.push(_zlib.default.createUnzip(zlibOptions)),delete t.headers["content-encoding"];break;case"br":isBrotliSupported&&(n.push(_zlib.default.createBrotliDecompress(brotliOptions)),delete t.headers["content-encoding"])}s=n.length>1?_stream.default.pipeline(n,_utils.default.noop):n[0];var h=_stream.default.finished(s,function(){h(),_()}),y={status:t.statusCode,statusText:t.statusMessage,headers:new _AxiosHeaders.default(t.headers),config:e,request:c};if("stream"===u)y.data=s,(0,_settle.default)(r,o,y);else{var b=[],g=0;s.on("data",function(t){b.push(t),g+=t.length,e.maxContentLength>-1&&g>e.maxContentLength&&(d=!0,s.destroy(),o(new _AxiosError.default("maxContentLength size of "+e.maxContentLength+" exceeded",_AxiosError.default.ERR_BAD_RESPONSE,e,c)))}),s.on("aborted",function(){if(!d){var t=new _AxiosError.default("maxContentLength size of "+e.maxContentLength+" exceeded",_AxiosError.default.ERR_BAD_RESPONSE,e,c);s.destroy(t),o(t)}}),s.on("error",function(t){p.destroyed||o(_AxiosError.default.from(t,null,e,c))}),s.on("end",function(){try{var t=1===b.length?b[0]:Buffer.concat(b);"arraybuffer"!==u&&(t=t.toString(l),l&&"utf8"!==l||(t=_utils.default.stripBOM(t))),y.data=t}catch(t){return o(_AxiosError.default.from(t,null,e,y.request,y))}(0,_settle.default)(r,o,y)})}m.once("abort",function(e){s.destroyed||(s.emit("error",e),s.destroy())})}}),m.once("abort",function(e){o(e),p.destroy(e)}),p.on("error",function(t){o(_AxiosError.default.from(t,null,e,p))}),p.on("socket",function(e){e.setKeepAlive(!0,6e4)}),!e.timeout){t.next=113;break}if(H=parseInt(e.timeout,10),!Number.isNaN(H)){t.next=112;break}return o(new _AxiosError.default("error trying to parse `config.timeout` to int",_AxiosError.default.ERR_BAD_OPTION_VALUE,e,p)),t.abrupt("return");case 112:p.setTimeout(H,function(){if(!c){var t=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded",r=e.transitional||_transitional.default;e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),o(new _AxiosError.default(t,r.clarifyTimeoutError?_AxiosError.default.ETIMEDOUT:_AxiosError.default.ECONNABORTED,e,p)),y()}});case 113:_utils.default.isStream(a)?(I=!1,G=!1,a.on("end",function(){I=!0}),a.once("error",function(e){G=!0,p.destroy(e)}),a.on("close",function(){I||G||y(new _CanceledError.default("Request stream has been aborted",e,p))}),a.pipe(p)):p.end(a);case 114:case"end":return t.stop()}},t,null,[[17,21],[43,50],[83,87]])}));return function(e,r,o){return t.apply(this,arguments)}}())},__setProxy=exports.__setProxy=setProxy;

},{"../cancel/CanceledError.js":18,"../core/AxiosError.js":21,"../core/AxiosHeaders.js":22,"../core/buildFullPath.js":24,"../defaults/transitional.js":30,"../env/data.js":31,"../helpers/AxiosTransformStream.js":32,"../helpers/ZlibHeaderTransformStream.js":35,"../helpers/callbackify.js":38,"../helpers/formDataToStream.js":42,"../helpers/fromDataURI.js":43,"../helpers/readBlob.js":49,"../platform/index.js":57,"./../core/settle.js":27,"./../helpers/buildURL.js":37,"./../utils.js":61,"events":undefined,"follow-redirects":69,"http":undefined,"https":undefined,"proxy-from-env":77,"stream":undefined,"util":undefined,"zlib":undefined}],15:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _utils=_interopRequireDefault(require("./../utils.js")),_settle=_interopRequireDefault(require("./../core/settle.js")),_cookies=_interopRequireDefault(require("./../helpers/cookies.js")),_buildURL=_interopRequireDefault(require("./../helpers/buildURL.js")),_buildFullPath=_interopRequireDefault(require("../core/buildFullPath.js")),_isURLSameOrigin=_interopRequireDefault(require("./../helpers/isURLSameOrigin.js")),_transitional=_interopRequireDefault(require("../defaults/transitional.js")),_AxiosError=_interopRequireDefault(require("../core/AxiosError.js")),_CanceledError=_interopRequireDefault(require("../cancel/CanceledError.js")),_parseProtocol=_interopRequireDefault(require("../helpers/parseProtocol.js")),_index=_interopRequireDefault(require("../platform/index.js")),_AxiosHeaders=_interopRequireDefault(require("../core/AxiosHeaders.js")),_speedometer2=_interopRequireDefault(require("../helpers/speedometer.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _toArray(e){return _arrayWithHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,r){if(e){if("string"==typeof e)return _arrayLikeToArray(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?_arrayLikeToArray(e,r):void 0}}function _arrayLikeToArray(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,o=new Array(r);t<r;t++)o[t]=e[t];return o}function _iterableToArray(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function _arrayWithHoles(e){if(Array.isArray(e))return e}function progressEventReducer(e,r){var t=0,o=(0,_speedometer2.default)(50,250);return function(a){var n=a.loaded,i=a.lengthComputable?a.total:void 0,s=n-t,u=o(s);t=n;var l={loaded:n,total:i,progress:i?n/i:void 0,bytes:s,rate:u||void 0,estimated:u&&i&&n<=i?(i-n)/u:void 0,event:a};l[r?"download":"upload"]=!0,e(l)}}var isXHRAdapterSupported="undefined"!=typeof XMLHttpRequest,_default=exports.default=isXHRAdapterSupported&&function(e){return new Promise(function(r,t){var o,a,n=e.data,i=_AxiosHeaders.default.from(e.headers).normalize(),s=e.responseType,u=e.withXSRFToken;function l(){e.cancelToken&&e.cancelToken.unsubscribe(o),e.signal&&e.signal.removeEventListener("abort",o)}if(_utils.default.isFormData(n))if(_index.default.hasStandardBrowserEnv||_index.default.hasStandardBrowserWebWorkerEnv)i.setContentType(!1);else if(!1!==(a=i.getContentType())){var d=_toArray(a?a.split(";").map(function(e){return e.trim()}).filter(Boolean):[]),f=d[0],p=d.slice(1);i.setContentType([f||"multipart/form-data"].concat(_toConsumableArray(p)).join("; "))}var c=new XMLHttpRequest;if(e.auth){var _=e.auth.username||"",m=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";i.set("Authorization","Basic "+btoa(_+":"+m))}var y=(0,_buildFullPath.default)(e.baseURL,e.url);function b(){if(c){var o=_AxiosHeaders.default.from("getAllResponseHeaders"in c&&c.getAllResponseHeaders()),a={data:s&&"text"!==s&&"json"!==s?c.response:c.responseText,status:c.status,statusText:c.statusText,headers:o,config:e,request:c};(0,_settle.default)(function(e){r(e),l()},function(e){t(e),l()},a),c=null}}if(c.open(e.method.toUpperCase(),(0,_buildURL.default)(y,e.params,e.paramsSerializer),!0),c.timeout=e.timeout,"onloadend"in c?c.onloadend=b:c.onreadystatechange=function(){c&&4===c.readyState&&(0!==c.status||c.responseURL&&0===c.responseURL.indexOf("file:"))&&setTimeout(b)},c.onabort=function(){c&&(t(new _AxiosError.default("Request aborted",_AxiosError.default.ECONNABORTED,e,c)),c=null)},c.onerror=function(){t(new _AxiosError.default("Network Error",_AxiosError.default.ERR_NETWORK,e,c)),c=null},c.ontimeout=function(){var r=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded",o=e.transitional||_transitional.default;e.timeoutErrorMessage&&(r=e.timeoutErrorMessage),t(new _AxiosError.default(r,o.clarifyTimeoutError?_AxiosError.default.ETIMEDOUT:_AxiosError.default.ECONNABORTED,e,c)),c=null},_index.default.hasStandardBrowserEnv&&(u&&_utils.default.isFunction(u)&&(u=u(e)),u||!1!==u&&(0,_isURLSameOrigin.default)(y))){var R=e.xsrfHeaderName&&e.xsrfCookieName&&_cookies.default.read(e.xsrfCookieName);R&&i.set(e.xsrfHeaderName,R)}void 0===n&&i.setContentType(null),"setRequestHeader"in c&&_utils.default.forEach(i.toJSON(),function(e,r){c.setRequestHeader(r,e)}),_utils.default.isUndefined(e.withCredentials)||(c.withCredentials=!!e.withCredentials),s&&"json"!==s&&(c.responseType=e.responseType),"function"==typeof e.onDownloadProgress&&c.addEventListener("progress",progressEventReducer(e.onDownloadProgress,!0)),"function"==typeof e.onUploadProgress&&c.upload&&c.upload.addEventListener("progress",progressEventReducer(e.onUploadProgress)),(e.cancelToken||e.signal)&&(o=function(r){c&&(t(!r||r.type?new _CanceledError.default(null,e,c):r),c.abort(),c=null)},e.cancelToken&&e.cancelToken.subscribe(o),e.signal&&(e.signal.aborted?o():e.signal.addEventListener("abort",o)));var A=(0,_parseProtocol.default)(y);A&&-1===_index.default.protocols.indexOf(A)?t(new _AxiosError.default("Unsupported protocol "+A+":",_AxiosError.default.ERR_BAD_REQUEST,e)):c.send(n||null)})};

},{"../cancel/CanceledError.js":18,"../core/AxiosError.js":21,"../core/AxiosHeaders.js":22,"../core/buildFullPath.js":24,"../defaults/transitional.js":30,"../helpers/parseProtocol.js":48,"../helpers/speedometer.js":50,"../platform/index.js":57,"./../core/settle.js":27,"./../helpers/buildURL.js":37,"./../helpers/cookies.js":40,"./../helpers/isURLSameOrigin.js":46,"./../utils.js":61}],16:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _utils=_interopRequireDefault(require("./utils.js")),_bind=_interopRequireDefault(require("./helpers/bind.js")),_Axios=_interopRequireDefault(require("./core/Axios.js")),_mergeConfig=_interopRequireDefault(require("./core/mergeConfig.js")),_index=_interopRequireDefault(require("./defaults/index.js")),_formDataToJSON=_interopRequireDefault(require("./helpers/formDataToJSON.js")),_CanceledError=_interopRequireDefault(require("./cancel/CanceledError.js")),_CancelToken=_interopRequireDefault(require("./cancel/CancelToken.js")),_isCancel=_interopRequireDefault(require("./cancel/isCancel.js")),_data=require("./env/data.js"),_toFormData=_interopRequireDefault(require("./helpers/toFormData.js")),_AxiosError=_interopRequireDefault(require("./core/AxiosError.js")),_spread=_interopRequireDefault(require("./helpers/spread.js")),_isAxiosError=_interopRequireDefault(require("./helpers/isAxiosError.js")),_AxiosHeaders=_interopRequireDefault(require("./core/AxiosHeaders.js")),_adapters=_interopRequireDefault(require("./adapters/adapters.js")),_HttpStatusCode=_interopRequireDefault(require("./helpers/HttpStatusCode.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function createInstance(e){var r=new _Axios.default(e),a=(0,_bind.default)(_Axios.default.prototype.request,r);return _utils.default.extend(a,_Axios.default.prototype,r,{allOwnKeys:!0}),_utils.default.extend(a,r,null,{allOwnKeys:!0}),a.create=function(r){return createInstance((0,_mergeConfig.default)(e,r))},a}var axios=createInstance(_index.default);axios.Axios=_Axios.default,axios.CanceledError=_CanceledError.default,axios.CancelToken=_CancelToken.default,axios.isCancel=_isCancel.default,axios.VERSION=_data.VERSION,axios.toFormData=_toFormData.default,axios.AxiosError=_AxiosError.default,axios.Cancel=axios.CanceledError,axios.all=function(e){return Promise.all(e)},axios.spread=_spread.default,axios.isAxiosError=_isAxiosError.default,axios.mergeConfig=_mergeConfig.default,axios.AxiosHeaders=_AxiosHeaders.default,axios.formToJSON=function(e){return(0,_formDataToJSON.default)(_utils.default.isHTMLForm(e)?new FormData(e):e)},axios.getAdapter=_adapters.default.getAdapter,axios.HttpStatusCode=_HttpStatusCode.default,axios.default=axios;var _default=exports.default=axios;

},{"./adapters/adapters.js":13,"./cancel/CancelToken.js":17,"./cancel/CanceledError.js":18,"./cancel/isCancel.js":19,"./core/Axios.js":20,"./core/AxiosError.js":21,"./core/AxiosHeaders.js":22,"./core/mergeConfig.js":26,"./defaults/index.js":29,"./env/data.js":31,"./helpers/HttpStatusCode.js":34,"./helpers/bind.js":36,"./helpers/formDataToJSON.js":41,"./helpers/isAxiosError.js":45,"./helpers/spread.js":51,"./helpers/toFormData.js":53,"./utils.js":61}],17:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _CanceledError=_interopRequireDefault(require("./CanceledError.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,_toPropertyKey(n.key),n)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function _toPropertyKey(e){var t=_toPrimitive(e,"string");return"symbol"===_typeof(t)?t:String(t)}function _toPrimitive(e,t){if("object"!==_typeof(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!==_typeof(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}var CancelToken=function(){function e(t){if(_classCallCheck(this,e),"function"!=typeof t)throw new TypeError("executor must be a function.");var r;this.promise=new Promise(function(e){r=e});var n=this;this.promise.then(function(e){if(n._listeners){for(var t=n._listeners.length;t-- >0;)n._listeners[t](e);n._listeners=null}}),this.promise.then=function(e){var t,r=new Promise(function(e){n.subscribe(e),t=e}).then(e);return r.cancel=function(){n.unsubscribe(t)},r},t(function(e,t,o){n.reason||(n.reason=new _CanceledError.default(e,t,o),r(n.reason))})}return _createClass(e,[{key:"throwIfRequested",value:function(){if(this.reason)throw this.reason}},{key:"subscribe",value:function(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e]}},{key:"unsubscribe",value:function(e){if(this._listeners){var t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)}}}],[{key:"source",value:function(){var t;return{token:new e(function(e){t=e}),cancel:t}}}]),e}(),_default=exports.default=CancelToken;

},{"./CanceledError.js":18}],18:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _AxiosError=_interopRequireDefault(require("../core/AxiosError.js")),_utils=_interopRequireDefault(require("../utils.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function CanceledError(e,r,t){_AxiosError.default.call(this,null==e?"canceled":e,_AxiosError.default.ERR_CANCELED,r,t),this.name="CanceledError"}_utils.default.inherits(CanceledError,_AxiosError.default,{__CANCEL__:!0});var _default=exports.default=CanceledError;

},{"../core/AxiosError.js":21,"../utils.js":61}],19:[function(require,module,exports){
"use strict";function isCancel(e){return!(!e||!e.__CANCEL__)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=isCancel;

},{}],20:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _utils=_interopRequireDefault(require("./../utils.js")),_buildURL=_interopRequireDefault(require("../helpers/buildURL.js")),_InterceptorManager=_interopRequireDefault(require("./InterceptorManager.js")),_dispatchRequest=_interopRequireDefault(require("./dispatchRequest.js")),_mergeConfig=_interopRequireDefault(require("./mergeConfig.js")),_buildFullPath=_interopRequireDefault(require("./buildFullPath.js")),_validator=_interopRequireDefault(require("../helpers/validator.js")),_AxiosHeaders=_interopRequireDefault(require("./AxiosHeaders.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,_toPropertyKey(i.key),i)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function _toPropertyKey(e){var t=_toPrimitive(e,"string");return"symbol"===_typeof(t)?t:String(t)}function _toPrimitive(e,t){if("object"!==_typeof(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var i=r.call(e,t||"default");if("object"!==_typeof(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}var validators=_validator.default.validators,Axios=function(){function e(t){_classCallCheck(this,e),this.defaults=t,this.interceptors={request:new _InterceptorManager.default,response:new _InterceptorManager.default}}return _createClass(e,[{key:"request",value:function(e,t){"string"==typeof e?(t=t||{}).url=e:t=e||{};var r=t=(0,_mergeConfig.default)(this.defaults,t),i=r.transitional,o=r.paramsSerializer,a=r.headers;void 0!==i&&_validator.default.assertOptions(i,{silentJSONParsing:validators.transitional(validators.boolean),forcedJSONParsing:validators.transitional(validators.boolean),clarifyTimeoutError:validators.transitional(validators.boolean)},!1),null!=o&&(_utils.default.isFunction(o)?t.paramsSerializer={serialize:o}:_validator.default.assertOptions(o,{encode:validators.function,serialize:validators.function},!0)),t.method=(t.method||this.defaults.method||"get").toLowerCase();var n=a&&_utils.default.merge(a.common,a[t.method]);a&&_utils.default.forEach(["delete","get","head","post","put","patch","common"],function(e){delete a[e]}),t.headers=_AxiosHeaders.default.concat(n,a);var u=[],l=!0;this.interceptors.request.forEach(function(e){"function"==typeof e.runWhen&&!1===e.runWhen(t)||(l=l&&e.synchronous,u.unshift(e.fulfilled,e.rejected))});var s,f=[];this.interceptors.response.forEach(function(e){f.push(e.fulfilled,e.rejected)});var d,p=0;if(!l){var c=[_dispatchRequest.default.bind(this),void 0];for(c.unshift.apply(c,u),c.push.apply(c,f),d=c.length,s=Promise.resolve(t);p<d;)s=s.then(c[p++],c[p++]);return s}d=u.length;var h=t;for(p=0;p<d;){var _=u[p++],v=u[p++];try{h=_(h)}catch(e){v.call(this,e);break}}try{s=_dispatchRequest.default.call(this,h)}catch(e){return Promise.reject(e)}for(p=0,d=f.length;p<d;)s=s.then(f[p++],f[p++]);return s}},{key:"getUri",value:function(e){e=(0,_mergeConfig.default)(this.defaults,e);var t=(0,_buildFullPath.default)(e.baseURL,e.url);return(0,_buildURL.default)(t,e.params,e.paramsSerializer)}}]),e}();_utils.default.forEach(["delete","get","head","options"],function(e){Axios.prototype[e]=function(t,r){return this.request((0,_mergeConfig.default)(r||{},{method:e,url:t,data:(r||{}).data}))}}),_utils.default.forEach(["post","put","patch"],function(e){function t(t){return function(r,i,o){return this.request((0,_mergeConfig.default)(o||{},{method:e,headers:t?{"Content-Type":"multipart/form-data"}:{},url:r,data:i}))}}Axios.prototype[e]=t(),Axios.prototype[e+"Form"]=t(!0)});var _default=exports.default=Axios;

},{"../helpers/buildURL.js":37,"../helpers/validator.js":55,"./../utils.js":61,"./AxiosHeaders.js":22,"./InterceptorManager.js":23,"./buildFullPath.js":24,"./dispatchRequest.js":25,"./mergeConfig.js":26}],21:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _utils=_interopRequireDefault(require("../utils.js"));function _interopRequireDefault(r){return r&&r.__esModule?r:{default:r}}function AxiosError(r,e,t,s,o){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=(new Error).stack,this.message=r,this.name="AxiosError",e&&(this.code=e),t&&(this.config=t),s&&(this.request=s),o&&(this.response=o)}_utils.default.inherits(AxiosError,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:_utils.default.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});var prototype=AxiosError.prototype,descriptors={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(function(r){descriptors[r]={value:r}}),Object.defineProperties(AxiosError,descriptors),Object.defineProperty(prototype,"isAxiosError",{value:!0}),AxiosError.from=function(r,e,t,s,o,i){var u=Object.create(prototype);return _utils.default.toFlatObject(r,u,function(r){return r!==Error.prototype},function(r){return"isAxiosError"!==r}),AxiosError.call(u,r.message,e,t,s,o),u.cause=r,u.name=r.name,i&&Object.assign(u,i),u};var _default=exports.default=AxiosError;

},{"../utils.js":61}],22:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _utils=_interopRequireDefault(require("../utils.js")),_parseHeaders=_interopRequireDefault(require("../helpers/parseHeaders.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_unsupportedIterableToArray(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function _iterableToArrayLimit(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,i,a,o,u=[],l=!0,s=!1;try{if(a=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;l=!1}else for(;!(l=(n=a.call(r)).done)&&(u.push(n.value),u.length!==t);l=!0);}catch(e){s=!0,i=e}finally{try{if(!l&&null!=r.return&&(o=r.return(),Object(o)!==o))return}finally{if(s)throw i}}return u}}function _arrayWithHoles(e){if(Array.isArray(e))return e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,_toPropertyKey(n.key),n)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function _toPropertyKey(e){var t=_toPrimitive(e,"string");return"symbol"===_typeof(t)?t:String(t)}function _toPrimitive(e,t){if("object"!==_typeof(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!==_typeof(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}var $internals=Symbol("internals");function normalizeHeader(e){return e&&String(e).trim().toLowerCase()}function normalizeValue(e){return!1===e||null==e?e:_utils.default.isArray(e)?e.map(normalizeValue):String(e)}function parseTokens(e){for(var t,r=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;t=n.exec(e);)r[t[1]]=t[2];return r}var isValidHeaderName=function(e){return/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim())};function matchHeaderValue(e,t,r,n,i){return _utils.default.isFunction(n)?n.call(this,t,r):(i&&(t=r),_utils.default.isString(t)?_utils.default.isString(n)?-1!==t.indexOf(n):_utils.default.isRegExp(n)?n.test(t):void 0:void 0)}function formatHeader(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,function(e,t,r){return t.toUpperCase()+r})}function buildAccessors(e,t){var r=_utils.default.toCamelCase(" "+t);["get","set","has"].forEach(function(n){Object.defineProperty(e,n+r,{value:function(e,r,i){return this[n].call(this,t,e,r,i)},configurable:!0})})}var AxiosHeaders=function(e,t){function r(e){_classCallCheck(this,r),e&&this.set(e)}return _createClass(r,[{key:"set",value:function(e,t,r){var n=this;function i(e,t,r){var i=normalizeHeader(t);if(!i)throw new Error("header name must be a non-empty string");var a=_utils.default.findKey(n,i);(!a||void 0===n[a]||!0===r||void 0===r&&!1!==n[a])&&(n[a||t]=normalizeValue(e))}var a=function(e,t){return _utils.default.forEach(e,function(e,r){return i(e,r,t)})};return _utils.default.isPlainObject(e)||e instanceof this.constructor?a(e,t):_utils.default.isString(e)&&(e=e.trim())&&!isValidHeaderName(e)?a((0,_parseHeaders.default)(e),t):null!=e&&i(t,e,r),this}},{key:"get",value:function(e,t){if(e=normalizeHeader(e)){var r=_utils.default.findKey(this,e);if(r){var n=this[r];if(!t)return n;if(!0===t)return parseTokens(n);if(_utils.default.isFunction(t))return t.call(this,n,r);if(_utils.default.isRegExp(t))return t.exec(n);throw new TypeError("parser must be boolean|regexp|function")}}}},{key:"has",value:function(e,t){if(e=normalizeHeader(e)){var r=_utils.default.findKey(this,e);return!(!r||void 0===this[r]||t&&!matchHeaderValue(this,this[r],r,t))}return!1}},{key:"delete",value:function(e,t){var r=this,n=!1;function i(e){if(e=normalizeHeader(e)){var i=_utils.default.findKey(r,e);!i||t&&!matchHeaderValue(r,r[i],i,t)||(delete r[i],n=!0)}}return _utils.default.isArray(e)?e.forEach(i):i(e),n}},{key:"clear",value:function(e){for(var t=Object.keys(this),r=t.length,n=!1;r--;){var i=t[r];e&&!matchHeaderValue(this,this[i],i,e,!0)||(delete this[i],n=!0)}return n}},{key:"normalize",value:function(e){var t=this,r={};return _utils.default.forEach(this,function(n,i){var a=_utils.default.findKey(r,i);if(a)return t[a]=normalizeValue(n),void delete t[i];var o=e?formatHeader(i):String(i).trim();o!==i&&delete t[i],t[o]=normalizeValue(n),r[o]=!0}),this}},{key:"concat",value:function(){for(var e,t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return(e=this.constructor).concat.apply(e,[this].concat(r))}},{key:"toJSON",value:function(e){var t=Object.create(null);return _utils.default.forEach(this,function(r,n){null!=r&&!1!==r&&(t[n]=e&&_utils.default.isArray(r)?r.join(", "):r)}),t}},{key:Symbol.iterator,value:function(){return Object.entries(this.toJSON())[Symbol.iterator]()}},{key:"toString",value:function(){return Object.entries(this.toJSON()).map(function(e){var t=_slicedToArray(e,2);return t[0]+": "+t[1]}).join("\n")}},{key:Symbol.toStringTag,get:function(){return"AxiosHeaders"}}],[{key:"from",value:function(e){return e instanceof this?e:new this(e)}},{key:"concat",value:function(e){for(var t=new this(e),r=arguments.length,n=new Array(r>1?r-1:0),i=1;i<r;i++)n[i-1]=arguments[i];return n.forEach(function(e){return t.set(e)}),t}},{key:"accessor",value:function(e){var t=(this[$internals]=this[$internals]={accessors:{}}).accessors,r=this.prototype;function n(e){var n=normalizeHeader(e);t[n]||(buildAccessors(r,e),t[n]=!0)}return _utils.default.isArray(e)?e.forEach(n):n(e),this}}]),r}();AxiosHeaders.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]),_utils.default.reduceDescriptors(AxiosHeaders.prototype,function(e,t){var r=e.value,n=t[0].toUpperCase()+t.slice(1);return{get:function(){return r},set:function(e){this[n]=e}}}),_utils.default.freezeMethods(AxiosHeaders);var _default=exports.default=AxiosHeaders;

},{"../helpers/parseHeaders.js":47,"../utils.js":61}],23:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _utils=_interopRequireDefault(require("./../utils.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,_toPropertyKey(n.key),n)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function _toPropertyKey(e){var t=_toPrimitive(e,"string");return"symbol"===_typeof(t)?t:String(t)}function _toPrimitive(e,t){if("object"!==_typeof(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!==_typeof(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}var InterceptorManager=function(){function e(){_classCallCheck(this,e),this.handlers=[]}return _createClass(e,[{key:"use",value:function(e,t,r){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!r&&r.synchronous,runWhen:r?r.runWhen:null}),this.handlers.length-1}},{key:"eject",value:function(e){this.handlers[e]&&(this.handlers[e]=null)}},{key:"clear",value:function(){this.handlers&&(this.handlers=[])}},{key:"forEach",value:function(e){_utils.default.forEach(this.handlers,function(t){null!==t&&e(t)})}}]),e}(),_default=exports.default=InterceptorManager;

},{"./../utils.js":61}],24:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=buildFullPath;var _isAbsoluteURL=_interopRequireDefault(require("../helpers/isAbsoluteURL.js")),_combineURLs=_interopRequireDefault(require("../helpers/combineURLs.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function buildFullPath(e,u){return e&&!(0,_isAbsoluteURL.default)(u)?(0,_combineURLs.default)(e,u):u}

},{"../helpers/combineURLs.js":39,"../helpers/isAbsoluteURL.js":44}],25:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=dispatchRequest;var _transformData=_interopRequireDefault(require("./transformData.js")),_isCancel=_interopRequireDefault(require("../cancel/isCancel.js")),_index=_interopRequireDefault(require("../defaults/index.js")),_CanceledError=_interopRequireDefault(require("../cancel/CanceledError.js")),_AxiosHeaders=_interopRequireDefault(require("../core/AxiosHeaders.js")),_adapters=_interopRequireDefault(require("../adapters/adapters.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function throwIfCancellationRequested(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new _CanceledError.default(null,e)}function dispatchRequest(e){return throwIfCancellationRequested(e),e.headers=_AxiosHeaders.default.from(e.headers),e.data=_transformData.default.call(e,e.transformRequest),-1!==["post","put","patch"].indexOf(e.method)&&e.headers.setContentType("application/x-www-form-urlencoded",!1),_adapters.default.getAdapter(e.adapter||_index.default.adapter)(e).then(function(r){return throwIfCancellationRequested(e),r.data=_transformData.default.call(e,e.transformResponse,r),r.headers=_AxiosHeaders.default.from(r.headers),r},function(r){return(0,_isCancel.default)(r)||(throwIfCancellationRequested(e),r&&r.response&&(r.response.data=_transformData.default.call(e,e.transformResponse,r.response),r.response.headers=_AxiosHeaders.default.from(r.response.headers))),Promise.reject(r)})}

},{"../adapters/adapters.js":13,"../cancel/CanceledError.js":18,"../cancel/isCancel.js":19,"../core/AxiosHeaders.js":22,"../defaults/index.js":29,"./transformData.js":28}],26:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=mergeConfig;var _utils=_interopRequireDefault(require("../utils.js")),_AxiosHeaders=_interopRequireDefault(require("./AxiosHeaders.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var headersToObject=function(e){return e instanceof _AxiosHeaders.default?e.toJSON():e};function mergeConfig(e,t){t=t||{};var i={};function s(e,t,i){return _utils.default.isPlainObject(e)&&_utils.default.isPlainObject(t)?_utils.default.merge.call({caseless:i},e,t):_utils.default.isPlainObject(t)?_utils.default.merge({},t):_utils.default.isArray(t)?t.slice():t}function n(e,t,i){return _utils.default.isUndefined(t)?_utils.default.isUndefined(e)?void 0:s(void 0,e,i):s(e,t,i)}function r(e,t){if(!_utils.default.isUndefined(t))return s(void 0,t)}function u(e,t){return _utils.default.isUndefined(t)?_utils.default.isUndefined(e)?void 0:s(void 0,e):s(void 0,t)}function a(i,n,r){return r in t?s(i,n):r in e?s(void 0,i):void 0}var o={url:r,method:r,data:r,baseURL:u,transformRequest:u,transformResponse:u,paramsSerializer:u,timeout:u,timeoutMessage:u,withCredentials:u,withXSRFToken:u,adapter:u,responseType:u,xsrfCookieName:u,xsrfHeaderName:u,onUploadProgress:u,onDownloadProgress:u,decompress:u,maxContentLength:u,maxBodyLength:u,beforeRedirect:u,transport:u,httpAgent:u,httpsAgent:u,cancelToken:u,socketPath:u,responseEncoding:u,validateStatus:a,headers:function(e,t){return n(headersToObject(e),headersToObject(t),!0)}};return _utils.default.forEach(Object.keys(Object.assign({},e,t)),function(s){var r=o[s]||n,u=r(e[s],t[s],s);_utils.default.isUndefined(u)&&r!==a||(i[s]=u)}),i}

},{"../utils.js":61,"./AxiosHeaders.js":22}],27:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=settle;var _AxiosError=_interopRequireDefault(require("./AxiosError.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function settle(e,t,r){var s=r.config.validateStatus;r.status&&s&&!s(r.status)?t(new _AxiosError.default("Request failed with status code "+r.status,[_AxiosError.default.ERR_BAD_REQUEST,_AxiosError.default.ERR_BAD_RESPONSE][Math.floor(r.status/100)-4],r.config,r.request,r)):e(r)}

},{"./AxiosError.js":21}],28:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=transformData;var _utils=_interopRequireDefault(require("./../utils.js")),_index=_interopRequireDefault(require("../defaults/index.js")),_AxiosHeaders=_interopRequireDefault(require("../core/AxiosHeaders.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function transformData(e,r){var t=this||_index.default,a=r||t,u=_AxiosHeaders.default.from(a.headers),i=a.data;return _utils.default.forEach(e,function(e){i=e.call(t,i,u.normalize(),r?r.status:void 0)}),u.normalize(),i}

},{"../core/AxiosHeaders.js":22,"../defaults/index.js":29,"./../utils.js":61}],29:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _utils=_interopRequireDefault(require("../utils.js")),_AxiosError=_interopRequireDefault(require("../core/AxiosError.js")),_transitional=_interopRequireDefault(require("./transitional.js")),_toFormData=_interopRequireDefault(require("../helpers/toFormData.js")),_toURLEncodedForm=_interopRequireDefault(require("../helpers/toURLEncodedForm.js")),_index=_interopRequireDefault(require("../platform/index.js")),_formDataToJSON=_interopRequireDefault(require("../helpers/formDataToJSON.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function stringifySafely(e,t,r){if(_utils.default.isString(e))try{return(t||JSON.parse)(e),_utils.default.trim(e)}catch(e){if("SyntaxError"!==e.name)throw e}return(r||JSON.stringify)(e)}var defaults={transitional:_transitional.default,adapter:["xhr","http"],transformRequest:[function(e,t){var r,i=t.getContentType()||"",a=i.indexOf("application/json")>-1,o=_utils.default.isObject(e);if(o&&_utils.default.isHTMLForm(e)&&(e=new FormData(e)),_utils.default.isFormData(e))return a&&a?JSON.stringify((0,_formDataToJSON.default)(e)):e;if(_utils.default.isArrayBuffer(e)||_utils.default.isBuffer(e)||_utils.default.isStream(e)||_utils.default.isFile(e)||_utils.default.isBlob(e))return e;if(_utils.default.isArrayBufferView(e))return e.buffer;if(_utils.default.isURLSearchParams(e))return t.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();if(o){if(i.indexOf("application/x-www-form-urlencoded")>-1)return(0,_toURLEncodedForm.default)(e,this.formSerializer).toString();if((r=_utils.default.isFileList(e))||i.indexOf("multipart/form-data")>-1){var s=this.env&&this.env.FormData;return(0,_toFormData.default)(r?{"files[]":e}:e,s&&new s,this.formSerializer)}}return o||a?(t.setContentType("application/json",!1),stringifySafely(e)):e}],transformResponse:[function(e){var t=this.transitional||defaults.transitional,r=t&&t.forcedJSONParsing,i="json"===this.responseType;if(e&&_utils.default.isString(e)&&(r&&!this.responseType||i)){var a=!(t&&t.silentJSONParsing)&&i;try{return JSON.parse(e)}catch(e){if(a){if("SyntaxError"===e.name)throw _AxiosError.default.from(e,_AxiosError.default.ERR_BAD_RESPONSE,this,null,this.response);throw e}}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:_index.default.classes.FormData,Blob:_index.default.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};_utils.default.forEach(["delete","get","head","post","put","patch"],function(e){defaults.headers[e]={}});var _default=exports.default=defaults;

},{"../core/AxiosError.js":21,"../helpers/formDataToJSON.js":41,"../helpers/toFormData.js":53,"../helpers/toURLEncodedForm.js":54,"../platform/index.js":57,"../utils.js":61,"./transitional.js":30}],30:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _default=exports.default={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1};

},{}],31:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.VERSION=void 0;var VERSION=exports.VERSION="1.6.2";

},{}],32:[function(require,module,exports){
"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _stream=_interopRequireDefault(require("stream")),_utils=_interopRequireDefault(require("../utils.js")),_throttle=_interopRequireDefault(require("./throttle.js")),_speedometer2=_interopRequireDefault(require("./speedometer.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,_toPropertyKey(n.key),n)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function _toPropertyKey(e){var t=_toPrimitive(e,"string");return"symbol"===_typeof(t)?t:String(t)}function _toPrimitive(e,t){if("object"!==_typeof(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!==_typeof(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}function _get(){return(_get="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,r){var n=_superPropBase(e,t);if(n){var o=Object.getOwnPropertyDescriptor(n,t);return o.get?o.get.call(arguments.length<3?e:r):o.value}}).apply(this,arguments)}function _superPropBase(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=_getPrototypeOf(e)););return e}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function _createSuper(e){var t=_isNativeReflectConstruct();return function(){var r,n=_getPrototypeOf(e);if(t){var o=_getPrototypeOf(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return _possibleConstructorReturn(this,r)}}function _possibleConstructorReturn(e,t){if(t&&("object"===_typeof(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return _assertThisInitialized(e)}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var kInternals=Symbol("internals"),AxiosTransformStream=function(e){_inherits(r,_stream["default"].Transform);var t=_createSuper(r);function r(e){var n;_classCallCheck(this,r),e=_utils.default.toFlatObject(e,{maxRate:0,chunkSize:65536,minChunkSize:100,timeWindow:500,ticksRate:2,samplesCount:15},null,function(e,t){return!_utils.default.isUndefined(t[e])});var o=_assertThisInitialized(n=t.call(this,{readableHighWaterMark:e.chunkSize})),i=n[kInternals]={length:e.length,timeWindow:e.timeWindow,ticksRate:e.ticksRate,chunkSize:e.chunkSize,maxRate:e.maxRate,minChunkSize:e.minChunkSize,bytesSeen:0,isCaptured:!1,notifiedBytesLoaded:0,ts:Date.now(),bytes:0,onReadCallback:null},u=(0,_speedometer2.default)(i.ticksRate*e.samplesCount,i.timeWindow);n.on("newListener",function(e){"progress"===e&&(i.isCaptured||(i.isCaptured=!0))});var a=0;i.updateProgress=(0,_throttle.default)(function(){var e=i.length,t=i.bytesSeen,r=t-a;if(r&&!o.destroyed){var n=u(r);a=t,process.nextTick(function(){o.emit("progress",{loaded:t,total:e,progress:e?t/e:void 0,bytes:r,rate:n||void 0,estimated:n&&e&&t<=e?(e-t)/n:void 0})})}},i.ticksRate);var s=function(){i.updateProgress(!0)};return n.once("end",s),n.once("error",s),n}return _createClass(r,[{key:"_read",value:function(e){var t=this[kInternals];return t.onReadCallback&&t.onReadCallback(),_get(_getPrototypeOf(r.prototype),"_read",this).call(this,e)}},{key:"_transform",value:function(e,t,r){var n=this,o=this[kInternals],i=o.maxRate,u=this.readableHighWaterMark,a=o.timeWindow,s=i/(1e3/a),l=!1!==o.minChunkSize?Math.max(o.minChunkSize,.01*s):0;var f=function(e,t){var r,f=Buffer.byteLength(e),c=null,p=u,y=0;if(i){var d=Date.now();(!o.ts||(y=d-o.ts)>=a)&&(o.ts=d,r=s-o.bytes,o.bytes=r<0?-r:0,y=0),r=s-o.bytes}if(i){if(r<=0)return setTimeout(function(){t(null,e)},a-y);r<p&&(p=r)}p&&f>p&&f-p>l&&(c=e.subarray(p),e=e.subarray(0,p)),function(e,t){var r=Buffer.byteLength(e);o.bytesSeen+=r,o.bytes+=r,o.isCaptured&&o.updateProgress(),n.push(e)?process.nextTick(t):o.onReadCallback=function(){o.onReadCallback=null,process.nextTick(t)}}(e,c?function(){process.nextTick(t,null,c)}:t)};f(e,function e(t,n){if(t)return r(t);n?f(n,e):r(null)})}},{key:"setLength",value:function(e){return this[kInternals].length=+e,this}}]),r}(),_default=exports.default=AxiosTransformStream;

},{"../utils.js":61,"./speedometer.js":50,"./throttle.js":52,"stream":undefined}],33:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _toFormData=_interopRequireDefault(require("./toFormData.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function encode(e){var t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(e){return t[e]})}function AxiosURLSearchParams(e,t){this._pairs=[],e&&(0,_toFormData.default)(e,this,t)}var prototype=AxiosURLSearchParams.prototype;prototype.append=function(e,t){this._pairs.push([e,t])},prototype.toString=function(e){var t=e?function(t){return e.call(this,t,encode)}:encode;return this._pairs.map(function(e){return t(e[0])+"="+t(e[1])},"").join("&")};var _default=exports.default=AxiosURLSearchParams;

},{"./toFormData.js":53}],34:[function(require,module,exports){
"use strict";function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_unsupportedIterableToArray(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,o=new Array(t);r<t;r++)o[r]=e[r];return o}function _iterableToArrayLimit(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var o,a,n,i,l=[],u=!0,d=!1;try{if(n=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;u=!1}else for(;!(u=(o=n.call(r)).done)&&(l.push(o.value),l.length!==t);u=!0);}catch(e){d=!0,a=e}finally{try{if(!u&&null!=r.return&&(i=r.return(),Object(i)!==i))return}finally{if(d)throw a}}return l}}function _arrayWithHoles(e){if(Array.isArray(e))return e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var HttpStatusCode={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(HttpStatusCode).forEach(function(e){var t=_slicedToArray(e,2),r=t[0],o=t[1];HttpStatusCode[o]=r});var _default=exports.default=HttpStatusCode;

},{}],35:[function(require,module,exports){
"use strict";function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _stream=_interopRequireDefault(require("stream"));function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var r=0;r<e.length;r++){var o=e[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,_toPropertyKey(o.key),o)}}function _createClass(t,e,r){return e&&_defineProperties(t.prototype,e),r&&_defineProperties(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function _toPropertyKey(t){var e=_toPrimitive(t,"string");return"symbol"===_typeof(e)?e:String(e)}function _toPrimitive(t,e){if("object"!==_typeof(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var o=r.call(t,e||"default");if("object"!==_typeof(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&_setPrototypeOf(t,e)}function _setPrototypeOf(t,e){return(_setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t})(t,e)}function _createSuper(t){var e=_isNativeReflectConstruct();return function(){var r,o=_getPrototypeOf(t);if(e){var n=_getPrototypeOf(this).constructor;r=Reflect.construct(o,arguments,n)}else r=o.apply(this,arguments);return _possibleConstructorReturn(this,r)}}function _possibleConstructorReturn(t,e){if(e&&("object"===_typeof(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return _assertThisInitialized(t)}function _assertThisInitialized(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}function _getPrototypeOf(t){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var ZlibHeaderTransformStream=function(t){_inherits(r,_stream["default"].Transform);var e=_createSuper(r);function r(){return _classCallCheck(this,r),e.apply(this,arguments)}return _createClass(r,[{key:"__transform",value:function(t,e,r){this.push(t),r()}},{key:"_transform",value:function(t,e,r){if(0!==t.length&&(this._transform=this.__transform,120!==t[0])){var o=Buffer.alloc(2);o[0]=120,o[1]=156,this.push(o,e)}this.__transform(t,e,r)}}]),r}(),_default=exports.default=ZlibHeaderTransformStream;

},{"stream":undefined}],36:[function(require,module,exports){
"use strict";function bind(e,t){return function(){return e.apply(t,arguments)}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=bind;

},{}],37:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=buildURL;var _utils=_interopRequireDefault(require("../utils.js")),_AxiosURLSearchParams=_interopRequireDefault(require("../helpers/AxiosURLSearchParams.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function encode(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function buildURL(e,r,i){if(!r)return e;var t,a=i&&i.encode||encode,u=i&&i.serialize;if(t=u?u(r,i):_utils.default.isURLSearchParams(r)?r.toString():new _AxiosURLSearchParams.default(r,i).toString(a)){var n=e.indexOf("#");-1!==n&&(e=e.slice(0,n)),e+=(-1===e.indexOf("?")?"?":"&")+t}return e}

},{"../helpers/AxiosURLSearchParams.js":33,"../utils.js":61}],38:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _utils=_interopRequireDefault(require("../utils.js"));function _interopRequireDefault(r){return r&&r.__esModule?r:{default:r}}function _toConsumableArray(r){return _arrayWithoutHoles(r)||_iterableToArray(r)||_unsupportedIterableToArray(r)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(r,e){if(r){if("string"==typeof r)return _arrayLikeToArray(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);return"Object"===t&&r.constructor&&(t=r.constructor.name),"Map"===t||"Set"===t?Array.from(r):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?_arrayLikeToArray(r,e):void 0}}function _iterableToArray(r){if("undefined"!=typeof Symbol&&null!=r[Symbol.iterator]||null!=r["@@iterator"])return Array.from(r)}function _arrayWithoutHoles(r){if(Array.isArray(r))return _arrayLikeToArray(r)}function _arrayLikeToArray(r,e){(null==e||e>r.length)&&(e=r.length);for(var t=0,a=new Array(e);t<e;t++)a[t]=r[t];return a}var callbackify=function(r,e){return _utils.default.isAsyncFn(r)?function(){for(var t=arguments.length,a=new Array(t),n=0;n<t;n++)a[n]=arguments[n];var o=a.pop();r.apply(this,a).then(function(r){try{e?o.apply(void 0,[null].concat(_toConsumableArray(e(r)))):o(null,r)}catch(r){o(r)}},o)}:r},_default=exports.default=callbackify;

},{"../utils.js":61}],39:[function(require,module,exports){
"use strict";function combineURLs(e,r){return r?e.replace(/\/+$/,"")+"/"+r.replace(/^\/+/,""):e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=combineURLs;

},{}],40:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _utils=_interopRequireDefault(require("./../utils.js")),_index=_interopRequireDefault(require("../platform/index.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var _default=exports.default=_index.default.hasStandardBrowserEnv?{write:function(e,t,u,n,r,i){var o=[e+"="+encodeURIComponent(t)];_utils.default.isNumber(u)&&o.push("expires="+new Date(u).toGMTString()),_utils.default.isString(n)&&o.push("path="+n),_utils.default.isString(r)&&o.push("domain="+r),!0===i&&o.push("secure"),document.cookie=o.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}};

},{"../platform/index.js":57,"./../utils.js":61}],41:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _utils=_interopRequireDefault(require("../utils.js"));function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}function parsePropPath(t){return _utils.default.matchAll(/\w+|\[(\w*)]/g,t).map(function(t){return"[]"===t[0]?"":t[1]||t[0]})}function arrayToObject(t){var e,r,u={},a=Object.keys(t),i=a.length;for(e=0;e<i;e++)u[r=a[e]]=t[r];return u}function formDataToJSON(t){if(_utils.default.isFormData(t)&&_utils.default.isFunction(t.entries)){var e={};return _utils.default.forEachEntry(t,function(t,r){!function t(e,r,u,a){var i=e[a++],l=Number.isFinite(+i),n=a>=e.length;return i=!i&&_utils.default.isArray(u)?u.length:i,n?(_utils.default.hasOwnProp(u,i)?u[i]=[u[i],r]:u[i]=r,!l):(u[i]&&_utils.default.isObject(u[i])||(u[i]=[]),t(e,r,u[i],a)&&_utils.default.isArray(u[i])&&(u[i]=arrayToObject(u[i])),!l)}(parsePropPath(t),r,e,0)}),e}return null}var _default=exports.default=formDataToJSON;

},{"../utils.js":61}],42:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _util=require("util"),_stream=require("stream"),_utils=_interopRequireDefault(require("../utils.js")),_readBlob=_interopRequireDefault(require("./readBlob.js"));function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}function _createForOfIteratorHelper(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=_unsupportedIterableToArray(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,u=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return i=t.done,t},e:function(t){u=!0,a=t},f:function(){try{i||null==r.return||r.return()}finally{if(u)throw a}}}}function _slicedToArray(t,e){return _arrayWithHoles(t)||_iterableToArrayLimit(t,e)||_unsupportedIterableToArray(t,e)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(t,e):void 0}}function _arrayLikeToArray(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function _iterableToArrayLimit(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,a,i,u=[],c=!0,l=!1;try{if(a=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;c=!1}else for(;!(c=(n=a.call(r)).done)&&(u.push(n.value),u.length!==e);c=!0);}catch(t){l=!0,o=t}finally{try{if(!c&&null!=r.return&&(i=r.return(),Object(i)!==i))return}finally{if(l)throw o}}return u}}function _arrayWithHoles(t){if(Array.isArray(t))return t}function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function _regeneratorRuntime(){_regeneratorRuntime=function(){return e};var t,e={},r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(t,e,r){t[e]=r.value},a="function"==typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",u=a.asyncIterator||"@@asyncIterator",c=a.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var a=e&&e.prototype instanceof m?e:m,i=Object.create(a.prototype),u=new O(n||[]);return o(i,"_invoke",{value:S(t,r,u)}),i}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=s;var y="suspendedStart",h="suspendedYield",p="executing",d="completed",v={};function m(){}function _(){}function g(){}var b={};l(b,i,function(){return this});var w=Object.getPrototypeOf,x=w&&w(w(P([])));x&&x!==r&&n.call(x,i)&&(b=x);var L=g.prototype=m.prototype=Object.create(b);function A(t){["next","throw","return"].forEach(function(e){l(t,e,function(t){return this._invoke(e,t)})})}function E(t,e){function r(o,a,i,u){var c=f(t[o],t,a);if("throw"!==c.type){var l=c.arg,s=l.value;return s&&"object"==_typeof(s)&&n.call(s,"__await")?e.resolve(s.__await).then(function(t){r("next",t,i,u)},function(t){r("throw",t,i,u)}):e.resolve(s).then(function(t){l.value=t,i(l)},function(t){return r("throw",t,i,u)})}u(c.arg)}var a;o(this,"_invoke",{value:function(t,n){function o(){return new e(function(e,o){r(t,n,e,o)})}return a=a?a.then(o,o):o()}})}function S(e,r,n){var o=y;return function(a,i){if(o===p)throw new Error("Generator is already running");if(o===d){if("throw"===a)throw i;return{value:t,done:!0}}for(n.method=a,n.arg=i;;){var u=n.delegate;if(u){var c=T(u,n);if(c){if(c===v)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===y)throw o=d,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=p;var l=f(e,r,n);if("normal"===l.type){if(o=n.done?d:h,l.arg===v)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(o=d,n.method="throw",n.arg=l.arg)}}}function T(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,T(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),v;var a=f(o,e.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,v;var i=a.arg;return i?i.done?(r[e.resultName]=i.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,v):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function k(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function P(e){if(e||""===e){var r=e[i];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,a=function r(){for(;++o<e.length;)if(n.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return a.next=a}}throw new TypeError(_typeof(e)+" is not iterable")}return _.prototype=g,o(L,"constructor",{value:g,configurable:!0}),o(g,"constructor",{value:_,configurable:!0}),_.displayName=l(g,c,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===_||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,l(t,c,"GeneratorFunction")),t.prototype=Object.create(L),t},e.awrap=function(t){return{__await:t}},A(E.prototype),l(E.prototype,u,function(){return this}),e.AsyncIterator=E,e.async=function(t,r,n,o,a){void 0===a&&(a=Promise);var i=new E(s(t,r,n,o),a);return e.isGeneratorFunction(r)?i:i.next().then(function(t){return t.done?t.value:i.next()})},A(L),l(L,c,"Generator"),l(L,i,function(){return this}),l(L,"toString",function(){return"[object Generator]"}),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=P,O.prototype={constructor:O,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(k),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function o(n,o){return u.type="throw",u.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],u=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var c=n.call(i,"catchLoc"),l=n.call(i,"finallyLoc");if(c&&l){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,v):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),k(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;k(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:P(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),v}},e}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,_toPropertyKey(n.key),n)}}function _createClass(t,e,r){return e&&_defineProperties(t.prototype,e),r&&_defineProperties(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function _toPropertyKey(t){var e=_toPrimitive(t,"string");return"symbol"===_typeof(e)?e:String(e)}function _toPrimitive(t,e){if("object"!==_typeof(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,e||"default");if("object"!==_typeof(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}function _wrapAsyncGenerator(t){return function(){return new _AsyncGenerator(t.apply(this,arguments))}}function _AsyncGenerator(t){var e,r;function n(e,r){try{var a=t[e](r),i=a.value,u=i instanceof _OverloadYield;Promise.resolve(u?i.v:i).then(function(r){if(u){var c="return"===e?"return":"next";if(!i.k||r.done)return n(c,r);r=t[c](r).value}o(a.done?"return":"normal",r)},function(t){n("throw",t)})}catch(t){o("throw",t)}}function o(t,o){switch(t){case"return":e.resolve({value:o,done:!0});break;case"throw":e.reject(o);break;default:e.resolve({value:o,done:!1})}(e=e.next)?n(e.key,e.arg):r=null}this._invoke=function(t,o){return new Promise(function(a,i){var u={key:t,arg:o,resolve:a,reject:i,next:null};r?r=r.next=u:(e=r=u,n(t,o))})},"function"!=typeof t.return&&(this.return=void 0)}function _awaitAsyncGenerator(t){return new _OverloadYield(t,0)}function _asyncGeneratorDelegate(t){var e={},r=!1;function n(e,n){return r=!0,{done:!1,value:new _OverloadYield(n=new Promise(function(r){r(t[e](n))}),1)}}return e["undefined"!=typeof Symbol&&Symbol.iterator||"@@iterator"]=function(){return this},e.next=function(t){return r?(r=!1,t):n("next",t)},"function"==typeof t.throw&&(e.throw=function(t){if(r)throw r=!1,t;return n("throw",t)}),"function"==typeof t.return&&(e.return=function(t){return r?(r=!1,t):n("return",t)}),e}function _OverloadYield(t,e){this.v=t,this.k=e}function _asyncIterator(t){var e,r,n,o=2;for("undefined"!=typeof Symbol&&(r=Symbol.asyncIterator,n=Symbol.iterator);o--;){if(r&&null!=(e=t[r]))return e.call(t);if(n&&null!=(e=t[n]))return new AsyncFromSyncIterator(e.call(t));r="@@asyncIterator",n="@@iterator"}throw new TypeError("Object is not async iterable")}function AsyncFromSyncIterator(t){function e(t){if(Object(t)!==t)return Promise.reject(new TypeError(t+" is not an object."));var e=t.done;return Promise.resolve(t.value).then(function(t){return{value:t,done:e}})}return(AsyncFromSyncIterator=function(t){this.s=t,this.n=t.next}).prototype={s:null,n:null,next:function(){return e(this.n.apply(this.s,arguments))},return:function(t){var r=this.s.return;return void 0===r?Promise.resolve({value:t,done:!0}):e(r.apply(this.s,arguments))},throw:function(t){var r=this.s.return;return void 0===r?Promise.reject(t):e(r.apply(this.s,arguments))}},new AsyncFromSyncIterator(t)}_AsyncGenerator.prototype["function"==typeof Symbol&&Symbol.asyncIterator||"@@asyncIterator"]=function(){return this},_AsyncGenerator.prototype.next=function(t){return this._invoke("next",t)},_AsyncGenerator.prototype.throw=function(t){return this._invoke("throw",t)},_AsyncGenerator.prototype.return=function(t){return this._invoke("return",t)};var BOUNDARY_ALPHABET=_utils.default.ALPHABET.ALPHA_DIGIT+"-_",textEncoder=new _util.TextEncoder,CRLF="\r\n",CRLF_BYTES=textEncoder.encode(CRLF),CRLF_BYTES_COUNT=2,FormDataPart=function(){function t(e,r){_classCallCheck(this,t);var n=this.constructor.escapeName,o=_utils.default.isString(r),a='Content-Disposition: form-data; name="'.concat(n(e),'"').concat(!o&&r.name?'; filename="'.concat(n(r.name),'"'):"").concat(CRLF);o?r=textEncoder.encode(String(r).replace(/\r?\n|\r\n?/g,CRLF)):a+="Content-Type: ".concat(r.type||"application/octet-stream").concat(CRLF),this.headers=textEncoder.encode(a+CRLF),this.contentLength=o?r.byteLength:r.size,this.size=this.headers.byteLength+this.contentLength+CRLF_BYTES_COUNT,this.name=e,this.value=r}return _createClass(t,[{key:"encode",value:function(){var t=this;return _wrapAsyncGenerator(_regeneratorRuntime().mark(function e(){var r;return _regeneratorRuntime().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.headers;case 2:if(r=t.value,!_utils.default.isTypedArray(r)){e.next=8;break}return e.next=6,r;case 6:e.next=9;break;case 8:return e.delegateYield(_asyncGeneratorDelegate(_asyncIterator((0,_readBlob.default)(r)),_awaitAsyncGenerator),"t0",9);case 9:return e.next=11,CRLF_BYTES;case 11:case"end":return e.stop()}},e)}))()}}],[{key:"escapeName",value:function(t){return String(t).replace(/[\r\n"]/g,function(t){return{"\r":"%0D","\n":"%0A",'"':"%22"}[t]})}}]),t}(),formDataToStream=function(t,e,r){var n=r||{},o=n.tag,a=void 0===o?"form-data-boundary":o,i=n.size,u=void 0===i?25:i,c=n.boundary,l=void 0===c?a+"-"+_utils.default.generateString(u,BOUNDARY_ALPHABET):c;if(!_utils.default.isFormData(t))throw TypeError("FormData instance required");if(l.length<1||l.length>70)throw Error("boundary must be 10-70 characters long");var s=textEncoder.encode("--"+l+CRLF),f=textEncoder.encode("--"+l+"--"+CRLF+CRLF),y=f.byteLength,h=Array.from(t.entries()).map(function(t){var e=_slicedToArray(t,2),r=e[0],n=e[1],o=new FormDataPart(r,n);return y+=o.size,o});y+=s.byteLength*h.length,y=_utils.default.toFiniteNumber(y);var p={"Content-Type":"multipart/form-data; boundary=".concat(l)};return Number.isFinite(y)&&(p["Content-Length"]=y),e&&e(p),_stream.Readable.from(_wrapAsyncGenerator(_regeneratorRuntime().mark(function t(){var e,r,n;return _regeneratorRuntime().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e=_createForOfIteratorHelper(h),t.prev=1,e.s();case 3:if((r=e.n()).done){t.next=10;break}return n=r.value,t.next=7,s;case 7:return t.delegateYield(_asyncGeneratorDelegate(_asyncIterator(n.encode()),_awaitAsyncGenerator),"t0",8);case 8:t.next=3;break;case 10:t.next=15;break;case 12:t.prev=12,t.t1=t.catch(1),e.e(t.t1);case 15:return t.prev=15,e.f(),t.finish(15);case 18:return t.next=20,f;case 20:case"end":return t.stop()}},t,null,[[1,12,15,18]])}))())},_default=exports.default=formDataToStream;

},{"../utils.js":61,"./readBlob.js":49,"stream":undefined,"util":undefined}],43:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=fromDataURI;var _AxiosError=_interopRequireDefault(require("../core/AxiosError.js")),_parseProtocol=_interopRequireDefault(require("./parseProtocol.js")),_index=_interopRequireDefault(require("../platform/index.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var DATA_URL_PATTERN=/^(?:([^;]+);)?(?:[^;]+;)?(base64|),([\s\S]*)$/;function fromDataURI(e,r,o){var t=o&&o.Blob||_index.default.classes.Blob,a=(0,_parseProtocol.default)(e);if(void 0===r&&t&&(r=!0),"data"===a){e=a.length?e.slice(a.length+1):e;var i=DATA_URL_PATTERN.exec(e);if(!i)throw new _AxiosError.default("Invalid URL",_AxiosError.default.ERR_INVALID_URL);var u=i[1],l=i[2],s=i[3],_=Buffer.from(decodeURIComponent(s),l?"base64":"utf8");if(r){if(!t)throw new _AxiosError.default("Blob is not supported",_AxiosError.default.ERR_NOT_SUPPORT);return new t([_],{type:u})}return _}throw new _AxiosError.default("Unsupported protocol "+a,_AxiosError.default.ERR_NOT_SUPPORT)}

},{"../core/AxiosError.js":21,"../platform/index.js":57,"./parseProtocol.js":48}],44:[function(require,module,exports){
"use strict";function isAbsoluteURL(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=isAbsoluteURL;

},{}],45:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=isAxiosError;var _utils=_interopRequireDefault(require("./../utils.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function isAxiosError(e){return _utils.default.isObject(e)&&!0===e.isAxiosError}

},{"./../utils.js":61}],46:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _utils=_interopRequireDefault(require("./../utils.js")),_index=_interopRequireDefault(require("../platform/index.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var _default=exports.default=_index.default.hasStandardBrowserEnv?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function o(e){var o=e;return t&&(r.setAttribute("href",o),o=r.href),r.setAttribute("href",o),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=o(window.location.href),function(t){var r=_utils.default.isString(t)?o(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function(){return!0};

},{"../platform/index.js":57,"./../utils.js":61}],47:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _utils=_interopRequireDefault(require("./../utils.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var ignoreDuplicateOf=_utils.default.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),_default=exports.default=function(e){var t,i,r,o={};return e&&e.split("\n").forEach(function(e){r=e.indexOf(":"),t=e.substring(0,r).trim().toLowerCase(),i=e.substring(r+1).trim(),!t||o[t]&&ignoreDuplicateOf[t]||("set-cookie"===t?o[t]?o[t].push(i):o[t]=[i]:o[t]=o[t]?o[t]+", "+i:i)}),o};

},{"./../utils.js":61}],48:[function(require,module,exports){
"use strict";function parseProtocol(e){var r=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return r&&r[1]||""}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=parseProtocol;

},{}],49:[function(require,module,exports){
"use strict";function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function _regeneratorRuntime(){_regeneratorRuntime=function(){return r};var t,r={},e=Object.prototype,n=e.hasOwnProperty,o=Object.defineProperty||function(t,r,e){t[r]=e.value},i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",u=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag";function s(t,r,e){return Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}),t[r]}try{s({},"")}catch(t){s=function(t,r,e){return t[r]=e}}function f(t,r,e,n){var i=r&&r.prototype instanceof m?r:m,a=Object.create(i.prototype),u=new A(n||[]);return o(a,"_invoke",{value:G(t,e,u)}),a}function l(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(t){return{type:"throw",arg:t}}}r.wrap=f;var h="suspendedStart",y="suspendedYield",p="executing",v="completed",d={};function m(){}function w(){}function g(){}var b={};s(b,a,function(){return this});var _=Object.getPrototypeOf,x=_&&_(_(I([])));x&&x!==e&&n.call(x,a)&&(b=x);var L=g.prototype=m.prototype=Object.create(b);function k(t){["next","throw","return"].forEach(function(r){s(t,r,function(t){return this._invoke(r,t)})})}function E(t,r){function e(o,i,a,u){var c=l(t[o],t,i);if("throw"!==c.type){var s=c.arg,f=s.value;return f&&"object"==_typeof(f)&&n.call(f,"__await")?r.resolve(f.__await).then(function(t){e("next",t,a,u)},function(t){e("throw",t,a,u)}):r.resolve(f).then(function(t){s.value=t,a(s)},function(t){return e("throw",t,a,u)})}u(c.arg)}var i;o(this,"_invoke",{value:function(t,n){function o(){return new r(function(r,o){e(t,n,r,o)})}return i=i?i.then(o,o):o()}})}function G(r,e,n){var o=h;return function(i,a){if(o===p)throw new Error("Generator is already running");if(o===v){if("throw"===i)throw a;return{value:t,done:!0}}for(n.method=i,n.arg=a;;){var u=n.delegate;if(u){var c=S(u,n);if(c){if(c===d)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===h)throw o=v,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=p;var s=l(r,e,n);if("normal"===s.type){if(o=n.done?v:y,s.arg===d)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(o=v,n.method="throw",n.arg=s.arg)}}}function S(r,e){var n=e.method,o=r.iterator[n];if(o===t)return e.delegate=null,"throw"===n&&r.iterator.return&&(e.method="return",e.arg=t,S(r,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),d;var i=l(o,r.iterator,e.arg);if("throw"===i.type)return e.method="throw",e.arg=i.arg,e.delegate=null,d;var a=i.arg;return a?a.done?(e[r.resultName]=a.value,e.next=r.nextLoc,"return"!==e.method&&(e.method="next",e.arg=t),e.delegate=null,d):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,d)}function j(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function O(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function A(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function I(r){if(r||""===r){var e=r[a];if(e)return e.call(r);if("function"==typeof r.next)return r;if(!isNaN(r.length)){var o=-1,i=function e(){for(;++o<r.length;)if(n.call(r,o))return e.value=r[o],e.done=!1,e;return e.value=t,e.done=!0,e};return i.next=i}}throw new TypeError(_typeof(r)+" is not iterable")}return w.prototype=g,o(L,"constructor",{value:g,configurable:!0}),o(g,"constructor",{value:w,configurable:!0}),w.displayName=s(g,c,"GeneratorFunction"),r.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===w||"GeneratorFunction"===(r.displayName||r.name))},r.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,s(t,c,"GeneratorFunction")),t.prototype=Object.create(L),t},r.awrap=function(t){return{__await:t}},k(E.prototype),s(E.prototype,u,function(){return this}),r.AsyncIterator=E,r.async=function(t,e,n,o,i){void 0===i&&(i=Promise);var a=new E(f(t,e,n,o),i);return r.isGeneratorFunction(e)?a:a.next().then(function(t){return t.done?t.value:a.next()})},k(L),s(L,c,"Generator"),s(L,a,function(){return this}),s(L,"toString",function(){return"[object Generator]"}),r.keys=function(t){var r=Object(t),e=[];for(var n in r)e.push(n);return e.reverse(),function t(){for(;e.length;){var n=e.pop();if(n in r)return t.value=n,t.done=!1,t}return t.done=!0,t}},r.values=I,A.prototype={constructor:A,reset:function(r){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(O),!r)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(r){if(this.done)throw r;var e=this;function o(n,o){return u.type="throw",u.arg=r,e.next=n,o&&(e.method="next",e.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],u=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),s=n.call(a,"finallyLoc");if(c&&s){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;e>=0;--e){var o=this.tryEntries[e];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=r&&r<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=r,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(a)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),d},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),O(e),d}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;O(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(r,e,n){return this.delegate={iterator:I(r),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=t),d}},r}function _wrapAsyncGenerator(t){return function(){return new _AsyncGenerator(t.apply(this,arguments))}}function _AsyncGenerator(t){var r,e;function n(r,e){try{var i=t[r](e),a=i.value,u=a instanceof _OverloadYield;Promise.resolve(u?a.v:a).then(function(e){if(u){var c="return"===r?"return":"next";if(!a.k||e.done)return n(c,e);e=t[c](e).value}o(i.done?"return":"normal",e)},function(t){n("throw",t)})}catch(t){o("throw",t)}}function o(t,o){switch(t){case"return":r.resolve({value:o,done:!0});break;case"throw":r.reject(o);break;default:r.resolve({value:o,done:!1})}(r=r.next)?n(r.key,r.arg):e=null}this._invoke=function(t,o){return new Promise(function(i,a){var u={key:t,arg:o,resolve:i,reject:a,next:null};e?e=e.next=u:(r=e=u,n(t,o))})},"function"!=typeof t.return&&(this.return=void 0)}function _awaitAsyncGenerator(t){return new _OverloadYield(t,0)}function _asyncGeneratorDelegate(t){var r={},e=!1;function n(r,n){return e=!0,{done:!1,value:new _OverloadYield(n=new Promise(function(e){e(t[r](n))}),1)}}return r["undefined"!=typeof Symbol&&Symbol.iterator||"@@iterator"]=function(){return this},r.next=function(t){return e?(e=!1,t):n("next",t)},"function"==typeof t.throw&&(r.throw=function(t){if(e)throw e=!1,t;return n("throw",t)}),"function"==typeof t.return&&(r.return=function(t){return e?(e=!1,t):n("return",t)}),r}function _OverloadYield(t,r){this.v=t,this.k=r}function _asyncIterator(t){var r,e,n,o=2;for("undefined"!=typeof Symbol&&(e=Symbol.asyncIterator,n=Symbol.iterator);o--;){if(e&&null!=(r=t[e]))return r.call(t);if(n&&null!=(r=t[n]))return new AsyncFromSyncIterator(r.call(t));e="@@asyncIterator",n="@@iterator"}throw new TypeError("Object is not async iterable")}function AsyncFromSyncIterator(t){function r(t){if(Object(t)!==t)return Promise.reject(new TypeError(t+" is not an object."));var r=t.done;return Promise.resolve(t.value).then(function(t){return{value:t,done:r}})}return(AsyncFromSyncIterator=function(t){this.s=t,this.n=t.next}).prototype={s:null,n:null,next:function(){return r(this.n.apply(this.s,arguments))},return:function(t){var e=this.s.return;return void 0===e?Promise.resolve({value:t,done:!0}):r(e.apply(this.s,arguments))},throw:function(t){var e=this.s.return;return void 0===e?Promise.reject(t):r(e.apply(this.s,arguments))}},new AsyncFromSyncIterator(t)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,_AsyncGenerator.prototype["function"==typeof Symbol&&Symbol.asyncIterator||"@@asyncIterator"]=function(){return this},_AsyncGenerator.prototype.next=function(t){return this._invoke("next",t)},_AsyncGenerator.prototype.throw=function(t){return this._invoke("throw",t)},_AsyncGenerator.prototype.return=function(t){return this._invoke("return",t)};var asyncIterator=Symbol.asyncIterator,readBlob=function(){var t=_wrapAsyncGenerator(_regeneratorRuntime().mark(function t(r){return _regeneratorRuntime().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!r.stream){t.next=4;break}return t.delegateYield(_asyncGeneratorDelegate(_asyncIterator(r.stream()),_awaitAsyncGenerator),"t0",2);case 2:t.next=17;break;case 4:if(!r.arrayBuffer){t.next=11;break}return t.next=7,_awaitAsyncGenerator(r.arrayBuffer());case 7:return t.next=9,t.sent;case 9:t.next=17;break;case 11:if(!r[asyncIterator]){t.next=15;break}return t.delegateYield(_asyncGeneratorDelegate(_asyncIterator(r[asyncIterator]()),_awaitAsyncGenerator),"t1",13);case 13:t.next=17;break;case 15:return t.next=17,r;case 17:case"end":return t.stop()}},t)}));return function(r){return t.apply(this,arguments)}}(),_default=exports.default=readBlob;

},{}],50:[function(require,module,exports){
"use strict";function speedometer(e,r){e=e||10;var t,o=new Array(e),a=new Array(e),d=0,n=0;return r=void 0!==r?r:1e3,function(u){var v=Date.now(),f=a[n];t||(t=v),o[d]=u,a[d]=v;for(var i=n,s=0;i!==d;)s+=o[i++],i%=e;if((d=(d+1)%e)===n&&(n=(n+1)%e),!(v-t<r)){var p=f&&v-f;return p?Math.round(1e3*s/p):void 0}}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _default=exports.default=speedometer;

},{}],51:[function(require,module,exports){
"use strict";function spread(e){return function(r){return e.apply(null,r)}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=spread;

},{}],52:[function(require,module,exports){
"use strict";function throttle(t,e){var l=0,u=1e3/e,r=null;return function(e,n){var o=Date.now();if(e||o-l>u)return r&&(clearTimeout(r),r=null),l=o,t.apply(null,n);r||(r=setTimeout(function(){return r=null,l=Date.now(),t.apply(null,n)},u-(o-l)))}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _default=exports.default=throttle;

},{}],53:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _utils=_interopRequireDefault(require("../utils.js")),_AxiosError=_interopRequireDefault(require("../core/AxiosError.js")),_FormData=_interopRequireDefault(require("../platform/node/classes/FormData.js"));function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function isVisitable(t){return _utils.default.isPlainObject(t)||_utils.default.isArray(t)}function removeBrackets(t){return _utils.default.endsWith(t,"[]")?t.slice(0,-2):t}function renderKey(t,e,i){return t?t.concat(e).map(function(t,e){return t=removeBrackets(t),!i&&e?"["+t+"]":t}).join(i?".":""):e}function isFlatArray(t){return _utils.default.isArray(t)&&!t.some(isVisitable)}var predicates=_utils.default.toFlatObject(_utils.default,{},null,function(t){return/^is[A-Z]/.test(t)});function toFormData(t,e,i){if(!_utils.default.isObject(t))throw new TypeError("target must be an object");e=e||new(_FormData.default||FormData);var r=(i=_utils.default.toFlatObject(i,{metaTokens:!0,dots:!1,indexes:!1},!1,function(t,e){return!_utils.default.isUndefined(e[t])})).metaTokens,u=i.visitor||a,n=i.dots,o=i.indexes,l=(i.Blob||"undefined"!=typeof Blob&&Blob)&&_utils.default.isSpecCompliantForm(e);if(!_utils.default.isFunction(u))throw new TypeError("visitor must be a function");function s(t){if(null===t)return"";if(_utils.default.isDate(t))return t.toISOString();if(!l&&_utils.default.isBlob(t))throw new _AxiosError.default("Blob is not supported. Use a Buffer instead.");return _utils.default.isArrayBuffer(t)||_utils.default.isTypedArray(t)?l&&"function"==typeof Blob?new Blob([t]):Buffer.from(t):t}function a(t,i,u){var l=t;if(t&&!u&&"object"===_typeof(t))if(_utils.default.endsWith(i,"{}"))i=r?i:i.slice(0,-2),t=JSON.stringify(t);else if(_utils.default.isArray(t)&&isFlatArray(t)||(_utils.default.isFileList(t)||_utils.default.endsWith(i,"[]"))&&(l=_utils.default.toArray(t)))return i=removeBrackets(i),l.forEach(function(t,r){!_utils.default.isUndefined(t)&&null!==t&&e.append(!0===o?renderKey([i],r,n):null===o?i:i+"[]",s(t))}),!1;return!!isVisitable(t)||(e.append(renderKey(u,i,n),s(t)),!1)}var f=[],d=Object.assign(predicates,{defaultVisitor:a,convertValue:s,isVisitable:isVisitable});if(!_utils.default.isObject(t))throw new TypeError("data must be an object");return function t(i,r){if(!_utils.default.isUndefined(i)){if(-1!==f.indexOf(i))throw Error("Circular reference detected in "+r.join("."));f.push(i),_utils.default.forEach(i,function(i,n){!0===(!(_utils.default.isUndefined(i)||null===i)&&u.call(e,i,_utils.default.isString(n)?n.trim():n,r,d))&&t(i,r?r.concat(n):[n])}),f.pop()}}(t),e}var _default=exports.default=toFormData;

},{"../core/AxiosError.js":21,"../platform/node/classes/FormData.js":58,"../utils.js":61}],54:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=toURLEncodedForm;var _utils=_interopRequireDefault(require("../utils.js")),_toFormData=_interopRequireDefault(require("./toFormData.js")),_index=_interopRequireDefault(require("../platform/index.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function toURLEncodedForm(e,t){return(0,_toFormData.default)(e,new _index.default.classes.URLSearchParams,Object.assign({visitor:function(e,t,r,i){return _index.default.isNode&&_utils.default.isBuffer(e)?(this.append(t,e.toString("base64")),!1):i.defaultVisitor.apply(this,arguments)}},t))}

},{"../platform/index.js":57,"../utils.js":61,"./toFormData.js":53}],55:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _data=require("../env/data.js"),_AxiosError=_interopRequireDefault(require("../core/AxiosError.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var validators={};["object","boolean","number","function","string","symbol"].forEach(function(e,r){validators[e]=function(o){return _typeof(o)===e||"a"+(r<1?"n ":" ")+e}});var deprecatedWarnings={};function assertOptions(e,r,o){if("object"!==_typeof(e))throw new _AxiosError.default("options must be an object",_AxiosError.default.ERR_BAD_OPTION_VALUE);for(var t=Object.keys(e),n=t.length;n-- >0;){var i=t[n],a=r[i];if(a){var s=e[i],u=void 0===s||a(s,i,e);if(!0!==u)throw new _AxiosError.default("option "+i+" must be "+u,_AxiosError.default.ERR_BAD_OPTION_VALUE)}else if(!0!==o)throw new _AxiosError.default("Unknown option "+i,_AxiosError.default.ERR_BAD_OPTION)}}validators.transitional=function(e,r,o){function t(e,r){return"[Axios v"+_data.VERSION+"] Transitional option '"+e+"'"+r+(o?". "+o:"")}return function(o,n,i){if(!1===e)throw new _AxiosError.default(t(n," has been removed"+(r?" in "+r:"")),_AxiosError.default.ERR_DEPRECATED);return r&&!deprecatedWarnings[n]&&(deprecatedWarnings[n]=!0,console.warn(t(n," has been deprecated since v"+r+" and will be removed in the near future"))),!e||e(o,n,i)}};var _default=exports.default={assertOptions:assertOptions,validators:validators};

},{"../core/AxiosError.js":21,"../env/data.js":31}],56:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.hasStandardBrowserWebWorkerEnv=exports.hasStandardBrowserEnv=exports.hasBrowserEnv=void 0;var hasBrowserEnv=exports.hasBrowserEnv="undefined"!=typeof window&&"undefined"!=typeof document,hasStandardBrowserEnv=exports.hasStandardBrowserEnv=function(e){return hasBrowserEnv&&["ReactNative","NativeScript","NS"].indexOf(e)<0}("undefined"!=typeof navigator&&navigator.product),hasStandardBrowserWebWorkerEnv=exports.hasStandardBrowserWebWorkerEnv="undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope&&"function"==typeof self.importScripts;

},{}],57:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _index=_interopRequireDefault(require("./node/index.js")),utils=_interopRequireWildcard(require("./common/utils.js"));function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(_getRequireWildcardCache=function(e){return e?r:t})(e)}function _interopRequireWildcard(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=_typeof(e)&&"function"!=typeof e)return{default:e};var r=_getRequireWildcardCache(t);if(r&&r.has(e))return r.get(e);var o={__proto__:null},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if("default"!==i&&Object.prototype.hasOwnProperty.call(e,i)){var u=n?Object.getOwnPropertyDescriptor(e,i):null;u&&(u.get||u.set)?Object.defineProperty(o,i,u):o[i]=e[i]}return o.default=e,r&&r.set(e,o),o}function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,o)}return r}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(r),!0).forEach(function(t){_defineProperty(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function _defineProperty(e,t,r){return(t=_toPropertyKey(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _toPropertyKey(e){var t=_toPrimitive(e,"string");return"symbol"===_typeof(t)?t:String(t)}function _toPrimitive(e,t){if("object"!==_typeof(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!==_typeof(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}var _default=exports.default=_objectSpread(_objectSpread({},utils),_index.default);

},{"./common/utils.js":56,"./node/index.js":60}],58:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _formData=_interopRequireDefault(require("form-data"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var _default=exports.default=_formData.default;

},{"form-data":70}],59:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _url=_interopRequireDefault(require("url"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var _default=exports.default=_url.default.URLSearchParams;

},{"url":undefined}],60:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _URLSearchParams=_interopRequireDefault(require("./classes/URLSearchParams.js")),_FormData=_interopRequireDefault(require("./classes/FormData.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var _default=exports.default={isNode:!0,classes:{URLSearchParams:_URLSearchParams.default,FormData:_FormData.default,Blob:"undefined"!=typeof Blob&&Blob||null},protocols:["http","https","file","data"]};

},{"./classes/FormData.js":58,"./classes/URLSearchParams.js":59}],61:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _bind=_interopRequireDefault(require("./helpers/bind.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var toString=Object.prototype.toString,getPrototypeOf=Object.getPrototypeOf,kindOf=function(e){return function(t){var r=toString.call(t);return e[r]||(e[r]=r.slice(8,-1).toLowerCase())}}(Object.create(null)),kindOfTest=function(e){return e=e.toLowerCase(),function(t){return kindOf(t)===e}},typeOfTest=function(e){return function(t){return _typeof(t)===e}},isArray=Array.isArray,isUndefined=typeOfTest("undefined");function isBuffer(e){return null!==e&&!isUndefined(e)&&null!==e.constructor&&!isUndefined(e.constructor)&&isFunction(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}var isArrayBuffer=kindOfTest("ArrayBuffer");function isArrayBufferView(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&isArrayBuffer(e.buffer)}var isString=typeOfTest("string"),isFunction=typeOfTest("function"),isNumber=typeOfTest("number"),isObject=function(e){return null!==e&&"object"===_typeof(e)},isBoolean=function(e){return!0===e||!1===e},isPlainObject=function(e){if("object"!==kindOf(e))return!1;var t=getPrototypeOf(e);return!(null!==t&&t!==Object.prototype&&null!==Object.getPrototypeOf(t)||Symbol.toStringTag in e||Symbol.iterator in e)},isDate=kindOfTest("Date"),isFile=kindOfTest("File"),isBlob=kindOfTest("Blob"),isFileList=kindOfTest("FileList"),isStream=function(e){return isObject(e)&&isFunction(e.pipe)},isFormData=function(e){var t;return e&&("function"==typeof FormData&&e instanceof FormData||isFunction(e.append)&&("formdata"===(t=kindOf(e))||"object"===t&&isFunction(e.toString)&&"[object FormData]"===e.toString()))},isURLSearchParams=kindOfTest("URLSearchParams"),trim=function(e){return e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")};function forEach(e,t){var r,n,i=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}).allOwnKeys,o=void 0!==i&&i;if(null!=e)if("object"!==_typeof(e)&&(e=[e]),isArray(e))for(r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else{var s,f=o?Object.getOwnPropertyNames(e):Object.keys(e),a=f.length;for(r=0;r<a;r++)s=f[r],t.call(null,e[s],s,e)}}function findKey(e,t){t=t.toLowerCase();for(var r,n=Object.keys(e),i=n.length;i-- >0;)if(t===(r=n[i]).toLowerCase())return r;return null}var _global="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:global,isContextDefined=function(e){return!isUndefined(e)&&e!==_global};function merge(){for(var e=(isContextDefined(this)&&this||{}).caseless,t={},r=function(r,n){var i=e&&findKey(t,n)||n;isPlainObject(t[i])&&isPlainObject(r)?t[i]=merge(t[i],r):isPlainObject(r)?t[i]=merge({},r):isArray(r)?t[i]=r.slice():t[i]=r},n=0,i=arguments.length;n<i;n++)arguments[n]&&forEach(arguments[n],r);return t}var extend=function(e,t,r){return forEach(t,function(t,n){r&&isFunction(t)?e[n]=(0,_bind.default)(t,r):e[n]=t},{allOwnKeys:(arguments.length>3&&void 0!==arguments[3]?arguments[3]:{}).allOwnKeys}),e},stripBOM=function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e},inherits=function(e,t,r,n){e.prototype=Object.create(t.prototype,n),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),r&&Object.assign(e.prototype,r)},toFlatObject=function(e,t,r,n){var i,o,s,f={};if(t=t||{},null==e)return t;do{for(o=(i=Object.getOwnPropertyNames(e)).length;o-- >0;)s=i[o],n&&!n(s,e,t)||f[s]||(t[s]=e[s],f[s]=!0);e=!1!==r&&getPrototypeOf(e)}while(e&&(!r||r(e,t))&&e!==Object.prototype);return t},endsWith=function(e,t,r){e=String(e),(void 0===r||r>e.length)&&(r=e.length),r-=t.length;var n=e.indexOf(t,r);return-1!==n&&n===r},toArray=function(e){if(!e)return null;if(isArray(e))return e;var t=e.length;if(!isNumber(t))return null;for(var r=new Array(t);t-- >0;)r[t]=e[t];return r},isTypedArray=function(e){return function(t){return e&&t instanceof e}}("undefined"!=typeof Uint8Array&&getPrototypeOf(Uint8Array)),forEachEntry=function(e,t){for(var r,n=(e&&e[Symbol.iterator]).call(e);(r=n.next())&&!r.done;){var i=r.value;t.call(e,i[0],i[1])}},matchAll=function(e,t){for(var r,n=[];null!==(r=e.exec(t));)n.push(r);return n},isHTMLForm=kindOfTest("HTMLFormElement"),toCamelCase=function(e){return e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(e,t,r){return t.toUpperCase()+r})},hasOwnProperty=function(e){var t=Object.prototype.hasOwnProperty;return function(e,r){return t.call(e,r)}}(),isRegExp=kindOfTest("RegExp"),reduceDescriptors=function(e,t){var r=Object.getOwnPropertyDescriptors(e),n={};forEach(r,function(r,i){var o;!1!==(o=t(r,i,e))&&(n[i]=o||r)}),Object.defineProperties(e,n)},freezeMethods=function(e){reduceDescriptors(e,function(t,r){if(isFunction(e)&&-1!==["arguments","caller","callee"].indexOf(r))return!1;var n=e[r];isFunction(n)&&(t.enumerable=!1,"writable"in t?t.writable=!1:t.set||(t.set=function(){throw Error("Can not rewrite read-only method '"+r+"'")}))})},toObjectSet=function(e,t){var r={},n=function(e){e.forEach(function(e){r[e]=!0})};return isArray(e)?n(e):n(String(e).split(t)),r},noop=function(){},toFiniteNumber=function(e,t){return e=+e,Number.isFinite(e)?e:t},ALPHA="abcdefghijklmnopqrstuvwxyz",DIGIT="0123456789",ALPHABET={DIGIT:DIGIT,ALPHA:ALPHA,ALPHA_DIGIT:ALPHA+ALPHA.toUpperCase()+DIGIT},generateString=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:16,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:ALPHABET.ALPHA_DIGIT,r="",n=t.length;e--;)r+=t[Math.random()*n|0];return r};function isSpecCompliantForm(e){return!!(e&&isFunction(e.append)&&"FormData"===e[Symbol.toStringTag]&&e[Symbol.iterator])}var toJSONObject=function(e){var t=new Array(10);return function e(r,n){if(isObject(r)){if(t.indexOf(r)>=0)return;if(!("toJSON"in r)){t[n]=r;var i=isArray(r)?[]:{};return forEach(r,function(t,r){var o=e(t,n+1);!isUndefined(o)&&(i[r]=o)}),t[n]=void 0,i}}return r}(e,0)},isAsyncFn=kindOfTest("AsyncFunction"),isThenable=function(e){return e&&(isObject(e)||isFunction(e))&&isFunction(e.then)&&isFunction(e.catch)},_default=exports.default={isArray:isArray,isArrayBuffer:isArrayBuffer,isBuffer:isBuffer,isFormData:isFormData,isArrayBufferView:isArrayBufferView,isString:isString,isNumber:isNumber,isBoolean:isBoolean,isObject:isObject,isPlainObject:isPlainObject,isUndefined:isUndefined,isDate:isDate,isFile:isFile,isBlob:isBlob,isRegExp:isRegExp,isFunction:isFunction,isStream:isStream,isURLSearchParams:isURLSearchParams,isTypedArray:isTypedArray,isFileList:isFileList,forEach:forEach,merge:merge,extend:extend,trim:trim,stripBOM:stripBOM,inherits:inherits,toFlatObject:toFlatObject,kindOf:kindOf,kindOfTest:kindOfTest,endsWith:endsWith,toArray:toArray,forEachEntry:forEachEntry,matchAll:matchAll,isHTMLForm:isHTMLForm,hasOwnProperty:hasOwnProperty,hasOwnProp:hasOwnProperty,reduceDescriptors:reduceDescriptors,freezeMethods:freezeMethods,toObjectSet:toObjectSet,toCamelCase:toCamelCase,noop:noop,toFiniteNumber:toFiniteNumber,findKey:findKey,global:_global,isContextDefined:isContextDefined,ALPHABET:ALPHABET,generateString:generateString,isSpecCompliantForm:isSpecCompliantForm,toJSONObject:toJSONObject,isAsyncFn:isAsyncFn,isThenable:isThenable};

},{"./helpers/bind.js":36}],62:[function(require,module,exports){
"use strict";var util=require("util"),Stream=require("stream").Stream,DelayedStream=require("delayed-stream");function CombinedStream(){this.writable=!1,this.readable=!0,this.dataSize=0,this.maxDataSize=2097152,this.pauseStreams=!0,this._released=!1,this._streams=[],this._currentStream=null,this._insideLoop=!1,this._pendingNext=!1}module.exports=CombinedStream,util.inherits(CombinedStream,Stream),CombinedStream.create=function(t){var e=new this;for(var i in t=t||{})e[i]=t[i];return e},CombinedStream.isStreamLike=function(t){return"function"!=typeof t&&"string"!=typeof t&&"boolean"!=typeof t&&"number"!=typeof t&&!Buffer.isBuffer(t)},CombinedStream.prototype.append=function(t){if(CombinedStream.isStreamLike(t)){if(!(t instanceof DelayedStream)){var e=DelayedStream.create(t,{maxDataSize:1/0,pauseStream:this.pauseStreams});t.on("data",this._checkDataSize.bind(this)),t=e}this._handleErrors(t),this.pauseStreams&&t.pause()}return this._streams.push(t),this},CombinedStream.prototype.pipe=function(t,e){return Stream.prototype.pipe.call(this,t,e),this.resume(),t},CombinedStream.prototype._getNext=function(){if(this._currentStream=null,this._insideLoop)this._pendingNext=!0;else{this._insideLoop=!0;try{do{this._pendingNext=!1,this._realGetNext()}while(this._pendingNext)}finally{this._insideLoop=!1}}},CombinedStream.prototype._realGetNext=function(){var t=this._streams.shift();void 0!==t?"function"==typeof t?t(function(t){CombinedStream.isStreamLike(t)&&(t.on("data",this._checkDataSize.bind(this)),this._handleErrors(t)),this._pipeNext(t)}.bind(this)):this._pipeNext(t):this.end()},CombinedStream.prototype._pipeNext=function(t){if(this._currentStream=t,CombinedStream.isStreamLike(t))return t.on("end",this._getNext.bind(this)),void t.pipe(this,{end:!1});var e=t;this.write(e),this._getNext()},CombinedStream.prototype._handleErrors=function(t){var e=this;t.on("error",function(t){e._emitError(t)})},CombinedStream.prototype.write=function(t){this.emit("data",t)},CombinedStream.prototype.pause=function(){this.pauseStreams&&(this.pauseStreams&&this._currentStream&&"function"==typeof this._currentStream.pause&&this._currentStream.pause(),this.emit("pause"))},CombinedStream.prototype.resume=function(){this._released||(this._released=!0,this.writable=!0,this._getNext()),this.pauseStreams&&this._currentStream&&"function"==typeof this._currentStream.resume&&this._currentStream.resume(),this.emit("resume")},CombinedStream.prototype.end=function(){this._reset(),this.emit("end")},CombinedStream.prototype.destroy=function(){this._reset(),this.emit("close")},CombinedStream.prototype._reset=function(){this.writable=!1,this._streams=[],this._currentStream=null},CombinedStream.prototype._checkDataSize=function(){if(this._updateDataSize(),!(this.dataSize<=this.maxDataSize)){var t="DelayedStream#maxDataSize of "+this.maxDataSize+" bytes exceeded.";this._emitError(new Error(t))}},CombinedStream.prototype._updateDataSize=function(){this.dataSize=0;var t=this;this._streams.forEach(function(e){e.dataSize&&(t.dataSize+=e.dataSize)}),this._currentStream&&this._currentStream.dataSize&&(this.dataSize+=this._currentStream.dataSize)},CombinedStream.prototype._emitError=function(t){this._reset(),this.emit("error",t)};

},{"delayed-stream":67,"stream":undefined,"util":undefined}],63:[function(require,module,exports){
"use strict";function useColors(){return!("undefined"==typeof window||!window.process||"renderer"!==window.process.type&&!window.process.__nwjs)||("undefined"==typeof navigator||!navigator.userAgent||!navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))&&("undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))}function formatArgs(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+module.exports.humanize(this.diff),this.useColors){var o="color: "+this.color;e.splice(1,0,o,"color: inherit");var t=0,C=0;e[0].replace(/%[a-zA-Z%]/g,function(e){"%%"!==e&&(t++,"%c"===e&&(C=t))}),e.splice(C,0,o)}}function save(e){try{e?exports.storage.setItem("debug",e):exports.storage.removeItem("debug")}catch(e){}}function load(){var e;try{e=exports.storage.getItem("debug")}catch(e){}return!e&&"undefined"!=typeof process&&"env"in process&&(e=process.env.DEBUG),e}function localstorage(){try{return localStorage}catch(e){}}exports.formatArgs=formatArgs,exports.save=save,exports.load=load,exports.useColors=useColors,exports.storage=localstorage(),exports.destroy=function(){var e=!1;return function(){e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}}(),exports.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],exports.log=console.debug||console.log||function(){},module.exports=require("./common")(exports);var formatters=module.exports.formatters;formatters.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}};

},{"./common":64}],64:[function(require,module,exports){
"use strict";function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,r){if(e){if("string"==typeof e)return _arrayLikeToArray(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,r):void 0}}function _iterableToArray(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _arrayLikeToArray(e,r){(null==r||r>e.length)&&(r=e.length);for(var n=0,t=new Array(r);n<r;n++)t[n]=e[n];return t}function setup(e){function r(e){var t,o,a,s=null;function i(){for(var e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];if(i.enabled){var a=i,s=Number(new Date),u=s-(t||s);a.diff=u,a.prev=t,a.curr=s,t=s,n[0]=r.coerce(n[0]),"string"!=typeof n[0]&&n.unshift("%O");var l=0;n[0]=n[0].replace(/%([a-zA-Z%])/g,function(e,t){if("%%"===e)return"%";l++;var o=r.formatters[t];if("function"==typeof o){var s=n[l];e=o.call(a,s),n.splice(l,1),l--}return e}),r.formatArgs.call(a,n),(a.log||r.log).apply(a,n)}}return i.namespace=e,i.useColors=r.useColors(),i.color=r.selectColor(e),i.extend=n,i.destroy=r.destroy,Object.defineProperty(i,"enabled",{enumerable:!0,configurable:!1,get:function(){return null!==s?s:(o!==r.namespaces&&(o=r.namespaces,a=r.enabled(e)),a)},set:function(e){s=e}}),"function"==typeof r.init&&r.init(i),i}function n(e,n){var t=r(this.namespace+(void 0===n?":":n)+e);return t.log=this.log,t}function t(e){return e.toString().substring(2,e.toString().length-2).replace(/\.\*\?$/,"*")}return r.debug=r,r.default=r,r.coerce=function(e){if(e instanceof Error)return e.stack||e.message;return e},r.disable=function(){var e=[].concat(_toConsumableArray(r.names.map(t)),_toConsumableArray(r.skips.map(t).map(function(e){return"-"+e}))).join(",");return r.enable(""),e},r.enable=function(e){var n;r.save(e),r.namespaces=e,r.names=[],r.skips=[];var t=("string"==typeof e?e:"").split(/[\s,]+/),o=t.length;for(n=0;n<o;n++)t[n]&&("-"===(e=t[n].replace(/\*/g,".*?"))[0]?r.skips.push(new RegExp("^"+e.substr(1)+"$")):r.names.push(new RegExp("^"+e+"$")))},r.enabled=function(e){if("*"===e[e.length-1])return!0;var n,t;for(n=0,t=r.skips.length;n<t;n++)if(r.skips[n].test(e))return!1;for(n=0,t=r.names.length;n<t;n++)if(r.names[n].test(e))return!0;return!1},r.humanize=require("ms"),r.destroy=function(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")},Object.keys(e).forEach(function(n){r[n]=e[n]}),r.names=[],r.skips=[],r.formatters={},r.selectColor=function(e){for(var n=0,t=0;t<e.length;t++)n=(n<<5)-n+e.charCodeAt(t),n|=0;return r.colors[Math.abs(n)%r.colors.length]},r.enable(r.load()),r}module.exports=setup;

},{"ms":76}],65:[function(require,module,exports){
"use strict";"undefined"==typeof process||"renderer"===process.type||!0===process.browser||process.__nwjs?module.exports=require("./browser.js"):module.exports=require("./node.js");

},{"./browser.js":63,"./node.js":66}],66:[function(require,module,exports){
"use strict";var tty=require("tty"),util=require("util");exports.init=init,exports.log=log,exports.formatArgs=formatArgs,exports.save=save,exports.load=load,exports.useColors=useColors,exports.destroy=util.deprecate(function(){},"Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."),exports.colors=[6,2,3,4,5,1];try{var supportsColor=require("supports-color");supportsColor&&(supportsColor.stderr||supportsColor).level>=2&&(exports.colors=[20,21,26,27,32,33,38,39,40,41,42,43,44,45,56,57,62,63,68,69,74,75,76,77,78,79,80,81,92,93,98,99,112,113,128,129,134,135,148,149,160,161,162,163,164,165,166,167,168,169,170,171,172,173,178,179,184,185,196,197,198,199,200,201,202,203,204,205,206,207,208,209,214,215,220,221])}catch(t){}function useColors(){return"colors"in exports.inspectOpts?Boolean(exports.inspectOpts.colors):tty.isatty(process.stderr.fd)}function formatArgs(t){var e=this.namespace;if(this.useColors){var s=this.color,r="[3"+(s<8?s:"8;5;"+s),o="  ".concat(r,";1m").concat(e," [0m");t[0]=o+t[0].split("\n").join("\n"+o),t.push(r+"m+"+module.exports.humanize(this.diff)+"[0m")}else t[0]=getDate()+e+" "+t[0]}function getDate(){return exports.inspectOpts.hideDate?"":(new Date).toISOString()+" "}function log(){return process.stderr.write(util.format.apply(util,arguments)+"\n")}function save(t){t?process.env.DEBUG=t:delete process.env.DEBUG}function load(){return process.env.DEBUG}function init(t){t.inspectOpts={};for(var e=Object.keys(exports.inspectOpts),s=0;s<e.length;s++)t.inspectOpts[e[s]]=exports.inspectOpts[e[s]]}exports.inspectOpts=Object.keys(process.env).filter(function(t){return/^debug_/i.test(t)}).reduce(function(t,e){var s=e.substring(6).toLowerCase().replace(/_([a-z])/g,function(t,e){return e.toUpperCase()}),r=process.env[e];return r=!!/^(yes|on|true|enabled)$/i.test(r)||!/^(no|off|false|disabled)$/i.test(r)&&("null"===r?null:Number(r)),t[s]=r,t},{}),module.exports=require("./common")(exports);var formatters=module.exports.formatters;formatters.o=function(t){return this.inspectOpts.colors=this.useColors,util.inspect(t,this.inspectOpts).split("\n").map(function(t){return t.trim()}).join(" ")},formatters.O=function(t){return this.inspectOpts.colors=this.useColors,util.inspect(t,this.inspectOpts)};

},{"./common":64,"supports-color":78,"tty":undefined,"util":undefined}],67:[function(require,module,exports){
"use strict";var Stream=require("stream").Stream,util=require("util");function DelayedStream(){this.source=null,this.dataSize=0,this.maxDataSize=1048576,this.pauseStream=!0,this._maxDataSizeExceeded=!1,this._released=!1,this._bufferedEvents=[]}module.exports=DelayedStream,util.inherits(DelayedStream,Stream),DelayedStream.create=function(e,t){var a=new this;for(var r in t=t||{})a[r]=t[r];a.source=e;var i=e.emit;return e.emit=function(){return a._handleEmit(arguments),i.apply(e,arguments)},e.on("error",function(){}),a.pauseStream&&e.pause(),a},Object.defineProperty(DelayedStream.prototype,"readable",{configurable:!0,enumerable:!0,get:function(){return this.source.readable}}),DelayedStream.prototype.setEncoding=function(){return this.source.setEncoding.apply(this.source,arguments)},DelayedStream.prototype.resume=function(){this._released||this.release(),this.source.resume()},DelayedStream.prototype.pause=function(){this.source.pause()},DelayedStream.prototype.release=function(){this._released=!0,this._bufferedEvents.forEach(function(e){this.emit.apply(this,e)}.bind(this)),this._bufferedEvents=[]},DelayedStream.prototype.pipe=function(){var e=Stream.prototype.pipe.apply(this,arguments);return this.resume(),e},DelayedStream.prototype._handleEmit=function(e){this._released?this.emit.apply(this,e):("data"===e[0]&&(this.dataSize+=e[1].length,this._checkIfMaxDataSizeExceeded()),this._bufferedEvents.push(e))},DelayedStream.prototype._checkIfMaxDataSizeExceeded=function(){if(!(this._maxDataSizeExceeded||this.dataSize<=this.maxDataSize)){this._maxDataSizeExceeded=!0;var e="DelayedStream#maxDataSize of "+this.maxDataSize+" bytes exceeded.";this.emit("error",new Error(e))}};

},{"stream":undefined,"util":undefined}],68:[function(require,module,exports){
"use strict";var debug;module.exports=function(){if(!debug){try{debug=require("debug")("follow-redirects")}catch(e){}"function"!=typeof debug&&(debug=function(){})}debug.apply(null,arguments)};

},{"debug":65}],69:[function(require,module,exports){
"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var url=require("url"),URL=url.URL,http=require("http"),https=require("https"),Writable=require("stream").Writable,assert=require("assert"),debug=require("./debug"),events=["abort","aborted","connect","error","socket","timeout"],eventHandlers=Object.create(null);events.forEach(function(e){eventHandlers[e]=function(t,r,o){this._redirectable.emit(e,t,r,o)}});var InvalidUrlError=createErrorType("ERR_INVALID_URL","Invalid URL",TypeError),RedirectionError=createErrorType("ERR_FR_REDIRECTION_FAILURE","Redirected request failed"),TooManyRedirectsError=createErrorType("ERR_FR_TOO_MANY_REDIRECTS","Maximum number of redirects exceeded"),MaxBodyLengthExceededError=createErrorType("ERR_FR_MAX_BODY_LENGTH_EXCEEDED","Request body larger than maxBodyLength limit"),WriteAfterEndError=createErrorType("ERR_STREAM_WRITE_AFTER_END","write after end"),destroy=Writable.prototype.destroy||noop;function RedirectableRequest(e,t){Writable.call(this),this._sanitizeOptions(e),this._options=e,this._ended=!1,this._ending=!1,this._redirectCount=0,this._redirects=[],this._requestBodyLength=0,this._requestBodyBuffers=[],t&&this.on("response",t);var r=this;this._onNativeResponse=function(e){r._processResponse(e)},this._performRequest()}function wrap(e){var t={maxRedirects:21,maxBodyLength:10485760},r={};return Object.keys(e).forEach(function(o){var s=o+":",i=r[s]=e[o],n=t[o]=Object.create(i);Object.defineProperties(n,{request:{value:function(e,o,i){if(isString(e)){var n;try{n=urlToOptions(new URL(e))}catch(t){n=url.parse(e)}if(!isString(n.protocol))throw new InvalidUrlError({input:e});e=n}else URL&&e instanceof URL?e=urlToOptions(e):(i=o,o=e,e={protocol:s});return isFunction(o)&&(i=o,o=null),(o=Object.assign({maxRedirects:t.maxRedirects,maxBodyLength:t.maxBodyLength},e,o)).nativeProtocols=r,isString(o.host)||isString(o.hostname)||(o.hostname="::1"),assert.equal(o.protocol,s,"protocol mismatch"),debug("options",o),new RedirectableRequest(o,i)},configurable:!0,enumerable:!0,writable:!0},get:{value:function(e,t,r){var o=n.request(e,t,r);return o.end(),o},configurable:!0,enumerable:!0,writable:!0}})}),t}function noop(){}function urlToOptions(e){var t={protocol:e.protocol,hostname:e.hostname.startsWith("[")?e.hostname.slice(1,-1):e.hostname,hash:e.hash,search:e.search,pathname:e.pathname,path:e.pathname+e.search,href:e.href};return""!==e.port&&(t.port=Number(e.port)),t}function removeMatchingHeaders(e,t){var r;for(var o in t)e.test(o)&&(r=t[o],delete t[o]);return null==r?void 0:String(r).trim()}function createErrorType(e,t,r){function o(r){Error.captureStackTrace(this,this.constructor),Object.assign(this,r||{}),this.code=e,this.message=this.cause?t+": "+this.cause.message:t}return o.prototype=new(r||Error),o.prototype.constructor=o,o.prototype.name="Error ["+e+"]",o}function destroyRequest(e,t){for(var r=0,o=events;r<o.length;r++){var s=o[r];e.removeListener(s,eventHandlers[s])}e.on("error",noop),e.destroy(t)}function isSubdomain(e,t){assert(isString(e)&&isString(t));var r=e.length-t.length-1;return r>0&&"."===e[r]&&e.endsWith(t)}function isString(e){return"string"==typeof e||e instanceof String}function isFunction(e){return"function"==typeof e}function isBuffer(e){return"object"===_typeof(e)&&"length"in e}RedirectableRequest.prototype=Object.create(Writable.prototype),RedirectableRequest.prototype.abort=function(){destroyRequest(this._currentRequest),this._currentRequest.abort(),this.emit("abort")},RedirectableRequest.prototype.destroy=function(e){return destroyRequest(this._currentRequest,e),destroy.call(this,e),this},RedirectableRequest.prototype.write=function(e,t,r){if(this._ending)throw new WriteAfterEndError;if(!isString(e)&&!isBuffer(e))throw new TypeError("data should be a string, Buffer or Uint8Array");isFunction(t)&&(r=t,t=null),0!==e.length?this._requestBodyLength+e.length<=this._options.maxBodyLength?(this._requestBodyLength+=e.length,this._requestBodyBuffers.push({data:e,encoding:t}),this._currentRequest.write(e,t,r)):(this.emit("error",new MaxBodyLengthExceededError),this.abort()):r&&r()},RedirectableRequest.prototype.end=function(e,t,r){if(isFunction(e)?(r=e,e=t=null):isFunction(t)&&(r=t,t=null),e){var o=this,s=this._currentRequest;this.write(e,t,function(){o._ended=!0,s.end(null,null,r)}),this._ending=!0}else this._ended=this._ending=!0,this._currentRequest.end(null,null,r)},RedirectableRequest.prototype.setHeader=function(e,t){this._options.headers[e]=t,this._currentRequest.setHeader(e,t)},RedirectableRequest.prototype.removeHeader=function(e){delete this._options.headers[e],this._currentRequest.removeHeader(e)},RedirectableRequest.prototype.setTimeout=function(e,t){var r=this;function o(t){t.setTimeout(e),t.removeListener("timeout",t.destroy),t.addListener("timeout",t.destroy)}function s(t){r._timeout&&clearTimeout(r._timeout),r._timeout=setTimeout(function(){r.emit("timeout"),i()},e),o(t)}function i(){r._timeout&&(clearTimeout(r._timeout),r._timeout=null),r.removeListener("abort",i),r.removeListener("error",i),r.removeListener("response",i),r.removeListener("close",i),t&&r.removeListener("timeout",t),r.socket||r._currentRequest.removeListener("socket",s)}return t&&this.on("timeout",t),this.socket?s(this.socket):this._currentRequest.once("socket",s),this.on("socket",o),this.on("abort",i),this.on("error",i),this.on("response",i),this.on("close",i),this},["flushHeaders","getHeader","setNoDelay","setSocketKeepAlive"].forEach(function(e){RedirectableRequest.prototype[e]=function(t,r){return this._currentRequest[e](t,r)}}),["aborted","connection","socket"].forEach(function(e){Object.defineProperty(RedirectableRequest.prototype,e,{get:function(){return this._currentRequest[e]}})}),RedirectableRequest.prototype._sanitizeOptions=function(e){if(e.headers||(e.headers={}),e.host&&(e.hostname||(e.hostname=e.host),delete e.host),!e.pathname&&e.path){var t=e.path.indexOf("?");t<0?e.pathname=e.path:(e.pathname=e.path.substring(0,t),e.search=e.path.substring(t))}},RedirectableRequest.prototype._performRequest=function(){var e=this._options.protocol,t=this._options.nativeProtocols[e];if(t){if(this._options.agents){var r=e.slice(0,-1);this._options.agent=this._options.agents[r]}var o=this._currentRequest=t.request(this._options,this._onNativeResponse);o._redirectable=this;for(var s=0,i=events;s<i.length;s++){var n=i[s];o.on(n,eventHandlers[n])}if(this._currentUrl=/^\//.test(this._options.path)?url.format(this._options):this._options.path,this._isRedirect){var a=0,u=this,h=this._requestBodyBuffers;!function e(t){if(o===u._currentRequest)if(t)u.emit("error",t);else if(a<h.length){var r=h[a++];o.finished||o.write(r.data,r.encoding,e)}else u._ended&&o.end()}()}}else this.emit("error",new TypeError("Unsupported protocol "+e))},RedirectableRequest.prototype._processResponse=function(e){var t=e.statusCode;this._options.trackRedirects&&this._redirects.push({url:this._currentUrl,headers:e.headers,statusCode:t});var r=e.headers.location;if(!r||!1===this._options.followRedirects||t<300||t>=400)return e.responseUrl=this._currentUrl,e.redirects=this._redirects,this.emit("response",e),void(this._requestBodyBuffers=[]);if(destroyRequest(this._currentRequest),e.destroy(),++this._redirectCount>this._options.maxRedirects)this.emit("error",new TooManyRedirectsError);else{var o,s=this._options.beforeRedirect;s&&(o=Object.assign({Host:e.req.getHeader("host")},this._options.headers));var i=this._options.method;((301===t||302===t)&&"POST"===this._options.method||303===t&&!/^(?:GET|HEAD)$/.test(this._options.method))&&(this._options.method="GET",this._requestBodyBuffers=[],removeMatchingHeaders(/^content-/i,this._options.headers));var n,a=removeMatchingHeaders(/^host$/i,this._options.headers),u=url.parse(this._currentUrl),h=a||u.host,c=/^\w+:/.test(r)?this._currentUrl:url.format(Object.assign(u,{host:h}));try{n=url.resolve(c,r)}catch(e){return void this.emit("error",new RedirectionError({cause:e}))}debug("redirecting to",n),this._isRedirect=!0;var d=url.parse(n);if(Object.assign(this._options,d),(d.protocol!==u.protocol&&"https:"!==d.protocol||d.host!==h&&!isSubdomain(d.host,h))&&removeMatchingHeaders(/^(?:authorization|cookie)$/i,this._options.headers),isFunction(s)){var p={headers:e.headers,statusCode:t},l={url:c,method:i,headers:o};try{s(this._options,p,l)}catch(e){return void this.emit("error",e)}this._sanitizeOptions(this._options)}try{this._performRequest()}catch(e){this.emit("error",new RedirectionError({cause:e}))}}},module.exports=wrap({http:http,https:https}),module.exports.wrap=wrap;

},{"./debug":68,"assert":undefined,"http":undefined,"https":undefined,"stream":undefined,"url":undefined}],70:[function(require,module,exports){
"use strict";function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var CombinedStream=require("combined-stream"),util=require("util"),path=require("path"),http=require("http"),https=require("https"),parseUrl=require("url").parse,fs=require("fs"),Stream=require("stream").Stream,mime=require("mime-types"),asynckit=require("asynckit"),populate=require("./populate.js");function FormData(t){if(!(this instanceof FormData))return new FormData(t);for(var e in this._overheadLength=0,this._valueLength=0,this._valuesToMeasure=[],CombinedStream.call(this),t=t||{})this[e]=t[e]}module.exports=FormData,util.inherits(FormData,CombinedStream),FormData.LINE_BREAK="\r\n",FormData.DEFAULT_CONTENT_TYPE="application/octet-stream",FormData.prototype.append=function(t,e,r){"string"==typeof(r=r||{})&&(r={filename:r});var o=CombinedStream.prototype.append.bind(this);if("number"==typeof e&&(e=""+e),util.isArray(e))this._error(new Error("Arrays are not supported."));else{var n=this._multiPartHeader(t,e,r),a=this._multiPartFooter();o(n),o(e),o(a),this._trackLength(n,e,r)}},FormData.prototype._trackLength=function(t,e,r){var o=0;null!=r.knownLength?o+=+r.knownLength:Buffer.isBuffer(e)?o=e.length:"string"==typeof e&&(o=Buffer.byteLength(e)),this._valueLength+=o,this._overheadLength+=Buffer.byteLength(t)+FormData.LINE_BREAK.length,e&&(e.path||e.readable&&e.hasOwnProperty("httpVersion")||e instanceof Stream)&&(r.knownLength||this._valuesToMeasure.push(e))},FormData.prototype._lengthRetriever=function(t,e){t.hasOwnProperty("fd")?null!=t.end&&t.end!=1/0&&null!=t.start?e(null,t.end+1-(t.start?t.start:0)):fs.stat(t.path,function(r,o){var n;r?e(r):(n=o.size-(t.start?t.start:0),e(null,n))}):t.hasOwnProperty("httpVersion")?e(null,+t.headers["content-length"]):t.hasOwnProperty("httpModule")?(t.on("response",function(r){t.pause(),e(null,+r.headers["content-length"])}),t.resume()):e("Unknown stream")},FormData.prototype._multiPartHeader=function(t,e,r){if("string"==typeof r.header)return r.header;var o,n=this._getContentDisposition(e,r),a=this._getContentType(e,r),s="",i={"Content-Disposition":["form-data",'name="'+t+'"'].concat(n||[]),"Content-Type":[].concat(a||[])};for(var h in"object"==_typeof(r.header)&&populate(i,r.header),i)i.hasOwnProperty(h)&&null!=(o=i[h])&&(Array.isArray(o)||(o=[o]),o.length&&(s+=h+": "+o.join("; ")+FormData.LINE_BREAK));return"--"+this.getBoundary()+FormData.LINE_BREAK+s+FormData.LINE_BREAK},FormData.prototype._getContentDisposition=function(t,e){var r,o;return"string"==typeof e.filepath?r=path.normalize(e.filepath).replace(/\\/g,"/"):e.filename||t.name||t.path?r=path.basename(e.filename||t.name||t.path):t.readable&&t.hasOwnProperty("httpVersion")&&(r=path.basename(t.client._httpMessage.path||"")),r&&(o='filename="'+r+'"'),o},FormData.prototype._getContentType=function(t,e){var r=e.contentType;return!r&&t.name&&(r=mime.lookup(t.name)),!r&&t.path&&(r=mime.lookup(t.path)),!r&&t.readable&&t.hasOwnProperty("httpVersion")&&(r=t.headers["content-type"]),r||!e.filepath&&!e.filename||(r=mime.lookup(e.filepath||e.filename)),r||"object"!=_typeof(t)||(r=FormData.DEFAULT_CONTENT_TYPE),r},FormData.prototype._multiPartFooter=function(){return function(t){var e=FormData.LINE_BREAK;0===this._streams.length&&(e+=this._lastBoundary()),t(e)}.bind(this)},FormData.prototype._lastBoundary=function(){return"--"+this.getBoundary()+"--"+FormData.LINE_BREAK},FormData.prototype.getHeaders=function(t){var e,r={"content-type":"multipart/form-data; boundary="+this.getBoundary()};for(e in t)t.hasOwnProperty(e)&&(r[e.toLowerCase()]=t[e]);return r},FormData.prototype.setBoundary=function(t){this._boundary=t},FormData.prototype.getBoundary=function(){return this._boundary||this._generateBoundary(),this._boundary},FormData.prototype.getBuffer=function(){for(var t=new Buffer.alloc(0),e=this.getBoundary(),r=0,o=this._streams.length;r<o;r++)"function"!=typeof this._streams[r]&&(t=Buffer.isBuffer(this._streams[r])?Buffer.concat([t,this._streams[r]]):Buffer.concat([t,Buffer.from(this._streams[r])]),"string"==typeof this._streams[r]&&this._streams[r].substring(2,e.length+2)===e||(t=Buffer.concat([t,Buffer.from(FormData.LINE_BREAK)])));return Buffer.concat([t,Buffer.from(this._lastBoundary())])},FormData.prototype._generateBoundary=function(){for(var t="--------------------------",e=0;e<24;e++)t+=Math.floor(10*Math.random()).toString(16);this._boundary=t},FormData.prototype.getLengthSync=function(){var t=this._overheadLength+this._valueLength;return this._streams.length&&(t+=this._lastBoundary().length),this.hasKnownLength()||this._error(new Error("Cannot calculate proper length in synchronous way.")),t},FormData.prototype.hasKnownLength=function(){var t=!0;return this._valuesToMeasure.length&&(t=!1),t},FormData.prototype.getLength=function(t){var e=this._overheadLength+this._valueLength;this._streams.length&&(e+=this._lastBoundary().length),this._valuesToMeasure.length?asynckit.parallel(this._valuesToMeasure,this._lengthRetriever,function(r,o){r?t(r):(o.forEach(function(t){e+=t}),t(null,e))}):process.nextTick(t.bind(this,null,e))},FormData.prototype.submit=function(t,e){var r,o,n={method:"post"};return"string"==typeof t?(t=parseUrl(t),o=populate({port:t.port,path:t.pathname,host:t.hostname,protocol:t.protocol},n)):(o=populate(t,n)).port||(o.port="https:"==o.protocol?443:80),o.headers=this.getHeaders(t.headers),r="https:"==o.protocol?https.request(o):http.request(o),this.getLength(function(t,o){if(t&&"Unknown stream"!==t)this._error(t);else if(o&&r.setHeader("Content-Length",o),this.pipe(r),e){var n,a=function t(o,a){return r.removeListener("error",t),r.removeListener("response",n),e.call(this,o,a)};n=a.bind(this,null),r.on("error",a),r.on("response",n)}}.bind(this)),r},FormData.prototype._error=function(t){this.error||(this.error=t,this.pause(),this.emit("error",t))},FormData.prototype.toString=function(){return"[object FormData]"};

},{"./populate.js":71,"asynckit":2,"combined-stream":62,"fs":undefined,"http":undefined,"https":undefined,"mime-types":75,"path":undefined,"stream":undefined,"url":undefined,"util":undefined}],71:[function(require,module,exports){
"use strict";module.exports=function(t,e){return Object.keys(e).forEach(function(c){t[c]=t[c]||e[c]}),t};

},{}],72:[function(require,module,exports){
"use strict";module.exports=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:process.argv,r=t.startsWith("-")?"":1===t.length?"-":"--",n=e.indexOf(r+t),s=e.indexOf("--");return-1!==n&&(-1===s||n<s)};

},{}],73:[function(require,module,exports){
module.exports={
  "application/1d-interleaved-parityfec": {
    "source": "iana"
  },
  "application/3gpdash-qoe-report+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true
  },
  "application/3gpp-ims+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/3gpphal+json": {
    "source": "iana",
    "compressible": true
  },
  "application/3gpphalforms+json": {
    "source": "iana",
    "compressible": true
  },
  "application/a2l": {
    "source": "iana"
  },
  "application/ace+cbor": {
    "source": "iana"
  },
  "application/activemessage": {
    "source": "iana"
  },
  "application/activity+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-costmap+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-costmapfilter+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-directory+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-endpointcost+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-endpointcostparams+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-endpointprop+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-endpointpropparams+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-error+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-networkmap+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-networkmapfilter+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-updatestreamcontrol+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-updatestreamparams+json": {
    "source": "iana",
    "compressible": true
  },
  "application/aml": {
    "source": "iana"
  },
  "application/andrew-inset": {
    "source": "iana",
    "extensions": ["ez"]
  },
  "application/applefile": {
    "source": "iana"
  },
  "application/applixware": {
    "source": "apache",
    "extensions": ["aw"]
  },
  "application/at+jwt": {
    "source": "iana"
  },
  "application/atf": {
    "source": "iana"
  },
  "application/atfx": {
    "source": "iana"
  },
  "application/atom+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["atom"]
  },
  "application/atomcat+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["atomcat"]
  },
  "application/atomdeleted+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["atomdeleted"]
  },
  "application/atomicmail": {
    "source": "iana"
  },
  "application/atomsvc+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["atomsvc"]
  },
  "application/atsc-dwd+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["dwd"]
  },
  "application/atsc-dynamic-event-message": {
    "source": "iana"
  },
  "application/atsc-held+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["held"]
  },
  "application/atsc-rdt+json": {
    "source": "iana",
    "compressible": true
  },
  "application/atsc-rsat+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rsat"]
  },
  "application/atxml": {
    "source": "iana"
  },
  "application/auth-policy+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/bacnet-xdd+zip": {
    "source": "iana",
    "compressible": false
  },
  "application/batch-smtp": {
    "source": "iana"
  },
  "application/bdoc": {
    "compressible": false,
    "extensions": ["bdoc"]
  },
  "application/beep+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true
  },
  "application/calendar+json": {
    "source": "iana",
    "compressible": true
  },
  "application/calendar+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xcs"]
  },
  "application/call-completion": {
    "source": "iana"
  },
  "application/cals-1840": {
    "source": "iana"
  },
  "application/captive+json": {
    "source": "iana",
    "compressible": true
  },
  "application/cbor": {
    "source": "iana"
  },
  "application/cbor-seq": {
    "source": "iana"
  },
  "application/cccex": {
    "source": "iana"
  },
  "application/ccmp+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/ccxml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["ccxml"]
  },
  "application/cdfx+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["cdfx"]
  },
  "application/cdmi-capability": {
    "source": "iana",
    "extensions": ["cdmia"]
  },
  "application/cdmi-container": {
    "source": "iana",
    "extensions": ["cdmic"]
  },
  "application/cdmi-domain": {
    "source": "iana",
    "extensions": ["cdmid"]
  },
  "application/cdmi-object": {
    "source": "iana",
    "extensions": ["cdmio"]
  },
  "application/cdmi-queue": {
    "source": "iana",
    "extensions": ["cdmiq"]
  },
  "application/cdni": {
    "source": "iana"
  },
  "application/cea": {
    "source": "iana"
  },
  "application/cea-2018+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/cellml+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/cfw": {
    "source": "iana"
  },
  "application/city+json": {
    "source": "iana",
    "compressible": true
  },
  "application/clr": {
    "source": "iana"
  },
  "application/clue+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/clue_info+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/cms": {
    "source": "iana"
  },
  "application/cnrp+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/coap-group+json": {
    "source": "iana",
    "compressible": true
  },
  "application/coap-payload": {
    "source": "iana"
  },
  "application/commonground": {
    "source": "iana"
  },
  "application/conference-info+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/cose": {
    "source": "iana"
  },
  "application/cose-key": {
    "source": "iana"
  },
  "application/cose-key-set": {
    "source": "iana"
  },
  "application/cpl+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["cpl"]
  },
  "application/csrattrs": {
    "source": "iana"
  },
  "application/csta+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/cstadata+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/csvm+json": {
    "source": "iana",
    "compressible": true
  },
  "application/cu-seeme": {
    "source": "apache",
    "extensions": ["cu"]
  },
  "application/cwt": {
    "source": "iana"
  },
  "application/cybercash": {
    "source": "iana"
  },
  "application/dart": {
    "compressible": true
  },
  "application/dash+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["mpd"]
  },
  "application/dash-patch+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["mpp"]
  },
  "application/dashdelta": {
    "source": "iana"
  },
  "application/davmount+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["davmount"]
  },
  "application/dca-rft": {
    "source": "iana"
  },
  "application/dcd": {
    "source": "iana"
  },
  "application/dec-dx": {
    "source": "iana"
  },
  "application/dialog-info+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/dicom": {
    "source": "iana"
  },
  "application/dicom+json": {
    "source": "iana",
    "compressible": true
  },
  "application/dicom+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/dii": {
    "source": "iana"
  },
  "application/dit": {
    "source": "iana"
  },
  "application/dns": {
    "source": "iana"
  },
  "application/dns+json": {
    "source": "iana",
    "compressible": true
  },
  "application/dns-message": {
    "source": "iana"
  },
  "application/docbook+xml": {
    "source": "apache",
    "compressible": true,
    "extensions": ["dbk"]
  },
  "application/dots+cbor": {
    "source": "iana"
  },
  "application/dskpp+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/dssc+der": {
    "source": "iana",
    "extensions": ["dssc"]
  },
  "application/dssc+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xdssc"]
  },
  "application/dvcs": {
    "source": "iana"
  },
  "application/ecmascript": {
    "source": "iana",
    "compressible": true,
    "extensions": ["es","ecma"]
  },
  "application/edi-consent": {
    "source": "iana"
  },
  "application/edi-x12": {
    "source": "iana",
    "compressible": false
  },
  "application/edifact": {
    "source": "iana",
    "compressible": false
  },
  "application/efi": {
    "source": "iana"
  },
  "application/elm+json": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true
  },
  "application/elm+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/emergencycalldata.cap+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true
  },
  "application/emergencycalldata.comment+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/emergencycalldata.control+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/emergencycalldata.deviceinfo+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/emergencycalldata.ecall.msd": {
    "source": "iana"
  },
  "application/emergencycalldata.providerinfo+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/emergencycalldata.serviceinfo+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/emergencycalldata.subscriberinfo+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/emergencycalldata.veds+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/emma+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["emma"]
  },
  "application/emotionml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["emotionml"]
  },
  "application/encaprtp": {
    "source": "iana"
  },
  "application/epp+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/epub+zip": {
    "source": "iana",
    "compressible": false,
    "extensions": ["epub"]
  },
  "application/eshop": {
    "source": "iana"
  },
  "application/exi": {
    "source": "iana",
    "extensions": ["exi"]
  },
  "application/expect-ct-report+json": {
    "source": "iana",
    "compressible": true
  },
  "application/express": {
    "source": "iana",
    "extensions": ["exp"]
  },
  "application/fastinfoset": {
    "source": "iana"
  },
  "application/fastsoap": {
    "source": "iana"
  },
  "application/fdt+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["fdt"]
  },
  "application/fhir+json": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true
  },
  "application/fhir+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true
  },
  "application/fido.trusted-apps+json": {
    "compressible": true
  },
  "application/fits": {
    "source": "iana"
  },
  "application/flexfec": {
    "source": "iana"
  },
  "application/font-sfnt": {
    "source": "iana"
  },
  "application/font-tdpfr": {
    "source": "iana",
    "extensions": ["pfr"]
  },
  "application/font-woff": {
    "source": "iana",
    "compressible": false
  },
  "application/framework-attributes+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/geo+json": {
    "source": "iana",
    "compressible": true,
    "extensions": ["geojson"]
  },
  "application/geo+json-seq": {
    "source": "iana"
  },
  "application/geopackage+sqlite3": {
    "source": "iana"
  },
  "application/geoxacml+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/gltf-buffer": {
    "source": "iana"
  },
  "application/gml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["gml"]
  },
  "application/gpx+xml": {
    "source": "apache",
    "compressible": true,
    "extensions": ["gpx"]
  },
  "application/gxf": {
    "source": "apache",
    "extensions": ["gxf"]
  },
  "application/gzip": {
    "source": "iana",
    "compressible": false,
    "extensions": ["gz"]
  },
  "application/h224": {
    "source": "iana"
  },
  "application/held+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/hjson": {
    "extensions": ["hjson"]
  },
  "application/http": {
    "source": "iana"
  },
  "application/hyperstudio": {
    "source": "iana",
    "extensions": ["stk"]
  },
  "application/ibe-key-request+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/ibe-pkg-reply+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/ibe-pp-data": {
    "source": "iana"
  },
  "application/iges": {
    "source": "iana"
  },
  "application/im-iscomposing+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true
  },
  "application/index": {
    "source": "iana"
  },
  "application/index.cmd": {
    "source": "iana"
  },
  "application/index.obj": {
    "source": "iana"
  },
  "application/index.response": {
    "source": "iana"
  },
  "application/index.vnd": {
    "source": "iana"
  },
  "application/inkml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["ink","inkml"]
  },
  "application/iotp": {
    "source": "iana"
  },
  "application/ipfix": {
    "source": "iana",
    "extensions": ["ipfix"]
  },
  "application/ipp": {
    "source": "iana"
  },
  "application/isup": {
    "source": "iana"
  },
  "application/its+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["its"]
  },
  "application/java-archive": {
    "source": "apache",
    "compressible": false,
    "extensions": ["jar","war","ear"]
  },
  "application/java-serialized-object": {
    "source": "apache",
    "compressible": false,
    "extensions": ["ser"]
  },
  "application/java-vm": {
    "source": "apache",
    "compressible": false,
    "extensions": ["class"]
  },
  "application/javascript": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
    "extensions": ["js","mjs"]
  },
  "application/jf2feed+json": {
    "source": "iana",
    "compressible": true
  },
  "application/jose": {
    "source": "iana"
  },
  "application/jose+json": {
    "source": "iana",
    "compressible": true
  },
  "application/jrd+json": {
    "source": "iana",
    "compressible": true
  },
  "application/jscalendar+json": {
    "source": "iana",
    "compressible": true
  },
  "application/json": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
    "extensions": ["json","map"]
  },
  "application/json-patch+json": {
    "source": "iana",
    "compressible": true
  },
  "application/json-seq": {
    "source": "iana"
  },
  "application/json5": {
    "extensions": ["json5"]
  },
  "application/jsonml+json": {
    "source": "apache",
    "compressible": true,
    "extensions": ["jsonml"]
  },
  "application/jwk+json": {
    "source": "iana",
    "compressible": true
  },
  "application/jwk-set+json": {
    "source": "iana",
    "compressible": true
  },
  "application/jwt": {
    "source": "iana"
  },
  "application/kpml-request+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/kpml-response+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/ld+json": {
    "source": "iana",
    "compressible": true,
    "extensions": ["jsonld"]
  },
  "application/lgr+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["lgr"]
  },
  "application/link-format": {
    "source": "iana"
  },
  "application/load-control+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/lost+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["lostxml"]
  },
  "application/lostsync+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/lpf+zip": {
    "source": "iana",
    "compressible": false
  },
  "application/lxf": {
    "source": "iana"
  },
  "application/mac-binhex40": {
    "source": "iana",
    "extensions": ["hqx"]
  },
  "application/mac-compactpro": {
    "source": "apache",
    "extensions": ["cpt"]
  },
  "application/macwriteii": {
    "source": "iana"
  },
  "application/mads+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["mads"]
  },
  "application/manifest+json": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
    "extensions": ["webmanifest"]
  },
  "application/marc": {
    "source": "iana",
    "extensions": ["mrc"]
  },
  "application/marcxml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["mrcx"]
  },
  "application/mathematica": {
    "source": "iana",
    "extensions": ["ma","nb","mb"]
  },
  "application/mathml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["mathml"]
  },
  "application/mathml-content+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/mathml-presentation+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/mbms-associated-procedure-description+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/mbms-deregister+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/mbms-envelope+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/mbms-msk+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/mbms-msk-response+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/mbms-protection-description+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/mbms-reception-report+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/mbms-register+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/mbms-register-response+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/mbms-schedule+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/mbms-user-service-description+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/mbox": {
    "source": "iana",
    "extensions": ["mbox"]
  },
  "application/media-policy-dataset+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["mpf"]
  },
  "application/media_control+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/mediaservercontrol+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["mscml"]
  },
  "application/merge-patch+json": {
    "source": "iana",
    "compressible": true
  },
  "application/metalink+xml": {
    "source": "apache",
    "compressible": true,
    "extensions": ["metalink"]
  },
  "application/metalink4+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["meta4"]
  },
  "application/mets+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["mets"]
  },
  "application/mf4": {
    "source": "iana"
  },
  "application/mikey": {
    "source": "iana"
  },
  "application/mipc": {
    "source": "iana"
  },
  "application/missing-blocks+cbor-seq": {
    "source": "iana"
  },
  "application/mmt-aei+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["maei"]
  },
  "application/mmt-usd+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["musd"]
  },
  "application/mods+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["mods"]
  },
  "application/moss-keys": {
    "source": "iana"
  },
  "application/moss-signature": {
    "source": "iana"
  },
  "application/mosskey-data": {
    "source": "iana"
  },
  "application/mosskey-request": {
    "source": "iana"
  },
  "application/mp21": {
    "source": "iana",
    "extensions": ["m21","mp21"]
  },
  "application/mp4": {
    "source": "iana",
    "extensions": ["mp4s","m4p"]
  },
  "application/mpeg4-generic": {
    "source": "iana"
  },
  "application/mpeg4-iod": {
    "source": "iana"
  },
  "application/mpeg4-iod-xmt": {
    "source": "iana"
  },
  "application/mrb-consumer+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/mrb-publish+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/msc-ivr+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true
  },
  "application/msc-mixer+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true
  },
  "application/msword": {
    "source": "iana",
    "compressible": false,
    "extensions": ["doc","dot"]
  },
  "application/mud+json": {
    "source": "iana",
    "compressible": true
  },
  "application/multipart-core": {
    "source": "iana"
  },
  "application/mxf": {
    "source": "iana",
    "extensions": ["mxf"]
  },
  "application/n-quads": {
    "source": "iana",
    "extensions": ["nq"]
  },
  "application/n-triples": {
    "source": "iana",
    "extensions": ["nt"]
  },
  "application/nasdata": {
    "source": "iana"
  },
  "application/news-checkgroups": {
    "source": "iana",
    "charset": "US-ASCII"
  },
  "application/news-groupinfo": {
    "source": "iana",
    "charset": "US-ASCII"
  },
  "application/news-transmission": {
    "source": "iana"
  },
  "application/nlsml+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/node": {
    "source": "iana",
    "extensions": ["cjs"]
  },
  "application/nss": {
    "source": "iana"
  },
  "application/oauth-authz-req+jwt": {
    "source": "iana"
  },
  "application/oblivious-dns-message": {
    "source": "iana"
  },
  "application/ocsp-request": {
    "source": "iana"
  },
  "application/ocsp-response": {
    "source": "iana"
  },
  "application/octet-stream": {
    "source": "iana",
    "compressible": false,
    "extensions": ["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"]
  },
  "application/oda": {
    "source": "iana",
    "extensions": ["oda"]
  },
  "application/odm+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/odx": {
    "source": "iana"
  },
  "application/oebps-package+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["opf"]
  },
  "application/ogg": {
    "source": "iana",
    "compressible": false,
    "extensions": ["ogx"]
  },
  "application/omdoc+xml": {
    "source": "apache",
    "compressible": true,
    "extensions": ["omdoc"]
  },
  "application/onenote": {
    "source": "apache",
    "extensions": ["onetoc","onetoc2","onetmp","onepkg"]
  },
  "application/opc-nodeset+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/oscore": {
    "source": "iana"
  },
  "application/oxps": {
    "source": "iana",
    "extensions": ["oxps"]
  },
  "application/p21": {
    "source": "iana"
  },
  "application/p21+zip": {
    "source": "iana",
    "compressible": false
  },
  "application/p2p-overlay+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["relo"]
  },
  "application/parityfec": {
    "source": "iana"
  },
  "application/passport": {
    "source": "iana"
  },
  "application/patch-ops-error+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xer"]
  },
  "application/pdf": {
    "source": "iana",
    "compressible": false,
    "extensions": ["pdf"]
  },
  "application/pdx": {
    "source": "iana"
  },
  "application/pem-certificate-chain": {
    "source": "iana"
  },
  "application/pgp-encrypted": {
    "source": "iana",
    "compressible": false,
    "extensions": ["pgp"]
  },
  "application/pgp-keys": {
    "source": "iana",
    "extensions": ["asc"]
  },
  "application/pgp-signature": {
    "source": "iana",
    "extensions": ["asc","sig"]
  },
  "application/pics-rules": {
    "source": "apache",
    "extensions": ["prf"]
  },
  "application/pidf+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true
  },
  "application/pidf-diff+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true
  },
  "application/pkcs10": {
    "source": "iana",
    "extensions": ["p10"]
  },
  "application/pkcs12": {
    "source": "iana"
  },
  "application/pkcs7-mime": {
    "source": "iana",
    "extensions": ["p7m","p7c"]
  },
  "application/pkcs7-signature": {
    "source": "iana",
    "extensions": ["p7s"]
  },
  "application/pkcs8": {
    "source": "iana",
    "extensions": ["p8"]
  },
  "application/pkcs8-encrypted": {
    "source": "iana"
  },
  "application/pkix-attr-cert": {
    "source": "iana",
    "extensions": ["ac"]
  },
  "application/pkix-cert": {
    "source": "iana",
    "extensions": ["cer"]
  },
  "application/pkix-crl": {
    "source": "iana",
    "extensions": ["crl"]
  },
  "application/pkix-pkipath": {
    "source": "iana",
    "extensions": ["pkipath"]
  },
  "application/pkixcmp": {
    "source": "iana",
    "extensions": ["pki"]
  },
  "application/pls+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["pls"]
  },
  "application/poc-settings+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true
  },
  "application/postscript": {
    "source": "iana",
    "compressible": true,
    "extensions": ["ai","eps","ps"]
  },
  "application/ppsp-tracker+json": {
    "source": "iana",
    "compressible": true
  },
  "application/problem+json": {
    "source": "iana",
    "compressible": true
  },
  "application/problem+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/provenance+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["provx"]
  },
  "application/prs.alvestrand.titrax-sheet": {
    "source": "iana"
  },
  "application/prs.cww": {
    "source": "iana",
    "extensions": ["cww"]
  },
  "application/prs.cyn": {
    "source": "iana",
    "charset": "7-BIT"
  },
  "application/prs.hpub+zip": {
    "source": "iana",
    "compressible": false
  },
  "application/prs.nprend": {
    "source": "iana"
  },
  "application/prs.plucker": {
    "source": "iana"
  },
  "application/prs.rdf-xml-crypt": {
    "source": "iana"
  },
  "application/prs.xsf+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/pskc+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["pskcxml"]
  },
  "application/pvd+json": {
    "source": "iana",
    "compressible": true
  },
  "application/qsig": {
    "source": "iana"
  },
  "application/raml+yaml": {
    "compressible": true,
    "extensions": ["raml"]
  },
  "application/raptorfec": {
    "source": "iana"
  },
  "application/rdap+json": {
    "source": "iana",
    "compressible": true
  },
  "application/rdf+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rdf","owl"]
  },
  "application/reginfo+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rif"]
  },
  "application/relax-ng-compact-syntax": {
    "source": "iana",
    "extensions": ["rnc"]
  },
  "application/remote-printing": {
    "source": "iana"
  },
  "application/reputon+json": {
    "source": "iana",
    "compressible": true
  },
  "application/resource-lists+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rl"]
  },
  "application/resource-lists-diff+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rld"]
  },
  "application/rfc+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/riscos": {
    "source": "iana"
  },
  "application/rlmi+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/rls-services+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rs"]
  },
  "application/route-apd+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rapd"]
  },
  "application/route-s-tsid+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["sls"]
  },
  "application/route-usd+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rusd"]
  },
  "application/rpki-ghostbusters": {
    "source": "iana",
    "extensions": ["gbr"]
  },
  "application/rpki-manifest": {
    "source": "iana",
    "extensions": ["mft"]
  },
  "application/rpki-publication": {
    "source": "iana"
  },
  "application/rpki-roa": {
    "source": "iana",
    "extensions": ["roa"]
  },
  "application/rpki-updown": {
    "source": "iana"
  },
  "application/rsd+xml": {
    "source": "apache",
    "compressible": true,
    "extensions": ["rsd"]
  },
  "application/rss+xml": {
    "source": "apache",
    "compressible": true,
    "extensions": ["rss"]
  },
  "application/rtf": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rtf"]
  },
  "application/rtploopback": {
    "source": "iana"
  },
  "application/rtx": {
    "source": "iana"
  },
  "application/samlassertion+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/samlmetadata+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/sarif+json": {
    "source": "iana",
    "compressible": true
  },
  "application/sarif-external-properties+json": {
    "source": "iana",
    "compressible": true
  },
  "application/sbe": {
    "source": "iana"
  },
  "application/sbml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["sbml"]
  },
  "application/scaip+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/scim+json": {
    "source": "iana",
    "compressible": true
  },
  "application/scvp-cv-request": {
    "source": "iana",
    "extensions": ["scq"]
  },
  "application/scvp-cv-response": {
    "source": "iana",
    "extensions": ["scs"]
  },
  "application/scvp-vp-request": {
    "source": "iana",
    "extensions": ["spq"]
  },
  "application/scvp-vp-response": {
    "source": "iana",
    "extensions": ["spp"]
  },
  "application/sdp": {
    "source": "iana",
    "extensions": ["sdp"]
  },
  "application/secevent+jwt": {
    "source": "iana"
  },
  "application/senml+cbor": {
    "source": "iana"
  },
  "application/senml+json": {
    "source": "iana",
    "compressible": true
  },
  "application/senml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["senmlx"]
  },
  "application/senml-etch+cbor": {
    "source": "iana"
  },
  "application/senml-etch+json": {
    "source": "iana",
    "compressible": true
  },
  "application/senml-exi": {
    "source": "iana"
  },
  "application/sensml+cbor": {
    "source": "iana"
  },
  "application/sensml+json": {
    "source": "iana",
    "compressible": true
  },
  "application/sensml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["sensmlx"]
  },
  "application/sensml-exi": {
    "source": "iana"
  },
  "application/sep+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/sep-exi": {
    "source": "iana"
  },
  "application/session-info": {
    "source": "iana"
  },
  "application/set-payment": {
    "source": "iana"
  },
  "application/set-payment-initiation": {
    "source": "iana",
    "extensions": ["setpay"]
  },
  "application/set-registration": {
    "source": "iana"
  },
  "application/set-registration-initiation": {
    "source": "iana",
    "extensions": ["setreg"]
  },
  "application/sgml": {
    "source": "iana"
  },
  "application/sgml-open-catalog": {
    "source": "iana"
  },
  "application/shf+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["shf"]
  },
  "application/sieve": {
    "source": "iana",
    "extensions": ["siv","sieve"]
  },
  "application/simple-filter+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/simple-message-summary": {
    "source": "iana"
  },
  "application/simplesymbolcontainer": {
    "source": "iana"
  },
  "application/sipc": {
    "source": "iana"
  },
  "application/slate": {
    "source": "iana"
  },
  "application/smil": {
    "source": "iana"
  },
  "application/smil+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["smi","smil"]
  },
  "application/smpte336m": {
    "source": "iana"
  },
  "application/soap+fastinfoset": {
    "source": "iana"
  },
  "application/soap+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/sparql-query": {
    "source": "iana",
    "extensions": ["rq"]
  },
  "application/sparql-results+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["srx"]
  },
  "application/spdx+json": {
    "source": "iana",
    "compressible": true
  },
  "application/spirits-event+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/sql": {
    "source": "iana"
  },
  "application/srgs": {
    "source": "iana",
    "extensions": ["gram"]
  },
  "application/srgs+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["grxml"]
  },
  "application/sru+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["sru"]
  },
  "application/ssdl+xml": {
    "source": "apache",
    "compressible": true,
    "extensions": ["ssdl"]
  },
  "application/ssml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["ssml"]
  },
  "application/stix+json": {
    "source": "iana",
    "compressible": true
  },
  "application/swid+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["swidtag"]
  },
  "application/tamp-apex-update": {
    "source": "iana"
  },
  "application/tamp-apex-update-confirm": {
    "source": "iana"
  },
  "application/tamp-community-update": {
    "source": "iana"
  },
  "application/tamp-community-update-confirm": {
    "source": "iana"
  },
  "application/tamp-error": {
    "source": "iana"
  },
  "application/tamp-sequence-adjust": {
    "source": "iana"
  },
  "application/tamp-sequence-adjust-confirm": {
    "source": "iana"
  },
  "application/tamp-status-query": {
    "source": "iana"
  },
  "application/tamp-status-response": {
    "source": "iana"
  },
  "application/tamp-update": {
    "source": "iana"
  },
  "application/tamp-update-confirm": {
    "source": "iana"
  },
  "application/tar": {
    "compressible": true
  },
  "application/taxii+json": {
    "source": "iana",
    "compressible": true
  },
  "application/td+json": {
    "source": "iana",
    "compressible": true
  },
  "application/tei+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["tei","teicorpus"]
  },
  "application/tetra_isi": {
    "source": "iana"
  },
  "application/thraud+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["tfi"]
  },
  "application/timestamp-query": {
    "source": "iana"
  },
  "application/timestamp-reply": {
    "source": "iana"
  },
  "application/timestamped-data": {
    "source": "iana",
    "extensions": ["tsd"]
  },
  "application/tlsrpt+gzip": {
    "source": "iana"
  },
  "application/tlsrpt+json": {
    "source": "iana",
    "compressible": true
  },
  "application/tnauthlist": {
    "source": "iana"
  },
  "application/token-introspection+jwt": {
    "source": "iana"
  },
  "application/toml": {
    "compressible": true,
    "extensions": ["toml"]
  },
  "application/trickle-ice-sdpfrag": {
    "source": "iana"
  },
  "application/trig": {
    "source": "iana",
    "extensions": ["trig"]
  },
  "application/ttml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["ttml"]
  },
  "application/tve-trigger": {
    "source": "iana"
  },
  "application/tzif": {
    "source": "iana"
  },
  "application/tzif-leap": {
    "source": "iana"
  },
  "application/ubjson": {
    "compressible": false,
    "extensions": ["ubj"]
  },
  "application/ulpfec": {
    "source": "iana"
  },
  "application/urc-grpsheet+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/urc-ressheet+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rsheet"]
  },
  "application/urc-targetdesc+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["td"]
  },
  "application/urc-uisocketdesc+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vcard+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vcard+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vemmi": {
    "source": "iana"
  },
  "application/vividence.scriptfile": {
    "source": "apache"
  },
  "application/vnd.1000minds.decision-model+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["1km"]
  },
  "application/vnd.3gpp-prose+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp-prose-pc3ch+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp-v2x-local-service-information": {
    "source": "iana"
  },
  "application/vnd.3gpp.5gnas": {
    "source": "iana"
  },
  "application/vnd.3gpp.access-transfer-events+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.bsf+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.gmop+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.gtpc": {
    "source": "iana"
  },
  "application/vnd.3gpp.interworking-data": {
    "source": "iana"
  },
  "application/vnd.3gpp.lpp": {
    "source": "iana"
  },
  "application/vnd.3gpp.mc-signalling-ear": {
    "source": "iana"
  },
  "application/vnd.3gpp.mcdata-affiliation-command+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.mcdata-info+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.mcdata-payload": {
    "source": "iana"
  },
  "application/vnd.3gpp.mcdata-service-config+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.mcdata-signalling": {
    "source": "iana"
  },
  "application/vnd.3gpp.mcdata-ue-config+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.mcdata-user-profile+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.mcptt-affiliation-command+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.mcptt-floor-request+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.mcptt-info+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.mcptt-location-info+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.mcptt-service-config+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.mcptt-signed+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.mcptt-ue-config+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.mcptt-ue-init-config+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.mcptt-user-profile+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.mcvideo-info+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.mcvideo-location-info+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.mcvideo-service-config+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.mcvideo-transmission-request+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.mcvideo-ue-config+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.mcvideo-user-profile+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.mid-call+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.ngap": {
    "source": "iana"
  },
  "application/vnd.3gpp.pfcp": {
    "source": "iana"
  },
  "application/vnd.3gpp.pic-bw-large": {
    "source": "iana",
    "extensions": ["plb"]
  },
  "application/vnd.3gpp.pic-bw-small": {
    "source": "iana",
    "extensions": ["psb"]
  },
  "application/vnd.3gpp.pic-bw-var": {
    "source": "iana",
    "extensions": ["pvb"]
  },
  "application/vnd.3gpp.s1ap": {
    "source": "iana"
  },
  "application/vnd.3gpp.sms": {
    "source": "iana"
  },
  "application/vnd.3gpp.sms+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.srvcc-ext+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.srvcc-info+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.state-and-event-info+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp.ussd+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp2.bcmcsinfo+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.3gpp2.sms": {
    "source": "iana"
  },
  "application/vnd.3gpp2.tcap": {
    "source": "iana",
    "extensions": ["tcap"]
  },
  "application/vnd.3lightssoftware.imagescal": {
    "source": "iana"
  },
  "application/vnd.3m.post-it-notes": {
    "source": "iana",
    "extensions": ["pwn"]
  },
  "application/vnd.accpac.simply.aso": {
    "source": "iana",
    "extensions": ["aso"]
  },
  "application/vnd.accpac.simply.imp": {
    "source": "iana",
    "extensions": ["imp"]
  },
  "application/vnd.acucobol": {
    "source": "iana",
    "extensions": ["acu"]
  },
  "application/vnd.acucorp": {
    "source": "iana",
    "extensions": ["atc","acutc"]
  },
  "application/vnd.adobe.air-application-installer-package+zip": {
    "source": "apache",
    "compressible": false,
    "extensions": ["air"]
  },
  "application/vnd.adobe.flash.movie": {
    "source": "iana"
  },
  "application/vnd.adobe.formscentral.fcdt": {
    "source": "iana",
    "extensions": ["fcdt"]
  },
  "application/vnd.adobe.fxp": {
    "source": "iana",
    "extensions": ["fxp","fxpl"]
  },
  "application/vnd.adobe.partial-upload": {
    "source": "iana"
  },
  "application/vnd.adobe.xdp+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xdp"]
  },
  "application/vnd.adobe.xfdf": {
    "source": "iana",
    "extensions": ["xfdf"]
  },
  "application/vnd.aether.imp": {
    "source": "iana"
  },
  "application/vnd.afpc.afplinedata": {
    "source": "iana"
  },
  "application/vnd.afpc.afplinedata-pagedef": {
    "source": "iana"
  },
  "application/vnd.afpc.cmoca-cmresource": {
    "source": "iana"
  },
  "application/vnd.afpc.foca-charset": {
    "source": "iana"
  },
  "application/vnd.afpc.foca-codedfont": {
    "source": "iana"
  },
  "application/vnd.afpc.foca-codepage": {
    "source": "iana"
  },
  "application/vnd.afpc.modca": {
    "source": "iana"
  },
  "application/vnd.afpc.modca-cmtable": {
    "source": "iana"
  },
  "application/vnd.afpc.modca-formdef": {
    "source": "iana"
  },
  "application/vnd.afpc.modca-mediummap": {
    "source": "iana"
  },
  "application/vnd.afpc.modca-objectcontainer": {
    "source": "iana"
  },
  "application/vnd.afpc.modca-overlay": {
    "source": "iana"
  },
  "application/vnd.afpc.modca-pagesegment": {
    "source": "iana"
  },
  "application/vnd.age": {
    "source": "iana",
    "extensions": ["age"]
  },
  "application/vnd.ah-barcode": {
    "source": "iana"
  },
  "application/vnd.ahead.space": {
    "source": "iana",
    "extensions": ["ahead"]
  },
  "application/vnd.airzip.filesecure.azf": {
    "source": "iana",
    "extensions": ["azf"]
  },
  "application/vnd.airzip.filesecure.azs": {
    "source": "iana",
    "extensions": ["azs"]
  },
  "application/vnd.amadeus+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.amazon.ebook": {
    "source": "apache",
    "extensions": ["azw"]
  },
  "application/vnd.amazon.mobi8-ebook": {
    "source": "iana"
  },
  "application/vnd.americandynamics.acc": {
    "source": "iana",
    "extensions": ["acc"]
  },
  "application/vnd.amiga.ami": {
    "source": "iana",
    "extensions": ["ami"]
  },
  "application/vnd.amundsen.maze+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.android.ota": {
    "source": "iana"
  },
  "application/vnd.android.package-archive": {
    "source": "apache",
    "compressible": false,
    "extensions": ["apk"]
  },
  "application/vnd.anki": {
    "source": "iana"
  },
  "application/vnd.anser-web-certificate-issue-initiation": {
    "source": "iana",
    "extensions": ["cii"]
  },
  "application/vnd.anser-web-funds-transfer-initiation": {
    "source": "apache",
    "extensions": ["fti"]
  },
  "application/vnd.antix.game-component": {
    "source": "iana",
    "extensions": ["atx"]
  },
  "application/vnd.apache.arrow.file": {
    "source": "iana"
  },
  "application/vnd.apache.arrow.stream": {
    "source": "iana"
  },
  "application/vnd.apache.thrift.binary": {
    "source": "iana"
  },
  "application/vnd.apache.thrift.compact": {
    "source": "iana"
  },
  "application/vnd.apache.thrift.json": {
    "source": "iana"
  },
  "application/vnd.api+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.aplextor.warrp+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.apothekende.reservation+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.apple.installer+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["mpkg"]
  },
  "application/vnd.apple.keynote": {
    "source": "iana",
    "extensions": ["key"]
  },
  "application/vnd.apple.mpegurl": {
    "source": "iana",
    "extensions": ["m3u8"]
  },
  "application/vnd.apple.numbers": {
    "source": "iana",
    "extensions": ["numbers"]
  },
  "application/vnd.apple.pages": {
    "source": "iana",
    "extensions": ["pages"]
  },
  "application/vnd.apple.pkpass": {
    "compressible": false,
    "extensions": ["pkpass"]
  },
  "application/vnd.arastra.swi": {
    "source": "iana"
  },
  "application/vnd.aristanetworks.swi": {
    "source": "iana",
    "extensions": ["swi"]
  },
  "application/vnd.artisan+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.artsquare": {
    "source": "iana"
  },
  "application/vnd.astraea-software.iota": {
    "source": "iana",
    "extensions": ["iota"]
  },
  "application/vnd.audiograph": {
    "source": "iana",
    "extensions": ["aep"]
  },
  "application/vnd.autopackage": {
    "source": "iana"
  },
  "application/vnd.avalon+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.avistar+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.balsamiq.bmml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["bmml"]
  },
  "application/vnd.balsamiq.bmpr": {
    "source": "iana"
  },
  "application/vnd.banana-accounting": {
    "source": "iana"
  },
  "application/vnd.bbf.usp.error": {
    "source": "iana"
  },
  "application/vnd.bbf.usp.msg": {
    "source": "iana"
  },
  "application/vnd.bbf.usp.msg+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.bekitzur-stech+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.bint.med-content": {
    "source": "iana"
  },
  "application/vnd.biopax.rdf+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.blink-idb-value-wrapper": {
    "source": "iana"
  },
  "application/vnd.blueice.multipass": {
    "source": "iana",
    "extensions": ["mpm"]
  },
  "application/vnd.bluetooth.ep.oob": {
    "source": "iana"
  },
  "application/vnd.bluetooth.le.oob": {
    "source": "iana"
  },
  "application/vnd.bmi": {
    "source": "iana",
    "extensions": ["bmi"]
  },
  "application/vnd.bpf": {
    "source": "iana"
  },
  "application/vnd.bpf3": {
    "source": "iana"
  },
  "application/vnd.businessobjects": {
    "source": "iana",
    "extensions": ["rep"]
  },
  "application/vnd.byu.uapi+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.cab-jscript": {
    "source": "iana"
  },
  "application/vnd.canon-cpdl": {
    "source": "iana"
  },
  "application/vnd.canon-lips": {
    "source": "iana"
  },
  "application/vnd.capasystems-pg+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.cendio.thinlinc.clientconf": {
    "source": "iana"
  },
  "application/vnd.century-systems.tcp_stream": {
    "source": "iana"
  },
  "application/vnd.chemdraw+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["cdxml"]
  },
  "application/vnd.chess-pgn": {
    "source": "iana"
  },
  "application/vnd.chipnuts.karaoke-mmd": {
    "source": "iana",
    "extensions": ["mmd"]
  },
  "application/vnd.ciedi": {
    "source": "iana"
  },
  "application/vnd.cinderella": {
    "source": "iana",
    "extensions": ["cdy"]
  },
  "application/vnd.cirpack.isdn-ext": {
    "source": "iana"
  },
  "application/vnd.citationstyles.style+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["csl"]
  },
  "application/vnd.claymore": {
    "source": "iana",
    "extensions": ["cla"]
  },
  "application/vnd.cloanto.rp9": {
    "source": "iana",
    "extensions": ["rp9"]
  },
  "application/vnd.clonk.c4group": {
    "source": "iana",
    "extensions": ["c4g","c4d","c4f","c4p","c4u"]
  },
  "application/vnd.cluetrust.cartomobile-config": {
    "source": "iana",
    "extensions": ["c11amc"]
  },
  "application/vnd.cluetrust.cartomobile-config-pkg": {
    "source": "iana",
    "extensions": ["c11amz"]
  },
  "application/vnd.coffeescript": {
    "source": "iana"
  },
  "application/vnd.collabio.xodocuments.document": {
    "source": "iana"
  },
  "application/vnd.collabio.xodocuments.document-template": {
    "source": "iana"
  },
  "application/vnd.collabio.xodocuments.presentation": {
    "source": "iana"
  },
  "application/vnd.collabio.xodocuments.presentation-template": {
    "source": "iana"
  },
  "application/vnd.collabio.xodocuments.spreadsheet": {
    "source": "iana"
  },
  "application/vnd.collabio.xodocuments.spreadsheet-template": {
    "source": "iana"
  },
  "application/vnd.collection+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.collection.doc+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.collection.next+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.comicbook+zip": {
    "source": "iana",
    "compressible": false
  },
  "application/vnd.comicbook-rar": {
    "source": "iana"
  },
  "application/vnd.commerce-battelle": {
    "source": "iana"
  },
  "application/vnd.commonspace": {
    "source": "iana",
    "extensions": ["csp"]
  },
  "application/vnd.contact.cmsg": {
    "source": "iana",
    "extensions": ["cdbcmsg"]
  },
  "application/vnd.coreos.ignition+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.cosmocaller": {
    "source": "iana",
    "extensions": ["cmc"]
  },
  "application/vnd.crick.clicker": {
    "source": "iana",
    "extensions": ["clkx"]
  },
  "application/vnd.crick.clicker.keyboard": {
    "source": "iana",
    "extensions": ["clkk"]
  },
  "application/vnd.crick.clicker.palette": {
    "source": "iana",
    "extensions": ["clkp"]
  },
  "application/vnd.crick.clicker.template": {
    "source": "iana",
    "extensions": ["clkt"]
  },
  "application/vnd.crick.clicker.wordbank": {
    "source": "iana",
    "extensions": ["clkw"]
  },
  "application/vnd.criticaltools.wbs+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["wbs"]
  },
  "application/vnd.cryptii.pipe+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.crypto-shade-file": {
    "source": "iana"
  },
  "application/vnd.cryptomator.encrypted": {
    "source": "iana"
  },
  "application/vnd.cryptomator.vault": {
    "source": "iana"
  },
  "application/vnd.ctc-posml": {
    "source": "iana",
    "extensions": ["pml"]
  },
  "application/vnd.ctct.ws+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.cups-pdf": {
    "source": "iana"
  },
  "application/vnd.cups-postscript": {
    "source": "iana"
  },
  "application/vnd.cups-ppd": {
    "source": "iana",
    "extensions": ["ppd"]
  },
  "application/vnd.cups-raster": {
    "source": "iana"
  },
  "application/vnd.cups-raw": {
    "source": "iana"
  },
  "application/vnd.curl": {
    "source": "iana"
  },
  "application/vnd.curl.car": {
    "source": "apache",
    "extensions": ["car"]
  },
  "application/vnd.curl.pcurl": {
    "source": "apache",
    "extensions": ["pcurl"]
  },
  "application/vnd.cyan.dean.root+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.cybank": {
    "source": "iana"
  },
  "application/vnd.cyclonedx+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.cyclonedx+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.d2l.coursepackage1p0+zip": {
    "source": "iana",
    "compressible": false
  },
  "application/vnd.d3m-dataset": {
    "source": "iana"
  },
  "application/vnd.d3m-problem": {
    "source": "iana"
  },
  "application/vnd.dart": {
    "source": "iana",
    "compressible": true,
    "extensions": ["dart"]
  },
  "application/vnd.data-vision.rdz": {
    "source": "iana",
    "extensions": ["rdz"]
  },
  "application/vnd.datapackage+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.dataresource+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.dbf": {
    "source": "iana",
    "extensions": ["dbf"]
  },
  "application/vnd.debian.binary-package": {
    "source": "iana"
  },
  "application/vnd.dece.data": {
    "source": "iana",
    "extensions": ["uvf","uvvf","uvd","uvvd"]
  },
  "application/vnd.dece.ttml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["uvt","uvvt"]
  },
  "application/vnd.dece.unspecified": {
    "source": "iana",
    "extensions": ["uvx","uvvx"]
  },
  "application/vnd.dece.zip": {
    "source": "iana",
    "extensions": ["uvz","uvvz"]
  },
  "application/vnd.denovo.fcselayout-link": {
    "source": "iana",
    "extensions": ["fe_launch"]
  },
  "application/vnd.desmume.movie": {
    "source": "iana"
  },
  "application/vnd.dir-bi.plate-dl-nosuffix": {
    "source": "iana"
  },
  "application/vnd.dm.delegation+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.dna": {
    "source": "iana",
    "extensions": ["dna"]
  },
  "application/vnd.document+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.dolby.mlp": {
    "source": "apache",
    "extensions": ["mlp"]
  },
  "application/vnd.dolby.mobile.1": {
    "source": "iana"
  },
  "application/vnd.dolby.mobile.2": {
    "source": "iana"
  },
  "application/vnd.doremir.scorecloud-binary-document": {
    "source": "iana"
  },
  "application/vnd.dpgraph": {
    "source": "iana",
    "extensions": ["dpg"]
  },
  "application/vnd.dreamfactory": {
    "source": "iana",
    "extensions": ["dfac"]
  },
  "application/vnd.drive+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.ds-keypoint": {
    "source": "apache",
    "extensions": ["kpxx"]
  },
  "application/vnd.dtg.local": {
    "source": "iana"
  },
  "application/vnd.dtg.local.flash": {
    "source": "iana"
  },
  "application/vnd.dtg.local.html": {
    "source": "iana"
  },
  "application/vnd.dvb.ait": {
    "source": "iana",
    "extensions": ["ait"]
  },
  "application/vnd.dvb.dvbisl+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.dvb.dvbj": {
    "source": "iana"
  },
  "application/vnd.dvb.esgcontainer": {
    "source": "iana"
  },
  "application/vnd.dvb.ipdcdftnotifaccess": {
    "source": "iana"
  },
  "application/vnd.dvb.ipdcesgaccess": {
    "source": "iana"
  },
  "application/vnd.dvb.ipdcesgaccess2": {
    "source": "iana"
  },
  "application/vnd.dvb.ipdcesgpdd": {
    "source": "iana"
  },
  "application/vnd.dvb.ipdcroaming": {
    "source": "iana"
  },
  "application/vnd.dvb.iptv.alfec-base": {
    "source": "iana"
  },
  "application/vnd.dvb.iptv.alfec-enhancement": {
    "source": "iana"
  },
  "application/vnd.dvb.notif-aggregate-root+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.dvb.notif-container+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.dvb.notif-generic+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.dvb.notif-ia-msglist+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.dvb.notif-ia-registration-request+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.dvb.notif-ia-registration-response+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.dvb.notif-init+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.dvb.pfr": {
    "source": "iana"
  },
  "application/vnd.dvb.service": {
    "source": "iana",
    "extensions": ["svc"]
  },
  "application/vnd.dxr": {
    "source": "iana"
  },
  "application/vnd.dynageo": {
    "source": "iana",
    "extensions": ["geo"]
  },
  "application/vnd.dzr": {
    "source": "iana"
  },
  "application/vnd.easykaraoke.cdgdownload": {
    "source": "iana"
  },
  "application/vnd.ecdis-update": {
    "source": "iana"
  },
  "application/vnd.ecip.rlp": {
    "source": "iana"
  },
  "application/vnd.eclipse.ditto+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.ecowin.chart": {
    "source": "iana",
    "extensions": ["mag"]
  },
  "application/vnd.ecowin.filerequest": {
    "source": "iana"
  },
  "application/vnd.ecowin.fileupdate": {
    "source": "iana"
  },
  "application/vnd.ecowin.series": {
    "source": "iana"
  },
  "application/vnd.ecowin.seriesrequest": {
    "source": "iana"
  },
  "application/vnd.ecowin.seriesupdate": {
    "source": "iana"
  },
  "application/vnd.efi.img": {
    "source": "iana"
  },
  "application/vnd.efi.iso": {
    "source": "iana"
  },
  "application/vnd.emclient.accessrequest+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.enliven": {
    "source": "iana",
    "extensions": ["nml"]
  },
  "application/vnd.enphase.envoy": {
    "source": "iana"
  },
  "application/vnd.eprints.data+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.epson.esf": {
    "source": "iana",
    "extensions": ["esf"]
  },
  "application/vnd.epson.msf": {
    "source": "iana",
    "extensions": ["msf"]
  },
  "application/vnd.epson.quickanime": {
    "source": "iana",
    "extensions": ["qam"]
  },
  "application/vnd.epson.salt": {
    "source": "iana",
    "extensions": ["slt"]
  },
  "application/vnd.epson.ssf": {
    "source": "iana",
    "extensions": ["ssf"]
  },
  "application/vnd.ericsson.quickcall": {
    "source": "iana"
  },
  "application/vnd.espass-espass+zip": {
    "source": "iana",
    "compressible": false
  },
  "application/vnd.eszigno3+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["es3","et3"]
  },
  "application/vnd.etsi.aoc+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.etsi.asic-e+zip": {
    "source": "iana",
    "compressible": false
  },
  "application/vnd.etsi.asic-s+zip": {
    "source": "iana",
    "compressible": false
  },
  "application/vnd.etsi.cug+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.etsi.iptvcommand+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.etsi.iptvdiscovery+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.etsi.iptvprofile+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.etsi.iptvsad-bc+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.etsi.iptvsad-cod+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.etsi.iptvsad-npvr+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.etsi.iptvservice+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.etsi.iptvsync+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.etsi.iptvueprofile+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.etsi.mcid+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.etsi.mheg5": {
    "source": "iana"
  },
  "application/vnd.etsi.overload-control-policy-dataset+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.etsi.pstn+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.etsi.sci+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.etsi.simservs+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.etsi.timestamp-token": {
    "source": "iana"
  },
  "application/vnd.etsi.tsl+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.etsi.tsl.der": {
    "source": "iana"
  },
  "application/vnd.eu.kasparian.car+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.eudora.data": {
    "source": "iana"
  },
  "application/vnd.evolv.ecig.profile": {
    "source": "iana"
  },
  "application/vnd.evolv.ecig.settings": {
    "source": "iana"
  },
  "application/vnd.evolv.ecig.theme": {
    "source": "iana"
  },
  "application/vnd.exstream-empower+zip": {
    "source": "iana",
    "compressible": false
  },
  "application/vnd.exstream-package": {
    "source": "iana"
  },
  "application/vnd.ezpix-album": {
    "source": "iana",
    "extensions": ["ez2"]
  },
  "application/vnd.ezpix-package": {
    "source": "iana",
    "extensions": ["ez3"]
  },
  "application/vnd.f-secure.mobile": {
    "source": "iana"
  },
  "application/vnd.familysearch.gedcom+zip": {
    "source": "iana",
    "compressible": false
  },
  "application/vnd.fastcopy-disk-image": {
    "source": "iana"
  },
  "application/vnd.fdf": {
    "source": "iana",
    "extensions": ["fdf"]
  },
  "application/vnd.fdsn.mseed": {
    "source": "iana",
    "extensions": ["mseed"]
  },
  "application/vnd.fdsn.seed": {
    "source": "iana",
    "extensions": ["seed","dataless"]
  },
  "application/vnd.ffsns": {
    "source": "iana"
  },
  "application/vnd.ficlab.flb+zip": {
    "source": "iana",
    "compressible": false
  },
  "application/vnd.filmit.zfc": {
    "source": "iana"
  },
  "application/vnd.fints": {
    "source": "iana"
  },
  "application/vnd.firemonkeys.cloudcell": {
    "source": "iana"
  },
  "application/vnd.flographit": {
    "source": "iana",
    "extensions": ["gph"]
  },
  "application/vnd.fluxtime.clip": {
    "source": "iana",
    "extensions": ["ftc"]
  },
  "application/vnd.font-fontforge-sfd": {
    "source": "iana"
  },
  "application/vnd.framemaker": {
    "source": "iana",
    "extensions": ["fm","frame","maker","book"]
  },
  "application/vnd.frogans.fnc": {
    "source": "iana",
    "extensions": ["fnc"]
  },
  "application/vnd.frogans.ltf": {
    "source": "iana",
    "extensions": ["ltf"]
  },
  "application/vnd.fsc.weblaunch": {
    "source": "iana",
    "extensions": ["fsc"]
  },
  "application/vnd.fujifilm.fb.docuworks": {
    "source": "iana"
  },
  "application/vnd.fujifilm.fb.docuworks.binder": {
    "source": "iana"
  },
  "application/vnd.fujifilm.fb.docuworks.container": {
    "source": "iana"
  },
  "application/vnd.fujifilm.fb.jfi+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.fujitsu.oasys": {
    "source": "iana",
    "extensions": ["oas"]
  },
  "application/vnd.fujitsu.oasys2": {
    "source": "iana",
    "extensions": ["oa2"]
  },
  "application/vnd.fujitsu.oasys3": {
    "source": "iana",
    "extensions": ["oa3"]
  },
  "application/vnd.fujitsu.oasysgp": {
    "source": "iana",
    "extensions": ["fg5"]
  },
  "application/vnd.fujitsu.oasysprs": {
    "source": "iana",
    "extensions": ["bh2"]
  },
  "application/vnd.fujixerox.art-ex": {
    "source": "iana"
  },
  "application/vnd.fujixerox.art4": {
    "source": "iana"
  },
  "application/vnd.fujixerox.ddd": {
    "source": "iana",
    "extensions": ["ddd"]
  },
  "application/vnd.fujixerox.docuworks": {
    "source": "iana",
    "extensions": ["xdw"]
  },
  "application/vnd.fujixerox.docuworks.binder": {
    "source": "iana",
    "extensions": ["xbd"]
  },
  "application/vnd.fujixerox.docuworks.container": {
    "source": "iana"
  },
  "application/vnd.fujixerox.hbpl": {
    "source": "iana"
  },
  "application/vnd.fut-misnet": {
    "source": "iana"
  },
  "application/vnd.futoin+cbor": {
    "source": "iana"
  },
  "application/vnd.futoin+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.fuzzysheet": {
    "source": "iana",
    "extensions": ["fzs"]
  },
  "application/vnd.genomatix.tuxedo": {
    "source": "iana",
    "extensions": ["txd"]
  },
  "application/vnd.gentics.grd+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.geo+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.geocube+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.geogebra.file": {
    "source": "iana",
    "extensions": ["ggb"]
  },
  "application/vnd.geogebra.slides": {
    "source": "iana"
  },
  "application/vnd.geogebra.tool": {
    "source": "iana",
    "extensions": ["ggt"]
  },
  "application/vnd.geometry-explorer": {
    "source": "iana",
    "extensions": ["gex","gre"]
  },
  "application/vnd.geonext": {
    "source": "iana",
    "extensions": ["gxt"]
  },
  "application/vnd.geoplan": {
    "source": "iana",
    "extensions": ["g2w"]
  },
  "application/vnd.geospace": {
    "source": "iana",
    "extensions": ["g3w"]
  },
  "application/vnd.gerber": {
    "source": "iana"
  },
  "application/vnd.globalplatform.card-content-mgt": {
    "source": "iana"
  },
  "application/vnd.globalplatform.card-content-mgt-response": {
    "source": "iana"
  },
  "application/vnd.gmx": {
    "source": "iana",
    "extensions": ["gmx"]
  },
  "application/vnd.google-apps.document": {
    "compressible": false,
    "extensions": ["gdoc"]
  },
  "application/vnd.google-apps.presentation": {
    "compressible": false,
    "extensions": ["gslides"]
  },
  "application/vnd.google-apps.spreadsheet": {
    "compressible": false,
    "extensions": ["gsheet"]
  },
  "application/vnd.google-earth.kml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["kml"]
  },
  "application/vnd.google-earth.kmz": {
    "source": "iana",
    "compressible": false,
    "extensions": ["kmz"]
  },
  "application/vnd.gov.sk.e-form+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.gov.sk.e-form+zip": {
    "source": "iana",
    "compressible": false
  },
  "application/vnd.gov.sk.xmldatacontainer+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.grafeq": {
    "source": "iana",
    "extensions": ["gqf","gqs"]
  },
  "application/vnd.gridmp": {
    "source": "iana"
  },
  "application/vnd.groove-account": {
    "source": "iana",
    "extensions": ["gac"]
  },
  "application/vnd.groove-help": {
    "source": "iana",
    "extensions": ["ghf"]
  },
  "application/vnd.groove-identity-message": {
    "source": "iana",
    "extensions": ["gim"]
  },
  "application/vnd.groove-injector": {
    "source": "iana",
    "extensions": ["grv"]
  },
  "application/vnd.groove-tool-message": {
    "source": "iana",
    "extensions": ["gtm"]
  },
  "application/vnd.groove-tool-template": {
    "source": "iana",
    "extensions": ["tpl"]
  },
  "application/vnd.groove-vcard": {
    "source": "iana",
    "extensions": ["vcg"]
  },
  "application/vnd.hal+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.hal+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["hal"]
  },
  "application/vnd.handheld-entertainment+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["zmm"]
  },
  "application/vnd.hbci": {
    "source": "iana",
    "extensions": ["hbci"]
  },
  "application/vnd.hc+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.hcl-bireports": {
    "source": "iana"
  },
  "application/vnd.hdt": {
    "source": "iana"
  },
  "application/vnd.heroku+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.hhe.lesson-player": {
    "source": "iana",
    "extensions": ["les"]
  },
  "application/vnd.hl7cda+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true
  },
  "application/vnd.hl7v2+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true
  },
  "application/vnd.hp-hpgl": {
    "source": "iana",
    "extensions": ["hpgl"]
  },
  "application/vnd.hp-hpid": {
    "source": "iana",
    "extensions": ["hpid"]
  },
  "application/vnd.hp-hps": {
    "source": "iana",
    "extensions": ["hps"]
  },
  "application/vnd.hp-jlyt": {
    "source": "iana",
    "extensions": ["jlt"]
  },
  "application/vnd.hp-pcl": {
    "source": "iana",
    "extensions": ["pcl"]
  },
  "application/vnd.hp-pclxl": {
    "source": "iana",
    "extensions": ["pclxl"]
  },
  "application/vnd.httphone": {
    "source": "iana"
  },
  "application/vnd.hydrostatix.sof-data": {
    "source": "iana",
    "extensions": ["sfd-hdstx"]
  },
  "application/vnd.hyper+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.hyper-item+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.hyperdrive+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.hzn-3d-crossword": {
    "source": "iana"
  },
  "application/vnd.ibm.afplinedata": {
    "source": "iana"
  },
  "application/vnd.ibm.electronic-media": {
    "source": "iana"
  },
  "application/vnd.ibm.minipay": {
    "source": "iana",
    "extensions": ["mpy"]
  },
  "application/vnd.ibm.modcap": {
    "source": "iana",
    "extensions": ["afp","listafp","list3820"]
  },
  "application/vnd.ibm.rights-management": {
    "source": "iana",
    "extensions": ["irm"]
  },
  "application/vnd.ibm.secure-container": {
    "source": "iana",
    "extensions": ["sc"]
  },
  "application/vnd.iccprofile": {
    "source": "iana",
    "extensions": ["icc","icm"]
  },
  "application/vnd.ieee.1905": {
    "source": "iana"
  },
  "application/vnd.igloader": {
    "source": "iana",
    "extensions": ["igl"]
  },
  "application/vnd.imagemeter.folder+zip": {
    "source": "iana",
    "compressible": false
  },
  "application/vnd.imagemeter.image+zip": {
    "source": "iana",
    "compressible": false
  },
  "application/vnd.immervision-ivp": {
    "source": "iana",
    "extensions": ["ivp"]
  },
  "application/vnd.immervision-ivu": {
    "source": "iana",
    "extensions": ["ivu"]
  },
  "application/vnd.ims.imsccv1p1": {
    "source": "iana"
  },
  "application/vnd.ims.imsccv1p2": {
    "source": "iana"
  },
  "application/vnd.ims.imsccv1p3": {
    "source": "iana"
  },
  "application/vnd.ims.lis.v2.result+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.ims.lti.v2.toolproxy+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.ims.lti.v2.toolproxy.id+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.ims.lti.v2.toolsettings+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.ims.lti.v2.toolsettings.simple+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.informedcontrol.rms+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.informix-visionary": {
    "source": "iana"
  },
  "application/vnd.infotech.project": {
    "source": "iana"
  },
  "application/vnd.infotech.project+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.innopath.wamp.notification": {
    "source": "iana"
  },
  "application/vnd.insors.igm": {
    "source": "iana",
    "extensions": ["igm"]
  },
  "application/vnd.intercon.formnet": {
    "source": "iana",
    "extensions": ["xpw","xpx"]
  },
  "application/vnd.intergeo": {
    "source": "iana",
    "extensions": ["i2g"]
  },
  "application/vnd.intertrust.digibox": {
    "source": "iana"
  },
  "application/vnd.intertrust.nncp": {
    "source": "iana"
  },
  "application/vnd.intu.qbo": {
    "source": "iana",
    "extensions": ["qbo"]
  },
  "application/vnd.intu.qfx": {
    "source": "iana",
    "extensions": ["qfx"]
  },
  "application/vnd.iptc.g2.catalogitem+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.iptc.g2.conceptitem+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.iptc.g2.knowledgeitem+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.iptc.g2.newsitem+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.iptc.g2.newsmessage+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.iptc.g2.packageitem+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.iptc.g2.planningitem+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.ipunplugged.rcprofile": {
    "source": "iana",
    "extensions": ["rcprofile"]
  },
  "application/vnd.irepository.package+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["irp"]
  },
  "application/vnd.is-xpr": {
    "source": "iana",
    "extensions": ["xpr"]
  },
  "application/vnd.isac.fcs": {
    "source": "iana",
    "extensions": ["fcs"]
  },
  "application/vnd.iso11783-10+zip": {
    "source": "iana",
    "compressible": false
  },
  "application/vnd.jam": {
    "source": "iana",
    "extensions": ["jam"]
  },
  "application/vnd.japannet-directory-service": {
    "source": "iana"
  },
  "application/vnd.japannet-jpnstore-wakeup": {
    "source": "iana"
  },
  "application/vnd.japannet-payment-wakeup": {
    "source": "iana"
  },
  "application/vnd.japannet-registration": {
    "source": "iana"
  },
  "application/vnd.japannet-registration-wakeup": {
    "source": "iana"
  },
  "application/vnd.japannet-setstore-wakeup": {
    "source": "iana"
  },
  "application/vnd.japannet-verification": {
    "source": "iana"
  },
  "application/vnd.japannet-verification-wakeup": {
    "source": "iana"
  },
  "application/vnd.jcp.javame.midlet-rms": {
    "source": "iana",
    "extensions": ["rms"]
  },
  "application/vnd.jisp": {
    "source": "iana",
    "extensions": ["jisp"]
  },
  "application/vnd.joost.joda-archive": {
    "source": "iana",
    "extensions": ["joda"]
  },
  "application/vnd.jsk.isdn-ngn": {
    "source": "iana"
  },
  "application/vnd.kahootz": {
    "source": "iana",
    "extensions": ["ktz","ktr"]
  },
  "application/vnd.kde.karbon": {
    "source": "iana",
    "extensions": ["karbon"]
  },
  "application/vnd.kde.kchart": {
    "source": "iana",
    "extensions": ["chrt"]
  },
  "application/vnd.kde.kformula": {
    "source": "iana",
    "extensions": ["kfo"]
  },
  "application/vnd.kde.kivio": {
    "source": "iana",
    "extensions": ["flw"]
  },
  "application/vnd.kde.kontour": {
    "source": "iana",
    "extensions": ["kon"]
  },
  "application/vnd.kde.kpresenter": {
    "source": "iana",
    "extensions": ["kpr","kpt"]
  },
  "application/vnd.kde.kspread": {
    "source": "iana",
    "extensions": ["ksp"]
  },
  "application/vnd.kde.kword": {
    "source": "iana",
    "extensions": ["kwd","kwt"]
  },
  "application/vnd.kenameaapp": {
    "source": "iana",
    "extensions": ["htke"]
  },
  "application/vnd.kidspiration": {
    "source": "iana",
    "extensions": ["kia"]
  },
  "application/vnd.kinar": {
    "source": "iana",
    "extensions": ["kne","knp"]
  },
  "application/vnd.koan": {
    "source": "iana",
    "extensions": ["skp","skd","skt","skm"]
  },
  "application/vnd.kodak-descriptor": {
    "source": "iana",
    "extensions": ["sse"]
  },
  "application/vnd.las": {
    "source": "iana"
  },
  "application/vnd.las.las+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.las.las+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["lasxml"]
  },
  "application/vnd.laszip": {
    "source": "iana"
  },
  "application/vnd.leap+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.liberty-request+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.llamagraphics.life-balance.desktop": {
    "source": "iana",
    "extensions": ["lbd"]
  },
  "application/vnd.llamagraphics.life-balance.exchange+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["lbe"]
  },
  "application/vnd.logipipe.circuit+zip": {
    "source": "iana",
    "compressible": false
  },
  "application/vnd.loom": {
    "source": "iana"
  },
  "application/vnd.lotus-1-2-3": {
    "source": "iana",
    "extensions": ["123"]
  },
  "application/vnd.lotus-approach": {
    "source": "iana",
    "extensions": ["apr"]
  },
  "application/vnd.lotus-freelance": {
    "source": "iana",
    "extensions": ["pre"]
  },
  "application/vnd.lotus-notes": {
    "source": "iana",
    "extensions": ["nsf"]
  },
  "application/vnd.lotus-organizer": {
    "source": "iana",
    "extensions": ["org"]
  },
  "application/vnd.lotus-screencam": {
    "source": "iana",
    "extensions": ["scm"]
  },
  "application/vnd.lotus-wordpro": {
    "source": "iana",
    "extensions": ["lwp"]
  },
  "application/vnd.macports.portpkg": {
    "source": "iana",
    "extensions": ["portpkg"]
  },
  "application/vnd.mapbox-vector-tile": {
    "source": "iana",
    "extensions": ["mvt"]
  },
  "application/vnd.marlin.drm.actiontoken+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.marlin.drm.conftoken+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.marlin.drm.license+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.marlin.drm.mdcf": {
    "source": "iana"
  },
  "application/vnd.mason+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.maxar.archive.3tz+zip": {
    "source": "iana",
    "compressible": false
  },
  "application/vnd.maxmind.maxmind-db": {
    "source": "iana"
  },
  "application/vnd.mcd": {
    "source": "iana",
    "extensions": ["mcd"]
  },
  "application/vnd.medcalcdata": {
    "source": "iana",
    "extensions": ["mc1"]
  },
  "application/vnd.mediastation.cdkey": {
    "source": "iana",
    "extensions": ["cdkey"]
  },
  "application/vnd.meridian-slingshot": {
    "source": "iana"
  },
  "application/vnd.mfer": {
    "source": "iana",
    "extensions": ["mwf"]
  },
  "application/vnd.mfmp": {
    "source": "iana",
    "extensions": ["mfm"]
  },
  "application/vnd.micro+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.micrografx.flo": {
    "source": "iana",
    "extensions": ["flo"]
  },
  "application/vnd.micrografx.igx": {
    "source": "iana",
    "extensions": ["igx"]
  },
  "application/vnd.microsoft.portable-executable": {
    "source": "iana"
  },
  "application/vnd.microsoft.windows.thumbnail-cache": {
    "source": "iana"
  },
  "application/vnd.miele+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.mif": {
    "source": "iana",
    "extensions": ["mif"]
  },
  "application/vnd.minisoft-hp3000-save": {
    "source": "iana"
  },
  "application/vnd.mitsubishi.misty-guard.trustweb": {
    "source": "iana"
  },
  "application/vnd.mobius.daf": {
    "source": "iana",
    "extensions": ["daf"]
  },
  "application/vnd.mobius.dis": {
    "source": "iana",
    "extensions": ["dis"]
  },
  "application/vnd.mobius.mbk": {
    "source": "iana",
    "extensions": ["mbk"]
  },
  "application/vnd.mobius.mqy": {
    "source": "iana",
    "extensions": ["mqy"]
  },
  "application/vnd.mobius.msl": {
    "source": "iana",
    "extensions": ["msl"]
  },
  "application/vnd.mobius.plc": {
    "source": "iana",
    "extensions": ["plc"]
  },
  "application/vnd.mobius.txf": {
    "source": "iana",
    "extensions": ["txf"]
  },
  "application/vnd.mophun.application": {
    "source": "iana",
    "extensions": ["mpn"]
  },
  "application/vnd.mophun.certificate": {
    "source": "iana",
    "extensions": ["mpc"]
  },
  "application/vnd.motorola.flexsuite": {
    "source": "iana"
  },
  "application/vnd.motorola.flexsuite.adsi": {
    "source": "iana"
  },
  "application/vnd.motorola.flexsuite.fis": {
    "source": "iana"
  },
  "application/vnd.motorola.flexsuite.gotap": {
    "source": "iana"
  },
  "application/vnd.motorola.flexsuite.kmr": {
    "source": "iana"
  },
  "application/vnd.motorola.flexsuite.ttc": {
    "source": "iana"
  },
  "application/vnd.motorola.flexsuite.wem": {
    "source": "iana"
  },
  "application/vnd.motorola.iprm": {
    "source": "iana"
  },
  "application/vnd.mozilla.xul+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xul"]
  },
  "application/vnd.ms-3mfdocument": {
    "source": "iana"
  },
  "application/vnd.ms-artgalry": {
    "source": "iana",
    "extensions": ["cil"]
  },
  "application/vnd.ms-asf": {
    "source": "iana"
  },
  "application/vnd.ms-cab-compressed": {
    "source": "iana",
    "extensions": ["cab"]
  },
  "application/vnd.ms-color.iccprofile": {
    "source": "apache"
  },
  "application/vnd.ms-excel": {
    "source": "iana",
    "compressible": false,
    "extensions": ["xls","xlm","xla","xlc","xlt","xlw"]
  },
  "application/vnd.ms-excel.addin.macroenabled.12": {
    "source": "iana",
    "extensions": ["xlam"]
  },
  "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
    "source": "iana",
    "extensions": ["xlsb"]
  },
  "application/vnd.ms-excel.sheet.macroenabled.12": {
    "source": "iana",
    "extensions": ["xlsm"]
  },
  "application/vnd.ms-excel.template.macroenabled.12": {
    "source": "iana",
    "extensions": ["xltm"]
  },
  "application/vnd.ms-fontobject": {
    "source": "iana",
    "compressible": true,
    "extensions": ["eot"]
  },
  "application/vnd.ms-htmlhelp": {
    "source": "iana",
    "extensions": ["chm"]
  },
  "application/vnd.ms-ims": {
    "source": "iana",
    "extensions": ["ims"]
  },
  "application/vnd.ms-lrm": {
    "source": "iana",
    "extensions": ["lrm"]
  },
  "application/vnd.ms-office.activex+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.ms-officetheme": {
    "source": "iana",
    "extensions": ["thmx"]
  },
  "application/vnd.ms-opentype": {
    "source": "apache",
    "compressible": true
  },
  "application/vnd.ms-outlook": {
    "compressible": false,
    "extensions": ["msg"]
  },
  "application/vnd.ms-package.obfuscated-opentype": {
    "source": "apache"
  },
  "application/vnd.ms-pki.seccat": {
    "source": "apache",
    "extensions": ["cat"]
  },
  "application/vnd.ms-pki.stl": {
    "source": "apache",
    "extensions": ["stl"]
  },
  "application/vnd.ms-playready.initiator+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.ms-powerpoint": {
    "source": "iana",
    "compressible": false,
    "extensions": ["ppt","pps","pot"]
  },
  "application/vnd.ms-powerpoint.addin.macroenabled.12": {
    "source": "iana",
    "extensions": ["ppam"]
  },
  "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
    "source": "iana",
    "extensions": ["pptm"]
  },
  "application/vnd.ms-powerpoint.slide.macroenabled.12": {
    "source": "iana",
    "extensions": ["sldm"]
  },
  "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
    "source": "iana",
    "extensions": ["ppsm"]
  },
  "application/vnd.ms-powerpoint.template.macroenabled.12": {
    "source": "iana",
    "extensions": ["potm"]
  },
  "application/vnd.ms-printdevicecapabilities+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.ms-printing.printticket+xml": {
    "source": "apache",
    "compressible": true
  },
  "application/vnd.ms-printschematicket+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.ms-project": {
    "source": "iana",
    "extensions": ["mpp","mpt"]
  },
  "application/vnd.ms-tnef": {
    "source": "iana"
  },
  "application/vnd.ms-windows.devicepairing": {
    "source": "iana"
  },
  "application/vnd.ms-windows.nwprinting.oob": {
    "source": "iana"
  },
  "application/vnd.ms-windows.printerpairing": {
    "source": "iana"
  },
  "application/vnd.ms-windows.wsd.oob": {
    "source": "iana"
  },
  "application/vnd.ms-wmdrm.lic-chlg-req": {
    "source": "iana"
  },
  "application/vnd.ms-wmdrm.lic-resp": {
    "source": "iana"
  },
  "application/vnd.ms-wmdrm.meter-chlg-req": {
    "source": "iana"
  },
  "application/vnd.ms-wmdrm.meter-resp": {
    "source": "iana"
  },
  "application/vnd.ms-word.document.macroenabled.12": {
    "source": "iana",
    "extensions": ["docm"]
  },
  "application/vnd.ms-word.template.macroenabled.12": {
    "source": "iana",
    "extensions": ["dotm"]
  },
  "application/vnd.ms-works": {
    "source": "iana",
    "extensions": ["wps","wks","wcm","wdb"]
  },
  "application/vnd.ms-wpl": {
    "source": "iana",
    "extensions": ["wpl"]
  },
  "application/vnd.ms-xpsdocument": {
    "source": "iana",
    "compressible": false,
    "extensions": ["xps"]
  },
  "application/vnd.msa-disk-image": {
    "source": "iana"
  },
  "application/vnd.mseq": {
    "source": "iana",
    "extensions": ["mseq"]
  },
  "application/vnd.msign": {
    "source": "iana"
  },
  "application/vnd.multiad.creator": {
    "source": "iana"
  },
  "application/vnd.multiad.creator.cif": {
    "source": "iana"
  },
  "application/vnd.music-niff": {
    "source": "iana"
  },
  "application/vnd.musician": {
    "source": "iana",
    "extensions": ["mus"]
  },
  "application/vnd.muvee.style": {
    "source": "iana",
    "extensions": ["msty"]
  },
  "application/vnd.mynfc": {
    "source": "iana",
    "extensions": ["taglet"]
  },
  "application/vnd.nacamar.ybrid+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.ncd.control": {
    "source": "iana"
  },
  "application/vnd.ncd.reference": {
    "source": "iana"
  },
  "application/vnd.nearst.inv+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.nebumind.line": {
    "source": "iana"
  },
  "application/vnd.nervana": {
    "source": "iana"
  },
  "application/vnd.netfpx": {
    "source": "iana"
  },
  "application/vnd.neurolanguage.nlu": {
    "source": "iana",
    "extensions": ["nlu"]
  },
  "application/vnd.nimn": {
    "source": "iana"
  },
  "application/vnd.nintendo.nitro.rom": {
    "source": "iana"
  },
  "application/vnd.nintendo.snes.rom": {
    "source": "iana"
  },
  "application/vnd.nitf": {
    "source": "iana",
    "extensions": ["ntf","nitf"]
  },
  "application/vnd.noblenet-directory": {
    "source": "iana",
    "extensions": ["nnd"]
  },
  "application/vnd.noblenet-sealer": {
    "source": "iana",
    "extensions": ["nns"]
  },
  "application/vnd.noblenet-web": {
    "source": "iana",
    "extensions": ["nnw"]
  },
  "application/vnd.nokia.catalogs": {
    "source": "iana"
  },
  "application/vnd.nokia.conml+wbxml": {
    "source": "iana"
  },
  "application/vnd.nokia.conml+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.nokia.iptv.config+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.nokia.isds-radio-presets": {
    "source": "iana"
  },
  "application/vnd.nokia.landmark+wbxml": {
    "source": "iana"
  },
  "application/vnd.nokia.landmark+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.nokia.landmarkcollection+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.nokia.n-gage.ac+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["ac"]
  },
  "application/vnd.nokia.n-gage.data": {
    "source": "iana",
    "extensions": ["ngdat"]
  },
  "application/vnd.nokia.n-gage.symbian.install": {
    "source": "iana",
    "extensions": ["n-gage"]
  },
  "application/vnd.nokia.ncd": {
    "source": "iana"
  },
  "application/vnd.nokia.pcd+wbxml": {
    "source": "iana"
  },
  "application/vnd.nokia.pcd+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.nokia.radio-preset": {
    "source": "iana",
    "extensions": ["rpst"]
  },
  "application/vnd.nokia.radio-presets": {
    "source": "iana",
    "extensions": ["rpss"]
  },
  "application/vnd.novadigm.edm": {
    "source": "iana",
    "extensions": ["edm"]
  },
  "application/vnd.novadigm.edx": {
    "source": "iana",
    "extensions": ["edx"]
  },
  "application/vnd.novadigm.ext": {
    "source": "iana",
    "extensions": ["ext"]
  },
  "application/vnd.ntt-local.content-share": {
    "source": "iana"
  },
  "application/vnd.ntt-local.file-transfer": {
    "source": "iana"
  },
  "application/vnd.ntt-local.ogw_remote-access": {
    "source": "iana"
  },
  "application/vnd.ntt-local.sip-ta_remote": {
    "source": "iana"
  },
  "application/vnd.ntt-local.sip-ta_tcp_stream": {
    "source": "iana"
  },
  "application/vnd.oasis.opendocument.chart": {
    "source": "iana",
    "extensions": ["odc"]
  },
  "application/vnd.oasis.opendocument.chart-template": {
    "source": "iana",
    "extensions": ["otc"]
  },
  "application/vnd.oasis.opendocument.database": {
    "source": "iana",
    "extensions": ["odb"]
  },
  "application/vnd.oasis.opendocument.formula": {
    "source": "iana",
    "extensions": ["odf"]
  },
  "application/vnd.oasis.opendocument.formula-template": {
    "source": "iana",
    "extensions": ["odft"]
  },
  "application/vnd.oasis.opendocument.graphics": {
    "source": "iana",
    "compressible": false,
    "extensions": ["odg"]
  },
  "application/vnd.oasis.opendocument.graphics-template": {
    "source": "iana",
    "extensions": ["otg"]
  },
  "application/vnd.oasis.opendocument.image": {
    "source": "iana",
    "extensions": ["odi"]
  },
  "application/vnd.oasis.opendocument.image-template": {
    "source": "iana",
    "extensions": ["oti"]
  },
  "application/vnd.oasis.opendocument.presentation": {
    "source": "iana",
    "compressible": false,
    "extensions": ["odp"]
  },
  "application/vnd.oasis.opendocument.presentation-template": {
    "source": "iana",
    "extensions": ["otp"]
  },
  "application/vnd.oasis.opendocument.spreadsheet": {
    "source": "iana",
    "compressible": false,
    "extensions": ["ods"]
  },
  "application/vnd.oasis.opendocument.spreadsheet-template": {
    "source": "iana",
    "extensions": ["ots"]
  },
  "application/vnd.oasis.opendocument.text": {
    "source": "iana",
    "compressible": false,
    "extensions": ["odt"]
  },
  "application/vnd.oasis.opendocument.text-master": {
    "source": "iana",
    "extensions": ["odm"]
  },
  "application/vnd.oasis.opendocument.text-template": {
    "source": "iana",
    "extensions": ["ott"]
  },
  "application/vnd.oasis.opendocument.text-web": {
    "source": "iana",
    "extensions": ["oth"]
  },
  "application/vnd.obn": {
    "source": "iana"
  },
  "application/vnd.ocf+cbor": {
    "source": "iana"
  },
  "application/vnd.oci.image.manifest.v1+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oftn.l10n+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oipf.contentaccessdownload+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oipf.contentaccessstreaming+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oipf.cspg-hexbinary": {
    "source": "iana"
  },
  "application/vnd.oipf.dae.svg+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oipf.dae.xhtml+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oipf.mippvcontrolmessage+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oipf.pae.gem": {
    "source": "iana"
  },
  "application/vnd.oipf.spdiscovery+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oipf.spdlist+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oipf.ueprofile+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oipf.userprofile+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.olpc-sugar": {
    "source": "iana",
    "extensions": ["xo"]
  },
  "application/vnd.oma-scws-config": {
    "source": "iana"
  },
  "application/vnd.oma-scws-http-request": {
    "source": "iana"
  },
  "application/vnd.oma-scws-http-response": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oma.bcast.drm-trigger+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oma.bcast.imd+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oma.bcast.ltkm": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.notification+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oma.bcast.provisioningtrigger": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.sgboot": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.sgdd+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oma.bcast.sgdu": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.simple-symbol-container": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.smartcard-trigger+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oma.bcast.sprov+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oma.bcast.stkm": {
    "source": "iana"
  },
  "application/vnd.oma.cab-address-book+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oma.cab-feature-handler+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oma.cab-pcc+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oma.cab-subs-invite+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oma.cab-user-prefs+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oma.dcd": {
    "source": "iana"
  },
  "application/vnd.oma.dcdc": {
    "source": "iana"
  },
  "application/vnd.oma.dd2+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["dd2"]
  },
  "application/vnd.oma.drm.risd+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oma.group-usage-list+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oma.lwm2m+cbor": {
    "source": "iana"
  },
  "application/vnd.oma.lwm2m+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oma.lwm2m+tlv": {
    "source": "iana"
  },
  "application/vnd.oma.pal+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oma.poc.detailed-progress-report+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oma.poc.final-report+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oma.poc.groups+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oma.poc.invocation-descriptor+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oma.poc.optimized-progress-report+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oma.push": {
    "source": "iana"
  },
  "application/vnd.oma.scidm.messages+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oma.xcap-directory+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.omads-email+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true
  },
  "application/vnd.omads-file+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true
  },
  "application/vnd.omads-folder+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true
  },
  "application/vnd.omaloc-supl-init": {
    "source": "iana"
  },
  "application/vnd.onepager": {
    "source": "iana"
  },
  "application/vnd.onepagertamp": {
    "source": "iana"
  },
  "application/vnd.onepagertamx": {
    "source": "iana"
  },
  "application/vnd.onepagertat": {
    "source": "iana"
  },
  "application/vnd.onepagertatp": {
    "source": "iana"
  },
  "application/vnd.onepagertatx": {
    "source": "iana"
  },
  "application/vnd.openblox.game+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["obgx"]
  },
  "application/vnd.openblox.game-binary": {
    "source": "iana"
  },
  "application/vnd.openeye.oeb": {
    "source": "iana"
  },
  "application/vnd.openofficeorg.extension": {
    "source": "apache",
    "extensions": ["oxt"]
  },
  "application/vnd.openstreetmap.data+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["osm"]
  },
  "application/vnd.opentimestamps.ots": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.drawing+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    "source": "iana",
    "compressible": false,
    "extensions": ["pptx"]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide": {
    "source": "iana",
    "extensions": ["sldx"]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
    "source": "iana",
    "extensions": ["ppsx"]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template": {
    "source": "iana",
    "extensions": ["potx"]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    "source": "iana",
    "compressible": false,
    "extensions": ["xlsx"]
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
    "source": "iana",
    "extensions": ["xltx"]
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.theme+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.vmldrawing": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    "source": "iana",
    "compressible": false,
    "extensions": ["docx"]
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
    "source": "iana",
    "extensions": ["dotx"]
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-package.core-properties+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.openxmlformats-package.relationships+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oracle.resource+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.orange.indata": {
    "source": "iana"
  },
  "application/vnd.osa.netdeploy": {
    "source": "iana"
  },
  "application/vnd.osgeo.mapguide.package": {
    "source": "iana",
    "extensions": ["mgp"]
  },
  "application/vnd.osgi.bundle": {
    "source": "iana"
  },
  "application/vnd.osgi.dp": {
    "source": "iana",
    "extensions": ["dp"]
  },
  "application/vnd.osgi.subsystem": {
    "source": "iana",
    "extensions": ["esa"]
  },
  "application/vnd.otps.ct-kip+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oxli.countgraph": {
    "source": "iana"
  },
  "application/vnd.pagerduty+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.palm": {
    "source": "iana",
    "extensions": ["pdb","pqa","oprc"]
  },
  "application/vnd.panoply": {
    "source": "iana"
  },
  "application/vnd.paos.xml": {
    "source": "iana"
  },
  "application/vnd.patentdive": {
    "source": "iana"
  },
  "application/vnd.patientecommsdoc": {
    "source": "iana"
  },
  "application/vnd.pawaafile": {
    "source": "iana",
    "extensions": ["paw"]
  },
  "application/vnd.pcos": {
    "source": "iana"
  },
  "application/vnd.pg.format": {
    "source": "iana",
    "extensions": ["str"]
  },
  "application/vnd.pg.osasli": {
    "source": "iana",
    "extensions": ["ei6"]
  },
  "application/vnd.piaccess.application-licence": {
    "source": "iana"
  },
  "application/vnd.picsel": {
    "source": "iana",
    "extensions": ["efif"]
  },
  "application/vnd.pmi.widget": {
    "source": "iana",
    "extensions": ["wg"]
  },
  "application/vnd.poc.group-advertisement+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.pocketlearn": {
    "source": "iana",
    "extensions": ["plf"]
  },
  "application/vnd.powerbuilder6": {
    "source": "iana",
    "extensions": ["pbd"]
  },
  "application/vnd.powerbuilder6-s": {
    "source": "iana"
  },
  "application/vnd.powerbuilder7": {
    "source": "iana"
  },
  "application/vnd.powerbuilder7-s": {
    "source": "iana"
  },
  "application/vnd.powerbuilder75": {
    "source": "iana"
  },
  "application/vnd.powerbuilder75-s": {
    "source": "iana"
  },
  "application/vnd.preminet": {
    "source": "iana"
  },
  "application/vnd.previewsystems.box": {
    "source": "iana",
    "extensions": ["box"]
  },
  "application/vnd.proteus.magazine": {
    "source": "iana",
    "extensions": ["mgz"]
  },
  "application/vnd.psfs": {
    "source": "iana"
  },
  "application/vnd.publishare-delta-tree": {
    "source": "iana",
    "extensions": ["qps"]
  },
  "application/vnd.pvi.ptid1": {
    "source": "iana",
    "extensions": ["ptid"]
  },
  "application/vnd.pwg-multiplexed": {
    "source": "iana"
  },
  "application/vnd.pwg-xhtml-print+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.qualcomm.brew-app-res": {
    "source": "iana"
  },
  "application/vnd.quarantainenet": {
    "source": "iana"
  },
  "application/vnd.quark.quarkxpress": {
    "source": "iana",
    "extensions": ["qxd","qxt","qwd","qwt","qxl","qxb"]
  },
  "application/vnd.quobject-quoxdocument": {
    "source": "iana"
  },
  "application/vnd.radisys.moml+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.radisys.msml+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.radisys.msml-audit+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.radisys.msml-audit-conf+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.radisys.msml-audit-conn+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.radisys.msml-audit-dialog+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.radisys.msml-audit-stream+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.radisys.msml-conf+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.radisys.msml-dialog+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.radisys.msml-dialog-base+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.radisys.msml-dialog-fax-detect+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.radisys.msml-dialog-group+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.radisys.msml-dialog-speech+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.radisys.msml-dialog-transform+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.rainstor.data": {
    "source": "iana"
  },
  "application/vnd.rapid": {
    "source": "iana"
  },
  "application/vnd.rar": {
    "source": "iana",
    "extensions": ["rar"]
  },
  "application/vnd.realvnc.bed": {
    "source": "iana",
    "extensions": ["bed"]
  },
  "application/vnd.recordare.musicxml": {
    "source": "iana",
    "extensions": ["mxl"]
  },
  "application/vnd.recordare.musicxml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["musicxml"]
  },
  "application/vnd.renlearn.rlprint": {
    "source": "iana"
  },
  "application/vnd.resilient.logic": {
    "source": "iana"
  },
  "application/vnd.restful+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.rig.cryptonote": {
    "source": "iana",
    "extensions": ["cryptonote"]
  },
  "application/vnd.rim.cod": {
    "source": "apache",
    "extensions": ["cod"]
  },
  "application/vnd.rn-realmedia": {
    "source": "apache",
    "extensions": ["rm"]
  },
  "application/vnd.rn-realmedia-vbr": {
    "source": "apache",
    "extensions": ["rmvb"]
  },
  "application/vnd.route66.link66+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["link66"]
  },
  "application/vnd.rs-274x": {
    "source": "iana"
  },
  "application/vnd.ruckus.download": {
    "source": "iana"
  },
  "application/vnd.s3sms": {
    "source": "iana"
  },
  "application/vnd.sailingtracker.track": {
    "source": "iana",
    "extensions": ["st"]
  },
  "application/vnd.sar": {
    "source": "iana"
  },
  "application/vnd.sbm.cid": {
    "source": "iana"
  },
  "application/vnd.sbm.mid2": {
    "source": "iana"
  },
  "application/vnd.scribus": {
    "source": "iana"
  },
  "application/vnd.sealed.3df": {
    "source": "iana"
  },
  "application/vnd.sealed.csf": {
    "source": "iana"
  },
  "application/vnd.sealed.doc": {
    "source": "iana"
  },
  "application/vnd.sealed.eml": {
    "source": "iana"
  },
  "application/vnd.sealed.mht": {
    "source": "iana"
  },
  "application/vnd.sealed.net": {
    "source": "iana"
  },
  "application/vnd.sealed.ppt": {
    "source": "iana"
  },
  "application/vnd.sealed.tiff": {
    "source": "iana"
  },
  "application/vnd.sealed.xls": {
    "source": "iana"
  },
  "application/vnd.sealedmedia.softseal.html": {
    "source": "iana"
  },
  "application/vnd.sealedmedia.softseal.pdf": {
    "source": "iana"
  },
  "application/vnd.seemail": {
    "source": "iana",
    "extensions": ["see"]
  },
  "application/vnd.seis+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.sema": {
    "source": "iana",
    "extensions": ["sema"]
  },
  "application/vnd.semd": {
    "source": "iana",
    "extensions": ["semd"]
  },
  "application/vnd.semf": {
    "source": "iana",
    "extensions": ["semf"]
  },
  "application/vnd.shade-save-file": {
    "source": "iana"
  },
  "application/vnd.shana.informed.formdata": {
    "source": "iana",
    "extensions": ["ifm"]
  },
  "application/vnd.shana.informed.formtemplate": {
    "source": "iana",
    "extensions": ["itp"]
  },
  "application/vnd.shana.informed.interchange": {
    "source": "iana",
    "extensions": ["iif"]
  },
  "application/vnd.shana.informed.package": {
    "source": "iana",
    "extensions": ["ipk"]
  },
  "application/vnd.shootproof+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.shopkick+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.shp": {
    "source": "iana"
  },
  "application/vnd.shx": {
    "source": "iana"
  },
  "application/vnd.sigrok.session": {
    "source": "iana"
  },
  "application/vnd.simtech-mindmapper": {
    "source": "iana",
    "extensions": ["twd","twds"]
  },
  "application/vnd.siren+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.smaf": {
    "source": "iana",
    "extensions": ["mmf"]
  },
  "application/vnd.smart.notebook": {
    "source": "iana"
  },
  "application/vnd.smart.teacher": {
    "source": "iana",
    "extensions": ["teacher"]
  },
  "application/vnd.snesdev-page-table": {
    "source": "iana"
  },
  "application/vnd.software602.filler.form+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["fo"]
  },
  "application/vnd.software602.filler.form-xml-zip": {
    "source": "iana"
  },
  "application/vnd.solent.sdkm+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["sdkm","sdkd"]
  },
  "application/vnd.spotfire.dxp": {
    "source": "iana",
    "extensions": ["dxp"]
  },
  "application/vnd.spotfire.sfs": {
    "source": "iana",
    "extensions": ["sfs"]
  },
  "application/vnd.sqlite3": {
    "source": "iana"
  },
  "application/vnd.sss-cod": {
    "source": "iana"
  },
  "application/vnd.sss-dtf": {
    "source": "iana"
  },
  "application/vnd.sss-ntf": {
    "source": "iana"
  },
  "application/vnd.stardivision.calc": {
    "source": "apache",
    "extensions": ["sdc"]
  },
  "application/vnd.stardivision.draw": {
    "source": "apache",
    "extensions": ["sda"]
  },
  "application/vnd.stardivision.impress": {
    "source": "apache",
    "extensions": ["sdd"]
  },
  "application/vnd.stardivision.math": {
    "source": "apache",
    "extensions": ["smf"]
  },
  "application/vnd.stardivision.writer": {
    "source": "apache",
    "extensions": ["sdw","vor"]
  },
  "application/vnd.stardivision.writer-global": {
    "source": "apache",
    "extensions": ["sgl"]
  },
  "application/vnd.stepmania.package": {
    "source": "iana",
    "extensions": ["smzip"]
  },
  "application/vnd.stepmania.stepchart": {
    "source": "iana",
    "extensions": ["sm"]
  },
  "application/vnd.street-stream": {
    "source": "iana"
  },
  "application/vnd.sun.wadl+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["wadl"]
  },
  "application/vnd.sun.xml.calc": {
    "source": "apache",
    "extensions": ["sxc"]
  },
  "application/vnd.sun.xml.calc.template": {
    "source": "apache",
    "extensions": ["stc"]
  },
  "application/vnd.sun.xml.draw": {
    "source": "apache",
    "extensions": ["sxd"]
  },
  "application/vnd.sun.xml.draw.template": {
    "source": "apache",
    "extensions": ["std"]
  },
  "application/vnd.sun.xml.impress": {
    "source": "apache",
    "extensions": ["sxi"]
  },
  "application/vnd.sun.xml.impress.template": {
    "source": "apache",
    "extensions": ["sti"]
  },
  "application/vnd.sun.xml.math": {
    "source": "apache",
    "extensions": ["sxm"]
  },
  "application/vnd.sun.xml.writer": {
    "source": "apache",
    "extensions": ["sxw"]
  },
  "application/vnd.sun.xml.writer.global": {
    "source": "apache",
    "extensions": ["sxg"]
  },
  "application/vnd.sun.xml.writer.template": {
    "source": "apache",
    "extensions": ["stw"]
  },
  "application/vnd.sus-calendar": {
    "source": "iana",
    "extensions": ["sus","susp"]
  },
  "application/vnd.svd": {
    "source": "iana",
    "extensions": ["svd"]
  },
  "application/vnd.swiftview-ics": {
    "source": "iana"
  },
  "application/vnd.sycle+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.syft+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.symbian.install": {
    "source": "apache",
    "extensions": ["sis","sisx"]
  },
  "application/vnd.syncml+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
    "extensions": ["xsm"]
  },
  "application/vnd.syncml.dm+wbxml": {
    "source": "iana",
    "charset": "UTF-8",
    "extensions": ["bdm"]
  },
  "application/vnd.syncml.dm+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
    "extensions": ["xdm"]
  },
  "application/vnd.syncml.dm.notification": {
    "source": "iana"
  },
  "application/vnd.syncml.dmddf+wbxml": {
    "source": "iana"
  },
  "application/vnd.syncml.dmddf+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
    "extensions": ["ddf"]
  },
  "application/vnd.syncml.dmtnds+wbxml": {
    "source": "iana"
  },
  "application/vnd.syncml.dmtnds+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true
  },
  "application/vnd.syncml.ds.notification": {
    "source": "iana"
  },
  "application/vnd.tableschema+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.tao.intent-module-archive": {
    "source": "iana",
    "extensions": ["tao"]
  },
  "application/vnd.tcpdump.pcap": {
    "source": "iana",
    "extensions": ["pcap","cap","dmp"]
  },
  "application/vnd.think-cell.ppttc+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.tmd.mediaflex.api+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.tml": {
    "source": "iana"
  },
  "application/vnd.tmobile-livetv": {
    "source": "iana",
    "extensions": ["tmo"]
  },
  "application/vnd.tri.onesource": {
    "source": "iana"
  },
  "application/vnd.trid.tpt": {
    "source": "iana",
    "extensions": ["tpt"]
  },
  "application/vnd.triscape.mxs": {
    "source": "iana",
    "extensions": ["mxs"]
  },
  "application/vnd.trueapp": {
    "source": "iana",
    "extensions": ["tra"]
  },
  "application/vnd.truedoc": {
    "source": "iana"
  },
  "application/vnd.ubisoft.webplayer": {
    "source": "iana"
  },
  "application/vnd.ufdl": {
    "source": "iana",
    "extensions": ["ufd","ufdl"]
  },
  "application/vnd.uiq.theme": {
    "source": "iana",
    "extensions": ["utz"]
  },
  "application/vnd.umajin": {
    "source": "iana",
    "extensions": ["umj"]
  },
  "application/vnd.unity": {
    "source": "iana",
    "extensions": ["unityweb"]
  },
  "application/vnd.uoml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["uoml"]
  },
  "application/vnd.uplanet.alert": {
    "source": "iana"
  },
  "application/vnd.uplanet.alert-wbxml": {
    "source": "iana"
  },
  "application/vnd.uplanet.bearer-choice": {
    "source": "iana"
  },
  "application/vnd.uplanet.bearer-choice-wbxml": {
    "source": "iana"
  },
  "application/vnd.uplanet.cacheop": {
    "source": "iana"
  },
  "application/vnd.uplanet.cacheop-wbxml": {
    "source": "iana"
  },
  "application/vnd.uplanet.channel": {
    "source": "iana"
  },
  "application/vnd.uplanet.channel-wbxml": {
    "source": "iana"
  },
  "application/vnd.uplanet.list": {
    "source": "iana"
  },
  "application/vnd.uplanet.list-wbxml": {
    "source": "iana"
  },
  "application/vnd.uplanet.listcmd": {
    "source": "iana"
  },
  "application/vnd.uplanet.listcmd-wbxml": {
    "source": "iana"
  },
  "application/vnd.uplanet.signal": {
    "source": "iana"
  },
  "application/vnd.uri-map": {
    "source": "iana"
  },
  "application/vnd.valve.source.material": {
    "source": "iana"
  },
  "application/vnd.vcx": {
    "source": "iana",
    "extensions": ["vcx"]
  },
  "application/vnd.vd-study": {
    "source": "iana"
  },
  "application/vnd.vectorworks": {
    "source": "iana"
  },
  "application/vnd.vel+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.verimatrix.vcas": {
    "source": "iana"
  },
  "application/vnd.veritone.aion+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.veryant.thin": {
    "source": "iana"
  },
  "application/vnd.ves.encrypted": {
    "source": "iana"
  },
  "application/vnd.vidsoft.vidconference": {
    "source": "iana"
  },
  "application/vnd.visio": {
    "source": "iana",
    "extensions": ["vsd","vst","vss","vsw"]
  },
  "application/vnd.visionary": {
    "source": "iana",
    "extensions": ["vis"]
  },
  "application/vnd.vividence.scriptfile": {
    "source": "iana"
  },
  "application/vnd.vsf": {
    "source": "iana",
    "extensions": ["vsf"]
  },
  "application/vnd.wap.sic": {
    "source": "iana"
  },
  "application/vnd.wap.slc": {
    "source": "iana"
  },
  "application/vnd.wap.wbxml": {
    "source": "iana",
    "charset": "UTF-8",
    "extensions": ["wbxml"]
  },
  "application/vnd.wap.wmlc": {
    "source": "iana",
    "extensions": ["wmlc"]
  },
  "application/vnd.wap.wmlscriptc": {
    "source": "iana",
    "extensions": ["wmlsc"]
  },
  "application/vnd.webturbo": {
    "source": "iana",
    "extensions": ["wtb"]
  },
  "application/vnd.wfa.dpp": {
    "source": "iana"
  },
  "application/vnd.wfa.p2p": {
    "source": "iana"
  },
  "application/vnd.wfa.wsc": {
    "source": "iana"
  },
  "application/vnd.windows.devicepairing": {
    "source": "iana"
  },
  "application/vnd.wmc": {
    "source": "iana"
  },
  "application/vnd.wmf.bootstrap": {
    "source": "iana"
  },
  "application/vnd.wolfram.mathematica": {
    "source": "iana"
  },
  "application/vnd.wolfram.mathematica.package": {
    "source": "iana"
  },
  "application/vnd.wolfram.player": {
    "source": "iana",
    "extensions": ["nbp"]
  },
  "application/vnd.wordperfect": {
    "source": "iana",
    "extensions": ["wpd"]
  },
  "application/vnd.wqd": {
    "source": "iana",
    "extensions": ["wqd"]
  },
  "application/vnd.wrq-hp3000-labelled": {
    "source": "iana"
  },
  "application/vnd.wt.stf": {
    "source": "iana",
    "extensions": ["stf"]
  },
  "application/vnd.wv.csp+wbxml": {
    "source": "iana"
  },
  "application/vnd.wv.csp+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.wv.ssp+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.xacml+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.xara": {
    "source": "iana",
    "extensions": ["xar"]
  },
  "application/vnd.xfdl": {
    "source": "iana",
    "extensions": ["xfdl"]
  },
  "application/vnd.xfdl.webform": {
    "source": "iana"
  },
  "application/vnd.xmi+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.xmpie.cpkg": {
    "source": "iana"
  },
  "application/vnd.xmpie.dpkg": {
    "source": "iana"
  },
  "application/vnd.xmpie.plan": {
    "source": "iana"
  },
  "application/vnd.xmpie.ppkg": {
    "source": "iana"
  },
  "application/vnd.xmpie.xlim": {
    "source": "iana"
  },
  "application/vnd.yamaha.hv-dic": {
    "source": "iana",
    "extensions": ["hvd"]
  },
  "application/vnd.yamaha.hv-script": {
    "source": "iana",
    "extensions": ["hvs"]
  },
  "application/vnd.yamaha.hv-voice": {
    "source": "iana",
    "extensions": ["hvp"]
  },
  "application/vnd.yamaha.openscoreformat": {
    "source": "iana",
    "extensions": ["osf"]
  },
  "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["osfpvg"]
  },
  "application/vnd.yamaha.remote-setup": {
    "source": "iana"
  },
  "application/vnd.yamaha.smaf-audio": {
    "source": "iana",
    "extensions": ["saf"]
  },
  "application/vnd.yamaha.smaf-phrase": {
    "source": "iana",
    "extensions": ["spf"]
  },
  "application/vnd.yamaha.through-ngn": {
    "source": "iana"
  },
  "application/vnd.yamaha.tunnel-udpencap": {
    "source": "iana"
  },
  "application/vnd.yaoweme": {
    "source": "iana"
  },
  "application/vnd.yellowriver-custom-menu": {
    "source": "iana",
    "extensions": ["cmp"]
  },
  "application/vnd.youtube.yt": {
    "source": "iana"
  },
  "application/vnd.zul": {
    "source": "iana",
    "extensions": ["zir","zirz"]
  },
  "application/vnd.zzazz.deck+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["zaz"]
  },
  "application/voicexml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["vxml"]
  },
  "application/voucher-cms+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vq-rtcpxr": {
    "source": "iana"
  },
  "application/wasm": {
    "source": "iana",
    "compressible": true,
    "extensions": ["wasm"]
  },
  "application/watcherinfo+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["wif"]
  },
  "application/webpush-options+json": {
    "source": "iana",
    "compressible": true
  },
  "application/whoispp-query": {
    "source": "iana"
  },
  "application/whoispp-response": {
    "source": "iana"
  },
  "application/widget": {
    "source": "iana",
    "extensions": ["wgt"]
  },
  "application/winhlp": {
    "source": "apache",
    "extensions": ["hlp"]
  },
  "application/wita": {
    "source": "iana"
  },
  "application/wordperfect5.1": {
    "source": "iana"
  },
  "application/wsdl+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["wsdl"]
  },
  "application/wspolicy+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["wspolicy"]
  },
  "application/x-7z-compressed": {
    "source": "apache",
    "compressible": false,
    "extensions": ["7z"]
  },
  "application/x-abiword": {
    "source": "apache",
    "extensions": ["abw"]
  },
  "application/x-ace-compressed": {
    "source": "apache",
    "extensions": ["ace"]
  },
  "application/x-amf": {
    "source": "apache"
  },
  "application/x-apple-diskimage": {
    "source": "apache",
    "extensions": ["dmg"]
  },
  "application/x-arj": {
    "compressible": false,
    "extensions": ["arj"]
  },
  "application/x-authorware-bin": {
    "source": "apache",
    "extensions": ["aab","x32","u32","vox"]
  },
  "application/x-authorware-map": {
    "source": "apache",
    "extensions": ["aam"]
  },
  "application/x-authorware-seg": {
    "source": "apache",
    "extensions": ["aas"]
  },
  "application/x-bcpio": {
    "source": "apache",
    "extensions": ["bcpio"]
  },
  "application/x-bdoc": {
    "compressible": false,
    "extensions": ["bdoc"]
  },
  "application/x-bittorrent": {
    "source": "apache",
    "extensions": ["torrent"]
  },
  "application/x-blorb": {
    "source": "apache",
    "extensions": ["blb","blorb"]
  },
  "application/x-bzip": {
    "source": "apache",
    "compressible": false,
    "extensions": ["bz"]
  },
  "application/x-bzip2": {
    "source": "apache",
    "compressible": false,
    "extensions": ["bz2","boz"]
  },
  "application/x-cbr": {
    "source": "apache",
    "extensions": ["cbr","cba","cbt","cbz","cb7"]
  },
  "application/x-cdlink": {
    "source": "apache",
    "extensions": ["vcd"]
  },
  "application/x-cfs-compressed": {
    "source": "apache",
    "extensions": ["cfs"]
  },
  "application/x-chat": {
    "source": "apache",
    "extensions": ["chat"]
  },
  "application/x-chess-pgn": {
    "source": "apache",
    "extensions": ["pgn"]
  },
  "application/x-chrome-extension": {
    "extensions": ["crx"]
  },
  "application/x-cocoa": {
    "source": "nginx",
    "extensions": ["cco"]
  },
  "application/x-compress": {
    "source": "apache"
  },
  "application/x-conference": {
    "source": "apache",
    "extensions": ["nsc"]
  },
  "application/x-cpio": {
    "source": "apache",
    "extensions": ["cpio"]
  },
  "application/x-csh": {
    "source": "apache",
    "extensions": ["csh"]
  },
  "application/x-deb": {
    "compressible": false
  },
  "application/x-debian-package": {
    "source": "apache",
    "extensions": ["deb","udeb"]
  },
  "application/x-dgc-compressed": {
    "source": "apache",
    "extensions": ["dgc"]
  },
  "application/x-director": {
    "source": "apache",
    "extensions": ["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"]
  },
  "application/x-doom": {
    "source": "apache",
    "extensions": ["wad"]
  },
  "application/x-dtbncx+xml": {
    "source": "apache",
    "compressible": true,
    "extensions": ["ncx"]
  },
  "application/x-dtbook+xml": {
    "source": "apache",
    "compressible": true,
    "extensions": ["dtb"]
  },
  "application/x-dtbresource+xml": {
    "source": "apache",
    "compressible": true,
    "extensions": ["res"]
  },
  "application/x-dvi": {
    "source": "apache",
    "compressible": false,
    "extensions": ["dvi"]
  },
  "application/x-envoy": {
    "source": "apache",
    "extensions": ["evy"]
  },
  "application/x-eva": {
    "source": "apache",
    "extensions": ["eva"]
  },
  "application/x-font-bdf": {
    "source": "apache",
    "extensions": ["bdf"]
  },
  "application/x-font-dos": {
    "source": "apache"
  },
  "application/x-font-framemaker": {
    "source": "apache"
  },
  "application/x-font-ghostscript": {
    "source": "apache",
    "extensions": ["gsf"]
  },
  "application/x-font-libgrx": {
    "source": "apache"
  },
  "application/x-font-linux-psf": {
    "source": "apache",
    "extensions": ["psf"]
  },
  "application/x-font-pcf": {
    "source": "apache",
    "extensions": ["pcf"]
  },
  "application/x-font-snf": {
    "source": "apache",
    "extensions": ["snf"]
  },
  "application/x-font-speedo": {
    "source": "apache"
  },
  "application/x-font-sunos-news": {
    "source": "apache"
  },
  "application/x-font-type1": {
    "source": "apache",
    "extensions": ["pfa","pfb","pfm","afm"]
  },
  "application/x-font-vfont": {
    "source": "apache"
  },
  "application/x-freearc": {
    "source": "apache",
    "extensions": ["arc"]
  },
  "application/x-futuresplash": {
    "source": "apache",
    "extensions": ["spl"]
  },
  "application/x-gca-compressed": {
    "source": "apache",
    "extensions": ["gca"]
  },
  "application/x-glulx": {
    "source": "apache",
    "extensions": ["ulx"]
  },
  "application/x-gnumeric": {
    "source": "apache",
    "extensions": ["gnumeric"]
  },
  "application/x-gramps-xml": {
    "source": "apache",
    "extensions": ["gramps"]
  },
  "application/x-gtar": {
    "source": "apache",
    "extensions": ["gtar"]
  },
  "application/x-gzip": {
    "source": "apache"
  },
  "application/x-hdf": {
    "source": "apache",
    "extensions": ["hdf"]
  },
  "application/x-httpd-php": {
    "compressible": true,
    "extensions": ["php"]
  },
  "application/x-install-instructions": {
    "source": "apache",
    "extensions": ["install"]
  },
  "application/x-iso9660-image": {
    "source": "apache",
    "extensions": ["iso"]
  },
  "application/x-iwork-keynote-sffkey": {
    "extensions": ["key"]
  },
  "application/x-iwork-numbers-sffnumbers": {
    "extensions": ["numbers"]
  },
  "application/x-iwork-pages-sffpages": {
    "extensions": ["pages"]
  },
  "application/x-java-archive-diff": {
    "source": "nginx",
    "extensions": ["jardiff"]
  },
  "application/x-java-jnlp-file": {
    "source": "apache",
    "compressible": false,
    "extensions": ["jnlp"]
  },
  "application/x-javascript": {
    "compressible": true
  },
  "application/x-keepass2": {
    "extensions": ["kdbx"]
  },
  "application/x-latex": {
    "source": "apache",
    "compressible": false,
    "extensions": ["latex"]
  },
  "application/x-lua-bytecode": {
    "extensions": ["luac"]
  },
  "application/x-lzh-compressed": {
    "source": "apache",
    "extensions": ["lzh","lha"]
  },
  "application/x-makeself": {
    "source": "nginx",
    "extensions": ["run"]
  },
  "application/x-mie": {
    "source": "apache",
    "extensions": ["mie"]
  },
  "application/x-mobipocket-ebook": {
    "source": "apache",
    "extensions": ["prc","mobi"]
  },
  "application/x-mpegurl": {
    "compressible": false
  },
  "application/x-ms-application": {
    "source": "apache",
    "extensions": ["application"]
  },
  "application/x-ms-shortcut": {
    "source": "apache",
    "extensions": ["lnk"]
  },
  "application/x-ms-wmd": {
    "source": "apache",
    "extensions": ["wmd"]
  },
  "application/x-ms-wmz": {
    "source": "apache",
    "extensions": ["wmz"]
  },
  "application/x-ms-xbap": {
    "source": "apache",
    "extensions": ["xbap"]
  },
  "application/x-msaccess": {
    "source": "apache",
    "extensions": ["mdb"]
  },
  "application/x-msbinder": {
    "source": "apache",
    "extensions": ["obd"]
  },
  "application/x-mscardfile": {
    "source": "apache",
    "extensions": ["crd"]
  },
  "application/x-msclip": {
    "source": "apache",
    "extensions": ["clp"]
  },
  "application/x-msdos-program": {
    "extensions": ["exe"]
  },
  "application/x-msdownload": {
    "source": "apache",
    "extensions": ["exe","dll","com","bat","msi"]
  },
  "application/x-msmediaview": {
    "source": "apache",
    "extensions": ["mvb","m13","m14"]
  },
  "application/x-msmetafile": {
    "source": "apache",
    "extensions": ["wmf","wmz","emf","emz"]
  },
  "application/x-msmoney": {
    "source": "apache",
    "extensions": ["mny"]
  },
  "application/x-mspublisher": {
    "source": "apache",
    "extensions": ["pub"]
  },
  "application/x-msschedule": {
    "source": "apache",
    "extensions": ["scd"]
  },
  "application/x-msterminal": {
    "source": "apache",
    "extensions": ["trm"]
  },
  "application/x-mswrite": {
    "source": "apache",
    "extensions": ["wri"]
  },
  "application/x-netcdf": {
    "source": "apache",
    "extensions": ["nc","cdf"]
  },
  "application/x-ns-proxy-autoconfig": {
    "compressible": true,
    "extensions": ["pac"]
  },
  "application/x-nzb": {
    "source": "apache",
    "extensions": ["nzb"]
  },
  "application/x-perl": {
    "source": "nginx",
    "extensions": ["pl","pm"]
  },
  "application/x-pilot": {
    "source": "nginx",
    "extensions": ["prc","pdb"]
  },
  "application/x-pkcs12": {
    "source": "apache",
    "compressible": false,
    "extensions": ["p12","pfx"]
  },
  "application/x-pkcs7-certificates": {
    "source": "apache",
    "extensions": ["p7b","spc"]
  },
  "application/x-pkcs7-certreqresp": {
    "source": "apache",
    "extensions": ["p7r"]
  },
  "application/x-pki-message": {
    "source": "iana"
  },
  "application/x-rar-compressed": {
    "source": "apache",
    "compressible": false,
    "extensions": ["rar"]
  },
  "application/x-redhat-package-manager": {
    "source": "nginx",
    "extensions": ["rpm"]
  },
  "application/x-research-info-systems": {
    "source": "apache",
    "extensions": ["ris"]
  },
  "application/x-sea": {
    "source": "nginx",
    "extensions": ["sea"]
  },
  "application/x-sh": {
    "source": "apache",
    "compressible": true,
    "extensions": ["sh"]
  },
  "application/x-shar": {
    "source": "apache",
    "extensions": ["shar"]
  },
  "application/x-shockwave-flash": {
    "source": "apache",
    "compressible": false,
    "extensions": ["swf"]
  },
  "application/x-silverlight-app": {
    "source": "apache",
    "extensions": ["xap"]
  },
  "application/x-sql": {
    "source": "apache",
    "extensions": ["sql"]
  },
  "application/x-stuffit": {
    "source": "apache",
    "compressible": false,
    "extensions": ["sit"]
  },
  "application/x-stuffitx": {
    "source": "apache",
    "extensions": ["sitx"]
  },
  "application/x-subrip": {
    "source": "apache",
    "extensions": ["srt"]
  },
  "application/x-sv4cpio": {
    "source": "apache",
    "extensions": ["sv4cpio"]
  },
  "application/x-sv4crc": {
    "source": "apache",
    "extensions": ["sv4crc"]
  },
  "application/x-t3vm-image": {
    "source": "apache",
    "extensions": ["t3"]
  },
  "application/x-tads": {
    "source": "apache",
    "extensions": ["gam"]
  },
  "application/x-tar": {
    "source": "apache",
    "compressible": true,
    "extensions": ["tar"]
  },
  "application/x-tcl": {
    "source": "apache",
    "extensions": ["tcl","tk"]
  },
  "application/x-tex": {
    "source": "apache",
    "extensions": ["tex"]
  },
  "application/x-tex-tfm": {
    "source": "apache",
    "extensions": ["tfm"]
  },
  "application/x-texinfo": {
    "source": "apache",
    "extensions": ["texinfo","texi"]
  },
  "application/x-tgif": {
    "source": "apache",
    "extensions": ["obj"]
  },
  "application/x-ustar": {
    "source": "apache",
    "extensions": ["ustar"]
  },
  "application/x-virtualbox-hdd": {
    "compressible": true,
    "extensions": ["hdd"]
  },
  "application/x-virtualbox-ova": {
    "compressible": true,
    "extensions": ["ova"]
  },
  "application/x-virtualbox-ovf": {
    "compressible": true,
    "extensions": ["ovf"]
  },
  "application/x-virtualbox-vbox": {
    "compressible": true,
    "extensions": ["vbox"]
  },
  "application/x-virtualbox-vbox-extpack": {
    "compressible": false,
    "extensions": ["vbox-extpack"]
  },
  "application/x-virtualbox-vdi": {
    "compressible": true,
    "extensions": ["vdi"]
  },
  "application/x-virtualbox-vhd": {
    "compressible": true,
    "extensions": ["vhd"]
  },
  "application/x-virtualbox-vmdk": {
    "compressible": true,
    "extensions": ["vmdk"]
  },
  "application/x-wais-source": {
    "source": "apache",
    "extensions": ["src"]
  },
  "application/x-web-app-manifest+json": {
    "compressible": true,
    "extensions": ["webapp"]
  },
  "application/x-www-form-urlencoded": {
    "source": "iana",
    "compressible": true
  },
  "application/x-x509-ca-cert": {
    "source": "iana",
    "extensions": ["der","crt","pem"]
  },
  "application/x-x509-ca-ra-cert": {
    "source": "iana"
  },
  "application/x-x509-next-ca-cert": {
    "source": "iana"
  },
  "application/x-xfig": {
    "source": "apache",
    "extensions": ["fig"]
  },
  "application/x-xliff+xml": {
    "source": "apache",
    "compressible": true,
    "extensions": ["xlf"]
  },
  "application/x-xpinstall": {
    "source": "apache",
    "compressible": false,
    "extensions": ["xpi"]
  },
  "application/x-xz": {
    "source": "apache",
    "extensions": ["xz"]
  },
  "application/x-zmachine": {
    "source": "apache",
    "extensions": ["z1","z2","z3","z4","z5","z6","z7","z8"]
  },
  "application/x400-bp": {
    "source": "iana"
  },
  "application/xacml+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/xaml+xml": {
    "source": "apache",
    "compressible": true,
    "extensions": ["xaml"]
  },
  "application/xcap-att+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xav"]
  },
  "application/xcap-caps+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xca"]
  },
  "application/xcap-diff+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xdf"]
  },
  "application/xcap-el+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xel"]
  },
  "application/xcap-error+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/xcap-ns+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xns"]
  },
  "application/xcon-conference-info+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/xcon-conference-info-diff+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/xenc+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xenc"]
  },
  "application/xhtml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xhtml","xht"]
  },
  "application/xhtml-voice+xml": {
    "source": "apache",
    "compressible": true
  },
  "application/xliff+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xlf"]
  },
  "application/xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xml","xsl","xsd","rng"]
  },
  "application/xml-dtd": {
    "source": "iana",
    "compressible": true,
    "extensions": ["dtd"]
  },
  "application/xml-external-parsed-entity": {
    "source": "iana"
  },
  "application/xml-patch+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/xmpp+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/xop+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xop"]
  },
  "application/xproc+xml": {
    "source": "apache",
    "compressible": true,
    "extensions": ["xpl"]
  },
  "application/xslt+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xsl","xslt"]
  },
  "application/xspf+xml": {
    "source": "apache",
    "compressible": true,
    "extensions": ["xspf"]
  },
  "application/xv+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["mxml","xhvml","xvml","xvm"]
  },
  "application/yang": {
    "source": "iana",
    "extensions": ["yang"]
  },
  "application/yang-data+json": {
    "source": "iana",
    "compressible": true
  },
  "application/yang-data+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/yang-patch+json": {
    "source": "iana",
    "compressible": true
  },
  "application/yang-patch+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/yin+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["yin"]
  },
  "application/zip": {
    "source": "iana",
    "compressible": false,
    "extensions": ["zip"]
  },
  "application/zlib": {
    "source": "iana"
  },
  "application/zstd": {
    "source": "iana"
  },
  "audio/1d-interleaved-parityfec": {
    "source": "iana"
  },
  "audio/32kadpcm": {
    "source": "iana"
  },
  "audio/3gpp": {
    "source": "iana",
    "compressible": false,
    "extensions": ["3gpp"]
  },
  "audio/3gpp2": {
    "source": "iana"
  },
  "audio/aac": {
    "source": "iana"
  },
  "audio/ac3": {
    "source": "iana"
  },
  "audio/adpcm": {
    "source": "apache",
    "extensions": ["adp"]
  },
  "audio/amr": {
    "source": "iana",
    "extensions": ["amr"]
  },
  "audio/amr-wb": {
    "source": "iana"
  },
  "audio/amr-wb+": {
    "source": "iana"
  },
  "audio/aptx": {
    "source": "iana"
  },
  "audio/asc": {
    "source": "iana"
  },
  "audio/atrac-advanced-lossless": {
    "source": "iana"
  },
  "audio/atrac-x": {
    "source": "iana"
  },
  "audio/atrac3": {
    "source": "iana"
  },
  "audio/basic": {
    "source": "iana",
    "compressible": false,
    "extensions": ["au","snd"]
  },
  "audio/bv16": {
    "source": "iana"
  },
  "audio/bv32": {
    "source": "iana"
  },
  "audio/clearmode": {
    "source": "iana"
  },
  "audio/cn": {
    "source": "iana"
  },
  "audio/dat12": {
    "source": "iana"
  },
  "audio/dls": {
    "source": "iana"
  },
  "audio/dsr-es201108": {
    "source": "iana"
  },
  "audio/dsr-es202050": {
    "source": "iana"
  },
  "audio/dsr-es202211": {
    "source": "iana"
  },
  "audio/dsr-es202212": {
    "source": "iana"
  },
  "audio/dv": {
    "source": "iana"
  },
  "audio/dvi4": {
    "source": "iana"
  },
  "audio/eac3": {
    "source": "iana"
  },
  "audio/encaprtp": {
    "source": "iana"
  },
  "audio/evrc": {
    "source": "iana"
  },
  "audio/evrc-qcp": {
    "source": "iana"
  },
  "audio/evrc0": {
    "source": "iana"
  },
  "audio/evrc1": {
    "source": "iana"
  },
  "audio/evrcb": {
    "source": "iana"
  },
  "audio/evrcb0": {
    "source": "iana"
  },
  "audio/evrcb1": {
    "source": "iana"
  },
  "audio/evrcnw": {
    "source": "iana"
  },
  "audio/evrcnw0": {
    "source": "iana"
  },
  "audio/evrcnw1": {
    "source": "iana"
  },
  "audio/evrcwb": {
    "source": "iana"
  },
  "audio/evrcwb0": {
    "source": "iana"
  },
  "audio/evrcwb1": {
    "source": "iana"
  },
  "audio/evs": {
    "source": "iana"
  },
  "audio/flexfec": {
    "source": "iana"
  },
  "audio/fwdred": {
    "source": "iana"
  },
  "audio/g711-0": {
    "source": "iana"
  },
  "audio/g719": {
    "source": "iana"
  },
  "audio/g722": {
    "source": "iana"
  },
  "audio/g7221": {
    "source": "iana"
  },
  "audio/g723": {
    "source": "iana"
  },
  "audio/g726-16": {
    "source": "iana"
  },
  "audio/g726-24": {
    "source": "iana"
  },
  "audio/g726-32": {
    "source": "iana"
  },
  "audio/g726-40": {
    "source": "iana"
  },
  "audio/g728": {
    "source": "iana"
  },
  "audio/g729": {
    "source": "iana"
  },
  "audio/g7291": {
    "source": "iana"
  },
  "audio/g729d": {
    "source": "iana"
  },
  "audio/g729e": {
    "source": "iana"
  },
  "audio/gsm": {
    "source": "iana"
  },
  "audio/gsm-efr": {
    "source": "iana"
  },
  "audio/gsm-hr-08": {
    "source": "iana"
  },
  "audio/ilbc": {
    "source": "iana"
  },
  "audio/ip-mr_v2.5": {
    "source": "iana"
  },
  "audio/isac": {
    "source": "apache"
  },
  "audio/l16": {
    "source": "iana"
  },
  "audio/l20": {
    "source": "iana"
  },
  "audio/l24": {
    "source": "iana",
    "compressible": false
  },
  "audio/l8": {
    "source": "iana"
  },
  "audio/lpc": {
    "source": "iana"
  },
  "audio/melp": {
    "source": "iana"
  },
  "audio/melp1200": {
    "source": "iana"
  },
  "audio/melp2400": {
    "source": "iana"
  },
  "audio/melp600": {
    "source": "iana"
  },
  "audio/mhas": {
    "source": "iana"
  },
  "audio/midi": {
    "source": "apache",
    "extensions": ["mid","midi","kar","rmi"]
  },
  "audio/mobile-xmf": {
    "source": "iana",
    "extensions": ["mxmf"]
  },
  "audio/mp3": {
    "compressible": false,
    "extensions": ["mp3"]
  },
  "audio/mp4": {
    "source": "iana",
    "compressible": false,
    "extensions": ["m4a","mp4a"]
  },
  "audio/mp4a-latm": {
    "source": "iana"
  },
  "audio/mpa": {
    "source": "iana"
  },
  "audio/mpa-robust": {
    "source": "iana"
  },
  "audio/mpeg": {
    "source": "iana",
    "compressible": false,
    "extensions": ["mpga","mp2","mp2a","mp3","m2a","m3a"]
  },
  "audio/mpeg4-generic": {
    "source": "iana"
  },
  "audio/musepack": {
    "source": "apache"
  },
  "audio/ogg": {
    "source": "iana",
    "compressible": false,
    "extensions": ["oga","ogg","spx","opus"]
  },
  "audio/opus": {
    "source": "iana"
  },
  "audio/parityfec": {
    "source": "iana"
  },
  "audio/pcma": {
    "source": "iana"
  },
  "audio/pcma-wb": {
    "source": "iana"
  },
  "audio/pcmu": {
    "source": "iana"
  },
  "audio/pcmu-wb": {
    "source": "iana"
  },
  "audio/prs.sid": {
    "source": "iana"
  },
  "audio/qcelp": {
    "source": "iana"
  },
  "audio/raptorfec": {
    "source": "iana"
  },
  "audio/red": {
    "source": "iana"
  },
  "audio/rtp-enc-aescm128": {
    "source": "iana"
  },
  "audio/rtp-midi": {
    "source": "iana"
  },
  "audio/rtploopback": {
    "source": "iana"
  },
  "audio/rtx": {
    "source": "iana"
  },
  "audio/s3m": {
    "source": "apache",
    "extensions": ["s3m"]
  },
  "audio/scip": {
    "source": "iana"
  },
  "audio/silk": {
    "source": "apache",
    "extensions": ["sil"]
  },
  "audio/smv": {
    "source": "iana"
  },
  "audio/smv-qcp": {
    "source": "iana"
  },
  "audio/smv0": {
    "source": "iana"
  },
  "audio/sofa": {
    "source": "iana"
  },
  "audio/sp-midi": {
    "source": "iana"
  },
  "audio/speex": {
    "source": "iana"
  },
  "audio/t140c": {
    "source": "iana"
  },
  "audio/t38": {
    "source": "iana"
  },
  "audio/telephone-event": {
    "source": "iana"
  },
  "audio/tetra_acelp": {
    "source": "iana"
  },
  "audio/tetra_acelp_bb": {
    "source": "iana"
  },
  "audio/tone": {
    "source": "iana"
  },
  "audio/tsvcis": {
    "source": "iana"
  },
  "audio/uemclip": {
    "source": "iana"
  },
  "audio/ulpfec": {
    "source": "iana"
  },
  "audio/usac": {
    "source": "iana"
  },
  "audio/vdvi": {
    "source": "iana"
  },
  "audio/vmr-wb": {
    "source": "iana"
  },
  "audio/vnd.3gpp.iufp": {
    "source": "iana"
  },
  "audio/vnd.4sb": {
    "source": "iana"
  },
  "audio/vnd.audiokoz": {
    "source": "iana"
  },
  "audio/vnd.celp": {
    "source": "iana"
  },
  "audio/vnd.cisco.nse": {
    "source": "iana"
  },
  "audio/vnd.cmles.radio-events": {
    "source": "iana"
  },
  "audio/vnd.cns.anp1": {
    "source": "iana"
  },
  "audio/vnd.cns.inf1": {
    "source": "iana"
  },
  "audio/vnd.dece.audio": {
    "source": "iana",
    "extensions": ["uva","uvva"]
  },
  "audio/vnd.digital-winds": {
    "source": "iana",
    "extensions": ["eol"]
  },
  "audio/vnd.dlna.adts": {
    "source": "iana"
  },
  "audio/vnd.dolby.heaac.1": {
    "source": "iana"
  },
  "audio/vnd.dolby.heaac.2": {
    "source": "iana"
  },
  "audio/vnd.dolby.mlp": {
    "source": "iana"
  },
  "audio/vnd.dolby.mps": {
    "source": "iana"
  },
  "audio/vnd.dolby.pl2": {
    "source": "iana"
  },
  "audio/vnd.dolby.pl2x": {
    "source": "iana"
  },
  "audio/vnd.dolby.pl2z": {
    "source": "iana"
  },
  "audio/vnd.dolby.pulse.1": {
    "source": "iana"
  },
  "audio/vnd.dra": {
    "source": "iana",
    "extensions": ["dra"]
  },
  "audio/vnd.dts": {
    "source": "iana",
    "extensions": ["dts"]
  },
  "audio/vnd.dts.hd": {
    "source": "iana",
    "extensions": ["dtshd"]
  },
  "audio/vnd.dts.uhd": {
    "source": "iana"
  },
  "audio/vnd.dvb.file": {
    "source": "iana"
  },
  "audio/vnd.everad.plj": {
    "source": "iana"
  },
  "audio/vnd.hns.audio": {
    "source": "iana"
  },
  "audio/vnd.lucent.voice": {
    "source": "iana",
    "extensions": ["lvp"]
  },
  "audio/vnd.ms-playready.media.pya": {
    "source": "iana",
    "extensions": ["pya"]
  },
  "audio/vnd.nokia.mobile-xmf": {
    "source": "iana"
  },
  "audio/vnd.nortel.vbk": {
    "source": "iana"
  },
  "audio/vnd.nuera.ecelp4800": {
    "source": "iana",
    "extensions": ["ecelp4800"]
  },
  "audio/vnd.nuera.ecelp7470": {
    "source": "iana",
    "extensions": ["ecelp7470"]
  },
  "audio/vnd.nuera.ecelp9600": {
    "source": "iana",
    "extensions": ["ecelp9600"]
  },
  "audio/vnd.octel.sbc": {
    "source": "iana"
  },
  "audio/vnd.presonus.multitrack": {
    "source": "iana"
  },
  "audio/vnd.qcelp": {
    "source": "iana"
  },
  "audio/vnd.rhetorex.32kadpcm": {
    "source": "iana"
  },
  "audio/vnd.rip": {
    "source": "iana",
    "extensions": ["rip"]
  },
  "audio/vnd.rn-realaudio": {
    "compressible": false
  },
  "audio/vnd.sealedmedia.softseal.mpeg": {
    "source": "iana"
  },
  "audio/vnd.vmx.cvsd": {
    "source": "iana"
  },
  "audio/vnd.wave": {
    "compressible": false
  },
  "audio/vorbis": {
    "source": "iana",
    "compressible": false
  },
  "audio/vorbis-config": {
    "source": "iana"
  },
  "audio/wav": {
    "compressible": false,
    "extensions": ["wav"]
  },
  "audio/wave": {
    "compressible": false,
    "extensions": ["wav"]
  },
  "audio/webm": {
    "source": "apache",
    "compressible": false,
    "extensions": ["weba"]
  },
  "audio/x-aac": {
    "source": "apache",
    "compressible": false,
    "extensions": ["aac"]
  },
  "audio/x-aiff": {
    "source": "apache",
    "extensions": ["aif","aiff","aifc"]
  },
  "audio/x-caf": {
    "source": "apache",
    "compressible": false,
    "extensions": ["caf"]
  },
  "audio/x-flac": {
    "source": "apache",
    "extensions": ["flac"]
  },
  "audio/x-m4a": {
    "source": "nginx",
    "extensions": ["m4a"]
  },
  "audio/x-matroska": {
    "source": "apache",
    "extensions": ["mka"]
  },
  "audio/x-mpegurl": {
    "source": "apache",
    "extensions": ["m3u"]
  },
  "audio/x-ms-wax": {
    "source": "apache",
    "extensions": ["wax"]
  },
  "audio/x-ms-wma": {
    "source": "apache",
    "extensions": ["wma"]
  },
  "audio/x-pn-realaudio": {
    "source": "apache",
    "extensions": ["ram","ra"]
  },
  "audio/x-pn-realaudio-plugin": {
    "source": "apache",
    "extensions": ["rmp"]
  },
  "audio/x-realaudio": {
    "source": "nginx",
    "extensions": ["ra"]
  },
  "audio/x-tta": {
    "source": "apache"
  },
  "audio/x-wav": {
    "source": "apache",
    "extensions": ["wav"]
  },
  "audio/xm": {
    "source": "apache",
    "extensions": ["xm"]
  },
  "chemical/x-cdx": {
    "source": "apache",
    "extensions": ["cdx"]
  },
  "chemical/x-cif": {
    "source": "apache",
    "extensions": ["cif"]
  },
  "chemical/x-cmdf": {
    "source": "apache",
    "extensions": ["cmdf"]
  },
  "chemical/x-cml": {
    "source": "apache",
    "extensions": ["cml"]
  },
  "chemical/x-csml": {
    "source": "apache",
    "extensions": ["csml"]
  },
  "chemical/x-pdb": {
    "source": "apache"
  },
  "chemical/x-xyz": {
    "source": "apache",
    "extensions": ["xyz"]
  },
  "font/collection": {
    "source": "iana",
    "extensions": ["ttc"]
  },
  "font/otf": {
    "source": "iana",
    "compressible": true,
    "extensions": ["otf"]
  },
  "font/sfnt": {
    "source": "iana"
  },
  "font/ttf": {
    "source": "iana",
    "compressible": true,
    "extensions": ["ttf"]
  },
  "font/woff": {
    "source": "iana",
    "extensions": ["woff"]
  },
  "font/woff2": {
    "source": "iana",
    "extensions": ["woff2"]
  },
  "image/aces": {
    "source": "iana",
    "extensions": ["exr"]
  },
  "image/apng": {
    "compressible": false,
    "extensions": ["apng"]
  },
  "image/avci": {
    "source": "iana",
    "extensions": ["avci"]
  },
  "image/avcs": {
    "source": "iana",
    "extensions": ["avcs"]
  },
  "image/avif": {
    "source": "iana",
    "compressible": false,
    "extensions": ["avif"]
  },
  "image/bmp": {
    "source": "iana",
    "compressible": true,
    "extensions": ["bmp"]
  },
  "image/cgm": {
    "source": "iana",
    "extensions": ["cgm"]
  },
  "image/dicom-rle": {
    "source": "iana",
    "extensions": ["drle"]
  },
  "image/emf": {
    "source": "iana",
    "extensions": ["emf"]
  },
  "image/fits": {
    "source": "iana",
    "extensions": ["fits"]
  },
  "image/g3fax": {
    "source": "iana",
    "extensions": ["g3"]
  },
  "image/gif": {
    "source": "iana",
    "compressible": false,
    "extensions": ["gif"]
  },
  "image/heic": {
    "source": "iana",
    "extensions": ["heic"]
  },
  "image/heic-sequence": {
    "source": "iana",
    "extensions": ["heics"]
  },
  "image/heif": {
    "source": "iana",
    "extensions": ["heif"]
  },
  "image/heif-sequence": {
    "source": "iana",
    "extensions": ["heifs"]
  },
  "image/hej2k": {
    "source": "iana",
    "extensions": ["hej2"]
  },
  "image/hsj2": {
    "source": "iana",
    "extensions": ["hsj2"]
  },
  "image/ief": {
    "source": "iana",
    "extensions": ["ief"]
  },
  "image/jls": {
    "source": "iana",
    "extensions": ["jls"]
  },
  "image/jp2": {
    "source": "iana",
    "compressible": false,
    "extensions": ["jp2","jpg2"]
  },
  "image/jpeg": {
    "source": "iana",
    "compressible": false,
    "extensions": ["jpeg","jpg","jpe"]
  },
  "image/jph": {
    "source": "iana",
    "extensions": ["jph"]
  },
  "image/jphc": {
    "source": "iana",
    "extensions": ["jhc"]
  },
  "image/jpm": {
    "source": "iana",
    "compressible": false,
    "extensions": ["jpm"]
  },
  "image/jpx": {
    "source": "iana",
    "compressible": false,
    "extensions": ["jpx","jpf"]
  },
  "image/jxr": {
    "source": "iana",
    "extensions": ["jxr"]
  },
  "image/jxra": {
    "source": "iana",
    "extensions": ["jxra"]
  },
  "image/jxrs": {
    "source": "iana",
    "extensions": ["jxrs"]
  },
  "image/jxs": {
    "source": "iana",
    "extensions": ["jxs"]
  },
  "image/jxsc": {
    "source": "iana",
    "extensions": ["jxsc"]
  },
  "image/jxsi": {
    "source": "iana",
    "extensions": ["jxsi"]
  },
  "image/jxss": {
    "source": "iana",
    "extensions": ["jxss"]
  },
  "image/ktx": {
    "source": "iana",
    "extensions": ["ktx"]
  },
  "image/ktx2": {
    "source": "iana",
    "extensions": ["ktx2"]
  },
  "image/naplps": {
    "source": "iana"
  },
  "image/pjpeg": {
    "compressible": false
  },
  "image/png": {
    "source": "iana",
    "compressible": false,
    "extensions": ["png"]
  },
  "image/prs.btif": {
    "source": "iana",
    "extensions": ["btif"]
  },
  "image/prs.pti": {
    "source": "iana",
    "extensions": ["pti"]
  },
  "image/pwg-raster": {
    "source": "iana"
  },
  "image/sgi": {
    "source": "apache",
    "extensions": ["sgi"]
  },
  "image/svg+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["svg","svgz"]
  },
  "image/t38": {
    "source": "iana",
    "extensions": ["t38"]
  },
  "image/tiff": {
    "source": "iana",
    "compressible": false,
    "extensions": ["tif","tiff"]
  },
  "image/tiff-fx": {
    "source": "iana",
    "extensions": ["tfx"]
  },
  "image/vnd.adobe.photoshop": {
    "source": "iana",
    "compressible": true,
    "extensions": ["psd"]
  },
  "image/vnd.airzip.accelerator.azv": {
    "source": "iana",
    "extensions": ["azv"]
  },
  "image/vnd.cns.inf2": {
    "source": "iana"
  },
  "image/vnd.dece.graphic": {
    "source": "iana",
    "extensions": ["uvi","uvvi","uvg","uvvg"]
  },
  "image/vnd.djvu": {
    "source": "iana",
    "extensions": ["djvu","djv"]
  },
  "image/vnd.dvb.subtitle": {
    "source": "iana",
    "extensions": ["sub"]
  },
  "image/vnd.dwg": {
    "source": "iana",
    "extensions": ["dwg"]
  },
  "image/vnd.dxf": {
    "source": "iana",
    "extensions": ["dxf"]
  },
  "image/vnd.fastbidsheet": {
    "source": "iana",
    "extensions": ["fbs"]
  },
  "image/vnd.fpx": {
    "source": "iana",
    "extensions": ["fpx"]
  },
  "image/vnd.fst": {
    "source": "iana",
    "extensions": ["fst"]
  },
  "image/vnd.fujixerox.edmics-mmr": {
    "source": "iana",
    "extensions": ["mmr"]
  },
  "image/vnd.fujixerox.edmics-rlc": {
    "source": "iana",
    "extensions": ["rlc"]
  },
  "image/vnd.globalgraphics.pgb": {
    "source": "iana"
  },
  "image/vnd.microsoft.icon": {
    "source": "iana",
    "compressible": true,
    "extensions": ["ico"]
  },
  "image/vnd.mix": {
    "source": "iana"
  },
  "image/vnd.mozilla.apng": {
    "source": "iana"
  },
  "image/vnd.ms-dds": {
    "compressible": true,
    "extensions": ["dds"]
  },
  "image/vnd.ms-modi": {
    "source": "iana",
    "extensions": ["mdi"]
  },
  "image/vnd.ms-photo": {
    "source": "apache",
    "extensions": ["wdp"]
  },
  "image/vnd.net-fpx": {
    "source": "iana",
    "extensions": ["npx"]
  },
  "image/vnd.pco.b16": {
    "source": "iana",
    "extensions": ["b16"]
  },
  "image/vnd.radiance": {
    "source": "iana"
  },
  "image/vnd.sealed.png": {
    "source": "iana"
  },
  "image/vnd.sealedmedia.softseal.gif": {
    "source": "iana"
  },
  "image/vnd.sealedmedia.softseal.jpg": {
    "source": "iana"
  },
  "image/vnd.svf": {
    "source": "iana"
  },
  "image/vnd.tencent.tap": {
    "source": "iana",
    "extensions": ["tap"]
  },
  "image/vnd.valve.source.texture": {
    "source": "iana",
    "extensions": ["vtf"]
  },
  "image/vnd.wap.wbmp": {
    "source": "iana",
    "extensions": ["wbmp"]
  },
  "image/vnd.xiff": {
    "source": "iana",
    "extensions": ["xif"]
  },
  "image/vnd.zbrush.pcx": {
    "source": "iana",
    "extensions": ["pcx"]
  },
  "image/webp": {
    "source": "apache",
    "extensions": ["webp"]
  },
  "image/wmf": {
    "source": "iana",
    "extensions": ["wmf"]
  },
  "image/x-3ds": {
    "source": "apache",
    "extensions": ["3ds"]
  },
  "image/x-cmu-raster": {
    "source": "apache",
    "extensions": ["ras"]
  },
  "image/x-cmx": {
    "source": "apache",
    "extensions": ["cmx"]
  },
  "image/x-freehand": {
    "source": "apache",
    "extensions": ["fh","fhc","fh4","fh5","fh7"]
  },
  "image/x-icon": {
    "source": "apache",
    "compressible": true,
    "extensions": ["ico"]
  },
  "image/x-jng": {
    "source": "nginx",
    "extensions": ["jng"]
  },
  "image/x-mrsid-image": {
    "source": "apache",
    "extensions": ["sid"]
  },
  "image/x-ms-bmp": {
    "source": "nginx",
    "compressible": true,
    "extensions": ["bmp"]
  },
  "image/x-pcx": {
    "source": "apache",
    "extensions": ["pcx"]
  },
  "image/x-pict": {
    "source": "apache",
    "extensions": ["pic","pct"]
  },
  "image/x-portable-anymap": {
    "source": "apache",
    "extensions": ["pnm"]
  },
  "image/x-portable-bitmap": {
    "source": "apache",
    "extensions": ["pbm"]
  },
  "image/x-portable-graymap": {
    "source": "apache",
    "extensions": ["pgm"]
  },
  "image/x-portable-pixmap": {
    "source": "apache",
    "extensions": ["ppm"]
  },
  "image/x-rgb": {
    "source": "apache",
    "extensions": ["rgb"]
  },
  "image/x-tga": {
    "source": "apache",
    "extensions": ["tga"]
  },
  "image/x-xbitmap": {
    "source": "apache",
    "extensions": ["xbm"]
  },
  "image/x-xcf": {
    "compressible": false
  },
  "image/x-xpixmap": {
    "source": "apache",
    "extensions": ["xpm"]
  },
  "image/x-xwindowdump": {
    "source": "apache",
    "extensions": ["xwd"]
  },
  "message/cpim": {
    "source": "iana"
  },
  "message/delivery-status": {
    "source": "iana"
  },
  "message/disposition-notification": {
    "source": "iana",
    "extensions": [
      "disposition-notification"
    ]
  },
  "message/external-body": {
    "source": "iana"
  },
  "message/feedback-report": {
    "source": "iana"
  },
  "message/global": {
    "source": "iana",
    "extensions": ["u8msg"]
  },
  "message/global-delivery-status": {
    "source": "iana",
    "extensions": ["u8dsn"]
  },
  "message/global-disposition-notification": {
    "source": "iana",
    "extensions": ["u8mdn"]
  },
  "message/global-headers": {
    "source": "iana",
    "extensions": ["u8hdr"]
  },
  "message/http": {
    "source": "iana",
    "compressible": false
  },
  "message/imdn+xml": {
    "source": "iana",
    "compressible": true
  },
  "message/news": {
    "source": "iana"
  },
  "message/partial": {
    "source": "iana",
    "compressible": false
  },
  "message/rfc822": {
    "source": "iana",
    "compressible": true,
    "extensions": ["eml","mime"]
  },
  "message/s-http": {
    "source": "iana"
  },
  "message/sip": {
    "source": "iana"
  },
  "message/sipfrag": {
    "source": "iana"
  },
  "message/tracking-status": {
    "source": "iana"
  },
  "message/vnd.si.simp": {
    "source": "iana"
  },
  "message/vnd.wfa.wsc": {
    "source": "iana",
    "extensions": ["wsc"]
  },
  "model/3mf": {
    "source": "iana",
    "extensions": ["3mf"]
  },
  "model/e57": {
    "source": "iana"
  },
  "model/gltf+json": {
    "source": "iana",
    "compressible": true,
    "extensions": ["gltf"]
  },
  "model/gltf-binary": {
    "source": "iana",
    "compressible": true,
    "extensions": ["glb"]
  },
  "model/iges": {
    "source": "iana",
    "compressible": false,
    "extensions": ["igs","iges"]
  },
  "model/mesh": {
    "source": "iana",
    "compressible": false,
    "extensions": ["msh","mesh","silo"]
  },
  "model/mtl": {
    "source": "iana",
    "extensions": ["mtl"]
  },
  "model/obj": {
    "source": "iana",
    "extensions": ["obj"]
  },
  "model/step": {
    "source": "iana"
  },
  "model/step+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["stpx"]
  },
  "model/step+zip": {
    "source": "iana",
    "compressible": false,
    "extensions": ["stpz"]
  },
  "model/step-xml+zip": {
    "source": "iana",
    "compressible": false,
    "extensions": ["stpxz"]
  },
  "model/stl": {
    "source": "iana",
    "extensions": ["stl"]
  },
  "model/vnd.collada+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["dae"]
  },
  "model/vnd.dwf": {
    "source": "iana",
    "extensions": ["dwf"]
  },
  "model/vnd.flatland.3dml": {
    "source": "iana"
  },
  "model/vnd.gdl": {
    "source": "iana",
    "extensions": ["gdl"]
  },
  "model/vnd.gs-gdl": {
    "source": "apache"
  },
  "model/vnd.gs.gdl": {
    "source": "iana"
  },
  "model/vnd.gtw": {
    "source": "iana",
    "extensions": ["gtw"]
  },
  "model/vnd.moml+xml": {
    "source": "iana",
    "compressible": true
  },
  "model/vnd.mts": {
    "source": "iana",
    "extensions": ["mts"]
  },
  "model/vnd.opengex": {
    "source": "iana",
    "extensions": ["ogex"]
  },
  "model/vnd.parasolid.transmit.binary": {
    "source": "iana",
    "extensions": ["x_b"]
  },
  "model/vnd.parasolid.transmit.text": {
    "source": "iana",
    "extensions": ["x_t"]
  },
  "model/vnd.pytha.pyox": {
    "source": "iana"
  },
  "model/vnd.rosette.annotated-data-model": {
    "source": "iana"
  },
  "model/vnd.sap.vds": {
    "source": "iana",
    "extensions": ["vds"]
  },
  "model/vnd.usdz+zip": {
    "source": "iana",
    "compressible": false,
    "extensions": ["usdz"]
  },
  "model/vnd.valve.source.compiled-map": {
    "source": "iana",
    "extensions": ["bsp"]
  },
  "model/vnd.vtu": {
    "source": "iana",
    "extensions": ["vtu"]
  },
  "model/vrml": {
    "source": "iana",
    "compressible": false,
    "extensions": ["wrl","vrml"]
  },
  "model/x3d+binary": {
    "source": "apache",
    "compressible": false,
    "extensions": ["x3db","x3dbz"]
  },
  "model/x3d+fastinfoset": {
    "source": "iana",
    "extensions": ["x3db"]
  },
  "model/x3d+vrml": {
    "source": "apache",
    "compressible": false,
    "extensions": ["x3dv","x3dvz"]
  },
  "model/x3d+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["x3d","x3dz"]
  },
  "model/x3d-vrml": {
    "source": "iana",
    "extensions": ["x3dv"]
  },
  "multipart/alternative": {
    "source": "iana",
    "compressible": false
  },
  "multipart/appledouble": {
    "source": "iana"
  },
  "multipart/byteranges": {
    "source": "iana"
  },
  "multipart/digest": {
    "source": "iana"
  },
  "multipart/encrypted": {
    "source": "iana",
    "compressible": false
  },
  "multipart/form-data": {
    "source": "iana",
    "compressible": false
  },
  "multipart/header-set": {
    "source": "iana"
  },
  "multipart/mixed": {
    "source": "iana"
  },
  "multipart/multilingual": {
    "source": "iana"
  },
  "multipart/parallel": {
    "source": "iana"
  },
  "multipart/related": {
    "source": "iana",
    "compressible": false
  },
  "multipart/report": {
    "source": "iana"
  },
  "multipart/signed": {
    "source": "iana",
    "compressible": false
  },
  "multipart/vnd.bint.med-plus": {
    "source": "iana"
  },
  "multipart/voice-message": {
    "source": "iana"
  },
  "multipart/x-mixed-replace": {
    "source": "iana"
  },
  "text/1d-interleaved-parityfec": {
    "source": "iana"
  },
  "text/cache-manifest": {
    "source": "iana",
    "compressible": true,
    "extensions": ["appcache","manifest"]
  },
  "text/calendar": {
    "source": "iana",
    "extensions": ["ics","ifb"]
  },
  "text/calender": {
    "compressible": true
  },
  "text/cmd": {
    "compressible": true
  },
  "text/coffeescript": {
    "extensions": ["coffee","litcoffee"]
  },
  "text/cql": {
    "source": "iana"
  },
  "text/cql-expression": {
    "source": "iana"
  },
  "text/cql-identifier": {
    "source": "iana"
  },
  "text/css": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
    "extensions": ["css"]
  },
  "text/csv": {
    "source": "iana",
    "compressible": true,
    "extensions": ["csv"]
  },
  "text/csv-schema": {
    "source": "iana"
  },
  "text/directory": {
    "source": "iana"
  },
  "text/dns": {
    "source": "iana"
  },
  "text/ecmascript": {
    "source": "iana"
  },
  "text/encaprtp": {
    "source": "iana"
  },
  "text/enriched": {
    "source": "iana"
  },
  "text/fhirpath": {
    "source": "iana"
  },
  "text/flexfec": {
    "source": "iana"
  },
  "text/fwdred": {
    "source": "iana"
  },
  "text/gff3": {
    "source": "iana"
  },
  "text/grammar-ref-list": {
    "source": "iana"
  },
  "text/html": {
    "source": "iana",
    "compressible": true,
    "extensions": ["html","htm","shtml"]
  },
  "text/jade": {
    "extensions": ["jade"]
  },
  "text/javascript": {
    "source": "iana",
    "compressible": true
  },
  "text/jcr-cnd": {
    "source": "iana"
  },
  "text/jsx": {
    "compressible": true,
    "extensions": ["jsx"]
  },
  "text/less": {
    "compressible": true,
    "extensions": ["less"]
  },
  "text/markdown": {
    "source": "iana",
    "compressible": true,
    "extensions": ["markdown","md"]
  },
  "text/mathml": {
    "source": "nginx",
    "extensions": ["mml"]
  },
  "text/mdx": {
    "compressible": true,
    "extensions": ["mdx"]
  },
  "text/mizar": {
    "source": "iana"
  },
  "text/n3": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
    "extensions": ["n3"]
  },
  "text/parameters": {
    "source": "iana",
    "charset": "UTF-8"
  },
  "text/parityfec": {
    "source": "iana"
  },
  "text/plain": {
    "source": "iana",
    "compressible": true,
    "extensions": ["txt","text","conf","def","list","log","in","ini"]
  },
  "text/provenance-notation": {
    "source": "iana",
    "charset": "UTF-8"
  },
  "text/prs.fallenstein.rst": {
    "source": "iana"
  },
  "text/prs.lines.tag": {
    "source": "iana",
    "extensions": ["dsc"]
  },
  "text/prs.prop.logic": {
    "source": "iana"
  },
  "text/raptorfec": {
    "source": "iana"
  },
  "text/red": {
    "source": "iana"
  },
  "text/rfc822-headers": {
    "source": "iana"
  },
  "text/richtext": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rtx"]
  },
  "text/rtf": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rtf"]
  },
  "text/rtp-enc-aescm128": {
    "source": "iana"
  },
  "text/rtploopback": {
    "source": "iana"
  },
  "text/rtx": {
    "source": "iana"
  },
  "text/sgml": {
    "source": "iana",
    "extensions": ["sgml","sgm"]
  },
  "text/shaclc": {
    "source": "iana"
  },
  "text/shex": {
    "source": "iana",
    "extensions": ["shex"]
  },
  "text/slim": {
    "extensions": ["slim","slm"]
  },
  "text/spdx": {
    "source": "iana",
    "extensions": ["spdx"]
  },
  "text/strings": {
    "source": "iana"
  },
  "text/stylus": {
    "extensions": ["stylus","styl"]
  },
  "text/t140": {
    "source": "iana"
  },
  "text/tab-separated-values": {
    "source": "iana",
    "compressible": true,
    "extensions": ["tsv"]
  },
  "text/troff": {
    "source": "iana",
    "extensions": ["t","tr","roff","man","me","ms"]
  },
  "text/turtle": {
    "source": "iana",
    "charset": "UTF-8",
    "extensions": ["ttl"]
  },
  "text/ulpfec": {
    "source": "iana"
  },
  "text/uri-list": {
    "source": "iana",
    "compressible": true,
    "extensions": ["uri","uris","urls"]
  },
  "text/vcard": {
    "source": "iana",
    "compressible": true,
    "extensions": ["vcard"]
  },
  "text/vnd.a": {
    "source": "iana"
  },
  "text/vnd.abc": {
    "source": "iana"
  },
  "text/vnd.ascii-art": {
    "source": "iana"
  },
  "text/vnd.curl": {
    "source": "iana",
    "extensions": ["curl"]
  },
  "text/vnd.curl.dcurl": {
    "source": "apache",
    "extensions": ["dcurl"]
  },
  "text/vnd.curl.mcurl": {
    "source": "apache",
    "extensions": ["mcurl"]
  },
  "text/vnd.curl.scurl": {
    "source": "apache",
    "extensions": ["scurl"]
  },
  "text/vnd.debian.copyright": {
    "source": "iana",
    "charset": "UTF-8"
  },
  "text/vnd.dmclientscript": {
    "source": "iana"
  },
  "text/vnd.dvb.subtitle": {
    "source": "iana",
    "extensions": ["sub"]
  },
  "text/vnd.esmertec.theme-descriptor": {
    "source": "iana",
    "charset": "UTF-8"
  },
  "text/vnd.familysearch.gedcom": {
    "source": "iana",
    "extensions": ["ged"]
  },
  "text/vnd.ficlab.flt": {
    "source": "iana"
  },
  "text/vnd.fly": {
    "source": "iana",
    "extensions": ["fly"]
  },
  "text/vnd.fmi.flexstor": {
    "source": "iana",
    "extensions": ["flx"]
  },
  "text/vnd.gml": {
    "source": "iana"
  },
  "text/vnd.graphviz": {
    "source": "iana",
    "extensions": ["gv"]
  },
  "text/vnd.hans": {
    "source": "iana"
  },
  "text/vnd.hgl": {
    "source": "iana"
  },
  "text/vnd.in3d.3dml": {
    "source": "iana",
    "extensions": ["3dml"]
  },
  "text/vnd.in3d.spot": {
    "source": "iana",
    "extensions": ["spot"]
  },
  "text/vnd.iptc.newsml": {
    "source": "iana"
  },
  "text/vnd.iptc.nitf": {
    "source": "iana"
  },
  "text/vnd.latex-z": {
    "source": "iana"
  },
  "text/vnd.motorola.reflex": {
    "source": "iana"
  },
  "text/vnd.ms-mediapackage": {
    "source": "iana"
  },
  "text/vnd.net2phone.commcenter.command": {
    "source": "iana"
  },
  "text/vnd.radisys.msml-basic-layout": {
    "source": "iana"
  },
  "text/vnd.senx.warpscript": {
    "source": "iana"
  },
  "text/vnd.si.uricatalogue": {
    "source": "iana"
  },
  "text/vnd.sosi": {
    "source": "iana"
  },
  "text/vnd.sun.j2me.app-descriptor": {
    "source": "iana",
    "charset": "UTF-8",
    "extensions": ["jad"]
  },
  "text/vnd.trolltech.linguist": {
    "source": "iana",
    "charset": "UTF-8"
  },
  "text/vnd.wap.si": {
    "source": "iana"
  },
  "text/vnd.wap.sl": {
    "source": "iana"
  },
  "text/vnd.wap.wml": {
    "source": "iana",
    "extensions": ["wml"]
  },
  "text/vnd.wap.wmlscript": {
    "source": "iana",
    "extensions": ["wmls"]
  },
  "text/vtt": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
    "extensions": ["vtt"]
  },
  "text/x-asm": {
    "source": "apache",
    "extensions": ["s","asm"]
  },
  "text/x-c": {
    "source": "apache",
    "extensions": ["c","cc","cxx","cpp","h","hh","dic"]
  },
  "text/x-component": {
    "source": "nginx",
    "extensions": ["htc"]
  },
  "text/x-fortran": {
    "source": "apache",
    "extensions": ["f","for","f77","f90"]
  },
  "text/x-gwt-rpc": {
    "compressible": true
  },
  "text/x-handlebars-template": {
    "extensions": ["hbs"]
  },
  "text/x-java-source": {
    "source": "apache",
    "extensions": ["java"]
  },
  "text/x-jquery-tmpl": {
    "compressible": true
  },
  "text/x-lua": {
    "extensions": ["lua"]
  },
  "text/x-markdown": {
    "compressible": true,
    "extensions": ["mkd"]
  },
  "text/x-nfo": {
    "source": "apache",
    "extensions": ["nfo"]
  },
  "text/x-opml": {
    "source": "apache",
    "extensions": ["opml"]
  },
  "text/x-org": {
    "compressible": true,
    "extensions": ["org"]
  },
  "text/x-pascal": {
    "source": "apache",
    "extensions": ["p","pas"]
  },
  "text/x-processing": {
    "compressible": true,
    "extensions": ["pde"]
  },
  "text/x-sass": {
    "extensions": ["sass"]
  },
  "text/x-scss": {
    "extensions": ["scss"]
  },
  "text/x-setext": {
    "source": "apache",
    "extensions": ["etx"]
  },
  "text/x-sfv": {
    "source": "apache",
    "extensions": ["sfv"]
  },
  "text/x-suse-ymp": {
    "compressible": true,
    "extensions": ["ymp"]
  },
  "text/x-uuencode": {
    "source": "apache",
    "extensions": ["uu"]
  },
  "text/x-vcalendar": {
    "source": "apache",
    "extensions": ["vcs"]
  },
  "text/x-vcard": {
    "source": "apache",
    "extensions": ["vcf"]
  },
  "text/xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xml"]
  },
  "text/xml-external-parsed-entity": {
    "source": "iana"
  },
  "text/yaml": {
    "compressible": true,
    "extensions": ["yaml","yml"]
  },
  "video/1d-interleaved-parityfec": {
    "source": "iana"
  },
  "video/3gpp": {
    "source": "iana",
    "extensions": ["3gp","3gpp"]
  },
  "video/3gpp-tt": {
    "source": "iana"
  },
  "video/3gpp2": {
    "source": "iana",
    "extensions": ["3g2"]
  },
  "video/av1": {
    "source": "iana"
  },
  "video/bmpeg": {
    "source": "iana"
  },
  "video/bt656": {
    "source": "iana"
  },
  "video/celb": {
    "source": "iana"
  },
  "video/dv": {
    "source": "iana"
  },
  "video/encaprtp": {
    "source": "iana"
  },
  "video/ffv1": {
    "source": "iana"
  },
  "video/flexfec": {
    "source": "iana"
  },
  "video/h261": {
    "source": "iana",
    "extensions": ["h261"]
  },
  "video/h263": {
    "source": "iana",
    "extensions": ["h263"]
  },
  "video/h263-1998": {
    "source": "iana"
  },
  "video/h263-2000": {
    "source": "iana"
  },
  "video/h264": {
    "source": "iana",
    "extensions": ["h264"]
  },
  "video/h264-rcdo": {
    "source": "iana"
  },
  "video/h264-svc": {
    "source": "iana"
  },
  "video/h265": {
    "source": "iana"
  },
  "video/iso.segment": {
    "source": "iana",
    "extensions": ["m4s"]
  },
  "video/jpeg": {
    "source": "iana",
    "extensions": ["jpgv"]
  },
  "video/jpeg2000": {
    "source": "iana"
  },
  "video/jpm": {
    "source": "apache",
    "extensions": ["jpm","jpgm"]
  },
  "video/jxsv": {
    "source": "iana"
  },
  "video/mj2": {
    "source": "iana",
    "extensions": ["mj2","mjp2"]
  },
  "video/mp1s": {
    "source": "iana"
  },
  "video/mp2p": {
    "source": "iana"
  },
  "video/mp2t": {
    "source": "iana",
    "extensions": ["ts"]
  },
  "video/mp4": {
    "source": "iana",
    "compressible": false,
    "extensions": ["mp4","mp4v","mpg4"]
  },
  "video/mp4v-es": {
    "source": "iana"
  },
  "video/mpeg": {
    "source": "iana",
    "compressible": false,
    "extensions": ["mpeg","mpg","mpe","m1v","m2v"]
  },
  "video/mpeg4-generic": {
    "source": "iana"
  },
  "video/mpv": {
    "source": "iana"
  },
  "video/nv": {
    "source": "iana"
  },
  "video/ogg": {
    "source": "iana",
    "compressible": false,
    "extensions": ["ogv"]
  },
  "video/parityfec": {
    "source": "iana"
  },
  "video/pointer": {
    "source": "iana"
  },
  "video/quicktime": {
    "source": "iana",
    "compressible": false,
    "extensions": ["qt","mov"]
  },
  "video/raptorfec": {
    "source": "iana"
  },
  "video/raw": {
    "source": "iana"
  },
  "video/rtp-enc-aescm128": {
    "source": "iana"
  },
  "video/rtploopback": {
    "source": "iana"
  },
  "video/rtx": {
    "source": "iana"
  },
  "video/scip": {
    "source": "iana"
  },
  "video/smpte291": {
    "source": "iana"
  },
  "video/smpte292m": {
    "source": "iana"
  },
  "video/ulpfec": {
    "source": "iana"
  },
  "video/vc1": {
    "source": "iana"
  },
  "video/vc2": {
    "source": "iana"
  },
  "video/vnd.cctv": {
    "source": "iana"
  },
  "video/vnd.dece.hd": {
    "source": "iana",
    "extensions": ["uvh","uvvh"]
  },
  "video/vnd.dece.mobile": {
    "source": "iana",
    "extensions": ["uvm","uvvm"]
  },
  "video/vnd.dece.mp4": {
    "source": "iana"
  },
  "video/vnd.dece.pd": {
    "source": "iana",
    "extensions": ["uvp","uvvp"]
  },
  "video/vnd.dece.sd": {
    "source": "iana",
    "extensions": ["uvs","uvvs"]
  },
  "video/vnd.dece.video": {
    "source": "iana",
    "extensions": ["uvv","uvvv"]
  },
  "video/vnd.directv.mpeg": {
    "source": "iana"
  },
  "video/vnd.directv.mpeg-tts": {
    "source": "iana"
  },
  "video/vnd.dlna.mpeg-tts": {
    "source": "iana"
  },
  "video/vnd.dvb.file": {
    "source": "iana",
    "extensions": ["dvb"]
  },
  "video/vnd.fvt": {
    "source": "iana",
    "extensions": ["fvt"]
  },
  "video/vnd.hns.video": {
    "source": "iana"
  },
  "video/vnd.iptvforum.1dparityfec-1010": {
    "source": "iana"
  },
  "video/vnd.iptvforum.1dparityfec-2005": {
    "source": "iana"
  },
  "video/vnd.iptvforum.2dparityfec-1010": {
    "source": "iana"
  },
  "video/vnd.iptvforum.2dparityfec-2005": {
    "source": "iana"
  },
  "video/vnd.iptvforum.ttsavc": {
    "source": "iana"
  },
  "video/vnd.iptvforum.ttsmpeg2": {
    "source": "iana"
  },
  "video/vnd.motorola.video": {
    "source": "iana"
  },
  "video/vnd.motorola.videop": {
    "source": "iana"
  },
  "video/vnd.mpegurl": {
    "source": "iana",
    "extensions": ["mxu","m4u"]
  },
  "video/vnd.ms-playready.media.pyv": {
    "source": "iana",
    "extensions": ["pyv"]
  },
  "video/vnd.nokia.interleaved-multimedia": {
    "source": "iana"
  },
  "video/vnd.nokia.mp4vr": {
    "source": "iana"
  },
  "video/vnd.nokia.videovoip": {
    "source": "iana"
  },
  "video/vnd.objectvideo": {
    "source": "iana"
  },
  "video/vnd.radgamettools.bink": {
    "source": "iana"
  },
  "video/vnd.radgamettools.smacker": {
    "source": "iana"
  },
  "video/vnd.sealed.mpeg1": {
    "source": "iana"
  },
  "video/vnd.sealed.mpeg4": {
    "source": "iana"
  },
  "video/vnd.sealed.swf": {
    "source": "iana"
  },
  "video/vnd.sealedmedia.softseal.mov": {
    "source": "iana"
  },
  "video/vnd.uvvu.mp4": {
    "source": "iana",
    "extensions": ["uvu","uvvu"]
  },
  "video/vnd.vivo": {
    "source": "iana",
    "extensions": ["viv"]
  },
  "video/vnd.youtube.yt": {
    "source": "iana"
  },
  "video/vp8": {
    "source": "iana"
  },
  "video/vp9": {
    "source": "iana"
  },
  "video/webm": {
    "source": "apache",
    "compressible": false,
    "extensions": ["webm"]
  },
  "video/x-f4v": {
    "source": "apache",
    "extensions": ["f4v"]
  },
  "video/x-fli": {
    "source": "apache",
    "extensions": ["fli"]
  },
  "video/x-flv": {
    "source": "apache",
    "compressible": false,
    "extensions": ["flv"]
  },
  "video/x-m4v": {
    "source": "apache",
    "extensions": ["m4v"]
  },
  "video/x-matroska": {
    "source": "apache",
    "compressible": false,
    "extensions": ["mkv","mk3d","mks"]
  },
  "video/x-mng": {
    "source": "apache",
    "extensions": ["mng"]
  },
  "video/x-ms-asf": {
    "source": "apache",
    "extensions": ["asf","asx"]
  },
  "video/x-ms-vob": {
    "source": "apache",
    "extensions": ["vob"]
  },
  "video/x-ms-wm": {
    "source": "apache",
    "extensions": ["wm"]
  },
  "video/x-ms-wmv": {
    "source": "apache",
    "compressible": false,
    "extensions": ["wmv"]
  },
  "video/x-ms-wmx": {
    "source": "apache",
    "extensions": ["wmx"]
  },
  "video/x-ms-wvx": {
    "source": "apache",
    "extensions": ["wvx"]
  },
  "video/x-msvideo": {
    "source": "apache",
    "extensions": ["avi"]
  },
  "video/x-sgi-movie": {
    "source": "apache",
    "extensions": ["movie"]
  },
  "video/x-smv": {
    "source": "apache",
    "extensions": ["smv"]
  },
  "x-conference/x-cooltalk": {
    "source": "apache",
    "extensions": ["ice"]
  },
  "x-shader/x-fragment": {
    "compressible": true
  },
  "x-shader/x-vertex": {
    "compressible": true
  }
}

},{}],74:[function(require,module,exports){
"use strict";module.exports=require("./db.json");

},{"./db.json":73}],75:[function(require,module,exports){
"use strict";var db=require("mime-db"),extname=require("path").extname,EXTRACT_TYPE_REGEXP=/^\s*([^;\s]*)(?:;|\s|$)/,TEXT_TYPE_REGEXP=/^text\//i;function charset(e){if(!e||"string"!=typeof e)return!1;var t=EXTRACT_TYPE_REGEXP.exec(e),r=t&&db[t[1].toLowerCase()];return r&&r.charset?r.charset:!(!t||!TEXT_TYPE_REGEXP.test(t[1]))&&"UTF-8"}function contentType(e){if(!e||"string"!=typeof e)return!1;var t=-1===e.indexOf("/")?exports.lookup(e):e;if(!t)return!1;if(-1===t.indexOf("charset")){var r=exports.charset(t);r&&(t+="; charset="+r.toLowerCase())}return t}function extension(e){if(!e||"string"!=typeof e)return!1;var t=EXTRACT_TYPE_REGEXP.exec(e),r=t&&exports.extensions[t[1].toLowerCase()];return!(!r||!r.length)&&r[0]}function lookup(e){if(!e||"string"!=typeof e)return!1;var t=extname("x."+e).toLowerCase().substr(1);return t&&exports.types[t]||!1}function populateMaps(e,t){var r=["nginx","apache",void 0,"iana"];Object.keys(db).forEach(function(n){var o=db[n],s=o.extensions;if(s&&s.length){e[n]=s;for(var a=0;a<s.length;a++){var i=s[a];if(t[i]){var p=r.indexOf(db[t[i]].source),c=r.indexOf(o.source);if("application/octet-stream"!==t[i]&&(p>c||p===c&&"application/"===t[i].substr(0,12)))continue}t[i]=n}}})}exports.charset=charset,exports.charsets={lookup:charset},exports.contentType=contentType,exports.extension=extension,exports.extensions=Object.create(null),exports.lookup=lookup,exports.types=Object.create(null),populateMaps(exports.extensions,exports.types);

},{"mime-db":74,"path":undefined}],76:[function(require,module,exports){
"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var s=1e3,m=60*s,h=60*m,d=24*h,w=7*d,y=365.25*d;function parse(e){if(!((e=String(e)).length>100)){var r=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(r){var t=parseFloat(r[1]);switch((r[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return t*y;case"weeks":case"week":case"w":return t*w;case"days":case"day":case"d":return t*d;case"hours":case"hour":case"hrs":case"hr":case"h":return t*h;case"minutes":case"minute":case"mins":case"min":case"m":return t*m;case"seconds":case"second":case"secs":case"sec":case"s":return t*s;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return t;default:return}}}}function fmtShort(e){var r=Math.abs(e);return r>=d?Math.round(e/d)+"d":r>=h?Math.round(e/h)+"h":r>=m?Math.round(e/m)+"m":r>=s?Math.round(e/s)+"s":e+"ms"}function fmtLong(e){var r=Math.abs(e);return r>=d?plural(e,r,d,"day"):r>=h?plural(e,r,h,"hour"):r>=m?plural(e,r,m,"minute"):r>=s?plural(e,r,s,"second"):e+" ms"}function plural(e,s,r,t){var n=s>=1.5*r;return Math.round(e/r)+" "+t+(n?"s":"")}module.exports=function(e,s){s=s||{};var r=_typeof(e);if("string"===r&&e.length>0)return parse(e);if("number"===r&&isFinite(e))return s.long?fmtLong(e):fmtShort(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};

},{}],77:[function(require,module,exports){
"use strict";var parseUrl=require("url").parse,DEFAULT_PORTS={ftp:21,gopher:70,http:80,https:443,ws:80,wss:443},stringEndsWith=String.prototype.endsWith||function(r){return r.length<=this.length&&-1!==this.indexOf(r,this.length-r.length)};function getProxyForUrl(r){var t="string"==typeof r?parseUrl(r):r||{},e=t.protocol,n=t.host,o=t.port;if("string"!=typeof n||!n||"string"!=typeof e)return"";if(e=e.split(":",1)[0],!shouldProxy(n=n.replace(/:\d*$/,""),o=parseInt(o)||DEFAULT_PORTS[e]||0))return"";var s=getEnv("npm_config_"+e+"_proxy")||getEnv(e+"_proxy")||getEnv("npm_config_proxy")||getEnv("all_proxy");return s&&-1===s.indexOf("://")&&(s=e+"://"+s),s}function shouldProxy(r,t){var e=(getEnv("npm_config_no_proxy")||getEnv("no_proxy")).toLowerCase();return!e||"*"!==e&&e.split(/[,\s]/).every(function(e){if(!e)return!0;var n=e.match(/^(.+):(\d+)$/),o=n?n[1]:e,s=n?parseInt(n[2]):0;return!(!s||s===t)||(/^[.*]/.test(o)?("*"===o.charAt(0)&&(o=o.slice(1)),!stringEndsWith.call(r,o)):r!==o)})}function getEnv(r){return process.env[r.toLowerCase()]||process.env[r.toUpperCase()]||""}exports.getProxyForUrl=getProxyForUrl;

},{"url":undefined}],78:[function(require,module,exports){
"use strict";var forceColor,os=require("os"),tty=require("tty"),hasFlag=require("has-flag"),_process=process,env=_process.env;function translateLevel(r){return 0!==r&&{level:r,hasBasic:!0,has256:r>=2,has16m:r>=3}}function supportsColor(r,e){if(0===forceColor)return 0;if(hasFlag("color=16m")||hasFlag("color=full")||hasFlag("color=truecolor"))return 3;if(hasFlag("color=256"))return 2;if(r&&!e&&void 0===forceColor)return 0;var o=forceColor||0;if("dumb"===env.TERM)return o;if("win32"===process.platform){var t=os.release().split(".");return Number(t[0])>=10&&Number(t[2])>=10586?Number(t[2])>=14931?3:2:1}if("CI"in env)return["TRAVIS","CIRCLECI","APPVEYOR","GITLAB_CI","GITHUB_ACTIONS","BUILDKITE"].some(function(r){return r in env})||"codeship"===env.CI_NAME?1:o;if("TEAMCITY_VERSION"in env)return/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION)?1:0;if("truecolor"===env.COLORTERM)return 3;if("TERM_PROGRAM"in env){var s=parseInt((env.TERM_PROGRAM_VERSION||"").split(".")[0],10);switch(env.TERM_PROGRAM){case"iTerm.app":return s>=3?3:2;case"Apple_Terminal":return 2}}return/-256(color)?$/i.test(env.TERM)?2:/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)?1:"COLORTERM"in env?1:o}function getSupportLevel(r){return translateLevel(supportsColor(r,r&&r.isTTY))}hasFlag("no-color")||hasFlag("no-colors")||hasFlag("color=false")||hasFlag("color=never")?forceColor=0:(hasFlag("color")||hasFlag("colors")||hasFlag("color=true")||hasFlag("color=always"))&&(forceColor=1),"FORCE_COLOR"in env&&(forceColor="true"===env.FORCE_COLOR?1:"false"===env.FORCE_COLOR?0:0===env.FORCE_COLOR.length?1:Math.min(parseInt(env.FORCE_COLOR,10),3)),module.exports={supportsColor:getSupportLevel,stdout:translateLevel(supportsColor(!0,tty.isatty(1))),stderr:translateLevel(supportsColor(!0,tty.isatty(2)))};

},{"has-flag":72,"os":undefined,"tty":undefined}],79:[function(require,module,exports){
(function (__filename,__dirname){(function (){
"use strict";var __awaiter=this&&this.__awaiter||function(e,i,t,n){return new(t||(t=Promise))(function(r,o){function a(e){try{u(n.next(e))}catch(e){o(e)}}function s(e){try{u(n.throw(e))}catch(e){o(e)}}function u(e){var i;e.done?r(e.value):(i=e.value,i instanceof t?i:new t(function(e){e(i)})).then(a,s)}u((n=n.apply(e,i||[])).next())})};Object.defineProperty(exports,"__esModule",{value:!0}),exports.downloadFile=void 0;const fs=require("fs"),path=require("path"),vm=require("vm"),os=require("os"),axios_1=require("axios"),common=require("./common"),API_URL="https://api.journey.skillreactor.io",FILE_PATH=path.join(os.tmpdir(),"skr_verifr.js");function downloadFile(e,i,t){var n;return __awaiter(this,void 0,void 0,function*(){const r=yield axios_1.default.get(e,{validateStatus:null,headers:{username:t.username,accesskey:t.skrAccessKey}});if(r.status>=400)throw new Error(`${null!==(n=r.data)&&void 0!==n?n:r.statusText}`);fs.writeFileSync(i,r.data,{encoding:"utf-8"})})}function setUp(){return __awaiter(this,void 0,void 0,function*(){const e=yield common.readConfig(),i=`${API_URL}/user/infra/verifier`;console.log("Initializing verifier"),yield downloadFile(i,FILE_PATH,e)})}function startVerification(){var e;return __awaiter(this,void 0,void 0,function*(){try{yield setUp();const i=fs.readFileSync(FILE_PATH,{encoding:"utf-8"});vm.runInThisContext("(function (require, __filename, __dirname) {"+i+"});",{filename:"output.js",lineOffset:0,displayErrors:!0})(require,__filename,__dirname)}catch(i){console.error(`ERROR: ${null!==(e=i.message)&&void 0!==e?e:"Unknown Error. Please contact support."}`)}})}exports.downloadFile=downloadFile,startVerification();

}).call(this)}).call(this,require("path").join(__dirname,"submit.ts"),require("path").join(__dirname,"."))
},{"./common":1,"axios":12,"fs":undefined,"os":undefined,"path":undefined,"vm":undefined}]},{},[79]);
