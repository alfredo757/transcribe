import{o as e}from"./rolldown-runtime-BCiCTKAo.js";import{i as t}from"./index-DTwmvp_i.js";import{n,r,t as i}from"./xml-CG84ne-o.js";var a=e(t(),1);async function o(e,t){let n=await(await a.default.loadAsync(e)).file(`content.xml`)?.async(`string`);return n?t===`ods`?c(n):t===`odp`?l(n):s(n):{title:`OpenDocument`,kind:t,text:``,parts:[]}}function s(e){let t=[...e.matchAll(/<text:h\b[^>]*>([\s\S]*?)<\/text:h>/g)].map(e=>u(e[1])),n=r(e,`p`),i=t[0]||n[0]||`Document`,a=[...t.map(e=>({label:e.slice(0,80),text:e})),...n.map((e,t)=>({label:`Paragraph ${t+1}`,text:e}))].filter(e=>e.text);return{title:i,kind:`odt`,text:[...t,...n].join(`
`),parts:a}}function c(e){let t=e.split(/<table:table(?=[\s>])/).slice(1).map(e=>{let t=i(e,`table:name`)||`Sheet`,n=[...e.matchAll(/<table:table-row\b[\s\S]*?<\/table:table-row>/g)].map(e=>[...e[0].matchAll(/<table:table-cell\b[\s\S]*?<\/table:table-cell>|<table:table-cell\b[^/]*\/>/g)].map(e=>r(e[0],`p`).join(` `)||i(e[0],`office:value`))).filter(e=>e.some(Boolean)).map(e=>e.join(` | `));return{label:`Sheet: ${t}`,text:n.join(`
`)}});return{title:t[0]?.label.replace(/^Sheet:\s*/,``)||`Spreadsheet`,kind:`ods`,text:t.map(e=>`${e.label}\n${e.text}`).join(`

`),parts:t}}function l(e){let t=e.split(/<draw:page\b/).slice(1).map((e,t)=>{let n=i(e,`draw:name`)||`Slide ${t+1}`,a=e.includes(`<presentation:notes`)?r(e.split(`<presentation:notes`)[1]??``,`p`).join(` `):``;return{label:n,text:[r(e.split(`<presentation:notes`)[0]??e,`p`).join(`
`),a?`Notes: ${a}`:``].filter(Boolean).join(`
`)}});return{title:t[0]?.text.split(`
`).find(Boolean)?.slice(0,120)||`Presentation`,kind:`odp`,text:t.map(e=>`${e.label}\n${e.text}`).join(`

`),parts:t}}function u(e){return n(e.replace(/<[^>]+>/g,` `)).replace(/\s+/g,` `).trim()}export{o as parseOdf};