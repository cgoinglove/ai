import { ssr, ssrHydrationKey, escape, createComponent, ssrAttribute } from 'solid-js/web';
import { z as ze } from './index162.mjs';
import { For } from 'solid-js';
import './index17.mjs';
import 'zod';
import 'solid-js/store';

const n=["<div",' class="flex flex-col w-full max-w-md py-24 mx-auto stretch"><!--$-->','<!--/--><form><input class="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"',' placeholder="Say something..."></form></div>'],u=["<div",' class="whitespace-pre-wrap"><!--$-->',"<!--/--><!--$-->","<!--/--></div>"];function v(){const{messages:s,input:a}=ze(()=>({api:"/api/use-chat-vision"}));return ssr(n,ssrHydrationKey(),escape(createComponent(For,{get each(){return s()},children:r=>ssr(u,ssrHydrationKey(),r.role==="user"?"User: ":"AI: ",escape(r.content))})),ssrAttribute("value",escape(a(),true),false))}

export { v as default };
//# sourceMappingURL=index7.mjs.map
