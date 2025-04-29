import { t as to, p as pt } from './index19.mjs';
import './index17.mjs';
import 'zod';

const g=async s=>{const{messages:t}=await s.request.json();return to({model:pt("gpt-4-turbo"),messages:t,async onFinish({text:r,toolCalls:n,toolResults:i,usage:m,finishReason:l}){}}).toDataStreamResponse()};

export { g as POST };
//# sourceMappingURL=index9.mjs.map
