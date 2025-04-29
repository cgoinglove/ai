import { o as a } from './assets/index-Cq4QIKmz.js';
import { s as n } from './assets/index-BY2tNYgL.js';
import { z as t } from 'zod';
import './assets/index-B97T_aK9.js';
const h = async o => {
  const { messages: r } = await o.request.json();
  return n({
    model: a('gpt-4o'),
    messages: r,
    toolCallStreaming: !0,
    maxSteps: 5,
    tools: {
      getWeatherInformation: {
        description: 'show the weather in a given city to the user',
        parameters: t.object({ city: t.string() }),
        execute: async ({ city: m }) => {
          await new Promise(s => setTimeout(s, 2e3));
          const e = ['sunny', 'cloudy', 'rainy', 'snowy', 'windy'];
          return e[Math.floor(Math.random() * e.length)];
        },
      },
      askForConfirmation: {
        description: 'Ask the user for confirmation.',
        parameters: t.object({
          message: t.string().describe('The message to ask for confirmation.'),
        }),
      },
      getLocation: {
        description:
          'Get the user location. Always ask for confirmation before using this tool.',
        parameters: t.object({}),
      },
    },
  }).toDataStreamResponse();
};
export { h as POST };
