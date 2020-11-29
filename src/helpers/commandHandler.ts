import { ASSISTANT_RELAY_URL, ASSISTANT_RELAY_USERNAME } from '../constants';
import type { Command } from '../types';

async function commandHandler(...commands: string[]) {
  // By sending direct commands rather than invoking routines we reach near 100% consistency.
  for await (const command of commands) {
    console.log(`Sending the command: ${command}`);
    const commandBody: Command = {
      user: ASSISTANT_RELAY_USERNAME,
      command: command,
      converse: false,
      broadcast: false,
    };

    try {
      await fetch(ASSISTANT_RELAY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(commandBody),
      });
    } catch (error) {
      // TODO: what can this be?
      console.error(error);
    }
  }
}

export default commandHandler;