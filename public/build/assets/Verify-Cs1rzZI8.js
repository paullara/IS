import{r as i,S as w,j as t}from"./app-_Re8k_5v.js";import{E as y}from"./EmployerLayout-jCi5s9xw.js";import"./pages-BY3lQ8tk.js";import"./transition-Cy0-UkgQ.js";/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),N=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,s,l)=>l?l.toUpperCase():s.toLowerCase()),f=e=>{const a=N(e);return a.charAt(0).toUpperCase()+a.slice(1)},g=(...e)=>e.filter((a,s,l)=>!!a&&a.trim()!==""&&l.indexOf(a)===s).join(" ").trim(),A=e=>{for(const a in e)if(a.startsWith("aria-")||a==="role"||a==="title")return!0};/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var P={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=i.forwardRef(({color:e="currentColor",size:a=24,strokeWidth:s=2,absoluteStrokeWidth:l,className:n="",children:o,iconNode:m,...c},d)=>i.createElement("svg",{ref:d,...P,width:a,height:a,stroke:e,strokeWidth:l?Number(s)*24/Number(a):s,className:g("lucide",n),...!o&&!A(c)&&{"aria-hidden":"true"},...c},[...m.map(([p,h])=>i.createElement(p,h)),...Array.isArray(o)?o:[o]]));/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=(e,a)=>{const s=i.forwardRef(({className:l,...n},o)=>i.createElement(E,{ref:o,iconNode:a,className:g(`lucide-${C(f(e))}`,`lucide-${e}`,l),...n}));return s.displayName=f(e),s};/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],R=k("circle-check-big",D);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["path",{d:"M12 3v12",key:"1x0j5s"}],["path",{d:"m17 8-5-5-5 5",key:"7q97r8"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}]],S=k("upload",L),_=[{key:"business_permit_path",label:"Business Permit"},{key:"dti_sec_path",label:"DTI / SEC Registration"},{key:"bir_2303_path",label:"BIR 2303"},{key:"mayors_permit_path",label:"Mayor’s Permit"},{key:"company_profile_path",label:"Company Profile"},{key:"moa_path",label:"MOA"},{key:"proof_of_office_path",label:"Proof of Office Address"},{key:"valid_id_path",label:"Valid ID of Company Representative"},{key:"philgeps_path",label:"PhilGEPS"},{key:"organizational_chart_path",label:"Organizational Chart"},{key:"previous_interns_path",label:"Previous Interns"},{key:"training_plan_path",label:"Training Plan"},{key:"designation_letter_path",label:"Designation Letter"},{key:"safety_policy_path",label:"Safety Policy"},{key:"code_of_conduct_path",label:"Code of Conduct"},{key:"certificate_of_compliance_path",label:"DOLE Certificate"},{key:"insurance_path",label:"Insurance"},{key:"office_photos_path",label:"Office Photos"},{key:"nda_path",label:"NDA"}];function B({verification:e}){const a=(e==null?void 0:e.status)??null,s=(e==null?void 0:e.comment)??null,l=!e,n=a==="rejected",{data:o,setData:m,post:c,processing:d,errors:p}=w(Object.fromEntries(_.map(r=>[r.key,null]))),h=r=>{r.preventDefault(),c(route("company-application.store"),{forceFormData:!0})};return a==="pending"?t.jsx(y,{children:t.jsx("div",{className:"max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow",children:t.jsx("h2",{className:"text-yellow-600 font-semibold",children:"Application under review ⏳"})})}):a==="approved"?t.jsx(y,{children:t.jsx("div",{className:"max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow",children:t.jsx("h2",{className:"text-green-600 font-semibold",children:"Company Approved 🎉"})})}):t.jsx(y,{children:t.jsxs("div",{className:"max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow mt-6",children:[t.jsx("h2",{className:`text-2xl font-bold mb-4 ${n?"text-red-600":""}`,children:l?"Company Application":"Application Rejected"}),n&&s&&t.jsxs("div",{className:"bg-red-50 border border-red-200 text-red-700 p-4 rounded mb-6",children:[t.jsx("strong",{children:"Reason:"})," ",s]}),t.jsxs("form",{onSubmit:h,className:"grid md:grid-cols-2 gap-6",children:[_.map(r=>{var b;const u=!!(e!=null&&e[r.key]);return t.jsxs("div",{children:[t.jsxs("label",{className:"text-sm font-medium",children:[r.label,!u&&t.jsx("span",{className:"text-red-500",children:" *"})]}),t.jsx("p",{className:"text-xs text-gray-500",children:"PDF files only"}),u&&t.jsxs("div",{className:"flex items-center text-green-600 text-xs mt-1",children:[t.jsx(R,{className:"w-4 h-4 mr-1"}),"File already submitted"]}),t.jsxs("label",{className:"flex items-center mt-2 px-4 py-2 border rounded cursor-pointer bg-gray-50 hover:bg-gray-100",children:[t.jsx(S,{className:"w-4 h-4 mr-2"}),((b=o[r.key])==null?void 0:b.name)??"Upload PDF file",t.jsx("input",{type:"file",accept:"application/pdf",hidden:!0,onChange:j=>{const x=j.target.files[0];if(x&&x.type!=="application/pdf"){alert("Only PDF files are allowed.");return}m(r.key,x)},required:l&&!u})]}),p[r.key]&&t.jsx("p",{className:"text-xs text-red-500 mt-1",children:p[r.key]})]},r.key)}),t.jsx("div",{className:"md:col-span-2",children:t.jsx("button",{disabled:d,className:"w-full bg-blue-600 text-white py-3 rounded-lg",children:d?"Submitting...":"Submit Application"})})]})]})})}export{B as default};
