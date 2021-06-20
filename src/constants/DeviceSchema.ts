import type { DeviceState } from '../types';

// Hardcoded initial state. Will need manual updating if devices change.
const DeviceSchema: DeviceState = {
  devicesConnected: 3,
  devices: [
    {
      name: 'light.bedroom_lamp_1',
      friendlyName: 'Lamp 1',
      on: true,
      color: 'rgb(255, 255, 240)',
      brightness: 1,
    },
    {
      name: 'light.bedroom_lamp_2',
      friendlyName: 'Lamp 2',
      on: true,
      color: 'rgb(255, 255, 240)',
      brightness: 1,
    },
    // {
    //   name: 'Underbed',
    //   on: true,
    //   color: 'rgb(255, 255, 240)',
    //   brightness: 1,
    // },
    {
      name: 'light.nanoleaf_light_panels_5a_5d_b7',
      friendlyName: 'Nanoleaf',
      on: true,
      color: 'rgb(255, 255, 240)',
      brightness: 1,
    },
  ],
};

export default DeviceSchema;
