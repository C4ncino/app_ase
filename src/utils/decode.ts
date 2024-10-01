import useBase64 from "@/hooks/useBase64";

export const decode_glove_data = (data: string[][]): Training_data => {
  const { decode } = useBase64();

  return data.map((str_movement) => {
    return str_movement.map((str_frame) => {
      // timrp 2 -2 122
      const decode_str = decode(str_frame);

      // [timrp, 2, -1, 122]
      const split = decode_str.split(" ");

      const frame: Frame = {
        thumb: Number(decode_str[0]),
        index: Number(decode_str[1]),
        middle: Number(decode_str[2]),
        ring: Number(decode_str[3]),
        pinky: Number(decode_str[4]),
        x: Number(split[1]),
        y: Number(split[2]),
        z: Number(split[3]),
      };

      return frame;
    });
  });
};
