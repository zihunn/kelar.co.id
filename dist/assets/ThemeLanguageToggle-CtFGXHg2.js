import{c as a}from"./createLucideIcon-Dvqhwfdi.js";import{d as h,a as u,r as o,j as e}from"./index-msZeOKOw.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],m=a("globe",x);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]],w=a("menu",k);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]],b=a("moon",p);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],v=a("sun",f);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],_=a("x",j);function z(){const{theme:g,toggleTheme:i}=h(),{language:s,setLanguage:d,t:r}=u(),[c,t]=o.useState(!1),n=o.useRef(null);return o.useEffect(()=>{function l(y){n.current&&!n.current.contains(y.target)&&t(!1)}return document.addEventListener("mousedown",l),()=>document.removeEventListener("mousedown",l)},[]),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("button",{onClick:i,className:"p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",title:r(g==="light"?"settings.darkMode":"settings.lightMode"),children:g==="light"?e.jsx(b,{size:20,className:"text-gray-700 dark:text-gray-300"}):e.jsx(v,{size:20,className:"text-gray-700 dark:text-gray-300"})}),e.jsxs("div",{className:"relative",ref:n,children:[e.jsxs("button",{onClick:()=>t(!c),className:"p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2",title:r("settings.language"),children:[e.jsx(m,{size:20,className:"text-gray-700 dark:text-gray-300"}),e.jsx("span",{className:"text-sm font-medium text-gray-700 dark:text-gray-300 uppercase",children:s})]}),c&&e.jsxs("div",{className:"absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50",children:[e.jsx("button",{onClick:()=>{d("id"),t(!1)},className:`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${s==="id"?"bg-gray-100 dark:bg-gray-700":""}`,children:e.jsx("span",{className:"text-sm text-gray-700 dark:text-gray-300",children:"🇮🇩 Indonesia"})}),e.jsx("button",{onClick:()=>{d("en"),t(!1)},className:`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${s==="en"?"bg-gray-100 dark:bg-gray-700":""}`,children:e.jsx("span",{className:"text-sm text-gray-700 dark:text-gray-300",children:"🇬🇧 English"})})]})]})]})}export{w as M,z as T,_ as X};
