export function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 1000 * 60);
}
