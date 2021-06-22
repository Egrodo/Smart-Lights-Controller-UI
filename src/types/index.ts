export enum Entities {
  Lamp1 = 'light.bedroom_lamp_1',
  Lamp2 = 'light.bedroom_lamp_2',
  Nanoleaf = 'light.nanoleaf_light_panels_5a_5d_b7',
  Underbed = 'light.underbed',
}

export enum Areas {
  Bedroom = 'bedroom',
}

export type Command = {
  names: (Entities | Areas)[]; // Name of the device
  type: 'entity' | 'area';
  on: boolean; // Only used to determine if I should turn off a light
  color?: [number, number, number];
  brightness?: number; // percentage
};

export type FormBody = {
  area_id?: Areas;
  entity_id?: Entities;
  rgb_color?: [number, number, number];
  brightness?: number; // Between 0-255
};

export type PresetCommands = Array<Command>;

export type ComposedCommands = {
  [blockTitle: string]: PresetCommands;
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

export type Pages = 'main' | 'customize';

export type Device = {
  name: Entities; // Names are and must be unique.
  friendlyName: string; // The name that's rendered viewable.
  on: boolean;
  color: [number, number, number]; // rgb
  brightness: number; // A percentage 0-1.
};

export type DeviceState = {
  devicesConnected: number;
  devices: Device[];
};

// For use in a global store that keeps track of which devices are selected for modification at any given time
// An array of device names
export type CurrentSelections = string[];
