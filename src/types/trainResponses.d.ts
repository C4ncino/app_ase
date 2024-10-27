type ValidateResponse = {
  success: bool;
  samples: number[];
  task: string;
};

type Characteristics = {
  centroid: number[][];
  radius: number;
  threshold: number;
};

type ValidateTaskResponse = {
  ready: boolean;
  success: boolean;
  result: {
    bad_samples: number[];
    centroid: number[][];
    radius: number;
    threshold: number;
  };
};

type TrainResponse = {
  task: string;
};

type TrainTaskResponse = {
  ready: boolean;
  success: boolean;
  train_large_task: string;
  word: Word;
};

type TrainLargeTaskResponse = {
  ready: boolean;
  success: boolean;
  result: {
    id: number;
    model: ModelData;
  };
};
