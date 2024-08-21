interface BLEContextModel {
  scan: (setMessage: React.Dispatch<React.SetStateAction<string>>) => void;
  // connect: () => void;
  // disconnect: () => void;
  // write: () => void;
  // read: () => void;
}

interface BleDevice {
  name: string;
  id: string;
  connectable: boolean;
}
