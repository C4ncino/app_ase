type StringSetter = React.Dispatch<React.SetStateAction<string>>;

interface BLEContextModel {
  batteryLevel?: string;
  macAddress?: string;
  scan: (setMessage: StringSetter) => void;
  connect: () => int;
  forget: () => void;
  // disconnect: () => void;
  // write: () => void;
  // read: () => void;
}
