import { Entities, Areas } from '../types';
import type { DeviceState } from '../types';

// Hardcoded initial state. Will need manual updating if devices change.
const DeviceSchema: DeviceState = {
  devicesConnected: 3,
  devices: [
    {
      name: Entities.Lamp1,
      friendlyName: 'Lamp 1',
      on: true,
      color: [255, 255, 240],
      brightness: 1,
    },
    {
      name: Entities.Lamp2,
      friendlyName: 'Lamp 2',
      on: true,
      color: [255, 255, 240],
      brightness: 1,
    },
    {
      name: Entities.Underbed,
      friendlyName: 'Underbed',
      on: true,
      color: [255, 255, 240],
      brightness: 1,
    },
    {
      name: Entities.Nanoleaf,
      friendlyName: 'Nanoleaf',
      on: true,
      color: [255, 255, 240],
      brightness: 1,
    },
  ],
};

export default DeviceSchema;
