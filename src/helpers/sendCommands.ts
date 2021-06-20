import { SERVER_URL, AUTH_CODE } from '../constants';
import type { Areas, Command, Entities, FormBody } from '../types';

export default async function sendCommands(...commands: Command[]) {
  const commandPromises: Promise<Response>[] = [];
  for await (const command of commands) {
    command.names.forEach((name, i) => {
      const formBody: FormBody = {};
      let type: 'turn_on' | 'turn_off';
      if (command.on) {
        type = 'turn_on';
        // Handle turning on OR changing colors of devices
        if (command.type === 'area') {
          formBody.area_id = name as Areas;
        } else {
          formBody.entity_id = name as Entities;
        }

        if (command.brightness) {
          formBody.brightness = Math.round(255 * command.brightness);
        } else {
          formBody.brightness = 255;
        }

        if (command.color) {
          formBody.rgb_color = command.color;
        }
      } else {
        type = 'turn_off';
        if (command.type === 'area') {
          formBody.area_id = name as Areas;
        } else {
          formBody.entity_id = name as Entities;
        }
      }

      const url = `${SERVER_URL}/api/services/homeassistant/${type}`;
      const promise = fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: AUTH_CODE,
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate, br',
          Connection: 'keep-alive',
        },
        body: JSON.stringify(formBody),
      });

      commandPromises.push(promise);
    });
  }
  try {
    await Promise.all(commandPromises);
  } catch (error) {
    console.error(error);
  }
}
