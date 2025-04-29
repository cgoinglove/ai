import { ssr, ssrHydrationKey, ssrAttribute, escape, createComponent } from 'solid-js/web';
import { W as We } from './index162.mjs';
import { i } from './schema.mjs';
import { Show, For } from 'solid-js';
import './index17.mjs';
import 'zod';
import 'solid-js/store';

const g=["<div",' class="mt-4 text-gray-500"><div>Loading...</div><button type="button" class="px-4 py-2 mt-4 text-blue-500 border border-blue-500 rounded-md">STOP</button></div>'],b=["<div",' class="flex flex-col items-center min-h-screen p-4 m-4"><button class="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md disabled:bg-blue-200"',">Generate notifications</button><!--$-->","<!--/--><!--$-->",'<!--/--><div class="flex flex-col gap-4 mt-4">',"</div></div>"],x=["<div",' class="mt-4 text-red-500">An error occurred. <!--$-->',"<!--/--></div>"],f=["<div",' class="flex items-start gap-4 p-4 bg-gray-100 rounded-md dark:bg-gray-800"','><div class="flex-1 space-y-1"><div class="flex items-center justify-between"><p class="font-medium dark:text-white">','</p><p class="text-sm text-gray-500 dark:text-gray-400"><!--$-->',"<!--/--><!--$-->",'<!--/--></p></div><p class="text-gray-700 dark:text-gray-300">',"</p></div></div>"];function k(){const{isLoading:i$1,object:o,error:m}=We({api:"/api/use-object",schema:i});return ssr(b,ssrHydrationKey(),ssrAttribute("disabled",i$1(),true),escape(createComponent(Show,{get when(){return m()},children:t=>ssr(x,ssrHydrationKey(),escape(t()?.message))})),escape(createComponent(Show,{get when(){return i$1()},get children(){return ssr(g,ssrHydrationKey())}})),escape(createComponent(For,{get each(){return o()?.notifications},children:(t,l)=>ssr(f,ssrHydrationKey(),ssrAttribute("data-index",escape(l(),true),false),escape(t?.name),escape(t?.minutesAgo),t?.minutesAgo!=null?" minutes ago":"",escape(t?.message))})))}

export { k as default };
//# sourceMappingURL=index8.mjs.map
