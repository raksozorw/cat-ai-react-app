export default function getColorFromValue(value: number) {
  if (value >= 98) {
    return "var(--positive-color)";
  } else if (value >= 92) {
    return "var(--neutral-color)";
  } else {
    return "var(--negative-color)";
  }
}
