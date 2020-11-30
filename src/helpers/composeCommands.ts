import { rgbToColorName } from '../constants/CompatibleColors';
import type { PresetCommands } from '../types';

// Translate the data in PresetSchema to plaintext commands that can be fed to assistant-relay.
// Multiple devices in the same command will be batched together,
// multiple commands will be batched together if the `batch` property is set to true.
export default (commands: PresetCommands): string[] => {
  const resCommands: string[] = [];

  commands.forEach((command) => {
    const deviceNames = command.names;
    if (command.on && command.color) {
      const translatedColor = rgbToColorName[command.color];
      let currStr = 'Set ';
      deviceNames.forEach((deviceName, i) => {
        currStr += `${deviceName} `;
        if (i < deviceNames.length - 1) {
          currStr += `and `;
        }
      });
      currStr += `to ${translatedColor}`;
      resCommands.push(currStr);
    } else {
      let currStr = 'Turn off ';
      deviceNames.forEach((deviceName, i) => {
        currStr += `${deviceName} `;
        if (i < deviceNames.length - 1) {
          currStr += `and `;
        }
      });
      resCommands.push(currStr);
    }
  });

  return resCommands;
};
