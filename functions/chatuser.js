!function(e,t){for(var o in t)e[o]=t[o]}(exports,function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}return o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=36)}({16:function(e,t){const o=new Map;class n{static get(e){return o.has(e)||o.set(e,new n(e)),o.get(e)}constructor(e){this.name=e,this.members=new Set}join(e){this.members.add(e)}leave(e){this.members.delete(e)}broadcast(e){for(let t of this.members)t.send(JSON.stringify(e))}}e.exports={Room:n}},36:function(e,t,o){const{Room:n}=o(16);e.exports={ChatUser:class{constructor(e,t){this._send=e,this.room=n.get(t),this.name=null,console.log("created chat in "+this.room.name)}send(e){try{this._send(e)}catch(e){}}handleJoin(e){this.name=e,console.log("handling join/ name: ",e),this.room.join(this),this.room.broadcast({user:"Admin",message:`${this.name} joined the "${this.room.name}" room.`})}handleChat(e){this.room.broadcast({user:this.name,message:e})}handleMessage(e){let t=JSON.parse(e);if(console.log("this is msg: ",t),"join"===t.type)this.handleJoin(t.user);else{if("chat"!==t.type)throw new Error("bad message: "+t.type);this.handleChat(t.message)}}handleClose(){this.room.leave(this),this.room.broadcast({user:"Admin",message:`${this.name} left the "${this.room.name}" room.`})}}}}}));