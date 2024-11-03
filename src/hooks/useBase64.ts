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

  const decodeGloveData = (data: RawData): TrainingData => {
    return data.map((str_movement) => {
      return str_movement.map((str_frame) => {
        const decode_str = decode(str_frame);

        const split = decode_str.split(" ");

        const frame: Frame = {
          thumb: Number(decode_str[0]),
          index: Number(decode_str[1]),
          middle: Number(decode_str[2]),
          ring: Number(decode_str[3]),
          pinky: Number(decode_str[4]),
          x: Number(split[1]) / 100,
          y: Number(split[2]) / 100,
          z: Number(split[3]) / 100,
        };

        return frame;
      });
    });
  };

  const decodeForTranslate = (rawData: RawMovement): MovementArray => {
    const decodeData = rawData.map((str_frame) => {
      const decode_str = decode(str_frame);
      const split = decode_str.split(" ");

      const frame: FrameArray = [
        Number(decode_str[0]),
        Number(decode_str[1]),
        Number(decode_str[2]),
        Number(decode_str[3]),
        Number(decode_str[4]),
        Number(split[1]) / 100,
        Number(split[2]) / 100,
        Number(split[3]) / 100,
      ];

      return frame;
    });

    if (decodeData.length > 60) return decodeData.slice(0, 60);

    while (decodeData.length < 60) {
      decodeData.push([0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]);
    }

    return decodeData;
  };

  return {
    decode,
    decodeUInt,
    encodeBool,
    decodeGloveData,
    decodeForTranslate,
  };
};

export default useBase64;
