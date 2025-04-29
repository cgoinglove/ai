import { ssr, ssrHydrationKey, escape, ssrAttribute } from 'solid-js/web';
import { U as Ue } from './index162.mjs';
import './index17.mjs';
import 'zod';
import 'solid-js';
import 'solid-js/store';

const p=["<div",' class="flex flex-col w-full max-w-md py-24 mx-auto stretch"><!--$-->',"<!--/--><!--$-->","<!--/--><!--$-->",'<!--/--><form><input class="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"',' placeholder="Say something..."></form></div>'],d=["<pre",' class="p-4 text-sm bg-gray-100">',"</pre>"],f=["<div",' class="fixed top-0 left-0 w-full p-4 text-center bg-red-500 text-white">',"</div>"];function w(){const{completion:l,input:m,error:o,data:s}=Ue();return ssr(p,ssrHydrationKey(),s()&&ssr(d,ssrHydrationKey(),escape(JSON.stringify(s(),null,2))),o()&&ssr(f,ssrHydrationKey(),escape(o()?.message)),escape(l()),ssrAttribute("value",escape(m(),true),false))}

export { w as default };
//# sourceMappingURL=index2.mjs.map
