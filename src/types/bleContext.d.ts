type StringSetter = React.Dispatch<React.SetStateAction<string>>;

interface BLEContextModel {
  batteryLevel?: number;
  isConnected: boolean;
  data: string[][];
  setData: React.Dispatch<React.SetStateAction<string[][]>>;
  scan: (setMessage: StringSetter) => void;
  stopScan: () => void;
  connect: (setMessage: StringSetter) => void;
  forget: (setMessage: StringSetter) => void;
  startDataSend: () => void;
  stopDataSend: () => void;
}
