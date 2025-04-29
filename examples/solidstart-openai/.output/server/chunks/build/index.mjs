import { ssr, ssrHydrationKey, escape, createComponent, ssrAttribute } from 'solid-js/web';
import { For, Show } from 'solid-js';
import { z as ze } from './index162.mjs';
import './index17.mjs';
import 'zod';
import 'solid-js/store';

const h=["<div",">Loading...</div>"],g=["<div",' class="mt-4 text-gray-500"><!--$-->','<!--/--><button type="button" class="px-4 py-2 mt-4 text-blue-500 border border-blue-500 rounded-md">Stop</button></div>'],x=["<div",' class="mt-4"><div class="text-red-500">An error occurred.</div><button type="button" class="px-4 py-2 mt-4 text-blue-500 border border-blue-500 rounded-md">Retry</button></div>'],f=["<div",' class="flex flex-col w-full max-w-md py-24 mx-auto stretch"><!--$-->',"<!--/--><!--$-->","<!--/--><!--$-->",'<!--/--><form><input class="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"',' placeholder="Say something..."',"></form></div>"],v=["<div",' class="whitespace-pre-wrap"><!--$-->',"<!--/--><!--$-->","<!--/--></div>"];function F(){const{error:i,input:u,status:o,messages:a}=ze({onFinish(d,{usage:m,finishReason:p}){console.log("Usage",m),console.log("FinishReason",p);}});return ssr(f,ssrHydrationKey(),escape(createComponent(For,{get each(){return a()},children:d=>ssr(v,ssrHydrationKey(),d.role==="user"?"User: ":"AI: ",escape(d.content))})),escape(createComponent(Show,{get when(){return o()==="submitted"||o()==="streaming"},get children(){return ssr(g,ssrHydrationKey(),escape(createComponent(Show,{get when(){return o()==="submitted"},get children(){return ssr(h,ssrHydrationKey())}})))}})),escape(createComponent(Show,{get when(){return i()},get children(){return ssr(x,ssrHydrationKey())}})),ssrAttribute("value",escape(u(),true),false),ssrAttribute("disabled",o()!=="ready",true))}

export { F as default };
//# sourceMappingURL=index.mjs.map
