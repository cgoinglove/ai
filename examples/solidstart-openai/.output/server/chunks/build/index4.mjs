import { ssr, ssrHydrationKey, escape, createComponent, ssrAttribute } from 'solid-js/web';
import { For, Show } from 'solid-js';
import { z as ze } from './index162.mjs';
import { A as At } from './index17.mjs';
import 'solid-js/store';
import 'zod';

const x=["<div",">Loading...</div>"],f=["<div",' class="mt-4 text-gray-500"><!--$-->','<!--/--><button type="button" class="px-4 py-2 mt-4 text-blue-500 border border-blue-500 rounded-md">Stop</button></div>'],g=["<div",' class="flex flex-col w-full max-w-md py-24 mx-auto stretch"><div class="flex flex-col gap-2 p-2">',"</div><!--$-->","<!--/--><!--$-->",'<!--/--><form class="fixed bottom-0 w-full max-w-md p-2"><input class="w-full p-2 mb-8 border border-gray-300 rounded shadow-xl"',' placeholder="Say something..."',"></form></div>"],h=["<div",' class="whitespace-pre-wrap"><!--$-->',"<!--/--><!--$-->","<!--/--></div>"],i=["<div",' class="mt-4"><div class="text-red-500">An error occurred.</div><button type="button" class="px-4 py-2 mt-4 text-blue-500 border border-blue-500 rounded-md">Retry</button></div>'];function I(){const{input:u,messages:n,status:s,error:m}=ze({api:"/api/use-chat-request",sendExtraMessageFields:true,generateId:At({prefix:"msgc",size:16}),experimental_prepareRequestBody({messages:e}){return {message:e[e.length-1]}}});return ssr(g,ssrHydrationKey(),escape(createComponent(For,{get each(){return n()},children:e=>ssr(h,ssrHydrationKey(),e.role==="user"?"User: ":"AI: ",escape(e.content))})),escape(createComponent(Show,{get when(){return s()==="submitted"||s()==="streaming"},get children(){return ssr(f,ssrHydrationKey(),escape(createComponent(Show,{get when(){return s()==="submitted"},get children(){return ssr(x,ssrHydrationKey())}})))}})),m()&&i[0]+ssrHydrationKey()+i[1],ssrAttribute("value",escape(u(),true),false),ssrAttribute("disabled",s()!=="ready",true))}

export { I as default };
//# sourceMappingURL=index4.mjs.map
