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
