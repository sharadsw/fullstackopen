(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),c=t.n(o),u=(t(19),t(2)),l=function(e){var n=e.person,t=e.removeEvent;return r.a.createElement("div",null,r.a.createElement("span",null,n.name),"\xa0",r.a.createElement("span",null,n.number),"\xa0",r.a.createElement("button",{onClick:t},"delete"))},i=function(e){var n=e.persons,t=e.removeEvent;return r.a.createElement("div",null,n.map((function(e){return r.a.createElement(l,{key:e.name,person:e,removeEvent:function(){return t(e)}})})))},m=t(3),f=t.n(m),d="/api/persons",s=function(){return f.a.get(d).then((function(e){return e.data}))},h=function(e){return f.a.post(d,e).then((function(e){return e.data}))},b=function(e,n){return f.a.put("".concat(d,"/").concat(e),n).then((function(e){return e.data}))},p=function(e){return f.a.delete("".concat(d,"/").concat(e)).then((function(e){return e.data}))},v=function(e){var n=e.message,t=e.type;return null===n?null:r.a.createElement("div",{className:t},n)},E=function(e){var n=e.filter,t=e.handleFilter;return r.a.createElement("div",null,"filter shown with: ",r.a.createElement("input",{value:n,onChange:t}))},w=function(e){var n=e.handleNewPerson,t=e.handleNewName,a=e.handleNewNumber,o=e.newName,c=e.newNumber;return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:o,onChange:t})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:c,onChange:a})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},g=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],o=n[1],c=Object(a.useState)(""),l=Object(u.a)(c,2),m=l[0],f=l[1],d=Object(a.useState)(""),g=Object(u.a)(d,2),N=g[0],j=g[1],k=Object(a.useState)(""),O=Object(u.a)(k,2),y=O[0],S=O[1],C=Object(a.useState)(null),P=Object(u.a)(C,2),x=P[0],D=P[1],F=Object(a.useState)(null),I=Object(u.a)(F,2),J=I[0],T=I[1];Object(a.useEffect)((function(){s().then((function(e){o(e)}))}),[]);var A=function(e,n){"alert"===n&&(T(e),setTimeout((function(){T(null)}),5e3)),"error"===n&&(D(e),setTimeout((function(){D(null)}),5e3))},B=""===y?t:t.filter((function(e){return e.name.toLowerCase().includes(y)}));return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(v,{message:J,type:"alert"}),r.a.createElement(v,{message:x,type:"error"}),r.a.createElement(E,{filter:y,handleFilter:function(e){S(e.target.value)}}),r.a.createElement("h2",null,"Add new"),r.a.createElement(w,{newName:m,newNumber:N,handleNewName:function(e){f(e.target.value)},handleNewNumber:function(e){j(e.target.value)},handleNewPerson:function(e){e.preventDefault();var n={name:m,number:N};if(-1===t.findIndex((function(e){return e.name===m})))h(n).then((function(e){console.log(e),o(t.concat(e)),f(""),j(""),A("".concat(e.name," was added to the phonebook"),"alert")})).catch((function(e){A(e.response.data.error,"error")}));else if(window.confirm("".concat(m," is already in the phonebook, update number?"))){var a=t.find((function(e){return e.name===n.name}));b(a.id,n).then((function(e){o(t.map((function(n){return n.id===e.id?e:n}))),A("".concat(e.name,"'s number was changed to ").concat(e.number),"alert")})).catch((function(e){console.log("error in update"),e.response?A(e.response.data.error,"error"):(o(t.filter((function(e){return e.id!==a.id}))),A("".concat(a.name," was already removed from the phonebook"),"error"))}))}}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(i,{persons:B,removeEvent:function(e){if(window.confirm("Delete ".concat(e.name," from phonebook?"))){var n=t.find((function(n){return e.name===n.name}));p(n.id).then((function(e){o(t.filter((function(e){return n.id!==e.id}))),A("".concat(n.name," was removed from the phonebook"),"alert")})).catch((function(e){console.log("error caught in delete"),o(t.filter((function(e){return e.id!==n.id}))),A("".concat(n.name," was already removed from the phonebook"),"error")}))}}}))};c.a.render(r.a.createElement(g,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.7eb4aadf.chunk.js.map