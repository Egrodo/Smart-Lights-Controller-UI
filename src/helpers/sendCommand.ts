const ASSISTANT_RELAY_URL = '192.168.1.144:3000';

export default (command: string): void => {
  console.log(`Sending command: ${command} to assistant-relay at ${ASSISTANT_RELAY_URL}}`);
};
