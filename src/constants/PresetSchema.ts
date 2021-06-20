import type { PresetSchema } from '../types';
import { Areas, Entities } from '../types';

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
            names: [Areas.Bedroom],
            type: 'area',
            on: true,
            color: [128, 0, 128],
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
            names: [Entities.Lamp1, Entities.Lamp2, Entities.Nanoleaf],
            type: 'entity',
            on: false,
          },
          {
            names: [Entities.Underbed],
            type: 'entity',
            on: true,
            color: [255, 0, 0],
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
            names: [Areas.Bedroom],
            type: 'area',
            on: true,
            color: [254, 255, 255],
            // There's a weird bug where if you put the same values the lamps do like a warm color. eww.
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
            names: [Areas.Bedroom],
            type: 'area',
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
            names: [Entities.Lamp1, Entities.Lamp2],
            type: 'entity',
            on: true,
            color: [128, 0, 128],
          },
          {
            names: [Entities.Underbed],
            type: 'entity',
            on: true,
            color: [255, 0, 0],
          },
          {
            names: [Entities.Nanoleaf],
            type: 'entity',
            on: true,
            color: [0, 255, 0],
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
