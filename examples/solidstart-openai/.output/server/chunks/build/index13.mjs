import { t as to, p as pt } from './index19.mjs';
import { z } from 'zod';
import './index17.mjs';

const h=async o=>{const{messages:r}=await o.request.json();return to({model:pt("gpt-4o"),messages:r,toolCallStreaming:true,maxSteps:5,tools:{getWeatherInformation:{description:"show the weather in a given city to the user",parameters:z.object({city:z.string()}),execute:async({city:m})=>{await new Promise(s=>setTimeout(s,2e3));const e=["sunny","cloudy","rainy","snowy","windy"];return e[Math.floor(Math.random()*e.length)]}},askForConfirmation:{description:"Ask the user for confirmation.",parameters:z.object({message:z.string().describe("The message to ask for confirmation.")})},getLocation:{description:"Get the user location. Always ask for confirmation before using this tool.",parameters:z.object({})}}}).toDataStreamResponse()};

export { h as POST };
//# sourceMappingURL=index13.mjs.map
