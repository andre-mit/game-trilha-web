const track0 = {
  "00": [
    { track: 0, line: 1, column: 0 },
    { track: 0, line: 0, column: 1 },
  ],
  "01": [
    { track: 0, line: 0, column: 0 },
    { track: 0, line: 0, column: 2 },
    { track: 1, line: 0, column: 1 },
  ],
  "02": [
    { track: 0, line: 1, column: 2 },
    { track: 0, line: 0, column: 1 },
  ],
  "10": [
    { track: 0, line: 0, column: 0 },
    { track: 1, line: 1, column: 0 },
    { track: 0, line: 2, column: 0 },
  ],
  "20": [
    { track: 0, line: 1, column: 0 },
    { track: 0, line: 2, column: 1 },
  ],
  "21": [
    { track: 0, line: 2, column: 0 },
    { track: 0, line: 2, column: 2 },
    { track: 1, line: 2, column: 1 },
  ],
  "22": [
    { track: 0, line: 1, column: 2 },
    { track: 0, line: 2, column: 1 },
  ],
  "12": [
    { track: 0, line: 0, column: 2 },
    { track: 0, line: 2, column: 2 },
    { track: 1, line: 1, column: 2 },
  ],
};

const track1 = {
  "00": [
    { track: 1, line: 1, column: 0 },
    { track: 1, line: 0, column: 1 },
  ],
  "01": [
    { track: 1, line: 0, column: 0 },
    { track: 1, line: 0, column: 2 },
    { track: 0, line: 0, column: 1 },
    { track: 2, line: 0, column: 1 },
  ],
  "02": [
    { track: 1, line: 1, column: 2 },
    { track: 1, line: 0, column: 1 },
  ],
  "10": [
    { track: 1, line: 0, column: 0 },
    { track: 1, line: 2, column: 0 },
    { track: 0, line: 1, column: 0 },
    { track: 2, line: 1, column: 0 },
  ],
  "20": [
    { track: 1, line: 1, column: 0 },
    { track: 1, line: 2, column: 1 },
  ],
  "21": [
    { track: 1, line: 2, column: 0 },
    { track: 1, line: 2, column: 2 },
    { track: 0, line: 2, column: 1 },
    { track: 2, line: 2, column: 1 },
  ],
  "22": [
    { track: 1, line: 1, column: 2 },
    { track: 1, line: 2, column: 1 },
  ],
  "12": [
    { track: 1, line: 0, column: 2 },
    { track: 1, line: 2, column: 2 },
    { track: 0, line: 1, column: 2 },
    { track: 2, line: 1, column: 2 },
  ],
};

const track2 = {
  "00": [
    { track: 2, line: 1, column: 0 },
    { track: 2, line: 0, column: 1 },
  ],
  "01": [
    { track: 2, line: 0, column: 0 },
    { track: 2, line: 0, column: 2 },
    { track: 1, line: 0, column: 1 },
  ],
  "02": [
    { track: 2, line: 1, column: 2 },
    { track: 2, line: 0, column: 1 },
  ],
  "10": [
    { track: 2, line: 0, column: 0 },
    { track: 2, line: 2, column: 0 },
    { track: 1, line: 1, column: 0 },
  ],
  "20": [
    { track: 2, line: 1, column: 0 },
    { track: 2, line: 2, column: 1 },
  ],
  "21": [
    { track: 2, line: 2, column: 0 },
    { track: 2, line: 2, column: 2 },
    { track: 1, line: 2, column: 1 },
  ],
  "22": [
    { track: 2, line: 1, column: 2 },
    { track: 2, line: 2, column: 1 },
  ],
  "12": [
    { track: 2, line: 0, column: 2 },
    { track: 2, line: 2, column: 2 },
    { track: 1, line: 1, column: 2 },
  ],
};

export const placesToVerify = [track0, track1, track2];

export const getPlaces = (
  track: number,
  line: 0 | 1 | 2,
  column: 0 | 1 | 2
) => {
  const places =
    placesToVerify[track][
      `${line}${column}` as keyof (typeof placesToVerify)[0]
    ];
  return places;
};
