export default (hexColors: string[], diaganol?: boolean): string => {
  if (hexColors.length === 1) {
    return hexColors[0];
  }
  if (diaganol) {
    return `linear-gradient(-45deg, ${hexColors.join(', ')})`;
  }

  return `linear-gradient(${hexColors.join(', ')})`;
};
