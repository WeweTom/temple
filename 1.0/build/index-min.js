/*! temple - v1.0 - 2013-09-23 11:13:51 PM
* Copyright (c) 2013 tom; Licensed  */
KISSY.add("gallery/temple/1.0/rdparser",function(){function a(b){function c(a){this.text=a,this.lastPos=0,this.lineNo=this.colNo=1,this.track=function(a){a>=this.lastPos&&(this.lastPos++,"\n"===this.text[a]?(this.lineNo++,this.colNo=1):this.colNo++)}}function d(){var a=Array.prototype.slice.apply(arguments);return function(b){for(var c=0,d=b;c<a.length;c++){var e=a[c](d);if(e===d)return b;d=e}return d}}function e(){var a=Array.prototype.slice.apply(arguments);return function(b){for(var c=0;c<a.length;c++){var d=a[c](b);if(d!==b)return d}return b}}function f(a){return function(b){var c,d;for(c=b;(d=a(c))!==c;c=d);return c}}function g(a){return function(b){var c=a(b);return c!==b?c:{capture:b.capture,context:b.context,pos:b.pos}}}function h(a){return function(b){return b.pos>=b.context.text.length?b:a.test(b.context.text[b.pos])?(b.context.track(b.pos),{capture:b.capture,context:b.context,pos:b.pos+1}):b}}function i(a,b,c){return function(d){var e=a(d);if(e!==d){var f={prev:e.capture};if(f.name=b,"@"!==b[0]&&(f.value=d.context.text.substr(d.pos,e.pos-d.pos)),e.capture.next=f,e.capture=f,c){var g={prev:d.capture,next:d.capture.next};g.name=c,d.capture.next.prev=g,d.capture.next=g}}return e}}a.Context=c,this.parsingFunction=b(d,e,f,g,h,i),this.parse=function(a){var b={capture:{},context:new c(a),pos:0},d=this.parsingFunction(b),e=b.context;if(d.pos!=e.text.length){var f;f=e.lastPos>=e.text.length?"Unexpected end if input":"Unexpected token at ("+e.lineNo+":"+e.colNo+")";var g=new Error(f);throw g.$=d,g}return d.capture.next=null,[b.capture,d.capture]}}return a}),KISSY.add("gallery/temple/1.0/toast",function(a,b,c){function d(a,b,c,e){var f=a.name;if("@ifend"==f||"@ifbodyend"==f||"@elseifend"==f||"@elseend"==f||"@setend"==f||"@includeend"==f||"@extendend"==f)c.length&&(b=c.pop());else if("@eachstart"==a.name){var g=["each"];b.push(g),c.push(b),b=g}else if("@eachend"==a.name)c.pop(),b=c.pop();else if("@each-head-start"==a.name){var h=[];b.push(h),c.push(b),b=h}else if("@each-body-start"==a.name){b=c.pop();var i=[];b.push(i),c.push(b),b=i}else if("each-items"==a.name)b.push(a.value);else if("each-item"==a.name)b.push(a.value);else if("each-index"==a.name)b.push(a.value);else if("@setstart"==a.name){var j=[],k=["set",j];c.push(b),b.push(k),b=j}else if("@blockstart"==a.name){var l=[],m=["block",l];b.push(m),c.push(b),c.push(m),b=l}else if("@blockend"==a.name)c.pop(),b=c.pop();else if("@ifstart"==a.name){var n=[],o=["if",n];b.push(o),c.push(b),c.push(o),b=n}else if("@elseifstart"==a.name){var p=[];b.push(p),c.push(b),b=p}else if("@ifexpstart"==a.name){var q=[];b.push(q),c.push(b),b=q}else if("@elsestart"==f){b=c.pop();var r=[];b.push(r),c.push(b),b=r}else if("@ifexpend"==f)c.length&&(b=c.pop());else if("@ifbodystart"==a.name){var s=[];b.push(s),c.push(b),b=s}else if("expatom"==a.name)b.push(a.value);else if("namespace"==a.name)b.push(a.value);else if("expressionbody"==a.name)b.push(a.value);else if("@expressionend"==a.name)b=c.pop();else if("@expressionstart"==a.name){var t=[],u=["expression",t];c.push(b),b.push(u),b=t}else if("expression"==a.name)b.push(a.value);else if("@includestart"==a.name){var v=["include"];b.push(v),c.push(b),b=v}else if("@extendstart"==a.name){var w=["extend"];e.extend++,e.context=w,b.push(w),c.push(b),b=w}else"number"==a.name?b.push(["number",a.value]):"string"==a.name&&b.push(["string",a.value.replace(/\n/gm,"\\n")]);a=a.next,a&&d(a,b,c,e)}var e=new b(c),f=function(a){var b=[],c=e.parse(a),f=c[0].next,g={extend:0};return f&&d(f,b,[],g),b.info=g,b};return f},{requires:["gallery/temple/1.0/rdparser","gallery/temple/1.0/grammar"]}),KISSY.add("gallery/temple/1.0/compile2js",function(S,toAST){function gensymbol(a){a||(a={});var b;return b=a.pre?String(a.pre)+unique++:default_var_name_pre+unique++}function filterAST(a){function b(a){for(var d=0,e=a.length;e>d;d++){var f=a[d],g=a[0],h=a[1];"block"===g?c[h[0][1]]=h:isarray(f)&&b(f)}}var c={};return b(a),c}function extendListWithBlocks(a,b){function c(a){for(var d=0,e=a.length;e>d;d++){var f=a[d],g=a[0],h=a[1];"block"===g&&isarray(g)?b[h[0][1]]&&(f[1]=b[h[0][1]]):isarray(f)&&c(f)}}return c(a),a}function isLocalFn(a){return!!localfns[a]}function isGlobalFn(a){return!!this[a]}function isExpAtom(a){return indexOf(expatom,a)>-1}function _compile(a,b,c,d){var e="";if("if"===a[0]){for(var f,g=a[1],h=0,i=g.length;i>h;h++){f=g[h],h?b+="else if(":b=b+c+"if(";for(var j=f[0],k=j.length,l=j.slice(0,k-1),m="",n=0,o=l.length;o>n;n++)m+=isExpAtom(l[n])?l[n]:nshandle(l[n],d);b+=m,b+=")",b+="{\n";var p=f[1];if(p)for(var q=0,r=p.length;r>q;q++)b=b+_compile(p[q],"",c+INDENT,d)+"\n";b=b+c+"}"}if(a[2]&&a[2].length){b+="else",b+="{\n";for(var s=a[2],t=0;t<s.length;t++)b=b+_compile(s[t],"",c+INDENT,d)+"\n";b=b+c+"}",e=b}e=b}else if("each"===a[0]){var u=a[1],v=a[2];if(v){var w=gensymbol({pre:"i_"}),x=gensymbol({pre:"len_"}),y=u[0];d[y]||(y=ENV+"."+y),b=b+c+"for(var "+w+" = 0 , "+x+" = "+y+".length ; "+w+" < "+x+"; "+w+"++){\n";var z=u[2],A=u[1],B=d.derive();B[z]=w,B[A]=y+"["+w+"]";for(var C=0,D=v.length;D>C;C++)b=b+_compile(v[C],"",c+INDENT,B)+"\n";b=b+c+"}"}e=b}else if("set"===a[0]){for(var E=a[1],F=E[0],G=E.slice(1,E.length-1),m="",C=0,D=G.length;D>C;C++)m+=isExpAtom(G[C])?G[C]:nshandle(G[C],d);e=F.indexOf(".")>-1?b+c+F+" = "+m+";":b+c+"var "+F+" = "+m+";"}else if("block"===a[0])for(var H=a[1].slice(1),C=0,D=H.length;D>C;C++)e=b+c+_compile(H[C],"","",{});else if("include"===a[0]){var I=a[1][1],J="";if(subs[I])for(var K=toAST(subs[I]),C=0,D=K.length;D>C;C++)J+=_compile(K[C],"",c,{})+"\n";e+=b+J}else if("expression"===a[0]){for(var L=a[1],G=L.slice(0,L.length-1),m="",C=0,D=G.length;D>C;C++)m+=isExpAtom(G[C])?G[C]:nshandle(G[C],d);e=c+stringname+" += "+m}else if("string"===a[0]){var m;a[1]&&(e=isstrnum(a[1])?c+stringname+" += "+a[1]:c+stringname+' += "'+a[1]+'"')}else this.console&&console.log("no case",a),e="";return e}function compile(s){var js=to_js(s),ret=eval("("+js+")");return ret}function getast(a){var b=toAST(a),c=b.info;if(c.extend>0){var d=c.context[1][1];if(!subs[d])throw Error('extend "'+d+'", but can not find it');var e=filterAST(b);b=getast(subs[d]),b=extendListWithBlocks(b,e)}return b}function to_js(a){var b=getast(a);return _to_js(b)}function _to_js(a){for(var b=INDENT+INDENT,c="",d=0,e=a.length;e>d;d++)c=c+_compile(a[d],"",b,{})+"\n";return c="{\n  render:function("+ENV+"){\n"+"    "+stringname+' = "";\n'+c+"    return "+stringname+";\n"+"  }\n"+"}\n"}var INDENT="  ",ENV="env",Temple=window.Temple={},unique=0,default_var_name_pre="variable_",stringname=gensymbol({pre:"string_"});Object.prototype.derive=function(){var a=function(){};return a.prototype=this,new a};var indexOf=Array.indexOf?Array.indexOf:function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},isarray=Array.isArray?Array.isArray:function(a){return"[object Array]"===toString.call(a)},isstr=function(a){return'"'==a[0]||"'"==a[0]},isnum=function(a){return/\d/.test(a)},isstrnum=function(a){return isnum(a)||isstr(a)},nshandle=function(a,b){var c=a.split("."),d=c[0];return"this"==d?a:isstrnum(a)?a:c.length>1?b[d]||this[d]||isLocalFn(d)?a:ENV+"."+a:isLocalFn(d)?"Temple.__fns."+[d]:isGlobalFn(d)?a:ENV+"."+a},subs={};Temple.add=function(a,b){subs[a]=b},Temple.remove=function(a){subs[a]&&delete subs[a]};var regvar=/[a-zA-Z_$][a-zA-Z_$0-9]*/g,globalfns=["Infinity","NaN","undefined"];globalfns=globalfns.concat(["decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","eval","isFinite","isNaN","Number","parseFloat","parseInt","String","unescape"]);var localfns=Temple.__fns={};Temple.reg=function(a,b){localfns[a]=b};var expatom=["=","==","===",">=","<=","+=","-=","&&","||","+","-","*","/","%","|",">","<","^",",",".","(",")"];return{to_js:to_js,compile:compile}},{requires:["gallery/temple/1.0/toast"]}),KISSY.add("gallery/temple/1.0/grammar",function(){var a=function(a){return function(a){return a(a)}(function(b){return a(function(){return b(b).apply(null,arguments)})})},b=Array.isArray?Array.isArray:function(a){return"[object Array]"===toString.call(a)},c=Array.forEach?Array.forEach:function(a,b){for(var c=0,d=a.length;d>c;c++)b(a[c])},d=function(d,e,f,g,h,i){var j=function(a){var e;e=b(a)?a:a.split("");var f=[];return c(e,function(a){f.push(h(new RegExp(a)))}),d.apply(null,f)},k=e(j(["\\\\","'"]),h(/[^']/)),l=f(k),m=d(h(/'/),g(l),h(/'/)),n=e(j(["\\\\",'"']),h(/[^"]/)),o=f(n),p=d(h(/"/),g(o),h(/"/)),q=e(m,p),r=h(/\s/);g(r);var s=f(r),t=g(s),u=f(e(h(/[a-zA-Z_$]/))),v=g(f(e(h(/[a-zA-Z_$0-9]/)))),w=d(u,v),x=h(/0/),y=h(/\d/),z=h(/[123456789]/),A=a(function(a){return e(d(y,a),y)}),B=h(/[\+\-]/),C=h(/[eE]/),D=e(d(z,g(A)),x),E=d(C,g(B),D),F=d(D,d(h(/\./),g(A))),G=e(F,D),H=e(d(G,g(E)),F,D),I=d(g(B),t,H),J=e(j("true"),j("false")),K=h(/{/),L=h(/}/),M=w,N=j("#each"),O=j("as"),P=w,Q=w;P=i(P,"each-item"),M=i(M,"each-items"),Q=i(Q,"each-index");var R=d(K,N,t,M,t,O,t,P,t,Q,L);R=i(R,"@each-head-end","@each-head-start");var S=d(K,t,j("/each"),t,L),T=j("#if"),U=j("#elseif"),V=j("#else");e(q,w,I);var W=a(function(a){return e(d(w,h(/\./),a),w)}),X=e(I,W,q),Y=e(d(h(/=/),h(/=/)),d(h(/=/),h(/=/),h(/=/)),d(h(/>/),h(/=/)),d(h(/</),h(/=/)),d(h(/\+/),t,h(/=/)),d(h(/\-/),t,h(/=/)),d(h(/\|/),h(/\|/)),d(h(/&/),h(/&/)),h(/[\+\-\*\/%><\|\^]/));Y=i(Y,"expatom");var Z=h(/[\+\-!]/);Z=i(Z,"expatom"),X=i(X,"expatom");var $=i(h(/,/),"expatom"),_=i(h(/\(/),"expatom"),ab=i(h(/\)/),"expatom"),bb=i(h(/\./),"expatom"),cb=e(d(Z,t,X),d(Z,t,_,t,X,t,ab),J,X),db=a(function(b){var c=a(function(a){return e(d(b,t,$,t,a),b)}),f=d(g(Z),t,i(W,"expatom"),t,_,t,g(c),t,ab),h=e(f,cb),j=e(d(h,t,Y,t,b),h),k=e(d(_,t,j,t,ab),j),l=d(g(Z),t,k),m=d(l,g(d(t,bb,t,W,g(d(_,g(c),ab))))),n=a(function(a){return e(d(m,t,Y,a),m)});return n}),eb=i(db,"expression");eb=i(eb,"@ifexpend","@ifexpstart");var fb=d(K,t,U,s,eb,L),gb=d(K,t,V,t,L),hb=d(K,t,j("/if"),t,L),ib=d(K,t,i(db,"expressionbody"),t,L);ib=i(ib,"@expressionend","@expressionstart");var jb=d(K,h(/#/),j("set"),t,i(W,"namespace"),t,h(/=/),t,i(db,"expressionbody"),t,L);jb=i(jb,"@setend","@setstart");var kb=d(j("{#include"),t,i(w,"string"),t,h(/\}/));kb=i(kb,"@includeend","@includestart");var lb=j("{#block"),mb=j("{/block}"),nb=d(j("{#extend"),t,i(w,"string"),t,h(/\}/));nb=i(nb,"@extendend","@extendstart");var ob=e(j(["\\\\","\\}"]),h(/[^\}]/));ob=f(ob);var pb=d(j("{#!"),ob,h(/\}/)),qb=e(j(["\\\\","\\}"]),j(["\\\\","\\{"]),h(/[^\{\}]/));qb=f(qb),qb=i(qb,"string");var rb=a(function(a){a=f(a);var b=d(R,g(i(a,"@each-body-end","@each-body-start")),S);b=i(b,"@eachend","@eachstart");var c=d(fb,g(i(a,"@ifbodyend","@ifbodystart")));c=i(c,"@elseifend","@elseifstart");var h=g(f(c)),j=g(d(gb,g(a)));j=i(j,"@elseend","@elsestart");var k=d(K,T,t,eb,L,g(i(a,"@ifbodyend","@ifbodystart"))),l=d(i(k,"@elseifend","@elseifstart"),h,j,hb);l=i(l,"@ifend","@ifstart");var m=ib,n=jb,o=kb,p=d(lb,t,i(w,"string"),t,L,i(a,"@blockbodyend","@blockbodystart"),mb);p=i(p,"@blockend","@blockstart");var q=nb,r=pb,s=qb;return e(b,l,p,r,n,m,q,o,s)});return rb=f(rb)};return d}),KISSY.add("gallery/temple/1.0/index",function(a,b){return b},{requires:["gallery/temple/1.0/compile2js"]});