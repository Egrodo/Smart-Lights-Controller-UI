import type { DeviceState } from '../types';

// Hardcoded initial state. Will need manual updating if devices change.
const DeviceSchema: DeviceState = {
  devicesConnected: 3,
  devices: [
    {
      name: 'Lamp 1',
      on: true,
      color: '#FFFFF0',
    },
    {
      name: 'Lamp 2',
      on: true,
      color: '#FFFFF0',
    },
    {
      name: 'Underbed',
      on: true,
      color: '#FFFFF0',
    },
  ],
};

export default DeviceSchema;
