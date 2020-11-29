type BlockData = {
  title: string;
  bgColors: string[];
  gradientDirection?: 'vertical' | 'diagonal';
  textColor: string;
  buttonType: 'command' | 'navigation';
  commands?: string[];
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
  color: string;
};

export type DeviceState = {
  devicesConnected: number;
  devices: Device[];
};

// For use in a global store that keeps track of which devices are selected for modification at any given time
// An array of device names
export type CurrentSelections = string[];
