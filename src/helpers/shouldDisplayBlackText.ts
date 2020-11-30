import RGBToHSL from './RGBToHSL';

// Colors are represented throughout the app as rgb,converted as needed
export default (rgbColor: string): boolean => {
  const r = Number(rgbColor.split('(')[1].split(',')[0]);
  const g = Number(rgbColor.split(',')[1].split(',')[0]);
  const b = Number(rgbColor.split(',')[2].split(')')[0]);
  if (Number.isNaN(r) || Number.isNaN(b) || Number.isNaN(g)) {
    throw new Error('Invalid rgbColor passed to shouldDisplayBlackText');
  }
  const hsl = RGBToHSL(r, g, b);
  const luminesence = hsl.split('%,')[1].split('%')[0];
  const luminesenceNumber = Number(luminesence);
  if (Number.isNaN(luminesenceNumber)) {
    console.error('Failed to get luminesence from color in shouldDisplayBlackText', rgbColor, hsl);
    return false;
  }
  // Anything with a luminesence brighter than 60% should have black text.
  if (luminesenceNumber > 60) {
    return true;
  }
  return false;
};
