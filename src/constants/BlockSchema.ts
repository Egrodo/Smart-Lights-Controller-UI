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
        commands: ['change underbed and lamp 1 and lamp 2 to purple'],
      },
      {
        title: 'UnderRed',
        bgColors: ['#D50000'],
        textColor: '#FFFFFF',
        buttonType: 'command',
        commands: ['Turn off lamp 1 and lamp 2', 'change underbed to red'],
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
        commands: ['Change bedroom lights to white'],
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
        commands: ['Turn off bedroom lights'],
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
        commands: ['Change lamp 1 and lamp 2 to purple', 'change underbed to red'],
      },
      {
        title: 'Custom',
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
