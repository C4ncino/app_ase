import { Buffer } from "buffer";

const useBase64 = () => {
  const decode = (value: string) => {
    return Buffer.from(value, "base64").toString();
  };

  function hexToSignedInt(unsigned: number, bits = 16) {
    const signBit = 1 << (bits - 1);

    return unsigned >= signBit ? unsigned - (1 << bits) : unsigned;
  }

  const decodeDecimal = (value: string, signed = false) => {
    const unsigned = parseInt(Buffer.from(value, "base64").toString("hex"), 16);

    if (signed) return hexToSignedInt(unsigned);

    return unsigned;
  };

  const encode = (value: string) => {
    console.log(Buffer.from(value).toString("base64"));
    return Buffer.from(value).toString("base64");
  };

  return {
    decode,
    decodeDecimal,
    encode,
  };
};

export default useBase64;
