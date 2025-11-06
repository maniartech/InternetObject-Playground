import{r as Ie,g as _t,a as w,F as mn,b as fn}from"./monaco-Cx4RhuFD.js";import{R as pn,a as gn,b as yn,S as ht,P as Me,c as bn}from"./vendor-BP1Dh9AK.js";import{a as wn,L as ce,u as Sn,b as Tn,B as vn,R as xn,c as kn}from"./react-B4EdYbXA.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();var Pe={exports:{}},he={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ut;function En(){if(ut)return he;ut=1;var r=Ie(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),n=Object.prototype.hasOwnProperty,i=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a={key:!0,ref:!0,__self:!0,__source:!0};function s(o,l,c){var h,d={},g=null,y=null;c!==void 0&&(g=""+c),l.key!==void 0&&(g=""+l.key),l.ref!==void 0&&(y=l.ref);for(h in l)n.call(l,h)&&!a.hasOwnProperty(h)&&(d[h]=l[h]);if(o&&o.defaultProps)for(h in l=o.defaultProps,l)d[h]===void 0&&(d[h]=l[h]);return{$$typeof:e,type:o,key:g,ref:y,props:d,_owner:i.current}}return he.Fragment=t,he.jsx=s,he.jsxs=s,he}var dt;function Nn(){return dt||(dt=1,Pe.exports=En()),Pe.exports}var m=Nn(),be={},mt;function Cn(){if(mt)return be;mt=1;var r=wn();return be.createRoot=r.createRoot,be.hydrateRoot=r.hydrateRoot,be}var An=Cn();const Rn=_t(An);var we={},Fe={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/var ft;function In(){return ft||(ft=1,(function(r){(function(){var e={}.hasOwnProperty;function t(){for(var a="",s=0;s<arguments.length;s++){var o=arguments[s];o&&(a=i(a,n(o)))}return a}function n(a){if(typeof a=="string"||typeof a=="number")return a;if(typeof a!="object")return"";if(Array.isArray(a))return t.apply(null,a);if(a.toString!==Object.prototype.toString&&!a.toString.toString().includes("[native code]"))return a.toString();var s="";for(var o in a)e.call(a,o)&&a[o]&&(s=i(s,o));return s}function i(a,s){return s?a?a+" "+s:a+s:a}r.exports?(t.default=t,r.exports=t):window.classNames=t})()})(Fe)),Fe.exports}var je={exports:{}},Le,pt;function On(){if(pt)return Le;pt=1;var r="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Le=r,Le}var _e,gt;function Mn(){if(gt)return _e;gt=1;var r=On();function e(){}function t(){}return t.resetWarningCache=e,_e=function(){function n(s,o,l,c,h,d){if(d!==r){var g=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw g.name="Invariant Violation",g}}n.isRequired=n;function i(){return n}var a={array:n,bigint:n,bool:n,func:n,number:n,object:n,string:n,symbol:n,any:n,arrayOf:i,element:n,elementType:n,instanceOf:i,node:n,objectOf:i,oneOf:i,oneOfType:i,shape:i,exact:i,checkPropTypes:t,resetWarningCache:e};return a.PropTypes=a,a},_e}var yt;function Pn(){return yt||(yt=1,je.exports=Mn()()),je.exports}var Se={},bt;function Fn(){if(bt)return Se;bt=1,Object.defineProperty(Se,"__esModule",{value:!0});var r=Ie(),e=t(r);function t(n){return n&&n.__esModule?n:{default:n}}return Se.default=function(){return e.default.createElement("svg",{width:"14",height:"11",viewBox:"0 0 14 11"},e.default.createElement("path",{d:"M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0",fill:"#fff",fillRule:"evenodd"}))},Se}var Te={},wt;function jn(){if(wt)return Te;wt=1,Object.defineProperty(Te,"__esModule",{value:!0});var r=Ie(),e=t(r);function t(n){return n&&n.__esModule?n:{default:n}}return Te.default=function(){return e.default.createElement("svg",{width:"10",height:"10",viewBox:"0 0 10 10"},e.default.createElement("path",{d:"M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12",fill:"#fff",fillRule:"evenodd"}))},Te}var ve={},St;function Ln(){if(St)return ve;St=1,Object.defineProperty(ve,"__esModule",{value:!0}),ve.pointerCoord=r;function r(e){if(e){var t=e.changedTouches;if(t&&t.length>0){var n=t[0];return{x:n.clientX,y:n.clientY}}var i=e.pageX;if(i!==void 0)return{x:i,y:e.pageY}}return{x:0,y:0}}return ve}var Tt;function _n(){if(Tt)return we;Tt=1,Object.defineProperty(we,"__esModule",{value:!0});var r=Object.assign||function(k){for(var T=1;T<arguments.length;T++){var x=arguments[T];for(var p in x)Object.prototype.hasOwnProperty.call(x,p)&&(k[p]=x[p])}return k},e=(function(){function k(T,x){for(var p=0;p<x.length;p++){var b=x[p];b.enumerable=b.enumerable||!1,b.configurable=!0,"value"in b&&(b.writable=!0),Object.defineProperty(T,b.key,b)}}return function(T,x,p){return x&&k(T.prototype,x),p&&k(T,p),T}})(),t=Ie(),n=y(t),i=In(),a=y(i),s=Pn(),o=y(s),l=Fn(),c=y(l),h=jn(),d=y(h),g=Ln();function y(k){return k&&k.__esModule?k:{default:k}}function C(k,T){var x={};for(var p in k)T.indexOf(p)>=0||Object.prototype.hasOwnProperty.call(k,p)&&(x[p]=k[p]);return x}function N(k,T){if(!(k instanceof T))throw new TypeError("Cannot call a class as a function")}function S(k,T){if(!k)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return T&&(typeof T=="object"||typeof T=="function")?T:k}function D(k,T){if(typeof T!="function"&&T!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof T);k.prototype=Object.create(T&&T.prototype,{constructor:{value:k,enumerable:!1,writable:!0,configurable:!0}}),T&&(Object.setPrototypeOf?Object.setPrototypeOf(k,T):k.__proto__=T)}var j=(function(k){D(T,k);function T(x){N(this,T);var p=S(this,(T.__proto__||Object.getPrototypeOf(T)).call(this,x));return p.handleClick=p.handleClick.bind(p),p.handleTouchStart=p.handleTouchStart.bind(p),p.handleTouchMove=p.handleTouchMove.bind(p),p.handleTouchEnd=p.handleTouchEnd.bind(p),p.handleFocus=p.handleFocus.bind(p),p.handleBlur=p.handleBlur.bind(p),p.previouslyChecked=!!(x.checked||x.defaultChecked),p.state={checked:!!(x.checked||x.defaultChecked),hasFocus:!1},p}return e(T,[{key:"componentDidUpdate",value:function(p){p.checked!==this.props.checked&&this.setState({checked:!!this.props.checked})}},{key:"handleClick",value:function(p){if(!this.props.disabled){var b=this.input;if(p.target!==b&&!this.moved){this.previouslyChecked=b.checked,p.preventDefault(),b.focus(),b.click();return}var $=this.props.hasOwnProperty("checked")?this.props.checked:b.checked;this.setState({checked:$})}}},{key:"handleTouchStart",value:function(p){this.props.disabled||(this.startX=(0,g.pointerCoord)(p).x,this.activated=!0)}},{key:"handleTouchMove",value:function(p){if(this.activated&&(this.moved=!0,this.startX)){var b=(0,g.pointerCoord)(p).x;this.state.checked&&b+15<this.startX?(this.setState({checked:!1}),this.startX=b,this.activated=!0):b-15>this.startX&&(this.setState({checked:!0}),this.startX=b,this.activated=b<this.startX+5)}}},{key:"handleTouchEnd",value:function(p){if(this.moved){var b=this.input;if(p.preventDefault(),this.startX){var $=(0,g.pointerCoord)(p).x;this.previouslyChecked===!0&&this.startX+4>$?this.previouslyChecked!==this.state.checked&&(this.setState({checked:!1}),this.previouslyChecked=this.state.checked,b.click()):this.startX-4<$&&this.previouslyChecked!==this.state.checked&&(this.setState({checked:!0}),this.previouslyChecked=this.state.checked,b.click()),this.activated=!1,this.startX=null,this.moved=!1}}}},{key:"handleFocus",value:function(p){var b=this.props.onFocus;b&&b(p),this.setState({hasFocus:!0})}},{key:"handleBlur",value:function(p){var b=this.props.onBlur;b&&b(p),this.setState({hasFocus:!1})}},{key:"getIcon",value:function(p){var b=this.props.icons;return b?b[p]===void 0?T.defaultProps.icons[p]:b[p]:null}},{key:"render",value:function(){var p=this,b=this.props,$=b.className;b.icons;var ee=C(b,["className","icons"]),P=(0,a.default)("react-toggle",{"react-toggle--checked":this.state.checked,"react-toggle--focus":this.state.hasFocus,"react-toggle--disabled":this.props.disabled},$);return n.default.createElement("div",{className:P,onClick:this.handleClick,onTouchStart:this.handleTouchStart,onTouchMove:this.handleTouchMove,onTouchEnd:this.handleTouchEnd},n.default.createElement("div",{className:"react-toggle-track"},n.default.createElement("div",{className:"react-toggle-track-check"},this.getIcon("checked")),n.default.createElement("div",{className:"react-toggle-track-x"},this.getIcon("unchecked"))),n.default.createElement("div",{className:"react-toggle-thumb"}),n.default.createElement("input",r({},ee,{ref:function(oe){p.input=oe},onFocus:this.handleFocus,onBlur:this.handleBlur,className:"react-toggle-screenreader-only",type:"checkbox"})))}}]),T})(t.PureComponent);return we.default=j,j.displayName="Toggle",j.defaultProps={icons:{checked:n.default.createElement(c.default,null),unchecked:n.default.createElement(d.default,null)}},j.propTypes={checked:o.default.bool,disabled:o.default.bool,defaultChecked:o.default.bool,onChange:o.default.func,onFocus:o.default.func,onBlur:o.default.func,className:o.default.string,name:o.default.string,value:o.default.string,id:o.default.string,"aria-labelledby":o.default.string,"aria-label":o.default.string,icons:o.default.oneOfType([o.default.bool,o.default.shape({checked:o.default.node,unchecked:o.default.node})])},we}var Dn=_n();const He=_t(Dn),$n="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAYAAAA9zQYyAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAG4UlEQVR42u3dXYhcZx2A8ec9c2Zcl7CUELzoRVlC6UUMQSQGkRjWnVUqFrvZSa019IPi4gftRfXCRsUgBYsICqK1GGv91rQ5y9qIVdkZ1hBKKCXEGJZeSJFSQigSwrLE7c7H68VMa7Tmg+yJe87w/C72Ztmz/8w8c/Y9h8y8gUuszdRHQ+A+oAFsA0bZOCvAaeBwgN+kWXPtRv6ydqM+DswCHwHGgRQVUQ84CxwHDqXd9GSY/+Nb3wyXPKG7gaeBWwv4jzgD3FvNmqfyPnCnUU8iPAQ8vsEvYF1f3N8jhC9VjyysvhV0u1HfAxwFxgo8/D+AejVrns7trDw9AZXKV4GvA4l9lNYzSQz7K3MLnWStMXUT8NOCxwywBfh5uzE5ktsRK5U9wEFjLr1P9EL8LEASiA8M1oxlsAPCvjwO9MbeSQYxu1YeDgfajcnRBLirZIPnMm8IbAH22MHQuBnC+xNge8kG3xGnJ5L1Bx22e3YeOjuSEqyd/1stpzWvdzSGz5gXQxomFYPWUDFoGbRk0JJBSwYtg5YMWjJoyaAlg5ZBSwYtGbRk0JJBy6Alg5YMWjJoyaBl0JJBSwYtGbRk0DJoyaAlg5bWqZvQ322qTFbpbxazXhd9/ofOcgIslWzopTC/uP6gY3w5pxeGiuNMAhwu2dBZTsc5BxyzgaFxLsR4IonEHwOvlubsHOMzeRyoOtcCeMyz9NB4PJ1rrSS1rHUBuLcEa+nlQNyfzrVyW/um3W4L+IYtlN5zwBMwuMtRzZrHgI8BrxR04JchfijNWrnuJBvmF4lJ9yDwRS8SS6kDPBlivKeaNTtwydbIAGuNybFAuI/+1mm3kt8GPddjdXDB+izwi2rWvKHBrTXqt4X+Xt9TwM24Q1ZR9ejvKnwcOBTgxTRr/vskdbmfau+brMUetY2aOgRWq1mr8//+vXF6gk6lMhJjNOgCCiH00m53NZc7XZIkSZIkSZIkSZIkSZIkSZJUIG/7D/7t6QmoVN5FZGsIbNqIoWL/yzLwt+pc87xPk64r6HajPgF8BfgAMFqA+VaAFvBY2u2+FOYXb9yLqP9OlduAfcD7gM34yVJF1AOW6b8977dpt3oizP+h9x9Bdxr1JMJB4MsU8710a8ABYvz24OMHctWemRolxG8CnwZGbKZUcf8pwGyaNV/jzTNQhC8AX6O4bwytAd8ihAfzPvAb/ZiPAg8Zc+kkwO0R/txuTI0DhMG7nf9SkidzGXh3dfBqXPdpf2aSEML3gc/bRum9CPGDSYDPlejMNAY8kN8VRNg2WGao/HZB+GQC3F6ywT+a4xXx3YPljIbD/gTYWrKhb4nTE3ndfdhpA0NlZ1LCM1RCfrfTttjAUNnsfVYNFYOWQUsGLRm0ZNAyaMmgJYOWDFoyaBm0ZNCSQUsGLRm0DFoyaMmgJYOWDFoGLRm0ZNCSQUsGLYOWDFraEKkPQWH1gBeAw8BJ+vvNbJQasA24E7iDAn/Ap0EX0+vAbIDfpVmzV5CZXvrn9MTPKpXKewM8BbzHoHUtzgH1atZcKtpg7+zvQnayvW+qTozPA7tcQ+tqy4zZIsZ8qeqRhfMQ7wYuGLSu5FiA35dh0GrW+jvwpEHrSn5doDXztXh28FfFoPU/nSrTsDHGJWDVoHU5K2UatjbXWjVoDeOFrEFLBi0ZtAxaMmjJoCWDlgxaBi0ZtGTQkkFLBi2DlgxaMmjJoCWDlkFLBi0ZtGTQkkHLoCWDlgxaMmgZtGTQkkHrakq1501nup4CIwaty9lWpmFjwrhB60rujNMT5Zk2cEfR/qoYdLF8vFOpbC/DoO3G1BjwsGtoXcko8FR3ZuqmQq+d99ZTiN8Bthq0rmZXL8SjnUb9liIOt9aY2hQTDgEPelWta7U7wl/bjfoTwC+TbnepMr+4YXuZxOkJOkllvL9mjo8U8cxs0MU3BjwKPNqrVFbbjfqG7TbV6W9WP1qGB82gy2GEgt0eKyrX0DJoyaAlg5YMWgYtGbRk0JJBSwYtg5YMWjJoyaAlg5ZBSwYtGbRk0JJBy6Alg5YMWjJoyaBl0FK5gu75MGiYgj5bsplfD/OLnZyOtWICQ+ViAhwr2dB5zrtkA0PlTBLhByVadqwBT+d3uJjZwFDJkhjDC8BPSjLwd6tZ81RuOUeOAy07GApnA/woecfcQo8QHgaeK/jAv4pwIM8D1uZaHWAWeNUeyr12Bu5Ps+b5BKB6ZOFijPEu4BHgXMGGfQ34TAzcX8uanbwPXs2arwAfBk7aRTnPzMDeatZcAAhvW6TOTI6GEHbT3wRy0wYOugycBk5Us+YN345hbWayFkL4FHAPsBPYbCuFtTK4oM8C/DDNmhfe/Ma/AHa5mH7NrHM8AAAAAElFTkSuQmCC";function Bn(){return m.jsx("img",{src:$n,className:"App-logo",alt:"logo"})}function Wn(r){return m.jsxs("header",{className:"App-header",children:[m.jsxs("div",{className:"left",children:[m.jsxs("div",{className:"logo-container",children:[m.jsx(Bn,{}),m.jsx("h1",{children:"Playground"})]}),m.jsx("p",{className:"description",title:"Internet Object vs. JSON: Try It!",children:"Internet Object vs. JSON: Try It!"})]}),m.jsxs("div",{className:"right",children:[m.jsx("div",{className:"menu-container",children:m.jsxs("ul",{className:"header-menu",children:[m.jsx("li",{className:"header-menuItem",children:m.jsx(ce,{to:"https://www.internetobject.org/","aria-label":"Home",children:m.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[m.jsx("path",{d:"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}),m.jsx("polyline",{points:"9 22 9 12 15 12 15 22"})]})})}),m.jsx("li",{className:"header-menuItem",children:m.jsx(ce,{to:"https://www.internetobject.org/io-vs-json/",target:"_blank","aria-label":"IO vs JSON",children:"IO vs JSON"})}),m.jsx("li",{className:"header-menuItem",children:m.jsx(ce,{to:"https://www.internetobject.org/the-story/",target:"_blank","aria-label":"The Story",children:"The Story"})}),m.jsx("li",{className:"header-menuItem",children:m.jsx(ce,{to:"https://www.internetobject.org/community/",target:"_blank","aria-label":"Community",children:"Join Community"})}),m.jsx("li",{className:"header-menuItem",children:m.jsx(ce,{to:"https://docs.internetobject.org",target:"_blank","aria-label":"Specification",children:"Specification"})})]})}),r.children]})]})}const Jn=`
~ recordCount: 23
~ page: 3
~ prevPage: "/api/v1/people/page/2"
~ nextPage: T
---
~ John Doe, 25, d'2022-01-01', m, @officeAddr,@officeAddr, [red, green, blue]
~ Jane Done, 20, d'2022-10-10', f, {📈 Bond Street, "New York", NY},N, [green, purple]
`.trim(),zn=`
# Employee Schema and Variables
~ @officeAddr: {Santacruze, California, CA}
~ $address: {
      street: string,
      city: {string, choices:[New York, California, San Fransisco, Washington]},
      state: {string, maxLen:2, choices:[NY, CA, WA]}
    }
~ $schema: {
    name: string,  # The person name
    age: {int, min:20, max:35},  # The person age!
    joiningDt: date,  # The person joining date
    gender?: {string, choices:[m, f, u]},
    currentAddress: $address,
    permanentAddress?*: $address,
    colors?: [string], # Color array inthe form of string array
    isActive?: {bool, F}
  }
`.trim(),Hn={doc:Jn,schema:zn,name:"An Object with Separate Schema",id:"separate-schema",schemaPanelHeight:380},Un=`
~ $borrower: {userId:string, dueDate:date}
~ $borrowedBooks: {bookIsbn:number, borrowDate:date}
~ $users: {userId:string, name:string, membershipType:{type:string, choices:[Standard, Premium]}, currentlyBorrowedBooks:[$borrowedBooks]}
~ $books: {title:string, author:string, isbn:number, availability:bool, categories:[string], published:number, borrowedBy?: $borrower}
~ $library: {name: string, address: string, books: [$books], users: [$users]}
~ $schema: $library
`.trim(),Yn=`
City Central Library, "123 Library St, Bookville",
books: [
    { The Great Gatsby, "F. Scott Fitzgerald", 1234567890, T, [Fiction, Classic], 1925 },
    { "1984", George Orwell, 2345678901, F, [Fiction, Dystopian], 1949, { user123, d"2024-02-20"}}
],
users: [
    { user123, John Doe, Standard,  [{2345678901,d"2024-01-20"}]  },
    { user456, Jane Smith, Premium, [] }
]
`.trim(),Gn={doc:Yn,schema:Un,name:"Complex Object",id:"complex-object",schemaPanelHeight:170},Kn=`
~ @r: red
~ @g: green
~ @b: blue
~$schema: {
  name: string,
  email: email,
  joiningDt: date,
  color: {string, choices: [@r, @g, @b]}
}
`.trim(),Vn=`
~ John Doe, john.doe@example.com, d'2020-01-01', @r
`.trim(),qn={doc:Vn,schema:Kn,name:"Variables",id:"variables",schemaPanelHeight:320},Zn=`
# JSON format is compatible with Internet Object
{
  "library": {
    "name": "City Central Library",
    "address": "123 Library St, Bookville",
    "books": [
      {
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "isbn": "1234567890",
        "availability": true,
        "categories": ["Fiction", "Classic"],
        "published": 1925
      },
      {
        "title": "1984",
        "author": "George Orwell",
        "isbn": "2345678901",
        "availability": false,
        "categories": ["Fiction", "Dystopian"],
        "published": 1949,
        "borrowedBy": {
          "userId": "user123",
          "dueDate": "2024-02-20"
        }
      }
    ],
    "users": [
      {
        "userId": "user123",
        "name": "John Doe",
        "membershipType": "Standard",
        "currentlyBorrowedBooks": [
          {
            "bookIsbn": "2345678901",
            "borrowDate": "2024-01-20"
          }
        ]
      },
      {
        "userId": "user456",
        "name": "Jane Smith",
        "membershipType": "Premium",
        "currentlyBorrowedBooks": []
      }
    ]
  }
}`.trim(),Xn={doc:Zn,schema:null,name:"json",id:"json"},Qn=`
~ $borrower: {userId:string, dueDate:string}
~ $borrowedBooks: {bookIsbn:string, borrowDate:string}
~ $users: {userId:string, name:string, membershipType:{type:string, choices:[Standard, Premium]}, currentlyBorrowedBooks:[$borrowedBooks]}
~ $books: {title:string, author:string, isbn:string, availability:bool, categories:[string], published:number, borrowedBy?: $borrower}
~ $library: {name: string, address: string, books: [$books], users: [$users]}
~ $schema: $library
`.trim(),er=`
{
  "name": "City Central Library",
  "address": "123 Library St, Bookville",
  "books": [
    {
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "isbn": "1234567890",
      "availability": "yes",  # <- Change this to boolean true
      "categories": ["Fiction", "Classic"],
      "published": 1925
    },
    {
      "title": "1984",
      "author": "George Orwell",
      "isbn": "2345678901",
      "availability": false,
      "categories": ["Fiction", "Dystopian"],
      "published": 1949,
      "borrowedBy": {
        "userId": "user123",
        "dueDate": "2024-02-20"
      }
    }
  ],
  "users": [
    {
      "userId": "user123",
      "name": "John Doe",
      "membershipType": "Standard",
      "currentlyBorrowedBooks": [
        {
          "bookIsbn": "2345678901",
          "borrowDate": "2024-01-20"
        }
      ]
    },
    {
      "userId": "user456",
      "name": "Jane Smith",
      "membershipType": "Premium",
      "currentlyBorrowedBooks": []
    }
  ]
}`.trim(),tr={doc:er,schema:Qn,name:"JSON with Schema",id:"json-with-schema"},nr=`name, age, isActive, joiningDt, address: {street, city, state}, colors
---
John Doe, 25, T, d'2022-01-01', {Bond Street, New York, NY}, [red, blue]
`,rr={doc:nr,schema:null,name:"Single Object",id:"single-object"},ir=`name, age, gender, joiningDt, address: {street, city, state?}, colors, isActive
---
~ Alice Smith, 28, f, d'2021-04-15', {Elm Street, Dallas, TX}, [yellow, green], T
~ Bob Johnson, 22, m, d'2022-02-20', {Oak Street, Chicago, IL}, [blue, black], T
~ Rachel Green, 31, f, d'2021-12-11', {Sunset Boulevard, Los Angeles, CA}, [purple, pink], T
~ Michael Scott, 41, m, d'2021-07-22', {Pine Street, Scranton, PA}, [green, orange], F
~ Monica Geller, 27, f, d'2022-08-19', {Maple Street, New York, NY}, [red, yellow], T
~ Joey Tribbiani, 25, m, d'2023-01-10', {6th Street, Las Vegas, NV}, [black, blue], T
~ Lisa Kudrow, 36, f, d'2021-11-05', {Broadway, Los Angeles, CA}, [pink, red], F
~ Chandler Bing, 30, m, d'2023-03-12', {Wall Street, New York, NY}, [blue, grey], T
~ Ross Geller, 32, m, d'2022-06-30', {1st Avenue, New York, NY}, [green, purple], T
~ Phoebe Buffay, 29, f, d'2022-09-21', {Lexington Avenue, New York, NY}, [yellow, red], T
~ Bruce Wayne, 38, m, d'2022-05-15', {Wayne Manor, Gotham City}, [black, silver], F
~ Diana Prince, 29, f, d'2023-02-28', {Themyscira Drive, Washington, DC}, [blue, gold], T
~ Tony Stark, 34, m, d'2022-07-04', {Stark Tower, New York, NY}, [red, gold], F
~ Natasha Romanoff, 32, f, d'2021-08-23', {5th Avenue, New York, NY}, [black, grey], T
~ Steve Rogers, 36, m, d'2023-04-14', {Brooklyn Heights, New York, NY}, [blue, white, red], T
~ Thor Odinson, 30, m, d'2021-03-17', {Asgard Lane, Oklahoma City, OK}, [red, silver], F
~ Wanda Maximoff, 28, f, d'2022-04-27', {Vision Street, Westview, NJ}, [red, crimson], T
~ Stephen Strange, 40, m, d'2022-12-01', {Bleecker Street, New York, NY}, [blue, gold], F
~ Carol Danvers, 35, f, d'2022-01-16', {Roosevelt Avenue, Chicago, IL}, [blue, red], T
~ Scott Lang, 30, m, d'2023-03-30', {Ant Hill Road, San Francisco, CA}, [red, silver], T
~ Hope van Dyne, 32, f, d'2021-05-05', {Pym Lane, San Francisco, CA}, [red, gold], F
~ Nick Fury, 50, m, d'2021-06-09', {Shield Road, Washington, DC}, [black], T
~ Sam Wilson, 33, m, d'2022-11-11', {Falcon Street, Harlem, NY}, [red, white], T
~ James Rhodes, 38, m, d'2022-07-29', {War Machine Blvd, Philadelphia, PA}, [grey, silver], T
~ Pepper Potts, 37, f, d'2021-09-13', {Stark Industries, Malibu, CA}, [green, white], F
~ Shuri, 24, f, d'2023-01-01', {Wakanda Way, Oakland, CA}, [black, purple], T
~ "T'Challa", 35, m, d'2022-04-30', {Royal Palace, Birnin Zana}, [black, silver], F
~ Okoye, 33, f, d'2021-08-18', {Warrior Falls, Birnin Zana}, [red, green], T
~ Erik Killmonger, 29, m, d'2022-10-31', {Golden City, Birnin Zana}, [gold, black], F
~ "M'Baku", 31, m, d'2021-12-12', {Jabari Land, Birnin Zana}, [white, brown], T
`,ar={doc:ir,schema:null,name:"Simple Collection",id:"simple-collection"},sr=`# This example deliberately includes errors to show how Internet Object—unlike plain JSON—validates schemas,
# reports issues clearly, and lets you process each record independently.
# Age must be ≥ 30 (some rows violate), plus some syntax errors.
# Orange = validation; Red = syntax/parsing.

name, age:{number, min:30}, gender, joiningDt, address: {street, city, state?}, colors, isActive
---
~ Alice Smith, 28, f, d'2021-04-15', {Elm Street, Dallas, TX}, [yellow, green, T
~ Bob Johnson, 22, m, d'2022-02-20', {Oak Street, Chicago, IL, [blue, black], T
~ Rachel Green, 31, f, d'2021-12-11', {Sunset Boulevard, Los Angeles, CA}, [purple, pink], T
~ Michael Scott, 41, m, d'2021-07-22', {Pine Street, Scranton, PA}, [green, orange], F
~ Monica Geller, 27, f, d'2022-08-19', {Maple Street, New York, NY}, [red, yellow], T
~ Joey Tribbiani, 25, m, d'2023-01-10', {6th Street, Las Vegas, NV}, [black, blue], T
~ Lisa Kudrow, 36, f, d'2021-11-05', {Broadway, Los Angeles, CA, [pink, red], F
~ Chandler Bing, 30, m, d'2023-03-12', {Wall Street, New York, NY}, [blue, grey], T
~ Ross Geller, 32, m, d'2022-06-30', {1st Avenue, New York, NY}, [green, purple], T
~ Phoebe Buffay, 29, f, d'2022-09-21', {Lexington Avenue, New York, NY}, [yellow, red], T
~ Bruce Wayne, 38, m, d'2022-05-15', {Wayne Manor, Gotham City, [black, silver], F
~ Diana Prince, 29, f, d'2023-02-28', {Themyscira Drive, Washington, DC}, [blue, gold], T
~ Tony Stark, 34, m, d'2022-07-04', {Stark Tower, New York, NY}, [red, gold], F
~ Natasha Romanoff, 32, f, d'2021-08-23', {5th Avenue, New York, NY}, [black, grey], T
~ Steve Rogers, 36, m, d'2023-04-14', {Brooklyn Heights, New York, NY}, [blue, white, red], T
~ Thor Odinson, 30, m, d'2021-03-17', {Asgard Lane, Oklahoma City, OK}, [red, silver], F
~ Wanda Maximoff, 28, f, d'2022-04-27', {Vision Street, Westview, NJ}, [red, crimson], T
~ Stephen Strange, 40, m, d'2022-12-01', {Bleecker Street, New York, NY}, [blue, gold], F
~ Carol Danvers, 35, f, d'2022-01-16', {Roosevelt Avenue, Chicago, IL}, [blue, red], T
~ Scott Lang, 30, m, d'2023-03-30', {Ant Hill Road, San Francisco, CA}, [red, silver], T
~ Hope van Dyne, 32, f, d'2021-05-05', {Pym Lane, San Francisco, CA}, [red, gold], F
~ Nick Fury, 50, m, d'2021-06-09', {Shield Road, Washington, DC}, [black], T
~ Sam Wilson, 33, m, d'2022-11-11', {Falcon Street, Harlem, NY}, [red, white, T
~ James Rhodes, 38, m, d'2022-07-29', {War Machine Blvd, Philadelphia, PA}, [grey, silver], T
~ Pepper Potts, 37, f, d'2021-09-13', {Stark Industries, Malibu, CA}, [green, white], F
~ Shuri, 24, f, d'2023-01-01', {Wakanda Way, Oakland, CA}, [black, purple], T
~ "T'Challa", 35, m, d'2022-04-30', {Royal Palace, Birnin Zana}, [black, silver], F
~ Okoye, 33, f, d'2021-08-18', {Warrior Falls, Birnin Zana}, [red, green], T
~ Erik Killmonger, 29, m, d'2022-10-31', {Golden City, Birnin Zana}, [gold, black], F
~ "M'Baku", 31, m, d'2021-12-12', {Jabari Land, Birnin Zana}, [white, brown], T
`,or={doc:sr,schema:null,name:"Simple Collection with Errors",id:"simple-collection-with-errors"},lr=`
name: string,
age: number,
gender: {string, choices: [m, f]},
joiningDt: date,
address: {
  street: string,
  city: string,
  state?: {string, len: 2} # Optional
},
colors: string
---
~ Alice Smith, 28, f, d'2021-04-15', {Elm Street, Dallas, TX}, yellow
~ Bob Johnson, 22, m, d'2022-02-20', {Oak Street, Chicago, IL}, blue
~ Rachel Green, 31, f, d'2021-12-11', {Sunset Boulevard, Los Angeles, CA}, purple
~ Michael Scott, 41, m, d'2021-07-22', {Pine Street, Scranton, PA}, green
~ Monica Geller, 27, f, d'2022-08-19', {Maple Street, New York, NY}, red
~ Joey Tribbiani, 25, m, d'2023-01-10', {6th Street, Las Vegas, NV}, black
~ Lisa Kudrow, 36, f, d'2021-11-05', {Broadway, Los Angeles, CA}, pink
~ Chandler Bing, 30, m, d'2023-03-12', {Wall Street, New York, NY}, blue
~ Ross Geller, 32, m, d'2022-06-30', {1st Avenue, New York, NY}, green
~ Phoebe Buffay, 29, f, d'2022-09-21', {Lexington Avenue, New York, NY}, yellow
~ Bruce Wayne, 38, m, d'2022-05-15', {Wayne Manor, Gotham City}, black
~ Diana Prince, 29, f, d'2023-02-28', {Themyscira Drive, Washington, DC}, blue
~ Tony Stark, 34, m, d'2022-07-04', {Stark Tower, New York, NY}, red
~ Natasha Romanoff, 32, f, d'2021-08-23', {5th Avenue, New York, NY}, black
~ Steve Rogers, 36, m, d'2023-04-14', {Brooklyn Heights, New York, NY}, blue
~ Thor Odinson, 30, m, d'2021-03-17', {Asgard Lane, Oklahoma City, OK}, red
~ Wanda Maximoff, 28, f, d'2022-04-27', {Vision Street, Westview, NJ}, red
~ Stephen Strange, 40, m, d'2022-12-01', {Bleecker Street, New York, NY}, blue
~ Carol Danvers, 35, f, d'2022-01-16', {Roosevelt Avenue, Chicago, IL}, blue
~ Scott Lang, 30, m, d'2023-03-30', {Ant Hill Road, San Francisco, CA}, red
~ Hope van Dyne, 32, f, d'2021-05-05', {Pym Lane, San Francisco, CA}, red
~ Nick Fury, 50, m, d'2021-06-09', {Shield Road, Washington, DC}, black
~ James Rhodes, 38, m, d'2022-07-29', {War Machine Blvd, Philadelphia, PA}, grey
~ Pepper Potts, 37, f, d'2021-09-13', {Stark Industries, Malibu, CA}, green
~ Shuri, 24, f, d'2023-01-01', {Wakanda Way, Oakland, CA}, black
~ "T'Challa", 35, m, d'2022-04-30', {Royal Palace, Birnin Zana}, black
~ Okoye, 33, f, d'2021-08-18', {Warrior Falls, Birnin Zana}, red
~ Erik Killmonger, 29, m, d'2022-10-31', {Golden City, Birnin Zana}, gold
~ "M'Baku", 31, m, d'2021-12-12', {Jabari Land, Birnin Zana}, white
`.trim(),cr={doc:lr,schema:null,id:"simple-collection-with-types",name:"Simple Collection With Types"},hr=`
~ $borrower: {userId:string, dueDate:date}
~ $borrowedBooks: {bookIsbn:number, borrowDate:date}
~ $users: {userId:string, name:string, membershipType:{type:string, choices:[Standard, Premium]}, currentlyBorrowedBooks:[$borrowedBooks]}
~ $books: {title:string, author:string, isbn:number, availability:bool, categories:[string], published:number, borrowedBy?: $borrower}
~ $library: {name: string, address: string}
`.trim(),ur=`
--- $library
# Bookville Library
City Central Library, "123 Library St, Bookville"

--- $books
~ The Great Gatsby, "F. Scott Fitzgerald", 1234567890, T,[Fiction, Classic], 1925
~ "1984", George Orwell, 2345678901, F, [Fiction, Dystopian], 1949, { user123, d"2024-02-20"}

--- subscribers: $users
~ user123, John Doe, Standard,  [{2345678901,d"2024-01-20"}]
~ user456, Jane Smith, Premium, []
`.trim(),dr={doc:ur,schema:hr,name:"Multiple Sections",id:"multiple-sections"},mr=`
# This example illustrates how Internet Object handles values of the "any" type,
# allowing for flexible data representation. Additionally, it demonstrates the "anyOf"
# feature, which enables specifying multiple possible types for a single field.


name, age, gender,                # When type is not specified, it's considered as "any"
address: {
  any, anyOf: [                           # Address can be any type or any of the following
    { string, choices:[N/A, N/R, N/M ]},  # not available, not required, not mentioned
    { street, city, state, zip }          # Address in object format
  ]
},
colors: [{                        # Array of colors
  any, anyOf: [ string, number ]  # Color can be string or number
}],
isActive: bool
`.trim(),fr=`
~ John Doe, 25, m, {Bond Street, New York, NY, 10001}, [red, blue], T
~ Jane Done, 20, f, N/A, [0xFF0000, 0x0000FF], F
~ Jack Doe, 30, m, {Queen Rd, San Fransisco, CA, 94101}, [0xFF0000, "orange"], T
`.trim(),pr={doc:fr,schema:mr,name:"IO Any",id:"io-any",schemaPanelHeight:320},gr=`
# This example showcases all kinds of strings supported by Internet Object

# a) Open b) Regular Enclosed c) Raw string
# It also showcase built in email and url validator types
#
# References:
# https://docs.internetobject.org/the-values/string - String Value Structure
# https://docs.internetobject.org/the-schema/data-types/string - String Type

username: {string, pattern: r'^[a-z0-9_-]{3,16}$'}, # Pattern is defined using raw string format r'...'
name: {string, minLen: 3, maxLen: 50},
email: email, website: url,
bio?: {string, minLen: 50, maxLen: 500}, # Optional field
joiningDt: {string, pattern: r'^\\d{4}-\\d{2}-\\d{2}$'} # Here joining is NOT an io-date type. It is a string value with date like format.
`.trim(),yr=`
~ john-001, John Doe, john.doe@example.com, 'https://johndoe.com',
  "John Doe is a software engineer with 10 years of experience in web development.
  He is a full-stack developer with expertise in React, Node.js, and MongoDB.", 2020-01-01

~ jane-002, Jane Doe, jane.doe@examples.com, 'https://janedoe.com',, 2020-02-03

~ alice-003, "Alice D'Costa", alice@wonderland.com, 'https://wonderland.com',
  "Alice D'Costa is an artist with specialization in watercolor painting and sketching.
  She has been awarded several times for her work.", 2020-03-04

`.trim(),br={doc:yr,schema:gr,name:"IO Strings",id:"io-strings",schemaPanelHeight:320},wr=`
# This example showcases all kinds of strings supported by Internet Object

# a) Open b) Regular Enclosed c) Raw string
# It also showcase built in email and url validator types
#
# References:
# https://docs.internetobject.org/the-values/number - Number Values
# https://docs.internetobject.org/the-schema/data-types/number - Number Type

~ $notations:   { hex: uint8, oct: uint8, bin: uint8, decimal: number, scientific: {number, min:999999999}, other?: number }
~ $intRanges:   { num1: int8, num2: int16, num3: int32, num4: int }
~ $uintRanges:  { num1: uint8, num2: uint16, num3: uint32, num4: uint64, num5: number }
~ $float:       { num1: float64, num2: float }
~ $bigNumbers:  { num1: bigint, num2: {bigint, min:999999999999999999999999999999999999999999999999999999n} }
~ $decimals:    { num1: decimal, num2: {decimal, min:999999999999999999999999999999999999999999999999.9999999999999999999m} }
`.trim(),Sr=`
--- notations: $notations # Various number notations
~ 0x000011, 0o002, 0b11, 10, 4.329e+10, NaN
~ 0x000022, 0o003, 0b100, 20, 2.329e+20, Inf
~ 0x000033, 0o004, 0b101, 30, 4.345e12, -Inf

--- $bigNumbers # Big numbers
~ 999999999999999999999999999999999999999999999999999999n, 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn

--- $decimals # Decimal numbers
~ 99.9999999999999999999999999999999999999999999m, 99999999999999999999999999999999999999999999999999999m
`.trim(),Tr={doc:Sr,schema:wr,name:"IO Numbers",id:"io-numbers",schemaPanelHeight:310},vr=`
# This example demonstrates the representation of date and time in Internet Object using annotated strings.
# The types 'datetime', 'date', and 'time' are denoted by 'dt', 'd', and 't' annotations respectively.
# See how values can be expressed with or without separators, and how you can omit the later parts of the date and time
# without affecting the parsing. The 'validations' section demonstrates how you can specify the min and max values for
# datetime, date, and time types.

~ $dateTimes:{ dt1:datetime, dt2:datetime, dt3:datetime, dt4:datetime, dt5:datetime, dt6:datetime, dt7:datetime, dt8:datetime }
~ $dates:{ d1:date, d2:date, d3 }
~ $times:{ t1:time, t2:time, t3:time, t4:time, t5:time }
~ $validations: {
    dt: {datetime, min: dt'2024-01-00T00:00:00Z', max: dt'2024-12-31T23:59:59Z' }, # During 2024
    d: {date, min: d'2024-01-01', max:d'2024-03-31' }, # First quater 2024
    t: {time, min: t'09:00', max:t'17:00' } # 9 AM to 5 PM
  }
`.trim(),xr=`
--- $dateTimes
~ dt'2020-05-10T12:00:00Z', dt'2020-05-10T12:00', dt'2020-05-10T12:00', dt'2020-05-10T12', dt'2020-05-10', dt'2020-05', dt'2020-05', dt'2020' # with separators
~ dt'20200510T120000Z', dt'20200510T1200', dt'20200510T1200', dt'20200510T12', dt'20200510', dt'20200510', dt'20200510', dt'2020' # without separators

--- $dates
~ d'2020-05-10', d'2020-05', d'2024' # with separators
~ d'20200510', d'202005', d'2024'    # without separators

--- $times # JSON will truncate t1 milliseconds
~ t'14:35:58.123456', t'14:35:58.123', t'14:35:48', t'14:35', t'14'  # with separators
~ t'143548123456', t'143548123', t'143548',t'1435', t'14'        # without separators

--- $validations
~ dt'2024-06-15T12:39:54.765', d'2024-02-19', t'13:42'
`.trim(),kr={doc:xr,schema:vr,name:"IO Date and Times",id:"io-datetimes",schemaPanelHeight:320},Er=`
# With string notations
array_of_any: array,                      # Empty array shows

# With array notations
array_of_any2: [],                        # Empty array shows
array_of_strings: [string],               # array of string
array_of_strings2: [{string, minLen:2}],  # array of string with minimum length of string required to be 2

# With object notations
array_of_any_min_len2: {array, minLen:2, of:{string, minLen: 2}},  # array of any with minimum length of array and string to be 2
array_of_objects:{array, of:{}},
array_of_objects2: {array, of:{name, age, type}}
`.trim(),Nr=`
[1, two, 3.0, true, false],
[one, 2, 3.0, true, false, null,d'2021-01-01'],
[a, b],
[aa, bbb, cccc],
[aa, bb, cc],
[{a: 1, b: 2}, {a: 3, b: 4}],
[{John Doe, 25, Student}, {Jane Doe, 30, Teacher}]
`.trim(),Cr={doc:Nr,schema:Er,name:"IO Arrays",id:"io-arrays",schemaPanelHeight:320},Ar=`
a:{}, b:object,                                       # both a and b can accept any object
c: {object, schema:{a, b, c}}, d: {a, b, c},          # c and d must have a, b, and c members and both of them are not open
e: {a, b, c, *},                                      # * as the last member in the schema makes object open.
                                                      # That is it can accept any non-defined members
f: {a, b?, c?},                                       # here last two members are optional
g: {a:any, b:{any, optional:T}, c:{any, optional:T}}  # same as f
`.trim(),Rr=`
{a, b, c},                # a
{a:1, b:2, c:3},          # b
{a:1, b:2, c:3},          # c
{a, b, c},                # d
{1, 2, 3, d:4, e:5},      # e
{1},                      # f
{1}                       # g
`.trim(),Ir={doc:Rr,schema:Ar,name:"IO Objects",id:"io-objects",schemaPanelHeight:320},Or=`
Employee ID,Name,Date of Birth,Position,Department,Hire Date,Email,Phone Number,Address,Emergency Contact,Salary
`.trim(),Mr=`
~ CbIX-71323,Chad Orr,1957-06-13,Salesperson,IT,2015-05-05,aanderson@phillips.com,550.930.8133,"452 Christina Port South James, OH 61677","Anthony Hayes, 396-931-9060",47098.41
~ pJgr-97808,Donna Casey,2000-04-15,Clerk,Engineering,2021-04-03,fernandezanthony@gmail.com,001-683-855-5317,"47211 Kenneth Mount Suite 141 North Ryanborough, RI 68172","Melissa Edwards, 001-239-181-5925",55082.67
~ dDLe-30352,Daniel Jones,1989-11-22,Salesperson,Engineering,2019-04-20,josephli@wilson-greer.com,723-562-6109x1854,"39409 Elizabeth Creek Clarkemouth, MD 76214","John Smith, 8749563918",63078.35
~ ZSvz-02056,Nicole Herrera,1969-01-14,Manager,Sales,2015-03-23,icarter@gmail.com,001-292-680-9590x89780,"18024 Amanda Mills Apt. 402 Reeveschester, VA 97006","Jack Brooks, 167-480-5784x166",61835.9
~ LwKR-17114,Nicole Boyd,1973-05-03,Engineer,Engineering,2020-06-28,camposkristin@murray.com,(112)228-0089x893,"17442 Maxwell Street New Mary, CO 69392","Nicholas Bridges, 006.462.5324",91788.4
~ XXAi-05890,Joseph Pacheco,1956-11-09,Salesperson,Sales,2019-06-07,conniewilkinson@yahoo.com,347.299.4044x4097,"99402 Wu Common East Robert, OR 61395","Susan Martinez, 882-867-0413",85035.31
~ RGjU-71011,Mr. James Contreras,1961-12-29,Clerk,IT,2019-04-12,james77@hotmail.com,575-465-1540,"2446 Lopez Centers Suite 869 East Meganburgh, NY 39276","Charles Moore, 001-780-572-5191x093",32613.3
~ yivt-26243,Jonathan Huff,1965-10-23,Analyst,HR,2014-12-04,pattyparker@gmail.com,(601)758-3501x70295,"80519 Wise Cliffs Suite 650 East Mia, RI 27015","Robert Moore, 632.403.2749",77688.64
~ DrRF-70672,Trevor Beltran,2000-01-29,Analyst,Sales,2014-04-06,joshuawilliams@wells.info,001-405-237-1511x3509,"9732 Derek Square North Brianmouth, MN 19670","Ricky Garcia, 0348163521",42172.12
~ lPSo-00068,Kelly Chavez,1953-12-04,Manager,HR,2020-02-27,psanchez@gonzalez-clark.info,001-134-627-4611,"90166 Tina Rapids Suite 446 East Nicoleton, WY 05199","Anthony Mora, (608)845-1303",38544.09
~ cXbf-31448,Ian Hicks,1985-06-21,Manager,IT,2023-04-07,penny46@mcmahon-lee.com,2545586803,"1949 Hunter Creek Randychester, MA 92448","Michelle Avery, (027)917-5121",73966.41
~ pOzO-40747,Mrs. Alexis Daniels,2003-02-18,Salesperson,Finance,2018-10-08,danaromero@gmail.com,(297)664-0404x06859,"33385 Nash Route Suite 226 North Lisamouth, HI 59936","Clayton Benton, (312)318-9279",78249.23
~ CmfF-50028,Jeff Baker,1970-05-24,Clerk,HR,2022-06-20,katherine95@martinez-taylor.com,(321)431-5364,"667 Ochoa Burg Apt. 149 Jeffreymouth, ND 39473","William Allen, 1132709563",79832.06
~ MKEG-91715,Jessica Powell,2004-11-09,Clerk,HR,2022-03-07,joshuamoreno@serrano-cummings.com,001-051-324-8333x598,"3343 Price Corner Suite 518 Port Matthewside, OK 18485","Crystal Jones, 820-297-2694x4298",59980.48
~ inYP-36366,Timothy Baldwin,1998-06-22,Manager,HR,2023-01-20,rachelmoore@yahoo.com,+1-172-669-3102x864,"527 Davis Prairie Sheilaville, MO 08055","Richard Taylor, 377-401-2589",92894.15
~ QKbc-23866,Mrs. Emily Miller PhD,1970-04-04,Salesperson,IT,2014-10-26,treeves@padilla.info,001-935-518-9432x5552,"9750 Julie Crossroad Suite 875 South Katherine, AL 14471","James Bates, (648)935-0057x892",54253.89
~ XBXp-71579,Cody Small,2004-12-22,Engineer,IT,2018-04-13,melindahicks@gmail.com,362-349-7375,"60661 Leslie Gateway Suite 895 Rosariomouth, MI 71666","Miguel Hahn, (732)110-6019x93752",67309.06
~ WWAQ-71834,Pamela Duncan,1969-04-07,Manager,Sales,2016-08-09,travis58@yahoo.com,(897)365-0757,"PSC 7429, Box 4519 APO AE 38206","Christine Moore, 001-324-716-0921x1967",42806.88
~ UmIK-38052,Benjamin Kim,1964-08-06,Analyst,IT,2020-10-30,owood@garcia.org,+1-066-147-4882x336,"3164 Nancy Bridge Apt. 087 Mcintoshton, MO 70341","Glen Bennett, 001-913-266-9806",40151.52
~ NTzM-71314,John Hernandez,1969-03-18,Engineer,HR,2020-08-07,owensholly@hotmail.com,(941)808-1934,"2966 Rich Road Suite 994 North Christinastad, NE 83422","Deborah Lam, +1-846-587-4926x58770",67515.03
~ ogLy-82843,Joshua Thomas,1973-11-12,Analyst,Finance,2023-12-20,margaretcantrell@reeves.org,+1-901-787-8483x0555,"11260 Lynch Light New Matthewmouth, RI 54213","Randy Price, +1-996-034-4726x540",52388.55
~ XJzK-76991,Sara Mercado,1965-01-28,Clerk,Sales,2023-06-01,villarrealdonald@gmail.com,+1-333-135-5084x12631,"78586 Anna Inlet South Tonya, MO 90513","Amy White, 032-251-9932x538",48341.04
~ yviu-85555,Alyssa Tran,1956-06-15,Engineer,IT,2017-12-04,wardjoseph@fisher.com,2841901716,"965 Leah Mountains Suite 674 South David, CA 26540","Richard Gardner, (195)333-9967",64529.82
~ JwBc-76050,Deborah Neal,1994-04-15,Analyst,Sales,2018-07-12,tara16@hernandez.net,+1-033-433-4810x62348,"PSC 2563, Box 8731 APO AP 02499","Tammy Crawford, +1-473-026-9178x626",91930.54
~ JwCq-41015,Ashley Hicks,1966-08-27,Clerk,Finance,2018-01-23,robert23@gmail.com,(427)266-7151,"1657 Jerry Lake Thompsonfurt, GA 33186","Cheryl Riley, +1-415-889-1099x76285",36642.75
~ WLLJ-04941,Jose Davis,1971-11-25,Salesperson,IT,2023-12-18,eugene75@yahoo.com,001-685-333-8027,"567 Barber Mountains Apt. 550 Maloneshire, AR 60981","Thomas Freeman, 591-466-0228x505",87641.07
~ xIgZ-52821,Paul Burke,1978-09-16,Manager,HR,2018-05-11,salinasrichard@hotmail.com,(212)429-0085x88337,"29119 Snyder Garden Suite 841 Farleybury, GA 76749","Krystal Wise, 9711271368",84335.65
~ mDjm-37643,Becky Brown,1996-10-20,Analyst,IT,2014-06-28,gregory91@hotmail.com,+1-430-743-3397x010,"916 Michael Stravenue New Tiffany, RI 94282","Katherine Mcdaniel, 001-185-466-9066x3490",55391.84
~ TYub-31571,Jerry Medina,1988-12-03,Salesperson,Sales,2014-01-22,nicole89@mays.com,004-655-2740,"54941 Emily Grove Apt. 580 Kristenmouth, IL 22923","Holly Morgan, 218-469-8429",65399.14
~ tZHF-72631,April Rivera,1981-07-21,Clerk,Engineering,2020-07-16,jeffreybell@hodge.com,778-151-0882x71838,"46131 Lisa Turnpike Philiptown, NJ 50494","Matthew Shaffer, (282)076-5052",63972.0
~ yGgw-69006,Mary Sparks,1958-11-21,Analyst,Engineering,2015-12-25,robertschristopher@mcknight.com,+1-771-962-4167x4312,"987 Cole Ridges Apt. 151 Reyesberg, DE 56698","Julie Johnson, 419-466-2640x41307",66343.14
~ hSrR-56837,Wendy Rios,1984-11-11,Engineer,Sales,2023-05-26,christophermartinez@jones.com,(266)943-0368,"430 Hunt Glen Apt. 560 Billfort, GA 86821","Anthony Bowen, 860.923.7253",40647.52
~ MARR-43330,Brian Cooke,1963-07-10,Analyst,Finance,2015-01-14,lisaolsen@anthony.biz,001-956-997-1509,"669 Murray Road Suite 437 Robertsonstad, WI 48288","Melanie Torres, (361)875-0570x804",77444.62
~ JtkS-69659,Jessica Rodriguez,1988-02-20,Analyst,Engineering,2020-09-10,johnsdiana@yahoo.com,278-461-7170x4478,"8554 Fisher Fall Apt. 459 Jacksonfort, IA 61670","William Harrington, 381.149.3021x29309",93062.66
~ OSww-70751,Elizabeth Rodriguez,1993-12-22,Clerk,Engineering,2018-05-17,sharon90@hotmail.com,2002984270,"7223 Derek Underpass Apt. 273 East Debrafort, UT 73535","Caitlyn Chen, (446)755-9820x7317",86607.6
~ VcRt-04073,Casey Hess,1953-03-24,Clerk,IT,2015-06-15,haysjames@kennedy-gonzalez.com,0126068353,"982 Henderson Wall South Anthony, DE 07801","Gabriella Torres, 915-656-5992x00817",56030.49
~ lviD-07873,Kari Jordan,1964-08-03,Engineer,Sales,2015-12-20,myerszachary@yahoo.com,807-385-7814x3161,"430 Sabrina Pike West David, AR 50909","Stephanie Wiggins, 693-803-1500x3435",40662.86
~ FFNo-69842,Christina Adams,1988-12-11,Analyst,HR,2016-07-27,amygray@yahoo.com,131.486.3308x1283,"4077 Wilson Plaza Kristinberg, SC 02064","Denise Estrada DDS, (454)022-1915",96368.36
~ JsaO-94091,Christopher Rice,1972-06-12,Engineer,HR,2020-04-28,acarpenter@gmail.com,697.032.6836x661,"4244 Brandon Expressway Suite 209 Andersonland, VA 92377","Joshua Beck, 001-794-153-9484",36277.05
~ Chuo-27164,Rachel Watson,1969-04-20,Clerk,IT,2020-08-11,bdavies@black.biz,731-920-2347x227,"2200 Katelyn Spurs Apt. 406 Port Brandonmouth, OK 09040","Alexis Aguilar, 213-593-9433x3587",85970.11
~ BTsF-14199,Vickie Smith,1957-07-12,Engineer,Finance,2014-11-23,melanielewis@gmail.com,8505377327,"9210 Melissa Prairie Lake Melissaburgh, WY 46992","Adrian Collins, (674)963-7232x628",40794.66
~ IMtV-42232,Sheri Peterson,1961-11-05,Analyst,IT,2019-06-06,samanthadominguez@gmail.com,001-820-694-7269,"7323 Soto Track North Patrick, NH 10034","Jeff Johnson, 803.072.8353x20141",90768.74
~ lGxa-50549,Roy Miller,1964-10-07,Engineer,HR,2021-07-22,yzimmerman@black-thompson.info,001-961-878-5254x8001,"670 Sandra Spur Madisonstad, HI 77306","Jessica Randall, (572)161-1935x2135",61909.29
~ PHbM-57072,Stacey Freeman,1972-11-10,Salesperson,Finance,2021-04-09,moorethomas@murillo-cardenas.org,(300)946-1280x6881,"43831 Phillips Rue Riverafurt, MI 12008","Sheena Andrews, 700-913-5782x799",94867.91
~ uERf-51475,Christopher Gray,1997-09-10,Engineer,HR,2018-06-17,foxjohn@hotmail.com,001-551-413-9011x2001,"079 Christine Gateway Darrellburgh, MS 54968","Alan Melton, +1-838-570-5710x2164",79711.76
~ Tiih-64755,Allen Wilkerson,1981-01-09,Salesperson,Engineering,2021-03-07,harperstephanie@hotmail.com,+1-648-046-9010x00617,"575 Holland Port West Juanberg, WV 38814","Cassandra Ball, 001-722-609-7171",94492.59
~ UIJU-99261,Gwendolyn Gonzalez,1980-03-11,Clerk,Engineering,2016-05-22,tbaker@yahoo.com,508-984-9455,"3196 Davis Plains Apt. 079 North Carmen, GA 65266","Rebekah Chapman, 771-441-2123x10958",40674.45
~ tTJD-24064,Eric Patterson,1970-11-17,Engineer,Finance,2021-04-11,normanamy@yahoo.com,(008)762-9090x3460,"45602 Maria Cape Port James, SD 91158","Brian Harper, (862)176-7830x3833",89032.42
~ eqTe-93117,Janice Lambert,1977-03-22,Salesperson,Engineering,2018-09-06,johnsonjacob@pena.com,490.538.3101x26120,"473 Christopher Stream East Parker, NJ 72893","Heather Perkins, 001-021-652-8393x568",72608.6
~ rZwN-29497,Nicholas Spencer,1976-09-22,Analyst,HR,2021-01-07,chaas@hamilton-pitts.com,+1-657-176-0442x388,"709 Rios Brooks Suite 039 Brandonshire, OR 14332","Courtney Fisher, 5635793469",89513.54
~ TDZV-92389,Scott Whitney,1958-10-12,Clerk,IT,2022-10-18,taylorstacey@gmail.com,803.099.5835x7363,"577 Lisa Route Tylerton, IA 52439","Shaun Cook, 1195321732",46467.12
~ bXKr-18324,William Ward,1985-10-31,Engineer,Engineering,2021-05-16,hortonjacob@manning.com,001-394-181-6346,"95570 Richard Extension Apt. 564 Porterland, ID 37218","Chad Sutton, 0824900421",67578.38
~ XKoZ-15525,Greg Figueroa,2001-10-10,Engineer,Sales,2018-10-18,mariayoung@hotmail.com,+1-793-477-7239x367,"92719 Shannon Heights Apt. 498 Markborough, CO 77948","George Johnson, 001-580-623-3175",46456.36
~ sgFU-75575,Danielle Steele,1965-04-09,Analyst,HR,2018-08-31,michaelduncan@yahoo.com,+1-415-511-1296x5185,"7835 Seth Crossing Suite 473 Port Jeffrey, NJ 19141","Stephen Andrade, (892)156-9695x762",33207.65
~ cams-05979,Kristina Adkins,1988-10-30,Clerk,HR,2021-03-23,victor66@yahoo.com,+1-863-764-1224x52969,"78010 Cynthia Skyway Apt. 196 North Jamie, NH 78546","Trevor Jackson, +1-954-817-0090x985",48788.31
~ aQff-61986,Gary Jones,1969-11-02,Salesperson,IT,2014-08-25,wgill@hill.net,652.852.6419,"05135 Monique Lodge Michaelshire, SD 26756","Christian Washington, (468)419-1114",97819.14
~ wzJX-88453,Erik Gomez,1959-01-06,Salesperson,Finance,2021-08-22,shaun08@hotmail.com,463-428-5322x8472,"Unit 5499 Box 0686 DPO AP 24624","Donald Davis, +1-767-630-7756x0139",51083.09
~ Dkri-92004,Sherry Bailey,2001-12-21,Engineer,IT,2016-08-12,theresaschmidt@ramirez-bradshaw.org,(908)283-4236,"472 Douglas Gardens West Regina, ME 63271","Lisa Garcia, 001-286-839-0203",34606.36
~ VxzV-58079,David Miller,1963-12-13,Clerk,HR,2019-03-15,ncastro@gmail.com,001-360-856-0900x1497,"24514 Murphy Plains Suite 032 Kristinland, UT 91570","Samuel Harris, 072.003.6214",61357.28
~ lGgT-20143,Bonnie Harris,1992-03-05,Manager,IT,2017-01-04,robin81@harris.com,550-673-5025x15860,"194 Paul Ramp Apt. 071 Ashleymouth, GA 82162","Joe Sanchez, 001-349-672-9502x74419",83987.93
~ sUlg-56210,Raymond Dunn,1954-06-24,Salesperson,IT,2015-09-15,jacksonjohnson@cook.org,2571588944,"59005 Campbell Shore Apt. 104 Port Michael, KS 81364","Tammy Valdez, +1-223-767-8288x5643",96802.83
~ Ugsg-89881,Thomas Olson,1979-01-09,Engineer,Sales,2017-11-15,cgomez@hotmail.com,3644568817,"169 Wright Wall Edwardside, WA 40970","David Mcdonald, 632-299-0759x944",60780.17
~ eKvH-55213,Karen Adams,1971-10-07,Salesperson,Finance,2023-08-21,michaelwalker@hotmail.com,004.094.9339,"46941 Brown Roads South Theresa, LA 56479","David Stevens, (467)621-5679x29854",54421.17
~ xQeN-66765,Angela Sanchez,2002-09-24,Clerk,Finance,2020-05-13,theresa33@jones-harris.info,001-623-149-4704,"93917 Kyle Causeway Johnsonberg, OK 52551","Jennifer Rocha, (079)376-2969",72552.28
~ RiJB-73843,Caitlin Simpson,1953-06-09,Salesperson,Sales,2021-12-10,frank63@yahoo.com,(858)382-2707,"90285 Franklin Lights Apt. 172 Jonesbury, TN 16512","Danny Price, +1-445-291-1475x278",99628.97
~ QYCi-82666,Christina Cain,1967-02-17,Manager,HR,2020-09-13,rkemp@mack-butler.com,767.957.7204x676,"38492 Hernandez Port South Kristinborough, AK 52927","Emily Martinez, 001-218-517-3328x4212",86364.45
~ NYuS-19136,Jose Fleming,1985-08-27,Clerk,IT,2015-09-04,wsolis@smith-taylor.com,363-255-6701x1003,"46472 Miller Stravenue New Mirandastad, WI 08116","Thomas Martin, 655.522.0235x5148",86457.7
~ iwvW-55803,David Jones,1974-10-23,Engineer,Finance,2016-07-02,brian41@gmail.com,001-170-678-0518x2793,"77470 Cheryl Motorway Lake Stacyberg, NM 21501","Diana Church, 001-957-178-3794x3565",90117.51
~ GbWj-25818,Sonya Cannon,1967-10-30,Engineer,Finance,2021-04-10,william96@yahoo.com,001-337-397-5839x4069,"4942 Jackson Ferry Apt. 022 Smithfurt, MS 23970","Mary Mitchell, 240-977-9152x5005",76991.19
~ GuOP-27977,John Ramirez,1998-10-23,Analyst,Engineering,2015-12-21,russell89@yahoo.com,001-226-569-1349x77279,"391 Kenneth Cove Lake Leah, NM 70148","Katie Mueller, (643)683-0148",82479.19
~ XlSH-98755,Kristin Chavez,1970-03-17,Analyst,Sales,2016-10-05,sanchezangela@stone.org,+1-863-243-8664,"879 Stephen Common Fisherport, MI 01842","Reginald Rush, +1-667-348-8692x026",78135.38
~ HYVk-58471,James James,1966-08-19,Analyst,IT,2022-06-20,ecantrell@morales-hess.com,(614)825-7991,"3657 Beverly Ferry New Sylvia, DE 50529","Ernest Evans, +1-064-960-0419x9317",77376.29
~ ktVo-51593,Ronald Smith,1989-02-07,Engineer,Sales,2017-08-17,fryerhonda@taylor-moran.com,(857)901-4791x574,"81591 Ashley Shoal New Bradleytown, IN 93609","Julie Silva, 359-462-7833x335",89763.3
~ ksYg-27882,Robert Stewart,1981-05-30,Analyst,Sales,2020-08-09,ftaylor@sharp.org,001-592-922-2305x482,"185 Michael Rapid East Walterbury, NH 42189","Nathaniel Miller, (883)032-0696",54314.1
~ fqIM-99281,Daniel Vasquez,1969-11-11,Analyst,IT,2014-05-16,john91@reynolds.com,(276)270-2060,"142 Hogan Mountain Apt. 648 West Nathan, DE 88612","Crystal Green, 010-919-7421",88859.72
~ tsIH-16112,Jeffrey Randall,1969-03-13,Analyst,Finance,2023-09-02,amber29@gmail.com,(070)466-0567,"99493 Weiss Knoll Suite 996 East Marvinberg, TX 95684","Matthew Reed, 194-378-9419x426",78429.15
~ DPEu-79006,Michelle Marquez,1971-12-05,Clerk,Engineering,2017-09-02,lori73@rodriguez-bentley.info,204-074-9933x825,"052 Sullivan Summit West Dennis, MO 69276","Kristen Walker, 001-217-528-5665x50065",96756.43
~ ygxb-41803,Keith Carter,1962-07-27,Clerk,Engineering,2017-08-02,joshua83@rodgers.com,473-393-3166x04040,"28349 Jones Ferry Suite 107 Vanessaport, OK 40643","Natalie Smith, 261-287-0847",37328.5
~ nyQN-11893,Sean Wood,1986-03-19,Engineer,Sales,2016-03-24,jacksonbruce@fox-anderson.com,001-508-255-7978x5548,"USS Lambert FPO AP 84645","Daniel Petty, 132-658-1815x8672",30755.54
~ MXCD-08965,Stacey Davidson,2001-10-27,Engineer,HR,2015-03-12,kwright@hotmail.com,001-881-455-2783x336,"8354 Morgan Dale Apt. 943 West Katherinehaven, GA 19538","Michael Thompson, 001-066-077-4001",46177.57
~ bfAP-69835,Steven Ward,1973-01-25,Engineer,IT,2020-05-02,roberthodges@hotmail.com,(126)136-3692x60426,"398 Hernandez Course Apt. 353 Longport, IN 24993","Melissa Delacruz, (140)285-2549x650",79721.34
~ oIuR-70535,Jason Morgan,2005-08-14,Manager,HR,2017-04-24,yjacobs@jenkins.com,915-580-2748,"9356 Thomas Greens Lake Ashley, AR 93535","Christine Wilson, 007-597-7181x12057",37949.75
~ pRMh-04449,Jeffrey Nguyen,1959-08-21,Salesperson,IT,2017-08-06,brownbrandon@haley-christian.com,(792)738-9488x72505,"6254 Alexis Orchard Zacharybury, AK 01716","Jerome Barnes, 9833220485",33922.41
~ PPOs-69346,Justin Miller,1961-05-08,Salesperson,IT,2022-08-04,apearson@roberts-myers.org,(660)456-8785,"0640 Lawrence Lodge Apt. 961 West Mary, LA 60521","Kathryn Foster, 001-263-065-5945x82255",51320.19
~ DnYD-67311,Katrina Young,2001-12-29,Analyst,IT,2018-09-29,perry89@payne.biz,+1-448-750-0240x64448,"62240 Cox Island South Andrea, MA 31830","Heidi Curtis, (639)741-5957x718",95211.59
~ Ekqr-84128,Kyle Cooper,2003-10-27,Clerk,Engineering,2020-11-04,angela93@yahoo.com,001-822-753-5366x352,"540 Taylor Garden Suite 458 North Toddstad, TN 60024","Christine Reyes, (385)574-8254",85246.2
~ hGVp-14335,Shannon Hanna,1965-11-29,Analyst,IT,2021-07-12,natalie83@lane.com,634.807.1222x78495,"3001 Jimmy Circles Apt. 619 East Johnborough, OH 75740","Tara Washington, +1-952-524-7527x684",85026.9
~ QPnw-49584,Luke Gibson,1992-01-27,Analyst,Engineering,2015-09-21,hollowayjoann@gmail.com,283-447-7687,"92227 Roberts Village Suite 999 Erictown, MN 55850","Matthew Brown, (852)160-4856x82446",66923.16
~ eFkP-90762,Steven Sharp DVM,1968-11-20,Engineer,IT,2016-08-23,bakermichael@yahoo.com,+1-118-550-9003,"Unit 4860 Box 6218 DPO AP 51776","Kevin Williams, 337-035-7961x151",59001.99
~ bLXL-45338,Erin Barnes,1976-03-24,Clerk,Sales,2016-11-06,henry81@gmail.com,(679)983-0382,"957 Harrison Falls Dawnborough, WV 02720","Kristen Gray, 8242561471",35270.71
~ BmBO-89287,Elizabeth Garcia,1988-12-26,Clerk,IT,2020-02-05,kimberlywilliams@fisher.com,(203)550-1945,"2577 Nelson Glens Sierrabury, OH 14059","Amber Johnson, 336.715.8990",40173.9
~ FYhI-25619,Karen Harris,1972-09-30,Salesperson,Finance,2021-11-10,richardchurch@bernard-clark.net,+1-891-674-0100x2280,"66703 Ray Shore Apt. 417 East Anthonyview, FL 03786","Thomas King DDS, (771)509-9555",71406.27
~ MDko-28863,David Flores,1969-05-28,Analyst,HR,2019-01-29,thomaskatherine@davis-lambert.info,466-649-3154,"USS Padilla FPO AA 66948","Rachel Moran, 060.724.5566x70761",92383.73
~ QkFp-55704,Michael Joseph,1960-11-10,Manager,Engineering,2016-04-04,dhoward@yahoo.com,666-499-6603,"7489 Maria Avenue Apt. 285 East Staceyfort, FL 69990","Robert Sutton, +1-795-787-1280x666",40027.05
~ NAZY-21020,Jeremy Perez,1990-06-04,Clerk,Engineering,2023-10-23,russell57@hotmail.com,413-190-6295,"849 Huff Orchard Suite 855 Robinbury, LA 70119","Zachary Jones, 603.809.4354x3117",36510.48
~ gWRl-79357,Kelly Lee,1983-12-02,Manager,Engineering,2020-05-10,ohughes@gmail.com,001-999-472-6955x1550,"21271 Gregory Pine West Jamesburgh, NE 69639","Elizabeth Robertson, 944-835-7473x66623",62872.72
~ wJdg-50277,Connie Bowers,1988-02-11,Salesperson,HR,2018-03-13,roachdeborah@hotmail.com,5941575121,"270 Kimberly Spur Apt. 971 Jessicaside, NJ 60710","Sandra Brown, 690-036-7493x16924",97111.02
~ utpo-39187,Elizabeth Waters,1974-10-10,Engineer,IT,2017-01-02,bnguyen@yahoo.com,320-091-9440x35787,"676 Nguyen Skyway Bradleyburgh, CA 43784","Deborah Kelly, 212.701.1727x3432",66885.71
~ WYPL-00444,Sandra Obrien,2004-07-30,Manager,HR,2022-09-13,lisa94@larson.org,001-324-363-5352,"6186 Lee Rue Port Sara, OK 30798","Stacey Leonard, 545-857-8355x1562",60866.29
~ ZRJJ-21190,Jacob Peck,1953-02-22,Analyst,Engineering,2023-06-02,gonzalezsamantha@gmail.com,(216)360-6769x6277,"USNV Diaz FPO AA 37515","Janet Griffith, 571.864.4344x8564",47948.43
~ WuQf-38827,Heather Moore,1973-12-03,Clerk,HR,2014-05-12,perkinsmichael@hotmail.com,678-218-0518,"909 Tony Cape Suite 996 Gutierrezborough, WI 51598","Mary Peterson, 769.481.4145",90917.94
~ fhkp-13054,Michael Liu,1959-02-28,Manager,Engineering,2016-06-06,roychad@murray-sullivan.com,7572614848,"USCGC Baker FPO AE 37066","Vincent Frank, 001-947-327-3047x916",86464.11
~ frGC-04350,Amber Shepard,1963-02-17,Engineer,Engineering,2015-03-12,michaelmartinez@oliver-franklin.com,427.428.7954,"629 Julie Tunnel West Terri, FL 52339","Heather Harris, 111-264-2283x771",71986.06
~ tgWN-72139,Austin Booth,1983-11-18,Analyst,HR,2014-04-20,nhunt@yahoo.com,001-786-106-8727x366,"95351 Soto Drive West Christian, LA 84908","Zachary Rodriguez, 001-819-359-2051x21623",83658.76
~ keGd-66800,Jason Armstrong,1986-11-05,Clerk,IT,2017-10-07,larryrosales@gmail.com,(042)329-2636x120,"86692 Stephanie Hill New Wendyport, PA 27735","Juan Middleton, +1-838-184-1869",37778.01
~ UsKL-90573,Dean Cline,1983-10-14,Clerk,Engineering,2021-09-07,levans@padilla.com,001-008-177-8665,"08059 Taylor Meadow Ewingstad, OK 06010","John Knox, (740)599-8107x6611",39079.76
~ lBGb-57618,Steven Smith,1979-10-14,Salesperson,IT,2021-04-06,robert84@arnold-thomas.biz,452.097.2978,"8676 Brady Cove Suite 362 South Michelleborough, WY 63053","David Larsen, 001-649-115-0912x996",75899.49
~ WjHd-28279,Charles Smith,1966-11-06,Salesperson,Finance,2023-04-22,robertevans@yahoo.com,(449)119-1800x12299,"69326 Douglas Row Gregoryfort, PA 42686","Andrea Rodriguez, 9564314351",48572.32
~ kZjb-32714,Marvin Harris,1971-04-19,Salesperson,IT,2023-03-15,ronaldgibson@yahoo.com,200.022.7998x44744,"039 Valdez Tunnel Suite 279 New Jason, NE 73257","Katie Miles, 547.515.3670",78525.14
~ gmyV-60634,David Sullivan,1971-07-03,Manager,Finance,2014-12-24,joshuabrooks@jackson.biz,350-224-4207,"02269 Eric Pines Lake Reneeville, IL 81833","Christopher Elliott, 275-954-2591",55999.41
~ fyLq-43913,Gina Weeks,1980-11-01,Clerk,Sales,2018-04-30,patrick39@yahoo.com,001-225-960-6505x9657,"75497 Nelson Throughway South Renee, NC 89319","Dr. Ann Johnston, +1-125-573-2903x0058",56586.91
~ DKNm-22944,Jonathan Henderson,1955-10-09,Salesperson,IT,2015-09-07,ecervantes@jones-brown.com,610.271.6167x898,"917 Christopher Orchard North Sharon, OR 65226","Michael Wilson, 001-976-134-2776x004",52115.75
~ CCyU-26182,Keith Cox,1978-06-29,Engineer,HR,2014-10-15,andersonchris@gmail.com,(136)221-8567x0611,"1752 Tara Spring New Kimberlyland, DE 83796","Melissa Mcdaniel, 001-951-867-4424x819",50476.31
~ MQiF-71193,Mary Allen,1955-07-25,Manager,Engineering,2018-01-21,garciaashley@hotmail.com,927-475-8633,"86536 Lee Underpass Apt. 378 Erictown, TN 56548","Danny Martinez, 9096269519",71398.69
~ uwDe-78995,Brittany Burgess,1963-11-16,Engineer,Engineering,2014-09-27,walterbeck@hotmail.com,043-694-2052,"979 Hutchinson Isle South Timothymouth, PA 20541","Michael Henderson, +1-002-478-5785x055",86542.04
~ oaSU-23504,Charles Schmidt,1997-11-12,Engineer,Finance,2019-01-04,xfrank@hotmail.com,(125)159-0405x90216,"Unit 1954 Box 3844 DPO AP 68717","Lisa Guerra, 785.945.0941",54402.89
~ vZVs-76067,Jennifer Fleming,1994-12-26,Engineer,Sales,2020-06-26,kristen69@gmail.com,693.927.6493x66964,"USNS Shah FPO AE 84610","Susan Lewis, 352-369-7086x387",98344.53
~ lEzs-40607,Mary Mcclain,1994-02-01,Clerk,Finance,2022-01-07,phillipsdebbie@gmail.com,(570)855-5074,"514 Ashley Roads Lopezbury, MI 22944","Cindy Anderson, 020-120-3927x836",35816.62
~ LmBm-38066,Michael Diaz,1965-08-22,Analyst,Sales,2017-07-09,kelly72@gmail.com,(341)561-4278x353,"416 Cole Walks Frankstad, AR 03011","Jane Rodriguez, +1-434-350-5553x11123",85111.5
~ pbRq-14150,Harold Hill,1981-08-02,Engineer,HR,2022-12-14,robert81@hotmail.com,001-743-828-4878x8678,"7649 Wells Corners Apt. 964 South Ray, OR 29379","Carmen Schmidt, (276)254-6624x29998",93732.84
~ fZjt-44560,Donna Phillips,1978-04-11,Clerk,HR,2015-04-04,dberry@flores-wright.com,+1-770-704-4956x0145,"9393 Riggs Grove South Amandastad, MT 83553","Mary Faulkner, +1-305-876-2678",87722.54
~ PqUj-34040,Stephanie Lee,1987-01-10,Clerk,IT,2018-11-21,whitneywheeler@stephens.com,724-472-8160,"0434 Alisha Crescent New Karenshire, MI 35287","Matthew Williams, 666.512.5279x1277",87490.82
~ dWWb-54432,James White,1979-04-08,Engineer,Finance,2016-09-20,williamsjeffrey@gmail.com,592-933-2098,"683 Kenneth Expressway Lake Jerome, PA 79447","Kaitlyn Gonzalez, +1-154-142-3873x9547",57854.43
~ WzAI-33042,Diana Gonzalez,1958-10-11,Clerk,IT,2016-04-11,smatthews@yahoo.com,001-981-726-9204x08167,"816 Caldwell Row Suite 518 Josephborough, NH 50744","Ashley Alexander, 001-850-621-4930x9162",72097.89
~ HIuq-18375,Robyn Wright,1960-07-22,Analyst,IT,2023-10-24,jacobleblanc@gmail.com,+1-142-257-7881,"5996 Washington Prairie Victoriafurt, NM 19371","Jeremy Payne, 001-233-612-1040",78116.98
~ QYgc-04889,Suzanne Hernandez,1962-09-18,Manager,HR,2016-05-01,bpeters@johnson-lopez.org,449-418-1381x40969,"524 Reynolds Vista Suite 075 Lake Cynthiafort, LA 35473","Kelly Arias, (855)220-5967x9291",37552.88
~ ahBh-99770,Becky Henry,1973-09-23,Clerk,Engineering,2023-11-16,nicholas03@morse-frey.info,4791549312,"46895 Robert Brook New Keith, TX 72893","Dawn Rodriguez, 001-590-620-6299",71489.08
~ TLIk-63907,Mathew Oconnor,1954-07-15,Manager,Sales,2014-01-17,robindavies@king.com,752.036.8894,"684 Leonard Ways Suite 555 Freemanmouth, MN 31932","Melissa Thompson, (867)649-2161x4998",69939.7
~ ycjA-49906,James Bryan,1981-04-27,Analyst,HR,2017-06-22,wardkayla@hotmail.com,001-894-390-7557x7124,"93354 Terry Manor Thomaschester, SC 96536","Benjamin Nichols, 876.439.8121x027",52020.31
~ dnqd-45256,Angel Duffy,1966-04-02,Manager,IT,2015-05-26,chad54@gmail.com,(188)616-9433,"9731 Avery Avenue Geraldshire, FL 49405","Ashley Dean, (360)173-4208",92876.79
~ yYdA-81428,Alyssa James,1983-08-10,Manager,Sales,2023-01-04,mcphersonsean@yahoo.com,298.189.2779x8170,"192 Sara Plain Apt. 820 East Tylermouth, GA 14097","Raymond Hart, 525.899.4636",80215.89
~ jeaa-13400,Richard Paul,1995-09-06,Engineer,Engineering,2018-11-15,jason89@chung.org,377-193-4531,"18987 Todd Hollow South Tammy, MI 55706","Mr. Mark Ferrell, (922)475-4806",90493.45
~ gVpB-25637,Eric Gross,1974-02-25,Engineer,HR,2022-07-07,acevedodavid@yahoo.com,+1-061-465-3230x905,"66436 Bowen Coves New Brian, WI 13227","Ann Parker, (343)575-8414",88868.9
~ Spga-84961,Charles Howard,1996-03-15,Salesperson,Engineering,2023-06-03,hayley65@porter.info,072.053.3897x503,"445 Miranda Squares Apt. 646 Lake Ericchester, OR 23972","Kimberly Roberson, 001-586-233-8363x4869",94129.51
~ pPrC-14352,Nicholas Parker MD,1963-07-19,Analyst,Sales,2016-07-26,dowens@hotmail.com,997.651.2794x67169,"94351 Brandon Circles Derekhaven, MO 89239","Peggy Macdonald, 427-444-5099x81700",91715.07
~ hptl-56593,Elizabeth Gonzalez,1971-09-10,Manager,IT,2015-07-16,randyarnold@hotmail.com,786.889.7185,"67896 Terri Plains Apt. 227 Sabrinaview, ND 48205","Juan Gilbert, 001-131-147-7990x3207",77240.99
~ risz-78380,Karla Obrien,1968-01-07,Clerk,Finance,2019-01-26,qphelps@kim.org,078-748-7295x32300,"4398 Torres Shoal Suite 433 Johnsonland, DE 59934","Marcus Young, +1-542-492-1845x962",78066.05
~ FFmR-74727,Kelsey Lindsey,1987-02-25,Clerk,IT,2017-01-16,trujillopamela@stevens.com,(667)299-1912x53933,"48097 Hart Common Apt. 364 South Kennethtown, CO 25545","Richard Randall, 001-131-070-1290x4968",43863.92
~ OIor-21104,Abigail Young,1960-07-08,Manager,Finance,2018-02-13,jessetaylor@yahoo.com,862.542.9048x385,"2697 Hudson Mountain Apt. 978 West Devin, GA 06537","Richard Stephenson, 304.362.6431x97330",91750.37
~ QckM-44055,Crystal Ball,1986-05-09,Analyst,Engineering,2016-03-06,pschmidt@hotmail.com,258-952-1831x52812,"324 George Walk Terriville, VT 97104","Lauren English, 400.663.5874x03097",48531.45
~ CLXM-70294,Victoria Campbell,1971-04-30,Engineer,HR,2017-11-17,jeremy16@hotmail.com,+1-733-707-4058x175,"4628 Castillo Motorway Suite 006 Jordanland, AL 08185","Hunter Griffith, 851.173.4317",77190.79
~ csEy-27517,Steve Allison,1998-03-03,Engineer,IT,2023-06-09,whitney26@hotmail.com,3024942275,"92418 Christopher Prairie Apt. 862 New Jennifer, SC 92872","Nichole Forbes, 868.928.5200x7098",77884.09
~ AmgM-30992,Jason Green,1966-11-23,Analyst,Sales,2022-12-06,tammy14@williams.com,001-656-590-7590x5465,"45544 Ellen View Port Christine, CT 13327","Jerry Cannon, 001-030-701-3856x311",30132.9
~ bedZ-73758,Jacqueline Diaz,1960-08-03,Analyst,IT,2014-08-22,murrayricardo@allen.com,001-300-740-2778x43275,"468 Robinson Park Lindseyfurt, MO 94248","Alicia Wright, 160.998.6844x2350",53055.98
~ jtFL-13016,Shannon Ortiz,1995-06-13,Clerk,Sales,2015-05-16,dominicgentry@yahoo.com,281.810.5092,"15723 Teresa Mall Apt. 668 Tonyfurt, FL 14726","Anthony Gilbert, 001-006-454-6321x66842",90961.66
~ CqQb-25839,Dawn Mendez,1987-06-15,Salesperson,IT,2014-11-02,michaelyork@gmail.com,001-460-116-2499x93876,"6269 Dodson Prairie Lunaview, IL 35909","Richard Freeman, 001-756-447-9825x4841",61676.71
~ dLWl-95324,Samantha White,1979-12-27,Manager,IT,2019-03-19,darlenehogan@hanna.com,364.190.1730x723,"7002 Williams Plain East Megan, TN 06540","Michael Krause, 001-410-385-0718x4017",30743.44
~ oYQT-82830,Sophia Barber,1968-11-23,Analyst,Engineering,2015-06-26,smithbobby@gardner.biz,+1-905-350-3591,"8255 Bradford Union Wardmouth, VA 75151","Sandra Gray, 239.641.7790x66362",84551.63
~ aAtr-71008,Whitney Holland,1985-02-08,Manager,IT,2015-08-26,gclark@moore.com,7620089020,"3440 Charles Mountains South David, ME 58460","Claudia Gomez, (286)538-0470x53376",63869.48
~ SGnI-72695,Sarah Kelly,1982-10-31,Analyst,Sales,2021-05-10,jacob99@hotmail.com,574-703-0837x36959,"489 Wendy Mount Sparksfurt, NH 01674","Jeremy George, 073.321.9907x30112",42645.56
~ kDdW-18623,Dr. Melissa Cox,2002-01-01,Salesperson,HR,2023-02-18,sara16@gmail.com,039.851.2640x6871,"PSC 8981, Box 4699 APO AA 80678","Jeffrey Malone, 030-935-9116x1753",41656.89
~ Ktiq-59759,Danielle Spencer,1993-08-21,Salesperson,Engineering,2020-10-01,lloydmary@gmail.com,001-081-230-0981x4587,"86182 Mendez Heights Suite 055 Robinsonmouth, VA 72538","Holly Baker, 365-763-8388",45659.85
~ HSLg-12373,Joel Hooper,1976-10-09,Salesperson,Finance,2015-05-11,amybarnes@schmidt-price.com,001-504-928-5568x61909,"5893 Cox Mews Suite 181 Dunnside, AZ 81863","Parker Joseph, 880.405.1703x6736",36964.31
~ lJSo-21951,Erik Howell,1979-10-13,Salesperson,HR,2023-04-30,bradley05@yahoo.com,5159947539,"009 Price Drive Suite 782 North Lawrenceside, OK 62240","David Munoz, 940.630.5331x2336",38478.18
~ hgmN-42510,Elizabeth Hammond,1987-06-22,Manager,Finance,2020-10-04,alyssa92@yahoo.com,529-969-2405x16464,"73807 Johnson Mount Suite 402 Aaronfurt, ND 10252","Victoria Walters, +1-641-682-3366x97742",68321.91
~ qEkI-52668,Samuel Guerrero,1980-11-30,Clerk,IT,2020-02-07,sarabuck@sparks.com,922.754.5439,"28666 John Extension Suite 410 Heatherberg, CT 34717","Thomas Padilla, +1-401-139-6418x6615",86972.02
~ XiFm-18111,Pamela Yates,1991-07-02,Salesperson,Engineering,2020-10-15,hardykaren@gmail.com,(563)006-8915x641,"4216 Stephen Way Apt. 714 New Laura, CO 20999","James Clark, (047)297-2964x92372",94073.22
~ yeka-59124,Kenneth Williams,1985-01-19,Engineer,IT,2020-11-13,bsmith@gmail.com,(617)110-4133x342,"Unit 1200 Box 2939 DPO AE 93020","David Santiago, (765)775-0936x570",90523.51
~ IgjT-97673,Michael Richardson,1979-09-02,Engineer,Engineering,2020-05-27,sarajohnson@edwards.com,2889688174,"2224 Cooper Mills Suite 377 North Monicaberg, HI 23261","Todd Wright, 892.150.6895x310",45528.75
~ xfon-39861,Jonathan Oliver,1996-06-08,Analyst,Finance,2023-11-22,cobbmelissa@stokes.com,001-826-953-2992x63168,"105 Perry Coves Lake Karen, AZ 89012","Beth Wilkerson, +1-443-675-7130x177",74834.36
~ rymr-91901,Katherine Patel,2000-02-02,Manager,HR,2017-10-24,huffrebecca@hotmail.com,329-137-6031,"846 Silva Summit Apt. 930 Mcknightmouth, ID 71249","Christine Skinner, +1-887-246-9593x91583",50678.87
~ OvTQ-94066,Derek Sharp,2000-02-06,Analyst,Sales,2020-10-28,gonzaleztodd@cortez.com,936-696-7078x21501,"05414 Ricky Loop Cortezville, AZ 76890","Amanda Rios, (307)931-1545",64144.13
~ voaN-24057,Kimberly Washington,1998-04-18,Engineer,IT,2022-07-22,daniel58@gmail.com,(274)216-4227,"063 Harris Run Apt. 173 Carterfurt, NV 14607","Dr. Stephanie Rodriguez, 109-623-1594x900",39542.07
~ twbs-55736,Kyle Carter,1980-12-10,Clerk,Finance,2022-09-15,miranda91@gmail.com,+1-754-746-5872x97948,"943 Freeman Ports Damonton, NC 62594","Michael Jimenez, 001-983-631-7496x63066",92658.06
~ vdYi-21681,Tamara Perry,1985-01-29,Analyst,Finance,2014-01-30,pbryan@berry.com,+1-536-901-5167x645,"068 Lance Light Lake Christinaton, CT 84736","Lisa Byrd, +1-866-388-0943x239",96494.95
~ bkoQ-92545,Jacqueline Clements,1976-02-16,Salesperson,Finance,2015-08-13,lisawong@palmer.info,+1-002-903-8878x707,"3621 Nguyen Lodge Lake Joshua, AZ 01806","David Dunlap, 001-450-569-8194x77466",64247.71
~ AQbD-16837,Mario Jackson,1993-04-06,Salesperson,Finance,2014-04-04,clarklaura@lynch-ball.com,(047)272-9617x8079,"64843 Parker Manor Pamelamouth, MI 29386","Shannon Miller, 050.391.7635x313",45738.18
~ PlUM-04951,Jennifer Logan,1996-06-02,Clerk,IT,2019-05-16,stephenhall@hotmail.com,749-762-3847x513,"077 Collier Pass Suite 420 Josephtown, FL 47898","Charles Kim II, (425)173-1965x7147",53760.26
~ EPJb-73316,Justin Baker,1972-04-05,Manager,Engineering,2016-07-29,onealtiffany@green-barnes.biz,618-667-7183x737,"4931 Wilson Estate Suite 940 Cabrerahaven, NH 91394","Eric Mcdonald, 049-082-5813",53477.4
~ Skkv-42171,Jason Harris,2003-12-21,Clerk,Finance,2017-08-21,williewilson@odonnell.biz,+1-195-826-8080x58723,"1579 David Estates Jamesside, CT 17882","Peter Phillips, 8693559566",32348.25
~ OwCt-70523,Jorge Torres,2004-07-14,Engineer,IT,2015-06-17,adamssydney@taylor.com,736.359.4830x08847,"093 Charles Mountains Suite 354 Karenchester, OK 02955","Morgan Turner, 8724569071",61992.71
~ MykE-03625,Kendra Warren,1961-10-15,Salesperson,HR,2014-10-30,ann91@cuevas.biz,(536)250-7383x4635,"16146 Allen Forges Cainville, WY 16247","Michael Kemp, 0715074114",64519.7
~ AIxc-90046,Sandra Ramirez,1974-09-06,Analyst,Sales,2017-07-03,littlejohn@yahoo.com,001-417-705-4539x7913,"0449 Ferrell Dale Sergioburgh, DC 93151","Chase Smith, (384)359-5663x262",58111.68
~ DKAS-09168,William Welch,1972-09-10,Analyst,Sales,2023-10-26,christopher76@gmail.com,947.062.8629x8500,"0898 Rangel Center South Rachel, WI 11551","Hannah Pope, 3388378838",72176.74
~ Zglp-99939,Rick Robinson,1965-09-02,Analyst,Sales,2015-09-17,brownanthony@yahoo.com,(080)506-3380x1469,"924 Molina Land Suite 959 Davisfurt, SC 43239","Chad Russell, 058-674-5635x3477",81380.66
~ LUcY-31578,Keith Palmer,1971-08-28,Manager,IT,2015-02-06,scottlong@gmail.com,742.945.6694,"0488 Stephen Green Apt. 669 South Jillmouth, MI 56044","Thomas Payne, 001-298-734-5690",88122.31
~ JMVG-65977,Julie White,1979-04-09,Manager,Finance,2014-06-29,mjackson@sanders.com,309.409.7495,"Unit 1220 Box 3851 DPO AE 08865","William Anderson, (573)736-6808",31566.4
~ qRGS-46748,Kristine Williams,1963-03-05,Manager,IT,2017-04-17,tamaralopez@jones-thomas.com,001-192-274-3469x06855,"Unit 0436 Box 4259 DPO AA 50598","Brian White, 3180771224",97336.03
~ NKIT-58250,Robin Sanchez,2000-07-24,Manager,Finance,2023-08-09,anna50@hotmail.com,001-639-580-9516x2447,"565 Murray Village Murphyfurt, DE 16532","Bradley Noble, 943.512.0353x37664",36189.08
~ Crpu-63968,Steven Peters,1978-04-23,Engineer,Engineering,2022-11-08,vdaniels@richardson.org,386.009.9323x3012,"726 Cruz Roads New Dianatown, KY 36794","Andrew Pierce, (509)958-8118",68824.79
~ UqEO-54504,Marcus Lopez,1998-12-30,Clerk,HR,2014-09-29,richard24@sullivan-washington.com,2422023299,"160 Megan Shores Armstrongton, HI 69901","Eric Bray, 206.795.8484",87846.01
~ LGTz-25546,Brenda Hendricks,1985-08-16,Manager,IT,2022-07-08,harrybrown@hartman.com,(883)021-1441,"USS Rodriguez FPO AE 83691","Kevin Lopez, 522-282-9546x81248",95074.82
~ UNHZ-57026,Cassie Smith,2005-09-15,Salesperson,Finance,2015-09-04,joshuaandrews@beltran-glover.info,790.618.4674,"334 Richard Cliffs Apt. 004 Joannahaven, NJ 88765","Dylan Williams, 672-602-8368",91803.36
~ gXzI-09060,Linda Holmes,1975-03-10,Analyst,Engineering,2017-04-08,gmatthews@thomas-brooks.net,(693)275-6139x50141,"55917 Dean Mount Wilsonburgh, UT 04114","Elizabeth Sherman, 001-823-186-6765x32106",32500.16
~ lujy-43320,Kari Marshall,1971-05-29,Salesperson,HR,2016-12-22,hbullock@campbell-thornton.com,001-682-327-8561x593,"98828 Davidson Turnpike Apt. 695 East Elizabethmouth, UT 59144","Brian Williams, 001-366-620-6101",31685.78
~ JHSA-42212,Joseph Powell,1967-10-10,Analyst,IT,2017-03-29,leereyes@moore-murray.com,+1-428-359-2564,"75793 Joshua Circle Apt. 581 Michaelchester, LA 03098","Darrell Ayala, 001-582-065-5220x67630",34602.68
~ oCls-11619,Jonathan Davis,1965-04-23,Salesperson,HR,2023-05-30,urichardson@green.biz,001-618-660-5312x4402,"8377 Christopher Tunnel Apt. 948 Kennethfort, OH 11713","Erik Bennett, 595-433-0351",47644.42
~ IcwE-15354,Chad Lee,1970-01-27,Engineer,Sales,2014-10-20,nwilkerson@thompson-williams.net,409-605-1973x0969,"8024 Barnes Fort Lake Stephanie, IL 81564","Curtis Bishop, 708-301-4894x61478",65690.87
~ Wonz-54984,Cassandra Odonnell,1987-07-19,Manager,Sales,2018-05-08,brandon80@phillips.com,583.964.6618x9973,"PSC 1336, Box 8255 APO AA 49089","William Hawkins, +1-252-674-0045x95202",74048.44
~ Iakt-80814,Lauren Mcclure,1999-02-05,Engineer,IT,2014-06-04,hailey95@yahoo.com,162.313.6318,"16441 Jackie Fords West Jamesfort, CT 03360","Alexandra Johnson, 001-220-583-6961x1819",92551.41
~ yaTI-68792,April Garcia,1977-09-21,Salesperson,Sales,2021-05-03,lorraine75@hotmail.com,+1-493-592-2405,"74713 Bruce Hills Suite 700 Richardchester, SD 31120","Patrick Bonilla, 6782823974",64592.37
~ HUra-13349,Denise Alvarado,1955-12-06,Engineer,Sales,2016-05-27,melissathomas@james.biz,001-753-522-8330x124,"Unit 6429 Box 8612 DPO AE 78191","Ashley Cannon, 001-428-905-9698x0592",98422.36
~ JeFa-63889,Veronica Walker,1989-06-30,Manager,Finance,2022-12-12,danielcampbell@koch-mcdonald.com,001-092-070-1181x893,"37742 Edwards Way Stephenland, WV 70433","Ronald Proctor, 078-081-4451x122",80213.01
~ mDCD-56737,Melissa Coffey,1969-10-13,Salesperson,Engineering,2014-06-13,bhays@hotmail.com,515-766-1546,"7199 Susan Expressway Jonathanfort, OH 85482","Michael Gibbs, (292)342-2572",73766.76
~ Ijej-69687,Kayla Hopkins,1984-09-29,Manager,IT,2015-12-08,fhamilton@hill.net,376-934-6232x480,"8055 Stacy Viaduct North Michaelbury, OK 76140","Diane Hernandez, +1-922-992-3507x195",76302.43
~ MSVh-02824,Dylan Hodges,1999-04-14,Engineer,IT,2017-09-30,bradleysimpson@gmail.com,001-864-933-2128x311,"965 Paula Mount Suite 978 Katherinebury, ME 61823","Jasmine White, 254-321-8174x0724",33588.01
~ IOQh-49917,Amanda Leonard,1961-09-30,Engineer,Sales,2020-05-05,steve74@morales.info,+1-143-304-8398x3303,"50536 Chavez Creek Suite 109 Whiteville, OH 67037","Alyssa Williams, 041.547.8238x39452",53342.34
~ Blvn-56793,Jared George,1993-02-14,Engineer,IT,2020-06-11,heatheralvarado@franklin-adams.info,301.474.8149x285,"51846 Porter Via New Rachel, SD 69213","Jennifer Ritter, +1-036-554-2498x111",53319.55
~ BvSu-72362,Ashley Fowler,1957-03-11,Clerk,Sales,2019-12-25,castrobrandon@hotmail.com,296-218-3168,"24723 James Divide Apt. 431 Kellyville, SD 38623","Katherine Hines, 001-306-329-4758x111",41489.74
~ SRXW-12152,Thomas Gilmore,1965-09-24,Salesperson,Finance,2022-07-07,freemanangela@henderson-preston.com,952-440-0527,"409 Price Canyon Apt. 466 Port Christianview, NC 19806","Wesley Bowman DDS, 324.918.2052",30429.13
`.trim(),Pr={doc:Mr,schema:Or,name:"Large Employee Register",id:"employee-register"},Fr=`
# Employee Schema
~ $employee: { name:string, age:{number, min:25}, isActive:bool,
joiningDt:date, managers?*: $employee}
~ $user: $employee
~ $schema: $employee
`.trim(),jr=`
~ John Doe, 25, T, d'2022-01-01',
  { Peter Parker, 30, T, d'2018-10-01' }

`.trim(),Lr={doc:jr,schema:Fr,name:"Simple Deeply Nested Schema",id:"simple-deeply-nested-schema"},_r=`
# Employee Schema
~ $employee: { name:string, age:{number, min:25}, isActive:bool, joiningDt:date, reportingTo?*: $employee }
~ $schema: $employee
`.trim(),Dr=`
~ John Doe, 25, T, d'2022-01-01', { Peter Parker, 30, T, d'2018-10-01' }
~ Peter Parker, 30, T, d'2018-10-01', { Tony Stark, 40, T, d'2015-10-01' }
~ Tony Stark, 40, T, d'2015-10-01'
~ Bruce Wayne, 45, T, d'2010-10-01', { Clark Kent, 35, T, d'2005-10-01' }
~ Clark Kent, 35, T, d'2005-10-01', { Jane Doe, 25, T, d'2022-01-01' }
~ Jane Doe, 25, T, d'2022-01-01', N

`.trim(),$r={doc:Dr,schema:_r,name:"Recursive Schema Complex",id:"recursive-schema-comples"};class Br{constructor(){this.groups=[]}find(e){for(let t of this.groups)for(let n of t.items)if(n.id===e)return n}}const Wr=`
# The products schema, defines the structure of the products data
pid: {string, pattern: r'[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}'},
name: string,       # The product name
shortDesc: string,  # The short description of the product
image: url,         # The product image URL
price: number,      # The product price
isAvailable: bool,  # The availability of the product
category: { string, choices: [electronics, fashion, home, kitchen, sports] }, # The product category
offer?: { # Optional
  discount: number,     # The discount value
  validTill: datetime   # The offer valid till date
},
tags: [string]      # The product tags
`.trim(),Jr=`
~ success: T
~ errorMessage: N
~ recordCount: 102
~ pageNo: 11
~ nextPage: /api/v1/products?page=10
~ prevPage: /api/v1/products?page=12
---
~ 1a2b3c4d-5e6f-7g8h, Apple iPhone 13, The latest iPhone, "https://example.com/iphone13.jpg", 999.99, T, electronics, {10, d'2022-12-31'}, [apple, iphone, smartphone]
~ 2b3c4d5e-6f7g-8h9i, Samsung Galaxy S21, The latest Samsung Galaxy, "https://example.com/samsungs21.jpg", 899.99, T, electronics, {15, d'2022-12-31'}, [samsung, galaxy, smartphone]
~ 3c4d5e6f-7g8h-9i0j, Sony PlayStation 5, The latest PlayStation, "https://example.com/ps5.jpg", 499.99, T, electronics,, [sony, playstation, gaming]
~ 4d5e6f7g-8h9i-0j1k, Apple MacBook Pro, The latest MacBook, "https://example.com/macbookpro.jpg", 1999.99, T, electronics, {25, d'2022-12-31'}, [apple, macbook, laptop]
~ 5e6f7g8h-9i0j-1k2l, Nike Air Zoom Pegasus 38, The latest Nike shoes, "https://example.com/nikeairzoom.jpg", 129.99, T, sports,, [nike, shoes, running]
~ 6f7g8h9i-0j1k-82l3, Adidas Ultraboost 21, The latest Adidas shoes, "https://example.com/adidasultraboost.jpg", 149.99, T, sports, {35, d'2022-12-31'}, [adidas, shoes, running]
~ 7g8h9i08-1j2k-5m68, Samsung Galaxy Watch 4, The latest Samsung smartwatch, "https://example.com/samsungwatch.jpg", 299.99, T, electronics, {40, d'2022-12-31'}, [samsung, watch, smartwatch]
~ 8h9i03j1-2k35-6nrp, Apple AirPods Pro, The latest Apple earbuds, "https://example.com/airpodspro.jpg", 199.99, T, electronics, {45, d'2022-12-31'}, [apple, airpods, earbuds]
~ 9i0j1kf2-3l46-7o8q, Sony WH-1000XM4, The latest Sony headphones, "https://example.com/sonywh1000xm4.jpg", 349.99, T, electronics,, [sony, headphones, wireless]
~ 0j1k2lf3-4m57-8p9r, Apple Watch Series 7, The latest Apple smartwatch, "https://example.com/applewatch.jpg", 399.99, T, electronics, {55, d'2022-12-31'}, [apple, watch, smartwatch]
~ 1k2l3m44-5n68-9q0s, Bose QuietComfort 45, The latest Bose headphones, "https://example.com/boseqc45.jpg", 299.99, T, electronics, {60, d'2022-12-31'}, [bose, headphones, wireless]
~ 2l3m4dn5-6o79-0r1t, GoPro Hero 10, The latest GoPro camera, "https://example.com/goprohero10.jpg", 399.99, T, electronics,, [gopro, camera, action]
~ 3m4nc5c6-7p80-1s2u, Canon EOS R5, The latest Canon camera, "https://example.com/canoneosr5.jpg", 3999.99, T, electronics, {70, d'2022-12-31'}, [canon, camera, mirrorless]
~ 4n5o6cp7-8q91-2t3v, Sony A7 IV, The latest Sony camera, "https://example.com/sonya7iv.jpg", 2499.99, T, electronics, {75, d'2022-12-31'}, [sony, camera, mirrorless]
~ 5o6p7cq8-9r02-3u4w, Nikon Z9, The latest Nikon camera, "https://example.com/nikonz9.jpg", 5499.99, T, electronics,, [nikon, camera, mirrorless]
~ 6p7q8rd9-0s13-4v5x, Canon EOS R3, The latest Canon camera, "https://example.com/canoneosr3.jpg", 5999.99, T, electronics, {85, d'2022-12-31'}, [canon, camera, mirrorless]
~ 7q8r9ds0-1t24-5w6y, Sony A1, The latest Sony camera, "https://example.com/sonya1.jpg", 6499.99, T, electronics,, [sony, camera, mirrorless]
~ 8r9s0st1-2u35-6x7z, Nikon Z7 II, The latest Nikon camera, "https://example.com/nikonz7ii.jpg", 2999.99, T, electronics, {95, d'2022-12-31'}, [nikon, camera, mirrorless]
~ 9s0t1fu2-3v46-7y8a, Canon EOS R6, The latest Canon camera, "https://example.com/canoneosr6.jpg", 2499.99, T, electronics, {100, d'2022-12-31'}, [canon, camera, mirrorless]
~ 0t1u2cv3-4w57-8z9b, Nikon Z6 II, The latest Nikon camera, "https://example.com/nikonz6ii.jpg", 1999.99, T, electronics,, [nikon, camera, mirrorless]
~ 1u2vg3w4-5x68-9a0c, Canon EOS R5 C, The latest Canon camera, "https://example.com/canoneosr5c.jpg", 4499.99, T, electronics, {110, d'2022-12-31'}, [canon, camera, cinema]
~ 2v3wf4x5-6y79-0b1d, Nikon Z9 II, The latest Nikon camera, "https://example.com/nikonz9ii.jpg", 5999.99, T, electronics,, [nikon, camera, mirrorless]
~ 3w4x5ff6-7z80-1c2e, Canon EOS R3 C, The latest Canon camera, "https://example.com/canoneosr3c.jpg", 6499.99, T, electronics,, [canon, camera, cinema]
`.trim(),zr={doc:Jr,schema:Wr,name:"REST API Collection Response",id:"rest-api-collection-response",schemaPanelHeight:300},Hr=`
# The products schema, defines the structure of the products data
~ $products: {
  pid: {string, pattern: r'[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}'},
  name: string,       # The product name
  shortDesc: string,  # The short description of the product
  image: url,         # The product image URL
  price: number,      # The product price
  isAvailable: bool,  # The availability of the product
  category: { string, choices: [electronics, fashion, home, kitchen, sports] }, # The product category
  offer?: { discount: number, validTill: datetime }, # Optional offer details
  tags: [string]      # The product tags
}
~ $categories: { name: string, description: string, image: url}

`.trim(),Ur=`
~ success: T
~ errorMessage: N
~ productsRes: {
    recordCount: 102,
    pageNo: 11,
    nextPage: /api/v1/products?page=10,
    prevPage: /api/v1/products?page=12
  }
~ categoriesRes: {

  }

--- $categories
~ electronics, Electronics, "https://example.com/electronics.jpg"
~ sports, Sports, "https://example.com/sports.jpg"
~ fashion, Fashion, "https://example.com/fashion.jpg"
~ home, Home, "https://example.com/home.jpg"
~ kitchen, Kitchen, "https://example.com/kitchen.jpg"

--- $products
~ 1a2b3c4d-5e6f-7g8h, Apple iPhone 13, The latest iPhone, "https://example.com/iphone13.jpg", 999.99, T, electronics, {10, d'2022-12-31'}, [apple, iphone, smartphone]
~ 2b3c4d5e-6f7g-8h9i, Samsung Galaxy S21, The latest Samsung Galaxy, "https://example.com/samsungs21.jpg", 899.99, T, electronics, {15, d'2022-12-31'}, [samsung, galaxy, smartphone]
~ 3c4d5e6f-7g8h-9i0j, Sony PlayStation 5, The latest PlayStation, "https://example.com/ps5.jpg", 499.99, T, electronics,, [sony, playstation, gaming]
~ 4d5e6f7g-8h9i-0j1k, Apple MacBook Pro, The latest MacBook, "https://example.com/macbookpro.jpg", 1999.99, T, electronics, {25, d'2022-12-31'}, [apple, macbook, laptop]
~ 5e6f7g8h-9i0j-1k2l, Nike Air Zoom Pegasus 38, The latest Nike shoes, "https://example.com/nikeairzoom.jpg", 129.99, T, sports,, [nike, shoes, running]
~ 6f7g8h9i-0j1k-82l3, Adidas Ultraboost 21, The latest Adidas shoes, "https://example.com/adidasultraboost.jpg", 149.99, T, sports, {35, d'2022-12-31'}, [adidas, shoes, running]
~ 7g8h9i08-1j2k-5m68, Samsung Galaxy Watch 4, The latest Samsung smartwatch, "https://example.com/samsungwatch.jpg", 299.99, T, electronics, {40, d'2022-12-31'}, [samsung, watch, smartwatch]
~ 8h9i03j1-2k35-6nrp, Apple AirPods Pro, The latest Apple earbuds, "https://example.com/airpodspro.jpg", 199.99, T, electronics, {45, d'2022-12-31'}, [apple, airpods, earbuds]
~ 9i0j1kf2-3l46-7o8q, Sony WH-1000XM4, The latest Sony headphones, "https://example.com/sonywh1000xm4.jpg", 349.99, T, electronics,, [sony, headphones, wireless]
~ 0j1k2lf3-4m57-8p9r, Apple Watch Series 7, The latest Apple smartwatch, "https://example.com/applewatch.jpg", 399.99, T, electronics, {55, d'2022-12-31'}, [apple, watch, smartwatch]
~ 1k2l3m44-5n68-9q0s, Bose QuietComfort 45, The latest Bose headphones, "https://example.com/boseqc45.jpg", 299.99, T, electronics, {60, d'2022-12-31'}, [bose, headphones, wireless]
~ 2l3m4dn5-6o79-0r1t, GoPro Hero 10, The latest GoPro camera, "https://example.com/goprohero10.jpg", 399.99, T, electronics,, [gopro, camera, action]
~ 3m4nc5c6-7p80-1s2u, Canon EOS R5, The latest Canon camera, "https://example.com/canoneosr5.jpg", 3999.99, T, electronics, {70, d'2022-12-31'}, [canon, camera, mirrorless]
~ 4n5o6cp7-8q91-2t3v, Sony A7 IV, The latest Sony camera, "https://example.com/sonya7iv.jpg", 2499.99, T, electronics, {75, d'2022-12-31'}, [sony, camera, mirrorless]
~ 5o6p7cq8-9r02-3u4w, Nikon Z9, The latest Nikon camera, "https://example.com/nikonz9.jpg", 5499.99, T, electronics,, [nikon, camera, mirrorless]
~ 6p7q8rd9-0s13-4v5x, Canon EOS R3, The latest Canon camera, "https://example.com/canoneosr3.jpg", 5999.99, T, electronics, {85, d'2022-12-31'}, [canon, camera, mirrorless]
~ 7q8r9ds0-1t24-5w6y, Sony A1, The latest Sony camera, "https://example.com/sonya1.jpg", 6499.99, T, electronics,, [sony, camera, mirrorless]
~ 8r9s0st1-2u35-6x7z, Nikon Z7 II, The latest Nikon camera, "https://example.com/nikonz7ii.jpg", 2999.99, T, electronics, {95, d'2022-12-31'}, [nikon, camera, mirrorless]
~ 9s0t1fu2-3v46-7y8a, Canon EOS R6, The latest Canon camera, "https://example.com/canoneosr6.jpg", 2499.99, T, electronics, {100, d'2022-12-31'}, [canon, camera, mirrorless]
~ 0t1u2cv3-4w57-8z9b, Nikon Z6 II, The latest Nikon camera, "https://example.com/nikonz6ii.jpg", 1999.99, T, electronics,, [nikon, camera, mirrorless]
~ 1u2vg3w4-5x68-9a0c, Canon EOS R5 C, The latest Canon camera, "https://example.com/canoneosr5c.jpg", 4499.99, T, electronics, {110, d'2022-12-31'}, [canon, camera, cinema]
~ 2v3wf4x5-6y79-0b1d, Nikon Z9 II, The latest Nikon camera, "https://example.com/nikonz9ii.jpg", 5999.99, T, electronics,, [nikon, camera, mirrorless]
~ 3w4x5ff6-7z80-1c2e, Canon EOS R3 C, The latest Canon camera, "https://example.com/canoneosr3c.jpg", 6499.99, T, electronics,, [canon, camera, cinema]
`.trim(),Yr={doc:Ur,schema:Hr,name:"REST API Multiple Collection Response",id:"rest-api-multiple-collections-response",schemaPanelHeight:300},Gr=`
# Showcases the validated way to store nested and tabular structured logs using
# Internet Object! Superior to CSV and JSON, Internet Object is perfectly suited
# for any structured data, including logs.
~ $log: { # The structured log object definition
  timestamp: datetime,
  level: {string, choices:[info, warn, error]},
  message: string,
  user: string,
  session: {string, pattern: r"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},
  details: {
    ipAddress: string,
    browser: string,
    os: string,
    device: string
  }
}
~ $schema: $log
`.trim(),Kr=`
~ dt"2024-04-20T00:47:21Z", error, Login attempt failed, annbrown, "471dbfa8-c3d4-4888-b7a7-02bcfeeadf00", {122.27.53.82, Safari 14.0, Windows 10, Tablet}
~ dt"2024-04-20T04:36:04Z", info, User logged in, annbrown, "55bf3d74-f4b9-43f0-ba4e-3215c24b80cb", {205.71.80.66, Firefox 89.0, Ubuntu 20.04, Mobile}
~ dt"2024-04-20T06:08:04Z", info, User logged in, johndoe, "91d9ba1b-8123-4baf-86ff-5b0cbf2e6d92", {101.62.46.76, Safari 14.0, Android 11, Tablet}
~ dt"2024-04-20T06:46:04Z", error, Login attempt failed, janedoe, "7181637f-e977-4744-b4f2-3fe77b0a4ac5", {254.31.22.32, Chrome 91.0, Windows 10, Desktop}
~ dt"2024-04-20T09:55:04Z", error, Login attempt failed, annbrown, "ca9c0858-a894-40ff-a486-a868fee9b4eb", {235.74.34.84, Chrome 91.0, Windows 10, Laptop}
~ dt"2024-04-20T10:23:04Z", error, Login attempt failed, janedoe, "e298547c-5dd7-464d-b79c-09a1a597f847", {175.87.54.34, Safari 14.0, macOS 11.4, Laptop}
~ dt"2024-04-20T12:20:04Z", error, Login attempt failed, johndoe, "6558d335-acb2-4de4-a7aa-be1f7663ad0e", {133.12.60.80, Safari 14.0, Windows 10, Laptop}
~ dt"2024-04-20T14:17:04Z", info, User logged in, janedoe, "a9182934-3e2e-4242-88d5-6439ecfa9f93", {163.97.31.17, Firefox 89.0, Windows 10, Desktop}
~ dt"2024-04-20T15:18:04Z", info, User logged in, mikesmith, "80deff88-b7c1-47cb-be34-0ae441c781aa", {227.11.38.95, Edge 91.0, Ubuntu 20.04, Laptop}
~ dt"2024-04-20T16:55:21Z", error, Login attempt failed, annbrown, "534cc4f2-d84a-4844-9d47-1a0c72482c7f", {241.33.52.33, Firefox 89.0, macOS 11.4, Mobile}
~ dt"2024-04-21T02:54:04Z", error, Login attempt failed, annbrown, "7754193e-0bb8-47bd-9f40-bed5256c8fb7", {181.13.14.79, Safari 14.0, Windows 10, Mobile}
~ dt"2024-04-21T03:52:04Z", error, Login attempt failed, johndoe, "a594da3e-ac27-408a-b7ff-03787bcfdc3e", {166.53.89.15, Chrome 91.0, Ubuntu 20.04, Laptop}
~ dt"2024-04-21T03:54:04Z", warn, User session expired, mikesmith, "38b68ec6-cee3-4ab4-ae9f-12c924f83c4b", {181.45.63.40, Chrome 91.0, Android 11, Laptop}
~ dt"2024-04-21T04:19:04Z", warn, User session expired, annbrown, "96dc045d-e7af-49d1-89da-55ff9ebd8150", {104.56.86.74, Chrome 91.0, Android 11, Tablet}
~ dt"2024-04-21T06:36:21Z", error, Login attempt failed, johndoe, "e3e64ad1-5b43-4041-91d8-6829f77e3881", {178.33.34.37, Chrome 91.0, Windows 10, Laptop}
~ dt"2024-04-21T07:44:04Z", info, User logged in, mikesmith, "a168b755-ea73-4409-85d8-51113ba415f9", {159.70.13.88, Safari 14.0, Windows 10, Desktop}
~ dt"2024-04-21T13:35:04Z", info, User logged in, annbrown, "362c202d-f77a-492e-a209-9f899f48e612", {212.13.97.56, Edge 91.0, macOS 11.4, Mobile}
~ dt"2024-04-21T13:56:04Z", warn, User session expired, mikesmith, "bd3d3010-e3fd-4051-880b-05e0556f83b7", {212.96.27.48, Edge 91.0, Ubuntu 20.04, Mobile}
~ dt"2024-04-21T14:40:04Z", info, User logged in, johndoe, "8aca7cda-ab6c-4969-b6e9-b34524d7f1bc", {210.32.71.90, Edge 91.0, Ubuntu 20.04, Tablet}
~ dt"2024-04-21T15:48:04Z", info, User logged in, annbrown, "ac85cf4f-8f1e-4532-bfc8-247b9c5f48fb", {156.99.93.33, Safari 14.0, Android 11, Desktop}
~ dt"2024-04-21T17:11:04Z", warn, User session expired, annbrown, "0cbb90ce-528c-46ad-aa6d-8df07fc2d056", {215.53.56.83, Safari 14.0, Windows 10, Desktop}
~ dt"2024-04-21T17:34:04Z", error, Login attempt failed, johndoe, "da260803-9ab4-46b8-9e1c-457f9d97b6e4", {137.54.43.88, Chrome 91.0, Android 11, Tablet}
~ dt"2024-04-21T18:06:21Z", warn, User session expired, annbrown, "75b6ad46-1716-4bdf-87a5-2ce1be3a21f4", {171.56.75.99, Edge 91.0, Android 11, Desktop}
~ dt"2024-04-21T21:26:04Z", info, User logged in, janedoe, "6c5b6591-ca18-4781-928d-15f4d08e1a09", {209.80.55.45, Edge 91.0, macOS 11.4, Desktop}
~ dt"2024-04-21T21:47:21Z", info, User logged in, annbrown, "7a27d3aa-5b91-4d34-9011-83f9b3e1721a", {115.13.90.53, Safari 14.0, Android 11, Mobile}
~ dt"2024-04-22T00:32:04Z", warn, User session expired, janedoe, "572acebc-a25b-4511-8008-278aeb60c4f6", {170.57.96.47, Firefox 89.0, Windows 10, Mobile}
~ dt"2024-04-22T03:05:13Z", warn, User session expired, janedoe, "a8b4cf55-bf09-4326-b699-be97498a13cd", {242.50.77.27, Chrome 91.0, macOS 11.4, Desktop}
~ dt"2024-04-22T03:47:04Z", warn, User session expired, johndoe, "b4cde40c-4952-45a6-b459-636f6306cd78", {220.79.82.19, Safari 14.0, Ubuntu 20.04, Tablet}
~ dt"2024-04-22T04:30:04Z", error, Login attempt failed, johndoe, "6e9ee1ad-3d35-49fd-8424-6fe55ff9550c", {205.85.28.65, Safari 14.0, Android 11, Desktop}
~ dt"2024-04-22T04:33:04Z", warn, User session expired, annbrown, "a0470d98-c513-4b25-8deb-445f758c3e95", {243.77.61.46, Edge 91.0, Android 11, Desktop}
~ dt"2024-04-22T06:00:04Z", error, Login attempt failed, mikesmith, "708428be-97ec-4f98-bc2e-9f108a29b8ee", {251.97.97.93, Chrome 91.0, macOS 11.4, Desktop}
`.trim(),Vr={doc:Kr,schema:Gr,name:"Logging (Structured) User Activity",id:"structured-logging",schemaPanelHeight:370},qr=`
# For multi-task training, where a single model is trained to predict multiple outputs,
# nested tabular data can be very useful for organizing related tasks and their respective features.
# Here's an example in the Internet Object format, where the model needs to predict both user
# engagement (e.g., clicks, likes) and user churn based on user behavior and demographics:
~ $user: {
  userId: int,
  demographics: {age: int, gender: {string, choices:["male", "female", "other"]}, location: string},
  behavior: {dailyUsage: float, recentActivityCount: int},  # hours per day and number of activities
  tasks: {
    engagement: {clicks: int, likes: int},
    churnRisk: bool
  }
}
~ $schema: $user
`.trim(),Zr=`
~ 1, {60, male, New York}, {4.6, 3}, {{4, 7}, F}
~ 2, {23, other, Illinois}, {0.7, 30}, {{1, 9}, T}
~ 3, {18, female, Florida}, {2.1, 11}, {{5, 2}, T}
~ 4, {50, other, Florida}, {1.4, 2}, {{5, 5}, T}
~ 5, {45, other, Texas}, {3.8, 22}, {{4, 2}, F}
~ 6, {63, other, Illinois}, {4.9, 23}, {{8, 3}, F}
~ 7, {53, other, Florida}, {3.8, 19}, {{5, 5}, T}
~ 8, {56, other, Illinois}, {0.7, 6}, {{2, 0}, T}
~ 9, {47, male, New York}, {3.1, 9}, {{0, 6}, F}
~ 10, {44, female, New York}, {2.4, 17}, {{5, 8}, F}
~ 11, {44, other, New York}, {3.4, 17}, {{2, 4}, F}
~ 12, {20, female, New York}, {4.3, 12}, {{7, 10}, F}
~ 13, {40, other, Illinois}, {2.7, 11}, {{2, 2}, F}
~ 14, {49, other, California}, {2.3, 16}, {{6, 8}, F}
~ 15, {27, female, Texas}, {1.0, 26}, {{0, 4}, T}
~ 16, {64, male, Florida}, {4.9, 16}, {{3, 8}, T}
~ 17, {31, male, Texas}, {1.8, 29}, {{5, 3}, F}
~ 18, {20, other, Texas}, {2.2, 26}, {{9, 1}, F}
~ 19, {62, female, Illinois}, {2.6, 19}, {{9, 10}, T}
~ 20, {18, other, California}, {1.3, 20}, {{0, 1}, F}
~ 21, {53, male, Florida}, {4.2, 6}, {{0, 4}, F}
~ 22, {45, other, California}, {2.6, 12}, {{6, 3}, F}
~ 23, {50, other, Texas}, {2.7, 1}, {{3, 9}, T}
~ 24, {56, male, Florida}, {2.5, 5}, {{2, 6}, F}
~ 25, {32, female, Texas}, {1.5, 20}, {{9, 0}, T}
~ 26, {38, other, Florida}, {4.8, 23}, {{10, 8}, T}
~ 27, {27, female, Texas}, {1.8, 2}, {{3, 9}, F}
~ 28, {26, other, Texas}, {3.3, 8}, {{1, 5}, F}
~ 29, {37, female, Illinois}, {2.9, 13}, {{8, 2}, T}
~ 30, {21, female, Texas}, {2.6, 2}, {{1, 7}, T}
~ 31, {28, female, Illinois}, {3.2, 2}, {{5, 4}, T}
~ 32, {36, other, Florida}, {1.5, 17}, {{7, 0}, F}
~ 33, {39, female, Texas}, {2.3, 19}, {{0, 3}, T}
~ 34, {47, other, Texas}, {0.6, 7}, {{8, 1}, F}
~ 35, {62, other, Florida}, {4.1, 19}, {{1, 7}, T}
~ 36, {43, male, Florida}, {3.6, 18}, {{0, 8}, F}
~ 37, {34, male, Texas}, {2.4, 27}, {{4, 8}, T}
~ 38, {47, female, New York}, {2.9, 22}, {{0, 2}, F}
~ 39, {44, other, Texas}, {4.9, 3}, {{1, 0}, F}
~ 40, {25, other, Florida}, {2.3, 23}, {{6, 6}, F}
~ 41, {33, other, California}, {3.1, 20}, {{1, 0}, T}
~ 42, {23, female, Florida}, {3.0, 24}, {{4, 3}, T}
~ 43, {37, female, California}, {1.8, 12}, {{0, 6}, T}
~ 44, {49, male, California}, {4.3, 24}, {{6, 8}, T}
~ 45, {34, other, Florida}, {1.3, 8}, {{0, 0}, T}
~ 46, {50, female, California}, {3.8, 18}, {{10, 1}, T}
~ 47, {48, female, New York}, {3.1, 29}, {{1, 7}, T}
~ 48, {38, female, California}, {1.5, 30}, {{2, 3}, F}
~ 49, {51, male, New York}, {4.7, 20}, {{4, 5}, F}
~ 50, {29, other, Florida}, {3.9, 6}, {{10, 0}, F}
~ 51, {45, male, California}, {1.0, 28}, {{8, 4}, F}
~ 52, {44, male, Florida}, {2.9, 10}, {{10, 2}, T}
~ 53, {35, female, New York}, {1.9, 17}, {{5, 10}, T}
~ 54, {54, female, Florida}, {0.6, 29}, {{9, 7}, F}
~ 55, {40, female, Illinois}, {2.7, 29}, {{3, 9}, F}
~ 56, {28, female, California}, {1.8, 12}, {{1, 8}, T}
~ 57, {19, male, Florida}, {3.1, 3}, {{5, 9}, F}
~ 58, {51, other, New York}, {0.6, 5}, {{9, 3}, T}
~ 59, {61, female, Texas}, {3.6, 2}, {{4, 1}, T}
~ 60, {36, male, California}, {3.7, 21}, {{6, 10}, F}
~ 61, {30, female, New York}, {4.8, 25}, {{2, 4}, T}
~ 62, {35, other, Illinois}, {4.4, 14}, {{1, 8}, T}
~ 63, {35, male, Texas}, {4.9, 5}, {{0, 2}, T}
~ 64, {33, female, Illinois}, {1.5, 1}, {{7, 10}, F}
~ 65, {35, male, Illinois}, {2.2, 6}, {{8, 8}, T}
~ 66, {48, other, New York}, {2.9, 3}, {{0, 9}, F}
~ 67, {64, male, California}, {0.6, 25}, {{3, 4}, F}
~ 68, {29, male, Illinois}, {1.7, 13}, {{6, 8}, T}
~ 69, {40, male, California}, {1.4, 25}, {{0, 8}, F}
~ 70, {32, other, New York}, {3.3, 6}, {{6, 9}, T}
~ 71, {61, female, California}, {0.6, 24}, {{9, 1}, F}
~ 72, {37, female, Illinois}, {2.5, 21}, {{3, 7}, T}
~ 73, {35, other, Florida}, {0.5, 0}, {{4, 10}, F}
~ 74, {56, other, California}, {3.7, 3}, {{7, 8}, F}
~ 75, {36, male, New York}, {1.5, 6}, {{8, 2}, T}
~ 76, {35, other, California}, {1.9, 17}, {{5, 2}, T}
~ 77, {26, male, New York}, {1.4, 15}, {{5, 0}, T}
~ 78, {43, other, Texas}, {1.4, 23}, {{3, 2}, F}
~ 79, {20, other, New York}, {4.8, 4}, {{6, 2}, T}
~ 80, {58, other, Florida}, {3.2, 25}, {{9, 4}, F}
~ 81, {30, male, Florida}, {2.5, 27}, {{9, 4}, T}
~ 82, {32, other, Texas}, {4.2, 11}, {{3, 4}, T}
~ 83, {39, male, New York}, {3.4, 9}, {{7, 6}, T}
~ 84, {21, male, Illinois}, {3.4, 19}, {{6, 7}, F}
~ 85, {61, other, Illinois}, {4.2, 24}, {{3, 2}, T}
~ 86, {24, female, Florida}, {3.2, 25}, {{5, 3}, T}
~ 87, {56, male, California}, {2.7, 27}, {{7, 5}, F}
~ 88, {36, male, Texas}, {2.5, 15}, {{7, 7}, T}
~ 89, {59, other, Florida}, {1.1, 17}, {{2, 5}, T}
~ 90, {32, female, New York}, {1.4, 25}, {{1, 1}, T}
~ 91, {60, female, New York}, {3.8, 15}, {{6, 7}, T}
~ 92, {23, male, New York}, {3.0, 18}, {{7, 3}, F}
~ 93, {28, other, New York}, {3.0, 27}, {{0, 10}, T}
~ 94, {56, other, Florida}, {3.8, 25}, {{10, 2}, F}
~ 95, {22, male, Texas}, {4.1, 17}, {{7, 5}, T}
~ 96, {55, female, Illinois}, {4.1, 30}, {{1, 10}, F}
~ 97, {43, male, Texas}, {3.1, 19}, {{5, 9}, T}
~ 98, {24, male, New York}, {2.6, 14}, {{3, 7}, T}
~ 99, {50, female, Texas}, {2.7, 1}, {{1, 2}, F}
~ 100, {30, male, Florida}, {4.2, 14}, {{10, 8}, T}
~ 101, {60, other, Illinois}, {4.6, 30}, {{8, 4}, T}
~ 102, {28, other, New York}, {4.0, 21}, {{6, 0}, T}
~ 103, {22, other, Texas}, {3.3, 10}, {{6, 9}, F}
~ 104, {51, male, Illinois}, {2.8, 28}, {{10, 10}, F}
~ 105, {21, male, New York}, {1.6, 1}, {{9, 3}, F}
~ 106, {21, male, Texas}, {3.1, 1}, {{0, 2}, F}
~ 107, {27, female, New York}, {4.2, 30}, {{9, 2}, T}
~ 108, {61, male, Illinois}, {2.5, 17}, {{4, 10}, T}
~ 109, {18, female, Texas}, {1.9, 0}, {{7, 9}, F}
~ 110, {44, male, Texas}, {3.6, 21}, {{6, 10}, T}
~ 111, {48, female, Florida}, {2.5, 23}, {{8, 5}, F}
~ 112, {51, female, Illinois}, {3.1, 23}, {{9, 5}, T}
~ 113, {61, male, Texas}, {3.6, 4}, {{10, 8}, T}
~ 114, {50, female, Illinois}, {1.9, 29}, {{1, 1}, F}
~ 115, {38, female, Illinois}, {1.7, 2}, {{10, 10}, T}
~ 116, {19, male, Illinois}, {0.6, 24}, {{2, 0}, T}
~ 117, {19, male, Texas}, {1.0, 11}, {{0, 1}, T}
~ 118, {31, male, Illinois}, {2.1, 27}, {{5, 1}, T}
~ 119, {33, male, New York}, {1.2, 2}, {{0, 9}, T}
~ 120, {37, male, California}, {4.2, 1}, {{8, 6}, F}
~ 121, {37, female, Illinois}, {4.5, 24}, {{5, 8}, T}
~ 122, {52, other, California}, {1.7, 14}, {{10, 2}, F}
~ 123, {44, male, Texas}, {1.0, 24}, {{2, 9}, T}
~ 124, {65, female, Florida}, {4.2, 4}, {{8, 2}, F}
~ 125, {20, male, New York}, {2.2, 27}, {{4, 10}, T}
~ 126, {33, male, California}, {3.9, 29}, {{9, 10}, F}
~ 127, {38, other, California}, {4.9, 1}, {{9, 6}, F}
~ 128, {55, male, California}, {2.6, 29}, {{5, 3}, F}
~ 129, {49, female, Illinois}, {1.7, 6}, {{4, 7}, F}
~ 130, {59, male, Texas}, {3.1, 7}, {{7, 4}, F}
~ 131, {52, male, Illinois}, {3.2, 5}, {{3, 2}, F}
~ 132, {25, other, Texas}, {0.5, 23}, {{6, 6}, T}
~ 133, {36, female, Florida}, {2.4, 3}, {{9, 6}, F}
~ 134, {35, male, Florida}, {2.5, 18}, {{2, 0}, F}
~ 135, {18, other, California}, {0.9, 0}, {{9, 4}, T}
~ 136, {50, female, Florida}, {1.8, 11}, {{6, 2}, T}
~ 137, {47, male, Illinois}, {3.3, 5}, {{6, 6}, T}
~ 138, {24, male, California}, {2.8, 24}, {{8, 9}, T}
~ 139, {26, male, California}, {2.0, 17}, {{10, 2}, T}
~ 140, {38, male, New York}, {2.3, 9}, {{9, 10}, T}
~ 141, {36, other, Texas}, {1.2, 26}, {{0, 9}, F}
~ 142, {31, male, Florida}, {4.1, 17}, {{3, 10}, F}
~ 143, {49, male, Texas}, {2.0, 9}, {{0, 10}, T}
~ 144, {18, male, Florida}, {3.1, 10}, {{0, 1}, T}
~ 145, {49, female, Illinois}, {1.7, 18}, {{2, 4}, F}
~ 146, {20, other, Illinois}, {4.9, 19}, {{7, 3}, T}
~ 147, {51, female, Florida}, {2.5, 1}, {{2, 3}, F}
~ 148, {58, male, Florida}, {3.9, 29}, {{3, 3}, T}
~ 149, {51, other, Florida}, {1.4, 4}, {{10, 6}, F}
~ 150, {56, female, California}, {4.5, 4}, {{10, 1}, F}
~ 151, {22, other, Florida}, {3.5, 18}, {{0, 2}, F}
~ 152, {18, male, Illinois}, {2.9, 1}, {{10, 9}, T}
~ 153, {27, other, California}, {2.5, 10}, {{7, 6}, T}
~ 154, {19, other, California}, {4.4, 12}, {{2, 9}, F}
~ 155, {56, male, New York}, {0.7, 10}, {{5, 4}, F}
~ 156, {25, other, Illinois}, {4.4, 16}, {{9, 10}, T}
~ 157, {63, other, New York}, {4.9, 13}, {{2, 4}, F}
~ 158, {43, other, Florida}, {4.5, 14}, {{7, 3}, F}
~ 159, {18, other, New York}, {3.4, 4}, {{3, 3}, T}
~ 160, {63, other, Illinois}, {3.6, 5}, {{9, 7}, F}
~ 161, {26, female, Texas}, {3.5, 0}, {{0, 3}, F}
~ 162, {20, female, Texas}, {1.1, 13}, {{9, 7}, F}
~ 163, {26, female, Illinois}, {4.5, 14}, {{5, 1}, F}
~ 164, {49, other, New York}, {3.4, 30}, {{6, 8}, T}
~ 165, {55, other, California}, {1.2, 6}, {{0, 7}, T}
~ 166, {32, female, New York}, {2.5, 6}, {{5, 0}, T}
~ 167, {33, male, Florida}, {2.4, 19}, {{1, 2}, F}
~ 168, {20, female, California}, {1.6, 6}, {{3, 7}, F}
~ 169, {64, male, California}, {3.1, 15}, {{5, 6}, F}
~ 170, {39, other, Illinois}, {0.9, 7}, {{5, 10}, F}
~ 171, {36, female, Florida}, {1.9, 15}, {{5, 4}, F}
~ 172, {21, female, Florida}, {2.6, 29}, {{4, 1}, T}
~ 173, {62, other, California}, {4.8, 16}, {{0, 7}, F}
~ 174, {23, female, Texas}, {4.2, 19}, {{7, 10}, T}
~ 175, {42, female, California}, {0.9, 21}, {{9, 4}, F}
~ 176, {36, other, California}, {2.6, 4}, {{10, 5}, F}
~ 177, {47, male, Illinois}, {3.8, 30}, {{0, 10}, F}
~ 178, {51, male, New York}, {1.4, 1}, {{1, 7}, T}
~ 179, {50, male, Texas}, {4.2, 26}, {{2, 7}, T}
~ 180, {59, female, New York}, {2.0, 1}, {{10, 5}, T}
~ 181, {50, other, Texas}, {3.8, 20}, {{10, 9}, F}
~ 182, {54, other, New York}, {3.6, 10}, {{9, 10}, F}
~ 183, {43, male, Florida}, {1.3, 27}, {{2, 4}, T}
~ 184, {39, female, Florida}, {4.1, 15}, {{4, 10}, F}
~ 185, {29, female, Texas}, {3.8, 21}, {{8, 6}, F}
~ 186, {54, female, Illinois}, {1.7, 6}, {{6, 6}, T}
~ 187, {27, male, Texas}, {3.2, 20}, {{1, 4}, F}
~ 188, {39, female, Texas}, {1.2, 25}, {{0, 3}, T}
~ 189, {56, other, Florida}, {3.2, 19}, {{8, 5}, F}
~ 190, {64, female, Illinois}, {2.8, 12}, {{9, 2}, F}
~ 191, {23, other, Florida}, {4.7, 19}, {{9, 1}, T}
~ 192, {57, other, New York}, {3.9, 2}, {{10, 5}, T}
~ 193, {24, female, Florida}, {3.5, 2}, {{5, 1}, F}
~ 194, {41, female, Illinois}, {3.8, 9}, {{8, 1}, F}
~ 195, {23, other, Florida}, {1.3, 6}, {{10, 3}, F}
~ 196, {54, male, Illinois}, {2.1, 7}, {{7, 1}, F}
~ 197, {48, male, Florida}, {3.0, 21}, {{2, 3}, T}
~ 198, {40, other, New York}, {2.4, 18}, {{1, 0}, T}
~ 199, {41, male, California}, {3.4, 7}, {{2, 7}, T}
~ 200, {25, female, New York}, {3.9, 18}, {{1, 7}, T}
`.trim(),Xr={doc:Zr,schema:qr,name:"ML Training Data",id:"ml-training-data",schemaPanelHeight:310},Qr=`
# This examples represents the seed data for a single page application. It
# contains the dashboard data, initial users and account information required
# to seed the application with initial data.
~ $dashboard: {
  states: { activeUsers: int, totalTasks: int, uptime: float },
  recentActivities: [{ username:string, activity: string, timestamp: datetime }],
  pendingTasks: [{ taskId: int, title: string, dueDate: date }],
  leaderBoards: [{ userId: string, points: int }]
}
~ $initialUsers: { id: int, username: string, firstName: string, lastName: string, avatar: string, role: string }
~ $accountInfo: { accountId: int, name: string, logo: string, theme: string, owner: string, created: datetime, status: string }
`.trim(),ei=`
--- $dashboard
{ 100, 20, 99.5 }, # stats
[ # recent activities
  { "johndoe", "Published artible", dt"2021-01-01T10:00:00" },
  { "johndoe", "Commented on post", dt"2021-01-01T10:15:00" },
  { "johndoe", "Shared a link", dt"2021-01-01T10:30:00" },
  { "janesmith", "Liked a post", dt"2021-01-01T10:45:00" },
  { "janesmith", "Published artible", dt"2021-01-01T11:00:00" } ],
[ # pending tasks
  { 1, "Design the logo", d"2021-01-01" },
  { 2, "Create a new landing page", d"2021-01-02" },
  { 3, "Update the pricing page", d"2021-01-03" },
  { 4, "Fix the login issue", d"2021-01-04" },
  { 5, "Update the profile page", d"2021-01-05" } ],
[ # leader board
  { "johndoe", 100 },
  { "janesmith", 200 },
  { "alexjohnson", 300 } ]

--- users: $initialUsers
~ 31, johndoe, John, Doe, "johndoe.jpg", "admin"
~ 52, janesmith, Jane, Smith, "janesmith.jpg", "editor"
~ 63, alexjohnson, Alex, Johnson, "alexjohnson.jpg", "editor"
~ 94, emilywilliams, Emily, Williams, "emilywilliams.jpg", "editor"
~ 55, michaelsmith, Michael, Smith, "michaelsmith.jpg", "editor"
~ 46, sarahjones, Sarah, Jones, "sarahjones.jpg", "editor"
~ 67, davidbrown, David, Brown, "davidbrown.jpg", "editor"
~ 88, lisataylor, Lisa, Taylor, "lisataylor.jpg", "editor"
~ 9, jameswhite, James, White, "jameswhite.jpg", "editor"
~ 110, maryharris, Mary, Harris, "maryharris.jpg", "editor"

--- $accountInfo
~ 23, "Acme Inc", "acme.jpg", "light", "johndoe", dt"2021-01-01T10:00:00", "active"
`.trim(),ti={doc:ei,schema:Qr,name:"Application Seed Data REST Response",id:"app-seed-data",schemaPanelHeight:270},ni=`
# The configuration schema for the website. When the optional values are not provided
# it assigns the default values. See the output JSON.

name        : string,             # The name of the website
tagLine     : string,             # The tagline of the website
debugMode   : { bool, F },        # Debug mode
port        : { int, 8000 },      # Port (Optional default 8000)
pages?      : {                   # The list of pages (optional)
                type: array,
                of: string,
                default: []
              },
theme       : { string, default },            # Theme of the website
seo?        : {                               # SEO configuration (optional)
                title       : string,           # SEO title
                description : string,           # SEO description
                keywords?   : {                 # SEO keywords (optional)
                                type: array,
                                of: string,
                                default: []
                              }
              },
database?    : {                              # Database configuration
                host        : string,           # Database host
                port        : { int, 5432 },    # Database port (optional, default 5432)
                username    : string,           # Database username
                password    : string,           # Database password
                name        : string            # Database name
              },
security?    : {                              # Security configuration
                jwtSecret   : string,           # JWT secret key
                enableSSL   : { bool, T }       # Enable SSL (default true)
              },
logging?    : {                                     # Logging configuration (optional)
                level       : { string, "info" },     # Log level (default "info")
                format      : { string, "json" },     # Log format (default "json")
                output      : { string, "stdout" }    # Log output (default "stdout")
              },
features?   : {                               # Features toggles (optional)
                enableBlog  : { bool, T },      # Enable blog feature (default true)
                enableShop  : { bool, F }       # Enable shop feature (default false)
              }
`.trim(),ri=`
{
  name: My Awesome Website,
  tagLine: Showcasing the best of the web,
  pages: [ home, about, contact, blog ],
  seo: {
    title: My Awesome Website,
    description: This is an awesome website showcasing the best of the web.,
    keywords: [ awesome, website, showcase, web ]
  },
  database: {
    localhost, 5432,
    username: dbuser,
    password: securepassword,
    name: mywebsite_db
  },
  security: { supersecretkey, true },
  logging: { info,  json, stdout },
  features: {
    enableBlog: true,
    enableShop: false
  }
}
`.trim(),ii={doc:ri,schema:ni,name:"Using it as configuraton",id:"as-config",schemaPanelHeight:300},Ce=new Br;Ce.groups=[{group:"Simple",items:[rr,ar,or,cr]},{group:"Schema and Definition",items:[Pr,Lr,$r]},{group:"IO Types",items:[pr,br,Tr,kr,Cr,Ir]},{group:"Multiple Sections",items:[dr]},{group:"JSON",items:[Xn,tr,Gn,qn,Hn]},{group:"Applications & Use Cases",items:[zr,Yr,ti,Vr,Xr,ii]}];const Dt=pn({key:"editorPosition",default:{editorName:"",row:1,column:1,position:1}});function ai(){const r=gn(Dt);return m.jsxs("footer",{className:"footer",children:[m.jsxs("div",{className:"left",children:[m.jsxs("p",{children:[r.editorName," ",m.jsx("span",{children:": "})]}),m.jsxs("p",{children:["Ln ",m.jsx("span",{children:r.row})]}),m.jsxs("p",{children:["Col ",m.jsx("span",{children:r.column})]}),m.jsxs("p",{children:["Pos ",m.jsx("span",{children:r.position})]})]}),m.jsx("div",{className:"right",children:m.jsxs("p",{children:["© 2019-2024 ",m.jsx("img",{className:"company-logo",src:"/mt-logo.png",alt:"Maniar Technologies Private Limited"})," ",m.jsx("a",{className:"highlight",rel:"noreferrer",target:"_blank",href:"https://www.maniartech.com",children:m.jsx("b",{children:"Maniar Technologies"})})]})})]})}const De=({label:r,bgColor:e,children:t,bytes:n,title:i,outputBytes:a,minified:s,isError:o})=>{n=n||0;const l=100-(a?n/a*100:0),c=l>0?`${l.toFixed(2)}% Smaller`:`${Math.abs(l).toFixed(2)}% Larger`,h=!!n&&!o;return m.jsxs("div",{className:"bar",style:{backgroundColor:e},title:i,children:[m.jsxs("p",{children:[r," ",h&&m.jsxs("span",{className:"count",title:`${n} bytes in ${r}`,children:[n," Bytes"]})," "]}),h&&!!a&&m.jsxs("span",{className:"comparision",title:`${n} bytes in ${r}`,children:[c," than ",s?"minified ":"","JSON"]}),t]})};function si(r,e){const t=w.useRef();return w.useCallback((...i)=>{t.current&&clearTimeout(t.current),t.current=setTimeout(()=>{r(...i)},e)},[r,e])}const oi={selectOnLineNumbers:!0,minimap:{enabled:!1},formatOnPaste:!0,formatOnType:!0,autoIndent:"full",matchBrackets:"always",fixedOverflowWidgets:!0,scrollbars:{vertical:"visible",horizontal:"visible"}},li=r=>{r.languages.register({id:"io"}),r.languages.setMonarchTokensProvider("io",{tokenizer:{root:[[/#[^\n]*/,"comment"],[/\b(T|true|F|false|N|null|Inf|NaN|string|email|url|datetime|date|time|bool|boolean|int|float|number|bigint|decimal|int8|int16|int32|int64|uint8|uint16|uint32|uint64|flaot32|float64|object|array)\b/,"keyword"],[/([@\$]*[a-zA-Z_]*[?\*]{0,2}\w*)(\s*:)/,["attribute.name","delimiter"]],[/{|}|[|]|~|,/,"delimiter"],[/"([^"\\]|\\.)*"/,"string"],[/'([^'\\]|\\.)*'/,"string"],[/[a-z0-9]+'[^']*'/,"tagged-string"],[/[a-z0-9]+"[^"]*"/,"tagged-string"],[/\b\d+(\.\d+)?\b/,"number"]]}}),r.editor.defineTheme("io-dark",{base:"vs-dark",inherit:!0,rules:[{token:"attribute.name",foreground:"#b5997f"},{token:"tagged-string",foreground:"#b5997f"},{token:"delimiter",foreground:"#009999"},{token:"string",foreground:"#b5997f"}],colors:{"editor.foreground":"#C0C0C0"}}),r.editor.setTheme("io-dark")};function Ue(r){const[e,t]=w.useState(null),[n,i]=w.useState([]),a=w.useMemo(()=>({...oi,...r.options??{}}),[r.options]);w.useEffect(()=>{const l=window.monaco;l&&e&&r.markers&&l.editor.setModelMarkers(e.getModel(),"owner",r.markers)},[r.markers,e]),w.useEffect(()=>{const l=window.monaco;if(!l||!e)return;const c=(r.decorations??[]).map(d=>({range:new l.Range(d.startLineNumber,d.startColumn,d.endLineNumber,d.endColumn),options:{className:d.className||"io-error-object-decoration",linesDecorationsClassName:d.className?d.className+"-gutter":void 0,stickiness:1,hoverMessage:d.hoverMessage?{value:d.hoverMessage}:void 0,isWholeLine:!!d.isWholeLine,zIndex:5,overviewRuler:{color:"rgba(255, 83, 83, 0.8)",position:7},minimap:{color:"rgba(255, 83, 83, 0.8)",position:2}}})),h=e.deltaDecorations(n,c);return i(h),()=>{try{e.deltaDecorations(h,[])}catch{}}},[r.decorations,e]),w.useEffect(()=>{const l=window.monaco;if(!l||!e)return;const c=r.selection;if(!c)return;const h=c.startLineNumber,d=c.startColumn,g=c.endLineNumber??c.startLineNumber,y=c.endColumn??c.startColumn+1;try{const C=new l.Range(h,d,g,y);e.setSelection(C),e.revealRangeInCenter(C),e.focus()}catch{}},[r.selection,e]);const s=(l,c)=>{li(c),t(l),l.onDidChangeCursorPosition(h=>{if(r.onChangeCaretPosition){const d=l.getModel().getOffsetAt(h.position);r.onChangeCaretPosition({row:h.position.lineNumber,column:h.position.column,position:d})}}),l.focus()},o=si((l,c)=>{r.onChange&&r.onChange(l,c)},500);return m.jsx(mn,{defaultLanguage:r.language||"io",defaultValue:"",value:r.value??"",language:r.language||"io",theme:"io-dark",onMount:s,onChange:o,options:a})}const ci=({onClose:r,children:e,heading:t})=>m.jsx("div",{className:"overlay",children:m.jsxs("div",{className:"overlay-content",children:[m.jsx("h1",{className:"heading",children:t}),m.jsx("button",{className:"close-button",onClick:r,children:m.jsx("span",{className:"material-symbols-outlined",children:"close"})}),m.jsx("div",{className:"overlay-desc",children:e})]})});function Ye(r){const e=/ at (\d+):(\d+)/g;let t=null,n=null;for(;(t=e.exec(r))!==null;)n=t;if(n){const i=parseInt(n[1],10),a=parseInt(n[2],10);if(!Number.isNaN(i)&&!Number.isNaN(a))return{line:i,col:a}}return{line:Number.MAX_SAFE_INTEGER,col:Number.MAX_SAFE_INTEGER}}function hi(r){return[...r].sort((e,t)=>{const n=Ye(e),i=Ye(t);return n.line!==i.line?n.line-i.line:n.col-i.col})}function ui(r,e){if(!r||r.length===0)return null;const{line:t,col:n}=e,i=r.filter(s=>s.startLineNumber!=null&&s.endLineNumber!=null&&s.startColumn!=null&&s.endColumn!=null&&t>=s.startLineNumber&&t<=s.endLineNumber&&(t!==s.startLineNumber||n>=s.startColumn)&&(t!==s.endLineNumber||n<=s.endColumn));if(i.length>0)return i[0];const a=r.filter(s=>s.startLineNumber===t);return a.length>0?(a.sort((s,o)=>Math.abs((s.startColumn??1)-n)-Math.abs((o.startColumn??1)-n)),a[0]):r.reduce((s,o)=>{if(!s)return o;const l=Math.abs((o.startLineNumber??t)-t),c=Math.abs((s.startLineNumber??t)-t);return l<c?o:s},null)}function di(r){const e=[0];for(let t=0;t<r.length;t++)r[t]===`
`&&e.push(t+1);return e}function vt(r,e){let t=0,n=e.length-1;for(;t<=n;){const i=t+n>>1;if(e[i]<=r){if(i===e.length-1||e[i+1]>r){const a=i+1,s=r-e[i]+1;return{row:a,col:s}}t=i+1}else n=i-1}return{row:1,col:1}}function mi(r){const e=[],t=[];let n=!1;for(let i=0;i<r.length;i++){const a=r[i];if(a==='"'){let s=0,o=i-1;for(;o>=0&&r[o]==="\\";)s++,o--;s%2===0&&(n=!n)}if(!n){if(a==="{")t.push(i);else if(a==="}"){const s=t.pop();s!==void 0&&e.push({start:s,end:i})}}}return e.sort((i,a)=>i.start-a.start)}function fi(r){const e=r.match(/"category"\s*:\s*"(syntax|validation|runtime)"/);return e?e[1]:"syntax"}function pi(r,e){let t=null;for(const n of e)n.start<=r&&r<=n.end&&(!t||n.start>=t.start)&&(t=n);return t}function gi(r){const e=r==="validation";return{className:e?"io-error-object-decoration io-error-validation":"io-error-object-decoration io-error-syntax",glyphMarginClassName:e?"io-gutter-validation":"io-gutter-syntax",overviewRulerColor:e?"rgba(255, 152, 0, 0.9)":"rgba(255, 83, 83, 0.8)",hoverMessage:`${r.charAt(0).toUpperCase()+r.slice(1)} error`}}function yi(r){if(!r)return[];const e=di(r),t=mi(r),n=[],i=/"__error"\s*:\s*true/gi;let a;for(;(a=i.exec(r))!==null;){const s=a.index,o=pi(s,t);if(!o)continue;const l=r.substring(o.start,o.end+1),c=fi(l),h=vt(o.start,e),d=vt(o.end+1,e),g=gi(c);n.push({startLineNumber:h.row,startColumn:h.col,endLineNumber:d.row,endColumn:d.col,className:g.className,glyphMarginClassName:g.glyphMarginClassName,hoverMessage:g.hoverMessage,overviewRuler:{color:g.overviewRulerColor,position:7}})}return n}function bi({value:r,error:e,errorMessages:t,errorItems:n,options:i,onNavigateToError:a,isParsing:s}){const[o,l]=w.useState(!1),[c,h]=w.useState("");w.useEffect(()=>{const y=n?n.map(C=>C.id).join("|"):(t==null?void 0:t.join("|"))||"";y!==c&&(h(y),y&&l(!1))},[n,t,c]);const d=w.useMemo(()=>n&&n.length>0?[...n].sort((y,C)=>y.range.startLine!==C.range.startLine?y.range.startLine-C.range.startLine:y.range.startColumn-C.range.startColumn):t&&t.length>0?hi(t):[],[n,t]),g=w.useMemo(()=>yi(r||""),[r]);return m.jsxs("div",{className:"output",children:[m.jsx(Ue,{value:r,language:"json",options:i,decorations:g}),e&&d&&d.length>0&&!o&&m.jsx(ci,{heading:`Compiled with ${d.length} problem${d.length>1?"s":""}:`,onClose:()=>l(!0),children:m.jsx("div",{className:"errors-container",children:d.map((y,C)=>{if(typeof y=="object"&&"category"in y){const S=y,j=S.category==="validation"?"error validation-error":"error",k=a?()=>a({line:S.range.startLine,col:S.range.startColumn}):void 0,x=`${S.category==="syntax"?"SYNTAX_ERROR: ":S.category==="validation"?"VALIDATION_ERROR: ":"ERROR: "}${S.message} at ${S.range.startLine}:${S.range.startColumn}`;return m.jsxs("div",{className:k?`${j} clickable`:j,onClick:k,title:k?"Click to jump to source":void 0,children:[C>0&&m.jsx("hr",{className:"error-separator"}),x]},S.id)}else{const S=y,j=S.startsWith("VALIDATION_ERROR:")?"error validation-error":"error",k=Ye(S),T=k.line!==Number.MAX_SAFE_INTEGER,x=a&&T?()=>a(k):void 0;return m.jsxs("div",{className:x?`${j} clickable`:j,onClick:x,title:x?"Click to jump to source":void 0,children:[C>0&&m.jsx("hr",{className:"error-separator"}),S]},C)}})})})]})}class Ge{constructor(e,t,n=[]){this._errors=[],this._header=e,this._sections=t,this._errors=n}get header(){return this._header}get sections(){return this._sections}getErrors(){return[...this._errors]}addErrors(e){e.length>0&&this._errors.push(...e)}toJSON(e){var a,s,o;const t=((a=this._sections)==null?void 0:a.length)||0;let n=null;if(t===1)n=((s=this._sections)==null?void 0:s.get(0)).toJSON(e);else if(t>1){n={};for(let l=0;l<t;l++){const c=(o=this._sections)==null?void 0:o.get(l);n[c.name]=c.toJSON(e)}}const i=this.header.toJSON();return i&&Object.keys(i).length>0?{header:i,data:n}:n}toObject(e){return this.toJSON(e)}}var Ke;(function(r){r.invalidType="invalid-type",r.invalidValue="invalid-value",r.valueRequired="value-required",r.nullNotAllowed="null-not-allowed"})(Ke||(Ke={}));var Ve;(function(r){r.stringNotClosed="string-not-closed",r.invalidEscapeSequence="invalid-escape-sequence",r.unsupportedAnnotation="unsupported-annotation",r.invalidDateTime="invalid-datetime"})(Ve||(Ve={}));var qe;(function(r){r.unexpectedToken="unexpected-token",r.expectingBracket="expecting-bracket",r.unexpectedPositionalMember="unexpected-positional-member",r.invalidKey="invalid-key",r.invalidSchema="invalid-schema",r.schemaNotFound="schema-not-found",r.schemaMissing="schema-missing",r.emptyMemberDef="empty-memberdef",r.invalidDefinition="invalid-definition",r.invalidMemberDef="invalid-memberdef",r.invalidSchemaName="invalid-schema-name",r.variableNotDefined="variable-not-defined",r.schemaNotDefined="schema-not-defined"})(qe||(qe={}));var Ze;(function(r){r.invalidObject="invalid-object",r.unknownMember="unknown-member",r.duplicateMember="duplicate-member",r.additionalValuesNotAllowed="additional-values-not-allowed",r.invalidArray="invalid-array",r.notAnArray="not-an-array",r.notAString="not-a-string",r.invalidEmail="invalid-email",r.invalidUrl="invalid-url",r.invalidLength="invalid-length",r.invalidMinLength="invalid-min-length",r.invalidMaxLength="invalid-max-length",r.invalidPattern="invalid-pattern",r.unsupportedNumberType="unsupported-number-type",r.notANumber="not-a-number",r.notAnInteger="not-an-integer",r.outOfRange="out-of-range",r.invalidRange="invalid-range",r.invalidScale="invalid-scale",r.invalidPrecision="invalid-precision",r.notABool="not-a-bool",r.invalidChoice="invalid-choice"})(Ze||(Ze={}));const f={...Ke,...Ve,...qe,...Ze};var xe=function(r,e,t,n){if(t==="a"&&!n)throw new TypeError("Private accessor was defined without a getter");if(typeof e=="function"?r!==e||!n:!e.has(r))throw new TypeError("Cannot read private member from an object whose class did not declare it");return t==="m"?n:t==="a"?n.call(r):n?n.value:e.get(r)},xt=function(r,e,t,n,i){if(n==="m")throw new TypeError("Private method is not writable");if(n==="a"&&!i)throw new TypeError("Private accessor was defined without a setter");if(typeof e=="function"?r!==e||!i:!e.has(r))throw new TypeError("Cannot write private member to an object whose class did not declare it");return n==="a"?i.call(r,t):i?i.value=t:e.set(r,t),t},q;class G extends Error{get positionRange(){return xe(this,q,"f")}set positionRange(e){xt(this,q,e,"f"),this.updateMessage()}get code(){return this.errorCode}get position(){return xe(this,q,"f")}constructor(e,t,n,i=!1,a){super(),q.set(this,void 0),this.errorCode=e,this.fact=t,xt(this,q,n,"f"),this.isEof=i,this.name="IOError",this.updateMessage(),this.__proto__=new.target.prototype}updateMessage(){let e=`"${this.errorCode}" `;if(this.fact&&(e+=`"${this.fact}" `),this.isEof)e+="at EOF";else if(xe(this,q,"f")){const t=xe(this,q,"f");if(typeof t.getStartPos=="function"){const n=t.getStartPos();e+=`at ${n.row}:${n.col}`}else typeof t.row=="number"&&typeof t.col=="number"&&(e+=`at ${t.row}:${t.col}`)}this.message=e}}q=new WeakMap;class A extends G{constructor(e,t,n,i=!1,a){super(e,t,n,i,a),this.name="InternetObject(ValidationError)"}}var u;(function(r){r.CURLY_OPEN="CURLEY_OPEN",r.CURLY_CLOSE="CURLY_CLOSE",r.BRACKET_OPEN="BRACKET_OPEN",r.BRACKET_CLOSE="BRACKET_CLOSE",r.COLON="COLON",r.COMMA="COMMA",r.STRING="STRING",r.BINARY="BINARY",r.NUMBER="NUMBER",r.BIGINT="BIGINT",r.DECIMAL="DECIMAL",r.BOOLEAN="BOOLEAN",r.NULL="NULL",r.UNDEFINED="UNDEFINED",r.DATETIME="DATETIME",r.DATE="DATE",r.TIME="TIME",r.WHITESPACE="WHITESPACE",r.SECTION_SEP="SECTION_SEP",r.SECTION_SCHEMA="SECTION_SCHEMA",r.SECTION_NAME="SECTION_NAME",r.COLLECTION_START="COLLECTION_START",r.UNKNOWN="UNKNOWN",r.ERROR="ERROR"})(u||(u={}));class M{constructor(){this.pos=-1,this.row=-1,this.col=-1,this.token="",this.value=void 0,this.type="",this.subType=""}static init(e,t,n,i,a,s,o){const l=new M;return l.pos=e,l.row=t,l.col=n,l.token=i,l.value=a,l.type=s,o&&(l.subType=o),l}clone(){const e=new M;return e.pos=this.pos,e.row=this.row,e.col=this.col,e.token=this.token,e.value=this.value,e.type=this.type,e.subType=this.subType,e}getStartPos(){return{row:this.row,col:this.col,pos:this.pos}}getEndPos(){const e=this.token.trimEnd(),t=e.split(`
`),n=t[t.length-1],i=this.row+t.length-1,a=t.length>1?n.length:this.col+n.length,s=this.pos+e.length;return{row:i,col:a,pos:s}}}class I extends M{constructor(e){super(),Object.assign(this,e)}toValue(e){if((this.type==="string"||this.type===u.STRING)&&e!==void 0){const t=e.getV(this.value);return t===void 0?this.value:t}return this.value}}class _{constructor(e,...t){this.names=[],this.defs={},this.open=!1,this.name=e,t&&t.length>0&&t.forEach(n=>{const i=Object.keys(n)[0],a=n[i];a.path===void 0&&(a.path=i),this.names.push(i),this.defs[i]=a})}get(e){return this.defs[e]}has(e){return this.defs[e]!==void 0}get memberCount(){return this.names.length}static create(e){return new wi(e)}static fromLegacy(e,...t){return new _(e,...t)}}class wi{constructor(e){this.name=e,this.names=[],this.defs={},this.isOpen=!1}addMember(e,t){if(this.defs[e])throw new Error(`Member '${e}' already exists in schema '${this.name}'`);return this.names.push(e),this.defs[e]={...t,path:t.path||e},this}setOpen(e){return this.isOpen=e,this}build(){const e=new _(this.name);for(const t of this.names)e.names.push(t),e.defs[t]=this.defs[t];return e.open=this.isOpen,Object.freeze(e.names),Object.freeze(e.defs),e}}class Si{constructor(){this._defaultSchema=null,this._definitions={}}get length(){return Object.keys(this._definitions).length}get keys(){return Object.keys(this._definitions)}at(e){const t=this.keys[e];return{key:t,value:this._definitions[t]}}get defaultSchema(){var e;return this._defaultSchema||((e=this._definitions.$schema)==null?void 0:e.value)||null}get(e){var t;return(t=this._definitions[e])==null?void 0:t.value}getV(e){let t="";if((e||{}).type===u.STRING)t=e.value;else if(typeof e=="string")t=e;else return;const n=this._definitions[t];if(!n){if(t.startsWith("$")||t.startsWith("@")){const i=typeof e=="string"?void 0:e;throw t.startsWith("$")?new A(f.schemaNotDefined,`Schema ${t} is not defined.`,i):new A(f.variableNotDefined,`Variable ${t} is not defined.`,i)}return}if(n.isVariable)return n.value;if(n.value instanceof I){const i=this.getV(n.value);if(i instanceof _)return this.set(t,i),i}return n.value}set(e,t){const n={isSchema:e.startsWith("$"),isVariable:e.startsWith("@"),value:t};this._definitions[e]=n,this._defaultSchema=null}delete(e){return e in this._definitions?(delete this._definitions[e],e==="$schema"&&(this._defaultSchema=null),!0):!1}push(e,t,n=!1,i=!1){this._definitions[e]={isSchema:n,isVariable:i,value:t},e==="$schema"&&(this._defaultSchema=t)}merge(e,t=!1){for(let n=0;n<e.length;n++){const{key:i,value:a}=e.at(n);(t||!this._definitions[i])&&this.push(i,a.value,a.isSchema,a.isVariable)}}toJSON(){var n;const e={};let t=0;for(let i=0;i<this.length;i++){const a=this.at(i);a.value.isSchema||a.value.isVariable||(t++,e[a.key]=(n=a.value.value)!=null&&n.toObject?a.value.value.toObject():a.value.value)}return t?e:null}*keyIterator(){for(const e of Object.keys(this._definitions))yield e}*entries(){for(const e of this.keyIterator())yield[e,this._definitions[e]]}*[Symbol.iterator](){yield*this.entries()}}class kt{constructor(){this._schema=null,this._definitions=new Si}get schema(){return this._schema||this._definitions.defaultSchema}set schema(e){this._schema=e}get definitions(){return this._definitions}merge(e,t=!1){t&&e.schema&&(this._schema=e.schema),e.definitions&&this._definitions.merge(e.definitions,t)}toJSON(){return this._definitions.toJSON()}}function z(r,e){let t="Assert never";throw r!=null&&(t=`Assert never: ${r.toString()}`),e&&(t+=` at ${e.toString()}`),new Error(t)}class ae{constructor(e){if(this.items=[],this.keyMap=new Map,e)for(const[t,n]of Object.entries(e))this.set(t,n)}set(e,t){if(this.keyMap.has(e)){const n=this.keyMap.get(e);this.items[n]=[e,t]}else{const n=this.items.length;this.items.push([e,t]),this.keyMap.set(e,n)}return Object.defineProperty(this,e,{value:t,writable:!0,enumerable:!0,configurable:!0}),this}push(...e){for(const t of e)if(Array.isArray(t)){const[n,i]=t;if(this.has(n))throw new Error(`Key '${n}' already exists`);const a=this.items.length;this.items.push([n,i]),this.keyMap.set(n,a)}else this.items.push([void 0,t])}get(e){const t=this.keyMap.get(e);if(t!==void 0){const n=this.items[t];return n?n[1]:void 0}}getAt(e){if(e<0||e>=this.items.length)return;const t=this.items[e];return t?t[1]:void 0}keyAt(e){if(e<0||e>=this.items.length)return;const t=this.items[e];return t?t[0]:void 0}has(e){return this.keyMap.has(e)}delete(e){const t=this.keyMap.get(e);return t!==void 0&&this.items[t]?(this.items[t]=void 0,this.keyMap.delete(e),delete this[e],!0):!1}deleteAt(e){if(e<0||e>=this.items.length)throw new Error("Index out of range");const t=this.items[e];if(t){const n=t[0];return n!==void 0&&this.keyMap.delete(n),this.items[e]=void 0,!0}return!1}setAt(e,t){if(e<0||e>=this.items.length)throw new Error("Index out of range");const n=this.items[e];return n?(this.items[e]=[n[0],t],!0):!1}indexOfKey(e){return this.keyMap.get(e)??-1}indexOf(e){return this.items.findIndex(t=>t!==void 0&&Object.is(t[1],e))}isEmpty(){return this.length===0}static fromArray(e){const t=new ae;for(const n of e)Array.isArray(n)?t.set(n[0],n[1]):t.push(n);return t}get length(){return this.items.length}clear(){for(const e of this.keysArray())delete this[e];this.items=[],this.keyMap.clear()}compact(){const e=[],t=new Map;for(const n of this.items)if(n!==void 0){e.push(n);const i=n[0];i!==void 0&&t.set(i,e.length-1)}this.items=e,this.keyMap=t}forEach(e,t){for(let n=0;n<this.items.length;n++){const i=this.items[n];i!==void 0&&e.call(t,i[1],i[0],n)}}entries(){return this._createIterator(e=>e)}keysArray(){return this.items.filter(e=>e!==void 0&&e[0]!==void 0).map(e=>e[0])}keys(){return(function*(e){for(const t of e)t!==void 0&&t[0]!==void 0&&(yield t[0])})(this.items)}values(){return(function*(e){for(const t of e)t!==void 0&&(yield t[1])})(this.items)}valuesArray(){return this.items.filter(e=>e!==void 0).map(e=>e[1])}*_createIterator(e){for(const t of this.items)t!==void 0&&(yield e(t))}[Symbol.iterator](){return this.entries()}get[Symbol.toStringTag](){return"IOObject"}find(e){let t=0;for(const n of this.items){if(n!==void 0&&e(n[1],n[0],t))return n[1];t++}}findIndex(e){let t=0;for(const n of this.items){if(n!==void 0&&e(n[1],n[0],t))return t;t++}return-1}map(e,t){const n=[];let i=0;for(const a of this.items)a!==void 0&&n.push(e.call(t,a[1],a[0],i)),i++;return n}toJSON(){const e={};return this.forEach((t,n,i)=>{typeof t>"u"||(e[n||i]=typeof t=="object"&&typeof(t==null?void 0:t.toJSON)=="function"?t.toJSON():t)}),e}}class re{constructor(e=[]){this._items=e}push(...e){return this._items.push(...e),this}getAt(e){if(e<0||e>=this._items.length)throw new Error("Index out of range");return this._items[e]}setAt(e,t){if(e<0)throw new Error("Index cannot be negative.");return e>=this._items.length?this._items.push(t):this._items[e]=t,this}deleteAt(e){if(e<0||e>=this._items.length)throw new Error("Index out of range");return this._items.splice(e,1),this}get length(){return this._items.length}get isEmpty(){return this.length===0}map(e){const t=this._items.map(e);return new re(t)}filter(e){const t=this._items.filter(e);return new re(t)}reduce(e,t){return this._items.reduce(e,t)}forEach(e){this._items.forEach(e)}some(e){return this._items.some(e)}every(e){return this._items.every(e)}find(e){return this._items.find(e)}findIndex(e){return this._items.findIndex(e)}insert(e,...t){return this._items.splice(e,0,...t),this._items.length}pop(){return this._items.pop()}toJSON(e){const t=(e==null?void 0:e.skipErrors)??!1;return this._items.filter(n=>{if(t&&typeof n=="object"&&n!==null&&typeof n.toValue=="function"){const i=n.toValue();if(i&&i.__error===!0)return!1}return!0}).map(n=>n instanceof ae?n.toJSON():typeof n=="object"&&n!==null?typeof n.toValue=="function"?n.toValue():typeof n.toJSON=="function"?n.toJSON():JSON.stringify(n):n)}getErrors(){const e=[];for(const t of this._items)t&&typeof t=="object"&&t.error instanceof Error&&e.push(t.error);return e}*[Symbol.iterator](){yield*this._items}*entries(){for(let e=0;e<this._items.length;e++)yield[e,this._items[e]]}*keys(){for(let e=0;e<this._items.length;e++)yield e}*values(){yield*this._items}}function Ti(r){return r<0n?-r:r}const $e=new Map;function ie(r){if(r<0)throw new Error("Exponent must be non-negative");return $e.has(r)||$e.set(r,10n**BigInt(r)),$e.get(r)}function Q(r,e){if(e<0)throw new Error(`Scale factor must be non-negative, got ${e}`);return e===0?r:r*ie(e)}function ne(r,e,t){if(e<0||t<0)throw new Error("Scales must be non-negative");if(e<=t)return Q(r,t-e);const n=e-t,i=ie(n),a=r/i,s=r%i,o=i/2n;return(s<0n?-s:s)>=o?a+(r>=0n?1n:-1n):a}function Xe(r,e,t){if(e<0||t<0)throw new Error("Scales must be non-negative");if(e<=t)return Q(r,t-e);const n=e-t,i=ie(n),a=r/i;return r%i!==0n&&r>0n?a+1n:a}function Qe(r,e,t){if(e<0||t<0)throw new Error("Scales must be non-negative");if(e<=t)return Q(r,t-e);const n=e-t,i=ie(n),a=r/i;return r%i!==0n&&r<0n?a-1n:a}function Y(r,e,t){if(r===0n)return e>0?`0.${"0".repeat(e)}`:"0";const n=r<0n?"-":"";let a=(r<0n?-r:r).toString();for(;a.length<=e;)a="0"+a;const s=a.slice(0,a.length-e)||"0",o=e>0?a.slice(-e):"";return n+s+(e>0?"."+o:"")}function vi(r,e,t){if(e<=0)return{valid:!1,reason:"Precision must be positive"};if(t<0)return{valid:!1,reason:"Scale must be non-negative"};if(t>e)return{valid:!1,reason:"Scale must be less than or equal to precision"};if(r===0n)return{valid:!0};const i=Ti(r).toString();return i.length>e?{valid:!1,reason:`Coefficient has ${i.length} digits, exceeding precision of ${e}`}:i.length-t<0?{valid:!0}:{valid:!0}}function Be(r,e,t,n,i,a="round"){if(r===0n)return{a:0n,b:t,targetScale:n,scaleAdjustment:0};if(t===0n)return{a:r,b:0n,targetScale:e,scaleAdjustment:0};let s=Math.max(e,n);i!==void 0&&s>i&&(s=i);const o=s-e,l=s-n;let c=r,h=t;if(o>0&&(c=Q(r,o)),l>0&&(h=Q(t,l)),i!==void 0){if(e>i)switch(a){case"round":c=ne(r,e,i);break;case"ceil":c=Xe(r,e,i);break;case"floor":c=Qe(r,e,i);break;default:throw new v(`Invalid rounding mode: ${a}`)}if(n>i)switch(a){case"round":h=ne(t,n,i);break;case"ceil":h=Xe(t,n,i);break;case"floor":h=Qe(t,n,i);break;default:throw new v(`Invalid rounding mode: ${a}`)}}return{a:c,b:h,targetScale:s,scaleAdjustment:Math.max(o,l)}}function xi(r,e,t,n){if(r<=0||t<=0)throw new v("Precision must be positive");if(e<0||n<0)throw new v("Scale must be non-negative");if(e>r||n>t)throw new v("Scale must not exceed precision");const i=Math.max(e,n),a=r-e,s=t-n;return{precision:Math.max(a,s)+i+1,scale:i}}function ki(r,e,t,n){if(r<=0||t<=0)throw new v("Precision must be positive");if(e<0||n<0)throw new v("Scale must be non-negative");if(e>r||n>t)throw new v("Scale must not exceed precision");const i=e+n;return{precision:r+t+1,scale:i}}function Ei(r,e,t,n,i=6){if(r<=0||t<=0)throw new v("Precision must be positive");if(e<0||n<0)throw new v("Scale must be non-negative");if(e>r||n>t)throw new v("Scale must not exceed precision");if(i<0)throw new v("Minimum scale must be non-negative");const a=e+t+1,s=Math.max(i,a);return{precision:r-e+n+s,scale:s}}function Ni(r,e,t=38,n){const i=n??t;if(r<=0)throw new v("Precision must be positive");if(e<0)throw new v("Scale must be non-negative");if(e>r)throw new v("Scale must not exceed precision");if(r<=t&&e<=i)return{precision:r,scale:e};let a=Math.min(r,t),s=Math.min(e,i);return s>a&&(s=Math.max(0,a-1)),s>=a&&(s=Math.max(0,a-1)),{precision:a,scale:s}}function Et(r,e,t,n,i,a){let s;switch(r){case"add":case"subtract":s=xi(e,t,n,i);break;case"multiply":s=ki(e,t,n,i);break;case"divide":s=Ei(e,t,n,i,a==null?void 0:a.divisionMinScale);break;default:throw new v(`Unsupported operation: ${r}`)}return Ni(s.precision,s.scale,a==null?void 0:a.maxPrecision,a==null?void 0:a.maxScale)}class v extends Error{constructor(e){super(e),this.name="DecimalError"}}class R{constructor(e,t,n){this.coefficient=0n,this.exponent=0,[t,n]=this.resolvePrecisionAndScale(e,t,n),this.precision=t,this.scale=n,this.validatePrecisionAndScale(t,n);let i;if(typeof e=="string")i=this.initFromString(e,t,n);else if(typeof e=="number")i=this.initFromNumber(e,t,n);else if(e instanceof R)i=this.initFromDecimal(e,t,n);else throw new v("Unsupported value type for Decimal constructor.");this.coefficient=i.coefficient,this.exponent=i.exponent}resolvePrecisionAndScale(e,t,n){if(typeof e=="number"){if(t===void 0||n===void 0)throw new v("Precision and scale must be provided for number type.");return[t,n]}if(e instanceof R)return(t===void 0||n===void 0)&&(t=e.getPrecision(),n=e.getScale()),[t,n];if(typeof e=="string"){if(t===void 0||n===void 0){const i=/^-?(\d+)(?:\.(\d+))?$/,a=e.trim().match(i);if(!a)throw new v("Invalid decimal string format.");const s=a[1],o=a[2]||"";t=s.length+o.length,n=o.length}return[t,n]}throw new v("Unsupported value type for Decimal constructor.")}validatePrecisionAndScale(e,t){const n=vi(1n,e,t);if(!n.valid)throw new v(n.reason||"Invalid precision or scale")}initFromString(e,t,n){if(!R.isValidDecimal(e))throw new v("Invalid decimal string format.");const{sign:i,integerPart:a,fractionalPart:s}=R.parseString(e);let o=a,l=s;if(s.length>n){const y=R.roundForDecimal(a+"."+s,t,n);o=y.integerPart,l=y.fractionalPart}else l=s.padEnd(n,"0");const c=o.replace(/^0+/,"")||"0",d=(c+l).replace(/^0+/,"")||"0";if(d.length>t){const y=R.roundForDecimal(c+"."+l,t,n),C=y.integerPart+y.fractionalPart;if(C.replace(/^0+/,"").length>t)throw new v(`Value '${e}' exceeds specified precision (${t}) after rounding.`);const N=BigInt(C);return{coefficient:i==="-"?-N:N,exponent:n}}const g=BigInt(d);return{coefficient:i==="-"?-g:g,exponent:n}}initFromNumber(e,t,n){return this.initFromString(e.toString(),t,n)}initFromDecimal(e,t,n){e.getPrecision();const i=e.getScale(),a=e.getCoefficient(),s=t-n,l=e.toString().split(".")[0].replace("-","").length;if(l>s)throw new v(`Cannot adjust precision: integer part needs ${l} digits, but target precision-scale only allows ${s}.`);return n>i?this.increaseScaleForDecimal(e,t,n,i,a):n<i?this.decreaseScaleForDecimal(e,t,n,i,a):this.sameScaleForDecimal(e,t,n,a)}increaseScaleForDecimal(e,t,n,i,a){const s=n-i,o=Q(a,s);if(o.toString().replace("-","").length>t)throw new v(`Value exceeds the specified precision (${t}) after scaling.`);return{coefficient:o,exponent:n}}decreaseScaleForDecimal(e,t,n,i,a){const s=ne(a,i,n);return s.toString().replace("-","").length,{coefficient:s,exponent:n}}sameScaleForDecimal(e,t,n,i){if(e.getTotalDigits()>t)throw new v(`Value exceeds the specified precision (${t}).`);return{coefficient:i,exponent:n}}static roundForDecimal(e,t,n){const[i="0",a=""]=e.split("."),s=a.length,o=BigInt((i||"0")+(a||"")),l=ne(o,s,n),c=Y(l,n),[h,d=""]=c.split(".");return{integerPart:h,fractionalPart:d}}getTotalDigits(){return this.coefficient.toString().replace("-","").length}static isValidDecimal(e){let t=e.trim();return t.endsWith("m")&&(t=t.slice(0,-1)),/^[+\-]?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(t)}static parseString(e){let t=e.trim();t.endsWith("m")&&(t=t.slice(0,-1));let n="";t.startsWith("-")?(n="-",t=t.slice(1)):t.startsWith("+")&&(t=t.slice(1));const[i,a]=t.split(/[eE]/),s=a?parseInt(a,10):0,[o,l=""]=i.split(".");let c=o||"0",h=l;if(s>0)h.length>s?(c+=h.slice(0,s),h=h.slice(s)):(c+=h.padEnd(s,"0"),h="");else if(s<0){const d=Math.abs(s);c.length>d?(h=c.slice(-d)+h,c=c.slice(0,-d)):(h=c.padStart(d,"0")+h,c="0")}return{sign:n,integerPart:c,fractionalPart:h}}static ensureDecimal(e){if(e instanceof R)return e;if(typeof e=="number")return new R(e.toString());if(typeof e=="string")return new R(e);throw new v(`Unsupported value type for Decimal conversion: ${typeof e}`)}toNumber(){const e=this.coefficient<0n?"-":"";let t=(this.coefficient<0n?-this.coefficient:this.coefficient).toString();if(this.exponent===0)return+`${e}${t}`;for(;t.length<=this.exponent;)t="0"+t;const n=t.slice(0,-this.exponent)||"0",i=t.slice(-this.exponent),a=`${e}${n}.${i}`,s=Number(a);if(!isFinite(s))throw new v("Conversion to Number results in Infinity.");return s}compareTo(e){if(this.precision!==e.precision||this.scale!==e.scale)throw new v("Decimals must have the same precision and scale for comparison.");return this.coefficient===e.coefficient?0:this.coefficient>e.coefficient?1:-1}compareStructure(e){return this.precision===e.precision&&this.scale===e.scale}equals(e){return this.compareTo(e)===0}lessThan(e){return this.compareTo(e)===-1}greaterThan(e){return this.compareTo(e)===1}lessThanOrEqual(e){return this.compareTo(e)<=0}greaterThanOrEqual(e){return this.compareTo(e)>=0}toString(){return Y(this.coefficient,this.scale)}getPrecision(){return this.precision}getScale(){return this.scale}getExponent(){return this.exponent}getCoefficient(){return this.coefficient}getFormatPattern(){const e="x".repeat(this.precision-this.scale),t="x".repeat(this.scale);return this.scale>0?`${e}.${t}`:`${e}`}convert(e,t){if(t>e)throw new v("Scale must be less than or equal to precision.");try{return new R(this,e,t)}catch(n){throw n instanceof v?n:new v(`Conversion failed: ${n instanceof Error?n.message:String(n)}`)}}round(e,t){if(t>e)throw new v("Scale must be less than or equal to precision.");if(e<1)throw new v("Precision must be at least 1.");if(t<0)throw new v("Scale must be non-negative.");const n=ne(this.coefficient,this.scale,t),i=Y(n,t);return new R(i,e,t)}ceil(e,t){if(t>e)throw new v("Scale must be less than or equal to precision.");if(e<1)throw new v("Precision must be at least 1.");if(t<0)throw new v("Scale must be non-negative.");const n=Xe(this.coefficient,this.scale,t),i=Y(n,t);return new R(i,e,t)}floor(e,t){if(t>e)throw new v("Scale must be less than or equal to precision.");if(e<1)throw new v("Precision must be at least 1.");if(t<0)throw new v("Scale must be non-negative.");const n=Qe(this.coefficient,this.scale,t),i=Y(n,t);return new R(i,e,t)}mod(e){if(!(e instanceof R))throw new v("Invalid operand");if(e.coefficient===0n)throw new v("Division by zero");const{a:t,b:n,targetScale:i}=Be(this.coefficient,this.scale,e.coefficient,e.scale),a=t/n,s=t-a*n,o=s.toString().replace("-","").length,l=Math.max(o,this.precision,e.precision),c=Y(s,i);return new R(c,l,i)}add(e){if(!(e instanceof R))throw new v("Invalid operand");const{precision:t,scale:n}=Et("add",this.precision,this.scale,e.precision,e.scale,{maxPrecision:1e4,maxScale:1e4}),{a:i,b:a}=Be(this.coefficient,this.scale,e.coefficient,e.scale,n,"round"),s=i+a,o=s.toString().replace("-","").length,l=Math.max(t,o),c=Y(s,n);return new R(c,l,n)}sub(e){if(!(e instanceof R))throw new v("Invalid operand");const{precision:t,scale:n}=Et("subtract",this.precision,this.scale,e.precision,e.scale,{maxPrecision:1e4,maxScale:1e4}),{a:i,b:a}=Be(this.coefficient,this.scale,e.coefficient,e.scale,n,"round"),s=i-a,o=s.toString().replace("-","").length,l=Math.max(t,o),c=Y(s,n);return new R(c,l,n)}mul(e){if(!(e instanceof R))throw new v("Invalid operand");const t=this.coefficient*e.coefficient,n=this.scale+e.scale,i=Math.max(this.scale,e.scale);let a=t;n>i?a=ne(t,n,i):n<i&&(a=Q(t,i-n));const s=a.toString().replace("-","").length;let o=Math.max(this.precision,e.precision,s);s>o&&(o=s);const l=Y(a,i);return new R(l,o,i)}div(e){if(!(e instanceof R))throw new v("Invalid operand");if(e.coefficient===0n)throw new v("Division by zero");const t=e.scale,n=t+e.scale-this.scale;let i;if(n>=0)i=this.coefficient*ie(n);else{const y=ie(-n);i=this.coefficient/y}const a=e.coefficient;let s=i/a,o=i%a;const l=a<0n?-a:a;if((o<0n?-o:o)*2n>=l){const y=i<0n!=a<0n;s+=y?-1n:1n}const h=Y(s,t),d=(s<0n?(-s).toString():s.toString()).length,g=Math.max(this.precision,e.precision,d);return new R(h,g,t)}}class it{constructor(e,t,n){this._data=e,this._name=t,this._schemaName=n}get name(){return this._name}get schemaName(){return this._schemaName}get data(){return this._data}toJSON(e){return this._data instanceof ae?this._data.toJSON():this._data instanceof re?this._data.toJSON(e):this._data&&typeof this._data=="object"?this._data:null}}class et{constructor(){return this._sections=[],this._sectionNames={},new Proxy(this,Ci)}get sections(){return this._sections}get length(){return this._sections.length}get(e){if(typeof e=="string"){const t=this._sectionNames[e];return t===void 0?void 0:this._sections[t]}return this._sections[e]}push(e){e.name!==void 0&&(this._sectionNames[e.name]=this._sections.length),this._sections.push(e)}*[Symbol.iterator](){for(const e of this._sections)yield e}}const Ci={get:(r,e)=>{if(e in r)return Reflect.get(r,e);if(typeof e=="string")return/^[0-9]+$/.test(e)?r.get(Number(e)):r.get(e)},set:(r,e,t)=>{throw new Error("Cannot set a value on a IOSectionCollection")}};class E extends G{constructor(e,t,n,i=!1,a){super(e,t,n,i,a),this.name="InternetObject(SyntaxError)",this.updateMessage()}}class at{constructor(e,t=[]){this.type=e,this.children=t}toValue(e){return this.children.map(t=>{if(t)return t.toValue(e)})}}class ge extends at{constructor(e=[],t,n){super("array",e),this.openBracket=t,this.closeBracket=n}toValue(e){return this.children.map(t=>t!=null&&t.toValue?t.toValue(e):t)}getStartPos(){return this.openBracket.getStartPos()}getEndPos(){return this.closeBracket.getEndPos()}}class fe{constructor(e,t){this.type="member",this.value=e,t&&(this.key=t)}toValue(e){return this.key?{[this.key.value]:this.value.toValue(e)}:this.value.toValue(e)}getStartPos(){return this.key?this.key.getStartPos():this.value.getStartPos()}getEndPos(){return this.value?this.value.getEndPos():this.key?this.key.getEndPos():{row:0,col:0,pos:0}}}class J extends at{constructor(e=[],t,n){super("object",e),t&&(this.openBracket=t),n&&(this.closeBracket=n)}toObject(e){const t={};let n=0;for(const i of this.children)i&&i.value?i.key?t[i.key.value]=i.value.toValue(e):t[n]=i.value.toValue(e):t[n]=void 0,n++;return t}getStartPos(){var e;return this.openBracket?this.openBracket.getStartPos():((e=this.children[0])==null?void 0:e.getStartPos())??{row:0,col:0,pos:0}}getEndPos(){var e;return this.closeBracket?this.closeBracket.getEndPos():((e=this.children[this.children.length-1])==null?void 0:e.getEndPos())??{row:0,col:0,pos:0}}toValue(e){const t=new ae;for(let n=0;n<this.children.length;n++){const i=this.children[n];i&&i.value&&(i.key?t.set(i.key.value,i.value.toValue(e)):t.set(n.toString(),i.value.toValue(e)))}return t}isEmpty(){return this.children.length===0||this.children.every(e=>e===void 0)}toDebugString(){return`ObjectNode { ${this.children.map((t,n)=>{if(!t)return`[${n}]: undefined`;const i=t,a=i.key?i.key.value:`[${n}]`,s=i.value?typeof i.value.toValue=="function"?JSON.stringify(i.value.toValue()):String(i.value):"undefined";return`${a}: ${s}`}).join(", ")} }`}hasKey(e){return this.children.some(t=>{if(!t)return!1;const n=t;return n.key&&n.key.value===e})}getKeys(){const e=[];return this.children.forEach((t,n)=>{if(t){const i=t;i.key?e.push(i.key.value):e.push(n.toString())}}),e}isValid(){return this.children.every(e=>{if(!e)return!0;const t=e;return!(t.value&&t.value.error!==void 0||t.key&&t.key.error!==void 0)})}}class W{static setWarnOnDuplicates(e){this.warnDuplicates=e}static register(...e){for(const t of e)for(const n of t.types){if(this.typeDefMap.has(n)){this.warnDuplicates&&!this.warnedDuplicateTypes.has(n)&&(console.warn(`TypeDef for '${n}' is already registered. Skipping.`),this.warnedDuplicateTypes.add(n));continue}this.typeDefMap.set(n,new t(n)),this.typeNames.add(n)}}static unregister(e){this.typeDefMap.has(e)&&(this.typeDefMap.delete(e),this.typeNames.delete(e))}static get types(){return Object.freeze(Array.from(this.typeNames))}static get(e){const t=this.typeDefMap.get(e);if(!t)throw new G(f.invalidType,`Type '${e}' is not registered`);return t}static isRegisteredType(e){return this.typeDefMap.has(e)}static clear(){this.typeDefMap.clear(),this.typeNames.clear(),this.warnedDuplicateTypes.clear()}static get count(){return this.typeDefMap.size}}W.typeDefMap=new Map;W.typeNames=new Set;W.warnDuplicates=!1;W.warnedDuplicateTypes=new Set;function ke(r,e,t){const n=W.get(e.type);if(!n)throw new Error(`Type ${e.type} is not registered.`);let i=r==null?void 0:r.value;return n.parse(i,e,t)}function pe(r,e,t,n){if(e instanceof I){const i=e.value;e=t==null?void 0:t.getV(i)}return e instanceof _||z("Invalid schema type"),Ai(r,e,t)}function Ai(r,e,t,n){const i=new ae;let a=!0;const s=new Set;let o=0;for(;o<e.names.length;o++){let l=r.children[o],c=e.names[o],h=e.defs[c];if(l){if(l.key){a=!1;break}s.add(c);const d=ke(l,h,t);d!==void 0&&i.set(c,d)}else if(!h.optional)throw new A(f.valueRequired,`Expecting a value for ${h.path}.`,r)}if(a)for(;o<r.children.length;o++){const l=r.children[o];if(!e.open)throw new E(f.additionalValuesNotAllowed,`Additional values are not allowed in the ${e.name}. The ${e.name} schema is not open.`,l.value);if(l.key){a=!1;break}const c=l.value.toValue(t);i.push(c)}for(;o<r.children.length;o++){let l=r.children[o];if(!l.key)throw new E(f.unexpectedPositionalMember,"Positional members must not be allowed after the keyed member is found.",l);let c=l.key.value,h=e.defs[c];if(s.has(c))throw new E(f.duplicateMember,`Member ${c} is already defined.`,l);if(!h&&!e.open)throw new E(f.unknownMember,`The ${e.name?`${e.name} `:""}schema does not define a member named '${c}'.`,l.key);!h&&e.open&&(typeof e.open=="object"&&e.open.type?h={...e.open,path:c}:h={type:"any",path:c}),s.add(c);const d=ke(l,h,t);i.set(c,d)}for(const l in e.defs){if(l==="*")continue;const c=e.defs[l];if(!s.has(l)){const h=r.children.find(d=>{var g;return((g=d.key)==null?void 0:g.value)===l});try{const d=ke(h,c,t);d!==void 0&&i.set(l,d)}catch(d){throw d instanceof A&&(d.positionRange=r),d}}}if((e.open===!0||typeof e.open=="object"&&e.open.type)&&i.isEmpty()){for(const l of r.children){if(!l)continue;const c=l;let h=c.key?c.key.value:void 0;if(!h)continue;let d;typeof e.open=="object"&&e.open.type?d={...e.open,path:h}:d={type:"any",path:h};const g=ke(c,d,t);i.set(h,g)}return i}return i}class Ae{constructor(e,t,n){this.error=e,this.position=t,this.endPosition=n}getErrorCategory(){const e=this.error.name;return e.includes("SyntaxError")?"syntax":e.includes("ValidationError")?"validation":"runtime"}toValue(e){return{__error:!0,category:this.getErrorCategory(),message:this.error.message,name:this.error.name,position:this.position,...this.endPosition&&{endPosition:this.endPosition}}}getStartPos(){return this.position}getEndPos(){return this.endPosition||this.position}}class Ri{static resolve(e,t){if(e instanceof I){const n=e.value,i=t==null?void 0:t.getV(n);if(!(i instanceof _))throw new Error(`Schema '${n}' not found or invalid`);return i}return e}static isSchemaVariable(e){return e instanceof I&&typeof e.value=="string"&&e.value.startsWith("$")}}function Ii(r,e,t,n){const i=Ri.resolve(e,t),a=new re,s=r.children.length;for(let o=0;o<s;o++){const l=r.children[o];if(l instanceof Ae)a.push(l);else try{a.push(pe(l,i,t,o))}catch(c){if(c instanceof Error){const h=new Ae(c,l.getStartPos(),l.getEndPos());n&&n.push(c),a.push(h)}else throw c}}return a}class Oe extends at{constructor(e=[]){super("collection",e)}toValue(e){const t=new re;for(const n of this.children)t.push(n==null?void 0:n.toValue(e));return t}getStartPos(){var e;return((e=this.children[0])==null?void 0:e.getStartPos())??{row:0,col:0,pos:0}}getEndPos(){var e;return((e=this.children[this.children.length-1])==null?void 0:e.getEndPos())??{row:0,col:0,pos:0}}isEmpty(){return this.children.length===0||this.children.every(e=>e===void 0)}toDebugString(){return`CollectionNode { ${this.children.map((t,n)=>{if(!t)return`[${n}]: undefined`;const i=typeof t.toValue=="function"?JSON.stringify(t.toValue()):String(t);return`[${n}]: ${i}`}).join(", ")} }`}size(){return this.children.length}hasValidItems(){return this.children.some(e=>e?e.error===void 0:!0)}getValidItems(){return this.children.filter(e=>e?e.error===void 0:!0)}isValid(){return this.children.every(e=>e?e.error===void 0:!0)}}class Re{static isValidDataNode(e){return e instanceof J||e instanceof Oe}static isValidSchema(e){return e instanceof _||e instanceof I}static validateProcessingInputs(e,t){var n,i;if(!Re.isValidDataNode(e)){const a=(n=e==null?void 0:e.constructor)==null?void 0:n.name,s=e===null?"null":e===void 0||a===void 0?"undefined":a||"unknown";throw new Error(`Invalid data node type: ${s}`)}if(!Re.isValidSchema(t)){const a=(i=t==null?void 0:t.constructor)==null?void 0:i.name,s=t===null?"null":t===void 0||a===void 0?"undefined":a||"unknown";throw new Error(`Invalid schema type: ${s}`)}return{data:e,schema:t}}}function $t(r,e,t,n){if(r===null)return null;const{data:i,schema:a}=Re.validateProcessingInputs(r,e);return i instanceof J?pe(i,a,t):Ii(i,a,t,n)}function V(r,e,t,n,i){const a=e===void 0||e instanceof I&&e.type===u.UNDEFINED,s=t instanceof I?t.value===null:e===null;if(a){if(r.default!==void 0)return{value:Oi(r.default),changed:!0};if(r.optional)return{value:void 0,changed:!0};throw new A(...Mi(r,t))}if(s){if(r.null)return{value:null,changed:!0};const o=`Null is not allowed for ${r.path}`;throw new A(f.nullNotAllowed,o,t)}if(e=typeof e=="object"&&e.toValue?e.toValue(n):e,r.choices!==void 0){let o=e instanceof I?e.value:e,l=!1;for(let c of r.choices)if(typeof c=="string"&&c[0]==="@"&&(c=n==null?void 0:n.getV(c),c=c instanceof I?c.value:c),o===c){l=!0;break}if(!l)throw new A(...Pi(r,e,t))}return{value:e,changed:!1}}function Oi(r){return typeof r=="string"?r==="N"?null:r==="T"||r==="true"?!0:r==="F"||r==="false"?!1:r:r}function Mi(r,e,t){const n=`Value is required for ${r.path}`;return[f.valueRequired,n,e]}function Pi(r,e,t){if(!r.choices)throw Error("Choices not checked during NumberDef implementation.");e=e.toValue?e.toValue():e.toObject?e.toObject():e,e=JSON.stringify(e);let n=`The value of "${r.path}" must be one of the [${r.choices.join(", ")}]. Currently it is ${e}.`;return r.choices.length===1&&(n=`The value of "${r.path}" must be '${r.choices[0]}'. Currently it is ${e}.`),[f.invalidChoice,n,t]}const Fi={type:"any",__memberdef:!0},ji=new _("any",{type:{type:"string",optional:!1,null:!1,choices:["any"]}},{default:{type:"any",optional:!0,null:!1}},{choices:{type:"array",optional:!0,null:!1}},{anyOf:{type:"array",optional:!0,null:!1,of:Fi}},{isSchema:{type:"bool",optional:!0,null:!1,default:!1}},{optional:{type:"bool",optional:!0}},{null:{type:"bool",optional:!0}});class Li{get type(){return"any"}get schema(){return ji}parse(e,t,n,i){const a=(n==null?void 0:n.getV(e))||e,{value:s,changed:o}=V(t,a,e,n);if(o)return s;const l=t.anyOf;if(!l)return t.__memberdef?sn(new fe(e),"",n):s;const c=[];for(let h=0;h<l.length;h++){const d=l[h];d.path=t.path;const g=W.get(d.type);if(!g)throw new G(f.invalidType,`Invalid type definition '${d.type}'`);try{return g.parse(e,d,n,i)}catch(y){c.push(y);continue}}if(c.length===l.length)throw new A(f.invalidValue,`None of the constraints defined for '${t.path}' matched.`,e);return a}static get types(){return["any"]}}const _i=new _("array",{type:{type:"string",optional:!1,null:!1,choices:["array"]}},{default:{type:"array",optional:!0,null:!1}},{of:{type:"any",optional:!0,null:!1,__memberdef:!0}},{len:{type:"number",optional:!0,null:!1,min:0}},{minLen:{type:"number",optional:!0,null:!1,min:0}},{maxLen:{type:"number",optional:!0,null:!1,min:0}});class Di{constructor(){this.parse=(e,t,n,i)=>$i(e,t,n)}get type(){return"array"}get schema(){return _i}static get types(){return["array"]}}function $i(r,e,t,n){var h;const i=(t==null?void 0:t.getV(r))||r,{value:a,changed:s}=V(e,i,r,t);if(s)return a;if(!(i instanceof ge))throw new A(f.notAnArray,`Expecting an array value for '${e.path}'`,r);let o,l={type:"any"};if(e.of instanceof _)o=W.get("object"),l.schema=e.of,l.path=e.path;else if((h=e.of)!=null&&h.type){if(o=W.get(e.of.type),!o)throw new A(f.invalidType,`Invalid type definition '${e.of.type}'`,r);l=e.of,l.path=e.path}else typeof e.of=="string"?z(e.of):o=W.get("any");const c=[];return i.children.forEach(d=>{if(i!==r)try{c.push(o==null?void 0:o.parse(d,l,t))}catch(g){throw g instanceof A&&(g.positionRange=r),g}else c.push(o==null?void 0:o.parse(d,l,t))}),c}var Bi=function(r,e,t,n){if(t==="a"&&!n)throw new TypeError("Private accessor was defined without a getter");if(typeof e=="function"?r!==e||!n:!e.has(r))throw new TypeError("Cannot read private member from an object whose class did not declare it");return t==="m"?n:t==="a"?n.call(r):n?n.value:e.get(r)},tt,Bt;const Wi=new _("bool",{type:{type:"string",optional:!1,null:!1,choices:["bool"]}},{default:{type:"bool",optional:!0,null:!1}},{optional:{type:"bool",optional:!0}},{null:{type:"bool",optional:!0}});class Ji{constructor(){tt.add(this)}get type(){return"bool"}get schema(){return Wi}parse(e,t,n){return Bi(this,tt,"m",Bt).call(this,e,t,n)}strinfigy(e){return e.toString()}static get types(){return["bool"]}}tt=new WeakSet,Bt=function(e,t,n){const i=(n==null?void 0:n.getV(e))||e,{value:a,changed:s}=V(t,i,e,n);if(s)return a;if(!(i instanceof I)||i.type!==u.BOOLEAN)throw new G(f.notABool,`Expecting a boolean value for '${t.path}' but found ${i.toValue()}.`,e);return i.value};const st={datetime:/^(?<dt>(?<year>\d{4})(?:\-(?<month>(?:1[0-2]|0[1-9]))(?:\-(?<date>[0-2][0-9]|3[0-1]))?)?(T(?<hour>[0-1][0-9]|2[0-3])(?:\:(?<minute>[0-5][0-9])(?:\:(?<sec>[0-5][0-9])(?:\.(?<milisecond>(?:\d{3})+))?)?)?)?(?<tz>(Z)|((?:\+|-)(?:(?:[0-1][0-9]|2[0-3])(?:\:[0-5][0-9])?)))?)$/,date:/^(?<year>\d{4})(?:\-(?<month>(?:1[0-2]|0[1-9]))(?:\-(?<date>[0-2][0-9]|3[0-1]))?)?$/,time:/^(?<hour>[0-1][0-9]|2[0-3])(?:\:(?<minute>[0-5][0-9])(?:\:(?<second>[0-5][0-9])(?:\.(?<milisecond>(?:\d{3})+))?)?)?$/},ot={datetime:/^(?<year>\d{4})(?:(?<month>(?:1[0-2]|0[1-9]))(?:(?<date>[0-2][0-9]|3[0-1]))?)?(?:(?<hour>[0-1][0-9]|2[0-3])(?:(?<minute>[0-5][0-9])(?:(?<second>[0-5][0-9])(?:(?<milisecond>(?:\d{3})+))?)?)?)?(?<tz>(Z)|((?:\+|-)(?:(?:[0-1][0-9]|2[0-3])(?:[0-5][0-9])?)))?/,date:/^(?<year>\d{4})(?:(?<month>(?:1[0-2]|0[1-9]))(?:(?<date>[0-2][0-9]|3[0-1]))?)?$/,time:/^(?<hour>[0-1][0-9]|2[0-3])(?:(?<minute>[0-5][0-9])(?:(?<second>[0-5][0-9])(?:(?<milisecond>(?:\d{3})+))?)?)?$/},zi=r=>{const t=(/[\-\:]/.test(r.substring(0,6))?st.datetime:ot.datetime).exec(r);if(!t)return null;const{year:n,month:i,date:a,hour:s,minute:o,second:l,milisecond:c,tz:h}=t.groups||{},g=`${n}-${i||"01"}-${a||"01"}T${s||"00"}:${o||"00"}:${l||"00"}.${c||"000"}${h||"Z"}`;return new Date(g)},Hi=r=>{const t=(/\-/.test(r.substring(0,5))?st.date:ot.date).exec(r);if(!t)return null;const{year:n,month:i,date:a}=t.groups||{},s=`${n}-${i||"01"}-${a||"01"}T00:00:00.000Z`;return new Date(s)},Ui=r=>{const t=(/\:/.test(r.substring(0,3))?st.time:ot.time).exec(r);if(!t)return null;const{hour:n,minute:i,second:a,milisecond:s}=t.groups||{},o=`1900-01-01T${n||"00"}:${i||"00"}:${a||"00"}.${s||"000"}Z`;return new Date(o)},Wt=(r,e=!1,t=!1)=>r===null?null:r.toISOString(),Jt=(r,e=!1)=>r===null?null:r.toISOString().split("T")[0],zt=(r,e=!1)=>r===null?null:r.toISOString().split("T")[1].split(".")[0],Nt=(r,e,t=!1)=>{if(r===null)return null;switch(e){case"datetime":return Wt(r,t);case"date":return Jt(r,t);case"time":return zt(r,t)}},Yi=(r,e,t=!1)=>{if(r===null)return"N";switch(e){case"datetime":return`dt"${Wt(r,t)}"`;case"date":return`d"${Jt(r,t)}"`;case"time":return`t"${zt(r,t)}"`}};var We=function(r,e,t,n){if(t==="a"&&!n)throw new TypeError("Private accessor was defined without a getter");if(typeof e=="function"?r!==e||!n:!e.has(r))throw new TypeError("Cannot read private member from an object whose class did not declare it");return t==="m"?n:t==="a"?n.call(r):n?n.value:e.get(r)},Gi=function(r,e,t,n,i){if(n==="m")throw new TypeError("Private method is not writable");if(n==="a"&&!i)throw new TypeError("Private accessor was defined without a setter");if(typeof e=="function"?r!==e||!i:!e.has(r))throw new TypeError("Cannot write private member to an object whose class did not declare it");return n==="a"?i.call(r,t):i?i.value=t:e.set(r,t),t},nt,me,Ht;const Ut=["datetime","date","time"],Ki=new _("datetime",{type:{type:"string",optional:!1,null:!1,choices:Ut}},{default:{type:"datetime",optional:!0,null:!1}},{choices:{type:"array",optional:!0,null:!1,of:{type:"datetime"}}},{min:{type:"datetime",optional:!0,null:!1}},{max:{type:"datetime",optional:!0,null:!1}},{optional:{type:"bool",optional:!0}},{null:{type:"bool",optional:!0}});class Vi{get type(){return We(this,me,"f")}get schema(){return Ki}constructor(e="datetime"){nt.add(this),me.set(this,void 0),Gi(this,me,e,"f")}parse(e,t,n){const i=(n==null?void 0:n.getV(e))||e,{value:a,changed:s}=V(t,i,e,n);if(s)return a;if(i.type!==u.DATETIME)throw new A(f.invalidDateTime,`Expecting a ${t.type.toUpperCase()} value for ${t.path}, currently ${i.value}, a ${i.type} value`,e);return We(this,nt,"m",Ht).call(this,a,t,e),a}strinfigy(e){return Yi(e,We(this,me,"f"))}static get types(){return Ut}}me=new WeakMap,nt=new WeakSet,Ht=function(e,t,n){const i=t.type;if(t.min){const a=t.min;if(a&&e<a)throw new A(f.outOfRange,`Expecting the value ${t.path?`for '${t.path}'`:""} to be greater than or equal to '${Nt(t.min,i)}'`,n)}if(t.max){const a=t.max;if(a&&e>a)throw new A(f.outOfRange,`Expecting the value ${t.path?`for '${t.path}'`:""} to be less than or equal to '${Nt(t.max,i)}'`,n)}};const ye=["bigint","decimal","int","uint","float","number","int8","int16","int32","uint8","uint16","uint32","uint64","float32","float64"],Yt=ye.reduce((r,e)=>(r[e]=!0,r),{});function X(r,e,t,n){throw new A(r,`The '${e}' must be within the specified range, Currently it is ${t}.`,n)}function ue(r){return r.toString().split(".")[0].replace("-","").length}const qi=new _("bigint",{type:{type:"string",optional:!1,null:!1,choices:ye}},{default:{type:"bigint",optional:!0,null:!1}},{choices:{type:"array",optional:!0,null:!1,of:{type:"bigint"}}},{min:{type:"bigint",optional:!0,null:!1}},{max:{type:"bigint",optional:!0,null:!1}},{format:{type:"string",optional:!0,null:!1,choices:["decimal","hex","octal","binary"],default:"decimal"}},{optional:{type:"bool",optional:!0}},{null:{type:"bool",optional:!0}});class Zi{constructor(){this._type="bigint"}get type(){return this._type}get schema(){return qi}parse(e,t,n){const i=(n==null?void 0:n.getV(e))||e;let{value:a,changed:s}=V(t,i,e,n);return s||(a=this.validate(t,a,e)),a}stringify(e,t){return t.format==="hex"?e.toString(16):t.format==="octal"?e.toString(8):t.format==="binary"?e.toString(2):e.toString()}validate(e,t,n){const i=typeof t=="bigint"?"bigint":Yt[typeof t]?"number":"";if(i==="")throw new A(f.invalidType,`Expecting a value of type '${e.type}' for '${e.path}'`,n);if(i!=="bigint")throw new A(`not-a-${e.type}`,`Invalid value encountered for '${e.path}'`,n);const{min:a,max:s}=e;return(a!=null&&t<a||s!=null&&t>s)&&X(f.invalidRange,e.path,t,n),t}}const Xi=new _("decimal",{type:{type:"string",optional:!1,null:!1,choices:ye}},{default:{type:"decimal",optional:!0,null:!1}},{choices:{type:"array",optional:!0,null:!1,of:{type:"decimal"}}},{precision:{type:"number",optional:!0,null:!1}},{scale:{type:"number",optional:!0,null:!1}},{min:{type:"decimal",optional:!0,null:!1}},{max:{type:"decimal",optional:!0,null:!1}},{optional:{type:"bool",optional:!0}},{null:{type:"bool",optional:!0}});class Qi{constructor(){this._type="decimal"}get type(){return this._type}get schema(){return Xi}parse(e,t,n){const i=(n==null?void 0:n.getV(e))||e;let{value:a,changed:s}=V(t,i,e,n);return s||(a=this.validate(t,a,e)),a}stringify(e,t){return e.toString()}validate(e,t,n){let{min:i,max:a,precision:s,scale:o}=e;const l=R.ensureDecimal(t),c=s!=null,h=o!=null;if(h){const d=l.getScale();d!==o&&X(f.invalidScale,e.path,`Value has scale ${d}, expected ${o}`,n)}if(c){const d=l.getPrecision();if(h){const g=ue(l),y=s-o;g>y&&X(f.invalidPrecision,e.path,`Integer part has ${g} digits, DECIMAL(${s},${o}) allows ${y}`,n)}else d>s&&X(f.invalidPrecision,e.path,`Value has precision ${d}, max allowed is ${s}`,n)}if(i!=null){const d=R.ensureDecimal(i),g=Math.max(l.getScale(),d.getScale()),y=ue(l),C=ue(d),N=Math.max(y,C)+g,S=l.convert(N,g),D=d.convert(N,g);S.compareTo(D)<0&&X(f.invalidRange,e.path,t,n)}if(a!=null){const d=R.ensureDecimal(a),g=Math.max(l.getScale(),d.getScale()),y=ue(l),C=ue(d),N=Math.max(y,C)+g,S=l.convert(N,g),D=d.convert(N,g);S.compareTo(D)>0&&X(f.invalidRange,e.path,t,n)}return l}}const ea=new _("number",{type:{type:"string",optional:!1,null:!1,choices:ye}},{default:{type:"number",optional:!0,null:!1}},{choices:{type:"array",optional:!0,null:!1,of:{type:"number"}}},{min:{type:"number",optional:!0,null:!1}},{max:{type:"number",optional:!0,null:!1}},{format:{type:"string",optional:!0,null:!1,choices:["decimal","hex","octal","binary","scientific"]}},{optional:{type:"bool",optional:!0}},{null:{type:"bool",optional:!0}});class ta{get type(){return this._type}get schema(){return this._delegateTypeDef?this._delegateTypeDef.schema:ea}constructor(e="number"){this._type=e,e==="bigint"?this._delegateTypeDef=new Zi:e==="decimal"&&(this._delegateTypeDef=new Qi)}parse(e,t,n){if(this._delegateTypeDef)return this._delegateTypeDef.parse(e,t,n);const i=(n==null?void 0:n.getV(e))||e;let{value:a,changed:s}=V(t,i,e,n);return s||(a=this.validateInteger(t,a,e)),a}stringify(e,t){return this._delegateTypeDef&&"stringify"in this._delegateTypeDef?this._delegateTypeDef.stringify(e,t):t.format==="scientific"?e.toExponential():t.format==="hex"?e.toString(16):t.format==="octal"?e.toString(8):t.format==="binary"?e.toString(2):e.toString()}validateInteger(e,t,n){const i=typeof t=="bigint"?"bigint":Yt[typeof t]?"number":"";if(i==="")throw new A(f.invalidType,`Expecting a value of type '${e.type}' for '${e.path}'`,n);if(i!=="number")throw new A(`not-a-${e.type}`,`Invalid value encountered for '${e.path}'`,n);const{min:a,max:s}=this.getTypeBounds(this._type),o=e.min!==void 0&&e.min!==null?e.min:a,l=e.max!==void 0&&e.max!==null?e.max:s;return(o!==null&&t<o||l!==null&&t>l)&&X(f.invalidRange,e.path,t,n),t}getTypeBounds(e){switch(e){case"uint":return{min:0,max:null};case"int8":return{min:-128,max:2**7-1};case"uint8":return{min:0,max:2**8-1};case"int16":return{min:-32768,max:2**15-1};case"uint16":return{min:0,max:2**16-1};case"int32":return{min:-2147483648,max:2**31-1};case"uint32":return{min:0,max:2**32-1};case"uint64":case"int64":case"float32":case"float64":throw new G(f.unsupportedNumberType,`The number type '${e}' is not supported.`);default:return{min:null,max:null}}}static get types(){return ye}}const na=new _("object",{type:{type:"string",optional:!1,null:!1,choices:["object"]}},{default:{type:"object",optional:!0,null:!1}},{schema:{type:"object",optional:!0,null:!1,__schema:!0}},{optional:{type:"bool",optional:!0}},{null:{type:"bool",optional:!0}});class ra{constructor(){this._names=null,this.parse=(e,t,n)=>this._process(e,t,n),this._process=(e,t,n)=>{const i=(n==null?void 0:n.getV(e))||e,{value:a,changed:s}=V(t,i,e,n);if(s)return a;let o=t.schema;if(!(i instanceof J))throw new A(f.invalidObject,`Expecting an object value for '${t.path}'`,e);if(i===e)return t.__schema?lt(t.path||"",i,n):(o||(o=new _(t.path||""),o.open=!0),pe(i,o,n));try{return pe(i,o,n)}catch(l){throw l instanceof A&&(l.positionRange=e),l}return pe(i,o,n)}}get type(){return"object"}static get types(){return["object"]}get schema(){return na}}const Gt=/(?<structural>[\{\}\[\]\:\,\#\"\'\\\\~])/gm,Kt=/(?<escape>[\n\r\t])/gm,Vt=/(?<newlines>(\r\n?)|\n)/gm,qt=(r,e)=>(r=r.replace(Gt,"\\$1"),e&&(r=r.replace(Vt,"\\n")),r),Zt=(r,e,t='"')=>(r=r.replace(Kt,"\\$1"),e&&(r=r.replace(Vt,"\\n")),`${t}${r.replace(t,`\\${t}`)}${t}`),Xt=(r,e='"')=>`r${e}${r.replace(e,e+e)}${e}`,ia=(r,e,t='"')=>Gt.test(r)?qt(r,e):Kt.test(r)?Xt(r,t):Zt(r,e,t),Qt=["string","url","email"],aa=/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,sa=/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,oa=new _("string",{type:{type:"string",optional:!1,null:!1,choices:Qt}},{default:{type:"string",optional:!0,null:!1}},{choices:{type:"array",optional:!0,null:!1,of:{type:"string"}}},{pattern:{type:"string",optional:!0,null:!1}},{flags:{type:"string",optional:!0,null:!1}},{len:{type:"number",optional:!0,null:!1,min:0}},{minLen:{type:"number",optional:!0,null:!1,min:0}},{maxLen:{type:"number",optional:!0,null:!1,min:0}},{format:{type:"string",optional:!0,null:!1,choices:["auto","open","regular","raw"],default:"auto"}},{escapeLines:{type:"bool",optional:!0,null:!1,default:!1}},{encloser:{type:"string",optional:!0,null:!1,choices:['"',"'"],default:'"'}},{optional:{type:"bool",optional:!0}},{null:{type:"bool",optional:!0}});class la{constructor(e="string"){this._type=e}get type(){return this._type}static get types(){return Qt}get schema(){return oa}parse(e,t,n){return ca(e,t,n)}stringify(e,t){switch(t.format||"auto"){case"auto":return ia(e,t.escapeLines,t.encloser);case"open":return qt(e,t.escapeLines);case"regular":return Zt(e,t.escapeLines,t.encloser);default:return Xt(e,t.encloser)}}}function ca(r,e,t){const n=(t==null?void 0:t.getV(r))||r,{value:i,changed:a}=V(e,n,r,t);if(a)return i;if(!(n instanceof I)||n.type!==u.STRING)throw new A(f.notAString,`Expecting a string value for '${e.path}' but found ${n.toValue()}.`,r);ha(e,i,r);const s=e.len;if(s!==void 0&&typeof s=="number"&&i.length!==s)throw new A(f.invalidLength,`Invalid length for ${e.path}.`,n);const o=e.maxLen;if(o!==void 0&&typeof o=="number"&&i.length>o)throw new A(f.invalidMaxLength,`Invalid maxLength for ${e.path}.`,n);const l=e.minLen;if(l!==void 0&&typeof l=="number"&&i.length<l)throw new A(f.invalidMinLength,`Invalid minLen for ${e.path}.`,n);return i}function ha(r,e,t){const n=r.type;if(n==="string"&&r.pattern!==void 0){let i=r.re;if(!i){let a=r.pattern,s=r.flags;try{s?i=r.re=new RegExp(a,s):i=r.re=new RegExp(a),r.re=i}catch{throw new A(f.invalidPattern,e,t)}}if(!i.test(e))throw new A(f.invalidPattern,`The value '${e}' does not match the pattern '${r.pattern}'.`,t)}else if(n==="email"){if(!aa.test(e))throw new A(f.invalidEmail,`Invalid email address: ${e}`,t)}else if(n==="url"&&!sa.test(e))throw new A(f.invalidUrl,`Invalid URL: ${e}`,t)}let Ct=!1;function ua(){Ct||(W.register(Li,Di,Ji,ta,ra,la,Vi),Ct=!0)}function te(r,e){const t=(e==null?void 0:e.allowNameless)===!0;if(!r||typeof r!="object")throw new E(f.invalidMemberDef,"Invalid member definition input provided.");const{name:n,type:i}=r;if(!i||typeof i!="string")throw new E(f.invalidType,"MemberDef.type must be a non-empty string.");if(!t&&(!n||typeof n!="string"||n.trim()===""))throw new E(f.invalidMemberDef,"MemberDef must have a valid name.");if(i==="array"&&(!("of"in r)||typeof r.of!="object"||!r.of))throw new E(f.invalidDefinition,"Array MemberDef must include an 'of' definition.");const a={...r};return"optional"in a&&a.optional!==void 0&&(a.optional=!!a.optional),"null"in a&&a.null!==void 0&&(a.null=!!a.null),a}function da(r,e="*"){if(r instanceof I){if(typeof r.value=="string"){if(W.isRegisteredType(r.value))return{type:r.value,path:e};if(r.value==="*")return{type:"any",path:e}}return{type:"any",path:e}}if(r instanceof J){if(r.children.length===0)return{type:"object",path:e,open:!0};const t=r.children[0];if(t&&!t.key&&t.value instanceof I){const n=t.value;if(typeof n.value=="string"&&W.isRegisteredType(n.value)){const i={type:n.value,path:e};for(let a=1;a<r.children.length;a++){const s=r.children[a];s&&s.key&&s.value instanceof I&&(i[s.key.value]=s.value.value)}return i}}return{type:"object",path:e}}if(r instanceof ge){if(r.children.length===0)return{type:"array",path:e,of:{type:"any"}};const t=r.children[0];return t instanceof I&&typeof t.value=="string"?{type:"array",path:e,of:{type:t.value}}:{type:"array",path:e}}return typeof r=="object"&&r.type?{...r,path:e}:{type:"any",path:e}}function en(r){if(r||z("Key node must not be null in schema definition."),r instanceof I){if(r.type===u.STRING)return r}else if(r instanceof M&&r.type===u.STRING)return new I(r);throw new E(f.invalidKey,"The key must be a string.",r)}ua();function lt(r,e,t){if(e instanceof I&&e.type===u.STRING&&e.value.startsWith("$"))return e;if(!(e instanceof J))throw new E(f.invalidSchema,"Schema must be an object.",e);const n=new _(r);return rn(e,n,"",t),n}function tn(r,e,t){if(r.children.length===0){const s=new _(e);return s.open=!0,{type:"object",path:e,schema:s}}const n=r.children[0];if(!n.key&&n.value instanceof I){const s=n.value;if(s.type===u.STRING){if(W.isRegisteredType(s.value))return At(s.value,r);if(typeof s.value=="string"&&s.value.startsWith("$"))return{type:"object",schema:s,path:e}}}let i="",a=null;for(let s=0;s<r.children.length;s++){const o=r.children[s];if(o instanceof fe&&o.key&&o.key.value==="type"&&o.value instanceof I&&o.value.type===u.STRING){i=o.value.value,a=o.value;break}}if(i!==""){if(typeof i=="string"&&i.startsWith("$"))return{type:"object",schema:a,path:e};if(W.isRegisteredType(i))return At(i,r);throw new E(f.invalidType,`The specified value '${i}' is not a valid type.`,a)}return{type:"object",schema:rn(r,new _(e),e,t),path:e}}function nn(r,e,t){if(r.children.length>1)throw new E(f.invalidSchema,"The array definition must have only one child.",r.children[1]);if(r.children.length===0)return te({type:"array",of:{type:"any",path:e,null:!0},path:e},{allowNameless:!0});const n=r.children[0];if(n instanceof I){if(n.type===u.STRING){const i=n.value;if(W.isRegisteredType(i))return te({type:"array",of:{type:n.value,path:e},path:e},{allowNameless:!0});if(t&&i.startsWith("$"))return te({type:"array",of:{type:"object",schema:n,path:e},path:e},{allowNameless:!0})}throw new E(f.invalidType,`The specified value (${n.value}) is not a valid type`,n)}if(n instanceof J)return te({type:"array",of:tn(n,e,t),path:e},{allowNameless:!0});if(n instanceof ge)return te({type:"array",of:nn(n,e,t),path:e},{allowNameless:!0});throw new E(f.invalidSchema,"The array of type definition must be a string or object.",n)}function rn(r,e,t,n){for(let i=0;i<r.children.length;i++){const a=r.children[i];a===null&&z("Child value must not be null in schema definition.");const s=a;if(s.value instanceof I&&s.value.type===u.UNDEFINED)throw new E(f.emptyMemberDef,"The next member definition is empty.",s.value);if(s.key&&s.key.value==="*"){if(s.value){const o=da(s.value,"*");e.defs["*"]=o,e.open=o}else e.open=!0;if(i!==r.children.length-1)throw new E(f.invalidSchema,"The * is only allowed at the last position.",s.value);continue}if(s.key){const o=sn(s,t,n);Rt(o,e,t)}else{if(s.value instanceof I&&s.value.type===u.STRING&&s.value.value==="*"){if(i!==r.children.length-1)throw new E(f.invalidSchema,"The * is only allowed at the last position.",s.value);e.open=!0;continue}const l=en(s.value),c=an(l),h=te({...c,type:"any"});Rt(h,e,t)}}return e.names.length===0&&(e.open=!0),e}function At(r,e){const t=W.get(r),n=$t(e,t.schema);return n==null?void 0:n.toJSON()}function Rt(r,e,t){if(e.defs[r.name])throw new E(f.duplicateMember,`Member ${r.name} is already defined in schema ${e.name}.`,e.defs[r.name]);r.path=rt(t,r.name),e.names.push(r.name),e.defs[r.name]=r}const an=r=>{if(r||z("Key node must not be null in schema definition."),!(r instanceof M))throw new E(f.invalidKey,"The key must be a string.",r);const e=r.value,t=/\?$/,n=/\*$/,i=/(\?\*)|(\*\?)$/;if(r.type!==u.STRING)throw new E(f.invalidKey,"The key must be a string.",r);return e.match(i)?{name:e.substring(0,e.length-2),optional:!0,null:!0}:e.match(n)?{name:e.substring(0,e.length-1),optional:!1,null:!0}:e.match(t)!==null?{name:e.substring(0,e.length-1),optional:!0,null:!1}:{name:e,optional:!1,null:!1}};function sn(r,e,t){const n=r.value;let i={name:""};if(r.key&&(i=an(en(r.key))),n instanceof I&&n.type===u.STRING){const a=n.value;if(a.startsWith("$"))return{...i,type:"object",schema:n};if(W.isRegisteredType(a)===!1)throw new E(f.invalidType,`The specified value '${a}' is not a valid type.`,n);return{...i,type:a}}if(n instanceof J){const a=tn(n,rt(e,i.name));return{...i,...a}}if(n instanceof ge){const a=nn(n,rt(e,i.name),t);return{...i,...a}}throw new E(f.invalidType,`Found '${n.toValue()}' but expecting a data type definition.`,n)}function rt(r,e){return r===""?e:`${r}.${e}`}function ma(r,e){return{getStartPos:()=>r.getStartPos(),getEndPos:()=>e.getEndPos()}}function It(r,e){return{getStartPos:()=>r.getStartPos(),getEndPos:()=>e}}function Ot(r,e,t){return{pos:r,row:e,col:t}}var F;(function(r){r.CURLY_OPEN="{",r.CURLY_CLOSE="}",r.BRACKET_OPEN="[",r.BRACKET_CLOSE="]",r.COLON=":",r.COMMA=",",r.HASH="#",r.DOUBLE_QUOTE='"',r.SINGLE_QUOTE="'",r.BACKSLASH="\\",r.TILDE="~",r.PLUS="+",r.MINUS="-",r.DOLLAR="$",r.DOT="."})(F||(F={}));const Mt=r=>[F.CURLY_OPEN,F.CURLY_CLOSE,F.BRACKET_OPEN,F.BRACKET_CLOSE,F.COLON,F.COMMA,F.TILDE,F.DOUBLE_QUOTE,F.SINGLE_QUOTE].includes(r),fa=r=>/[0-9]/.test(r),pa=new Set([5760,8232,8233,8239,8287,12288,65279]),de=(r,e=!1)=>{if(e)return r===" "||r==="	";const t=r.codePointAt(0)||0;return t<=32?!0:t<=255?t===160:t>65279?!1:t>=8192&&t<=8202?!0:pa.has(t)},ga=r=>![F.CURLY_OPEN,F.CURLY_CLOSE,F.BRACKET_OPEN,F.BRACKET_CLOSE,F.COLON,F.COMMA,F.HASH,F.DOUBLE_QUOTE,F.SINGLE_QUOTE,F.TILDE].includes(r);var U;(function(r){r.NULL="null",r.N="N",r.TRUE="true",r.T="T",r.FALSE="false",r.F="F",r.Inf="Inf",r.PositiveInf="+Inf",r.NegativeInf="-Inf",r.NaN="NaN"})(U||(U={}));const K={hex4:/^[0-9a-fA-F]{4}$/,hex2:/^[0-9a-fA-F]{2}$/,floatDigit:/^[0-9.]+$/,intDigit:/^[0-9]+$/,hex:/^[0-9a-fA-F]+$/,octal:/^[0-7]+$/,binary:/^[01]+$/,sectionSchemaName:/^(?:(?:(?<name>[\p{L}\p{M}\p{N}\-_]+)(?<sep>[ \t]*:[ \t]*)?)(?<schema>\$[\p{L}\p{M}\p{N}\-_]+)?|(?<schema2>\$[\p{L}\p{M}\p{N}\-_]+))/u,annotatedStrStart:/^(?<name>[a-zA-Z]{1,4})(?<quote>['"])/,base64:/^[A-Za-z0-9+/]*={0,2}$/},O={NEWLINE:10,DOUBLE_QUOTE:34,SINGLE_QUOTE:39,HASH:35,PLUS:43,MINUS:45,DOT:46,ZERO:48,NINE:57,COLON:58,COMMA:44,CURLY_OPEN:123,CURLY_CLOSE:125,BRACKET_OPEN:91,BRACKET_CLOSE:93,TILDE:126},ya=r=>r>=O.ZERO&&r<=O.NINE,ba=new Set([5760,8232,8233,8239,8287,12288,65279]),wa=r=>r<=32?!0:r<=255?r===160:r>65279?!1:r>=8192&&r<=8202?!0:ba.has(r),Sa=K.hex4,Ta=K.hex2,va=K.floatDigit,Je=K.intDigit,xa=K.hex,ka=K.octal,Ea=K.binary,Na=["x","X","o","O","b","B"],Ca=K.sectionSchemaName,Aa=Na,Ra=K.annotatedStrStart;class Ia{constructor(e){this.pos=0,this.input="",this.row=1,this.col=1,this.reachedEnd=!1,this.inputLength=0,this.input=e,this.inputLength=e.length}isSpecialSymbolFast(e){return e===O.CURLY_OPEN||e===O.CURLY_CLOSE||e===O.BRACKET_OPEN||e===O.BRACKET_CLOSE||e===O.COMMA||e===O.COLON||e===O.TILDE}getSymbolTokenTypeFast(e){switch(e){case O.CURLY_OPEN:return u.CURLY_OPEN;case O.CURLY_CLOSE:return u.CURLY_CLOSE;case O.BRACKET_OPEN:return u.BRACKET_OPEN;case O.BRACKET_CLOSE:return u.BRACKET_CLOSE;case O.COMMA:return u.COMMA;case O.COLON:return u.COLON;case O.TILDE:return u.COLLECTION_START;default:return u.UNKNOWN}}createErrorToken(e,t,n,i,a){return M.init(t,n,i,a,{__error:!0,message:e.message,originalError:e},u.ERROR)}skipToNextTokenBoundary(){for(;!this.reachedEnd&&!de(this.input[this.pos])&&!Mt(this.input[this.pos])&&this.input[this.pos]!==","&&this.input[this.pos]!==`
`;)this.advance()}advance(e=1){if(!this.reachedEnd){if(e===1){this.input.charCodeAt(this.pos)===O.NEWLINE?(this.row++,this.col=1):this.col++,this.pos++,this.pos>=this.inputLength&&(this.reachedEnd=!0);return}for(let t=0;t<e;t++)if(this.input.charCodeAt(this.pos)===O.NEWLINE?(this.row++,this.col=1):this.col++,this.pos++,this.pos>=this.inputLength){this.reachedEnd=!0;break}}}parseSingleLineComment(){for(;!this.reachedEnd&&this.input[this.pos]!==`
`;)this.advance()}parseRegularString(e){const t=this.pos,n=this.row,i=this.col;this.advance();let a="",s=!1;for(;!this.reachedEnd&&this.input[this.pos]!==e;){if(de(this.input[this.pos])){a+=this.skipWhitespaces();continue}if(this.input[this.pos]===F.BACKSLASH)try{({value:a,needToNormalize:s}=this.escapeString(a,s))}catch{if(!this.reachedEnd){const c=this.input[this.pos];if(a+=c,c==="u"){this.advance();for(let h=0;h<4&&!this.reachedEnd;h++)a+=this.input[this.pos],this.advance();continue}else if(c==="x"){this.advance();for(let h=0;h<2&&!this.reachedEnd;h++)a+=this.input[this.pos],this.advance();continue}else this.advance()}continue}else a+=this.input[this.pos],this.advance()}if(this.reachedEnd){const l=this.input.substring(t,this.pos),c=M.init(t,n,i,'"','"',"STRING"),h=Ot(this.pos,this.row,this.col),d=new E(f.stringNotClosed,`Unterminated string literal. Expected closing quote '"' before end of input.`,It(c,h),!0);return this.createErrorToken(d,t,n,i,l)}this.advance();const o=this.input.substring(t,this.pos);return s&&(a=a.normalize("NFC")),M.init(t,n,i,o,a,"STRING","REGULAR_STRING")}escapeString(e,t){if(this.advance(),this.reachedEnd)throw new E(f.invalidEscapeSequence,"Invalid escape sequence at end of input. Expected escape character after backslash.",this.currentPosition,!0);switch(this.input[this.pos]){case"b":e+="\b";break;case"f":e+="\f";break;case"n":e+=`
`;break;case"r":e+="\r";break;case"t":e+="	";break;case"u":const n=this.input.substring(this.pos+1,this.pos+5);if(Sa.test(n))e+=String.fromCharCode(parseInt(n,16)),this.advance(4),t=!0;else throw new E(f.invalidEscapeSequence,`Invalid Unicode escape sequence '\\u${n}'. Expected 4 hexadecimal digits (0-9, A-F).`,this.currentPosition);break;case"x":const i=this.input.substring(this.pos+1,this.pos+3);if(Ta.test(i))e+=String.fromCharCode(parseInt(i,16)),this.advance(2),t=!0;else throw new E(f.invalidEscapeSequence,`Invalid hexadecimal escape sequence '\\x${i}'. Expected 2 hexadecimal digits (0-9, A-F).`,this.currentPosition);break;default:e+=this.input[this.pos],this.advance();break}return{value:e,needToNormalize:t}}get currentPosition(){const e=()=>({pos:this.pos,row:this.row,col:this.col});return{getStartPos:e,getEndPos:e}}checkIfAnotatedString(){const e=Ra.exec(this.input.substring(this.pos,this.pos+5));return e?e.groups:null}parseAnotatedString(e){const t=this.pos,n=this.row,i=this.col;for(let l=0;l<e.name.length;l++)this.advance();if(this.reachedEnd){const l=this.input.substring(t,this.pos),c=M.init(t,n,i,e.name+e.quote,e.name,"STRING"),h=Ot(this.pos,this.row,this.col),d=new E(f.stringNotClosed,`Unterminated annotated string literal. Expected closing quote '${e.quote}' before end of input.`,It(c,h),!0);return this.createErrorToken(d,t,n,i,l)}for(this.advance();!this.reachedEnd&&this.input[this.pos]!==e.quote;)this.advance();const a=this.input.substring(t,this.pos);let s;if(this.reachedEnd)s=a.substring(e.name.length+1);else{this.advance();const l=this.input.substring(t,this.pos);s=l.substring(e.name.length+1,l.length-1)}const o=new M;return o.pos=t,o.row=n,o.col=i,o.token=this.reachedEnd?a:this.input.substring(t,this.pos),o.value=s,o}parseRawString(e){const t=this.parseAnotatedString(e);return t.type===u.ERROR||(t.type=u.STRING,t.subType="RAW_STRING"),t}parseByteString(e){const t=this.parseAnotatedString(e);if(t.type===u.ERROR)return t;try{if(!K.base64.test(t.value))throw new Error("Invalid base64 format");return t.type=u.BINARY,t.subType="BINARY_STRING",t.value=Buffer.from(t.value,"base64"),t}catch(n){return this.createErrorToken(n,t.pos,t.row,t.col,t.token)}}parseDateTime(e){const t=this.parseAnotatedString(e);if(t.type===u.ERROR)return t;try{let n=a=>null;switch(e.name){case"dt":n=zi,t.subType=u.DATETIME;break;case"d":n=Hi,t.subType=u.DATE;break;case"t":n=Ui,t.subType=u.TIME;break;default:z(e)}const i=n(t.value);if(!i){const a=new E(f.invalidDateTime,`Invalid ${e.name==="dt"?"datetime":e.name==="d"?"date":"time"} format '${t.value}'. Expected valid ISO 8601 format.`,t);return this.createErrorToken(a,t.pos,t.row,t.col,t.token)}return t.value=i,t.type=u.DATETIME,t}catch(n){return this.createErrorToken(n,t.pos,t.row,t.col,t.token)}}parseNumber(){const e=this.pos,t=this.row,n=this.col;let i="",a=10,s=!1,o=!1,l="",c;if(this.input[this.pos]==="+"||this.input[this.pos]==="-"){const g=this.input[this.pos];if(this.input.startsWith("Inf",this.pos+1)){const y=g+"Inf";return this.advance(4),M.init(e,t,n,y,g==="+"?1/0:-1/0,u.NUMBER)}if(fa(this.input[this.pos+1])||this.input[this.pos+1]===".")i+=g,this.advance();else return null}else if(this.input.startsWith("Inf",this.pos))return this.advance(3),M.init(e,t,n,"Inf",1/0,u.NUMBER);if(this.input[this.pos]==="."&&!va.test(this.input[this.pos+1]))return null;if(this.input[this.pos]==="0"&&Aa.includes(this.input[this.pos+1]))switch(this.input[this.pos+1]){case"X":case"x":for(a=16,c="HEX",l=this.input[this.pos]+this.input[this.pos+1],this.advance(2);xa.test(this.input[this.pos]);)i+=this.input[this.pos],this.advance();break;case"O":case"o":for(a=8,c="OCTAL",l=this.input[this.pos]+this.input[this.pos+1],this.advance(2);ka.test(this.input[this.pos]);)i+=this.input[this.pos],this.advance();break;case"B":case"b":for(a=2,c="BINARY",l=this.input[this.pos]+this.input[this.pos+1],this.advance(2);Ea.test(this.input[this.pos]);)i+=this.input[this.pos],this.advance();break;default:z(this.input[this.pos+1])}else{for(;Je.test(this.input[this.pos]);)i+=this.input[this.pos],this.advance();if(this.input[this.pos]===".")for(s=!0,i+=".",this.advance();Je.test(this.input[this.pos]);)i+=this.input[this.pos],this.advance();if(this.input[this.pos]==="e"||this.input[this.pos]==="E")for(o=!0,i+=this.input[this.pos],this.advance(),(this.input[this.pos]==="+"||this.input[this.pos]==="-")&&(i+=this.input[this.pos],this.advance());Je.test(this.input[this.pos]);)i+=this.input[this.pos],this.advance()}let h=u.NUMBER,d;return this.input[this.pos]==="n"?(h=u.BIGINT,d=BigInt(l+i),i+="n",this.advance()):this.input[this.pos]==="m"?(h=u.DECIMAL,d=new R(i),i+="f",this.advance()):a===10&&(s||o)?d=parseFloat(i):(d=parseInt(i,a),isNaN(d)&&z("Expected a number but got NaN",this.currentPosition.getStartPos())),M.init(e,t,n,l+i,d,h,c)}parseLiteralOrOpenString(){const e=this.pos,t=this.row,n=this.col;let i="",a=!1;for(;!this.reachedEnd&&ga(this.input[this.pos]);){let s=this.input[this.pos];if(de(s)){i+=this.skipWhitespaces();continue}if(s===F.MINUS&&this.input.substring(this.pos,this.pos+3)==="---")break;if(s===F.BACKSLASH)try{({value:i,needToNormalize:a}=this.escapeString(i,a));continue}catch{if(i+="\\",!this.reachedEnd){const l=this.input[this.pos];if(i+=l,l==="u"){this.advance();for(let c=0;c<4&&!this.reachedEnd;c++)i+=this.input[this.pos],this.advance();continue}else if(l==="x"){this.advance();for(let c=0;c<2&&!this.reachedEnd;c++)i+=this.input[this.pos],this.advance();continue}else this.advance()}continue}else i+=s,this.advance()}if(i=i.trimEnd(),a&&(i=i.normalize("NFC")),i==="")return null;switch(i){case U.TRUE:case U.T:return M.init(e,t,n,i,!0,u.BOOLEAN);case U.FALSE:case U.F:return M.init(e,t,n,i,!1,u.BOOLEAN);case U.NULL:case U.N:return M.init(e,t,n,i,null,u.NULL);case U.Inf:case U.NaN:return M.init(e,t,n,i,i===U.Inf?1/0:NaN,u.NUMBER);default:return M.init(e,t,n,i,i,u.STRING,"OPEN_STRING")}}mergeTokens(e,t){const n=new M;return n.pos=e.pos,n.row=e.row,n.col=e.col,n.token=e.token+t.token,n.value=e.token+t.value.toString(),n.type=t.type,n.subType=t.subType,n}skipWhitespaces(e=!1){const t=this.pos;for(;!this.reachedEnd&&de(this.input[this.pos],e);)this.input[this.pos]==="\r"?(this.input[this.pos+1]===`
`&&this.advance(),this.advance()):this.advance();if(t===this.pos)return"";let n=this.input.substring(t,this.pos);return n.includes("\r")&&(n=n.replace(/\r\n/g,`
`).replace(/\r/g,`
`)),n}tokenize(){const e=Math.max(10,Math.floor(this.inputLength/8)),t=new Array(e);let n=0;for(;this.pos<this.inputLength;){const i=this.input.charCodeAt(this.pos);if(wa(i)){this.advance();continue}else if(i===O.HASH)this.parseSingleLineComment();else if(i===O.DOUBLE_QUOTE||i===O.SINGLE_QUOTE)t[n++]=this.parseRegularString(this.input[this.pos]);else if(this.isSpecialSymbolFast(i)){const a=this.row,s=this.col,o=this.input[this.pos];t[n++]=M.init(this.pos,a,s,o,o,this.getSymbolTokenTypeFast(i)),this.advance()}else if(i===O.PLUS||i===O.MINUS||i===O.DOT||ya(i)){if(i===O.MINUS&&this.input.substring(this.pos,this.pos+3)==="---"){n=this.parseSectionSeparator(t,n);continue}const a=this.parseNumber();if(a){const s=this.skipWhitespaces();if(this.reachedEnd)t[n++]=a;else if(!Mt(this.input[this.pos])&&!de(this.input[this.pos])){const o=this.parseLiteralOrOpenString();o?(o.type=u.STRING,o.subType="OPEN_STRING",s.length>0&&(o.token=s+o.token,o.value=s+o.value),t[n++]=this.mergeTokens(a,o)):t[n++]=a}else t[n++]=a}else{const s=this.parseLiteralOrOpenString();s&&(t[n++]=s)}}else{const a=this.checkIfAnotatedString();if(a)switch(a.name){case"r":t[n++]=this.parseRawString(a);break;case"b":t[n++]=this.parseByteString(a);break;case"d":case"dt":case"t":t[n++]=this.parseDateTime(a);break;default:const s=new E(f.unsupportedAnnotation,`Unsupported annotation '${a.name}'. Supported annotations are: 'r' (raw string), 'b' (binary), 'dt' (datetime), 'd' (date), 't' (time).`,this.currentPosition),o=this.input.substring(this.pos,this.pos+a.name.length+1);t[n++]=this.createErrorToken(s,this.pos,this.row,this.col,o),this.skipToNextTokenBoundary()}else{const s=this.parseLiteralOrOpenString();s&&(t[n++]=s)}}}return t.length=n,t}parseSectionSeparator(e,t){var i;e[t++]=M.init(this.pos,this.row,this.col,"---","---",u.SECTION_SEP),this.advance(3),this.skipWhitespaces(!0);const n=Ca.exec(this.input.substring(this.pos));if(n){let a,s,o=(i=n.groups)==null?void 0:i.sep,l;if(n.groups&&(a=n.groups.schema,s=n.groups.name,l=n.groups.schema2),l)e[t++]=M.init(this.pos,this.row,this.col,l,l,u.STRING,u.SECTION_SCHEMA),this.advance(l.length),this.skipWhitespaces(!0);else if(s&&(e[t++]=M.init(this.pos,this.row,this.col,s,s,u.STRING,u.SECTION_NAME),this.advance(s.length),this.skipWhitespaces(!0),o)){if(this.advance(o.length),this.skipWhitespaces(!0),!a){const c=new E(f.schemaMissing,"Missing schema definition after section separator. Expected schema name starting with '$' (e.g., '$mySchema').",this.currentPosition);return e[t++]=this.createErrorToken(c,this.pos,this.row,this.col,""),t}e[t++]=M.init(this.pos,this.row,this.col,a,a,u.STRING,u.SECTION_SCHEMA),this.advance(a.length),this.skipWhitespaces(!0)}}return t}}class Oa{constructor(e,t=[],n=[]){this.header=null,this.children=[],this.errors=[],this.header=e,this.children=t,this.errors=n}get firstChild(){return this.children.length>0?this.children[0]:null}getErrors(){return this.errors}toValue(e){var i;const t=((i=this.header)==null?void 0:i.toValue(e))??null,n=new et;for(let a=0;a<this.children.length;a++)n.push(this.children[a].toValue(e));return new Ge(t,n)}getStartPos(){return this.header?this.header.getStartPos():this.children.length>0?this.children[0].getStartPos():{row:0,col:0,pos:0}}getEndPos(){return this.children.length>0?this.children[this.children.length-1].getEndPos():this.header?this.header.getEndPos():{row:0,col:0,pos:0}}}class Ma{constructor(e,t,n){this.type="section",this.child=e,this.nameNode=t,this.schemaNode=n}get name(){var e,t;return((e=this.nameNode)==null?void 0:e.value)||((t=this.schemaNode)==null?void 0:t.value.toString().substring(1))||"unnamed"}get schemaName(){var e;return((e=this.schemaNode)==null?void 0:e.value)||"$schema"}get firstChild(){return this.child}get firstChildObject(){return this.child instanceof J?this.child:this.child instanceof Oe&&this.child.children.length>0?this.child.children[0]:null}getStartPos(){var e;return((e=this.child)==null?void 0:e.getStartPos())??{row:0,col:0,pos:0}}getEndPos(){var e;return((e=this.child)==null?void 0:e.getEndPos())??{row:0,col:0,pos:0}}toValue(e){let t=null;return this.child&&(t=this.child.toValue(e)),new it(t,this.name,this.schemaName)}}class B{constructor(e){this.sectionNames={},this.errors=[],this.tokens=e,this.current=0}parse(){return this.processDocument()}createUnclosedConstructError(e,t,n,i){let a=null,s=this.current-1;for(;s>=0;){const o=this.tokens[s];if(o&&o.type!==u.COLLECTION_START&&o.type!==u.SECTION_SEP){a=o;break}s--}if(n&&a){const o=ma(n,a);return new E(e,t,o,!1)}else return n?new E(e,t,n,!1):new E(e,t,void 0,!0)}processDocument(){const e=new Array;let t=null,n=this.peek(),i=!0;for(;;){i&&(n==null?void 0:n.type)===u.SECTION_SEP&&(i=!1);const a=this.processSection(i);if(n=this.peek(),!n){e.push(a);break}if(i?t=a:e.push(a),i&&(i=!1),n.type!==u.SECTION_SEP){const s=new E(f.unexpectedToken,`Expected section separator '---' but found '${n.token}'. Each section must be properly closed before starting a new one.`,n);this.errors.push(s);break}this.advance()}return new Oa(t,e,this.errors)}processSection(e){var l;let t=this.peek();(t==null?void 0:t.type)===u.SECTION_SEP&&this.advance();const[n,i]=this.parseSectionAndSchemaNames();let a=(i==null?void 0:i.value)||(n==null?void 0:n.value.toString().substring(1))||"unnamed";const s=a;if(a&&this.sectionNames[a]){const c=new E(f.unexpectedToken,`Duplicate section name '${a}'. Each section must have a unique name within the document.`,void 0,!1);this.errors.push(c);let h=2;for(;this.sectionNames[`${s}_${h}`];)h++;a=`${s}_${h}`,i&&(i.value=a)}(!e||e&&a!=="unnamed"&&((l=this.peek())==null?void 0:l.type)!==u.SECTION_SEP)&&(this.sectionNames[a]=!0);const o=this.parseSectionContent();return new Ma(o,i,n)}parseSectionAndSchemaNames(){let e=null,t=null,n=this.peek();return(n==null?void 0:n.subType)===u.SECTION_NAME?(t=n,this.advance(),n=this.peek(),(n==null?void 0:n.subType)===u.SECTION_SCHEMA&&(e=n,this.advance())):(n==null?void 0:n.subType)===u.SECTION_SCHEMA&&(e=n,this.advance(),n=this.peek()),[e,t]}parseSectionContent(){const e=this.peek();return!e||e.type===u.SECTION_SEP?null:e.type===u.COLLECTION_START?this.processCollection():this.processObject(!1)}processCollection(){const e=[];for(;this.match(B.COLLECTION_START_ARRAY);){this.advance(),this.current;try{e.push(this.processObject(!0))}catch(t){this.errors.push(t);let n={pos:-1,row:-1,col:-1},i;if(t&&typeof t=="object"&&"positionRange"in t){const a=t.positionRange;a&&a.getStartPos&&(n=a.getStartPos(),i=a.getEndPos?a.getEndPos():void 0)}if(n.pos===-1&&this.current>0&&this.current<=this.tokens.length){const a=this.tokens[this.current-1];a&&(n=a.getEndPos(),i=n)}e.push(new Ae(t,n,i)),this.skipToNextCollectionItem()}}return new Oe(e)}skipToNextCollectionItem(){for(;this.peek()&&!this.match(B.COLLECTION_OR_SECTION_ARRAY);)this.advance()}processObject(e){const t=this.parseObject(!0),n=this.peek();if(this.checkForPendingTokens(n,e),t.children.length===1){const i=t.children[0];if(i&&!i.key&&i.value&&i.value instanceof J)return i.value}return t}checkForPendingTokens(e,t){if(e&&e.type!==u.SECTION_SEP&&!(t&&e.type===u.COLLECTION_START))throw new E(f.unexpectedToken,`Unexpected token '${e.value}'. Expected end of section or start of new collection item '~'.`,e,!1)}parseObject(e){const t=[];let n=this.peek();e&&(n=null),!e&&!this.advanceIfMatch(B.CURLY_OPEN_ARRAY)&&z("The caller must ensure that this function is called only when the next token is {");let i=0,a=!1;for(;!a;){const s=this.peek();if(!s||this.match([u.CURLY_CLOSE,u.COLLECTION_START,u.SECTION_SEP])){a=!0;break}else if(s.type===u.COMMA){this.matchNext([u.COMMA,u.CURLY_CLOSE,u.COLLECTION_START,u.SECTION_SEP])?this.pushUndefinedMember(t,s):this.current+1===this.tokens.length&&this.pushUndefinedMember(t,s),this.advance();continue}else{if(i>0&&!this.matchPrev([u.COMMA,u.CURLY_OPEN]))throw new E(f.unexpectedToken,`Missing comma before '${s.value}'. Object members must be separated by commas.`,s,!1);const o=this.parseMember();t.push(o),i++}}if(e)return new J(t);{if(!this.match(B.CURLY_CLOSE_ARRAY))throw this.createUnclosedConstructError(f.expectingBracket,"Missing closing brace '}'. Object must be properly closed.",n,t);let s=this.peek();return this.advance(),new J(t,n,s)}}parseMember(){const e=this.peek();if(e||z("The caller must ensure that this function is called only when the member has at least one token"),this.matchNext(B.COLON_ARRAY))if(B.VALID_KEY_TYPES.includes(e.type)){this.advance(2);const n=this.parseValue();return new fe(n,e)}else throw new E(f.invalidKey,`Invalid key '${e.token}'. Object keys must be strings, numbers, booleans, or null.`,e,!1);return new fe(this.parseValue())}parseArray(){const e=[],t=this.peek();if(!t||t.type!==u.BRACKET_OPEN)throw new E(f.expectingBracket,`Expected opening bracket '[' to start array but found '${(t==null?void 0:t.token)||"end of input"}'.`,t===null?void 0:t,t===null);for(this.advance();;){const i=this.peek();if(!i)throw this.createUnclosedConstructError(f.expectingBracket,"Unexpected end of input while parsing array. Expected closing bracket ']'.",t,e);if(i.type===u.BRACKET_CLOSE)break;if(i.type===u.COLLECTION_START||i.type===u.SECTION_SEP)throw this.createUnclosedConstructError(f.expectingBracket,"Missing closing bracket ']'. Array must be properly closed.",t,e);if(i.type===u.COMMA){if(this.matchNext([u.COMMA,u.BRACKET_CLOSE])){const s=this.tokens[this.current+1];throw new E(f.unexpectedToken,"Unexpected comma. Array elements cannot be empty - remove the extra comma or add a value.",s,!1)}this.advance();continue}const a=this.parseMember();a.key?e.push(new J([a])):e.push(a.value)}if(!this.match(B.BRACKET_CLOSE_ARRAY))throw this.createUnclosedConstructError(f.expectingBracket,"Missing closing bracket ']'. Array must be properly closed.",t,e);const n=this.peek();return this.advance(),new ge(e,t,n)}parseValue(){const e=this.peek();if(!e)throw new E(f.valueRequired,"Unexpected end of input. Expected a value (string, number, boolean, null, array, or object).",void 0,!0);switch(e.type){case u.STRING:case u.NUMBER:case u.BIGINT:case u.DECIMAL:case u.BOOLEAN:case u.NULL:case u.DATETIME:{const t=new I(e);return this.advance(),t}case u.BRACKET_OPEN:return this.parseArray();case u.CURLY_OPEN:return this.parseObject(!1);default:throw new E(f.unexpectedToken,`Unexpected token '${e.value}'. Expected a valid value (string, number, boolean, null, array, or object).`,e,e===null)}}pushUndefinedMember(e,t){const n=t.clone();n.type=u.UNDEFINED,n.value=void 0;const i=new fe(new I(n));e.push(i)}isValidToken(e){return e!==null}peek(){return this.current<this.tokens.length?this.tokens[this.current]:null}advance(e=1){this.current+=e}match(e){const t=this.peek();return!!(this.isValidToken(t)&&e.includes(t.type))}matchPrev(e){const t=this.tokens[this.current-1];return!!(this.isValidToken(t)&&e.includes(t.type))}matchNext(e){if(this.current+1>=this.tokens.length)return!1;const t=this.tokens[this.current+1];return!!(this.isValidToken(t)&&e.includes(t.type))}advanceIfMatch(e){return this.match(e)?(this.advance(),!0):!1}}B.CURLY_OPEN_ARRAY=[u.CURLY_OPEN];B.CURLY_CLOSE_ARRAY=[u.CURLY_CLOSE];B.BRACKET_OPEN_ARRAY=[u.BRACKET_OPEN];B.BRACKET_CLOSE_ARRAY=[u.BRACKET_CLOSE];B.COLLECTION_START_ARRAY=[u.COLLECTION_START];B.SECTION_SEP_ARRAY=[u.SECTION_SEP];B.COMMA_ARRAY=[u.COMMA];B.COLON_ARRAY=[u.COLON];B.COLLECTION_OR_SECTION_ARRAY=[u.COLLECTION_START,u.SECTION_SEP];B.VALID_KEY_TYPES=[u.STRING,u.NUMBER,u.BOOLEAN,u.NULL];function on(r,e,t={}){var c;const i=new Ia(r).tokenize();if(i.length===0)return new Ge(new kt,new et);const s=new B(i).parse(),o=s.getErrors(),l=new Ge(new kt,new et,o);if(s.header){if(s.header.child){if(s.header.child instanceof J){const h=lt("schema",s.header.child);h instanceof _?((c=l.header.definitions)==null||c.push("$schema",h,!0),l.header.schema=h):z(h)}else s.header.child instanceof Oe?Fa(l,s.header.child):z(s.header.child);e&&l.header.definitions.merge(e,!1)}else e&&l.header.definitions.merge(e,!1);Pt(s,l)}else e&&l.header.definitions.merge(e,!1),Pt(s,l);return l}function Pa(r,e){var t,n;for(let i=0;i<r.children.length;i++){const a=r.children[i];(n=e.sections)==null||n.push(new it((t=a.child)==null?void 0:t.toValue(e.header.definitions||void 0),a.name))}}function Pt(r,e){var i,a;const t=r.children.length;if(t===0)return;const n=[];for(let s=0;s<t;s++){const o=r.children[s],l=o.schemaName,c=l?l==="$schema"?e.header.schema:(i=e.header.definitions)==null?void 0:i.getV(o.schemaNode):e.header.schema;if(!c){Pa(r,e);continue}const h=$t(o.child,c,e.header.definitions||void 0,n);(a=e.sections)==null||a.push(new it(h,o.name,l))}n.length>0&&e.addErrors(n)}function Fa(r,e){const t=r.header.definitions;if(!t)throw new Error("Document header definitions not initialized. This is an internal error - please report this issue.");const n=[];for(let i=0;i<e.children.length;i++){const a=e.children[i];if(a===null)continue;if(a instanceof Ae)throw new G(f.invalidDefinition,`Invalid definition: ${a.error.message}`,a);a instanceof J||z("Invalid definition, must be object"),a.children[0]===null&&z("Invalid definition"),a.children.length;const s=a.children[0];if(!s.key)throw new G(f.invalidDefinition,"Invalid definition: missing key. Each definition must have a key (e.g., '$schema: {...}' or '@variable: value').",s.value);const o=s.key;if(o.type!==u.STRING)throw new Error("Invalid typedef definition: key must be a string.");let l=o.value;if(l.startsWith("$")){t.push(l,s.value,!0),n.push({key:l,schemaDef:s.value});continue}if(l.startsWith("@")){t.push(l,s.value,!1,!0);continue}let c=a.children[0].value;t.push(l,c.toValue(r.header.definitions||void 0))}for(let i=0;i<n.length;i++){const{key:a,schemaDef:s}=n[i],o=lt(a,s,t);t.set(a,o)}}function ja(r,e,t){return r=r.trim(),r?(r.endsWith("---")||(r+=`
---`),on(r,e,t).header.definitions):null}const Ee={Warning:4,Error:8};function La(r){switch(r){case"syntax":return Ee.Error;case"validation":return Ee.Warning;case"runtime":return Ee.Error;default:return Ee.Error}}function ln(r,e){return`${r.startLine}:${r.startColumn}-${r.endLine}:${r.endColumn}:${e.substring(0,20)}`}function _a(r,e,t=!1){if(!e)return Ft(r,null,t);const n=cn(e,ja,!0,t);return n.errorMessages.length>0?n:Ft(r,n.defs,t)}function cn(r,e,t=!1,n=!1){try{const i=e(r,null);let a=[];i&&typeof i.getErrors=="function"&&(a=i.getErrors());const s=t?null:i.toJSON({skipErrors:n}),o=t?i:null;if(a.length>0){const l=t?"defs":"doc",c=a.map(h=>Lt(h,l)).filter(h=>h!==null);return{errorMessages:a.map(h=>jt(h)),errorItems:c,defs:o,output:s,defsMarkers:t?a.flatMap(Ne):[],docMarkers:t?[]:a.flatMap(Ne)}}return{errorMessages:[],errorItems:[],defs:o,output:s,defsMarkers:[],docMarkers:[]}}catch(i){const s=Lt(i,t?"defs":"doc");return{errorMessages:[jt(i)],errorItems:s?[s]:[],defs:null,output:null,defsMarkers:t?Ne(i):[],docMarkers:t?[]:Ne(i)}}}function Ft(r,e=null,t=!1){return cn(r,n=>on(n,e),!1,t)}function jt(r){return r instanceof E?"SYNTAX_ERROR: "+((r==null?void 0:r.message)||String(r)):r instanceof A?"VALIDATION_ERROR: "+((r==null?void 0:r.message)||String(r)):"ERROR: "+((r==null?void 0:r.message)||String(r))}function hn(r){return r instanceof E?"syntax":r instanceof A?"validation":"runtime"}function un(r){var n,i;if(!(r instanceof G))return null;const e=(n=r.positionRange)==null?void 0:n.getStartPos(),t=(i=r.positionRange)==null?void 0:i.getEndPos();return!e||!t?null:{startLine:e.row,startColumn:e.col,endLine:t.row,endColumn:t.col}}function Lt(r,e){const t=un(r);if(!t)return null;const n=hn(r),i=(r==null?void 0:r.message)||String(r);return{id:ln(t,i),code:r.code,category:n,message:i,range:t,source:e}}function Ne(r){if(!(r instanceof G))return[];const e=un(r);if(!e)return[];const t=hn(r),n=La(t),i=(r==null?void 0:r.message)||String(r);return[{message:i,severity:n,startLineNumber:e.startLine,startColumn:e.startColumn,endLineNumber:e.endLine,endColumn:e.endColumn,id:ln(e,i),category:t}]}let Da=0;function $a(r={}){const{timeout:e=5e3,debug:t=!1}=r,n=w.useRef(null),i=w.useRef(null),[a,s]=w.useState(!1),[o,l]=w.useState(!1),[c,h]=w.useState(null);w.useEffect(()=>{t&&console.log("[ParserWorker] Initializing parser worker");try{const N=new Worker(new URL("/assets/parser.worker-CfaSaRT9.js",import.meta.url),{type:"module"});return N.addEventListener("message",d),N.addEventListener("error",g),n.current=N,l(!0),h(null),t&&console.log("[ParserWorker] Worker initialized successfully"),()=>{t&&console.log("[ParserWorker] Terminating worker"),N.removeEventListener("message",d),N.removeEventListener("error",g),N.terminate(),n.current=null,l(!1)}}catch(N){const S=`Failed to initialize worker: ${N.message}`;console.error("[ParserWorker]",S,N),h(S),l(!1);return}},[]);const d=w.useCallback(N=>{const S=N.data;if(!i.current||S.id!==i.current.id){t&&console.warn("[ParserWorker] Received response for unknown request:",S.id);return}const{resolve:D,reject:j,timeoutId:k}=i.current;window.clearTimeout(k),S.type==="result"&&S.result?(t&&console.log("[ParserWorker] Parse completed:",S.id),D(S.result)):S.type==="error"&&(t&&console.error("[ParserWorker] Parse error:",S.error),j(new Error(S.error||"Unknown worker error"))),i.current=null,s(!1)},[t]),g=w.useCallback(N=>{const S=`Worker error: ${N.message}`;if(console.error("[ParserWorker]",S,N),i.current){const{reject:D,timeoutId:j}=i.current;window.clearTimeout(j),D(new Error(S)),i.current=null,s(!1)}h(S)},[]),y=w.useCallback(()=>{if(i.current){const{reject:N,timeoutId:S}=i.current;window.clearTimeout(S),N(new Error("Parse operation cancelled")),i.current=null,s(!1),t&&console.log("[ParserWorker] Parse cancelled")}},[t]);return{parse:w.useCallback((N,S,D,j)=>new Promise((k,T)=>{if(!n.current){T(new Error("Worker not initialized"));return}i.current&&y();const x=`parse-${++Da}`,p=window.setTimeout(()=>{var $;(($=i.current)==null?void 0:$.id)===x&&(i.current=null,s(!1),T(new Error(`Parse operation timed out after ${e}ms`)),t&&console.error("[ParserWorker] Parse timeout:",x))},e);i.current={id:x,resolve:k,reject:T,timeoutId:p},s(!0);const b={type:"parse",id:x,documentText:N,schemaText:S,skipErrors:D,minifiedOutput:j};t&&console.log("[ParserWorker] Sending parse request:",x),n.current.postMessage(b)}),[e,t,y]),cancel:y,isParsing:a,isReady:o,workerError:c}}function Ba(r,e,t,n,i,a={}){const{useWorker:s=!1,timeout:o=5e3,debug:l=!1}=a,[c,h]=w.useState([]),[d,g]=w.useState([]),[y,C]=w.useState(""),[N,S]=w.useState(!1),[D,j]=w.useState([]),[k,T]=w.useState([]),[x,p]=w.useState(void 0),b=$a({timeout:o,debug:l}),$=s&&b.isReady;w.useEffect(()=>{s&&console.log("[useParseIO] Worker enabled:",{useWorker:s,isReady:b.isReady,canUse:$,error:b.workerError})},[s,b.isReady,$,b.workerError]);const ee=w.useCallback(()=>{if(p(void 0),$)l&&console.log("[useParseIO] Using worker for parsing"),b.parse(r,t?e:null,i,n).then(P=>{g(P.defsMarkers),h(P.docMarkers),j(P.errorMessages),T(P.errorItems),C(P.jsonText),S(P.error)}).catch(P=>{p(P.message),C(""),S(!0),j([P.message]),T([]),l&&console.error("[useParseIO] Worker parse error:",P)});else{l&&s&&console.log("[useParseIO] Worker not available, using main thread");const P=_a(r,t?e:null,i);P.defsMarkers?g(P.defsMarkers):g([]),P.docMarkers?h(P.docMarkers):h([]);const se=P.errorMessages.length>0;if(j(P.errorMessages),T(P.errorItems),P.output){const oe=JSON.stringify(P.output,function(ct,H){return typeof H=="bigint"?`io:big:${H.toString()}`:typeof H=="number"&&isNaN(H)?"io:number:NaN":H instanceof R?`io:decimal:${H.toString()}`:H===1/0?"io:number:Inf":H===-1/0?"io:number:-Inf":typeof H>"u"?"io:undefined":H},n?0:2);C(oe),S(se)}else se?(C(""),S(!0)):(C(""),S(!1))}},[r,t,e,n,i,$,b,l,s]);return w.useEffect(()=>()=>{$&&b.isParsing&&b.cancel()},[$,b]),{markers:c,defMarkers:d,jsonText:y,error:N,errorMessages:D,errorItems:k,parse:ee,isParsing:$?b.isParsing:void 0,parseError:x}}const ze=200,Wa=100,Ja="60%",za=({showSchema:r,setShowSchema:e,document:t,schema:n,schemaPanelHeight:i})=>{const[,a]=yn(Dt),[s,o]=w.useState([0,"auto"]),l=w.useRef(s);w.useEffect(()=>{l.current=s},[s]);const[c,h]=w.useState([0,"auto"]),[d,g]=w.useState(n),[y,C]=w.useState(t),[N,S]=w.useState(localStorage.getItem("minifiedOutput")==="true"),[D,j]=w.useState(localStorage.getItem("skipErrors")!=="false"),{markers:k,defMarkers:T,jsonText:x,error:p,errorMessages:b,errorItems:$,parse:ee,isParsing:P}=Ba(y,d,r,N,D,{useWorker:!0,debug:!1}),[se,oe]=w.useState(null);w.useEffect(()=>{o([i||ze,"auto"])},[i]),w.useEffect(()=>{const L=setTimeout(()=>{ee()},500);return()=>clearTimeout(L)},[d,y,r,N,D,ee]),w.useEffect(()=>{g(n),C(t)},[n,t]),w.useEffect(()=>{c[0]===0&&h([Ja,"auto"])},[c]),w.useEffect(()=>{o(r?[i||ze,"auto"]:[0,"auto"])},[r,i]);const ct=()=>{const L=l.current;typeof L[0]=="number"&&(L[0]<=Wa?(o([r?0:ze,"auto"]),e(!r)):e(L[0]>0))},H=(L,Z)=>{a({editorName:L,row:Z.row,column:Z.column,position:Z.position})},dn=({line:L,col:Z})=>{if(!k||k.length===0)return;const le=ui(k,{line:L,col:Z});le&&oe({startLineNumber:le.startLineNumber??L,startColumn:le.startColumn??Z,endLineNumber:le.endLineNumber??L,endColumn:le.endColumn??Z+1})};return m.jsx("div",{className:"editor-area",children:m.jsxs(ht,{split:"vertical",sizes:c,onChange:h,sashRender:L=>m.jsx("div",{className:"sash"}),children:[m.jsx(Me,{minSize:20,maxSize:"80%",children:m.jsx("div",{className:"editor-area-left",children:m.jsxs(ht,{split:"horizontal",sizes:s,onChange:o,onDragEnd:ct,sashRender:()=>m.jsx("div",{className:"sash"}),children:[m.jsx(Me,{minSize:0,children:m.jsxs("div",{className:"top",style:{height:"100%"},children:[m.jsx(De,{label:"Schema & Definitions",bytes:d.length}),m.jsx(Ue,{onChange:g,value:d,markers:T,onChangeCaretPosition:L=>H("Definitions",L)})]})}),m.jsx(Me,{minSize:200,children:m.jsxs("div",{className:"bottom",style:{height:"100%"},children:[m.jsx(De,{label:"Internet Object Document",bytes:y.length,outputBytes:x.length,minified:N,isError:p}),m.jsx(Ue,{value:y,markers:k,onChange:C,onChangeCaretPosition:L=>H("Internet Object",L),selection:se})]})})]})})}),m.jsxs("div",{className:"editor-area-right",children:[m.jsx(De,{label:"JSON Output",bytes:x.length,title:"Shows the comparable JSON output generated from the Internet Object document",children:m.jsxs("div",{className:"toggle-group",children:[m.jsxs("label",{className:"toggleSwtich",title:"Skip error objects in output",children:[m.jsx("span",{children:"Skip Errors in Output"}),m.jsx(He,{onChange:L=>{localStorage.setItem("skipErrors",L.target.checked.toString()),j(L.target.checked)},checked:D,"aria-label":"Toggle skip errors in JSON output"})]}),m.jsxs("label",{className:"toggleSwtich",title:"Compress",children:[m.jsx("span",{children:"Minify"}),m.jsx(He,{onChange:L=>{localStorage.setItem("minifiedOutput",L.target.checked.toString()),S(L.target.checked)},checked:N,"aria-label":"Toggle minified JSON output"})]})]})}),m.jsx(bi,{value:x,error:p,errorMessages:b,errorItems:$,options:{wordWrap:"on"},onNavigateToError:dn,isParsing:P})]})]})})};function Ha(){const{sampleId:r}=Sn(),e=Tn(),[t,n]=w.useState(()=>Ce.find(r||"")),[i,a]=w.useState(!!(t!=null&&t.schema)),s=w.useMemo(()=>[m.jsx("option",{value:"",children:"Blank"},"select"),...Ce.groups.map((l,c)=>m.jsx("optgroup",{label:l.group,children:l.items.map(h=>m.jsx("option",{value:h.id,children:h.name},h.id))},c))],[]),o=w.useCallback(l=>{const c=l.target.value,h=Ce.find(c);n(h),a(!!(h!=null&&h.schema)),e(`/${c}`)},[e]);return m.jsxs("div",{className:"app",children:[m.jsx("a",{href:"#main-content",className:"skip-link",children:"Skip to main content"}),m.jsx(Wn,{children:m.jsxs("div",{className:"toolbar",children:[m.jsxs("label",{className:"toggle",title:"Separate the schema from the data document!",children:[m.jsx("span",{children:"Separate Schema"}),m.jsx(He,{checked:i,onChange:l=>a(l.target.checked)})]}),m.jsx("select",{id:"sample-data-selector",className:"highlight",title:"Select IO sample data",onChange:o,value:(t==null?void 0:t.id)||"",children:s})]})}),m.jsx("main",{id:"main-content",className:"main",children:m.jsx(za,{showSchema:i,schemaPanelHeight:t==null?void 0:t.schemaPanelHeight,setShowSchema:a,document:(t==null?void 0:t.doc)||"",schema:(t==null?void 0:t.schema)||""})}),m.jsx(ai,{})]})}const Ua=Rn.createRoot(document.getElementById("root"));Ua.render(m.jsx(fn.StrictMode,{children:m.jsx(vn,{children:m.jsx(bn,{children:m.jsx(xn,{children:m.jsx(kn,{path:"/:sampleId?",element:m.jsx(Ha,{})})})})})}));
//# sourceMappingURL=index-CCmcz2hg.js.map
