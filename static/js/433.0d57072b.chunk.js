"use strict";(self.webpackChunkchain_status_webpage=self.webpackChunkchain_status_webpage||[]).push([[433],{3235:function(e,t,r){r.r(t),r.d(t,{UserComponent:function(){return p},default:function(){return d}});var n=r(6918),a=r(4071),s=r(9717),c=r(3028),o=r(969),i={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"}}]},name:"user",theme:"outlined"},l=r(2717),u=function(e,t){return o.createElement(l.Z,(0,c.Z)((0,c.Z)({},e),{},{ref:t,icon:i}))};u.displayName="UserOutlined";var f=o.forwardRef(u),m=r(7574),p=function(e){var t=function(e){var t,r,a,s;return(0,m.jsxs)(m.Fragment,{children:[e.hideAvatar?(0,m.jsx)(n.C,{size:null!==(t=e.size)&&void 0!==t?t:24,icon:(0,m.jsx)(f,{})}):(0,m.jsx)(n.C,{size:null!==(r=e.size)&&void 0!==r?r:24,src:null===(a=e.user)||void 0===a?void 0:a.avatar_url}),e.showName?(0,m.jsx)("span",{style:{marginLeft:5,color:"#2d2d2d"},children:null===(s=e.user)||void 0===s?void 0:s.login}):null]})};return e.user?(0,m.jsx)(a.Z,{title:e.user.login,children:e.hideButton?(0,m.jsx)(t,{showName:e.showName,user:e.user,size:e.size,hideAvatar:e.hideAvatar}):(0,m.jsx)(s.Z,{type:"link",href:e.user.html_url,target:"_blank",style:{padding:0,margin:0},children:(0,m.jsx)(t,{showName:e.showName,user:e.user,size:e.size,hideAvatar:e.hideAvatar})})}):null},d=p},6918:function(e,t,r){r.d(t,{C:function(){return j}});var n=r(7896),a=r(6666),s=r(6522),c=r(6234),o=r(969),i=r(5667),l=r.n(i),u=r(4480),f=r(125),m=r(33),p=r(2908),d=r(7834),v=r(7048),g=o.createContext("default"),h=function(e){var t=e.children,r=e.size;return o.createElement(g.Consumer,null,(function(e){return o.createElement(g.Provider,{value:r||e},t)}))},y=g,x=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(n=Object.getOwnPropertySymbols(e);a<n.length;a++)t.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(r[n[a]]=e[n[a]])}return r},E=function(e,t){var r,i,g=o.useContext(y),h=o.useState(1),E=(0,c.Z)(h,2),b=E[0],Z=E[1],C=o.useState(!1),O=(0,c.Z)(C,2),N=O[0],w=O[1],z=o.useState(!0),j=(0,c.Z)(z,2),S=j[0],P=j[1],k=o.useRef(),_=o.useRef(),A=(0,f.sQ)(t,k),R=o.useContext(m.E_).getPrefixCls,T=function(){if(_.current&&k.current){var t=_.current.offsetWidth,r=k.current.offsetWidth;if(0!==t&&0!==r){var n=e.gap,a=void 0===n?4:n;2*a<r&&Z(r-2*a<t?(r-2*a)/t:1)}}};o.useEffect((function(){w(!0)}),[]),o.useEffect((function(){P(!0),Z(1)}),[e.src]),o.useEffect((function(){T()}),[e.gap]);var H=e.prefixCls,L=e.shape,M=e.size,W=e.src,B=e.srcSet,D=e.icon,F=e.className,I=e.alt,U=e.draggable,G=e.children,Q=e.crossOrigin,V=x(e,["prefixCls","shape","size","src","srcSet","icon","className","alt","draggable","children","crossOrigin"]),X="default"===M?g:M,q=Object.keys("object"===(0,s.Z)(X)&&X||{}).some((function(e){return["xs","sm","md","lg","xl","xxl"].includes(e)})),J=(0,v.Z)(q),K=o.useMemo((function(){if("object"!==(0,s.Z)(X))return{};var e=d.c4.find((function(e){return J[e]})),t=X[e];return t?{width:t,height:t,lineHeight:"".concat(t,"px"),fontSize:D?t/2:18}:{}}),[J,X]);(0,p.Z)(!("string"===typeof D&&D.length>2),"Avatar","`icon` is using ReactNode instead of string naming in v4. Please check `".concat(D,"` at https://ant.design/components/icon"));var Y,$=R("avatar",H),ee=l()((r={},(0,a.Z)(r,"".concat($,"-lg"),"large"===X),(0,a.Z)(r,"".concat($,"-sm"),"small"===X),r)),te=o.isValidElement(W),re=l()($,ee,(i={},(0,a.Z)(i,"".concat($,"-").concat(L),!!L),(0,a.Z)(i,"".concat($,"-image"),te||W&&S),(0,a.Z)(i,"".concat($,"-icon"),!!D),i),F),ne="number"===typeof X?{width:X,height:X,lineHeight:"".concat(X,"px"),fontSize:D?X/2:18}:{};if("string"===typeof W&&S)Y=o.createElement("img",{src:W,draggable:U,srcSet:B,onError:function(){var t=e.onError;!1!==(t?t():void 0)&&P(!1)},alt:I,crossOrigin:Q});else if(te)Y=W;else if(D)Y=D;else if(N||1!==b){var ae="scale(".concat(b,") translateX(-50%)"),se={msTransform:ae,WebkitTransform:ae,transform:ae},ce="number"===typeof X?{lineHeight:"".concat(X,"px")}:{};Y=o.createElement(u.Z,{onResize:T},o.createElement("span",{className:"".concat($,"-string"),ref:function(e){_.current=e},style:(0,n.Z)((0,n.Z)({},ce),se)},G))}else Y=o.createElement("span",{className:"".concat($,"-string"),style:{opacity:0},ref:function(e){_.current=e}},G);return delete V.onError,delete V.gap,o.createElement("span",(0,n.Z)({},V,{style:(0,n.Z)((0,n.Z)((0,n.Z)({},ne),K),V.style),className:re,ref:A}),Y)},b=o.forwardRef(E);b.displayName="Avatar",b.defaultProps={shape:"circle",size:"default"};var Z=b,C=r(2148),O=r(6530),N=r(3275),w=function(e){var t=o.useContext(m.E_),r=t.getPrefixCls,n=t.direction,s=e.prefixCls,c=e.className,i=void 0===c?"":c,u=e.maxCount,f=e.maxStyle,p=e.size,d=r("avatar-group",s),v=l()(d,(0,a.Z)({},"".concat(d,"-rtl"),"rtl"===n),i),g=e.children,y=e.maxPopoverPlacement,x=void 0===y?"top":y,E=e.maxPopoverTrigger,b=void 0===E?"hover":E,w=(0,C.Z)(g).map((function(e,t){return(0,O.Tm)(e,{key:"avatar-key-".concat(t)})})),z=w.length;if(u&&u<z){var j=w.slice(0,u),S=w.slice(u,z);return j.push(o.createElement(N.Z,{key:"avatar-popover-key",content:S,trigger:b,placement:x,overlayClassName:"".concat(d,"-popover")},o.createElement(Z,{style:f},"+".concat(z-u)))),o.createElement(h,{size:p},o.createElement("div",{className:v,style:e.style},j))}return o.createElement(h,{size:p},o.createElement("div",{className:v,style:e.style},w))},z=Z;z.Group=w;var j=z},3275:function(e,t,r){r.d(t,{Z:function(){return f}});var n=r(7896),a=r(969),s=r(4071),c=r(33),o=function(e){return e?"function"===typeof e?e():e:null},i=r(405),l=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(n=Object.getOwnPropertySymbols(e);a<n.length;a++)t.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(r[n[a]]=e[n[a]])}return r},u=a.forwardRef((function(e,t){var r=e.prefixCls,u=e.title,f=e.content,m=l(e,["prefixCls","title","content"]),p=a.useContext(c.E_).getPrefixCls,d=p("popover",r),v=p();return a.createElement(s.Z,(0,n.Z)({},m,{prefixCls:d,ref:t,overlay:function(e){if(u||f)return a.createElement(a.Fragment,null,u&&a.createElement("div",{className:"".concat(e,"-title")},o(u)),a.createElement("div",{className:"".concat(e,"-inner-content")},o(f)))}(d),transitionName:(0,i.mL)(v,"zoom-big",m.transitionName)}))}));u.displayName="Popover",u.defaultProps={placement:"top",trigger:"hover",mouseEnterDelay:.1,mouseLeaveDelay:.1,overlayStyle:{}};var f=u}}]);
//# sourceMappingURL=433.0d57072b.chunk.js.map