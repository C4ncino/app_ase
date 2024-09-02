import { Buffer } from "buffer";

const useBase64 = () => {
  const decode = (value: string) => Buffer.from(value, "base64").toString();

  const decodeUInt = (value: string) =>
    Buffer.from(value, "base64").readUint8(0);

  const encode = (value: string) => Buffer.from(value).toString("base64");

  return {
    decode,
    decodeUInt,
    encode,
  };
};

export default useBase64;
