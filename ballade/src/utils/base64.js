/* eslint-disable */
(function(e,f){"object"===typeof exports&&"undefined"!==typeof module?module.exports=f(e):"function"===typeof define&&define.amd?define(f):f(e)})("undefined"!==typeof self?self:"undefined"!==typeof window?window:"undefined"!==typeof global?global:this,function(e){var f=e.Base64,d;if("undefined"!==typeof module&&module.exports)try{d=require("buffer").Buffer}catch(a){}var h=function(a){for(var b={},c=0,d=a.length;c<d;c++)b[a.charAt(c)]=c;return b}("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),
c=String.fromCharCode,t=function(a){if(2>a.length){var b=a.charCodeAt(0);return 128>b?a:2048>b?c(192|b>>>6)+c(128|b&63):c(224|b>>>12&15)+c(128|b>>>6&63)+c(128|b&63)}b=65536+1024*(a.charCodeAt(0)-55296)+(a.charCodeAt(1)-56320);return c(240|b>>>18&7)+c(128|b>>>12&63)+c(128|b>>>6&63)+c(128|b&63)},u=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,m=function(a){return a.replace(u,t)},v=function(a){var b=[0,2,1][a.length%3];a=a.charCodeAt(0)<<16|(1<a.length?a.charCodeAt(1):0)<<8|(2<a.length?a.charCodeAt(2):
0);return["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(a>>>18),"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(a>>>12&63),2<=b?"=":"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(a>>>6&63),1<=b?"=":"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(a&63)].join("")},n=e.btoa?function(a){return e.btoa(a)}:function(a){return a.replace(/[\s\S]{1,3}/g,v)},p=d?d.from&&d.from!==Uint8Array.from?function(a){return(a.constructor===
d.constructor?a:d.from(a)).toString("base64")}:function(a){return(a.constructor===d.constructor?a:new d(a)).toString("base64")}:function(a){return n(m(a))},g=function(a,b){return b?p(String(a)).replace(/[+\/]/g,function(a){return"+"==a?"-":"_"}).replace(/=/g,""):p(String(a))},w=/[\u00c0-\u00df][\u0080-\u00bf]|[\u00e0-\u00ef][\u0080-\u00bf]{2}|[\u00f0-\u00f7][\u0080-\u00bf]{3}/g,x=function(a){switch(a.length){case 4:return a=((7&a.charCodeAt(0))<<18|(63&a.charCodeAt(1))<<12|(63&a.charCodeAt(2))<<6|
63&a.charCodeAt(3))-65536,c((a>>>10)+55296)+c((a&1023)+56320);case 3:return c((15&a.charCodeAt(0))<<12|(63&a.charCodeAt(1))<<6|63&a.charCodeAt(2));default:return c((31&a.charCodeAt(0))<<6|63&a.charCodeAt(1))}},q=function(a){return a.replace(w,x)},y=function(a){var b=a.length,d=b%4;a=(0<b?h[a.charAt(0)]<<18:0)|(1<b?h[a.charAt(1)]<<12:0)|(2<b?h[a.charAt(2)]<<6:0)|(3<b?h[a.charAt(3)]:0);a=[c(a>>>16),c(a>>>8&255),c(a&255)];a.length-=[0,0,2,1][d];return a.join("")},r=e.atob?function(a){return e.atob(a)}:
function(a){return a.replace(/[\s\S]{1,4}/g,y)},z=d?d.from&&d.from!==Uint8Array.from?function(a){return(a.constructor===d.constructor?a:d.from(a,"base64")).toString()}:function(a){return(a.constructor===d.constructor?a:new d(a,"base64")).toString()}:function(a){return q(r(a))},k=function(a){return z(String(a).replace(/[-_]/g,function(a){return"-"==a?"+":"/"}).replace(/[^A-Za-z0-9\+\/]/g,""))};e.Base64={VERSION:"2.4.3",atob:r,btoa:n,fromBase64:k,toBase64:g,utob:m,encode:g,encodeURI:function(a){return g(a,
!0)},btou:q,decode:k,noConflict:function(){var a=e.Base64;e.Base64=f;return a}};if("function"===typeof Object.defineProperty){var l=function(a){return{value:a,enumerable:!1,writable:!0,configurable:!0}};e.Base64.extendString=function(){Object.defineProperty(String.prototype,"fromBase64",l(function(){return k(this)}));Object.defineProperty(String.prototype,"toBase64",l(function(a){return g(this,a)}));Object.defineProperty(String.prototype,"toBase64URI",l(function(){return g(this,!0)}))}}e.Meteor&&
(window.Base64=e.Base64)});