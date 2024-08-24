import { Buffer } from "buffer";

const useBase64 = () => {
  const decode = (value: string) => {
    return Buffer.from(value, "base64").toString();
  };

  function hexToSignedInt(hex: string) {
    let num = parseInt(hex, 16);
    const bitLength = hex.length * 4; // each hex digit represents 4 bits

    if (num >= 2 ** (bitLength - 1)) {
      num -= 2 ** bitLength;
    }

    return num;
  }

  const decodeDecimal = (value: string, signed = false) => {
    const hex = Buffer.from(value, "base64").toString("hex");

    if (signed) return hexToSignedInt(hex);

    return parseInt(hex, 16);
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
