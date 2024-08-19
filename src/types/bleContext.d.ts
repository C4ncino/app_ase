interface BLEContextModel {
  requestPermissions: () => Promise<boolean>;
  scan: () => void;
  // connect: () => void;
  // disconnect: () => void;
  // write: () => void;
  // read: () => void;
}

interface BleDevice {
  name?: string | null;
  id?: string;
}
