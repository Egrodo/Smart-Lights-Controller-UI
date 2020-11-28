type BlockData = {
  title: string;
  bgColor: string[];
  textColor: string;
  onClick: () => void;
};

export interface PresetSingle extends BlockData {
  type: 'single';
}

export interface PresetDouble {
  type: 'double';
  first: BlockData;
  second: BlockData;
}

export type PresetSchema = (PresetSingle | PresetDouble)[];
