type BlockData = {
  title: string;
  bgColors: string[];
  gradientDirection?: 'vertical' | 'diagonal';
  textColor: string;
  onClick: () => void;
};

export type PresetSchema = {
  rowCount: number;
  rows: Array<BlockData>;
};
