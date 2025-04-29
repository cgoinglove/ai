import { t as to, p as pt } from './index19.mjs';
import './index17.mjs';
import 'zod';

const i=async t=>{const{prompt:o}=await t.request.json();return to({model:pt("gpt-4o"),prompt:o}).toDataStreamResponse()};

export { i as POST };
//# sourceMappingURL=index10.mjs.map
