type StringSetter = React.Dispatch<React.SetStateAction<string>>;

interface BLEContextModel {
  batteryLevel?: number;
  isConnected: boolean;
  data: string[][];
  setData: React.Dispatch<React.SetStateAction<string[][]>>;
  scan: (setMessage: StringSetter) => void;
  stopScan: () => void;
  connect: () => int;
  forget: () => void;
  // disconnect: () => void;
  // write: () => void;
  // read: () => void;
}
