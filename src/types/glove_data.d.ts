type RawData = string[][];

type RawMovement = string[];

type RawFrame = string;

type Frame = {
  thumb: number;
  index: number;
  middle: number;
  ring: number;
  pinky: number;
  x: number;
  y: number;
  z: number;
};

type Movement = Frame[];

type TrainingData = Movement[];

type FrameArray = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

type MovementArray = FrameArray[];
