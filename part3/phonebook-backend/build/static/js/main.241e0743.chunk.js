(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),u=t.n(o),c=(t(19),t(2)),l=function(e){var n=e.person,t=e.removeEvent;return r.a.createElement("div",null,r.a.createElement("span",null,n.name),"\xa0",r.a.createElement("span",null,n.number),"\xa0",r.a.createElement("button",{onClick:t},"delete"))},i=function(e){var n=e.persons,t=e.removeEvent;return r.a.createElement("div",null,n.map((function(e){return r.a.createElement(l,{key:e.name,person:e,removeEvent:function(){return t(e)}})})))},m=t(3),f=t.n(m),d="/api/persons",s=function(){return f.a.get(d).then((function(e){return e.data}))},h=function(e){return f.a.post(d,e).then((function(e){return e.data}))},b=function(e,n){return f.a.put("".concat(d,"/").concat(e),n).then((function(e){return e.data}))},v=function(e){return f.a.delete("".concat(d,"/").concat(e)).then((function(e){return e.data}))},p=function(e){var n=e.message,t=e.type;return null===n?null:r.a.createElement("div",{className:t},n)},E=function(e){var n=e.filter,t=e.handleFilter;return r.a.createElement("div",null,"filter shown with: ",r.a.createElement("input",{value:n,onChange:t}))},w=function(e){var n=e.handleNewPerson,t=e.handleNewName,a=e.handleNewNumber,o=e.newName,u=e.newNumber;return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:o,onChange:t})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:u,onChange:a})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},g=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)(""),l=Object(c.a)(u,2),m=l[0],f=l[1],d=Object(a.useState)(""),g=Object(c.a)(d,2),N=g[0],j=g[1],O=Object(a.useState)(""),k=Object(c.a)(O,2),y=k[0],S=k[1],C=Object(a.useState)([]),T=Object(c.a)(C,2),P=T[0],x=T[1],D=Object(a.useState)(null),F=Object(c.a)(D,2),I=F[0],J=F[1],L=Object(a.useState)(null),A=Object(c.a)(L,2),B=A[0],q=A[1];Object(a.useEffect)((function(){s().then((function(e){o(e)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(p,{message:B,type:"alert"}),r.a.createElement(p,{message:I,type:"error"}),r.a.createElement(E,{filter:y,handleFilter:function(e){S(e.target.value),""!==e.target.value?x(t.filter((function(n){return n.name.toLowerCase().includes(e.target.value.toLowerCase())}))):x([])}}),r.a.createElement("h2",null,"Add new"),r.a.createElement(w,{newName:m,newNumber:N,handleNewName:function(e){f(e.target.value)},handleNewNumber:function(e){j(e.target.value)},handleNewPerson:function(e){e.preventDefault();var n={name:m,number:N};if(-1===t.findIndex((function(e){return e.name===m})))h(n).then((function(e){console.log(e),o(t.concat(e)),f(""),j(""),q("".concat(e.name," was added to the phonebook")),setTimeout((function(){q(null)}),5e3)}));else if(window.confirm("".concat(m," is already in the phonebook, update number?"))){var a=t.find((function(e){return e.name===n.name}));b(a.id,n).then((function(e){o(t.map((function(n){return n.id===e.id?e:n}))),x(P.map((function(n){return n.id===e.id?e:n}))),q("".concat(e.name,"'s number was changed to ").concat(e.number)),setTimeout((function(){q(null)}),5e3)})).catch((function(e){console.log("error in update"),o(t.filter((function(e){return e.id!==a.id}))),x(P.filter((function(e){return e.id!==a.id}))),J("".concat(a.name," was already removed from the phonebook")),setTimeout((function(){J(null)}),5e3)}))}}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(i,{persons:""===y?t:P,removeEvent:function(e){if(window.confirm("Delete ".concat(e.name," from phonebook?"))){var n=t.find((function(n){return e.name===n.name}));v(n.id).then((function(e){o(t.filter((function(e){return n.id!==e.id}))),x(P.filter((function(e){return n.id!==e.id}))),q("".concat(n.name," was removed from the phonebook")),setTimeout((function(){q(null)}),5e3)})).catch((function(e){console.log("error caught in delete"),o(t.filter((function(e){return e.id!==n.id}))),x(P.filter((function(e){return e.id!==n.id}))),J("".concat(n.name," was already removed from the phonebook")),setTimeout((function(){J(null)}),5e3)}))}}}))};u.a.render(r.a.createElement(g,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.241e0743.chunk.js.map