import sendCommand from '../helpers/sendCommand';
import type { PresetSchema } from '../types';

const presets: PresetSchema[] = [
  {
    rowCount: 2,
    rows: [
      {
        title: 'All Red',
        bgColors: ['#D50000'],
        textColor: '#FFFFFF',

        onClick: () => sendCommand('All Red'),
      },
      {
        title: 'All Purple',
        bgColors: ['#9A00FF'],
        textColor: '#FFFFFF',

        onClick: () => sendCommand('All Purple'),
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
        onClick: () => sendCommand('Lights On'),
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
        onClick: () => sendCommand('Lights On'),
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
        onClick: () => sendCommand('Gaming'),
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
        onClick: () => {}, // TODO: WTF do I do here
      },
    ],
  },
];

export default presets;
