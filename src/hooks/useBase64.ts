import { Buffer } from "buffer";

const useBase64 = () => {
  const decode = (value: string) => Buffer.from(value, "base64").toString();

  const decodeUInt = (value: string) =>
    Buffer.from(value, "base64").readUint8(0);

  const encodeBool = (value: boolean) => {
    const buffer = Buffer.alloc(1);

    buffer.writeUint8(value ? 1 : 0);

    return buffer.toString("base64");
  };

  return {
    decode,
    decodeUInt,
    encodeBool,
  };
};

export default useBase64;
