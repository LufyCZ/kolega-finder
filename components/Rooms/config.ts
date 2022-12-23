// "-" space
// "o" seat
// "w" whiteboard

export enum SeatType {
  Seat = "o",
  Space = "-",
  Whiteboard = "w",
}

const D105 = [
  "-oooooo--oooooooooooooooo--oooooo-",
  "oooooooo-oooooooooooooooo-oooooooo",
  "oooooooo-oooooooooooooooo-oooooooo",
  "oooooooo-oooooooooooooooo-oooooooo",
  "oooooooo-oooooooooooooooo-oooooooo",
  "oooooooo-oooooooooooooooo-oooooooo",
  "oooooooo-oooooooooooooooo-oooooooo",
  "oooooooo-oooooooooooooooo-oooooooo",
  "oooooooo-oooooooooooooooo-oooooooo",
  "oooooooooooooooo",
  "",
  "oooooooooooooooo",
  "w",
];

const D0206 = [
  "oooo-oooooooooo-oooo",
  "oooo-oooooooooo-oooo",
  "oooo-oooooooooo-oooo",
  "oooo-oooooooooo-oooo",
  "oooo-oooooooooo-oooo",
  "oooo-oooooooooo-oooo",
  "oooo-oooooooooo-oooo",
  "oooo-oooooooooo-oooo",
  "oooooooooo",
  "w",
];

const D0207 = [
  "oooooooooo",
  "oooooooooo",
  "oooooooooo",
  "oooooooooo",
  "oooooooooo",
  "oooooooooo",
  "oooooooooo",
  "oooooooooo",
  "oooooooooo",
  "w",
];

const G202 = [
  "oooooo-oooo",
  "oooooo-oooo",
  "oooooo-oooo",
  "oooooo-oooo",
  "oooooo-oooo",
  "oooooo-oooo",
  "oooooo-oooo",
  "oooooo-oooo",
  "w",
];

const E105 = [
  "oooooooooo",
  "oooooooooo",
  "oooooooooo",
  "oooooooooo",
  "oooooooooo",
  "oooooooooo",
  "oooooooooo",
  "w",
];

const E104 = [
  "oooooooooo",
  "oooooooooo",
  "oooooooooo",
  "oooooooooo",
  "oooooooooo",
  "oooooooooo",
  "oooooooooo",
  "w",
];

const E112 = [
  "oooooo-oooooooooooooo-oooooo",
  "oooooo-oooooooooooooo-oooooo",
  "oooooo-oooooooooooooo-oooooo",
  "oooooo-oooooooooooooo-oooooo",
  "oooooo-oooooooooooooo-oooooo",
  "oooooo-oooooooooooooo-oooooo",
  "w",
];

const A112 = [
  "oooooooo",
  "oooooooo",
  "oooooooo",
  "oooooooo",
  "oooooooo",
  "oooooooo",
  "oooooooo",
  "oooooooo",
  "w",
];

const A113 = [
  "oooooooo",
  "oooooooo",
  "oooooooo",
  "oooooooo",
  "oooooooo",
  "oooooooo",
  "oooooooo",
  "oooooooo",
  "w",
];

export const ROOMS = {
  D105: D105,
  D0206: D0206,
  D0207: D0207,
  G202: G202,
  E105: E105,
  E104: E104,
  E112: E112,
  A112: A112,
  A113: A113,
};
