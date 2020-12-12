import type { PresetSchema } from '../types';

const presets: PresetSchema[] = [
  {
    rowCount: 2,
    rows: [
      {
        title: 'All Purple',
        bgColors: ['#9A00FF'],
        textColor: '#FFFFFF',
        buttonType: 'command',
        // The names in a single command will be batched together automatically.
        commands: [
          {
            names: ['Lamp 1', 'Lamp 2', 'Underbed'],
            on: true,
            color: 'rgb(128,0,128)',
          },
        ],
      },
      {
        title: 'UnderRed',
        bgColors: ['#D50000'],
        textColor: '#FFFFFF',
        buttonType: 'command',
        commands: [
          {
            names: ['Lamp 1', 'Lamp 2'],
            on: false,
          },
          {
            names: ['Underbed'],
            on: true,
            color: 'rgb(237,10,63)',
          },
        ],
      },
    ],
  },
  {
    rowCount: 1,
    rows: [
      {
        title: 'Lights On',
        bgColors: ['#EFEBD8'],
        textColor: '#414141',
        buttonType: 'command',
        commands: [
          {
            names: ['Lamp 1', 'Lamp 2', 'Underbed', 'Nanoleaf'],
            on: true,
            color: 'rgb(255,255,240)',
          },
        ],
      },
    ],
  },
  {
    rowCount: 1,
    rows: [
      {
        title: 'Lights Off',
        bgColors: ['#414141'],
        textColor: '#FFFFFF',
        buttonType: 'command',
        commands: [
          {
            names: ['Lamp 1', 'Lamp 2', 'Underbed', 'Nanoleaf'],
            on: false,
          },
        ],
      },
    ],
  },
  {
    rowCount: 2,
    rows: [
      {
        title: 'Gaming',
        bgColors: ['#D50000', '#AA00AA', '#9A00FF'],
        textColor: '#FFFFFF',
        buttonType: 'command',
        commands: [
          {
            names: ['Lamp 1', 'Lamp 2'],
            on: true,
            color: 'rgb(128,0,128)',
          },
          {
            names: ['Underbed'],
            on: true,
            color: 'rgb(237,10,63)',
          },
        ],
      },
      {
        title: 'More...',
        bgColors: [
          'rgba(213, 0, 0, 0.75)',
          'rgba(200, 0, 36, 0.75)',
          'rgba(255, 255, 0, 0.75)',
          'rgba(0, 128, 0, 0.75)',
          'rgba(0, 0, 255, 0.75)',
          'rgba(75, 0, 130, 0.75)',
          'rgba(238, 130, 238, 0.75',
        ],
        gradientDirection: 'diagonal',
        textColor: '#FFFFFF',
        buttonType: 'navigation',
      },
    ],
  },
];

export default presets;
