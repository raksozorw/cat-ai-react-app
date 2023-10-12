export default function getColorFromValue(value: number) {
  if (value < 0 || value > 100) {
    throw new Error("Value should be in the range of 0 to 100");
  }

  // Map value to the 0-1 range (0% to 100%)
  const scaledValue = value / 100;

  // Define color values for red, yellow, and green
  const red = [255, 80, 80];
  const yellow = [255, 255, 100];
  const green = [33, 220, 127];

  let color;

  if (scaledValue < 0.5) {
    // Interpolate between red and yellow
    color = red.map((r, i) =>
      Math.round(r + (yellow[i] - r) * (scaledValue * 2))
    );
  } else {
    // Interpolate between yellow and green
    color = yellow.map((y, i) =>
      Math.round(y + (green[i] - y) * ((scaledValue - 0.5) * 2))
    );
  }

  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}
