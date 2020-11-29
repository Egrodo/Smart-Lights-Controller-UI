import type { DeviceState } from '../types';

// Hardcoded initial state. Will need manual updating if devices change.
const DeviceSchema: DeviceState = {
  devicesConnected: 3,
  devices: [
    {
      name: 'Lamp 1',
      on: true,
      color: 'rgb(255, 255, 240)',
    },
    {
      name: 'Lamp 2',
      on: true,
      color: 'rgb(255, 255, 240)',
    },
    {
      name: 'Underbed',
      on: true,
      color: 'rgb(255, 255, 240)',
    },
  ],
};

export default DeviceSchema;
