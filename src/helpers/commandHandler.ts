import { SERVER_URL, AUTH_CODE } from '../constants';

async function commandHandler(...commands: string[]) {
  // By sending direct commands rather than invoking routines we reach near 100% consistency.
  for await (const command of commands) {
    console.log(`Sending the command: ${command}`);

    try {
      await fetch(SERVER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        // body: JSON.stringify(commandBody),
      });
    } catch (error) {
      // TODO: what can this be?
      console.error(error);
    }
  }
}

export default commandHandler;
