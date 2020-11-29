// https://css-tricks.com/converting-color-spaces-in-javascript/
function RGBToHSL(r, g, b) {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;
  // Calculate hue
  // No difference
  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;
  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return 'hsl(' + h + ',' + s + '%,' + l + '%)';
}

// Colors are represented throughout the app as rgb,converted as needed
export default (rgbColor: string): boolean => {
  const r = Number(rgbColor.split('(')[1].split(',')[0]);
  const g = Number(rgbColor.split(', ')[1].split(', ')[0]);
  const b = Number(rgbColor.split(', ')[2].split(')')[0]);
  if (Number.isNaN(r) || Number.isNaN(b) || Number.isNaN(g)) {
    throw new Error('Invalid rgbColor passed to shouldDisplayBlackText');
  }
  const hsl = RGBToHSL(r, g, b);
  const luminesence = hsl.split('%,')[1].split('%')[0];
  const luminesenceNumber = Number(luminesence);
  if (Number.isNaN(luminesenceNumber)) {
    console.error('Failed to get luminesence from color in shouldDisplayBlackText', hexColor, hsl);
    return false;
  }
  // Anything with a luminesence brighter than 60% should have black text.
  if (luminesenceNumber > 60) {
    return true;
  }
  return false;
};
