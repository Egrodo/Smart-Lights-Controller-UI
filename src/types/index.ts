export type PresetCommands = Array<{
  names: string[]; // Name of the device
  on: boolean; // Only used to determine if I should turn off a light
  color?: string;
}>;

export type ComposedCommands = {
  [blockTitle: string]: {
    rawCommands: PresetCommands;
    formattedCommands: string[];
  };
};

type BlockData = {
  title: string;
  bgColors: string[];
  gradientDirection?: 'vertical' | 'diagonal';
  textColor: string;
  buttonType: 'command' | 'navigation';
  commands?: PresetCommands;
};

export type PresetSchema = {
  rowCount: number;
  rows: Array<BlockData>;
};

export type Command = {
  user: string;
  command: string;
  converse: boolean;
  broadcast: boolean;
};

export type Pages = 'main' | 'customize';

export type Device = {
  name: string; // Names are and must be unique.
  on: boolean;
  color: string; // Colors are represented throughout the app as rgb values, converted as needed.
  brightness: number; // A percentage 0-1.
};

export type DeviceState = {
  devicesConnected: number;
  devices: Device[];
};

// For use in a global store that keeps track of which devices are selected for modification at any given time
// An array of device names
export type CurrentSelections = string[];

export type NearestColorReturn = {
  distance: number;
  name: string;
  rgb: {
    r: number;
    b: number;
    g: number;
  };
  value: string;
};
